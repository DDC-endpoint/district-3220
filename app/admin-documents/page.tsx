import type { Metadata } from 'next';
import { PageHeader } from '@/components/page/page-header';
import { SectionHeader } from '@/components/page/section-header';
import { DocumentList } from '@/components/page/document-list';
import { Button } from '@/components/ui/button';
import { DOCUMENT_SECTIONS } from '@/lib/publications';

export const metadata: Metadata = {
  title: 'Admin Documents',
  description:
    'Bidding guidelines, report formats, district guidelines and Rotary International documents for Interact District 3220 club officers.',
};

export default function AdminDocumentsPage() {
  return (
    <main id="main">
      <PageHeader
        title="Admin documents."
        lede="The district’s working documents for club officers. Dates and deadlines are on the calendar."
      >
        <Button href="/calendar" tone="ghost">
          The district calendar
        </Button>
      </PageHeader>

      {DOCUMENT_SECTIONS.map((s, i) => (
        <section
          key={s.id}
          aria-labelledby={s.id}
          className={`container-page pb-14 md:pb-20 ${i === 0 ? 'pt-16 md:pt-24' : 'pt-2 md:pt-4'}`}
        >
          <SectionHeader id={s.id} title={s.title} lede={s.lede} />
          {/* Straight under the section rule, which is the list's first hairline. */}
          <DocumentList items={s.items} />
        </section>
      ))}
    </main>
  );
}
