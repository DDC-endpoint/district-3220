import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader, PageMedia } from '@/components/page/page-header';
import { SectionHeader } from '@/components/page/section-header';
import { Reveal } from '@/components/motion/reveal';
import { StatsBand } from '@/components/home/stats-band';
import { ClosingCta } from '@/components/home/closing-cta';
import { MILESTONES, PURPOSE, ZONES } from '@/lib/about';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description: `${SITE.name} is Rotary International’s service club for young people aged 12–19, run by students across ${SITE.region} since ${SITE.districtFounded}.`,
};

const PEOPLE_LINKS = [
  { href: '/council/2026-27', label: 'Meet the Council 2026/27', note: 'This year’s district council' },
  { href: '/archives', label: 'Archives', note: 'Councils, projects and events, year by year' },
];

export default function AboutPage() {
  return (
    <main id="main">
      <PageHeader
        title={`Interact in ${SITE.region}, since ${SITE.districtFounded}.`}
        lede={`Interact is Rotary International’s service club for young people aged 12–19. In District 3220 it is run by its members: about ${SITE.memberCountLabel} students in more than 100 school clubs.`}
      />
      <PageMedia
        src="/images/hero/assembly.webp"
        alt="Interactors from clubs across the district filling the assembly hall"
        caption="District Assembly, Colombo"
      />

      <div className="mt-16 md:mt-24">
        <StatsBand />
      </div>

      {/* ---------- vision, mission, goals ---------- */}
      <section aria-labelledby="purpose-heading" className="container-page py-16 md:py-24">
        <SectionHeader id="purpose-heading" title="Vision, mission and goals." />
        <ol className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
          {PURPOSE.map((p, i) => (
            <Reveal key={p.title} step={Math.min(i, 4)} as="li">
              <p className="label-micro text-content-soft">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-3 item-title text-item">{p.title}</h3>
              <p className="mt-3 max-w-[40ch] text-content-muted">{p.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ---------- milestones ---------- */}
      <section aria-labelledby="history-heading" className="container-page pb-16 md:pb-24">
        <div className="grid gap-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-16">
          <div className="md:sticky md:top-28 md:self-start">
            <Reveal as="h2" className="max-w-[16ch] text-title">
              <span id="history-heading">Sixty years of student-run service.</span>
            </Reveal>
            <Reveal step={1} as="p" className="mt-3.5 max-w-[40ch] text-content-muted">
              The movement began in 1962. The district’s own record starts two years later.
            </Reveal>
          </div>
          <ol className="border-t border-hairline">
            {MILESTONES.map((m, i) => (
              <Reveal
                key={m.year}
                step={Math.min(i, 3)}
                as="li"
                className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-4 border-b border-hairline py-5 md:grid-cols-[8rem_minmax(0,1fr)]"
              >
                <span className="font-display text-[1.35rem] leading-none font-semibold tracking-[-0.02em] tabular-nums">
                  {m.year}
                </span>
                <span className="text-content-muted">{m.text}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- zones: the navy band ---------- */}
      <section aria-labelledby="zones-heading" className="bg-navy-900 text-white">
        <div className="container-page py-16 md:py-24">
          <SectionHeader
            id="zones-heading"
            tone="dark"
            title="Nine zones, two countries."
            lede="Clubs are organised into zones, each with its own representative on the district council."
          />
          {/* Every zone carries a leading separator in a 32px slot, and the list
              is pulled 32px left inside a horizontal clip. Whichever zones start
              a line have their dot clipped away, so no line starts or ends on
              a dot at any width. overflow-x-clip leaves the rise-in visible. */}
          <div className="mt-10 overflow-x-clip">
            <ul className="-ml-8 flex flex-wrap gap-y-2 font-display text-[clamp(1.6rem,3.6vw,2.8rem)] leading-[1.2] font-semibold tracking-[-0.02em]">
              {ZONES.map((z, i) => (
                <Reveal key={z} step={Math.min(i, 6)} as="li" className="flex items-baseline">
                  <span aria-hidden="true" className="w-8 shrink-0 text-center text-white/25">
                    ·
                  </span>
                  <span className={z === 'Maldives region' ? 'text-signal-400' : ''}>{z}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- the people ---------- */}
      <section aria-labelledby="people-heading" className="container-page py-16 md:py-24">
        <SectionHeader id="people-heading" title="The council and its history." />
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {PEOPLE_LINKS.map((l, i) => (
            <Reveal key={l.href} step={Math.min(i, 4)} as="li">
              <Link
                href={l.href}
                // Phone: one row, arrow beside the text. From md the cards sit
                // side by side and the arrow drops to the corner.
                className="group flex h-full items-center justify-between gap-6 rounded-panel border border-hairline bg-surface p-6 transition-colors duration-200 hover:border-accent-fill md:flex-col md:items-stretch md:gap-10 md:p-7"
              >
                <span>
                  <span className="block item-title text-item">
                    {l.label}
                  </span>
                  <span className="mt-2 block text-sm text-content-muted">{l.note}</span>
                </span>
                <span
                  aria-hidden="true"
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-control md:self-end border border-control-border transition-[background-color,border-color,color,translate] duration-200 group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0 group-hover:border-accent-fill group-hover:bg-accent-fill group-hover:text-accent-on"
                >
                  <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 10h12M11 5l5 5-5 5" />
                  </svg>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      <ClosingCta aboutLink={false} />
    </main>
  );
}
