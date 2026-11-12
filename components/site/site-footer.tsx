import Link from 'next/link';
import Image from 'next/image';
import { NAV, SITE, SOCIALS } from '@/lib/site';
import { SocialIcon } from './social-icon';

export function SiteFooter() {
  return (
    <footer className="mt-28 border-t border-hairline">
      <div className="container-page py-14 md:py-16">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)]">
          {/* --- identity --- */}
          <div>
            {/* The official district lock-up, not the old Wix logo-footer.png,
                which carried the 2025/26 "Unite For Good" theme. */}
            <Image
              src="/images/branding/interact-district-3220-logo.png"
              alt={SITE.name}
              // Displayed size (h-14), so the srcset matches it (site-header).
              width={152}
              height={56}
              className="h-14 w-auto"
            />
            <p className="mt-4 max-w-[34ch] text-sm text-content-muted">
              Rotary International&rsquo;s service club for young people aged 12&ndash;19.
              Serving {SITE.region} since {SITE.districtFounded}.
            </p>
            {/* This year's Rotary theme mark, keyed out of RI's social graphic.
                Like the Interact logo, its own blue is part of the mark and
                exempt from the one-accent rule (DECISIONS §2). */}
            <div className="mt-6 flex items-center gap-4">
              <Image
                src="/images/branding/create-lasting-impact.png"
                alt={SITE.rotaryTheme}
                width={87}
                height={48}
                className="h-12 w-auto"
              />
              <p className="text-[11px] leading-snug font-semibold tracking-[0.12em] text-content-muted uppercase">
                Rotary theme
                <br />
                {SITE.rotaryYear}
              </p>
            </div>
          </div>

          {/* --- nav mirror --- */}
          <nav aria-label="Footer">
            <h2 className="text-[11px] font-semibold tracking-[0.12em] text-content-muted uppercase">
              Explore
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-content-muted transition-colors duration-200 hover:text-content"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* --- contact + social --- */}
          <div>
            <h2 className="text-[11px] font-semibold tracking-[0.12em] text-content-muted uppercase">
              Get in touch
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-content-muted transition-colors duration-200 hover:text-content"
                >
                  {SITE.email.split('@')[0]}
                  {/* Breaks only before the @, never mid-word. */}
                  <wbr />@{SITE.email.split('@')[1]}
                </a>
              </li>
            </ul>

            <h2 className="mt-7 text-[11px] font-semibold tracking-[0.12em] text-content-muted uppercase">
              Social media
            </h2>
            {/* Pulled left by the icon's inset in its 40px target ((40 - 17) / 2),
                so the first glyph lines up with the heading above it. */}
            <ul className="mt-4 -ml-[11.5px] flex flex-wrap gap-2.5">
              {SOCIALS.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    // 40px hit target — icon-only links are easy to make too
                    // small to tap reliably.
                    className="press inline-flex size-10 items-center justify-center rounded-control text-content-muted hover:bg-surface hover:text-accent-text"
                  >
                    <SocialIcon name={s.label} className="size-[17px]" />
                    {/* The glyph alone gives the link no accessible name. */}
                    <span className="sr-only">{s.label} (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-hairline pt-6 text-xs text-content-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {SITE.name}</p>
          <p>{SITE.region}</p>
        </div>
      </div>
    </footer>
  );
}
