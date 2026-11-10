import Link from 'next/link';
import { OFFICER_LINKS } from '@/lib/home';
import { Reveal } from '@/components/motion/reveal';

/**
 * "For Interactors and club officers" — the member-facing utility band, built
 * in the Statement treatment from design/concepts.html: an inverted near-black
 * panel holding a dense hairline grid.
 *
 * The inversion is doing real work. Everything above this point is public and
 * persuasive; this is the district's working tool, and the theme flip is what
 * tells a returning member they have arrived at their half of the site without
 * needing a heading to say so.
 *
 * The grid is one background colour showing through 1px gaps, so there are no
 * doubled borders to line up and no border-collapse to fight.
 */
export function OfficersBand() {
  return (
    <section id="members" aria-labelledby="members-heading" className="bg-ink-panel text-on-ink">
      <div className="container-page py-16 md:py-24">
        <Reveal as="h2" className="max-w-[20ch] text-title">
          <span id="members-heading">For Interactors and club officers.</span>
        </Reveal>
        <Reveal step={1} as="p" className="mt-3.5 max-w-[54ch] text-on-ink-muted">
          Dates, documents, records and the district council, for club officers and members.
        </Reveal>

        <ul className="mt-9 grid grid-cols-1 gap-px overflow-hidden rounded-panel bg-ink-panel-line outline outline-ink-panel-line sm:grid-cols-2 lg:grid-cols-4">
          {OFFICER_LINKS.map((l) => (
            <li key={l.href}>
              {/* The whole tile fills Signal on hover and focus. A tint was not
                  readable as a state change on a near-black band; a solid fill
                  is unmistakable and reads as selection. No `data-morph`: the
                  fill is the hover state, and a parked cursor on top of it
                  washed the blue out and lowered the white text's contrast.
                  The cursor shows its link ring here instead. */}
              <Link
                href={l.href}
                className="group block h-full bg-ink-panel px-6 py-7 transition-colors duration-200 hover:bg-accent-fill focus-visible:bg-accent-fill"
              >
                <span className="block font-display text-base font-semibold tracking-[-0.01em] transition-colors duration-200 group-hover:text-white group-focus-visible:text-white">
                  {l.label}
                </span>
                <span className="label-micro mt-2 block text-on-ink-muted transition-colors duration-200 group-hover:text-white/85 group-focus-visible:text-white/85">
                  {l.note}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
