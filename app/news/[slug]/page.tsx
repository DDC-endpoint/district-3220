import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/page/page-header';
import { ClipReveal } from '@/components/motion/clip-reveal';
import { POSTS, formatDate, getPost } from '@/lib/news';

export const dynamicParams = false;

/** "1024 / 1280" → true. Portrait images are capped so they never fill the screen. */
const isPortrait = (ratio: string) => {
  const [w, h] = ratio.split('/').map(Number);
  return h > w;
};

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return {
    title: p.shortTitle ?? p.title,
    description: p.standfirst,
    openGraph: { type: 'article', publishedTime: p.date, images: [p.image] },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const others = POSTS.filter((o) => o.slug !== p.slug);

  return (
    <main id="main">
      {/* The short title heads the page; the old site's full headline, where it
          differs, would run to four lines at display size. */}
      <PageHeader crumbs={[{ label: 'News', href: '/news' }]} title={p.shortTitle ?? p.title} lede={p.standfirst} />

      <article className="container-page mt-10 grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,42rem)_minmax(0,1fr)]">
        <dl className="label-micro flex flex-wrap gap-x-6 gap-y-3 text-content-soft md:flex-col md:pt-2">
          <div>
            <dt className="sr-only">By</dt>
            <dd>{p.author}</dd>
          </div>
          <div>
            <dt className="sr-only">Published</dt>
            <dd>
              <time dateTime={p.date}>{formatDate(p.date)}</time>
            </dd>
          </div>
          {p.updated && (
            <div>
              <dt className="sr-only">Updated</dt>
              {/* "Updated" is visible here and hidden in the dt, so it is read once. */}
              <dd>
                <span aria-hidden="true">Updated </span>
                <time dateTime={p.updated}>{formatDate(p.updated)}</time>
              </dd>
            </div>
          )}
          <div>
            <dt className="sr-only">Length</dt>
            <dd>{p.readMinutes} min read</dd>
          </div>
        </dl>

        <div>
          {/* The image at its own proportions: the tribute is a memorial card
              and must not be cropped. */}
          <ClipReveal
            onLoad
            className={`relative overflow-hidden rounded-panel bg-sunk ${isPortrait(p.imageRatio) ? 'max-w-md' : ''}`}
          >
            <div style={{ aspectRatio: p.imageRatio }} className="relative">
              <Image src={p.image} alt={p.imageAlt} fill preload sizes="(max-width: 768px) 100vw, 672px" className="object-cover" />
            </div>
          </ClipReveal>

          <div className="mt-10 flex flex-col gap-5 text-[1.075rem] leading-[1.75]">
            {p.body.map((para, i) => (
              // The lead opts out of the global `text-wrap: pretty`: at this
              // size in a narrow column it left very ragged lines.
              <p key={i} className={i === 0 ? 'font-display text-[1.3rem] leading-[1.55] text-content [text-wrap:wrap]' : 'text-content/90'}>
                {para}
              </p>
            ))}
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <nav aria-label="More news" className="container-page mt-20">
          {/* The rule goes on an inner box: on container-page itself it ran
              through the gutters, wider than every other rule on the page. */}
          <div className="border-t border-hairline pt-10">
            <p className="label-micro text-content-soft">More news</p>
            <ul className="mt-4 flex flex-col">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/news/${o.slug}`}
                    className="group flex flex-col gap-1 border-b border-hairline py-5 md:flex-row md:items-baseline md:justify-between"
                  >
                    <span className="item-title text-item transition-colors duration-200 group-hover:text-accent-text">
                      {o.shortTitle ?? o.title}
                    </span>
                    <time dateTime={o.date} className="label-micro text-content-soft">
                      {formatDate(o.date)}
                    </time>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}
    </main>
  );
}
