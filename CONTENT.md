# Interact District 3220 — Website Content Inventory

> **Source site:** https://www.interactdistrict3220.org (built on Wix)
> **Captured:** 2026-06-15
> **Purpose:** Complete content & structure reference for rebuilding the site with a modern, mobile-friendly design. Every page, section, text block, link, and image on the existing site is catalogued here. All new content will be layered on top of this baseline.
>
> **This is a snapshot of the old Wix site as it stood on 2026-06-15, mid-way through the 2025/26 Rotary year. Leave it as captured.** References below to the "current" council, theme ("Unite For Good") and events are 2025/26. The live facts are in the code: the 2026-27 theme is **"Create Lasting Impact"** (`lib/site.ts`), the 2025/26 council now lives in the archive (`/archives/council/2025-26`), and the 2026/27 council is on the site (`lib/councils.ts`). Quoted text below is the old site's wording; the rebuilt site's copy was edited for plain language (2026-10-06 and 2026-10-19), so the code, not this file, holds the published wording. The admin documents the old site never exposed came from the council's Drive folders on 2026-10-19 (`DOCUMENT_SECTIONS` in `lib/publications.ts`). Where the rebuilt site deliberately departs from this inventory, `design/DECISIONS.md` §8 and `HANDOFF.md` say why.

---

## Table of Contents
1. [Organisation Overview](#1-organisation-overview)
2. [Global Elements (Header, Nav, Footer)](#2-global-elements)
3. [Page: Home](#3-page-home)
4. [Page: About](#4-page-about)
5. [Page: Meet The Council 2025/26](#5-page-meet-the-council-202526)
6. [Page: College of DIRs](#6-page-college-of-dirs)
7. [Page: Calendar](#7-page-calendar)
8. [Page: Admin Documents](#8-page-admin-documents)
9. [Page: News / Blog](#9-page-news--blog)
10. [Page: Newsletter](#10-page-newsletter)
11. [Page: Archives](#11-page-archives) — *full year-by-year detail in [ARCHIVES.md](ARCHIVES.md)*
12. [Page: Media Crew](#12-page-media-crew)
13. [Page: Contact](#13-page-contact)
14. [Page: Request a Date (form)](#14-page-request-a-date)
15. [DIMUN '25 — Event Section](#15-dimun-25--event-section)
16. [Utility & Empty Pages](#16-utility--empty-pages)
17. [Forms Summary](#17-forms-summary)
18. [Image Inventory](#18-image-inventory)
19. [Gaps / To Verify](#19-gaps--to-verify)
20. [Full Site Path Audit](#20-full-site-path-audit)

---

## 1. Organisation Overview

- **Name:** Interact District 3220
- **Region:** Sri Lanka & Maldives
- **Parent body:** Rotary International (Interact is Rotary's service club for young people aged 12–19)
- **Founded (Interact movement):** 5 November 1962
- **Scale (per About page):** ~3,500 members across 100+ clubs nationwide
- **Zones:** Colombo, Kandy, Kurunegala, Negombo, Galle, Gem City, Tea Country, Jaffna, Kegalle (plus a Maldives region)
- **Current RI Year theme (2025/26):** "Unite For Good"
- **Tagline used on home:** *"create a robust mindset of 'Unite For Good' during our year of Interact"*
- **Contact email:** interactdistrictcouncil3220@gmail.com
- **Contact phone:** +94 77 458 2006 *(old site only. Not published on the rebuild: email is the only public contact, 2026-10-06)*
- **Copyright line:** © Interact District 3220

### Social media (used site-wide in footer)
| Platform | URL |
|----------|-----|
| Instagram | https://www.instagram.com/interact3220 |
| Facebook | https://www.facebook.com/Interact3220 |
| Twitter/X | https://twitter.com/interact__3220 |
| LinkedIn | https://www.linkedin.com/company/75000437/ |
| YouTube | https://www.youtube.com/channel/UCPPsrcvlq87rcrXsUgs_URA |
| TikTok | https://www.tiktok.com/@interact3220 |

---

## 2. Global Elements

### Primary navigation (appears on every page)
| Label | URL | Children |
|-------|-----|----------|
| Home | `/` | — |
| About | `/about` | Meet The Council 2025/26 (`/meet-the-council-2025-26`), College of DIRs (`/college-of-dirs`) |
| Calendar | `/district-calendar` | — |
| Admin Documents | `/admin-documents` | — |
| News | `/blog` | Newsletter (`/newsletter`) |
| Archives | `/archives` | — |
| Media Crew | `/media-crew` | — |
| Contact | `/contact-8` | — |

### Header
- District header logo (`logo-header.jpg`)
- Back-navigation button images on interior pages

### Footer (global)
- Interact footer logo (`logo-footer.png`)
- "Social Media" heading + 6 social icons (see table above)
- Download link: **First Quarterly Newsletter.pdf**
- Copyright: © Interact District 3220

---

## 3. Page: Home

**URL:** `/` · **Title tag:** "Interact District 3220 | Service"

### Section A — Hero / Intro
- Body: *"The Interact District 3220 hopes that we are able to create a robust mindset of 'Unite For Good' during our year of Interact."* Emphasis on service values and community building across cultural boundaries.
- CTA: **Learn More About District** → `/about`
- Decorative imagery: `decor-white-structure.jpg`, `decor-sphere-stairs.jpg`; Rotary logo (`rotary-logo.png`)

### Section B — The Five Avenues of Interact
Each avenue has an icon + short description:

1. **Community Service** — *"Though community service is not an exclusive aspect of Interact, it is the heart and soul of the movement."* (icon: `avenue-community-service.png`)
2. **International Understanding** — *"International Understanding is an avenue of service that promotes international good-will and understanding amongst communities."* (icon: `avenue-international-understanding.png`)
3. **Club Service** — *"Club service is essentially the avenue of interact which focuses on the wellbeing and the development of the basic foundation of a club."* (icon: `avenue-club-service.png`)
4. **Green Life** — *"The avenue of Green Life holds immense importance in the current world, seeing the lack of respect or thought we pay to Mother Earth."* (icon: `avenue-green-life.png`)
5. **Finance** — *"The finance projects and the fundraisers help to fund projects which happen under the other avenues of the club."* (icon: `avenue-finance.png`)

### Section C — Recent Events & Announcements
The homepage surfaces a rolling feed of district events. Captured at time of writing:

- **BizConnect'26** — After Round 01, finale set. Participating clubs: ICSBC, ICSJC, ICZC, ICMC, ICMCK, ICWIS, ICDRC.
- **Interaction '26 Awards Night** — 28 Feb 2026, Hillwood College Kandy. Recognised annual district initiative achievements. Album on Facebook: https://www.facebook.com/share/p/18fVmNuRnn/
- **Race4Change 2026** — 5 km charity run, 7 June 2026, Galle Face Green, 4 PM. Beneficiary: Little Hearts Foundation. On-spot + corporate team registration.
- **District Awrudhu Celebrations** — 11 Apr 2026, Maliyadeva College Kurunegala. Eight Interact clubs collaborating to celebrate Sri Lankan heritage. Album: https://www.facebook.com/share/p/1BDVQydQ4T/
- **Rotary Awards Recognition** — DICC Rtn. PP. Wasantha Arambewela & DIR Int. PP. Jezon Fernando received the Gold Award for Outstanding Service.
- **Interarchive Project** — Historic archive book presented to RI President's Representative PRIP Stephanie A. Urchick and District Governor Delvin Pereira. Order form: https://forms.gle/DKgQHfoxcm93LyJz5 · Contacts: Int. Husni Habeeb 072 011 2088, Int. Luja Jameel 077 592 7237
- **36th Interact District Assembly** — Standard registrations at capacity; late registrations open.
- **Interact Leadership Training Awards Night** — 29 Mar 2026, Royal Institute Auditorium Colombo. Culmination of a 4-month training program across four zones. Album: https://www.facebook.com/share/p/1Nxv9A32Ds/
- **EmpoweHER Initiative** — Empowering young women through leadership & advocacy. Venue: Trace Expert City, 2:00 PM. Contact: +94 74 131 5541. Register: https://forms.gle/V7iwqdaCWE5WRUJ58

> **Note for rebuild:** This events feed should likely become a proper "Events / Projects" content type (cards with date, venue, image, registration link, Facebook album) rather than static blocks.

---

## 4. Page: About

**URL:** `/about`

### About Interact District 3220
- Interact is *"Rotary International's service club for young people ages 12–19."* Founded 5 November 1962; the movement's flagship youth organisation.
- **Statistics:** ~3,500 members, 100+ clubs nationwide; zones in Colombo, Kandy, Kurunegala, Negombo, Galle, Gem City, Tea Country, Jaffna, Kegalle.

### Vision
Instil a *"Service Above Self"* mentality, embed Rotary's core values and Four-Way Test principles, demonstrating that *"true prosperity"* derives from serving others.

### Mission
Establish a unified platform emphasising the *"Service Above Self"* spirit; cultivate future responsible citizens; develop leadership, honour, humility, and altruism.

### Goals
Build an inclusive community atmosphere transcending club boundaries, uniting as *"ONE MOVEMENT"* toward bettering the country and world.

---

## 5. Page: Meet The Council 2025/26

**URL:** `/meet-the-council-2025-26`

Profile card per member: **photo + position title + name + one-line bio.** Grouped below as on the source site. (Photo filenames map to [Image Inventory](#16-image-inventory).)

> **Past councils:** The site also keeps per-year "Meet the Council" pages with portraits. Built years: **2024/25** (`/meet-the-council-2024-25`, 12 members) and **2022/23** (`/meet-the-council-2022-23`, 31 members) — full rosters, bios, and portraits documented in [ARCHIVES.md → Past Councils](ARCHIVES.md#past-councils-with-member-portraits). The 2023/24 and 2021/22 council pages return **404** (never built). 2020/21 and earlier are name-only rosters in the archive year pages.

### Core Leadership
| Position | Name | Bio |
|----------|------|-----|
| District Interact Representative | Int. PP. Jezon Fernando | "This individual is hardworking, punctual and a perfectionist." |
| District Interact Secretary | Int. PP. Menuli Perera | "A person who has given more than her 100% to the movement." |
| District Interact Treasurer | Int. PP. Haroon Shamil | "This man effortlessly keeping everything under control." |
| Assistant District Interact Representative | Int. PP. Yazid Niyas | "Always moving, always helping, and never backing down." |
| Assistant District Interact Representative | Int. PP. Jenuka De Silva | "Steadfast and dependable, he adds loyalty to every challenge." |

### Editors
| Position | Name | Bio |
|----------|------|-----|
| District Interact Editor | Int. Joshua Fernando | "Quiet in presence yet loud in his impact." |
| District Interact Editor | Int. Lakshin Fernando | "A guy who works hard to the point where his body shuts down." |

### Sergeants At Arms
| Position | Name | Bio |
|----------|------|-----|
| Co-Sergeant At Arms | Int. Yesith Gallage | "He leads with discipline, backed by musical rhythm." |
| Co-Sergeant At Arms | Int. PP. Menoli Yatigammana | "She's sweet but doesn't let anyone break the rules." |

### Assistant Secretaries
| Position | Name | Bio |
|----------|------|-----|
| Co-Assistant District Interact Secretary | Int. Kaveeka Kulatunga | "A silent interactor who returned with fresh energy." |
| Co-Assistant District Interact Secretary | Int. Seniya Rajugamuwa | "Full of quick wit and sharper comebacks." |

### Assistant Treasurers
| Position | Name | Bio |
|----------|------|-----|
| Co-Assistant District Interact Treasurer | Int. Abishek Maheshwaran | "The word clueless in human form. Friendly and cheerful." |
| Co-Assistant District Interact Treasurer | Int. PP. Piyathma De Zoysa | "She's sweet, gentle, and always ready to go the extra mile." |

### Zonal Leadership
| Position | Name | Bio |
|----------|------|-----|
| Zonal Coordinator & Head of Club Revival and Outreach | Int. Chanuth Amarasinghe | "He evolved from playful banter into one of most committed." |
| Zonal Co-ordinator & Representative of the Maldives Region | Int. PP. Shavini Weerasinghe | "While she may seem reserved at first, she's full of wit." |
| Zonal Representative of Colombo | Int. Ethan Vishara | "With a spark of mischief and an unforgettable presence." |
| Zonal Representative of Negombo | Int. PP. Gihansa Rathnamalala | "Always willing to lend a hand, no matter who's asking." |
| Zonal Representative of Hill Country & Tea Country | Int. PP. Vinuki Jayasena | "This individual's work ethic is second to none." |
| Zonal Representative of Kurunegala | Int. Dhinil Rathnathilake | "Towering with his presence both in Interact and courts." |
| Zonal Representative of Down South | Int. Veenu Ovinya | "She has a special talent for giving people mini heart attacks." |
| Zonal Representative of the Northern Peninsula | Int. PP. Guruparan Paheerathan | "A visionary Interactor from Jaffna, driven by ambition." |
| Zonal Representative of Rajarata & East / Chairperson of Interaction – Hill Country | Int. Charith Ekanayake | "A controversial choice who I trust with positions." |
| Zonal Representative of Gem City | Int. Rushty Abdeen | "Always smiling and always helpful, he brings heart." |

### Directors
| Position | Name | Bio |
|----------|------|-----|
| Director of Club Service | Int. PP. Umair Akram | "Flexible, quick to learn, and deeply service-oriented." |
| Director of Community Service | Int. PP. Pabasara Warnajith | "The Tom to Shenal's Jerry—always together." |
| Co-Director of International Understanding | Int. Aneeqa Shafeel | "The youngest, yet arguably the council's favorite." |
| Co-Director of International Understanding | Int. Husni Habeeb | "An Interactor who has ideas beyond borders." |
| Director of Rotary – Rotaract Relations | Int. PP. Luvya Seelanatha | "This Interactor is a true charm—an expert in balancing." |
| Director of Green Life | Int. PP. Shihaad Silmy | "An interactor who would take unconventional paths." |
| Director of Finance | Int. Ginura Kariyawasam | "A dramatist by day, a hustler by night." |
| Director of Public Relations | Int. Chenura Pathirana | "A creative eye and the punching bag of council." |
| Director of the Interact District Media Crew | Int. Mahith Wijesekara | "If there's DJ playing or logistics running, chances are." |

### Chairpersons
| Position | Name | Bio |
|----------|------|-----|
| Chairperson of Interact District Conference | Int. Amitesha Sentitcumaran | "A well-experienced Interactor with unique humor." |
| Chairperson of Interaction – Colombo | Int. Shenal Theshan | "An Interactor who remains actively involved in projects." |
| Chairperson of Interact Leadership Training – Colombo | Int. Thenuwara Rupasinghe | "This individual is set to incorporate GPA system." |
| Chairperson of Interact Leadership Training – Hill Country | Int. Wenuri Amarasinghe | "After fumbles, she became final addition to council." |
| Chairperson of BizConnect | Int. Aaron Gunasekara | "Whether leading initiatives or pumping petrol, always smiling." |
| Chairperson of Cycle of Hope | Int. Zeyna Nuzrath Ahamed | "An Interactor who has been part movement long before." |

---

## 6. Page: College of DIRs

**URL:** `/college-of-dirs`

Intro: *"A Legacy of the Past District Interact Representatives (DIRs). Meet the dedicated individuals who led our Interact District with passion and commitment."*

### Recent DIRs (with portraits)
| RI Year | DIR | School | Theme |
|---------|-----|--------|-------|
| 2025/26 | Jezon Fernando | St. Joseph's College, Colombo 10 | Unite For Good |
| 2024/25 | Damian De Cruz | St. Joseph's College, Colombo 10 | The Magic of Rotary |
| 2023/24 | Aamir Akram | Trinity College, Kandy | Create Hope in the World |
| 2022/23 | Julian Fernandopulle | St. Joseph's College, Colombo 10 | Imagine Rotary |
| 2021/22 | Murthaaz Barry | Wesley College | Prosper Through Service / Serve to Change Lives |
| 2020/21 | Rahul Fernandez | St. Peter's College | Rotary Opens Opportunities |
| 2019/20 | Wiranya Divitotawela | St. Bridget's Convent | Rotary Connects the World |
| 2018/19 | Asel Karannagoda | Ananda College | Be the Inspiration |
| 2017/18 | Mohommed Awoon | Burhani Serendib School | Rotary: Making a Difference |
| 2016/17 | Chathula Fernando | Ananda College | Rotary Serving Humanity |
| 2015/16 | Fabian D K Schokman | St. Peter's College | Be a Gift to the World |
| 2014/15 | Sulaiman Rameez | D S Senanayake College | Light Up Rotary |
| 2013/14 | Sandupama Basnayake | Ananda College | Engage Rotary, Change Lives |
| 2012/13 | Ruvindu Bandara | President's College | Peace Through Service |
| 2011/12 | Dinuka Sumithraarachchi | Ananda College | Reach Within to Embrace Humanity |
| 2010/11 | Harinda Senaratne | Ananda College | Building Communities – Bridging Continents |

### Historical roster (text tables, no portraits)

**Rotary International District 321 (1979–1984)**
| Year | DIR | School | Co-DIR | Co-School | Theme |
|------|-----|--------|--------|-----------|-------|
| 1979 | Ranil De Silva | Royal College | Ranjan David | Trinity College | Reach Out |
| 1979 | Satyajith De S. Senevirathne | Royal College | Marwan Macan Markar | Royal College | Reach Out |
| 1980/81 | Marwan Macan Markar | Royal College | A. Sukurnaran | Royal College | Take Time to Serve |
| 1981/82 | Ravi Rathnapala | Royal College | Fareeda Davooodbhoy | Bishop's College | World Understanding and Peace through Rotary |
| 1982/83 | Dimuthu Samarasinghe | Dharmarajah College | Dhananjaya Chandrasekara | Trinity College | Mankind Is One — Build Bridges of Friendship throughout the World |
| 1983/84 | Sanjeewa Jayawardena | Royal College | Arjuna Gunawardena | Ananda College | Share Rotary, Serve People |

**Rotary International District 322 (1984–1991)**
| Year | DIR | School | Co-DIR | Co-School | Theme |
|------|-----|--------|--------|-----------|-------|
| 1984/85 | Arjuna Gunawardena | Ananda College | Riquaza Zavahir | Bishop's College | Discover a New World of Service |
| 1985/86 | Priya Gunawardena | Nalanda College | Samantha Rajapakse | Ananda College | You Are the Key |
| 1986/87 | Gushara Depachitra | Visakha Vidyalaya | Rukshan Wijerathne | Ananda College | Rotary Brings Hope |
| 1987/88 | Dushani Boteju | Musaeus College | Sohan Perera | St. Joseph's College | Rotarians — United in Service — Dedicated to Peace |
| 1988/89/90 | Shehan Gunawardena | Ananda College | Harsha Wanigatunge | D S Senanayake College | Put Life into Rotary — Your Life / Enjoy Rotary |
| 1990/91 | Viraj Premasinghe | Nalanda College | Indrajith Lankeshwara | D S Senanayake College | Honor Rotary with Faith and Enthusiasm |

**Rotary International District 3220 (1991 onwards)**
| Year | DIR | School | Co-DIR | Co-School | Theme |
|------|-----|--------|--------|-----------|-------|
| 1991/92 | Sanjeewa Wickramasinghe | Ananda College | Ishi Wickramage | Bishop's College | Look Beyond Yourself |
| 1992/93 | Kumudu Warnakulasooriya | S. Thomas' College | Duminda De Silva | Ananda College | Real Happiness Is Helping Others |
| 1993/94 | Duminda De Silva | Ananda College | Jithari Abeysekara | Visakha Vidyalaya | Believe in What You Do — Do What You Believe in |
| 1994/95 | Shawn Shiek | S. Thomas' College | Fayaz Hudah | Carey College | Be a Friend |
| 1995/96 | Fayaz Hudah | Carey College | Kaveenga Wijesekara | Ananda College | Act with Integrity, Serve with Love, Work for Peace |
| 1996/97 | Iflikar Mohammed | Thurstan College | Chadwick Kandappa | Carey College | Build the Future with Action and Vision |
| 1997/98 | Chamath Atulathmudali | Ananda College | Neelakshi Dissanayake | Anula College | Show Rotary Cares |
| 1998/99 | Nishantha De Silva | Ananda College | Layangi Perera | Visakha Vidyalaya | Follow Your Rotary Dream |
| 1999/2000 | Saif Ramzi | Wesley College | Ian Van Hoff | St. Peter's College | Rotary 2000: Act with Consistency, Credibility, Continuity |
| 2000/01 | Birendra Katugampola | Ananda College | Anushi Senarathne | Visakha Vidyalaya | Create Awareness — Take Action |
| 2001/02 | Sanjika Perera | Nalanda College | Deshani Ratnayake | College of World Education | Mankind Is Our Business |
| 2002/03 | Eranda De Silva | Nalanda College | Kamilka Malwatta | Visakha Vidyalaya | Sow the Seeds of Love |
| 2003/04 | Dilhan Jayatilleke | Asoka College | Shahike De Silva | Ananda College | Lend a Hand |
| 2004/05 | Shahike De Silva | Ananda College | Udara Withana | Nalanda College | Celebrate Rotary |
| 2005/06 | Shammi Weerasinghe | Ananda College | — | — | Service Above Self |
| 2006/07 | Thesula Rambadagalla | Visakha Vidyalaya | — | — | Lead the Way |
| 2007/08 | Zarah Carder | Asian International School | Kareem Noordeen | D S Senanayake College | Rotary Shares |
| 2008/09 | Mevan Banagala | — | Ashan Godigamuwa | Ananda College | Make Dreams Real |
| 2009/10 | Mafaz Mohideen | D S Senanayake College | Anjana Jayakody | Ananda College | The Future of Rotary Is in Your Hands |
| 2010/11 | Harinda Senaratne | Ananda College | Athraja De Silva | St. Bridget's Convent | Building Communities – Bridging Continents |
| 2011/12 | Dinuka Sumithraarachchi | Ananda College | Ruchira Wickramasinghe | Stafford International School | Reach Within to Embrace Humanity |
| 2012/13 | Ruvindu Bandara | President's College | Tharindu Basnayake | Ananda College | Peace Through Service |
| 2013/14 | Sandupama Basnayake | Ananda College | Nipun Ambanpola | Royal College | Engage Rotary, Change Lives |
| 2014/15 | Sulaiman Rameez | D S Senanayake College | Danushka Kadawathaarachchi | Bishop's College | Light Up Rotary |
| 2015/16 | Fabian D K Schokman | St. Peter's College | Nilushi Dewapura | Visakha Vidyalaya | Be a Gift to the World |
| 2016/17 | Chathula Fernando | Ananda College | Sioban Manupillei | St. Bridget's Convent | Rotary Serving Humanity |
| 2017/18 | Mohammed Awoon | Burhani Serendib School | Amaya Fernando | Visakha Vidyalaya | Rotary: Making a Difference |
| 2018/19 | Asel Karannagoda | Ananda College | Sashini De Silva | Bishop's College | Be the Inspiration |
| 2019/20 | Wiranya Divitotawela | St. Bridget's Convent | Shalem Sumanthiran | Royal College | Rotary Connects the World |
| 2020/21 | Rahul Fernandez | St. Peter's College | Heshalee Pathirana | Bishop's College | Rotary Opens Opportunities |
| 2021/22 | Murthaaz Barry | Wesley College | Sheneli Fernando | St. Bridget's Convent | Serve to Change Lives |
| 2022/23 | Julian Fernandopulle | St. Joseph's College | Onellie Jayawardena | St. Bridget's Convent | Imagine Rotary |
| 2023/24 | Aamir Akram | Trinity College, Kandy | Uleena Udabage | Sujatha Vidyalaya | Create Hope in the World |
| 2024/25 | Damian De Cruz | St. Joseph's College | Ashalee Pathirana | Bishop's College | The Magic of Rotary |
| 2025/26 | Jezon Fernando | St. Joseph's College | Menuli Perera | Wycherley International School, Gampaha | Unite For Good |

> **Note:** Some source rows had transcription oddities (e.g. 2013/14 "Royal College" listed in the theme column). Themes for recent years cross-checked against the official Rotary International annual themes where the source was ambiguous. **Verify against the live tables before publishing.**

---

## 7. Page: Calendar

**URL:** `/district-calendar`

- Heading: **District Calendar**
- Primary CTA: **Request a date** → `/request-a-date`
- The live page embeds a calendar widget; no static text events were exposed in the HTML. The new build should provide an events/calendar component (month view + list view) and keep the "Request a date" booking form.

---

## 8. Page: Admin Documents

**URL:** `/admin-documents`

- Heading: **District Directory 2025/26**
- The page is built around a single embedded/linked document (the District Directory), plus the site-wide **First Quarterly Newsletter.pdf** footer link.
- The actual document download URLs are **not present in the page HTML** — they are rendered by a Wix document widget / button (likely a Google Drive or Wix media link injected by JavaScript). These must be captured manually from the live page (right-click the download button → copy link) before migration.
- Treat this as a **"Documents library"** page in the rebuild: per item → title, description, file type, download link.

---

## 9. Page: News / Blog

**URL:** `/blog` · Posts live at `/post/<slug>`

Blog index = card per post (thumbnail, title, author, date, read-time, link).

| Post | Author | Date | Read | URL |
|------|--------|------|------|-----|
| Tribute to Late PDIR Shawn Shiek (Remembering Shawn Shiek: A Tribute to a Visionary and Beloved Leader in Interact and Rotary) | District PR Director | Jul 11, 2025 | 3 min | `/post/remembering-shawn-shiek-a-tribute-to-a-visionary-and-beloved-leader-in-interact-and-rotary` |
| 35th Interact District Assembly 2025 | District PR Director | Jul 7, 2025 | 1 min | `/post/35th-interact-district-assembly-2025` |

- Thumbnails: `blog-shawn-shiek-tribute.jpg`, `blog-35th-district-assembly.jpg`
- "All Posts" link → `/blog`

#### Post 1 — Tribute to Late PDIR Shawn Shiek
*By District PR Director · Published Jul 11, 2025 (updated Jul 22, 2025) · 3 min read · image alt: "Shawn Shiek's legacy celebrated at a vibrant youth gathering."*

> With heavy hearts, we come together to remember Shawn Shiek, a transformative leader and cherished member of the Interact and Rotary communities. His passing leaves a significant void, but the influence he had on those around him will undoubtedly continue to inspire countless individuals.
>
> Shawn's journey began in the 1992/93 Rotary year when he took on the role of Zonal Representative. Early on, he displayed outstanding leadership skills that laid the foundation for future generations. His enthusiasm for service and youth empowerment became clear as he stepped into the position of Project Chairperson in 1993/94. One of his most notable achievements during this time was the launch of Interaction, now recognized as Sri Lanka's largest Interact sports celebration, where over 1,000 young participants come together annually to showcase their skills and camaraderie.
>
> As District Interact Representative in 1994/95, Shawn enacted a pivotal initiative that sought to foster cultural exchange between Sri Lanka and India. His efforts led to the successful coordination of a youth exchange program that welcomed more than 2,000 participants. This groundbreaking initiative enhanced the visibility of the Interact movement and garnered extensive media coverage, highlighting the important role Rotary's youth programs play in community building.
>
> Shawn's commitment to the Interact movement did not wane after his tenure as a representative. His role as DICC in 2009/10 showcased his deep commitment to mentorship and leadership development. As a member of the Rotary Club of Colombo Regency and a chartering member of Sri Lanka's first Rotary E-Club of Colombo Infinity, he remained a steadfast advocate for youth engagement, encouraging young leaders to pursue their passions and make a difference.
>
> Shawn's accomplishments extended beyond Rotary. An MBA graduate and dedicated Thomian, Shawn made significant contributions to the telecommunications sector. Most recently, he served as COO at Frella International. His visionary approach and genuine warmth were evident in everything he undertook, making him a respected figure in his field. Shawn's ability to forge meaningful connections with people exemplified his character, blending professionalism with empathy.
>
> Shawn's journey is a powerful reminder of the profound impact one individual can have on the lives of many. The programs and initiatives he initiated sparked a spirit of service among young people, motivating them to become active contributors to their communities. His legacy of service lives on, inspiring future leaders within the Interact and Rotary movements.
>
> While we mourn today due to his untimely passing from cardiac arrest, we must also remember the guiding principles that Shawn embodied. His passion for mentorship and unifying individuals transformed the Rotary family and enriched countless lives. Reflecting on his legacy allows us to celebrate key values: leadership, compassion, and selfless service.
>
> As we say our final goodbyes to Shawn, we can carry forward his spirit. His unwavering dedication to building connections and inspiring youth serves as a model for our future efforts. We honor his memory by remaining committed to service projects, embracing diversity, and promoting intercultural exchanges, just as he did.
>
> The Interact and Rotary communities have lost a dedicated leader, but Shawn's spirit will undoubtedly remain in the hearts of those who were lucky enough to know him. His teachings and values will continue to inspire and guide us as we carry on his legacy of service and commitment.
>
> As we look ahead, let us uplift each other in Shawn's honor. The world can feel overwhelming at times, but through collective action and community spirit, we can create meaningful change. Shawn's life exemplifies the power of working together, reminding us that even in sorrow, we can find strength in serving others.
>
> Rest in peace, Shawn Shiek🤍

#### Post 2 — 35th Interact District Assembly 2025
*By District PR Director · Jul 7, 2025 · 1 min read*

> On the 29th of June, the 35th Interact District Assembly of District 3220 (Sri Lanka & Maldives) was held at Wave & Lake under the theme "Sri Lankan Heritage: Wisdom in Culture." The event marked a significant milestone, bringing together Interactors from across the island to reflect on the achievements of the past year and welcome a new era of leadership and service.
>
> The highlight of the event was the official collaring of the Incoming District Interact Representative, Int. PP. Jezon Fernando, by the Outgoing District Interact Representative, PHF. Int. PP. Damian De Cruz. This symbolic moment represented the transition of responsibility, leadership, and trust. PHF. Int. PP. Damian, having served the movement with dedication, passed on the mantle to Int. PP. Jezon, who now takes on the role of guiding Interact 3220 for the upcoming year.
>
> Following the collaring, Int. PP. Jezon addressed the audience with a message of gratitude, unity, and vision. He emphasized the importance of collaboration and consistency in service, before officially introducing the newly appointed District Council, a team of committed Interactors ready to take the movement forward.
>
> The ceremony concluded on a high note, marking both the end of one successful chapter and the beginning of another.

---

## 10. Page: Newsletter

**URL:** `/newsletter`

- **Newsletter name:** *"This Quarter in Interact"* (logo: `newsletter-tqi-logo.png`)
- **Description:** *"The Interact District Council is proud to introduce the launch of its official quarterly newsletter, 'This Quarter in Interact', a new initiative dedicated to strengthening communication, increasing awareness and celebrating the collective efforts of Interactors across the district."*
- **Covers:** District initiative highlights; upcoming projects, campaigns & service opportunities; Leadership Spotlights.
- **Editions / downloads:**
  - 3rd Quarterly Edition → Google Drive: https://drive.google.com/file/d/1fSRaoSrC0al0QJdr0Zle-y8nPjaP4MKk/view?usp=drivesdk
  - First Quarterly Newsletter.pdf (referenced site-wide in footer)

> The new site should present newsletter editions as a list/grid with cover thumbnail + edition label + download/view link.

---

## 11. Page: Archives

**URL:** `/archives`

Intro: *"The District Archives of Interact District 3220 serve as a repository for preserving the rich history, achievements, and milestones of Interact clubs across Sri Lanka and the Maldives."* Maintained to document *"key events, leadership transitions, impactful projects, and the evolution of the district over the years."*

The Archives index is a grid of cards (council group photo + theme + "view" button) linking to a per-year sub-page. **Every archive sub-page has now been crawled — full year-by-year council rosters, projects, and events are documented in [ARCHIVES.md](ARCHIVES.md).**

### Archive entries (cards on the index)
| RI Year | Theme | Sub-page link | Status |
|---------|-------|---------------|--------|
| 2024-25 | Magic of Rotary | `/ri-year-2024-25` | ✅ live |
| 2023-24 | Create Hope in the World | `/ri-year-2023-24` | ❌ **404 — broken link, no page exists** |
| 2022-23 | Imagine Rotary | `/ri-year-2022-23` | ✅ live |
| 2021-22 | Prosper Through Service | `/ri-year-2021-22` | ❌ **404 — broken link, no page exists** |
| 2020-21 | Rotary Opens Opportunities | `/copy-of-ri-year-2022-23` | ✅ live |
| 1988/89–1989/90 | — | `/about-5` | ✅ live |
| 1990/91 | — | `/copy-of-ri-year-1988-89-90` | ✅ live |
| 1992/93 | — | `/copy-of-ri-year-1990-91` | ✅ live |
| 1993/94 | — | `/copy-of-ri-year-1992-93` | ✅ live |
| 1994/95 | — | `/copy-of-ri-year-1993-94` | ✅ live |
| 1995/96 | — | `/copy-of-ri-year-1994-95` | ✅ live |
| 1996/97 | — | `/copy-of-ri-year-1995-96` | ✅ live |
| 1997/98 | — | `/copy-of-ri-year-1996-97` | ✅ live |
| 1998/99 | — | `/copy-of-ri-year-1997-98` | ✅ live |
| 1999/2000 | Core Of Our Life: Our Heritage | `/copy-of-ri-year-1998-99` | ✅ live |
| 2000/01 | — | `/copy-of-ri-year-1999-2000` | ✅ live |

**Observations for rebuild:**
- Slugs are messy Wix "copy-of-…" URLs → replace with clean `/archives/<year>` routes.
- **Two index cards (2023-24, 2021-22) link to 404s** — content must be created or the cards removed.
- **1991/92 is missing entirely** (no card, no page) between 1990/91 and 1992/93.
- Pre-2001 pages follow a **council roster + project summary** shape; 2020–2025 pages are **event journals**. The new archive template should handle both.
- Per-year RI theme/header logos are captured in `images/archive-logos/`. The Archives index council *group* photos (`Council 24-25.jpg` … `Council 20-21.jpg`) still need their Wix IDs captured — see [Gaps](#17-gaps--to-verify).

---

## 12. Page: Media Crew

**URL:** `/media-crew`

### About
*"The District Media Crew is an initiative frontier by the Interact District 3220 to provide equal media amenities and resources to all clubs upon request, for free or a low cost, par to leading media outlets."* Managed by the District Director of the Media Crew; staffed by volunteers from participating clubs.

- Header image: `media-crew-header.jpg` · White logo: `media-crew-white-logo.png`

### Services offered (card per service, with image)
| Service | Image |
|---------|-------|
| Photography | `media-photography.jpg` |
| Videography | `media-videography.jpg` |
| Live Streaming | `media-livestreaming.jpg` |
| Designing | `media-designing.jpg` |
| Compering | `media-compering.jpg` |
| Photo Booths | `media-photo-booths.jpg` |

### Service Request Form (fields)
Interactor's Name · Interact Club · Designation · Phone · Email · Event/Project Name · Event Location · Date and Time · Required Services (checkboxes: Photography, Videography & Aftermovie, Compering, Graphic Designing, Livestream, Photobooth) · Other Comments

---

## 13. Page: Contact

**URL:** `/contact-8`

- Heading: **Contact Us** · Subheading: **Email Us!**
- **Phone:** +94 77 458 2006 *(old site only. Not published on the rebuild, 2026-10-06)*
- **Email:** interactdistrictcouncil3220@gmail.com
- **Contact form fields:** First Name* · Email* · Phone* · Country selector (defaults to Sri Lanka) · Interact Club/Company Name · Inquiry* · Submit

---

## 14. Page: Request a Date

**URL:** `/request-a-date` (linked from Calendar)

Booking form to reserve a date on the district calendar. Fields:
Interactor's Name* · Designation* · Interact Club* · Phone* · Country selector · Email* · Event/Project Name* · Event Location* · Date picker* · Time* (HH:MM, AM/PM) · Other Information · Submit

---

## 15. DIMUN '25 — Event Section

A dedicated multi-page section for the **District Interact Model United Nations 2025** — the district's inaugural Interact MUN conference. Not linked from the main nav (standalone event microsite within the same Wix site).

### 15.1 DIMUN landing — `/dimun25`
- **Hero heading:** "DISTRICT INTERACT MODEL UNITED NATIONS 2025"
- **Intro:** *"It is with great pride that we announce the Inaugural Session of District Interact Model United Nations 2025. This historic first edition will set a benchmark for Interact MUN conferences in Sri Lanka."* + *"Youth movements in Sri Lanka often operate in isolation, with limited collaboration between different groups."*
- **CTAs:** "READ MORE" → `/about-dimun25` · "COMMITTEES, TOPICS & STUDY GUIDES" → `/committees`
- **Executive Committee** (photo cards):
  | Name | Role |
  |------|------|
  | Int. Seniya Rajugamuwa | Project Chairperson (Asst. District Interact Secretary 2025/26) |
  | Int. Aneeqa Shafeel | Project Co-Secretary |
  | Int. Kaveeka Kulatunga | Project Treasurer (Asst. District Interact Secretary 2025/26) |
  | Int. PP. Piyathma De Zoysa | Project Treasurer (Asst. District Interact Treasurer 2025/26) |
- **Images:** `dimun-logo-main.png`, `dimun-logo-alt.png`, `dimun-background-pattern.png`, + 4 exec portraits (`images/dimun/`).

### 15.2 About DIMUN — `/about-dimun25`
- **Heading:** "PURPOSE OF DIMUN 2025"
- **Body:** Inaugural-session announcement (as above), explaining that youth movements in Sri Lanka often work separately, and DIMUN aims to **unite the Interact and MUN communities** — Interactors engage with local/global issues via debate, while MUN participants learn about service-driven change.
- Images: purpose icon (`dimun-background-pattern.png`), `dimun-logo-alt.png`.

### 15.3 Committees, Topics & Study Guides — `/committees`
Six UN committee simulations, each with a logo, topic, and a Google Drive study-guide link:
| Committee | Topic | Study guide |
|-----------|-------|-------------|
| ECOSOC | Technology, Innovation, and the Risks of Widening Global Inequality | [Drive](https://drive.google.com/drive/folders/1jjf_sUtYHEg6Mo6wjjPeIErll3saWo9h?usp=drive_link) |
| WHO | Addressing Global Inequalities in Health Care Systems | [Drive](https://drive.google.com/drive/folders/119kJP7IBzsO-_Iuc5FFLxkC0OWf6vEOW?usp=drive_link) |
| UN Women (UNW) | Reconciling Cultural Traditions with Universal Standards on Women's Rights | [Drive](https://drive.google.com/drive/folders/1B2KwihDNnmu53vzPDM-Rw-w3t2hq3oa8?usp=drive_link) |
| UNSC | Addressing the current situation in the Middle East | [Drive](https://drive.google.com/drive/folders/1-N0CHdzAualaxibkODoKAGs_-Gnr_fKD?usp=drive_link) |
| UNFCCC | Reconciling Energy Security with International Climate Commitments | [Drive](https://drive.google.com/drive/folders/1u2xiIpyrFzdIDOiobm89y70pSzDJ90zo?usp=drive_link) |
| UNHRC | Freedom of Expression and Information in the Digital Age | [Drive](https://drive.google.com/drive/folders/1qqadA2K4VF9MIrjEpOobpB9IMEHbFlb7?usp=drive_link) |
- Images: 6 committee logos (`dimun-committee-*.png`).

### 15.4 Registrations — `/dimun25-registrations`
- **Heading:** "CLOSING CEREMONY REGISTRATIONS OPEN!"
- **Deadline:** Till 21 November 2025 · **Cost:** FREE OF CHARGE
- **Form:** Google Form → https://forms.gle/XMXRJD6FM1o8nf2f8
- Image: `dimun-logo-registrations.png`.

### 15.5 DIMUN Contact — `/conference`
> The slug `/conference` is **not** a District Conference page — it is the DIMUN **"Contact Us"** page.
- Heading: "CONTACT US" · Subheading: "Submit Your Queries to Us!"
- **Form fields:** First name* · Last name* · Interact / MUN Club* · Position* · Email* · Phone* · Concern* · Submit

> **Rebuild note:** DIMUN '25 was a one-off 2025 event. Decide whether to (a) keep it as an archived event page, (b) generalise into a reusable "Events/Conferences" template for future DIMUN editions, or (c) drop it. The `/conference` contact form duplicates the main Contact form with an added "Interact / MUN Club" field.

---

## 16. Utility & Empty Pages

Pages that exist in the sitemap but hold no real content (keep in mind for the rebuild — most can be dropped or rebuilt as proper dynamic features):

| URL | What it is | State |
|-----|-----------|-------|
| `/event-list` | Wix Events app listing page | **Empty** — "No events at the moment". Rebuild as a real events feed (ties into Calendar). |
| `/news-letter` | Legacy newsletter landing ("Third Quarter Newsletter") | Near-duplicate of `/newsletter` (§10) on a different slug. Consolidate into one Newsletter page; redirect the old slug. |
| `/pricing-plans/list` | Wix Pricing Plans app | **Empty** — "No plans available." Likely unused; drop unless paid memberships/tickets are planned. |

---

## 17. Forms Summary

The new site needs working back-ends (email/Sheet/CRM) for the following forms:

1. **Contact** (`/contact-8`) — general enquiries.
2. **Request a Date** (`/request-a-date`) — calendar booking.
3. **Media Crew Service Request** (`/media-crew`) — media support requests.
4. **DIMUN Contact** (`/conference`) — DIMUN enquiries.
5. **External Google Forms** in use: EmpoweHER registration (https://forms.gle/V7iwqdaCWE5WRUJ58), Interarchive order (https://forms.gle/DKgQHfoxcm93LyJz5), DIMUN Closing Ceremony registration (https://forms.gle/XMXRJD6FM1o8nf2f8).

---

## 18. Image Inventory

All originals are catalogued in **`images-manifest.js`** with friendly filenames, categories, source page, and alt text. Run the downloaders (see [HANDOFF.md](HANDOFF.md)) to pull them into `./images/`.

**Originals come from the Wix CDN** in the form `https://static.wixstatic.com/media/<id>` (strip the `/v1/fill/...` transform suffix to get full resolution).

Categories & counts:
| Category | What it holds |
|----------|---------------|
| `branding` | Header/footer logos, Rotary logo, Media Crew logos, newsletter logos |
| `avenues` | The five Avenue icons (Home) |
| `decor` | Home decorative images |
| `council` | 38 Council 2025/26 member portraits |
| `council-2024-25` | 12 past-council (Damian De Cruz) portraits |
| `council-2022-23` | 31 past-council (Julian Fernandopulle) portraits |
| `dirs` | 16 College of DIRs portraits (2010/11–2025/26) |
| `media-crew` | 6 service category images |
| `blog` | 2 blog post thumbnails |
| `archive-logos` | 12 archive year header / RI-theme logos |
| `dimun` | 14 DIMUN '25 images (3 logos, bg pattern, 4 exec portraits, 6 committee logos) |
| `social-icons` | 6 social media icons |

**Download status:** 150 of 151 catalogued images downloaded successfully. One is unrecoverable (see Gaps #5).

> The Archives *index* council group photos and full-resolution event photos are **not** in the manifest yet (IDs not captured) — see Gaps.

---

## 19. Gaps / To Verify

Second-pass crawl complete. Remaining items need a manual check (JS-rendered or off-site assets) before the rebuild content is final:

1. ✅ **Archives sub-pages** — DONE. All 14 live year-pages crawled into [ARCHIVES.md](ARCHIVES.md). (Found: 2 broken index cards → 404, and a missing 1991/92.)
2. ✅ **Blog post bodies** — DONE. Both full posts captured in §9.
3. **Admin Documents** — the District Directory 2025/26 file URL and any other documents are JS-rendered; capture download links manually from the live page.
4. **Calendar** — the actual events/dates live inside an embedded calendar widget (not in static HTML); export or transcribe manually.
5. **Blocked image** — `dir-2016-17-chathula-fernando.jpg` (Wix id `9a1ed2_5cbbecbc2ffc4b499c770dd660d643e1~mv2.jpg`) returns **HTTP 403** on every path; the asset is removed/restricted on the CDN. Needs a fresh copy from the council.
6. **Archives index council group photos** — `Council 24-25.jpg` … `Council 20-21.jpg` (the index card images) — Wix IDs still need capturing.
7. **1999/2000 council** — the live page repeats the 1998/99 roster (likely a copy-paste error); verify the real 1999/2000 names.
8. **College of DIRs themes** — a few source rows were ambiguous/garbled; cross-check against live tables.
9. **PDF assets** — "First Quarterly Newsletter.pdf" + the 3rd Quarterly Edition (Google Drive link in §10) and the directory PDF need their real download URLs archived.
10. **Event photos / albums** — high-res event galleries live on Facebook (links in §3); decide whether to mirror them on the new site.

---

## 20. Full Site Path Audit

Cross-checked against the site's own **sitemap.xml** (→ `pages-sitemap.xml`, `blog-posts-sitemap.xml`, `pricing-plans-sitemap.xml`) on 2026-06-16. Every published URL is accounted for below — **38 sitemap URLs + 4 nav/linked routes that 404**.

### Pages (from `pages-sitemap.xml`) — 35
| # | URL | Documented in | Status |
|---|-----|---------------|--------|
| 1 | `/` | §3 Home | ✅ |
| 2 | `/about` | §4 | ✅ |
| 3 | `/meet-the-council-2025-26` | §5 | ✅ |
| 4 | `/meet-the-council-2024-25` | ARCHIVES → Past Councils | ✅ |
| 5 | `/meet-the-council-2022-23` | ARCHIVES → Past Councils | ✅ |
| 6 | `/college-of-dirs` | §6 | ✅ |
| 7 | `/district-calendar` | §7 | ✅ (widget events = gap #4) |
| 8 | `/admin-documents` | §8 | ✅ (doc URLs = gap #3) |
| 9 | `/blog` | §9 | ✅ |
| 10 | `/newsletter` | §10 | ✅ |
| 11 | `/news-letter` | §16 | ✅ legacy duplicate |
| 12 | `/archives` | §11 | ✅ |
| 13 | `/about-5` (1988/89–89/90) | ARCHIVES | ✅ |
| 14 | `/copy-of-ri-year-1988-89-90` (1990/91) | ARCHIVES | ✅ |
| 15 | `/copy-of-ri-year-1990-91` (1992/93) | ARCHIVES | ✅ |
| 16 | `/copy-of-ri-year-1992-93` (1993/94) | ARCHIVES | ✅ |
| 17 | `/copy-of-ri-year-1993-94` (1994/95) | ARCHIVES | ✅ |
| 18 | `/copy-of-ri-year-1994-95` (1995/96) | ARCHIVES | ✅ |
| 19 | `/copy-of-ri-year-1995-96` (1996/97) | ARCHIVES | ✅ |
| 20 | `/copy-of-ri-year-1996-97` (1997/98) | ARCHIVES | ✅ |
| 21 | `/copy-of-ri-year-1997-98` (1998/99) | ARCHIVES | ✅ |
| 22 | `/copy-of-ri-year-1998-99` (1999/2000) | ARCHIVES | ✅ |
| 23 | `/copy-of-ri-year-1999-2000` (2000/01) | ARCHIVES | ✅ |
| 24 | `/ri-year-2024-25` | ARCHIVES | ✅ |
| 25 | `/ri-year-2022-23` | ARCHIVES | ✅ |
| 26 | `/copy-of-ri-year-2022-23` (2020/21) | ARCHIVES | ✅ |
| 27 | `/media-crew` | §12 | ✅ |
| 28 | `/contact-8` | §13 | ✅ |
| 29 | `/request-a-date` | §14 | ✅ |
| 30 | `/dimun25` | §15.1 | ✅ |
| 31 | `/about-dimun25` | §15.2 | ✅ |
| 32 | `/committees` | §15.3 | ✅ |
| 33 | `/dimun25-registrations` | §15.4 | ✅ |
| 34 | `/conference` (DIMUN contact) | §15.5 | ✅ |
| 35 | `/event-list` | §16 | ✅ empty |

### Blog posts (from `blog-posts-sitemap.xml`) — 2
| URL | Documented | Status |
|-----|-----------|--------|
| `/post/remembering-shawn-shiek-a-tribute-to-a-visionary-and-beloved-leader-in-interact-and-rotary` | §9 (full body) | ✅ |
| `/post/35th-interact-district-assembly-2025` | §9 (full body) | ✅ |

### Pricing plans (from `pricing-plans-sitemap.xml`) — 1
| URL | Documented | Status |
|-----|-----------|--------|
| `/pricing-plans/list` | §16 | ✅ empty |

### Linked-but-404 routes (in nav/cards, NOT in sitemap)
| URL | Where it's linked | Status |
|-----|-------------------|--------|
| `/ri-year-2023-24` | Archives index card (2023-24) | ❌ 404 — broken link |
| `/ri-year-2021-22` | Archives index card (2021-22) | ❌ 404 — broken link |
| `/meet-the-council-2023-24` | implied past-council | ❌ 404 — never built |
| `/meet-the-council-2021-22` | implied past-council | ❌ 404 — never built |

**Result: 100% of published paths read, documented, and (where they had images) downloaded with references.** The only outstanding items are the JS-rendered / off-site assets and the one CDN-blocked image listed in [§19 Gaps](#19-gaps--to-verify).
