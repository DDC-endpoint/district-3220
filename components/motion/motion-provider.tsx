'use client';

import { LazyMotion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Framer Motion's animation and layout features, loaded after hydration
 * instead of in every page's first bundle.
 *
 * The full `motion` component carries every feature up front (~39 KB gzipped);
 * `m` is ~5 KB and gets its features from this provider. The features
 * (`domMax`: layout and `layoutId`, which the header underline and the Expand
 * Grid dialogs need) arrive as a separate chunk once the page is interactive.
 * Nothing animates before a tap or hover anyway, so the move costs nothing
 * visible and takes that parse and compile work off a mid-range phone's
 * first load.
 *
 * `strict`: a stray `motion.div` would quietly pull the whole library back
 * into the first bundle, so it throws in development instead. Use `m.*`.
 */
const loadFeatures = () => import('./motion-features').then((mod) => mod.default);

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
