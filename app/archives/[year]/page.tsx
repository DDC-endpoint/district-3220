import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/page/page-header';
import { SectionHeader } from '@/components/page/section-header';
import { Reveal } from '@/components/motion/reveal';
import { ClipReveal } from '@/components/motion/clip-reveal';
import { Button } from '@/components/ui/button';
import { ARCHIVE_YEARS, getArchiveYear } from '@/lib/archives';

export const dynamicParams = false;

export function generateStaticParams() {
  return ARCHIVE_YEARS.map((y) => ({ year: y.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ year: string }> }): Promise<Metadata> {
  const y = getArchiveYear((await params).year);
  if (!y) return {};
  return {
    title: `Archives ${y.label}`,
    description: y.theme ? `${y.label}, “${y.theme}”. ${y.summary}` : y.summary,
  };
}

export default async function ArchiveYearPage({ params }: { params: Promise<{ year: string }> }) {
  const y = getArchiveYear((await params).year);
  if (!y) notFound();

  const index = ARCHIVE_YEARS.indexOf(y);
  const newer = ARCHIVE_YEARS[index - 1];
  const older = ARCHIVE_YEARS[index + 1];

  return (
    <main id="main">
      <PageHeader
        crumbs={[{ label: 'Archives', href: '/archives' }]}
        title={y.theme ? `${y.label}: ${y.theme}.` : `${y.label}.`}
        lede={y.summary}
      >
        {y.councilPage && <Button href={`/archives/council/${y.slug}`}>Meet the {y.label} council</Button>}
      </PageHeader>

      {/* ---------- the year at a glance ---------- */}
      <section aria-label={`${y.label} at a glance`} className="container-page mt-10">
        <div className={`grid gap-8 ${y.logo ? 'md:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] md:items-start' : ''}`}>
          <div>
            <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2 md:max-w-2xl">
              {y.dir && (
                <div>
                  <dt className="label-micro text-content-soft">District Interact Representative</dt>
                  <dd className="mt-1.5 item-title text-item">{y.dir}</dd>
                </div>
              )}
            </dl>

            {y.figures && (
              <dl className="mt-10 grid grid-cols-2 border-y border-hairline md:grid-cols-4">
                {y.figures.map((f, i) => {
                  // Hairline before every column except the first in its row:
                  // rows are pairs on phones and one row of four from md up.
                  const divider = i === 0 ? '' : i % 2 === 1 ? 'border-l border-hairline pl-5' : 'md:border-l md:border-hairline md:pl-5';
                  return (
                    // dt before dd for valid markup; column-reverse puts the figure on top.
                    <div key={f.label} className={`flex flex-col-reverse justify-end gap-2.5 py-6 pr-4 ${divider}`}>
                      <dt className="label-micro text-content-soft">{f.label}</dt>
                      <dd className="font-display text-[clamp(1.7rem,3.2vw,2.4rem)] leading-none font-semibold tracking-[-0.03em]">{f.value}</dd>
                    </div>
                  );
                })}
              </dl>
            )}
          </div>

          {y.logo && (
            <ClipReveal onLoad className="relative aspect-square overflow-hidden rounded-panel border border-hairline bg-surface">
              <Image src={y.logo} alt={`${y.label} archive artwork`} fill sizes="320px" preload className="object-contain p-8" />
            </ClipReveal>
          )}
        </div>
      </section>

      {/* ---------- the council, by name ---------- */}
      {y.council && (
        <section aria-labelledby="council-heading" className="container-page pt-16 md:pt-24">
          <SectionHeader id="council-heading" title="The council." />
          <dl className="mt-2">
            {y.council.map((c) => (
              <Reveal key={c.role} className="grid gap-1.5 border-b border-hairline py-4 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-8">
                <dt className="label-micro pt-1 text-content-soft">{c.role}</dt>
                <dd className="text-content">{c.names}</dd>
              </Reveal>
            ))}
          </dl>
        </section>
      )}

      {/* ---------- events and projects ---------- */}
      {y.sections.map((s, si) => (
        <section key={s.title} aria-labelledby={`section-${si}`} className="container-page pt-16 md:pt-24">
          <SectionHeader id={`section-${si}`} title={`${s.title}.`} />
          <ol className="mt-2">
            {s.items.map((item, ii) => (
              <Reveal
                key={`${item.title}-${ii}`}
                as="li"
                className="grid gap-1.5 border-b border-hairline py-5 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-8"
              >
                <span className="label-micro pt-1.5 text-content-soft">{item.date ?? ''}</span>
                <div>
                  <h3 className="item-title text-item">{item.title}</h3>
                  {item.body && <p className="mt-1.5 max-w-[68ch] text-content-muted">{item.body}</p>}
                  {item.link && (
                    <Link
                      href={item.link.href}
                      // min-h-6 for a 24px tap target (WCAG 2.5.8); mt-2 rather
                      // than mt-2.5 so the text sits where it did.
                      className="mt-2 inline-flex min-h-6 items-center text-sm font-medium text-accent-text underline-offset-3 hover:underline"
                      {...(item.link.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                    >
                      {item.link.label}
                      {item.link.href.startsWith('http') ? <span className="sr-only"> (opens in a new tab)</span> : null}
                    </Link>
                  )}
                </div>
              </Reveal>
            ))}
          </ol>
        </section>
      ))}

      {/* ---------- tables ---------- */}
      {y.tables?.map((t, ti) => (
        <section key={t.title} aria-labelledby={`table-${ti}`} className="container-page pt-16 md:pt-24">
          <SectionHeader id={`table-${ti}`} title={`${t.title}.`} />
          {/* Focusable so keyboard users can scroll a table wider than a phone. */}
          <div className="mt-6 overflow-x-auto" tabIndex={0} role="region" aria-labelledby={`table-${ti}`}>
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead>
                <tr className="border-b border-content/20">
                  {t.columns.map((c) => (
                    <th key={c} scope="col" className="label-micro py-3 pr-6 font-normal text-content-soft">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.rows.map((r, ri) => (
                  <tr key={ri} className="border-b border-hairline">
                    {r.map((cell, ci) => (
                      <td key={ci} className={`py-3 pr-6 ${ci === 2 ? 'font-medium text-content' : 'text-content-muted'}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      {/* ---------- newer / older ---------- */}
      <nav aria-label="Other years" className="container-page grid gap-3 pt-16 md:grid-cols-2 md:pt-24">
        {[
          { y: older, dir: 'Older' as const },
          { y: newer, dir: 'Newer' as const },
        ].map(({ y: other, dir }) =>
          other ? (
            <Link
              key={dir}
              href={`/archives/${other.slug}`}
              className={`group flex flex-col gap-2 rounded-panel border border-hairline bg-surface p-6 transition-colors duration-200 hover:border-accent-fill ${
                dir === 'Newer' ? 'md:items-end md:text-right' : ''
              }`}
            >
              {/* Arrows are decoration: read as "Older" / "Newer", not "left arrow Older". */}
              <span className="label-micro text-content-soft">
                {dir === 'Older' ? (
                  <>
                    <span aria-hidden="true">← </span>Older
                  </>
                ) : (
                  <>
                    Newer<span aria-hidden="true"> →</span>
                  </>
                )}
              </span>
              <span className="font-display text-[1.4rem] leading-tight font-semibold tracking-[-0.015em]">{other.label}</span>
              {/* Fraunces italic, as themes are set in the archives rail. */}
              {other.theme && <span className="font-display text-[1rem] leading-snug text-content-muted italic">“{other.theme}”</span>}
            </Link>
          ) : (
            <span key={dir} aria-hidden="true" className="hidden md:block" />
          ),
        )}
      </nav>
    </main>
  );
}
