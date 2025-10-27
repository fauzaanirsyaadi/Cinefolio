'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';

export type GalleryItem = {
    src: string;
    eyebrow?: string;
    heading?: string;
    alt?: string;
};

type Props = {
    items: GalleryItem[];
    className?: string;
    topOffsetClass?: string; // e.g. 'top-0' or 'top-16' if you have a fixed header
    reverseSecondRow?: boolean; // move row 2 in opposite direction
    cardWidth?: number;  // px basis used for row duplication
    cardMaxWidth?: number; // max width in px
    cardMaxHeight?: number; // max height in px
};

export default function FootageGallery({
                                           items,
                                           className = '',
                                           topOffsetClass = 'top-0',
                                           reverseSecondRow = true,
                                           cardWidth = 560,
                                           cardMaxWidth = 560,
                                           cardMaxHeight = 460,
                                       }: Props) {
    const outerRef = useRef<HTMLDivElement | null>(null);
    const stickyRef = useRef<HTMLDivElement | null>(null);
    const track1Ref = useRef<HTMLDivElement | null>(null);
    const track2Ref = useRef<HTMLDivElement | null>(null);

    const [x, setX] = useState(0);
    const [outerHeight, setOuterHeight] = useState<number>(0);
    // Ensure render is identical on server and initial client pass:
    // mounted === false => no blur, captions always visible.
    const [mounted, setMounted] = useState(false);
    const [vwClient, setVwClient] = useState<number | null>(null);

    // duplicate items to ensure there’s enough width for a long travel
    const rows = useMemo(() => {
        const base = items.length ? items : [];
        // Duplicate until we have width larger than viewport; a simple 2x is fine for scroll-controlled gallery
        const row1 = [...base, ...base];
        const row2 = [...base.slice().reverse(), ...base.slice().reverse()];
        return { row1, row2 };
    }, [items]);

    const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

    const measureAndLayout = () => {
        const outer = outerRef.current;
        const t1 = track1Ref.current;
        if (!outer || !t1) return;

        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const scrollWidth = t1.scrollWidth; // assume both tracks similar width

        const maxX = Math.max(0, scrollWidth - vw);
        const newOuterHeight = vh + maxX; // same trick as your current component
        setOuterHeight(newOuterHeight);

        const rect = outer.getBoundingClientRect();
        const scrolled = clamp(-rect.top, 0, newOuterHeight - vh);
        const progress = newOuterHeight - vh === 0 ? 0 : scrolled / (newOuterHeight - vh);
        const nextX = -maxX * progress; // down scroll → left
        setX(nextX);
    };

    useEffect(() => {
        // mark mounted so we can enable client-only styles (avoids SSR/client mismatch)
        setMounted(true);
        if (typeof window !== 'undefined') {
          setVwClient(window.innerWidth);
        }
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    measureAndLayout();
                    ticking = false;
                });
                ticking = true;
            }
        };
        const onResize = () => measureAndLayout();

        const ro1 = new ResizeObserver(() => measureAndLayout());
        const ro2 = new ResizeObserver(() => measureAndLayout());
        if (track1Ref.current) ro1.observe(track1Ref.current);
        if (track2Ref.current) ro2.observe(track2Ref.current);

        measureAndLayout();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
            ro1.disconnect();
            ro2.disconnect();
        };
    }, []);
   
    // helper: compute blur based on distance from viewport center horizontally
    const computeBlur = (cardCenterX: number, vw: number) => {
        const center = vw / 2;
        const dist = Math.abs(cardCenterX - center);
        const maxDist = vw / 2; // when it reaches the edge
        const ratio = Math.min(dist / maxDist, 1);
        // reduce max blur to keep images much clearer (was 7)
        return 2 * ratio;
    };

    // Render one row track
    const Row = ({ list, idx }: { list: GalleryItem[]; idx: 1 | 2 }) => {
        const trackRef = idx === 1 ? track1Ref : track2Ref;
        // use client vw when available; during SSR (or before mount) vwClient is null
        const vw = vwClient ?? 1200;

        // second row can move slightly differently for a parallax feeling
        const parallaxFactor = idx === 1 ? 1 : (reverseSecondRow ? -0.85 : 0.85);
        const translateX = x * parallaxFactor;

        return (
            <div
                ref={trackRef}
                className="flex items-stretch gap-6 will-change-transform pr-6"
                style={{ transform: `translate3d(${translateX}px, 0, 0)` }}
            >
                <div className="shrink-0 w-[5vw]" aria-hidden />
                {list.map((it, i) => {
                    // approximate each card’s center to compute blur – assumes even card widths
                    const cardViewportX = (i + 0.5) * (cardWidth + 24) + translateX; // +gap
                    const blur = computeBlur(cardViewportX, vw);
                    // Before mounted, always show caption to keep SSR/client markup identical.
                    const showCaption = mounted ? blur < 1.2 : true;
                     return (
                        <figure
                            key={`${idx}-${i}`}
                            className="relative shrink-0 rounded-xl overflow-hidden bg-muted border border-border/50 transition-[filter,transform] duration-200 ease-out"
                            style={{
                              width: `min(80vw, ${cardMaxWidth}px)`,
                              height: `min(60vh, ${cardMaxHeight}px)`,
                              // apply blur only after mount to avoid SSR/client mismatch
                              filter: `${mounted && vw >= 640 ? `blur(${Math.min(2, blur).toFixed(2)}px)` : 'none'}`,
                            }}
                        >
                            <Image
                                src={it.src}
                                alt={it.alt || it.heading || 'Gallery image'}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 80vw, (max-width: 1280px) 50vw, 560px"
                                priority={i < 2}
                                quality={90}
                            />

                             {/* Caption overlay with slight vertical parallax */}
                            {(it.eyebrow || it.heading) && (
                                <div
                                    className={`absolute inset-x-0 bottom-0 p-4 text-white ${showCaption ? '' : 'hidden'}`}
                                    style={{ transform: `translateY(${Math.round(-translateX * 0.01)}px)` }}
                                >
                                     {/* Decorative stars SVG (optional) */}
                                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 9" className="w-28 mb-2 opacity-80">
                                         <path
                                             fill="currentColor"
                                             d="M5.056 0 6 2.9h3.05L6.58 4.694l.943 2.901-2.468-1.793L2.59 7.594l.942-2.9L1.064 2.9h3.05L5.056 0ZM15.552 0l.942 2.9h3.05l-2.468 1.793.943 2.901-2.467-1.793-2.468 1.793.943-2.9L11.559 2.9h3.05L15.552 0ZM26.047 0l.942 2.9h3.05l-2.467 1.793.942 2.901-2.467-1.793-2.468 1.793.943-2.9L22.054 2.9h3.05L26.047 0ZM36.542 0l.942 2.9h3.05l-2.467 1.793.942 2.901-2.467-1.793-2.468 1.793.943-2.9L32.549 2.9h3.05L36.542 0ZM47.036 0l.942 2.9h3.05l-2.467 1.793.942 2.901-2.467-1.793-2.468 1.793.943-2.9L43.043 2.9h3.05L47.036 0Z"
                                         />
                                     </svg>
                                     {it.eyebrow && (
                                         <div className="text-xs tracking-widest uppercase opacity-80 mb-1">{it.eyebrow}</div>
                                     )}
                                     {it.heading && (
                                         <div className="text-base md:text-lg font-semibold drop-shadow">{it.heading}</div>
                                     )}
                                 </div>
                             )}
                         </figure>
                     );
                 })}
                 <div className="shrink-0 w-[30vw]" aria-hidden />
             </div>
         );
     };

    return (
        <div ref={outerRef} style={{ height: outerHeight || '200vh' }} className={`relative ${className}`}>
            <div ref={stickyRef} className={`sticky ${topOffsetClass} h-screen overflow-hidden`}>
                <div className="flex flex-col gap-8">
                    <Row list={rows.row1} idx={1} />
                    <Row list={rows.row2} idx={2} />
                </div>
            </div>
        </div>
    );
}