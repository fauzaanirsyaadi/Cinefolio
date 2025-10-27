'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { SplitText } from '@/components/split-text';
import { Parallax } from '@/components/parallax';

export function HomeRoll({ items, autoSpeed = 0 }) { // matikan auto roll untuk mode scroll normal
    const doubled = useMemo(() => items, [items]); // tidak perlu duplikasi untuk loop

    // Tidak perlu y/smoothY/raf, drag, dsb saat pakai scroll biasa
    return (
        // Penting: jangan kunci tinggi 1 viewport dan jangan sembunyikan overflow
        <div className="relative min-h-[100svh] bg-black">
            {/* Wrapper biasa saja, tidak absolute */}
            <div className="relative">
                {doubled.map((item, i) => (
                    <RollItem key={`${item.slug}-${i}`} index={i} total={doubled.length} item={item} />
                ))}
            </div>

            {/* (Opsional) Fade top/bottom jika ingin efek */}
            {/* <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" /> */}
        </div>
    );
}

function RollItem({ item, index }: { item: any; index: number; total: number }) {
    // Untuk scroll normal, jangan pakai translate top manual
    return (
        <section
            className="relative h-[100svh] w-full"
            aria-label={`${item.title} — ${item.category}`}
        >
            {/* Background image full-bleed */}
            <div className="absolute inset-0">
                <Image
                    src={item.coverImage}
                    alt={item.title}
                    fill
                    sizes="100vw"
                    priority={index === 0}
                    className="object-cover opacity-80 will-change-transform"
                />
            </div>

            {/* Overlay konten */}
            <div className="relative z-10 flex h-full items-center">
                <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-6 md:grid-cols-2">
                    {/* Kolom kiri: badge/award sederhana */}
                    <Parallax speed={index % 2 === 0 ? -0.2 : 0.2} className="hidden md:block self-start pt-24">
                        <div className="inline-flex items-center gap-4 rounded-full bg-white/90 px-4 py-2 text-xs font-medium text-black">
                            <span className="uppercase tracking-widest">{item.shortDescription || 'Selected'}</span>
                            <span className="h-2 w-2 rounded-full bg-black/60" />
                            <span>{new Date().getFullYear()}</span>
                        </div>
                    </Parallax>

                    {/* Kolom kanan: heading + meta + CTA */}
                    <div className="flex flex-col items-center md:items-start gap-6">
                        <Parallax speed={index % 2 === 0 ? 0.35 : -0.35}>
                            <div className="text-sm uppercase tracking-[0.2em] text-white/80">{item.category}</div>
                            <h2 className="text-center md:text-left font-headline text-5xl md:text-7xl font-bold text-white leading-none group">
                                <SplitText text={item.title} className="inline-block" />
                            </h2>
                        </Parallax>

                        <Parallax speed={index % 2 === 0 ? 0.15 : -0.15} className="w-full">
                            <ul className="grid w-full grid-cols-3 gap-4 text-sm text-white/90">
                                <li className="border-t border-white/30 pt-3">
                                    <div className="text-white/60">Director</div>
                                    <div>—</div>
                                </li>
                                <li className="border-t border-white/30 pt-3">
                                    <div className="text-white/60">Year</div>
                                    <div>{new Date().getFullYear()}</div>
                                </li>
                                <li className="border-t border-white/30 pt-3">
                                    <div className="text-white/60">Category</div>
                                    <div>{item.category}</div>
                                </li>
                            </ul>
                        </Parallax>

                        <Parallax speed={index % 2 === 0 ? 0.15 : -0.15}>
                            <Link href={`/projects/${item.slug}`} className="group relative inline-flex items-center gap-3 rounded-full border border-white/50 bg-white text-black px-5 py-3 text-sm font-semibold">
                                <span>EXPLORE</span>
                                <svg width="12" height="10" viewBox="0 0 11 10" className="transition-transform duration-300 group-hover:translate-x-1">
                                    <path fill="currentColor" d="M4.481.005a6.65 6.65 0 0 1 6.46 4.659c.078.229.08.479-.003.706C10.302 7.105 8.318 10 4.48 10V8.39c.941.127 2.922-.257 4.442-2.603H0V4.208h8.938c-.756-1.229-2.216-2.78-4.457-2.78V.006Z" />
                                </svg>
                                <span className="pointer-events-none absolute -inset-1 rounded-full border border-white/20" />
                            </Link>
                        </Parallax>
                    </div>
                </div>
            </div>

            {/* Overlay gelap untuk kontras teks */}
            <div className="absolute inset-0 bg-black/35" />
        </section>
    );
}