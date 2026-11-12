'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Morph cursor (lab.damiandc.com/morph-cursor).
 *
 * A soft blob follows the pointer and parks exactly on anything marked
 * `data-morph`, taking that element's box and border radius. Controls are
 * pills, so it reads as the cursor wrapping the button. Any other link or
 * button (the logo, text links, cards too big to park on) grows the dot into
 * a ring instead, so every clickable thing still answers the pointer.
 *
 * Over dark surfaces it switches to a white treatment: the light-surface tint
 * multiplies, which vanishes on navy and on photography. Tone comes from the
 * nearest `data-cursor="dark" | "light"` ancestor when there is one (the
 * header needs it: it is see-through over the hero), otherwise from the first
 * opaque background behind the target.
 *
 * Three deliberate constraints, each of which fixed a real problem:
 *  - fine pointers only, and never under reduced motion, because it hides the
 *    native pointer;
 *  - it parks only on control-sized elements. Without the cap it inflated to
 *    cover a 140x520 accordion panel and fought that panel's own hover;
 *  - position is written straight to the element inside rAF and never through
 *    React state, which would re-render the tree on every mouse move;
 *  - the loop sleeps once the blob has settled. A still pointer used to cost
 *    a style write, and so a whole rendered frame, 60 times a second for as
 *    long as the page was open: on a slow laptop that was a steady share of
 *    the main thread spent drawing nothing new. Any pointer, key, scroll,
 *    resize or route change wakes it.
 *
 * Styles for each state live in globals.css under `.morph-cursor`.
 */
const MAX_PARK_WIDTH = 340;
const MAX_PARK_HEIGHT = 150;
const DOT = 13;
const RING = 36;
/**
 * Easing time constants (ms). The blob closes ~63% of the remaining gap every
 * `tau`. Time-based rather than a fixed fraction per frame, so it feels the
 * same at 60Hz and 144Hz and doesn't fall further behind when a frame drops.
 * Free follow is tight so the dot reads as the pointer; parking keeps a little
 * glide so the wrap onto a control is visible.
 */
const FOLLOW_TAU = 22;
const PARK_TAU = 45;
/** Minimum gap between hit tests while scrolling (see the loop). */
const RESCAN_MS = 100;
/**
 * How long the blob must sit still, its target unmoved, before the loop
 * sleeps. Long enough to cover a control that starts moving a beat after the
 * input that woke the loop (a press, a staggered transition).
 */
const SETTLE_MS = 300;
const CLICKABLE ='a[href], button:not(:disabled), [role="button"], summary';

type Mode = 'dot' | 'park' | 'link';

let swatch: CanvasRenderingContext2D | null = null;

/**
 * Any computed colour as 0–255 RGBA. Computed colours aren't always rgb():
 * color-mix() backgrounds (the avenue plates) serialise as `color(srgb …)`
 * or `oklab(…)`, whose 0–1 channels read as near-black if parsed as numbers.
 * Painting one canvas pixel lets the browser do the conversion.
 */
function toRgba(colour: string): [number, number, number, number] {
  swatch ??= document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  if (!swatch) return [255, 255, 255, 0];
  swatch.clearRect(0, 0, 1, 1);
  swatch.fillStyle = colour;
  swatch.fillRect(0, 0, 1, 1);
  const [r, g, b, a] = swatch.getImageData(0, 0, 1, 1).data;
  return [r, g, b, a / 255];
}

const CORNERS = [
  ['borderTopLeftRadius', 'left', 'top'],
  ['borderTopRightRadius', 'right', 'top'],
  ['borderBottomRightRadius', 'right', 'bottom'],
  ['borderBottomLeftRadius', 'left', 'bottom'],
] as const;

/**
 * The radius the parked blob should take. Tiles inside a rounded, clipped
 * container (the officers grid's overflow-hidden rounded-panel) are square
 * themselves and get their rounded corners from that clip. The blob sits on
 * top of the page and isn't clipped, so copying the tile's own radius left a
 * square corner sticking out past the container's curve. Each tile corner
 * that meets a clipping ancestor's corner takes that ancestor's radius
 * instead.
 */
function parkRadius(target: HTMLElement): string {
  const own = getComputedStyle(target);
  const r = target.getBoundingClientRect();
  const radii: string[] = CORNERS.map(([prop]) => own[prop]);
  for (let node = target.parentElement; node && node !== document.body; node = node.parentElement) {
    const cs = getComputedStyle(node);
    if (cs.overflowX === 'visible' && cs.overflowY === 'visible') continue;
    const a = node.getBoundingClientRect();
    CORNERS.forEach(([prop, x, y], i) => {
      const clip = parseFloat(cs[prop]) || 0;
      if (clip <= (parseFloat(radii[i]) || 0)) return;
      if (Math.abs(r[x] - a[x]) <= 2 && Math.abs(r[y] - a[y]) <= 2) radii[i] = `${clip}px`;
    });
  }
  return radii.join(' ');
}

/** True when the first opaque background behind `el` is dark. */
function onDarkBackground(el: Element | null): boolean {
  for (let node = el; node && node !== document.documentElement; node = node.parentElement) {
    const bg = getComputedStyle(node).backgroundColor;
    if (bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') continue;
    const [r, g, b, a] = toRgba(bg);
    if (a < 0.5) continue;
    // Relative luminance, close enough for a light/dark split.
    const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    return lum < 0.4;
  }
  return false;
}

export function MorphCursor() {
  const ref = useRef<HTMLDivElement | null>(null);
  /** Restarts the loop; set while the cursor is running. */
  const wakeRef = useRef<() => void>(() => {});
  const pathname = usePathname();

  // A route change can remove the parked control without any pointer event.
  useEffect(() => {
    wakeRef.current();
  }, [pathname]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fine = window.matchMedia('(pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || reduced.matches) return;

    document.body.classList.add('cursor-morph');
    el.style.display = 'block';

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let x = pointerX;
    let y = pointerY;
    let mode: Mode = 'dot';
    /** The parked control, or the link the ring is showing for. */
    let target: HTMLElement | null = null;
    /** Element under the pointer, for the per-frame tone check. */
    let hovered: Element | null = null;
    let autoDark = false;
    let dark = false;
    let rescan = false;
    let lastScan = 0;
    let frame = 0;
    let last = performance.now();
    /** Last values written to the element, so a still blob writes nothing. */
    let shownX = NaN;
    let shownY = NaN;
    /** The target's rect last frame, to tell when it has stopped moving. */
    let lastRect = '';
    let stillSince = 0;

    const setMode = (next: Mode, nextTarget: HTMLElement | null) => {
      target = nextTarget;
      if (next === 'park' && nextTarget) {
        const r = nextTarget.getBoundingClientRect();
        el.style.width = `${r.width}px`;
        el.style.height = `${r.height}px`;
        el.style.borderRadius = parkRadius(nextTarget);
      } else {
        const size = next === 'link' ? RING : DOT;
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.borderRadius = '999px';
      }
      if (next !== mode) {
        mode = next;
        el.dataset.mode = next;
      }
    };

    /** Decide what the cursor does for whatever is under the pointer. */
    const resolve = (under: Element | null) => {
      hovered = under;
      autoDark = onDarkBackground(under);
      const morph = under?.closest<HTMLElement>('[data-morph]');
      if (morph) {
        const r = morph.getBoundingClientRect();
        if (r.width <= MAX_PARK_WIDTH && r.height <= MAX_PARK_HEIGHT) {
          if (morph !== target || mode !== 'park') setMode('park', morph);
          return;
        }
      }
      const link = under?.closest<HTMLElement>(CLICKABLE);
      if (link) {
        if (link !== target || mode !== 'link') setMode('link', link);
        return;
      }
      if (mode !== 'dot') setMode('dot', null);
    };

    const onMove = (e: PointerEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
      wake();
    };

    const loop = (now: number) => {
      // Clamped so a backgrounded tab returning doesn't count as one huge step.
      const dt = Math.min(now - last, 64);
      last = now;
      let moving = rescan;

      // Scrolling moves content under a still pointer without a pointerover,
      // so look again — but at most every RESCAN_MS. elementFromPoint and the
      // tone walk force layout and style, and Lenis plus the pinned rails
      // scroll every frame; a per-frame hit test added jank exactly there.
      // The last scroll event leaves `rescan` set, so one final look always
      // happens once scrolling stops.
      if (rescan && now - lastScan >= RESCAN_MS) {
        rescan = false;
        lastScan = now;
        resolve(document.elementFromPoint(pointerX, pointerY));
      }

      // A target that has been removed (a dialog's Close button, a link that
      // navigated) measures as a zero rect, which flew the blob to the
      // top-left corner with the native cursor still hidden. Release it, and a
      // parked control the pointer has slipped off.
      if (target) {
        const r = target.getBoundingClientRect();
        const slack = 8;
        const pointerOff =
          pointerX < r.left - slack || pointerX > r.right + slack || pointerY < r.top - slack || pointerY > r.bottom + slack;
        if (!target.isConnected || pointerOff) setMode('dot', null);
      }

      // Explicit markers are re-read every frame: the header flips from dark
      // to light as the hero scrolls away under a pointer that hasn't moved.
      const marked = hovered?.isConnected ? hovered.closest<HTMLElement>('[data-cursor]') : null;
      const nextDark = marked ? marked.dataset.cursor === 'dark' : autoDark;
      if (nextDark !== dark) {
        dark = nextDark;
        el.dataset.tone = dark ? 'dark' : 'light';
      }

      let goalX = pointerX;
      let goalY = pointerY;
      let tau = FOLLOW_TAU;
      if (mode === 'park' && target) {
        // Re-measured each frame so the blob tracks elements that move or
        // resize under it, such as an accordion panel opening.
        const r = target.getBoundingClientRect();
        goalX = r.left + r.width / 2;
        goalY = r.top + r.height / 2;
        tau = PARK_TAU;
        const rect = `${r.left},${r.top},${r.width},${r.height}`;
        if (rect !== lastRect) {
          lastRect = rect;
          moving = true;
        }
      }
      const k = 1 - Math.exp(-dt / tau);
      x += (goalX - x) * k;
      y += (goalY - y) * k;
      if (Math.abs(goalX - x) < 0.1 && Math.abs(goalY - y) < 0.1) {
        x = goalX;
        y = goalY;
      } else {
        moving = true;
      }
      if (x !== shownX || y !== shownY) {
        shownX = x;
        shownY = y;
        el.style.translate = `${x}px ${y}px`;
      }

      if (moving) stillSince = now;
      if (now - stillSince >= SETTLE_MS) {
        frame = 0;
        return;
      }
      frame = requestAnimationFrame(loop);
    };

    const wake = () => {
      if (frame) return;
      // Restart the clock, so the sleep doesn't count as one long step.
      last = performance.now();
      stillSince = last;
      frame = requestAnimationFrame(loop);
    };
    wakeRef.current = wake;
    wake();

    const onOver = (e: PointerEvent) => {
      resolve(e.target as Element | null);
      wake();
    };
    // Leaving the document entirely: relatedTarget is null.
    const onOut = (e: PointerEvent) => {
      if (!e.relatedTarget) resolve(null);
      wake();
    };
    const onScroll = () => {
      rescan = true;
      wake();
    };
    const onBlur = () => {
      resolve(null);
      wake();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver);
    document.addEventListener('pointerout', onOut);
    window.addEventListener('scroll', onScroll, { passive: true, capture: true });
    window.addEventListener('blur', onBlur);
    // Presses and keys can move or remove the parked control (a dialog
    // opening, Escape closing one) without the pointer moving.
    window.addEventListener('pointerdown', wake, { passive: true });
    window.addEventListener('keydown', wake);
    window.addEventListener('resize', wake);

    return () => {
      cancelAnimationFrame(frame);
      wakeRef.current = () => {};
      window.removeEventListener('pointerdown', wake);
      window.removeEventListener('keydown', wake);
      window.removeEventListener('resize', wake);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
      window.removeEventListener('scroll', onScroll, { capture: true });
      window.removeEventListener('blur', onBlur);
      document.body.classList.remove('cursor-morph');
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-mode="dot"
      data-tone="light"
      // Centring MUST be a `transform`, not Tailwind's `-translate-1/2`: in v4
      // that utility writes the `translate` property, which is the same
      // property this component animates in rAF, so it was being overwritten
      // and the blob hung off the pointer by half its own size.
      className="morph-cursor pointer-events-none fixed top-0 left-0 z-90 hidden size-[13px] rounded-full [transform:translate(-50%,-50%)]"
    />
  );
}
