/**
 * District events.
 *
 * ⚠ Seeded from CONTENT.md §3, which was captured mid-2025/26 — every entry
 * below has now passed. The 2026/27 year began 1 July 2026, so this needs
 * replacing with current events (design/DECISIONS.md §7). The shape is what
 * matters: the old site hardcoded these as static blocks, which is why they
 * went stale in the first place.
 */

export type DistrictEvent = {
  slug: string;
  title: string;
  /** ISO date, or null where the source site never published one. */
  date: string | null;
  venue: string | null;
  summary: string;
  /** Registration / order form. */
  registerUrl?: string;
  /** Facebook album for events that have happened. */
  albumUrl?: string;
};

export const EVENTS: DistrictEvent[] = [
  {
    slug: 'race4change-2026',
    title: 'Race4Change 2026',
    date: '2026-06-07',
    venue: 'Galle Face Green, Colombo',
    summary:
      'A 5 km charity run in aid of the Little Hearts Foundation, with on-spot and corporate team registration.',
  },
  {
    slug: 'district-awrudhu-2026',
    title: 'District Awrudhu Celebrations',
    date: '2026-04-11',
    venue: 'Maliyadeva College, Kurunegala',
    summary:
      'Eight Interact clubs celebrated the Sinhala and Tamil New Year together.',
    albumUrl: 'https://www.facebook.com/share/p/1BDVQydQ4T/',
  },
  {
    slug: 'ilt-awards-night-2026',
    title: 'Interact Leadership Training Awards Night',
    date: '2026-03-29',
    venue: 'Royal Institute Auditorium, Colombo',
    summary:
      'The close of a four-month leadership training programme run across four zones.',
    albumUrl: 'https://www.facebook.com/share/p/1Nxv9A32Ds/',
  },
  {
    slug: 'interaction-26-awards',
    title: "Interaction '26 Awards Night",
    date: '2026-02-28',
    venue: 'Hillwood College, Kandy',
    summary:
      'Awards for what clubs achieved in the year’s district initiatives.',
    albumUrl: 'https://www.facebook.com/share/p/18fVmNuRnn/',
  },
  {
    slug: 'empoweher',
    title: 'EmpoweHER Initiative',
    date: null,
    venue: 'Trace Expert City, Colombo',
    summary:
      'An initiative for young women on leadership and advocacy.',
    registerUrl: 'https://forms.gle/V7iwqdaCWE5WRUJ58',
  },
  {
    slug: 'interarchive',
    title: 'The Interarchive Project',
    date: null,
    venue: null,
    summary:
      'A book of the district’s history, presented to PRIP Stephanie A. Urchick and District Governor Delvin Pereira.',
    registerUrl: 'https://forms.gle/DKgQHfoxcm93LyJz5',
  },
];

/** Events still to come, soonest first. Undated entries are treated as upcoming. */
export function upcomingEvents(now = new Date()): DistrictEvent[] {
  return EVENTS.filter((e) => !e.date || new Date(e.date) >= now).sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return a.date.localeCompare(b.date);
  });
}

/** Past events, most recent first. */
export function pastEvents(now = new Date()): DistrictEvent[] {
  return EVENTS.filter((e) => e.date && new Date(e.date) < now).sort((a, b) =>
    b.date!.localeCompare(a.date!),
  );
}
