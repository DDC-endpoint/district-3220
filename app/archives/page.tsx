import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHeader } from '@/components/page/page-header';
import { SectionHeader } from '@/components/page/section-header';
import { Reveal } from '@/components/motion/reveal';
import { ArchiveRail } from '@/components/archives/archive-rail';
import { ARCHIVE_YEARS, UNRECORDED_SPAN } from '@/lib/archives';
import { PAST_COUNCILS } from '@/lib/councils';
import { DIRS } from '@/lib/dirs';
import { DEFAULT_FOCUS } from '@/lib/people';
import { keepTogether } from '@/components/people/keep-together';

export const metadata: Metadata = {
  title: 'Archives',
  description: 'The councils, projects and milestones of Interact District 3220, year by year since 1988.',
};

/** The most recent DIRs with a portrait, newest first, for the College of DIRs card. */
const RECENT_DIRS = DIRS.filter((d) => d.image).slice(0, 4);
const FIRST_DIR_YEAR = DIRS.at(-1)!.year.slice(0, 4);

export default function ArchivesPage() {
  return (
    <main id="main">
      <PageHeader
        title="The district archives."
        lede="The councils, projects and milestones of Interact clubs across Sri Lanka and the Maldives: who led each year, what they achieved, and the Rotary theme they served under."
      />

      {/* ---------- the timeline ---------- */}
      <section aria-labelledby="years-heading" className="mt-16 bg-navy-900 text-white md:mt-24">
        <div className="container-page pt-16 md:pt-24">
          <SectionHeader
            id="years-heading"
            tone="dark"
            // The rail runs oldest first and pans as you scroll; the phone list
            // below runs newest first and scrolls down, so it gets its own
            // wording (decided 2026-10-06). display:none keeps screen readers
            // to the one that is showing.
            title={
              <>
                <span className="md:hidden">Every year on record, newest first.</span>
                <span className="hidden md:inline">Every year on record, oldest first.</span>
              </>
            }
            lede={
              <>
                <span className="hidden md:inline">Scroll to move through the years. </span>
                Open any one for its council, its projects and the people who ran them.
              </>
            }
          />
        </div>

        <ArchiveRail years={ARCHIVE_YEARS} />

        {/* Phones: a plain list, newest first. */}
        <ol className="container-page mt-8 pb-16 md:hidden">
          {ARCHIVE_YEARS.map((y) => (
            <li key={y.slug} className="border-t border-white/15 first:border-t-0">
              <Link href={`/archives/${y.slug}`} className="block py-5">
                <span className="flex items-baseline justify-between gap-4">
                  <span className="font-display text-[1.35rem] leading-none font-semibold tracking-[-0.02em]">{y.label}</span>
                </span>
                {y.theme && <span className="mt-2 block font-display text-white/80 italic">“{y.theme}”</span>}
                {y.dir && <span className="label-micro mt-1.5 block text-white/55">DIR {keepTogether(y.dir)}</span>}
              </Link>
              {y.slug === '2020-21' && (
                <Link href="/archives/college-of-dirs" className="block border-t border-white/15 py-5" data-placeholder>
                  <span className="font-display text-[1.35rem] leading-none font-semibold tracking-[-0.02em] text-white/70">
                    {UNRECORDED_SPAN.from} – {UNRECORDED_SPAN.to}
                  </span>
                  <span className="mt-2 block text-sm text-white/60">
                    The archive holds no year pages for this period. Each year’s DIR and Rotary theme are listed in the College of DIRs.
                  </span>
                </Link>
              )}
            </li>
          ))}
        </ol>
        <div className="hidden h-16 md:block" />
      </section>

      {/* ---------- past councils ---------- */}
      <section aria-labelledby="councils-heading" className="container-page py-16 md:py-24">
        <SectionHeader
          id="councils-heading"
          title="Past councils, in portraits."
          lede="The years the district kept a portrait page for its council. Earlier councils are listed by name in each year’s archive."
        />
        <ul className="mt-8 grid gap-3 md:grid-cols-3">
          {PAST_COUNCILS.map((c, i) => {
            const dir = c.groups[0]?.people[0];
            return (
              <Reveal key={c.year} step={Math.min(i, 4)} as="li">
                <Link
                  href={`/archives/council/${c.year}`}
                  className="group grid grid-cols-[6rem_minmax(0,1fr)] items-end gap-5 rounded-panel border border-hairline bg-surface p-4 transition-colors duration-200 hover:border-accent-fill md:grid-cols-[7rem_minmax(0,1fr)]"
                >
                  <span className="relative block aspect-[4/5] overflow-hidden rounded-media bg-sunk">
                    {dir?.image && (
                      <Image
                        src={dir.image}
                        alt=""
                        fill
                        sizes="112px"
                        className="object-cover transition-[scale] duration-[600ms] ease-out-expo group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
                        style={{ objectPosition: dir.focus ?? DEFAULT_FOCUS }}
                      />
                    )}
                  </span>
                  <span className="pb-1">
                    <span className="label-micro block text-content-soft">{c.label}</span>
                    <span className="mt-2 block item-title text-item">
                      Council {c.label}
                    </span>
                    {/* Theme and DIR on their own lines: run together they
                        wrapped mid-name ("DIR Damian / De Cruz"). */}
                    <span className="mt-1.5 block text-sm text-content-muted">“{c.theme}”</span>
                    <span className="mt-0.5 block text-sm text-content-muted">DIR {keepTogether(c.dir)}</span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </section>

      {/* ---------- College of DIRs ---------- */}
      <section aria-labelledby="dirs-heading" className="container-page pb-16 md:pb-24">
        <SectionHeader
          id="dirs-heading"
          title="College of DIRs."
          lede={`The ${DIRS.length} District Interact Representatives who have led Interact in the district since ${FIRST_DIR_YEAR}, with the Rotary theme of each year.`}
        />
        <Reveal className="mt-8">
          <Link
            href="/archives/college-of-dirs"
            className="group grid gap-6 rounded-panel border border-hairline bg-surface p-4 transition-colors duration-200 hover:border-accent-fill md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:p-5"
          >
            <span aria-hidden="true" className="flex gap-2.5 md:gap-3">
              {RECENT_DIRS.map((d, i) => (
                // Three portraits on phones, four from sm up.
                <span
                  key={d.year}
                  className={`relative block aspect-[4/5] w-[calc((100%-1.25rem)/3)] overflow-hidden rounded-media bg-sunk sm:w-24 md:w-28 ${
                    i === 3 ? 'hidden sm:block' : ''
                  }`}
                >
                  <Image
                    src={d.image!}
                    alt=""
                    fill
                    sizes="112px"
                    className="object-cover transition-[scale] duration-[600ms] ease-out-expo group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
                  />
                </span>
              ))}
            </span>
            <span className="flex items-end justify-between gap-6 md:flex-col md:items-end md:gap-10">
              <span className="md:text-right">
                <span className="label-micro block text-content-soft">
                  {FIRST_DIR_YEAR} to today · {DIRS.length} terms
                </span>
                <span className="mt-2 block item-title text-item">
                  The full timeline
                </span>
              </span>
              <span
                aria-hidden="true"
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-control border border-control-border transition-[background-color,border-color,color,translate] duration-200 group-hover:translate-x-0.5 group-hover:border-accent-fill group-hover:bg-accent-fill group-hover:text-accent-on motion-reduce:group-hover:translate-x-0"
              >
                <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 10h12M11 5l5 5-5 5" />
                </svg>
              </span>
            </span>
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
