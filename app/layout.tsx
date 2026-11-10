import type { Metadata, Viewport } from 'next';
import { Fraunces, Instrument_Sans } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/motion/smooth-scroll';
import { MorphCursor } from '@/components/motion/morph-cursor';
import { SiteHeader } from '@/components/site/site-header';
import { SiteFooter } from '@/components/site/site-footer';
import { SITE } from '@/lib/site';

/**
 * Pairing 2 from design/directions.html: Fraunces for display, Instrument Sans
 * for everything else. Fraunces is variable, so weight and optical size are
 * tunable; the pairing notes warn it tips into "over the top" at heavy weights,
 * which is why --text-display caps at 600.
 */
const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  style: ['normal', 'italic'],
});

const instrument = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Youth-led service in Sri Lanka and the Maldives`,
    template: `%s | ${SITE.name}`,
  },
  description: `${SITE.name} has about ${SITE.memberCountLabel} students in more than 100 school clubs across Sri Lanka and the Maldives. Interact is Rotary International's service club for young people aged 12–19.`,
  openGraph: {
    title: SITE.name,
    description: `Youth-led service across ${SITE.region}.`,
    url: SITE.url,
    siteName: SITE.name,
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#f7f5f0',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: browser extensions (seen: a "crxlauncher"
    // Chrome extension) write attributes onto <html> before React hydrates.
    // It silences attribute mismatches on this one element only; anything
    // inside <body> still reports.
    // data-scroll-behavior: Next 16 no longer turns `scroll-behavior: smooth`
    // off during navigation unless asked. Without it, every route change and
    // back/forward on phones (where Lenis is off) visibly scrolled from the
    // old position instead of starting at the top.
    <html lang="en" data-scroll-behavior="smooth" className={`${fraunces.variable} ${instrument.variable}`} suppressHydrationWarning>
      <body>
        <SmoothScroll />
        <MorphCursor />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded-full focus:bg-accent-fill focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-on"
        >
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
