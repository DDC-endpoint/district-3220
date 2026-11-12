import { Reveal } from '@/components/motion/reveal';
import type { Publication } from '@/lib/publications';

/**
 * Downloadable files as hairline rows: title, then type, then one pill to open
 * it. A file still to be supplied shows a dashed "File to come" pill in place
 * of the link, marked `data-placeholder` like every other gap.
 *
 * No top border: the list always sits straight under a page or section rule,
 * which serves as its first hairline. A border of its own stacked a second
 * rule 30-80px under that one and read as a missing section.
 */
export function DocumentList({ items }: { items: Publication[] }) {
  return (
    <ul>
      {items.map((doc, i) => (
        <Reveal
          key={doc.title}
          step={Math.min(i, 3)}
          as="li"
          className="flex flex-col gap-4 border-b border-hairline py-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="item-title text-item">
              {doc.title}
              {doc.year ? ` ${doc.year}` : ''}
            </p>
            {doc.description && <p className="mt-1.5 max-w-[56ch] text-sm text-content-muted">{doc.description}</p>}
            <p className="label-micro mt-2 text-content-soft">{doc.kind}</p>
          </div>
          {doc.href ? (
            <a
              href={doc.href}
              target="_blank"
              rel="noreferrer"
              data-morph
              className="press inline-flex shrink-0 items-center gap-2 self-start rounded-control border border-control-border px-5 py-2.5 text-sm font-semibold hover:border-accent-fill hover:bg-accent-fill hover:text-accent-on sm:self-auto"
            >
              Open
              <svg viewBox="0 0 16 16" aria-hidden="true" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 11l6-6M6 5h5v5" />
              </svg>
              <span className="sr-only">{doc.title} (opens in a new tab)</span>
            </a>
          ) : (
            <span
              data-placeholder
              className="inline-flex shrink-0 self-start rounded-control border border-dashed border-control-border px-5 py-2.5 text-sm text-content-soft sm:self-auto"
            >
              File to come
            </span>
          )}
        </Reveal>
      ))}
    </ul>
  );
}
