'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { NAV, SITE, type NavItem } from '@/lib/site';
import { lockScroll } from '@/components/motion/smooth-scroll';

export function SiteHeader() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const reduced = useReducedMotion();

  // Close the drawer on navigation.
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  /**
   * The bar is transparent while a full-screen hero owns the viewport, and
   * turns solid once that hero starts to scroll. Only home has a hero, so
   * every other page is solid from the server render on. (It used to start
   * transparent everywhere and turn solid after hydration, which flashed the
   * white over-hero logo and nav on chalk on every inner page.)
   *
   * Driven by an IntersectionObserver on a sentinel at the hero's bottom edge
   * rather than a scroll listener, so nothing runs per frame.
   */
  const hasHero = pathname === '/';
  const scrolled = !hasHero || pastHero;
  useEffect(() => {
    if (!hasHero) return;
    const sentinel = document.querySelector('[data-hero-top]');
    if (!sentinel) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        // Solid once the marker has passed up behind the bar.
        setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      // No rootMargin: the marker sits 16px into the hero, so this flips on the
      // first real scroll rather than a bar-height later.
      { threshold: 0 },
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, [hasHero]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      // Closing unmounts the focused link, which would drop focus to <body>.
      // Send it back to the menu button instead.
      const inDrawer = document.activeElement?.closest('#mobile-nav');
      setDrawerOpen(false);
      if (inDrawer) toggleRef.current?.focus();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Lock body scroll behind the mobile drawer.
  useEffect(() => {
    if (!drawerOpen) return;
    return lockScroll();
  }, [drawerOpen]);

  /**
   * An item is active on its own page, below it, or on a page reached from it
   * (`match`), so About lights on /council/2026-27 and Archives on the
   * College of DIRs. Matching on a segment boundary keeps /newsletter from
   * lighting News by prefix; News lists it in `match` instead.
   */
  const within = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const isActive = (item: NavItem) =>
    item.href === '/' ? pathname === '/' : within(item.href) || Boolean(item.match?.some(within));

  /**
   * Over the hero the bar itself is invisible so the photograph reads straight
   * through it; the nav stays fully present and usable, just inverted to white
   * so it survives on top of the image. Once the hero is past, the solid chalk
   * bar fades in and the nav returns to ink.
   */
  const overHero = !scrolled;

  return (
    // data-cursor: the bar is see-through over the hero, so the morph cursor
    // can't read a background colour here and is told the tone instead.
    <header className="sticky top-0 z-50" data-cursor={overHero ? 'dark' : 'light'}>
      {/* The bar is its own layer, cross-faded by opacity so nothing about the
          header snaps as it arrives.

          Fully opaque, and no backdrop-filter. At 80% the hero's white CTA
          pills ghosted straight through it as they scrolled under, and a live
          backdrop-filter across the full width is a real cost on the mid-range
          Android this site is mostly read on. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-10 border-b border-hairline bg-bg transition-opacity duration-300 ${
          scrolled ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-18">
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label={`${SITE.name} — home`}
        >
          {/* The official district lock-up: Interact, District 3220 and the
              Rotary wheel, cropped from the primary logo before its theme
              divider. Over the hero it is the white reverse, with the same
              shadow as the nav text: the cyan with a dark halo read muddy on
              the photographs. The two cross-fade with the bar, in the nav
              text's 300ms.
              width/height are the displayed size at md (48px tall), not the
              1034x380 file: next/image builds its 1x/2x candidates from
              them, and the file's own width sent a 1920px logo to phones.
              Eager rather than preloaded, so on the home page two logo
              preloads don't queue ahead of the hero artwork (the LCP). */}
          <span className="relative block">
            <Image
              src="/images/branding/interact-district-3220-logo.png"
              alt=""
              width={131}
              height={48}
              loading="eager"
              className={`h-10 w-auto transition-opacity duration-300 md:h-12 ${overHero ? 'opacity-0' : 'opacity-100'}`}
            />
            <Image
              src="/images/branding/interact-district-3220-logo-white.png"
              alt=""
              width={131}
              height={48}
              loading="eager"
              className={`absolute inset-0 h-10 w-auto drop-shadow-[0_1px_8px_rgba(10,12,14,0.7)] transition-opacity duration-300 md:h-12 ${
                overHero ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </span>
        </Link>

        {/* ---------- desktop nav ---------- */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {NAV.map((item) => {
              const active = isActive(item);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    data-morph
                    className={`press relative flex items-center rounded-full px-3.5 py-2 text-[13.5px] font-medium [--press-dur:300ms] [--press-extra:text-shadow] ${
                      overHero
                        ? `[text-shadow:0_1px_8px_rgba(10,12,14,0.7)] ${
                            active ? 'text-white' : 'text-white/80 hover:text-white'
                          }`
                        : active
                          ? 'text-content'
                          : 'text-content-muted hover:text-content'
                    }`}
                  >
                    {item.label}
                    {active && (
                      <m.span
                        layoutId="nav-active"
                        className="absolute inset-x-3.5 -bottom-px h-0.5 rounded-full bg-accent"
                        transition={
                          reduced ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }
                        }
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setDrawerOpen((v) => !v)}
            aria-expanded={drawerOpen}
            aria-controls="mobile-nav"
            aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
            data-morph
            // Visible circle stays 36px; the after: ring extends the tap
            // target to 44px for a touch-first audience.
            className={`press relative inline-flex size-9 items-center justify-center rounded-full border [--press-dur:300ms] after:absolute after:-inset-1 after:content-[''] lg:hidden ${
              overHero ? 'border-white/50 text-white' : 'border-hairline text-content'
            }`}
          >
            <svg viewBox="0 0 20 20" aria-hidden="true" className="size-4.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
              {drawerOpen ? <path d="M5 5l10 10M15 5L5 15" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
            </svg>
          </button>
        </div>
      </div>

      {/* ---------- mobile drawer ---------- */}
      <AnimatePresence>
        {drawerOpen && (
          <m.div
            id="mobile-nav"
            data-cursor="light"
            // Lenis would otherwise eat wheel input meant for the drawer's
            // own overflow scroll (body scroll is locked while it is open).
            data-lenis-prevent
            // Opens as a clip wipe from the top rather than animating height:
            // height re-runs layout every frame on mid-range Android, and the
            // clip is already in the vocabulary. 280ms in, 200ms out.
            // Reduced motion: opacity only.
            initial={reduced ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={
              reduced
                ? { opacity: 1, transition: { duration: 0.2, ease: 'easeOut' } }
                : { opacity: 1, clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }
            }
            exit={
              reduced
                ? { opacity: 0, transition: { duration: 0.15, ease: 'easeOut' } }
                : { opacity: 0, clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } }
            }
            // Capped and scrollable: the full nav is taller than a landscape
            // phone, and body scroll is locked while the drawer is open.
            // Absolute, hanging below the bar: in flow it pushed the whole
            // page down by its height on open and jumped it back on close.
            // The bottom hairline marks where the menu ends over the page.
            className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-y border-hairline bg-bg lg:hidden"
          >
            <nav aria-label="Primary (mobile)" className="container-page py-4">
              <ul className="flex flex-col">
                {NAV.map((item) => (
                  <li key={item.href} className="border-b border-hairline/70 last:border-0">
                    <Link
                      href={item.href}
                      aria-current={isActive(item) ? 'page' : undefined}
                      className={`block py-3 text-[15px] font-medium ${
                        isActive(item) ? 'text-accent-text' : 'text-content'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
