'use client';

import clsx from 'clsx';

type Props = {
    text: string;
    className?: string;
};

export function SplitText({ text, className }: Props) {
    return (
        <span className={clsx('select-none', className)} aria-label={text}>
      {text.split('').map((ch, i) => (
          <span key={i} className="relative inline-block overflow-hidden align-baseline">
          <span className="block translate-y-[18%] transition-transform duration-300 group-hover:-translate-y-full">
            {ch}
          </span>
          <span className="pointer-events-none absolute inset-0 block translate-y-[18%] transition-transform duration-300 group-hover:translate-y-0 opacity-70">
            {ch}
          </span>
        </span>
      ))}
    </span>
    );
}