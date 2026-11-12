/**
 * Newsletter editions and administrative documents. Sources: CONTENT.md §8
 * and §10.
 *
 * Of the newsletters, only the 3rd quarterly edition's link survived the
 * crawl; the old site rendered the rest through a Wix widget whose URLs never
 * appeared in the page HTML, so they stay placeholders until the council
 * supplies the files (CONTENT.md §19, gap 9). The admin documents came from
 * the council's Drive folders (see DOCUMENT_SECTIONS).
 */

export type Publication = {
  title: string;
  /** e.g. "2025/26". */
  year?: string;
  description?: string;
  kind: 'PDF' | 'Google Drive' | 'Document';
  /** Absent while the file is still to be supplied. */
  href?: string;
};

export const NEWSLETTER = {
  name: 'This Quarter in Interact',
  wordmark: '/images/branding/newsletter-tqi-logo.png',
  intro:
    'The Interact District Council’s official quarterly newsletter, started to keep clubs informed and to share what Interactors across the district are doing.',
  covers: [
    'Highlights of district initiatives',
    'Upcoming projects, campaigns and service opportunities',
    'Leadership spotlights',
  ],
};

/** Newest first. */
export const NEWSLETTER_EDITIONS: Publication[] = [
  {
    title: 'Third Quarterly Edition',
    kind: 'Google Drive',
    href: 'https://drive.google.com/file/d/1fSRaoSrC0al0QJdr0Zle-y8nPjaP4MKk/view?usp=drivesdk',
  },
  // Linked from the old site's footer as "First Quarterly Newsletter.pdf".
  { title: 'First Quarterly Edition', kind: 'PDF' },
];

export type DocumentSection = {
  /** Heading id, for aria-labelledby. */
  id: string;
  title: string;
  lede: string;
  items: Publication[];
};

const drive = (id: string) => `https://drive.google.com/file/d/${id}/view`;

/**
 * Admin Documents, grouped by purpose. Every file is on the council's two
 * shared Drive folders, supplied by the user on 2026-10-19:
 * "Interact District Guidelines & Documents" (1c_bUq6jgnzercYzadybfNewdWEpBpuv3)
 * and "RI Admin Documents" (1MMzOKNy6rlYucQt5NqMFNc-KGyPHvsvg). Titles are
 * the file names with their typos corrected. A file the council re-uploads
 * gets a new id, so its link here needs updating.
 */
export const DOCUMENT_SECTIONS: DocumentSection[] = [
  {
    id: 'bidding-heading',
    title: 'Bidding guidelines.',
    lede: 'For clubs bidding to host a district event.',
    items: [
      { title: '36th IDC Bidding Guidelines', kind: 'PDF', href: drive('1ZlzEzWiB8_zYbgp02TjKpNH6pbskgjf5') },
      { title: 'DIMUN Bidding Guidelines', kind: 'PDF', href: drive('1oHx_FCauhSOa3DdKVkA1qBxxaTbkbH2z') },
      { title: 'District Meetings and IU Bidding Guidelines', kind: 'PDF', href: drive('1sgOvr3V4N0f3cas1X61zT9gwJ25fAgPg') },
      { title: 'GreenCon ’26 Bidding Guidelines', kind: 'PDF', href: drive('1deAPFx-ir1hMm4r3W87yzH0MdyI3N_Vw') },
    ],
  },
  {
    id: 'reports-heading',
    title: 'Report formats.',
    lede: 'The formats for club reports to the district.',
    items: [
      { title: 'Annual Report Format', kind: 'PDF', href: drive('14FRUeBd9oAHt7B0_hR8m9XDIEyVNB9oy') },
      { title: 'Quarterly Report Format', kind: 'PDF', href: drive('1UFpaZLhAj8AM-GKapHXDY1LXXrZ3Uukg') },
      { title: 'Project Report Format', kind: 'PDF', href: drive('1IA1KsHxJQXbIoOGVX1P80HFpGerCN2Q6') },
    ],
  },
  {
    id: 'district-heading',
    title: 'District guidelines.',
    lede: 'Guidelines and protocols for clubs across the district.',
    items: [
      { title: 'Branding Guidelines', year: '2026/27', kind: 'PDF', href: drive('1kIbE37efX4M4hz6ijLP50dBvbAlDya1b') },
      { title: 'District Financial Guidelines', kind: 'PDF', href: drive('1GY-SfdUMP2P_FRg1ZQ8LgNZbsemK5mOE') },
      { title: 'Installation Guidelines and Protocols', kind: 'PDF', href: drive('1pplTrp66qhJu0x360LRPW4ccrRWcdRG7') },
      { title: 'DMC Guidelines', kind: 'PDF', href: drive('1pR9lE16VRa-BVK3fVEkTVlI9StHi7H5c') },
      { title: 'IWC Guidelines', kind: 'PDF', href: drive('1Y3AlbyaKHahFU6dZ2F9AsMX4TPzwo3Lo') },
      { title: 'Project Interlude ’26 Guidelines', kind: 'PDF', href: drive('1NoxULUKWPxQokeYWnE5kG-JkS0lcJ3ux') },
      { title: 'Rise Up', year: '2026/27', kind: 'PDF', href: drive('1u4YyYHEDFnaodDQ_g1_jUJ8v-LMi3hQT') },
      // No District Directory row: the directory holds members' contact
      // details, so it stays off the public site (the user, 2026-11-11).
    ],
  },
  {
    id: 'ri-heading',
    title: 'Rotary International.',
    lede: 'Rotary International’s policies and the standard documents for an Interact club.',
    items: [
      { title: 'Statement of Policy: Interact', description: 'Adopted by the RI Board of Directors.', kind: 'PDF', href: drive('1Rkildu6ieK4XeLwuFGdZbc9_woIjWSSj') },
      { title: 'Rotary Code of Policies', kind: 'PDF', href: drive('1QMqDJMfJDjwSEZY3JoOGFVN-JRj8Ybmj') },
      { title: 'Standard Interact Club Constitution', kind: 'PDF', href: drive('15VItR5htaKWrDtilAQ3PiSf09ofdL0mg') },
      { title: 'Recommended Interact Club Bylaws', kind: 'Document', href: drive('1MQw0cdmDeHNPBxJLqKvxmeH-D0YbQM2M') },
      { title: 'Club Excellence Award: Goals and Instructions', kind: 'PDF', href: drive('1gQm1Qq7SwW2yDlJDDDFCkmKSGUb86Fsj') },
      { title: 'How to Update Club Information', kind: 'PDF', href: drive('1N1Xox1d_UhCuReA5n00duotj3Wnogzwn') },
    ],
  },
];
