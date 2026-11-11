import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHeader } from '@/components/page/page-header';
import { Reveal } from '@/components/motion/reveal';
import { keepTogether } from '@/components/people/keep-together';
import { DIRS, DISTRICT_ERAS, type DirTerm } from '@/lib/dirs';

export const metadata: Metadata = {
  title: 'College of DIRs',
  description: 'Every District Interact Representative of Interact District 3220 and its predecessors, since 1979.',
};

/**
 * The College of DIRs as one long timeline, newest first, split by the Rotary
 * district number each term served under. The Signal line draws down the page
 * as it is read (globals.css, VERTICAL LINE DRAW).
 */
export default function CollegeOfDirsPage() {
  return (
    <main id="main">
      <PageHeader
        crumbs={[{ label: 'Archives', href: '/archives' }]}
        title="College of DIRs."
        lede={`The ${DIRS.length} District Interact Representatives who have led Interact in the district since 1979, with the Rotary theme of each year.`}
      />

      <div className="container-page py-14 md:py-20">
        {DISTRICT_ERAS.map((era) => {
          const terms = DIRS.filter((d) => d.district === era.district);
          const id = `era-${era.district}`;
          return (
            <section key={era.district} aria-labelledby={id} className="mt-6 first:mt-0 md:mt-10">
              <Reveal className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pb-6">
                <h2 id={id} className="text-[1.45rem] leading-tight tracking-[-0.015em] md:text-[1.7rem]">
                  {era.label}
                </h2>
                <span className="label-micro text-content-soft">
                  {era.span} · {String(terms.length).padStart(2, '0')} terms
                </span>
              </Reveal>
              {/* The line lives on a wrapper, not inside the <ol>: a list may
                  only contain list items. The wrapper is also the timeline. */}
              <div className="vtrack relative">
                <span aria-hidden="true" className="absolute top-0 bottom-0 left-[4px] w-px bg-hairline md:left-[8.5rem]" />
                <span aria-hidden="true" className="vtrack-line absolute top-0 bottom-0 left-[4px] w-px bg-accent md:left-[8.5rem]" />
                <ol>
                  {terms.map((t, i) => (
                    <Term key={`${t.year}-${i}`} term={t} />
                  ))}
                </ol>
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}

function Term({ term }: { term: DirTerm }) {
  const hasPortrait = term.district === '3220' && Number(term.year.slice(0, 4)) >= 2010;
  return (
    // The last term in each era paints a chalk strip over the rail below its
    // node, so the line ends at the last dot instead of running on through
    // the term's own text and padding.
    <li className="relative grid gap-x-8 pb-10 pl-7 last:after:absolute last:after:top-[calc(0.55rem+9px)] last:after:bottom-0 last:after:left-0 last:after:w-[9px] last:after:bg-bg md:grid-cols-[8.5rem_minmax(0,1fr)] md:pl-0 md:last:after:left-[calc(8.5rem-4px)]">
      {/* Node on the line. Lit by default; the scroll-driven version starts
          neutral and lights as it crosses the middle of the screen. */}
      <span
        aria-hidden="true"
        className="vtrack-node absolute top-[0.55rem] left-0 size-[9px] rounded-full bg-accent ring-4 ring-bg md:left-[calc(8.5rem-4px)]"
      />
      {/* Every year at one size. Two-year spans ("1988/89/90", "1999/2000")
          don't fit the fixed year column at that size, so they may break after
          the first slash rather than shrink and read as a lesser year. */}
      <p className="font-display text-[1.25rem] leading-[1.05] font-semibold tracking-[-0.02em] tabular-nums md:pr-8 md:text-right md:text-[1.4rem]">
        {term.year.replace('/', '/\u200b')}
      </p>
      <div className="mt-3 flex gap-5 md:mt-0 md:pl-10">
        {hasPortrait && (
          <div className="relative aspect-[4/5] w-20 shrink-0 overflow-hidden rounded-media bg-sunk md:w-24">
            {term.image ? (
              <Image
                src={term.image}
                alt={`Portrait of ${term.name}`}
                fill
                sizes="96px"
                className="object-cover"
              />
            ) : (
              <span
                data-placeholder
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center border border-dashed border-control-border font-display text-[1.4rem] font-semibold text-content-soft"
              >
                {term.name
                  .split(' ')
                  .slice(0, 2)
                  .map((w) => w[0])
                  .join('')}
              </span>
            )}
          </div>
        )}
        {/* Terms without a portrait slot still reserve its width from md up,
            so name and theme sit in the same columns all the way down. */}
        {!hasPortrait && <div aria-hidden="true" className="hidden w-24 shrink-0 md:block" />}
        {/* From lg up the Rotary theme takes its own column, so the year's
            theme reads as a second voice beside the person, not a footnote. */}
        <div className="min-w-0 flex-1 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10">
          <div>
            <h3 className="item-title text-item">{keepTogether(term.name)}</h3>
            {term.school && <p className="mt-0.5 text-sm text-content-muted">{keepTogether(term.school)}</p>}
            {term.partner && (
              <p className="label-micro mt-3 text-content-soft">
                With {keepTogether(term.partner)}
                {term.partnerSchool ? `, ${keepTogether(term.partnerSchool)}` : ''}
              </p>
            )}
          </div>
          {/* balance, not the global pretty: themes are one to three lines,
              and pretty still left "the World" alone on the last one. */}
          <p className="mt-2.5 font-display text-[1.02rem] text-balance text-content-muted italic lg:mt-0 lg:text-[1.3rem] lg:leading-snug">
            “{term.theme}”
          </p>
        </div>
      </div>
    </li>
  );
}
