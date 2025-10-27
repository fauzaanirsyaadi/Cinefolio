'use client';

import { useState } from 'react';
import Image from 'next/image';

type TrailerInfo = {
  valid: boolean;
  platform?: 'youtube' | 'vimeo' | 'direct' | string;
  id?: string | null;
  embed?: string | null;
  raw?: string | null;
  reason?: string;
};

export default function ProjectTrailerPlayer({
  trailerInfo,
  poster,
  className,
}: {
  trailerInfo?: TrailerInfo | null;
  poster?: string | null;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);

  const hasValid = !!(trailerInfo && trailerInfo.valid && trailerInfo.embed);

  function buildEmbedSrc(embed?: string | null) {
    if (!embed) return '';
    // append autoplay param for iframes
    if (embed.includes('youtube.com/embed') || embed.includes('player.vimeo.com')) {
      return embed + (embed.includes('?') ? '&autoplay=1' : '?autoplay=1');
    }
    return embed;
  }

  return (
    <div className={`relative w-full h-[60vh] mb-12 ${className || ''}`}>
      {/* Poster shown until play clicked */}
      {!playing && (
        <div className="relative w-full h-full rounded-lg overflow-hidden bg-muted">
          {poster ? (
            // use next/image for optimized poster
            <Image
              src={poster}
              alt="Trailer poster"
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-black/40" />
          )}

          {/* Play button */}
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 m-auto flex h-20 w-20 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/70 transition shadow-lg"
            aria-label="Play trailer"
            style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
          >
            <svg className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>

          {/* subtle note if trailer exists but invalid */}
          {trailerInfo && trailerInfo.raw && !hasValid ? (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-yellow-800/80 text-yellow-100 px-3 py-1 rounded text-sm">
              Trailer URL provided but unsupported
            </div>
          ) : null}
        </div>
      )}

      {/* Player shown after play */}
      {playing && hasValid && trailerInfo ? (
        trailerInfo.platform === 'youtube' || trailerInfo.platform === 'vimeo' ? (
          <iframe
            src={buildEmbedSrc(trailerInfo.embed)}
            title="Trailer player"
            className="w-full h-full rounded-lg"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          // direct file fallback
          <video
            src={trailerInfo.embed || undefined}
            controls
            autoPlay
            poster={poster || undefined}
            className="w-full h-full object-cover rounded-lg bg-black"
          />
        )
      ) : null}
    </div>
  );
}