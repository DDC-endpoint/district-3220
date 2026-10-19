import type { Person } from './people';

/**
 * Event pages: one record per edition of a district event, rendered by
 * app/events/[slug]. Decided 2026-10-05 as a reusable template so a future
 * DIMUN, conference or flagship can be added as data rather than built as a
 * one-off microsite, which is what DIMUN '25 was on the old site.
 *
 * DIMUN '25 source: CONTENT.md §15 (five Wix pages, now one).
 */

export type Committee = {
  code: string;
  name: string;
  topic: string;
  logo: string;
  guide?: string;
};

export type EventPage = {
  slug: string;
  name: string;
  shortName: string;
  /** White artwork for the navy masthead band. */
  wordmark?: string;
  emblem?: string;
  status: 'upcoming' | 'past';
  /** Shown in place of exact dates while the source has none. */
  when: string;
  standfirst: string;
  /** "Purpose"-style long copy. */
  about: { title: string; body: string[] };
  committees?: { title: string; lede?: string; items: Committee[] };
  people?: { title: string; items: Person[] };
  registration?: { title: string; status: 'open' | 'closed'; detail: string; href?: string };
  /** Field set for the enquiries form; the form posts to the district address. */
  contact?: { title: string; lede: string };
};

const d = (file: string) => `/images/dimun/${file}`;

export const EVENT_PAGES: EventPage[] = [
  {
    slug: 'dimun-2025',
    name: 'District Interact Model United Nations 2025',
    shortName: 'DIMUN ’25',
    wordmark: d('dimun-logo-main.png'),
    emblem: d('dimun-logo-alt.png'),
    status: 'past',
    when: '2025 · Inaugural session',
    standfirst:
      'The first District Interact Model United Nations, held to set the standard for Interact MUN conferences in Sri Lanka.',
    about: {
      title: 'Why DIMUN exists.',
      body: [
        'Youth movements in Sri Lanka often work in isolation, with little collaboration between groups.',
        'DIMUN brings the Interact and Model United Nations communities together. Interactors debate local and global issues, and MUN participants learn what community service can achieve.',
      ],
    },
    committees: {
      title: 'Six committees.',
      lede: 'Each simulated a UN body with its own topic and study guide. Open one to read its topic.',
      items: [
        { code: 'ECOSOC', name: 'Economic and Social Council', topic: 'Technology, Innovation, and the Risks of Widening Global Inequality', logo: d('dimun-committee-ecosoc.png'), guide: 'https://drive.google.com/drive/folders/1jjf_sUtYHEg6Mo6wjjPeIErll3saWo9h?usp=drive_link' },
        { code: 'WHO', name: 'World Health Organization', topic: 'Addressing Global Inequalities in Health Care Systems', logo: d('dimun-committee-who.png'), guide: 'https://drive.google.com/drive/folders/119kJP7IBzsO-_Iuc5FFLxkC0OWf6vEOW?usp=drive_link' },
        { code: 'UNW', name: 'UN Women', topic: 'Reconciling Cultural Traditions with Universal Standards on Women’s Rights', logo: d('dimun-committee-unw.png'), guide: 'https://drive.google.com/drive/folders/1B2KwihDNnmu53vzPDM-Rw-w3t2hq3oa8?usp=drive_link' },
        { code: 'UNSC', name: 'UN Security Council', topic: 'Addressing the current situation in the Middle East', logo: d('dimun-committee-unsc.png'), guide: 'https://drive.google.com/drive/folders/1-N0CHdzAualaxibkODoKAGs_-Gnr_fKD?usp=drive_link' },
        { code: 'UNFCCC', name: 'UN Framework Convention on Climate Change', topic: 'Reconciling Energy Security with International Climate Commitments', logo: d('dimun-committee-unfccc.png'), guide: 'https://drive.google.com/drive/folders/1u2xiIpyrFzdIDOiobm89y70pSzDJ90zo?usp=drive_link' },
        { code: 'UNHRC', name: 'UN Human Rights Council', topic: 'Freedom of Expression and Information in the Digital Age', logo: d('dimun-committee-unhrc.png'), guide: 'https://drive.google.com/drive/folders/1qqadA2K4VF9MIrjEpOobpB9IMEHbFlb7?usp=drive_link' },
      ],
    },
    people: {
      title: 'Executive committee.',
      items: [
        { name: 'Int. Seniya Rajugamuwa', position: 'Project Chairperson', bio: 'Assistant District Interact Secretary 2025/26.', image: d('dimun-seniya-rajugamuwa-chairperson.png') },
        { name: 'Int. Aneeqa Shafeel', position: 'Project Co-Secretary', image: d('dimun-aneeqa-shafeel-co-secretary.png') },
        { name: 'Int. Kaveeka Kulatunga', position: 'Project Treasurer', bio: 'Assistant District Interact Secretary 2025/26.', image: d('dimun-kaveeka-kulatunga-treasurer.png') },
        { name: 'Int. PP. Piyathma De Zoysa', position: 'Project Treasurer', bio: 'Assistant District Interact Treasurer 2025/26.', image: d('dimun-piyathma-de-zoysa-treasurer.png') },
      ],
    },
    // No registration panel or questions form: the user took both off this
    // page on 2026-10-14. The template still renders them for other events.
  },
];

export const getEventPage = (slug: string) => EVENT_PAGES.find((e) => e.slug === slug);
