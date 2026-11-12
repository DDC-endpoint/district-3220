import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { HERO } from '@/lib/home';
import { SITE } from '@/lib/site';

/**
 * The home hero: one piece of district artwork (2026-10-14; it replaced the
 * four-photo Clip Reveal slideshow, DECISIONS §6 revision). The artwork carries
 * its own title, centred, so the h1 is for screen readers and the only visible
 * copy is the two buttons, kept low and clear of the title. (The user dropped
 * the lede line on 2026-10-14; the stats band below carries the figures.)
 *
 * From lg the artwork is full-bleed under the transparent header. Below lg a
 * full-height box would crop the 16:9 artwork to its middle and cut the title,
 * so phones and portrait tablets show it whole across the top, on navy, with
 * the buttons underneath.
 *
 * The image clips in on load (CSS, `clip-in-load`) and the buttons rise in
 * after it, so nothing in the first viewport waits on JavaScript.
 */

/**
 * Photo scrim, chalk-950 only (DECISIONS §2), from lg up where the buttons sit
 * on the artwork. The top band keeps the transparent header's nav legible over
 * the artwork's top edge; the bottom gradient sits under the buttons, over the
 * artwork's yellow lower edge (the ghost button's label measured 2.5:1 there
 * with no scrim), and is gone before it reaches the title. Measured 2026-10-14
 * against the real pixels behind each text box (worst 10%, text-shadow
 * ignored): see HANDOFF. Swapping the artwork means re-measuring.
 */
const scrim = (pct: number, at: string) => `color-mix(in srgb, var(--color-chalk-950) ${pct}%, transparent) ${at}`;
const HERO_SCRIM = [
  `linear-gradient(to bottom, ${scrim(44, '0px')}, ${scrim(46, '112px')}, ${scrim(0, '176px')})`,
  `linear-gradient(to top, ${scrim(50, '0px')}, ${scrim(36, '150px')}, ${scrim(0, '280px')})`,
].join(', ');

export function Hero() {
  // object-cover in a box at least 100vw x max(100svh, 560px): a box taller
  // than 16:9 draws the artwork at its height, so it needs this much width.
  const k = HERO.image.width / HERO.image.height;
  const sizes = `(min-width: 1024px) max(100vw, ${Math.ceil(k * 100)}svh, ${Math.ceil(k * 560)}px), 100vw`;

  return (
    <section
      aria-labelledby="hero-heading"
      // Pulled up under the sticky header by exactly the header's height, so
      // the header is see-through over the artwork (lg) or over navy (below).
      className="relative isolate -mt-16 overflow-hidden bg-navy-900 text-white md:-mt-18 lg:h-[100svh] lg:min-h-[560px]"
    >
      <h1 id="hero-heading" className="sr-only">
        {SITE.name}, {SITE.region}
      </h1>

      <div className="clip-in-load relative mt-16 aspect-video md:mt-18 lg:absolute lg:inset-0 lg:mt-0 lg:aspect-auto">
        {/* The LCP. fetchPriority rather than `preload`, as the Next 16 docs
            advise: the preload link went out at Low priority and queued
            behind the header logos on a throttled phone. */}
        <Image src={HERO.image} alt={HERO.alt} fill loading="eager" fetchPriority="high" sizes={sizes} className="object-cover" />
        <div aria-hidden="true" className="absolute inset-0 hidden lg:block" style={{ backgroundImage: HERO_SCRIM }} />
      </div>

      <div className="container-page relative pt-7 pb-10 lg:absolute lg:inset-x-0 lg:bottom-0 lg:pt-0 lg:pb-12">
        {/* Centred under the artwork's centred title: with no copy beside
            them, left-aligned buttons read as leftovers. */}
        <div className="rise-in-load flex flex-wrap justify-center gap-3" style={{ ['--step' as string]: 4 }}>
          <Button href="#join" tone="onPhoto">
            Join a club
          </Button>
          <Button href="#projects" tone="onPhotoGhost">
            See the projects
          </Button>
        </div>
      </div>

      {/* SiteHeader watches this to decide whether the bar is transparent or
          solid. 16px from the top, so the solid bar returns on the first real
          scroll (white nav text over a moving image stops being legible) and
          a rubber-band bounce cannot flicker it. */}
      <div data-hero-top aria-hidden="true" className="absolute inset-x-0 top-4 h-px" />
    </section>
  );
}
