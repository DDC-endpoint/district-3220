'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

/**
 * Lenis smooth scroll, deliberately gated.
 *
 * It's disabled on touch devices and when reduced motion is requested. On a
 * mid-range Android — which is most of this audience — hijacking scroll costs
 * more in jank than it returns in polish, and native scrolling there is already
 * good. So this is a desktop enhancement only.
 *
 * Page changes reset it. Lenis eases toward a target scroll position, and a
 * link clicked mid-ease left that ease running into the next page: Next put
 * the new page at the top, then Lenis carried on toward the old page's target,
 * clamped to the bottom of the new one. From the Archives page, which is long,
 * "Meet the council" opened the council page at Directors (2026-10-13).
 * `settle` drops the ease and adopts the real scroll position: an immediate
 * scrollTo to where the page already is (Lenis then resets itself; its own
 * `reset()` is private).
 */
const settle = (lenis: Lenis) => lenis.scrollTo(window.scrollY, { immediate: true, force: true });

/** The running instance, or null on touch, under reduced motion and on the server. */
let active: Lenis | null = null;
/** Restarts the frame loop after a programmatic smooth scroll. */
let wakeActive = () => {};
let locks = 0;
let prevOverflow = '';

/**
 * Locks page scroll behind a dialog or the mobile drawer; returns the release.
 *
 * `body { overflow: hidden }` alone does not hold on desktop: Lenis scrolls
 * with window.scrollTo, which ignores it, so an ease still running when a tile
 * was clicked kept drifting the page behind the opening dialog, and the wheel
 * scrolled the page behind the drawer. Stopping Lenis ends both. A stopped
 * Lenis still leaves `data-lenis-prevent` areas (dialog panels, the drawer)
 * to scroll natively. Counted, so overlapping locks release in any order.
 */
export function lockScroll(): () => void {
  locks += 1;
  if (locks === 1) {
    prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    active?.stop();
  }
  let released = false;
  return () => {
    if (released) return;
    released = true;
    locks -= 1;
    if (locks === 0) {
      document.body.style.overflow = prevOverflow;
      active?.start();
    }
  };
}

/**
 * Scrolls an element into view through Lenis when it is running, so a smooth
 * native scroll and Lenis's own ease don't fight over the wheel.
 */
export function scrollIntoViewSmooth(el: HTMLElement) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (active) {
    const r = el.getBoundingClientRect();
    // block: 'nearest' for an element below the fold: bring its bottom edge up.
    active.scrollTo(window.scrollY + r.bottom - window.innerHeight + 24);
    wakeActive();
  } else {
    el.scrollIntoView({ block: 'nearest', behavior: reduced ? 'auto' : 'smooth' });
  }
}

export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (reduced || coarse) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;
    active = lenis;
    if (locks > 0) lenis.stop();

    // The frame loop runs only while Lenis is easing. Lenis needs frames for
    // nothing else (native scrolling and resizes are event-driven), and an
    // always-on loop kept a slow laptop rendering frames for as long as the
    // page was open, scrolling or not. Every smooth scroll begins with a
    // wheel event (Lenis's `virtual-scroll`) or our own scrollTo, which wake
    // it. `time = 0` makes the first frame after a sleep advance by nothing
    // rather than by the whole sleep, which would end the ease at once.
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = lenis.isScrolling === 'smooth' ? requestAnimationFrame(raf) : 0;
    };
    const wake = () => {
      if (frame) return;
      lenis.time = 0;
      frame = requestAnimationFrame(raf);
    };
    wakeActive = wake;
    const offVirtual = lenis.on('virtual-scroll', wake);

    // Stop the ease the moment a link is followed, so the old page doesn't
    // keep scrolling while the new one loads. In-page hash links (#projects,
    // #join) settle too: an ease still running carried on toward its old
    // target and dragged the page back off the anchor. New-tab clicks are
    // left alone.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a || (a.target && a.target !== '_self')) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && !url.hash) return;
      settle(lenis);
    };
    document.addEventListener('click', onClick, true);

    return () => {
      document.removeEventListener('click', onClick, true);
      offVirtual();
      wakeActive = () => {};
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
      active = null;
    };
  }, []);

  // And again once the new page is in, after Next has set its scroll position
  // (covers back/forward and any navigation that isn't a link click).
  useEffect(() => {
    if (lenisRef.current) settle(lenisRef.current);
  }, [pathname]);

  return null;
}
