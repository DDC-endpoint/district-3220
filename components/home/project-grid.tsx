'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useModal } from '@/components/motion/use-modal';
import { FLAGSHIPS } from '@/lib/home';

/**
 * Expand Grid (lab.damiandc.com/expand-grid).
 *
 * Four numbered project tiles, two by two (five until Interflash came off on
 * 2026-10-13). Tapping one hands the tile off to an expanded
 * panel via a shared-element transition: the image itself animates from its
 * place in the grid into the panel, rather than a new panel fading in over the
 * top. Framer's `layoutId` is exactly this primitive, so it does the FLIP work.
 *
 * Each tile is the project's cover photo; the panel leads with the same photo
 * and a row of thumbnails swaps in the rest (2026-10-14). A project still
 * waiting on its photographs (`needsPhoto`) is a plain navy tile and opens on
 * its description alone.
 *
 * Deliberately NOT a morph-cursor target: the tiles are far larger than a
 * control, and the cursor's size guard would decline them anyway.
 */

export function ProjectGrid() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  /** The photo leading the open panel. Every open starts on the cover. */
  const [shown, setShown] = useState(0);
  const reduced = useReducedMotion();
  const open = FLAGSHIPS.find((f) => f.slug === openSlug) ?? null;
  const tiles = useRef<Record<string, HTMLButtonElement | null>>({});
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useModal({
    open: openSlug !== null,
    onClose: () => setOpenSlug(null),
    panelRef,
    initialFocusRef: closeRef,
    returnFocusTo: () => (openSlug ? tiles.current[openSlug] : null),
  });

  return (
    <>
      <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {FLAGSHIPS.map((f, i) => {
          const cover = f.photos[0];
          return (
            <li key={f.slug}>
              <motion.button
                ref={(el) => {
                  tiles.current[f.slug] = el;
                }}
                type="button"
                layoutId={reduced ? undefined : `project-${f.slug}`}
                // Inline, not only the rounded-panel class: Framer corrects a
                // radius set in style for the shared-layout scale, so the
                // corners stay 20px through the grow instead of shrinking.
                style={{ borderRadius: 20 }}
                onClick={() => {
                  setShown(0);
                  setOpenSlug(f.slug);
                }}
                aria-haspopup="dialog"
                data-placeholder={f.needsPhoto || undefined}
                className="group relative block h-full min-h-[260px] w-full overflow-hidden rounded-panel bg-navy-900 text-left text-white md:min-h-[320px]"
              >
                {cover && (
                  <>
                    {/* alt="" on the tile: the button already reads the project's name. */}
                    <Image
                      src={cover.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover opacity-80 transition-[opacity,scale] duration-[600ms] ease-out-expo group-hover:scale-[1.04] group-hover:opacity-95 motion-reduce:group-hover:scale-100"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-chalk-950/95 via-chalk-950/60 via-45% to-transparent"
                    />
                  </>
                )}
                <span className="relative flex h-full flex-col justify-end p-5 md:p-6">
                  {/* white/70 and signal-400 (the over-photography step, §2):
                      white/55 and `accent` measured 3.5–4.3:1 on the scrim. */}
                  <span className="label-micro text-white/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="mt-2 item-title text-[1.25rem] leading-tight">
                    {f.name}
                  </span>
                  {f.figure && (
                    <span className="label-micro mt-2 text-signal-400">
                      {f.figure} · {f.figureLabel}
                    </span>
                  )}
                </span>
              </motion.button>
            </li>
          );
        })}
      </ul>

      <AnimatePresence>
        {open && (
          <motion.div
            data-lenis-prevent
            className="fixed inset-0 z-80 flex items-center justify-center p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            // Exit quicker than enter: closing answers the user, opening is
            // the reveal. Under reduced motion the same fade at 200ms, no move.
            exit={{ opacity: 0, transition: { duration: reduced ? 0.2 : 0.15, ease: [0.16, 1, 0.3, 1] } }}
            transition={{ duration: reduced ? 0.2 : 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              aria-label="Close project"
              tabIndex={-1}
              onClick={() => setOpenSlug(null)}
              className="absolute inset-0 bg-chalk-950/70"
            />
            <motion.div
              ref={panelRef}
              layoutId={reduced ? undefined : `project-${open.slug}`}
              style={{ borderRadius: 20 }}
              role="dialog"
              aria-modal="true"
              aria-label={open.name}
              // Scrolls on short and landscape screens; clipping hid the Close button.
              className={`relative grid max-h-full w-full overflow-y-auto overscroll-contain rounded-panel bg-navy-900 text-white ${
                open.photos.length ? 'max-w-5xl md:grid-cols-[1.15fr_1fr]' : 'max-w-2xl'
              }`}
            >
              {open.photos.length > 0 && (
                <div className="flex flex-col">
                  {/* Every photo is mounted and stacked; the thumbnails change
                      which one is opaque (200ms, the colour-change timing), so
                      a swap never waits on a fresh image load. */}
                  <div className="relative aspect-[3/2] bg-navy-800">
                    {open.photos.map((p, i) => (
                      <Image
                        key={p.image.src}
                        src={p.image}
                        alt={p.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 560px"
                        aria-hidden={i !== shown}
                        className={`object-cover transition-opacity duration-200 ${i === shown ? 'opacity-100' : 'opacity-0'}`}
                      />
                    ))}
                  </div>
                  {open.photos.length > 1 && (
                    <ul aria-label={`${open.name} photographs`} className="grid auto-cols-fr grid-flow-col gap-2 p-4 md:p-5">
                      {open.photos.map((p, i) => (
                        <li key={p.image.src}>
                          <button
                            type="button"
                            data-morph
                            onClick={() => setShown(i)}
                            aria-label={`Show photo ${i + 1} of ${open.photos.length}`}
                            aria-current={i === shown}
                            className={`press relative block aspect-[3/2] w-full overflow-hidden rounded-media outline-offset-2 ${
                              i === shown ? 'opacity-100 outline-2 outline-white outline-solid' : 'opacity-60 hover:opacity-100'
                            }`}
                          >
                            <Image src={p.image} alt="" fill sizes="120px" className="object-cover" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
              <div className="p-6 md:p-10">
                <p className="label-micro text-accent">{open.name}</p>
                {open.figure && (
                  <>
                    <p className="mt-4 font-display text-[clamp(2rem,4.4vw,3.2rem)] leading-none font-semibold tracking-[-0.045em]">
                      {open.figure}
                    </p>
                    <p className="label-micro mt-2.5 text-white/60">{open.figureLabel}</p>
                  </>
                )}
                <p className={`max-w-[52ch] text-white/85 ${open.figure ? 'mt-6' : 'mt-4'}`}>{open.description}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  {open.href && (
                    <Link
                      href={open.href}
                      data-morph
                      className="rounded-control border border-on-ink bg-on-ink px-5 py-2.5 text-sm font-semibold text-ink-panel press hover:border-accent-fill hover:bg-accent-fill hover:text-accent-on"
                    >
                      Open the {open.name} page
                    </Link>
                  )}
                  <button
                    ref={closeRef}
                    type="button"
                    data-morph
                    onClick={() => setOpenSlug(null)}
                    className="rounded-control border border-white/45 px-5 py-2.5 text-sm font-semibold press hover:border-white hover:bg-white/15"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
