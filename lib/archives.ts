/**
 * The district archive, year by year.
 *
 * Source: ARCHIVES.md (every old Wix archive page, crawled 2026-06-15) and,
 * for 2025/26, the old home page's events feed (CONTENT.md §3) and the 35th
 * Assembly post (CONTENT.md §9). Wording is kept close to the source; nothing
 * is added that the source does not say.
 *
 * Three shapes, as the old site had them (CONTENT.md §11):
 *   journal    recent years, told as events
 *   roster     pre-2001 years, a council roster plus project summaries
 *   unrecorded years with no surviving record beyond the DIR and theme
 *              (decided 2026-10-06: they appear, with one formal line)
 */

/** The one line an unrecorded year shows, as its lede and description. */
export const UNRECORDED_NOTE = 'The district archive holds no further records for this year.';

export type ArchiveItem = {
  title: string;
  date?: string;
  body?: string;
  link?: { label: string; href: string };
};

export type ArchiveYear = {
  /** URL segment. */
  slug: string;
  label: string;
  theme?: string;
  dir?: string;
  /**
   * Year header or RI theme artwork from the old archive page. The 2021/22,
   * 2023/24 and 2025/26 theme marks, which the old site never had, were
   * supplied by the user on 2026-10-13.
   */
  logo?: string;
  shape: 'journal' | 'roster' | 'unrecorded';
  /** One line for the archive index. */
  summary: string;
  figures?: { value: string; label: string }[];
  council?: { role: string; names: string }[];
  sections: { title: string; items: ArchiveItem[] }[];
  tables?: { title: string; columns: string[]; rows: string[][] }[];
  /** A portrait council page exists for this year. */
  councilPage?: boolean;
};

const logo = (file: string) => `/images/archive-logos/${file}`;

/** Newest first. */
export const ARCHIVE_YEARS: ArchiveYear[] = [
  {
    slug: '2025-26',
    label: '2025/26',
    theme: 'Unite For Good',
    dir: 'Jezon Fernando',
    logo: logo('archive-2025-26-logo.png'),
    shape: 'journal',
    summary: 'BizConnect, the Interaction ’26 and ILT awards nights, Race4Change 2026 and the Interarchive book.',
    councilPage: true,
    sections: [
      {
        title: 'Events and initiatives',
        items: [
          { title: 'BizConnect ’26', body: 'Finale set after Round 01. Participating clubs: ICSBC, ICSJC, ICZC, ICMC, ICMCK, ICWIS and ICDRC.' },
          { title: 'Interaction ’26 Awards Night', date: '28 Feb 2026', body: 'Hillwood College, Kandy. Awards for the year’s district initiatives.', link: { label: 'Album on Facebook', href: 'https://www.facebook.com/share/p/18fVmNuRnn/' } },
          { title: 'Interact Leadership Training Awards Night', date: '29 Mar 2026', body: 'Royal Institute Auditorium, Colombo. The close of a four-month training programme across four zones.', link: { label: 'Album on Facebook', href: 'https://www.facebook.com/share/p/1Nxv9A32Ds/' } },
          { title: 'District Awrudhu Celebrations', date: '11 Apr 2026', body: 'Maliyadeva College, Kurunegala. Eight Interact clubs celebrating the Sinhala and Tamil New Year.', link: { label: 'Album on Facebook', href: 'https://www.facebook.com/share/p/1BDVQydQ4T/' } },
          { title: 'Race4Change 2026', date: '7 Jun 2026', body: 'A 5 km charity run on Galle Face Green for the Little Hearts Foundation, with on-spot and corporate team registration.' },
          { title: 'EmpoweHER', body: 'An initiative for young women on leadership and advocacy, at Trace Expert City.' },
          { title: 'Interarchive', body: 'The district’s historic archive book, presented to the RI President’s Representative, PRIP Stephanie A. Urchick, and District Governor Delvin Pereira.' },
          { title: 'Rotary Awards Recognition', body: 'DICC Rtn. PP. Wasantha Arambewela and DIR Int. PP. Jezon Fernando received the Gold Award for Outstanding Service.' },
          { title: '36th Interact District Assembly', body: 'Standard registrations reached capacity; late registrations were opened.' },
        ],
      },
    ],
  },
  {
    slug: '2024-25',
    label: '2024/25',
    theme: 'The Magic of Rotary',
    dir: 'Damian De Cruz',
    logo: logo('archive-2024-25-header.jpg'),
    shape: 'journal',
    summary: '142 clubs after nine charters, the largest Interflash and Race4Change yet, and 11 district meetings.',
    councilPage: true,
    figures: [
      { value: '142', label: 'Clubs by May 2025' },
      { value: '9', label: 'New charters' },
      { value: '11', label: 'District meetings' },
      { value: '12,000+', label: 'At Interflash' },
    ],
    sections: [
      {
        title: 'Growth',
        items: [
          { title: 'From 131 clubs to 142', body: 'Nine new charters, among them the Interact Club of the School for the Blind (with support from PP Menuli Perera). More than 30 club orientations; the largest Interflash and Race4Change yet.' },
        ],
      },
      {
        title: 'District meetings',
        items: [
          { title: '1st', date: '28 Jul', body: 'St. Joseph’s College' },
          { title: '2nd', date: '25 Aug', body: 'Zahira College' },
          { title: '3rd', date: '15 Sep', body: 'Lyceum International School, Nugegoda' },
          { title: '4th', date: '12 Oct', body: 'Including the Pinktober Initiative segment' },
          { title: '5th', date: '2 Nov', body: 'D.S. Senanayake College (Diwali)' },
          { title: '6th', date: '14 Dec', body: 'Nawaloka Auditorium (Christmas)' },
          { title: '7th', date: '5 Jan', body: 'St. Peter’s College (Interaction Opening Ceremony)' },
          { title: '8th', date: '16 Feb', body: 'Hillwood College, Kandy' },
          { title: '9th', date: '9 Mar', body: 'Rosewood Ceylon, Dehiwala (Iftar)' },
          { title: '10th', date: 'Apr', body: 'National Arts Academy, Pallekele (Avurudu)' },
          { title: '11th', date: 'May', body: 'St. Joseph’s College' },
        ],
      },
      {
        title: 'Major events and initiatives',
        items: [
          { title: 'Interact Board Training Seminar (IBTS)', date: '4 Aug', body: 'Mahanama College. 800+ Interactors from all zones.' },
          { title: '60 Years of Interact Commemoration', body: 'A visit to St. John’s College, Jaffna, home of the first Interact club in the country.' },
          { title: 'Project Nuware', body: 'Renovation of Weerakatiya Madya Maha Vidyalaya, Matale.' },
          { title: 'Clean Up Sri Lanka', date: '28 Sep 2024', body: 'Organised with Shraddha TV.' },
          { title: 'Interact Week Celebrations', body: 'Seven initiatives across five zones: Colombo, Kandy, Kurunegala, Galle and Ratnapura.' },
          { title: 'GreenCon ’24', date: '9 Nov', body: '500 trees planted at Halwathura Estate, Horana; convention at St. Joseph’s College with 100+ participants.' },
          { title: 'Everyone Matters', body: 'Phase 1 on 4 Dec with Child Action Lanka, Colombo; Phase 2 across eight clusters.' },
          { title: 'LiveLight', date: '4 Jan', body: 'Trace Expert City. A talent and creativity showcase.' },
          { title: 'Interaction Colombo', date: '12–13 Jan', body: 'Ralla Beach and St. Joseph’s College; 24 clubs. Winners: D.S. Senanayake College and Visakha Vidyalaya.' },
          { title: 'Interaction Hill Country', date: '18 & 25 Jan, 4 Feb', body: 'Three winning clubs.' },
          { title: 'ILT Awards Night', date: '31 Jan', body: 'Royal Institute Campus.' },
          { title: '34th Interact District Conference', date: '22 Mar', body: 'Eagles’ Lakeside, Mount Lavinia. Jezon Fernando elected DIR-elect.' },
          { title: 'Interflash', date: '5 Apr', body: 'Lotus Tower. 12,000+ attendees and major income for the Rotary Little Hearts Foundation; chaired by Int. Yumeth Ratnayake.' },
          { title: 'Race4Change', date: 'Concluded 18 May', body: '1,000+ runners for the Little Hearts Foundation.' },
          { title: 'Intercede', body: 'The flagship community service project raised LKR 1.7M for Hethersett Tamil Vidyalayam, Nuwara Eliya: roof reconstruction and stationery.' },
          { title: 'Interlude ’25', body: 'A Rotary–Interact collaboration across seven clusters; chaired by Int. Rovin Mohotti.' },
          { title: 'Project RISE UP', body: 'Mentorship pairing new and developing clubs with established ones.' },
          { title: 'District RYLA 2025', date: '24 May', body: 'Carey College, Colombo. 200+ Interactors on emotional intelligence, goal-setting, financial literacy and AI ethics. Best RYLARIAN 2025: Int. Husni Habeeb (Zahira College).' },
          { title: '35th Interact District Assembly', date: '29 Jun 2025', body: 'Wave & Lake, under the theme “Sri Lankan Heritage: Wisdom in Culture”. The outgoing DIR, PHF. Int. PP. Damian De Cruz, collared the incoming DIR, Int. PP. Jezon Fernando, who introduced the new district council.', link: { label: 'Read the post', href: '/news/35th-interact-district-assembly-2025' } },
        ],
      },
    ],
  },
  {
    slug: '2023-24',
    label: '2023/24',
    theme: 'Create Hope in the World',
    dir: 'Aamir Akram',
    logo: logo('archive-2023-24-logo.jpg'),
    shape: 'unrecorded',
    summary: UNRECORDED_NOTE,
    sections: [],
  },
  {
    slug: '2022-23',
    label: '2022/23',
    theme: 'Imagine Rotary',
    dir: 'Julian Fernandopulle',
    logo: logo('archive-2022-23-header.png'),
    shape: 'journal',
    summary: 'The RI President’s visit, the Interact Anthem, and a District Conference and Assembly at Temple Trees.',
    councilPage: true,
    figures: [
      { value: '25+', label: 'Events' },
      { value: '11,000+', label: 'At Interflash 2023' },
      { value: '800+', label: 'At the 33rd Assembly' },
    ],
    sections: [
      {
        title: 'The year in order',
        items: [
          { title: 'Interact Board Training Seminar', date: '13 Jul 2022', body: 'On Zoom; trained 500+ office bearers.' },
          { title: 'Project Inter EVE', date: '31 Jul 2022', body: 'On Zoom; connecting school officials with Rotary clubs.' },
          { title: '1st District Meeting', date: '7 Aug', body: 'S. Thomas’ College.' },
          { title: 'Project Inter Cast – Season 2', body: 'A YouTube podcast on empowerment, mental health and leadership.' },
          { title: '2nd District Meeting', date: '4 Sep', body: 'D.S. Senanayake College.' },
          { title: '3rd District Meeting', date: '2 Oct', body: 'Royal College Union Skills Centre.' },
          { title: '4th District Meeting', date: '6 Nov', body: 'St. Peter’s College (Hajj and Diwali).' },
          { title: 'Interact Week Celebrations', date: '7–12 Nov', body: 'Aligned to Rotary’s seven Areas of Focus and the 17 SDGs: Interbiz (youth entrepreneurship), Enlighten (literacy), Nutriboost (maternal and infant nutrition), Salvation (a blood donation campaign) and the Salvation Workshop (a mental health and resilience panel).' },
          { title: 'GreenCon', date: '27 Nov', body: 'Eco-awareness across beaches and schools.' },
          { title: '5th District Meeting', date: '4 Dec', body: 'Trace Expert City (Christmas).' },
          { title: 'Rotary International President’s Visit', date: '14 Dec', body: 'Shangri-La Hotel. Launch of the Interact Anthem and recognitions for the 1 Million Trees Initiative.' },
          { title: 'Project Intercede – Better Tomorrow', body: 'Phase 1 on 3 Jan, a blood donation at the National Blood Transfusion Centre; Phase 2 in May, water-well donations in the Eastern Province.' },
          { title: 'Project Intercede – Edu Sight', body: 'A donation drive, awareness posters and seminars.' },
          { title: 'Project Intercede – Inclusion, Eco Light, Illuminate', body: 'Equity, sustainability and social-issue outreach.' },
          { title: 'Project Interlude – Pulse, Action Aid, Magnolia', body: 'Health and environment projects with Rotary.' },
          { title: '6th District Meeting', date: '8 Jan', body: 'Ilma International Girls’ School.' },
          { title: 'Project Interaction', body: 'Colombo (Beach and Grounds Day, led by Int. Joshua Almeda) and Hill Country (Indoor and Outdoor, led by Int. Ramua Bandaranayake); four champion schools.' },
          { title: 'Interact Leadership Training', body: 'Colombo, Kandy and Galle: interviews, training, exams and community service.' },
          { title: 'Design Age Workshop', date: '24 Feb', body: 'On Zoom, hosted by Mr. Supun Dulanga.' },
          { title: 'Project Live Light – Semifinals', date: '24 Feb', body: 'BMICH Front Lawn.' },
          { title: '8th District Meeting', date: '6 Mar', body: 'Zahira College; DIR candidate manifestos.' },
          { title: 'International DIR Convention', date: '11 Mar', body: 'Hosted by District 3292, with an address by DIR Julian Fernandopulle.' },
          { title: '32nd Interact District Conference', date: '17 Mar', body: 'Temple Trees; graced by the President of Sri Lanka.' },
          { title: 'Interflash 2023', date: '4 Apr', body: 'Nelum Pokuna Outdoor Stadium. 11,000+ participants; chaired by Int. Rezon David.' },
          { title: '9th District Meeting – Avurudu Celebration', date: '8 Apr', body: 'Mahamaya Girls’ School.' },
          { title: '10th District Meeting – “Wrapped Up”', date: '12 Jun', body: 'St. Benedict’s College.' },
          { title: '33rd Interact District Assembly', date: '17 Jun', body: 'Temple Trees. 800+ attendees, including the Prime Minister and RI leaders.' },
        ],
      },
    ],
  },
  {
    slug: '2021-22',
    label: '2021/22',
    theme: 'Serve to Change Lives',
    dir: 'Murthaaz Barry',
    logo: logo('archive-2021-22-logo.png'),
    shape: 'unrecorded',
    summary: UNRECORDED_NOTE,
    sections: [],
  },
  {
    slug: '2020-21',
    label: '2020/21',
    theme: 'Rotary Opens Opportunities',
    dir: 'Rahul Fernandez',
    logo: logo('archive-2020-21-logo.png'),
    shape: 'journal',
    summary: 'Stop The Spread through COVID-19, a virtual Live Light, and 105 leadership trainees.',
    council: [
      { role: 'District Interact Representative', names: 'Rahul Fernandez' },
      { role: 'Secretary', names: 'Heshalee Pathirana' },
      { role: 'Treasurer', names: 'Sashen Silva' },
      { role: 'Assistant DIR', names: 'Binoy Perera' },
      { role: 'Editor', names: 'Risinu Gamlath' },
      { role: 'Co-Sergeants at Arms', names: 'Charles Brinstan Peries, Nimsara Premarathna' },
    ],
    sections: [
      {
        title: 'Events and projects',
        items: [
          { title: 'Stop The Spread', body: 'A COVID-19 health initiative: social media campaigns, WHO and MOH safety education, and environmental certification.' },
          { title: 'Interact Week Celebration', date: '2–8 Nov', body: 'Six district projects, including Project Empath, Circle a Blue (mental health) and Mathurpakaya (cultural community service).' },
          { title: 'GreenCon', date: '17 Mar', body: 'Cinnamon Grand. A summit on deforestation and climate action.' },
          { title: 'Interaction 2021', body: 'Athletics and competitions across Colombo and Hill Country.' },
          { title: 'District Vesak Celebrations', body: 'Sessions and service at Uduwara Sri Sayilalatha Maha Viharaya.' },
          { title: 'Interact Leadership Training', date: '7 Jan – 23 May', body: '“Learners Today, Leaders Tomorrow”; 105 participants.' },
          { title: 'Live Light 2021', date: '17 Jul', body: 'Ultimate Studios, Piliyandala. A virtual talent showcase.' },
        ],
      },
    ],
  },
  {
    slug: '2000-01',
    label: '2000/01',
    theme: 'Create Awareness — Take Action',
    dir: 'Birendra Katugampola',
    logo: logo('archive-2000-01-logo.jpg'),
    shape: 'roster',
    summary: 'Interaction 2000, an AIDS awareness walk, 12,000 Christmas cards, and the district’s first website.',
    council: [
      { role: 'DIR', names: 'Int. PP. Birendra Katugampola' },
      { role: 'Secretary', names: 'Int. Anushi Senaratne (Visakha)' },
      { role: 'Treasurer', names: 'Int. PP. Chameen Battegoda (Nalanda)' },
      { role: 'Editor', names: 'Int. PP. Shalini Rajpakse (Visakha)' },
      { role: 'Project Chairpersons', names: 'Interaction — Int. PP. Sanjika Perera (Nalanda); Youth Camp — Int. Randika Dissanayake (Dharmaraja); International Understanding — Int. Dulan Abeyratne (Ananda)' },
      { role: 'Directors', names: 'ILT — Int. Amaya Ellawala (Visakha) and Int. Durga Pulendran (St. Bridget’s); Community Service — Int. PP. Dhanuska Tennakoon (Asoka); Club Service — Int. PP. Dinithi Abeysinghe (Methodist) and Int. Wasitha Pinnawala (Ananda); PR — Int. Sideeque Ahmed (Mahanama)' },
      { role: 'Zone Representatives', names: 'Zone II Kandy — Int. PP. Isuru Sirinimal (Kingswood); Zone III Galle — Int. PP. Chanuri Khaduwarachchi (Sacred Heart); Zone V Matale — Int. Kasun Gamarachchi (St. Thomas’ Matale)' },
    ],
    sections: [
      {
        title: 'Events',
        items: [
          { title: 'Interaction 2000', date: '28–29 Oct', body: 'Havelock Sports Grounds, BRC Grounds and Isipathana; Rs.42,000 profit.' },
          { title: 'AIDS Awareness Campaign and AIDS Walk', date: 'Week before 1 Dec; walk 2 Dec', body: 'About 600 participants.' },
          { title: 'Christmas Card Sales', date: 'Nov–Dec', body: 'Theme “Freedom”; 12,000 cards; Rs.82,000 for limb donations to Ranaviru Sevana.' },
          { title: 'Interact Leadership Training', date: 'Opened 6 Jan 2001', body: 'St. Peter’s; four zones; 97 graduated.' },
          { title: '10th District Conference “Love, Joy, and Peace”', date: '9 Mar 2001', body: 'NYSC Maharagama. Int. PP. Sanjika Perera elected DIR for 2001/02.' },
          { title: 'Youth Camp 2001', date: '17–20 Apr', body: 'Pearu International Camp Site, Nuwara Eliya; 55 Interactors.' },
          { title: 'Youth Summit', date: '2 Jun 2000', body: 'S. Thomas’ College Hall.' },
          { title: 'IWE3220 – Interact Web Exchange 3220', body: 'An early district website, at www.geocities.com/iwe3220.' },
          { title: '“Colombo out of Control”', date: '16 Jun 2001', body: 'St. Joseph’s; a concert with Shans Productions and Bathiya & Santhush.' },
        ],
      },
      {
        title: 'Administration',
        items: [
          { title: 'Subscription', body: 'Rs.500 (Rs.250 late).' },
          { title: 'Publications', body: 'District Handbook, “The Interactor”, a Yearbook and monthly letters. 12 district meetings.' },
        ],
      },
    ],
  },
  {
    slug: '1999-2000',
    label: '1999/2000',
    theme: 'Core Of Our Life: Our Heritage',
    dir: 'Saif Ramzi',
    logo: logo('archive-1999-2000-logo.jpg'),
    shape: 'roster',
    summary: 'A 3,000-strong Save The Children Walk, Interaction ’99, and Conference 2000 at BMICH.',
    sections: [
      {
        title: 'Events',
        items: [
          { title: '9th District Assembly “Assembly For A New Beginning”', date: '26 Jun 1999', body: 'St. Joseph’s; the first joint hosting, by Ananda, Mahamaya and Trinity Kandy.' },
          { title: 'Incoming-officer workshops', body: 'Colombo 3 Apr; Kandy and Matale 24 Apr; Galle 12 Jun.' },
          { title: 'Sun FM Birthday Bash Dance Competition', date: '3 Jul 1999', body: 'CH&FC Grounds.' },
          { title: 'Interaction ’99', date: '6–7 Nov', body: 'Police Park; 15 activities; 3,000+.' },
          { title: 'Save The Children Walk', date: '7 Nov 1999', body: '3,000+ Interactors from Police Park to Bambalapitiya, in UNICEF T-shirts.' },
          { title: 'Military Hospital Painting', date: '30 Oct 1999', body: 'Ward 11, with Macksons Paint.' },
          { title: 'Christmas and New Year Card Sale', date: '9–24 Dec', body: 'Majestic City; 12,000 cards; Rs.67,871 for the House of Compassion Elders Home.' },
          { title: 'Interact Leadership Training', date: 'Jan–Apr 2000', body: '227 applications; 55 selected from 30 schools.' },
          { title: 'Youth Camp 2000', date: '17–19 Apr', body: 'Lake View, Dharmaraja Kandy; 53 campers; “Green Hornets” outstanding.' },
          { title: 'Interflash 2000', body: 'Cancelled for national security.' },
          { title: '10th Assembly 2000 “Celebrating life”', date: '24 Jun', body: 'St. Joseph’s.' },
          { title: 'Conference 2000 “Conference of Challenge”', date: '18–19 Feb', body: 'BMICH; keynote by Mr. Thilan Wijesinghe; entertainment by Bathiya & Santhush; 1,500 Interactors.' },
        ],
      },
      {
        title: 'Publications',
        items: [{ title: 'Newsletters, two bulletins and a 230-page “Interact Guide”' }],
      },
    ],
  },
  {
    slug: '1998-99',
    label: '1998/99',
    theme: 'Follow Your Rotary Dream',
    dir: 'Nishantha de Silva',
    logo: logo('archive-1998-99-logo.jpg'),
    shape: 'roster',
    summary: 'Interaction ’98 with 71 clubs, the Conference of Reflections, and 26 representatives at International RYLA.',
    council: [
      { role: 'DIR', names: 'Int. PP. Nishantha de Silva (Ananda)' },
      { role: 'Secretary', names: 'Int. PP. Layangi Perera (Visakha)' },
      { role: 'Treasurer', names: 'Int. PP. Gehan V. Joseph (St. Peter’s)' },
      { role: 'Editor', names: 'Int. Kishan Thomas (Wycherley Int’l)' },
      { role: 'Project Chairpersons', names: 'Club Service — Int. PP. Selonica Perumal (Muslim Ladies); Interaction ’98 — Int. Kanishka Hewage (St. Peter’s); Community Service — Int. PP. Saif Ramzi (Wesley)' },
      { role: 'Directors', names: 'Int. Anusha Peiris, Int. PP. Lalanka de Silva, Int. Pushpakumara Wijayagunawardane, Int. Ian Van Hoff, Int. Samitha Ranaweera' },
      { role: 'Zone Representatives', names: 'Kandy — Int. Shezmin Zavahir (Good Shepherd’s); Galle — Int. PP. Dharshika Satheeja (Sacred Heart); Matale/Batticaloa — Int. Jude Fernando (St. Thomas’); Trincomalee — Int. PP. S. Vigneswaran (Hindu College)' },
    ],
    sections: [
      {
        title: 'Events',
        items: [
          { title: '8th District Assembly “Assembly of the New Millennium”', date: '27 Jun 1998', body: 'St. Joseph’s.' },
          { title: 'Interaction ’98', date: '7–8 Nov', body: 'Police Park; 71 clubs; 3,000+; Rs.90,000 profit. Winners below.' },
          { title: '8th District Conference “Conference of Reflections”', date: '15–16 Jan 1999', body: 'Visakha; keynote by Prof. Arjuna Parakrama.' },
          { title: 'Interact Leadership Training', body: '42 trained, 41 passed; Wycherley International.' },
          { title: 'International RYLA', date: '23 May – 1 Jun 1999', body: 'Ooty; 26 representatives.' },
          { title: 'Christmas Card fundraiser', body: 'For the Shilpa orphanage; Rs.59,100, which bought 15 bedside cupboards.' },
          { title: 'Visiting Injured Soldiers', date: 'Oct 1998 – Jan 1999', body: 'National Hospital; 17 clubs; 260 food packs for 275 soldiers.' },
          { title: 'Flood Victims donation', date: 'Apr–May 1999', body: 'IDA Kollonnawa.' },
        ],
      },
      {
        title: 'Clubs and awards',
        items: [
          { title: 'New clubs', body: 'Colombo — Belvior International, British School in Colombo, College of World Education; Galle — Rahula College, Sangamiththa College; Kandy — Kandy Grammar School; Matale/Batticaloa — Science College Matale, Akurana Central College.' },
          { title: 'Awards', body: 'Citations for eight clubs; category winners Ananda, S. Thomas’ Mt. Lavinia and Visakha; five outstanding presidents; seven outstanding Interactors.' },
          { title: 'Publications', body: 'President’s Handbook; The Interactor (two bulletins); Interact Yearbook (Jun 1999). 12 district meetings. Dues Rs.450.' },
        ],
      },
    ],
    tables: [
      {
        title: 'Interaction ’98 — competition winners',
        columns: ['Group', 'Event', 'Champions', 'Runners-up'],
        rows: [
          ['I', 'Athletics', 'Wesley College', 'Carey College'],
          ['I', 'Swimming', 'St. Peter’s College', 'Royal College'],
          ['I', 'Water Polo', 'St. Peter’s College', 'S. Thomas’ Prep'],
          ['II', 'Cricket (Boys)', 'Zahira College', 'Prince of Wales'],
          ['II', 'Cricket (Girls)', 'Sacred Heart Convent', 'St. Bridget’s Convent'],
          ['II', 'Football (Boys)', 'Mahinda College', 'D.S. Senanayake College'],
          ['II', 'Netball', 'Sacred Heart Convent', 'Visakha Vidyalaya'],
          ['II', 'Volleyball', 'Vidyartha College', 'Prince of Wales'],
          ['II', 'Rugby', 'Ananda College', 'Isipathana College'],
          ['III', 'Song', 'Visakha Vidyalaya', 'Muslim Ladies College'],
          ['III', 'Drama', 'Royal College', 'Nalanda College'],
          ['III', 'Quiz', 'St. Aloysius College', 'Wesley College'],
          ['III', 'Give Us A Clue', 'Prince of Wales College', 'Bishop’s College'],
          ['III', 'Debating', 'S. Thomas’ Prep School', 'Ananda College'],
        ],
      },
    ],
  },
  {
    slug: '1997-98',
    label: '1997/98',
    theme: 'Show Rotary Cares',
    dir: 'Chamath Athulathmudali',
    logo: logo('archive-1997-98-logo.jpg'),
    shape: 'roster',
    summary: 'The Conference of Unity, the district’s first Deepavali celebration, and its first International Understanding project.',
    council: [
      { role: 'DIR', names: 'Int. PP. Chamath Athulathmudali (Ananda)' },
      { role: 'Secretary', names: 'Int. PP. Neelakshi Dissanayaka (Anula)' },
      { role: 'Treasurer', names: 'Int. PP. Chaminda Bombuwala (Ananda)' },
      { role: 'Editor', names: 'Int. Nishantha de Silva (Ananda)' },
      { role: 'Chairpersons', names: 'Interaction — Int. PP. Ezraad Bathusha (President’s); Youth Camp — Int. Dilshan De Silva (Isipathana), Int. PP. Nuwan Piyatissa (D.S. Senanayake), Int. Upul Ratnayaka (Thurstan)' },
      { role: 'Directors', names: 'Int. PP. Zamani Zainudeen, Int. Lashanthi Chandrapala, Int. Ayashan Attygala, Int. Pubudu Jayawardena, Int. Charmaine Tillekeratne, Int. Shameendra Rajapakse, Int. Ishan Perera' },
      { role: 'Zone Representatives', names: 'Kandy — K. Vijayabahu; Galle — PP. Kolitha De Silva; Badulla — PP. Chanaka Daulagala; Trincomalee — A.R. Hanifa' },
    ],
    sections: [
      {
        title: 'Events',
        items: [
          { title: '7th District Assembly “Assembly With A Mission”', date: '6 Jul 1997', body: 'D.S. Senanayake.' },
          { title: 'Rotary Youth Activities Month', date: 'Oct' },
          { title: 'Interaction ’97', date: '18–19 Oct', body: 'Police Park; about 60 schools; 3,500+; net Rs.111,837.' },
          { title: 'Deepavali “Light In Life”', date: '20 Nov', body: 'Hindu College; the first in district history.' },
          { title: 'Christmas cards and carols', body: 'Card competition and sales (Rs.22,360) and a carol competition on 5 Dec at Royal College.' },
          { title: 'Youth Camp ’97', date: '26–29 Dec', body: 'Sri Sumangala MV, Hikkaduwa; 70 Interactors.' },
          { title: '7th District Conference “The Conference Of Unity”', date: '30–31 Jan 1998', body: 'National Youth Service Centre, Maharagama; 1,000+.' },
          { title: 'Interact Leadership Training', body: 'The third year; 42 selected, 28 completed.' },
          { title: 'International RYLA 1998', date: '24–31 May', body: 'Ooty, India; 11 representatives among 6,000 worldwide.' },
          { title: 'Youth Summit ’98', date: 'May–Jun', body: 'Ananda College; the first International Understanding project.' },
          { title: 'Swimming Gala ’98', date: '11 Jul', body: 'Royal College pool.' },
          { title: 'Scholarship Fund and donations', body: 'Scholarships at nine schools; Rs.25,000 of furniture for Sri Lankadara Balika Home.' },
        ],
      },
    ],
  },
  {
    slug: '1996-97',
    label: '1996/97',
    theme: 'Build the Future with Action and Vision',
    dir: 'Ifthikar Mohammed',
    logo: logo('archive-1996-97-logo.jpg'),
    shape: 'roster',
    summary: 'Interaction ’96 with about 4,000 participants from 75 schools, and Interflash ’97 across two cities.',
    council: [
      { role: 'DIR', names: 'Int. PP. Ifthikar Mohammed (Thurstan)' },
      { role: 'Secretary', names: 'Int. P. Chadwick Candappa (Carey)' },
      { role: 'Treasurers', names: 'Int. Jiffry Riyaz (Royal), Int. PP. Shamila Sally (Methodist)' },
      { role: 'Interaction Chairs', names: 'Int. PP. Zainudeen Gadaffi (St. Peter’s), Int. PP. Shamila Sally (Methodist)' },
      { role: 'Interflash Chairs', names: 'Int. PP. S. Rajanikanth (St. Anthony’s), Int. PP. Malique Pakeer (Aleathea Int’l), Int. PP. Chamath Athulathmudali (Ananda)' },
      { role: 'Director', names: 'Int. PP. Aaliya Aziz (Aleathea Int’l)' },
      { role: 'Zone Representatives', names: 'Shihara Rasheed (Kandy), Chanaka Ranasinghe (Galle), S. Rajkumar (Trincomalee)' },
    ],
    sections: [
      {
        title: 'Events',
        items: [
          { title: '6th District Assembly', date: '29 Jun', body: 'St. Peter’s Hall; “Build the Future with Vision & Action”.' },
          { title: 'Interaction ’96', date: '19–20 Oct', body: 'Police Park; about 4,000 participants from 75 schools.' },
          { title: 'ILT Programme', date: '25 Sep 1996', body: 'Hotel Ceylon Intercontinental.' },
          { title: 'Youth Camp ’96', date: '24–27 Sep', body: 'Trinity College Farm, Pallekele; 100+.' },
          { title: 'Interflash ’97', date: '28 Feb & 7 Mar 1997', body: 'Phase 1 at Sathutu Uyana, Phase 2 at St. Anthony’s, Kandy; more than Rs.150,000 profit.' },
          { title: 'Swimming Gala', date: '7 Jun 1997' },
          { title: 'Inter-Interact Cricket Sixes', date: '29 Jun 1997', body: 'Bloomfield.' },
          { title: '6th District Conference', date: '24–26 Jan 1997', body: 'Hosted by Anula Vidyalaya and St. Joseph’s; 1,100+ Interactors.' },
        ],
      },
      {
        title: 'Administration',
        items: [
          { title: 'Subscription Rs.400', body: 'A mailing directory printed and “The Potha” yearbook published. 12 district meetings.' },
        ],
      },
    ],
  },
  {
    slug: '1995-96',
    label: '1995/96',
    theme: 'Act with Integrity, Serve with Love, Work for Peace',
    dir: 'Fayaz Hudah',
    logo: logo('archive-1995-96-logo.jpg'),
    shape: 'roster',
    summary: 'A record 1,054 at the Conference of Hope, Interaction ’95 with a 500-strong Peace Walk, and Polio Plus clinics.',
    council: [
      { role: 'DIR', names: 'Int. PP. M. Fayaz Hudah (Carey)' },
      { role: 'Secretary', names: 'Int. PP. Kaveenga Wijayasekara (Ananda)' },
      { role: 'Treasurer', names: 'Int. PP. Yoshitha Gunasekara (Devi Balika)' },
      { role: 'Editor', names: 'Int. Kishani de Silva (Bishop’s)' },
      { role: 'Project Chairpersons', names: 'Int. PP. Chinthaka de Zoysa (Ananda), Int. PP. Indika Amarasinghe (St. Sebastian’s), Int. Bathiya Jayakody (Ananda)' },
      { role: 'Directors', names: 'Int. PP. Lahiru Mudunkotuwa (Nalanda), Int. PP. Chadwick Candappa (Carey), Int. PP. Ifthikar Mohamed (Thurstan), Int. PP. Sharmila Sally (Methodist), Int. PP. Thanuja Madawala (Hillwood), Int. Jiffry Riyaz (Royal)' },
      { role: 'Zone Representatives', names: 'Kandy — Int. PP. Yohan Ziard (Kingswood); Galle — Int. PP. Ruwinda Liyanage (Richmond); Trincomalee — Int. PP. B. Sathees; Batticaloa — Int. PP. Stanley Dinesh (St. Michael’s)' },
    ],
    sections: [
      {
        title: 'Major events',
        items: [
          { title: '5th District Assembly', date: '25 Jun 1995', body: 'Navaragahala; hosted by Royal and Bishop’s.' },
          { title: 'Interaction ’95', date: '7–8 Oct', body: '2,400+ Interactors in cricket, volleyball, basketball, netball, football, debating, quiz, song, drama and “Give Us A Clue”; a 500+ Peace Walk through Colombo; coverage on Yes FM and in the Sunday Times.' },
          { title: 'Polio Plus Campaign', date: '4 Nov & 9 Dec 1995', body: 'Immunisation clinics for children under five.' },
          { title: 'Youth Camp ’95', date: '14–16 Dec', body: 'Lee Dissanayake Scout Centre, Mirigama; 83 Interactors; “Youth FM”, a 90-hour broadcast on 103 MHz.' },
          { title: 'Inter-Interact Cricket', date: '7 Apr 1996', body: 'Bloomfield; 25+ teams.' },
          { title: 'Inter-Interact Swimming Gala', date: '12 May 1996', body: 'Royal College pool; the first in four years.' },
          { title: '5th District Conference “Conference of Hope”', date: '26–27 Jan 1996', body: 'A record 1,054 Interactors; Int. PP. Ifthikar Mohammed elected DIR for 1996/97.' },
        ],
      },
      {
        title: 'Programmes',
        items: [
          { title: 'Awards programme', body: '14 categories.' },
          { title: 'Leadership Training', body: 'Ages 15–17; suspended due to unrest and restarted in Mar 1996.' },
          { title: 'Pen Pal Programme, Youth Exchange and publications', body: '“The Interactor” magazine and a Year Book.' },
          { title: 'Paper Recycling pilot', body: '15 Colombo schools, with the National Paper Co-operation and RC Colombo Mid-town.' },
        ],
      },
      {
        title: 'Zones',
        items: [
          { title: 'Kandy', body: 'Donated more than Rs.1M of goods to the Kotiyagala Refugee Camp.' },
          { title: 'Galle', body: 'Zone Assembly on 29 Oct at St. Aloysius.' },
          { title: 'Trincomalee', body: 'Revived, with a shramadana at the Base Hospital by 200 Interactors.' },
          { title: 'Batticaloa and Jaffna', body: 'Unable to operate due to unrest.' },
        ],
      },
      {
        title: 'Administration',
        items: [{ title: 'Subscription Rs.350 (Rs.500 late)', body: 'Interaction fees Rs.100 per club plus Rs.20 per ticket.' }],
      },
    ],
  },
  {
    slug: '1994-95',
    label: '1994/95',
    theme: 'Be a Friend',
    dir: 'Shawn Shiek',
    logo: logo('archive-1994-95-logo.jpg'),
    shape: 'roster',
    summary: 'The first two-way youth exchange with India, Interaction with 2,000+, and the Teen News newsletter.',
    council: [
      { role: 'DIR', names: 'Int. PP. Shawn Shiek (S. Thomas’)' },
      { role: 'Secretary', names: 'Int. PP. Fayaz Hudah (Carey)' },
      { role: 'Treasurer', names: 'Int. PP. Shiluka Gunawardene (St. Joseph’s)' },
      { role: 'Editors', names: 'Int. PP. Dharshani Keerthisena (St. Bridget’s), Int. PP. Ishanie Mendis (Methodist)' },
      { role: 'Chairpersons', names: 'Interaction — Int. PP. Thurab Hilmy (Wesley); Interflash — Int. PP. Rizna Abdeen (Ladies College)' },
      { role: 'Directors', names: 'PR — Int. PP. Kaveenga Wijayasekara (Ananda); Road Safety — Int. PP. Dilantha Fernando (Nalanda); Library Books — Int. PP. Lanka de Silva (Visakha); Children’s Park — Int. Shamil Samsudeen (St. Peter’s); Drug Abuse — Int. Yoshitha Gunasekera (Devi Balika); Club Extension — Int. PP. M.S. Fuaed (Kingswood); Youth Exchange — Int. PP. Buharie Amath (Isipathana); Sponsorship — Int. PP. Manique Wijesurendra (Hillwood); Assembly — Int. PP. Rosanne Neydorff (Bishop’s); Conference — Int. Anura Warnakulasuriya (S. Thomas’)' },
      { role: 'Zone Representatives', names: 'Moratuwa — Int. PP. Shiek Ameen (St. Sebastian’s); Kandy — Int. PP. Mohommed Azreen (St. Anthony’s); Nuwara Eliya — Int. R. Thilaganathan (St. Xavier’s); Jaffna — Int. M. Udayashankar (St. John’s); Batticaloa — Int. Stanley Dinesh (St. Michael’s); Galle — Int. PP. Dinash Palihawadana (Mahinda)' },
    ],
    sections: [
      {
        title: 'Highlights',
        items: [
          { title: 'Citation programme and code of ethics', body: 'Introduced this year. 12 district meetings.' },
          { title: 'First Sri Lanka two-way Youth Exchange with India', body: '48 Sri Lankan Interactors and 20 “Annetts” visited Districts 3200 and 3230.' },
          { title: 'DIR Training Institute for Asia Zone II', date: '26–28 May 1994', body: 'Kotmale.' },
          { title: 'Media coverage', body: '60+ newspaper articles, with TV and radio coverage.' },
          { title: 'Interaction Sports Festival', date: '2–3 Oct', body: 'Police Park, under the theme “Youth of ONE Nation”; 2,000+ Interactors; chief guests Hon. Dharmasiri Senanayake and Hon. S.B. Dissanayake.' },
          { title: 'Teen News', body: 'A bi-monthly newsletter.' },
        ],
      },
    ],
  },
  {
    slug: '1993-94',
    label: '1993/94',
    theme: 'Believe in What You Do — Do What You Believe in',
    dir: 'Duminda De Silva',
    logo: logo('archive-1993-94-logo.jpg'),
    shape: 'roster',
    summary: 'The district reached 100 clubs, with 14 new, 5 chartered and 6 revived.',
    figures: [
      { value: '100', label: 'Clubs reached' },
      { value: '14', label: 'New clubs' },
      { value: '6', label: 'Revived' },
    ],
    council: [
      { role: 'DIR', names: 'Int. Duminda De Silva (Ananda)' },
      { role: 'Secretary', names: 'Int. Jithari Abesekera (Visakha)' },
      { role: 'Project Chairpersons', names: 'Int. Shawn Sheik (S. Thomas’), Int. Fayaz Huddah (Carey)' },
      { role: 'Editor', names: 'Int. Lasanda Wijesuriya (St. Paul’s Girls)' },
      { role: 'Zone Representatives', names: 'Int. Perry Saundranayagam (St. Peter’s), Int. Buharie Amath (Isipathana), Int. M.S. Fuerd (Kingswood)' },
    ],
    sections: [
      {
        title: 'Projects',
        items: [
          { title: '3rd District Assembly', date: '26 Jun 1993', body: 'Carey; 550 attendees.' },
          { title: 'Interaction 1993', date: 'Finals 16–17 Oct', body: '“Sports promote a drug free society”; Sugathadasa Stadium; sponsored by Pure Beverages and the Sunday Observer.' },
          { title: 'Interflash 1993', date: '17 Oct', body: 'Hendry Pediris Grounds; Minister of Sports Hon. Nanda Mathew; more than Rs.60,000 profit.' },
          { title: '3rd District Conference', date: '4–6 Mar', body: 'S. Thomas’.' },
          { title: '4th District Assembly', date: '25 Jun', body: 'St. Peter’s.' },
          { title: 'Community Service', date: '29 May 1994', body: 'Sri-lankadara Home, Wellawatte.' },
          { title: 'Inter-Interact Cricket', body: 'Organised by Mahanama; winners S. Thomas’ Prep (boys) and Sujatha Vidyalaya (girls).' },
        ],
      },
      {
        title: 'Clubs',
        items: [
          { title: 'New clubs (14)', body: 'St. Xavier’s, Hindu College, St. Anthony’s Convent, St. Thomas’ (Matale), Swarnamalie Balika, Saranatha MV, Vidyartha College, Buena Vista, Kandy International, Presbyterian College, Kandy Convent, Yasodhara Balika, Kegalu Balika, St. Mary’s Vidyalaya.' },
          { title: 'Chartered (5)', body: 'Methodist College, Hillwood College, Kingswood College, Girls High School (Mt. Lavinia), Presbyterian Girls School.' },
          { title: 'Revived (6)', body: 'Sacred Heart Convent, Prince of Wales, Princess of Wales, Our Lady of Victories, Moratu Vidyalaya, Wycherley International.' },
        ],
      },
    ],
  },
  {
    slug: '1992-93',
    label: '1992/93',
    theme: 'Real Happiness Is Helping Others',
    dir: 'Kumudu Warnakulasooriya',
    logo: logo('archive-1992-93-logo.jpg'),
    shape: 'roster',
    summary: 'A sports festival with SLANA, a 700-strong Rotary Family Fiesta, and the start of the Hill Country Zone.',
    council: [
      { role: 'DIR', names: 'Int. Kumudu Warnakulasooriya (St. Thomas’ College)' },
      { role: 'Secretary', names: 'Int. PP. Duminda De Silva (Ananda)' },
      { role: 'Treasurer', names: 'Int. PP. Shanika Paul (St. Bridget’s)' },
      { role: 'Project Chairpersons', names: 'Int. PP. Pubudu Ranasinghe (Sirimavo Bandaranayaka), Int. Asanka Gurusinghe (Mahanama)' },
      { role: 'Zone Representatives', names: 'Int. Shawn Sheik (St. Thomas’), Int. Fayaz Huddah (Carey)' },
    ],
    sections: [
      {
        title: 'Projects',
        items: [
          { title: '10 district meetings' },
          { title: 'Youth Services Activities Month', date: '15 Sep – 15 Oct' },
          { title: 'Sports Festival with SLANA', body: 'Cricket, badminton, swimming, volleyball and carom; finals at Sugathadasa Stadium and St. Benedict’s.' },
          { title: 'Rotary Family Fiesta', body: '700+ members.' },
          { title: 'Hill Country Zone initiated', body: 'Under Int. PP. Ranil Herath (Dharmaraja College, Kandy).' },
          { title: 'District Conference', date: '5–7 Mar 1993', body: 'St. Peter’s; guests Former President J.R. Jayawardena and Minister Ranil Wickramasinghe; about 380 Interactors.' },
        ],
      },
    ],
  },
  {
    slug: '1991-92',
    label: '1991/92',
    theme: 'Look Beyond Yourself',
    dir: 'Sanjeewa Wickramasinghe',
    shape: 'unrecorded',
    summary: UNRECORDED_NOTE,
    sections: [],
  },
  {
    slug: '1990-91',
    label: '1990/91',
    theme: 'Honor Rotary with Faith and Enthusiasm',
    dir: 'Viraj Premasinghe',
    shape: 'roster',
    summary: 'A car wash for the National Defence Fund, a film festival at the Majestic, and five new clubs.',
    council: [
      { role: 'DIR', names: 'Int. Viraj Premasinghe (Nalanda College)' },
      { role: 'Secretary', names: 'Int. Indrajith Lankeshwera (D.S. Senanayake)' },
      { role: 'Assistant Secretary', names: 'Int. Imara Mawjood (St. Paul’s Girls School)' },
      { role: 'Treasurer', names: 'Int. Dilshani Wijewardena (St. Bridget’s Convent)' },
      { role: 'Project Chairpersons', names: 'Int. Sanjeewa Wickramaarchchi (Ananda), Int. Qua-Fung Judy Wei (Wycherley International)' },
      { role: 'Zone Representative', names: 'Int. Rizme Razik (Carey College)' },
    ],
    sections: [
      {
        title: 'Projects',
        items: [
          { title: 'Car Wash', date: 'Jun 1990', body: 'Galle Face; raised Rs.13,000 for the National Defence Fund.' },
          { title: 'Painting Ward #40', date: '26 Aug 1990', body: 'Colombo General Hospital; 80 Interactors.' },
          { title: 'Cricket Tournament', date: '4 Nov 1990', body: 'NCC grounds; winners Mahanama (boys) and Clifton Balika (girls).' },
          { title: 'Tea service at Sevana Lama Nivasa', date: '24 Nov 1990' },
          { title: 'Film Show “Tuff Turf”', date: 'Dec 1990', body: 'Liberty Hall; more than Rs.5,000.' },
          { title: 'District Conference', date: '15–16 Jan 1991', body: 'Ananda and Nalanda.' },
          { title: 'Zoo Fellowship', date: '20 Jan 1991', body: 'Dehiwala Zoo; 50+.' },
          { title: 'Swimming Meet', date: '18 May 1991', body: 'Royal College pool; winners S. Thomas’ (boys) and Bishops (girls).' },
          { title: 'Film Festival', date: '31 May 1991', body: 'Majestic Cinema.' },
          { title: 'District Assembly', body: 'S. Thomas’, Mt. Lavinia.' },
        ],
      },
      {
        title: 'Clubs',
        items: [
          { title: 'New clubs', body: 'Ramanathan Hindu Ladies College, Sirimavo Bandaranaike MV, St. Peter’s College, Isipathana Vidyalaya, Holy Cross Convent Galle.' },
          { title: 'In memory', body: 'Past DIR Int. Flt. Lt. Priya Gunawardena, shot down over the Jaffna Lagoon.' },
        ],
      },
    ],
  },
  {
    slug: '1988-90',
    label: '1988/89–1989/90',
    theme: 'Put Life into Rotary — Your Life / Enjoy Rotary',
    dir: 'Shehan Gunawardena',
    shape: 'roster',
    summary: 'A hospital ward painted by 50 Interactors, two cricket tournaments, and 25 Interactors at a District Conference in India.',
    council: [
      { role: 'DIR', names: 'Int. Shehan Gunawardena (Ananda College)' },
      { role: 'Secretary', names: 'Int. Harsha Wanigathunga' },
      { role: 'Treasurer', names: 'Int. Ganga Jayaratne' },
      { role: 'Project Chairman', names: 'Int. Viraj Premasinghe (Nalanda College)' },
      { role: 'Zone Representatives', names: 'Int. Priyanka Dharmathilake, Int. Somila De Silva' },
    ],
    sections: [
      {
        title: 'Projects',
        items: [
          { title: '12 district meetings', body: 'Low attendance noted.' },
          { title: 'Hospital Ward Painting', date: 'May 1989', body: 'Ward #55, Colombo General Hospital; 50 Interactors.' },
          { title: 'Inter-Interact cricket', body: 'Two six-a-side tournaments; winners included Nalanda, Hindu College, St. Paul’s Milagiriya, Carey and Bishops.' },
          { title: 'Office Bearers Workshop', date: 'Apr 1990', body: 'Ananda College Centenary Hall.' },
          { title: 'Swimming Competition', date: 'Apr 1990', body: 'D.S. Senanayake pool; winners D.S. Senanayake (boys) and Bishops (girls).' },
          { title: 'Scholarship fund ticket sales' },
          { title: 'District Conference in India', date: 'Jan 1990', body: '25 Interactors attended.' },
          { title: '5th District Conference', body: 'D.S. Senanayake.' },
          { title: 'Victoria Home dinner', date: 'Jun 1990', body: 'For 165 residents.' },
          { title: 'District Assembly' },
        ],
      },
    ],
  },
];

export const getArchiveYear = (slug: string) => ARCHIVE_YEARS.find((y) => y.slug === slug);

/**
 * Years with no archive at all on the old site and no decision to add pages:
 * 2001/02 to 2019/20. The index shows them as one marked span, pointing to the
 * College of DIRs, which does cover them.
 */
export const UNRECORDED_SPAN = { from: '2001/02', to: '2019/20', count: 19 };
