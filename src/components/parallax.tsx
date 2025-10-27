'use client';

import { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import clsx from 'clsx';

type Props = {
    speed?: number; // -1..1 kisaran wajar (0.35 = geser lebih cepat)
    className?: string;
    children: ReactNode;
};

export function Parallax({ speed = 0.2, className, children }: Props) {
    const ref = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const y = useTransform(scrollYProgress, [0, 1], [speed * -100, speed * 100]);

    return (
        <motion.div ref={ref} style={{ y }} className={clsx('will-change-transform', className)}>
            {children}
        </motion.div>
    );
}