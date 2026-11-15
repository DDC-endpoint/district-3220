import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHeader } from '@/components/page/page-header';
import { SectionHeader } from '@/components/page/section-header';
import { Reveal } from '@/components/motion/reveal';
import { DocumentList } from '@/components/page/document-list';
import { NEWSLETTER, NEWSLETTER_EDITIONS } from '@/lib/publications';

export const metadata: Metadata = {
  title: 'Newsletter',
  description: `${NEWSLETTER.name}, the official quarterly newsletter of the Interact District 3220 council.`,
};

export default function NewsletterPage() {
  return (
    <main id="main">
      <PageHeader crumbs={[{ label: 'News', href: '/news' }]} title={`${NEWSLETTER.name}.`} lede={NEWSLETTER.intro} />

      {/* The masthead is white artwork, so it gets the navy band. */}
      <section aria-labelledby="covers-heading" className="mt-16 bg-navy-900 text-white md:mt-24">
        <div className="container-page grid gap-12 py-16 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-center md:py-24">
          <Reveal className="relative aspect-[1984/1223] w-full max-w-xl">
            <Image src={NEWSLETTER.wordmark} alt={`${NEWSLETTER.name}, quarterly newsletter`} fill sizes="(max-width: 768px) 92vw, 576px" className="object-contain" />
          </Reveal>
          <div>
            <Reveal as="h2" className="text-title">
              <span id="covers-heading">What each issue covers.</span>
            </Reveal>
            <ul className="mt-6 border-t border-white/15">
              {NEWSLETTER.covers.map((c, i) => (
                <Reveal key={c} step={Math.min(i + 1, 4)} as="li" className="flex items-baseline gap-4 border-b border-white/15 py-4">
                  <span className="label-micro shrink-0 text-white/55">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-[1.05rem]">{c}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="editions-heading" className="container-page py-16 md:py-24">
        <SectionHeader id="editions-heading" title="Editions." lede="Newest first." />
        {/* Straight under the section rule, which is the list's first hairline. */}
        <DocumentList items={NEWSLETTER_EDITIONS} />
      </section>
    </main>
  );
}
