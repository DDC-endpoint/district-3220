'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useModal } from '@/components/motion/use-modal';
import type { Committee } from '@/lib/event-pages';

/**
 * Expand Grid for event committees: the same shared-element handoff as the
 * home project tiles and PeopleGrid. The committee's emblem moves from its
 * card into the panel, where the topic and study guide live.
 *
 * Emblems are UN marks in their own blues, so they always sit on a
 * near-white plate, including inside the navy panel.
 */
export function CommitteeGrid({ items, scope }: { items: Committee[]; scope: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduced = useReducedMotion();
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const open = openIndex === null ? null : items[openIndex];

  useModal({
    open: openIndex !== null,
    onClose: () => setOpenIndex(null),
    panelRef,
    initialFocusRef: closeRef,
    returnFocusTo: () => (openIndex === null ? null : triggers.current[openIndex]),
  });

  const layoutKey = (i: number) => (reduced ? undefined : `committee-${scope}-${i}`);

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {items.map((c, i) => (
          <li key={c.code}>
            <button
              ref={(el) => {
                triggers.current[i] = el;
              }}
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-haspopup="dialog"
              className="group flex h-full w-full flex-col rounded-panel border border-hairline bg-surface p-4 text-left transition-colors duration-200 hover:border-accent-fill md:p-5"
            >
              <motion.span layoutId={layoutKey(i)} className="relative block aspect-[4/3] w-full overflow-hidden rounded-media bg-chalk-50">
                <Image src={c.logo} alt="" fill sizes="(max-width: 768px) 44vw, (max-width: 1024px) 30vw, 200px" className="object-contain p-5 transition-[scale] duration-[600ms] ease-out-expo group-hover:scale-[1.04] motion-reduce:group-hover:scale-100" />
              </motion.span>
              <span className="label-micro mt-4 block text-content-soft">{String(i + 1).padStart(2, '0')}</span>
              <span className="mt-1.5 block item-title text-item">{c.code}</span>
              <span className="mt-1 block text-sm text-content-muted">{c.name}</span>
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {open && openIndex !== null && (
          <motion.div
            data-lenis-prevent
            className="fixed inset-0 z-80 flex items-center justify-center p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            // Exit quicker than enter; under reduced motion a 200ms fade, no move.
            exit={{ opacity: 0, transition: { duration: reduced ? 0.2 : 0.15, ease: [0.16, 1, 0.3, 1] } }}
            transition={{ duration: reduced ? 0.2 : 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <button type="button" aria-label="Close committee" tabIndex={-1} onClick={() => setOpenIndex(null)} className="absolute inset-0 bg-chalk-950/70" />
            <div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`committee-${scope}-name`}
              className="relative grid max-h-full w-full max-w-3xl overflow-y-auto overscroll-contain rounded-panel bg-navy-900 text-white sm:grid-cols-2"
            >
              <div className="p-4 sm:p-6">
                <motion.div layoutId={layoutKey(openIndex)} className="relative aspect-[4/3] w-full overflow-hidden rounded-media bg-chalk-50 sm:aspect-square">
                  <Image src={open.logo} alt={`${open.name} emblem`} fill sizes="(max-width: 640px) 90vw, 360px" className="object-contain p-8" />
                </motion.div>
              </div>
              <div className="flex flex-col p-6 pt-2 sm:pt-6 md:p-10">
                <p className="label-micro text-accent">{open.code}</p>
                <h3 id={`committee-${scope}-name`} className="mt-3 text-[clamp(1.4rem,2.6vw,1.9rem)] leading-[1.1] tracking-[-0.02em]">
                  {open.name}
                </h3>
                <p className="label-micro mt-6 text-white/55">Topic</p>
                <p className="mt-2 text-white/85">{open.topic}</p>
                <div className="mt-auto flex flex-wrap gap-3 pt-8">
                  {open.guide && (
                    <a
                      href={open.guide}
                      target="_blank"
                      rel="noreferrer"
                      data-morph
                      className="rounded-control border border-on-ink bg-on-ink px-5 py-2.5 text-sm font-semibold text-ink-panel press hover:border-accent-fill hover:bg-accent-fill hover:text-accent-on"
                    >
                      Study guide
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  )}
                  <button
                    ref={closeRef}
                    type="button"
                    data-morph
                    onClick={() => setOpenIndex(null)}
                    className="rounded-control border border-white/45 px-5 py-2.5 text-sm font-semibold press hover:border-white hover:bg-white/15"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
