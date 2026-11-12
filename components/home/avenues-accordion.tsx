'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useHoverIntent } from '@/components/motion/use-hover-intent';
import { AVENUE_PANELS, type AvenuePhoto } from '@/lib/home';

/** flex-grow of the open panel; the closed ones grow 1. */
const OPEN_GROW = 4.4;
/** Total gap between the five panels from md up (md:gap-2 x 4). */
const GAPS = '2rem';
/**
 * The open panel's width, as a share of the accordion's own width (`cqw`).
 * The collage is laid out at this width in every state and anchored left, so
 * opening a panel uncovers the right column instead of reflowing four crops
 * on every frame of the 750ms grow.
 */
const OPEN_WIDTH = `calc((100cqw - ${GAPS}) * ${OPEN_GROW} / ${OPEN_GROW + 4})`;

/**
 * Accordion Gallery (lab.damiandc.com/accordion-gallery).
 *
 * All five panels start collapsed and equal. Hovering one opens it and the
 * others give way; clicking locks it so hover stops changing things, and
 * clicking the locked panel releases it.
 *
 * Two layouts, one component:
 *  - md and up: a true accordion. A collage of four of the avenue's photos
 *    fills the panel above a solid band in its colour; the logo is a badge on
 *    the band's top edge (2026-10-13, DECISIONS §2). A closed panel shows the
 *    collage's left column, the open one all four.
 *  - below md: five columns of 78px is unusable, so it becomes a list with the
 *    logo on a tint and the colour on the left edge; opening a row reveals the
 *    description and the collage beneath it.
 *
 * `onSolid` picks the band's text colour. All five are 'light' (white) by
 * request. Community Service's amber can't carry white at AA, so its band uses
 * the darker `solid` colour (lib/home.ts CONTRAST NOTE, 2026-10-06). The blurb
 * and the number are white at 90%: 85% measured 4.26:1 on Club Service and
 * 4.33:1 on Green Life. The 'dark' branch is kept in case a future colour
 * needs it.
 *
 * Deliberately NOT a morph-cursor target: a collapsed panel is roughly
 * 140x520, so the cursor would inflate into a slab and fight the hover.
 */
export function AvenuesAccordion() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [locked, setLocked] = useState<number | null>(null);
  const open = locked ?? hovered;
  // Hover opens after a short intent delay (components/motion/use-hover-intent).
  const { schedule, cancel: cancelIntent } = useHoverIntent();

  return (
    <div
      // A size container, so the collage can be laid out at the open panel's
      // width (OPEN_WIDTH) whichever panel it sits in.
      className="@container mt-8 flex flex-col gap-2.5 md:h-[clamp(320px,42vw,520px)] md:flex-row md:gap-2"
      onMouseLeave={() => {
        cancelIntent();
        setHovered(null);
      }}
    >
      {AVENUE_PANELS.map((a, i) => {
        const isOpen = open === i;
        const dark = a.onSolid === 'dark';
        const number = (
          <>
            {String(i + 1).padStart(2, '0')}
            {locked === i && <span className="opacity-60"> locked</span>}
          </>
        );
        return (
          <button
            key={a.slug}
            type="button"
            // The name alone is the accessible name; the blurb is its
            // description while open, rather than the whole paragraph being
            // read out as the button's name. Expanded reports what is on
            // screen: focus opens a panel, so a focused panel is expanded
            // (the Media Crew accordion behaves the same). Announcing
            // "collapsed" over a visible blurb was the worse lie.
            aria-labelledby={`avenue-${a.slug}-name`}
            aria-describedby={isOpen ? `avenue-${a.slug}-blurb` : undefined}
            aria-controls={`avenue-${a.slug}-blurb`}
            aria-expanded={isOpen}
            data-open={isOpen}
            onMouseEnter={() => {
              if (locked !== null) return;
              schedule(() => setHovered(i));
            }}
            onMouseLeave={cancelIntent}
            onFocus={() => locked === null && setHovered(i)}
            // Tabbing out must close what tabbing in opened.
            onBlur={() => locked === null && setHovered(null)}
            onClick={() => {
              // Closing must clear the focus/hover opener too: a tap focuses
              // the row, so on Android a second tap unlocked it but `hovered`
              // (set on focus) kept it open.
              if (locked === i) setHovered(null);
              setLocked((l) => (l === i ? null : i));
            }}
            style={{
              ['--k' as string]: a.colour,
              // The band behind the white name: `solid` where the brand
              // colour can't carry white at AA (Community Service). From md up
              // it also shows through the collage's seams.
              ['--k-solid' as string]: a.solid ?? a.colour,
              ['--k-tint' as string]: `color-mix(in srgb, ${a.colour} ${isOpen ? 15 : 9}%, #FFFFFF)`,
              flexGrow: isOpen ? OPEN_GROW : 1,
            }}
            // flex-grow is the only layout property animating here, on a
            // longer, gentler curve than the default. From md up everything
            // inside is absolutely placed, so the panels split purely by grow.
            className="group relative grid min-h-[92px] grid-cols-[92px_1fr] items-center overflow-hidden rounded-media border-l-4 border-l-[var(--k)] bg-[var(--k-tint)] text-left transition-[flex-grow,background-color] duration-[750ms] ease-out-quint md:block md:min-h-0 md:min-w-0 md:border-l-0 md:bg-[var(--k-solid)]"
          >
            {/* Phone: logo in a fixed column. */}
            <span className="grid place-items-center p-3.5 md:hidden">
              <Image src={a.logo} alt="" width={160} height={160} className="max-h-[54px] w-auto object-contain" />
            </span>

            {/* Phone: the number, top right of the row. 60% with black clears
                4.5:1 on every avenue's tint, including Community Service's
                amber (78% measured 3.74:1). */}
            <span
              className="label-micro absolute top-2.5 right-3 z-10 md:hidden"
              style={{ color: `color-mix(in srgb, ${a.colour} 60%, #000000)` }}
            >
              {number}
            </span>

            {/* md and up: the collage, at the open width, anchored left. Its
                box is fixed in every state: the band's resting height is
                reserved below it, and the band slides up over the photos as
                it opens rather than squeezing them. A box that changed size
                re-cropped all four photos on every frame of the open, which
                read as the pictures shaking and drifting. */}
            <span className="absolute inset-x-0 top-0 bottom-24 hidden overflow-hidden md:block">
              <span className="absolute inset-y-0 left-0" style={{ width: OPEN_WIDTH }}>
                <Collage photos={a.photos} sizes={collageSizes} />
              </span>
            </span>

            {/* Band. Transparent on phones (the left edge carries the colour),
                solid from md up with the logo badge on its top edge. */}
            <span
              className={`relative z-10 block py-3.5 pr-4 md:absolute md:inset-x-0 md:bottom-0 md:min-h-24 md:bg-[var(--k-solid)] md:p-4 md:pt-8 md:pb-[18px] ${
                dark ? 'md:text-chalk-950' : 'md:text-white'
              }`}
            >
              <span className="absolute -top-[22px] left-4 hidden size-11 place-items-center rounded-full bg-white md:grid">
                <Image src={a.logo} alt="" width={64} height={64} className="size-7 object-contain" />
              </span>
              <span className={`label-micro mb-1.5 hidden md:block ${dark ? 'text-chalk-950/80' : 'text-white/90'}`}>
                {number}
              </span>
              <span
                id={`avenue-${a.slug}-name`}
                className={`block item-title ${
                  isOpen ? 'md:text-[clamp(1rem,1.5vw,1.2rem)]' : 'md:text-[0.78rem] md:leading-snug'
                } [overflow-wrap:anywhere]`}
              >
                {a.name}
              </span>
              {/* grid-template-rows 0fr -> 1fr, not max-height. It resolves to
                  the content's real height, so the reveal finishes exactly when
                  the text does instead of easing toward a guessed ceiling. */}
              <span
                className={`grid transition-[grid-template-rows,opacity,margin-top] duration-[750ms] ease-out-quint ${
                  isOpen ? 'mt-2 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0'
                }`}
              >
                {/* From md the blurb is sized to the OPEN panel, not the
                    growing one (the collage's trick), so its lines don't
                    rewrap on every frame of the 750ms open. */}
                <span
                  id={`avenue-${a.slug}-blurb`}
                  style={{ ['--blurb-w' as string]: `min(38ch, calc(${OPEN_WIDTH} - 2rem))` }}
                  className={`block max-w-[38ch] overflow-hidden text-[0.93rem] text-content-muted md:w-[var(--blurb-w)] md:max-w-none ${
                    dark ? 'md:text-chalk-950/80' : 'md:text-white/90'
                  }`}
                >
                  {a.blurb}
                </span>
              </span>
            </span>

            {/* Phone: the collage opens under the row, on the same reveal. */}
            <span
              className={`col-span-2 grid transition-[grid-template-rows,opacity] duration-[750ms] ease-out-quint md:hidden ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <span className="block min-h-0 overflow-hidden">
                <span className="block p-2.5 pt-0">
                  <span className="block aspect-[3/2] overflow-hidden rounded-media bg-[var(--k-solid)]">
                    <Collage photos={a.photos} sizes={() => '46vw'} />
                  </span>
                </span>
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

/**
 * md and up, a collage cell is half the open panel (about 26vw) wide and about
 * 14.5vw tall at the accordion's 42vw height, so a photo wider than the cell
 * renders at its height times its ratio instead (DECISIONS §5).
 */
const collageSizes = (p: AvenuePhoto) =>
  `${Math.max(26, Math.round(14.5 * (p.image.width / p.image.height)))}vw`;

/**
 * Two by two, the seams in the avenue's colour (the container's background).
 * alt="" here, as on the project tiles: the photos sit inside the panel's
 * button, which reads the avenue's name. Each photo's description is kept in
 * lib/home.ts for wherever it is shown on its own.
 */
function Collage({ photos, sizes }: { photos: AvenuePhoto[]; sizes: (p: AvenuePhoto) => string }) {
  return (
    <span className="grid size-full grid-cols-2 grid-rows-2 gap-[3px]">
      {photos.map((p) => (
        <span key={p.image.src} className="relative overflow-hidden">
          <Image src={p.image} alt="" fill sizes={sizes(p)} className="object-cover" />
        </span>
      ))}
    </span>
  );
}
