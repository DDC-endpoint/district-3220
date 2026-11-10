'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';

/**
 * Enter-once reveal, driven by IntersectionObserver rather than a scroll
 * listener so nothing runs per frame.
 *
 * Deliberately not Framer Motion: these are one-shot opacity and transform
 * transitions on static content, and a CSS transition costs no JS at all on
 * the sections that only need to fade up. Framer stays for the pieces that
 * genuinely need interruptible or gesture-driven motion.
 *
 * Reduced motion still uses the observer: the global rule in globals.css
 * limits the transition to a 200ms opacity fade with no delay, so content
 * fades in as it arrives instead of rising (no translate, no stagger).
 */
export function useEnterOnce<T extends Element>(rootMargin = '0px 0px -8% 0px') {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry], obs) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        obs.disconnect();
      },
      { threshold: 0.14, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return { ref, shown };
}

type RevealProps = {
  children: ReactNode;
  /** Stagger position, in steps of 70ms. */
  step?: number;
  as?: ElementType;
  className?: string;
};

export function Reveal({ children, step = 0, as: Tag = 'div', className = '' }: RevealProps) {
  const { ref, shown } = useEnterOnce<HTMLElement>();
  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: shown ? `${step * 70}ms` : '0ms' }}
      className={`transition-[opacity,translate] duration-[550ms] ease-out-expo ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-[18px] opacity-0'
      } ${className}`}
    >
      {children}
    </Tag>
  );
}

/**
 * The blueprint hairline that draws itself in as a section arrives. Separated
 * from Reveal because it scales rather than translates, and because it is used
 * as a section rule everywhere.
 */
export function DrawLine({ className = '' }: { className?: string }) {
  const { ref, shown } = useEnterOnce<HTMLDivElement>();
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`h-px origin-left bg-navy-800/30 transition-transform duration-[900ms] ease-out-expo ${
        // Reduced motion: no scale (it would snap); the line fades in instead.
        shown ? 'scale-x-100' : 'scale-x-0 motion-reduce:scale-x-100 motion-reduce:opacity-0'
      } ${className}`}
    />
  );
}
