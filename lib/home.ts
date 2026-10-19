/**
 * Home-page content. Kept out of the components so copy can be edited without
 * touching layout, and so the eventual CMS swap is a change to this file only.
 *
 * Photography status (2026-10-14): the hero artwork, the DIMUN, IBTS and
 * Race4Change project photos and the Q1 timeline photos are the district's,
 * supplied by the user. Intercede keeps a marked placeholder (`needsPhoto`)
 * until its photos arrive. Interflash was taken off the home page's projects
 * on 2026-10-13 at the user's request. The avenue collages are district
 * photographs supplied on 2026-10-13 (`AVENUE_PANELS`).
 */

import type { StaticImageData } from 'next/image';
import heroArt from '@/public/images/hero/district-3220-hero.jpg';
import dimunHall from '@/public/images/projects/dimun/dimun-hall.jpg';
import dimunPodium from '@/public/images/projects/dimun/dimun-podium.jpg';
import dimunChoir from '@/public/images/projects/dimun/dimun-choir.jpg';
import dimunStage from '@/public/images/projects/dimun/dimun-stage.jpg';
import dimunDelegates from '@/public/images/projects/dimun/dimun-delegates.jpg';
import r4cSprint from '@/public/images/projects/race4change/r4c-sprint.jpg';
import r4cStartArch from '@/public/images/projects/race4change/r4c-start-arch.jpg';
import r4cRunners from '@/public/images/projects/race4change/r4c-runners.jpg';
import r4cMascot from '@/public/images/projects/race4change/r4c-mascot.jpg';
import r4cHosts from '@/public/images/projects/race4change/r4c-hosts.jpg';
import r4cFinish from '@/public/images/projects/race4change/r4c-finish.jpg';
import r4cAwards from '@/public/images/projects/race4change/r4c-awards.jpg';
import ibtsApplause from '@/public/images/projects/ibts/ibts-applause.jpg';
import ibtsHall from '@/public/images/projects/ibts/ibts-hall.jpg';
import ibtsAudience from '@/public/images/projects/ibts/ibts-audience.jpg';
import ibtsFinance from '@/public/images/projects/ibts/ibts-finance-session.jpg';
import ibtsWorkshop from '@/public/images/projects/ibts/ibts-workshop.jpg';
import q1Dm1Address from '@/public/images/timeline/2026-27/q1-district-meeting-1-address.jpg';
import q1Dm1Group from '@/public/images/timeline/2026-27/q1-district-meeting-1-group.jpg';
import q1Dm2Floor from '@/public/images/timeline/2026-27/q1-district-meeting-2-floor.jpg';
import q1Dm2Investiture from '@/public/images/timeline/2026-27/q1-district-meeting-2-investiture.jpg';
import q1Dm3Investiture from '@/public/images/timeline/2026-27/q1-district-meeting-3-investiture.jpg';
import q1Dm3Audience from '@/public/images/timeline/2026-27/q1-district-meeting-3-audience.jpg';
import q1IbtsHall from '@/public/images/timeline/2026-27/q1-ibts-hall.jpg';
import q1IbtsSpeaker from '@/public/images/timeline/2026-27/q1-ibts-speaker.jpg';
import csRaceStart from '@/public/images/avenues/community-service/race4change-start.jpg';
import csRaceWarmUp from '@/public/images/avenues/community-service/race4change-warm-up.jpg';
import csFridge from '@/public/images/avenues/community-service/donation-refrigerator.jpg';
import csSports from '@/public/images/avenues/community-service/donation-sports-equipment.jpg';
import iuDiwali from '@/public/images/avenues/international-understanding/diwali.jpg';
import iuChristmas from '@/public/images/avenues/international-understanding/christmas.jpg';
import iuAwrudhu from '@/public/images/avenues/international-understanding/awrudhu.jpg';
import iuIfthar from '@/public/images/avenues/international-understanding/ifthar-2026.jpg';
import clubAssembly from '@/public/images/avenues/club-service/36th-district-assembly.jpg';
import clubBeachDay from '@/public/images/avenues/club-service/interaction-26-beach-day.jpg';
import clubIbtsAudience from '@/public/images/avenues/club-service/ibts-2025-audience.jpg';
import clubIbtsHall from '@/public/images/avenues/club-service/ibts-hall.jpg';
import glGreencon1 from '@/public/images/avenues/green-life/greencon-1.jpg';
import glGreencon2 from '@/public/images/avenues/green-life/greencon-2.jpg';
import glGreencon3 from '@/public/images/avenues/green-life/greencon-3.jpg';
import glGreencon4 from '@/public/images/avenues/green-life/greencon-4.jpg';
import finIgnite from '@/public/images/avenues/finance/interflash-ignite.jpg';
import finLivelight from '@/public/images/avenues/finance/livelight-26.jpg';
import finCrowd from '@/public/images/avenues/finance/interflash-crowd.jpg';
import finStage from '@/public/images/avenues/finance/interflash-stage.jpg';

/**
 * The hero is one piece of district artwork (supplied 2026-10-14), not a
 * slideshow: the title "Interact District 3220, Sri Lanka & Maldives" is part
 * of the image, so the page's h1 carries the same words for screen readers
 * and the visible copy stays out of the artwork's way (DECISIONS §6 revision).
 */
export const HERO = {
  image: heroArt,
  alt: 'Interactors at district events: delegates speaking at a district meeting, the district council in a group photograph, and club officers in school blazers.',
};

/** A content photograph, imported statically so its real ratio drives `sizes` (DECISIONS §5). */
export type Photo = {
  image: StaticImageData;
  alt: string;
};

export type Flagship = {
  slug: string;
  name: string;
  /** The single number this project is known for, where it has one. */
  figure?: string;
  figureLabel?: string;
  /** The district's own description of the project (supplied 2026-10-14). */
  description: string;
  /** The first is the tile's cover and the dialog's lead photo. Empty until supplied. */
  photos: Photo[];
  /** True where the district's photographs are still to come: a plain navy tile, marked as a placeholder. */
  needsPhoto?: boolean;
  /** The project's own page, where one exists. */
  href?: string;
};

export const FLAGSHIPS: Flagship[] = [
  {
    slug: 'dimun',
    name: 'DIMUN',
    figure: '6',
    figureLabel: 'Committees',
    description:
      'District Interact Model United Nations (DIMUN) is a conference organised by Interact District 3220 where students from across Sri Lanka debate global issues in simulated UN committees. Delegates build their communication, diplomacy and leadership skills.',
    photos: [
      { image: dimunHall, alt: 'A full hall facing the DIMUN stage, lit in blue under the Rotary wheel' },
      { image: dimunPodium, alt: 'A delegate speaking from the podium at DIMUN' },
      { image: dimunChoir, alt: 'Interactors singing on stage at DIMUN, with a guitarist among them' },
      { image: dimunStage, alt: 'The DIMUN organising team on stage in front of a screen of blossom trees' },
      { image: dimunDelegates, alt: 'The DIMUN team gathered on stage behind the giant DIMUN letters' },
    ],
    href: '/events/dimun-2025',
  },
  {
    slug: 'race4change',
    name: 'Race4Change',
    figure: '5 km',
    figureLabel: 'Charity run',
    description:
      '“Race 4 Change” is a 5 km charity run in Colombo raising funds, through the Little Hearts Foundation, to equip the newly built cardiac and critical care complex at Lady Ridgeway Hospital. The complex is government-approved and a national priority, but projects like it often take a long time to finish without community support.',
    photos: [
      { image: r4cSprint, alt: 'Two runners sprinting across the grass at Race4Change' },
      { image: r4cStartArch, alt: 'Runners and the lion mascot gathering at the Race4Change start arch on Galle Face Green' },
      { image: r4cRunners, alt: 'Runners in Race4Change shirts and caps waiting for the start' },
      { image: r4cMascot, alt: 'The lion mascot holding a flag beside the compère on the Race4Change stage' },
      { image: r4cHosts, alt: 'Two compères speaking from the Race4Change stage' },
      { image: r4cFinish, alt: 'Runners walking in after the finish at Race4Change, with palm trees behind' },
      { image: r4cAwards, alt: 'Winners receiving a trophy on stage, with the lion mascot beside them' },
    ],
  },
  // IBTS and Intercede have no figure: the district's description is all (2026-10-14).
  {
    slug: 'ibts',
    name: 'IBTS',
    description:
      'The Interact Board Training Seminar is a programme run by the Interact District Council for newly elected club board members. It prepares them for the year ahead and takes them through their roles, responsibilities and duties as Interactors.',
    photos: [
      { image: ibtsApplause, alt: 'Club officers applauding from their seats at the Interact Board Training Seminar' },
      { image: ibtsHall, alt: 'A speaker addressing a full hall under the IBTS title screen' },
      { image: ibtsAudience, alt: 'Club officers laughing during a session at the Interact Board Training Seminar' },
      { image: ibtsFinance, alt: 'A speaker presenting a session on the Finance avenue' },
      { image: ibtsWorkshop, alt: 'Club officers working in groups against a timer during an IBTS workshop' },
    ],
  },
  {
    slug: 'intercede',
    name: 'Intercede',
    description:
      'Intercede is the largest community service project of Interact District 3220, Sri Lanka and Maldives. Every Rotary year, under the District Council’s Community Service avenue, clubs from across the district work together on one sustainable project for a community in need. The project picks an underserved school or community, finds out what it needs most, and sends Interactors to do the work. Each project is meant to leave something that lasts, and lets Interactors serve beyond their own clubs and cities.',
    // TODO(district): Intercede's photographs. The zip supplied on 2026-10-14 was empty.
    photos: [],
    needsPhoto: true,
  },
];

/**
 * The five avenues, with the colour sampled from each logo. From md up, each
 * panel is a collage of four of the avenue's own photographs above a solid band
 * in its colour, with the logo as a badge on the band (2026-10-13, approved by
 * the user; DECISIONS §2). On phones the logo sits on a tint of the colour and
 * the collage opens with the description. `onSolid` sets the band's text colour.
 *
 * Photos are the district Media Crew's, with the credit bar cropped off at the
 * user's request. Order matters: the collage is laid out at the open panel's
 * width and anchored left, so a closed panel shows only the left column,
 * photos[0] over photos[2].
 *
 * CONTRAST NOTE: all five are 'light' (white) by request. White on Community
 * Service's #D8951C measures 2.55:1, because that amber is the one light colour
 * in the set. Applied 2026-10-06 (contrast must pass AA everywhere): that band
 * alone is darkened via `solid`, while the logo tint and the mobile edge keep
 * the true brand amber in `colour`. The fix previously noted here, #A86F12,
 * actually measures 4.24:1 and fails; #906413 is the lightest step of the same
 * hue that passes for both the name (white, 5.23:1) and the open blurb (white
 * at 90%, 4.58:1).
 */
export type AvenuePanel = {
  slug: string;
  name: string;
  blurb: string;
  logo: string;
  /** Brand colour sampled from the logo: tints, edges, labels. */
  colour: string;
  /** Solid band behind the white name, when `colour` itself can't carry white text at AA. */
  solid?: string;
  onSolid: 'light' | 'dark';
  /** Four photographs, row by row: top-left, top-right, bottom-left, bottom-right. */
  photos: [AvenuePhoto, AvenuePhoto, AvenuePhoto, AvenuePhoto];
};

export type AvenuePhoto = {
  /** Static import, so the crop's `sizes` reads the real ratio (DECISIONS §5). */
  image: StaticImageData;
  alt: string;
};

export const AVENUE_PANELS: AvenuePanel[] = [
  {
    slug: 'community-service',
    name: 'Community Service',
    blurb:
      'Service projects for communities in need, the heart of the Interact movement.',
    logo: '/images/avenues/avenue-community-service.png',
    colour: '#D8951C',
    solid: '#906413',
    onSolid: 'light',
    photos: [
      { image: csRaceStart, alt: 'Runners lined up under the start arch at Race4Change' },
      { image: csRaceWarmUp, alt: 'Runners warming up together before Race4Change' },
      { image: csFridge, alt: 'Interactors handing over a donated refrigerator at a school' },
      { image: csSports, alt: 'Interactors handing over donated sports equipment at a school' },
    ],
  },
  {
    slug: 'international-understanding',
    name: 'International Understanding',
    blurb: 'Promotes international goodwill and understanding between communities.',
    logo: '/images/avenues/avenue-international-understanding.png',
    colour: '#97114B',
    onSolid: 'light',
    photos: [
      { image: iuDiwali, alt: 'Interactors in saris dancing at the district Diwali celebrations' },
      { image: iuChristmas, alt: 'The head table at the district Christmas celebrations' },
      { image: iuAwrudhu, alt: 'Interactors in traditional dress at the District Awrudhu celebrations' },
      { image: iuIfthar, alt: 'Guests seated at the District Ifthar celebrations 2026' },
    ],
  },
  {
    slug: 'club-service',
    name: 'Club Service',
    blurb: 'The wellbeing and development of each club, from its foundations.',
    logo: '/images/avenues/avenue-club-service.png',
    colour: '#A85619',
    onSolid: 'light',
    photos: [
      { image: clubAssembly, alt: 'The ballroom at the 36th District Assembly' },
      { image: clubBeachDay, alt: 'Interactors in a team game at the Interaction ’26 beach day' },
      { image: clubIbtsAudience, alt: 'Interactors seated at the Interact Board Training Seminar ’25' },
      { image: clubIbtsHall, alt: 'A full hall listening to a speaker at the Interact Board Training Seminar' },
    ],
  },
  {
    slug: 'green-life',
    name: 'Green Life',
    blurb: 'Projects that protect the environment and encourage respect for it.',
    logo: '/images/avenues/avenue-green-life.png',
    colour: '#187777',
    onSolid: 'light',
    photos: [
      { image: glGreencon1, alt: 'Interactors in gloves collecting litter on a beach at Greencon' },
      { image: glGreencon3, alt: 'An Interactor carrying bags of collected litter along the shore at Greencon' },
      { image: glGreencon2, alt: 'Interactors filling bags with litter at Greencon' },
      { image: glGreencon4, alt: 'An Interactor wearing a sheet of newspaper at Greencon' },
    ],
  },
  {
    slug: 'finance',
    name: 'Finance',
    blurb: 'Fundraisers that pay for the projects of every other avenue.',
    logo: '/images/avenues/avenue-finance.png',
    colour: '#1B244A',
    onSolid: 'light',
    photos: [
      { image: finIgnite, alt: 'A band performing under stage lights at Interflash' },
      { image: finLivelight, alt: 'Musicians on stage under beams of light at Livelight ’26' },
      { image: finCrowd, alt: 'Friends posing for the camera in the crowd at Interflash' },
      { image: finStage, alt: 'The crowd facing the stage at Interflash, in black and white' },
    ],
  },
];

export type TimelinePhoto = Photo & {
  /** The event, shown above the plate. One line: the Line Draw passes through its diamond. */
  caption: string;
  /** Plate width in the horizontal timeline. Every plate keeps the photo's own ratio. */
  size: 'sm' | 'md' | 'lg';
  /** Vertical placement, which is what stops the strip reading as a row. */
  drop: 'top' | 'mid' | 'low';
};

export type TimelineQuarter = {
  label: string;
  /** The quarter of the Rotary year (which starts 1 July), not event dates. */
  range: string;
  photos: TimelinePhoto[];
};

/**
 * The home page's horizontal band: the Rotary year so far, a quarter at a
 * time (2026-10-14, at the user's request; it replaced a strip of Media Crew
 * stock images). Add a quarter here when it ends.
 *
 * The photos are the district's own graphics, with the event title and its
 * organisers set into their lower quarter, so the plates are never cropped: each
 * keeps its 3:2 ratio and only its width varies.
 *
 * Order within the quarter is chronological, as the user gave it: IBTS, then
 * the three district meetings. Two photographs per event.
 */
export const TIMELINE_YEAR = '2026/27';

export const TIMELINE: TimelineQuarter[] = [
  {
    label: 'Q1',
    range: 'Jul–Sep 2026',
    photos: [
      { image: q1IbtsHall, alt: 'A speaker presenting to a full hall at the Interact Board Training Seminar', caption: 'Interact Board Training Seminar', size: 'lg', drop: 'low' },
      { image: q1IbtsSpeaker, alt: 'An Interactor speaking from the podium at the Interact Board Training Seminar', caption: 'Interact Board Training Seminar', size: 'md', drop: 'mid' },
      { image: q1Dm1Address, alt: 'A club officer addressing the 1st District Meeting from the podium', caption: '1st District Meeting', size: 'sm', drop: 'top' },
      { image: q1Dm1Group, alt: 'Club officers in a group photograph on stage at the 1st District Meeting', caption: '1st District Meeting', size: 'md', drop: 'low' },
      { image: q1Dm2Floor, alt: 'A delegate speaking into a microphone from the floor at the 2nd District Meeting', caption: '2nd District Meeting', size: 'lg', drop: 'top' },
      { image: q1Dm2Investiture, alt: 'A club officer being invested with a district ribbon at the 2nd District Meeting', caption: '2nd District Meeting', size: 'sm', drop: 'low' },
      { image: q1Dm3Investiture, alt: 'A club officer being invested with a district ribbon at the 3rd District Meeting', caption: '3rd District Meeting', size: 'md', drop: 'mid' },
      { image: q1Dm3Audience, alt: 'Club officers seated in the audience at the 3rd District Meeting', caption: '3rd District Meeting', size: 'sm', drop: 'top' },
    ],
  },
];

/** The member-facing utility band. Mirrors the nav, minus the public pages. */
export const OFFICER_LINKS = [
  { label: 'Calendar', href: '/calendar', note: 'Dates and deadlines' },
  { label: 'Admin Documents', href: '/admin-documents', note: 'Forms and reporting' },
  { label: 'News', href: '/news', note: 'Announcements and reports' },
  { label: 'Newsletter', href: '/newsletter', note: 'Quarterly editions' },
  { label: 'Archives', href: '/archives', note: '1988 to today' },
  { label: 'Meet the Council', href: '/council/2026-27', note: '2026 / 27' },
  { label: 'College of DIRs', href: '/archives/college-of-dirs', note: 'Past representatives' },
  { label: 'Media Crew', href: '/media-crew', note: 'Request coverage' },
] as const;
