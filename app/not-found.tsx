import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/page/page-header';

export const metadata: Metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <main id="main">
      <PageHeader
        title="Page not found."
        lede="There is no page at this address."
      >
        <Button href="/">Back to the home page</Button>
        <Button href="/archives" tone="ghost">
          Browse the archives
        </Button>
      </PageHeader>
    </main>
  );
}
