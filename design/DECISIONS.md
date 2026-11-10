# Design Decisions — Interact District 3220 rebuild

> **LOCKED 2026-09-14. Re-confirmed by the user 2026-10-05: "make sure we don't
> deviate from the theme we have built the current home page on."**
>
> The home page as built on `main` **is** the design system. Every new page
> extends it; nothing here is reopened by a new page, a new section or a new
> session. Changing anything in §1–§8 needs the user's explicit approval, and
> the approval gets recorded here as a dated revision.
>
> When this file and the code disagree, the code on `main` is what was approved:
> stop and ask, do not "fix" either one silently.
>
> - Ground truth, visual: [`reference/`](reference/), screenshots of the live home page at
>   1440×900, taken 2026-10-05. Compare new work against them side by side.
> - Ground truth, values: `app/globals.css`. Every hex below is copied from it.
> - History: the earlier navy + cyan / Outfit / dark-mode / silk-video direction
>   is archived in [`archive/DECISIONS-2026-07-to-08.md`](archive/DECISIONS-2026-07-to-08.md).
>   **Nothing in it is current.** Do not build from it.

---

## 1. The direction in one paragraph

Printed paper, not a dashboard. Warm chalk background, near-black ink text,
Fraunces serif headings, and **one** blue accent (Signal). Dark blue (navy-900)
is the deep colour: it carries the full-bleed photography band and the closing
panel. The officers band alone is warm near-black, because it marks the
members' half of the site. Colour is rationed so that layout, type and
photography do the work. Light theme only.

## 2. Colour

### Surfaces: what each band of a page is painted with

| Surface | Value | Used for | Text on it |
|---|---|---|---|
| **Chalk** (`bg`) | `#F7F5F0` | The page. Default for every section. | `content` `#17150F` (16.63) |
| **Paper** (`surface`) | `#FFFDFA` | Raised cards on chalk | `content` |
| **Sunk** (`sunk`) | `#EFECE4` | Recessed bands | `content` |
| **Navy band** (`navy-900`) | `#0A1628` | Full-bleed photography sections; the rounded closing CTA panel; image fallback behind photo tiles | `white`, muted `white/70–75` |
| **Ink band** (`ink-panel`) | `#14120D` | **Only** the members/officers utility band | `on-ink` `#F2EFE8` (15.9), muted `on-ink-muted` `#A09A8D` (6.21) |
| **Photograph** | — | Hero, project tiles; avenue collages (no text on them, so no scrim) | White over a `chalk-950` gradient scrim |

Rules:
- **Chalk is the default.** A page is mostly chalk; dark bands are punctuation.
  On the home page the order is chalk → navy (photographs) → ink (officers) →
  chalk holding the navy closing panel. The navy-to-ink handoff is deliberate:
  it marks the move from the public half to the members' half.
- **Navy-900 is the only blue surface.** Not a gradient, not signal. The rest
  of the navy ramp is structural only: `navy-800` at 30% for `DrawLine`
  hairlines and as the `draft-grid` rule colour, `navy-800` as an image
  placeholder inside a navy band.
- **Ink band is reserved.** It means "you're in the members' working tools".
  Don't use it as a general dark section; use navy-900 for that.

### Accent: Signal blue, one hue in four roles

| Role | Token | Value | Use |
|---|---|---|---|
| Mark | `accent` | `#2E7DF6` (signal-500) | Nav active underline, morph cursor, small graphic marks. **Never a button fill with white text (3.90, fails).** Not for small text over photography: it measured 3.5–4.1:1 on the project tiles, so meta labels on photo scrims use `signal-400` (revised 2026-10-06). |
| Fill | `accent-fill` | `#155FD9` (signal-600) | Primary button background; officers tile hover fill. White label 5.78. |
| Text | `accent-text` | `#124AAD` (signal-700) | Links and inline accents on chalk (7.30). Also the focus ring. |
| Soft | `accent-soft` | `#EFF5FF` (signal-50) | Tinted backgrounds, sparingly |
| On photo | `signal-400` | `#5B90F8` | Meta labels on photo scrims (project tiles). It also marked the highlighted phrase in the hero headline until the hero became artwork with no visible headline (2026-10-14). |

There is **no second accent colour.** No cyan, no orange, no gradients between
hues. The official Interact cyan `#01B4E6` exists only inside the supplied logo
artwork in the header and footer.

**Revision 2026-10-06 (requested by the user): official marks.**
- The header and footer logo is now the district lock-up (Interact,
  District 3220, the Rotary wheel), cropped from the supplied primary logo
  before its theme divider: `public/images/branding/interact-district-3220-logo.png`.
  It replaces the generic Interact logo and the separate "District 3220" text
  beside it. Over the hero photograph the header uses its white reverse
  (`interact-district-3220-logo-white.png`, same shadow as the nav text) and
  cross-fades to the cyan original with the bar; cyan with a dark halo read
  muddy on the photographs.
- The footer carries Rotary's 2026–27 theme mark, "Create Lasting Impact",
  keyed out of RI's social graphic (`create-lasting-impact.png`). Its royal
  blue `#006BB7` is part of the mark, like the Interact cyan: it never
  becomes a UI colour.

### Avenue identity colours

Sampled from the logo artwork. They appear **only** on their own avenue (the
accordion's label band and its tint), never as palette colours elsewhere:
Community `#D8951C` · International `#97114B` · Club `#A85619` ·
Green Life `#187777` · Finance `#1B244A`.

**Revision 2026-10-13 (requested and approved by the user): avenue photo
collages.** From md up, each accordion panel is a 2×2 collage of four of the
avenue's own photographs above its solid colour band. The seams between
photos are the band colour. The logo moves from the tinted plate to a 44px
white badge on the band's top edge, and the number moves into the band (white
at 90%, as the blurb). Below md the list keeps the logo on its tint, and
opening a row reveals the collage under the description. Media Crew credit
bars are cropped off the photographs. No new effect: the collage is laid out
at the open panel's width and anchored left, so the existing `flex-grow` open
uncovers the right column. The collage box is fixed in every state and the
band slides up over it: a box that resized re-cropped the photos every frame
and shook. Photo files: `public/images/avenues/<avenue>/`.

### Contrast values that look wrong and are right. Do not "tidy" them.
- Button fill is signal-**600**, not 500 (white on 500 = 3.90, fails AA).
- Micro-labels use chalk-**700** `#6E695E` (5.02); chalk-600 is 2.92 and fails.
- Control borders are chalk-500 `#D6D1C4` (3.02, clears 3:1).
- Community Service band: the solid band behind the white name and blurb is
  `#906413` (white name 5.23, blurb at 90% white 4.58), darker than the logo's
  `#D8951C`, which the tint and the phone edge keep (`solid` in lib/home.ts).
  **Revision 2026-10-06 (approved by the user):** this was white on
  `#D8951C` (≈ 2.6, failing AA) by an earlier request; the user asked for
  contrast to pass everywhere and chose the documented fix. The fix this file
  used to name, `#A86F12`, measures 4.24 with white and still fails, so the
  band uses the lightest step of the same hue that passes.
- Photo scrims are `chalk-950` gradients set to the minimum that keeps every
  piece of hero copy and the see-through nav at AA on every slide, measured on
  the worst 10% of pixels behind the text, text-shadow ignored (2026-10-06).
  Swapping a hero photo means re-measuring.
  **Revision 2026-10-14:** the hero is one piece of district artwork with
  only the two buttons on it, so its bottom scrim is much lighter (50% → 36%
  at 150px → 0 at 280px); measured at 1024×768, 1440×900 and 1920×1080
  (HANDOFF). The project-tile scrim went to `chalk-950/95 → /60 at 45%` when
  the tiles got real photographs at 80% opacity: Race4Change's bright sky
  put its number label at 3.9:1 on the old one.

## 3. Typography

| Role | Face | Spec |
|---|---|---|
| Display / headings (h1–h4) | **Fraunces 600** | Never heavier than 600: it tips into "over the top". `text-display`: clamp(2.35rem, 5.2vw, 4.6rem), leading 1.06, tracking −0.02em. `text-title`: clamp(1.6rem, 3.1vw, 2.5rem), leading 1.1, tracking −0.018em. |
| Body, nav, buttons | **Instrument Sans** | 400 body at leading 1.6; 500–600 for nav and buttons |
| Micro-labels | system monospace, uppercase | The `label-micro` utility only: 0.65rem, tracking 0.14em. Numbering (`01`, `02`), captions, stat labels, tile meta. |

Section headings are full sentences ending in a full stop
("Five avenues of service.", "For Interactors and club officers."), capped at
`max-w-[20ch]`, followed by one muted sentence at `max-w-[56ch]`.

## 4. Shape and layout

- **Controls are pills** (`rounded-control`, 999px). Every button and nav chip.
  The morph cursor parks on pills, so a square control is a bug.
- **Photographs and tiles** `rounded-media` 18px. **Cards, trays, bands**
  `rounded-panel` 20px. Nothing square.
- Page width: `container-page` (max 88rem; gutters 1.125 / 2 / 3.5rem).
- Section rhythm: `py-16 md:py-24`.
- Section header pattern: heading, muted lede, then a `DrawLine` hairline, then content.
- Dividers are hairlines (`chalk-400`), not shadows. There are no box
  shadows on the site (the nav dropdown carried the only one, and it went with
  the dropdowns on 2026-10-06). No glass, no blur, no film grain, no glow.
- **Touch targets** (2026-10-06): every control is at least 24px (WCAG 2.5.8).
  Icon-only controls on the touch-first surfaces (the menu button, the hero's
  pause button) keep their 36px circle but carry an invisible 44px hit area.
  Controls get `touch-action: manipulation` and no tap highlight
  (globals.css), since each has its own press state.
- The sticky header is offset by `scroll-padding-top: 5rem`, so anchor jumps
  and keyboard focus never land under it.
- **Names and dates don't break** inside a surname ("De Cruz"), after an
  initial, or inside a date ("21 November 2025"): render them through
  `keepTogether` / `keepDatesTogether` (`components/people/keep-together.ts`),
  never by editing the data.

## 5. Components (reuse, don't re-invent)

- **`Button`** (`components/ui/button.tsx`) is the only button. Tones:
  `primary` / `ghost` on chalk, `onPhoto` / `onPhotoGhost` over photography,
  `onInk` / `onInkGhost` on dark bands. Pick a tone; never override colours.
  With `href` it renders a link, without one a native `<button>`
  (`type="button"` by default).
- **`press`** (globals.css utility) goes on every pressable control that
  isn't a `Button`: pills, chips, arrows, toggles, icon buttons. It owns
  `transition-property` (colours at 200ms, scale at 120ms), so it replaces a
  `transition-*` utility rather than sitting beside one. Use `--press-extra`
  for one extra transitioned property and `--press-dur` for a longer colour
  change (the header's 300ms). It never transitions `outline-color`: focus
  rings appear instantly. Large cards and tiles don't get it.
- **Shared motion hooks** (`components/motion/`): `useHoverIntent` (the 80ms
  accordion hover delay) and `useHscrollPan` (measures `--pan` for the pinned
  horizontal rails). Reuse them; don't copy the timer or measure logic.
- **Cropped photos** (`object-cover` in a box of a different shape) derive
  `sizes` from the photo's real aspect ratio, which `lib/home.ts` reads from
  a static import of the same file, never a hand-typed number.
- **`Reveal`** / **`DrawLine`** (`components/motion/reveal.tsx`) for enter
  motion below the fold: 550ms, `ease-out-expo`, 18px rise, 70ms stagger
  steps. Content in the first viewport uses the CSS load animations instead
  (`rise-in-load`, `clip-in-load`), so nothing above the fold waits on
  JavaScript to become visible.
- **Dialogs** go through `useModal` (`components/motion/use-modal.ts`): focus
  in, Tab trapped, Escape, focus back to the trigger, page scroll locked. The
  overlay also carries `data-lenis-prevent`, or Lenis scrolls the page behind.
- **Hover fills:** a control that fills on hover fills with `accent-fill` and
  `accent-on` text, never `accent` with white (3.90:1, fails).
- **Focus ring:** Signal (`--focus`) on chalk; white for anything focused
  inside a navy, ink or photo surface (globals.css), where Signal measures
  ~2.1:1.
- **Header:** transparent over a hero photograph at rest, solid chalk with a
  hairline from the first scroll. Active nav item gets a Signal underline.
- **Footer:** chalk, three columns, micro-label headings, theme line in `accent-text`.

## 6. Motion

Effects come from `lab.damiandc.com`, and the home page set is the whole
vocabulary: **Clip Reveal** (hero), **Odometer Roll** (stats), **Expand Grid**
with a shared-element handoff (projects), **Accordion Gallery** (avenues),
**pinned horizontal scroll + Line Draw** (photographs), **Morph Cursor**
(sitewide, fine pointer only). Inner pages reuse these. A new effect is a
design change (see the top of this file).

- Hover 200ms (300ms for the header's colour change); press 120ms (below);
  enters 550–1150ms on `ease-out-expo`; clip moves on `ease-clip`. The softer
  `ease-out-quint` (`cubic-bezier(0.22,1,0.36,1)`) is the mobile drawer
  and accordion curve, now a named token instead of inline values.
- Everything is reachable by `prefers-reduced-motion`, and the morph cursor is
  off on touch. The audience is mid-range Android, so this is a performance
  rule too. Under reduced motion: no autoplay, no smooth-scroll hijack, no
  custom cursor, pinned rails become ordinary layouts, the DIR line is simply
  drawn. **Revised 2026-10-06 (approved by the user): reduced means gentler,
  not none.** Nothing moves (no rise, slide, scale, clip wipe, zoom, press
  scale, delay or stagger); what remains is a 200ms opacity fade, plus
  colour changes, so content still arrives rather than popping. Reveals,
  clip reveals, the hero's slide change and dialogs all fade. (Before this it
  jumped every animation to its final frame.)
- **Revision 2026-10-06 (approved by the user): interaction refinements**,
  after an audit against Emil Kowalski's design-engineering principles. None
  is a new effect; each refines an existing one:
  - **Press:** every pressable control scales to 0.97 in 120ms on
    `ease-out-expo` (the `press` utility in globals.css), replacing the 1px
    drop. Colours keep their 200ms. Off under reduced motion.
  - **Nav dropdown** grew from its trigger (opacity plus scale 0.97 → 1).
    Removed with the dropdowns on 2026-10-06 (§8). The mobile drawer opens
    with a clip-path reveal instead of animating height.
  - **Accordions** wait about 80ms before opening on hover, so passing the
    pointer over them doesn't fire them. Click and focus are still instant.
  - **Forms:** the "your email is ready" confirmation rises in with
    `rise-in`, and Copy → Copied cross-fades in 150ms.
  - **Exits are faster than enters:** dialog scrims 220ms in, 150ms out.
  - **Calendar month wipe** 650 → 400ms: people click through months
    repeatedly, so it is a control response, not a set piece.
  - Blur-masked cross-fades, toasts, page transitions and animated focus
    rings were considered and rejected: §7 bans blur and glow, and the others
    are new effects.
- **Autoplay must be stoppable.** The hero slideshow has a pause button (touch
  has no hover), and the progress bar's own `animationend` advances the slide,
  so pausing freezes bar and countdown together. (Nothing on the site
  autoplays since the slideshow came out on 2026-10-14; the rule stands for
  anything that ever does.)
- **Revision 2026-10-14 (approved by the user): home page content pass.**
  - **Hero:** the four-photo Clip Reveal slideshow is replaced by one piece of
    district artwork that carries its own title ("Interact District 3220,
    Sri Lanka & Maldives"). The h1 says the same for screen readers; the only
    visible copy is "Join a club" and "See the projects", centred under the
    title. The artwork clips in on load (`clip-in-load`), the buttons rise in
    (`rise-in-load`). From 1024px it is full-bleed; below that it shows
    whole at 16:9 on navy-900 with the buttons beneath, because a full-height
    box crops the title on phones and portrait tablets.
  - **Photo band → quarterly timeline:** "The year so far, quarter by
    quarter." Each quarter of the Rotary year opens with a marker on the
    line (its date range as the caption, "Q1" in Fraunces), then its
    photographs. The plates keep the photos' own 3:2 shape, because the
    district's graphics carry their titles in the lower quarter. Same
    mechanic as before; a quarter is added in `lib/home.ts`.
  - **Project dialogs:** the lead photo has a row of thumbnails that swaps
    which photo shows, on a 200ms opacity change (colour-change timing, not a
    new effect). Thumbnails are `press` controls. The description replaces
    the headline and blurb.
- **Revision 2026-10-06 (approved by the user): Morph Cursor states.**
  - It follows faster, and the speed is time-based, so it doesn't lag on
    slow or high-refresh screens.
  - The hero no longer pauses on hover, only on keyboard focus and the pause
    button.
  - A link or button without `data-morph` (the logo, text links, cards too
    big to park on) grows the dot into a 36px Signal ring with a 10% fill.
  - Over dark surfaces (the hero, navy bands, ink panel, photo cards, and the
    header while it is see-through) the parked tint and the ring switch to
    white: 18% fill with a 60% ring when parked, 12% with 70% as a ring. Both
    use a `screen` blend, the mirror of multiply on chalk, so the white text
    under a parked pill stays pure white rather than being washed over. Tone
    comes from the nearest `data-cursor` marker, or
    else from the first opaque background behind the pointer. Styles are in
    `.morph-cursor` in `app/globals.css`.
  - Parked on a tile inside a rounded, clipped container (the officers
    grid), the blob takes the container's radius on any corner it shares
    with it, so it never pokes a square corner past the curve (2026-10-06).
- **Revision 2026-11-10 (approved by the user): officers tiles keep one hover
  state.** The officers tiles no longer carry `data-morph`. Their hover is the
  solid Signal fill alone, and the cursor shows its 36px ring over them, as
  over any other large link. Parked on a filled tile, the dark-surface white
  wash lightened `#155FD9` and dropped the white label to about 4.1:1 (AA
  needs 4.5:1); the user saw it as two layers covering the button. Pill
  buttons keep `data-morph`: they resolve to the light-surface treatment,
  which darkens the fill, and measured 6.5:1 on hover.
- **Revision 2026-11-10 (audit fix): mobile drawer.** The drawer hangs over
  the page below the bar instead of pushing the page down, and has a hairline
  on its bottom edge as well as its top so the menu's end reads against the
  chalk page behind it. Same 280ms clip wipe.

### Motion map: where each effect runs

| Effect | Where | Notes |
|---|---|---|
| Clip Reveal (single image) | Home hero artwork (since 2026-10-14; a four-slide Clip Reveal carousel before that); lead photo on About; post images (News, articles); archive-year artwork; DIMUN and Media Crew mastheads | On load (CSS) in the first viewport; on scroll (observer) below it |
| Clip wipe (control) | Calendar month changes | 400ms (650ms until 2026-10-06), from the side the new month came from |
| Odometer Roll | Home and About stats | Digits roll to the figure on entering view |
| Expand Grid (shared element) | Home projects (dialog thumbnails swap the lead photo, 200ms opacity); every council and profile grid; DIMUN committees and executive committee | The image moves from card into the dialog via `layoutId` |
| Accordion Gallery | Home avenues; Media Crew services | Hover opens after ~80ms intent, click locks; 750ms `flex-grow` |
| Pinned horizontal scroll + Line Draw | Home quarterly timeline (the photo band until 2026-10-14); Archives timeline | CSS scroll-driven; progress bar along the bottom. In both rails the line passes through every caption diamond (node = 3px in, caption centre) and behind the label, on one navy backing per caption (home fixed 2026-10-06: its nodes sat 22px above the diamonds) |
| Vertical Line Draw | College of DIRs | Line fills to mid-screen; each year lights as it crosses |
| Load fade-up | Every inner-page header | `rise-in-load`, CSS, from first paint |
| Reveal fade-up + DrawLine | Section headings, rows, cards site-wide | Observer, once per element |
| Morph Cursor | Sitewide, mouse only | Parks on `data-morph` pills and controls; grows into a 36px ring over every other link or button (logo included); white treatment over dark surfaces; releases on removal or scroll-away |
| Header | Sitewide | Transparent over the hero on home, solid from the first scroll; solid from the server render on every other page; spring underline on the active item; the mobile drawer opens over the page on a 280ms tween. No dropdowns |

## 7. Never (each of these has been tried or proposed and rejected)

- A dark theme, or a theme toggle.
- Cyan as an accent, Outfit, or any second sans/serif family.
- Navy as the page background; navy anywhere other than the bands named in §2.
- Orange, purple or any accent hue other than Signal (avenue colours excepted, on their own avenue).
- Background video, animated canvases, silk/aurora fields, film grain, glassmorphism, glows, blooms.
- Card-heavy dashboard layouts; drop shadows as the main separator.
- Square buttons; Fraunces above 600.
- Referencing ramp colours (`navy-*`, `signal-*`, `chalk-*`) in new components
  when a semantic token exists. Known exceptions already on the home page:
  `bg-navy-900` for dark bands (and as the opaque backing behind captions
  and placeholder tiles inside them, so the Line Draw passes behind text),
  `text-signal-400` over photography (hero headline, project-tile labels),
  `chalk-950` scrims.

---

## 8. Site build: inner pages (decided by the user 2026-10-05)

### Page map
| Page | URL | Signature motion (all from §6) |
|---|---|---|
| About | `/about` | Clip Reveal photo band, Odometer stats |
| Meet The Council 2026/27 | `/council/2026-27` | Expand Grid profiles (full roster since 2026-10-13) |
| College of DIRs | `/archives/college-of-dirs` (moved from `/college-of-dirs`, which redirects) | Vertical Line Draw timeline down the years |
| Calendar | `/calendar` | Reveal only; month switch on `ease-clip` |
| Request a Date | `/calendar/request-a-date` | Reveal only |
| Event pages | `/events/[slug]` (first: `dimun-2025`) | Expand Grid for committees and people |
| Admin Documents | `/admin-documents` | Reveal only |
| News | `/news`, `/news/[slug]` | Clip Reveal on post images |
| Newsletter | `/newsletter` | Reveal only |
| Archives | `/archives` | Pinned horizontal timeline + Line Draw (the photo-band mechanic) |
| Archive year | `/archives/[year]` | Reveal + DrawLine section rules |
| Past councils | `/archives/council/[year]` | Expand Grid profiles |
| Media Crew | `/media-crew` | Accordion Gallery for the six services |
| Contact | `/contact` | Reveal only |

Every old Wix path 301s to its new URL (`next.config.ts`).

### Decisions
- **Animation:** inner pages reuse the home-page effects only (table above). No new effects.
- **Inner-page header:** solid chalk bar (no transparent hero treatment), then a
  chalk page header: micro-label eyebrow linking to the parent, Fraunces display
  title, muted lede, DrawLine.
- **Forms** (Contact, Request a Date, Media Crew): full UI with every field and
  validation from CONTENT.md, submitting by opening a pre-filled email to the
  district address. A real back-end later replaces only the submit handler.
- **Calendar:** our own month + list calendar, styled in this system, reading the
  district's Google Calendar iCal feed from `DISTRICT_CALENDAR_ICS_URL`,
  refreshed hourly on the server. Falls back to `lib/events.ts` until the URL is set.
  The feed is the calendar's *secret* address, so the calendar itself stays
  private (2026-11-10).
- **Hosting:** Vercel (Node runtime, ISR).
- **DIMUN:** a reusable `/events/[slug]` template; DIMUN '25 is its first entry.
- **Archive gaps:** every year appears. 2023/24, 2021/22 and 1991/92 get pages with
  what is known plus a "records being compiled" note. 1999/2000 hides its
  duplicated council roster until verified.
  **Revision 2026-10-06 (decided by the user): launch copy.** Those three
  years are `unrecorded`: theme and DIR, plus one line, "The district archive
  holds no further records for this year." Public pages carry no requests
  to the district and no notes about the old site (HANDOFF keeps them).
  Copy is formal and plain; gaps still waiting on district content keep
  their `Placeholder` until it arrives.
- **Council bios:** kept verbatim. The sharpest ones are listed in HANDOFF for the
  district to veto before launch.
- **Council 2026/27:** structured placeholder grid of "To be announced" slots.
  **Revision 2026-10-13 (decided by the user):** the roster arrived; the page
  shows the 40 supplied people in Exco (core leadership and officers
  together), Zonal Leadership, Directors, Chairpersons, then Secretaries and
  Treasurers, as the user ordered them; with the
  full council confirmed the unfilled slots are dropped rather than kept as
  "To be announced". `/kit` keeps its own sample of the empty-slot card.
  The archived councils follow the same grouping (Exco first, Zonal
  Leadership before Directors), at the user's request.
- **Placeholders** always use the shared `Placeholder` component (or, for an
  unfilled person, the dashed-outline "To be announced" card in `PeopleGrid`).
  Both carry `data-placeholder`, so every gap is visibly marked and searchable
  before launch.
- **Shared components live in `components/page`, `components/people` and
  `components/forms`.** `/kit` (development only) renders all of them; check it
  after any change to them.
- **Revision 2026-10-06 (decided by the user): no dropdowns.** Every nav item
  is a plain link. Meet the Council is reached from the About page card (and
  the home officers band), the Newsletter from the pill on News, and the
  College of DIRs from its section on Archives, under which it now lives.
  About lights for `/council/*`, News for `/newsletter`.
- **Branches:** `pages/foundation` first (shared components, shared data,
  redirects), then one branch and PR per page group. The user reviews and merges.

---

## 9. Still in force from before the redesign

**Stack:** Next.js 16 (App Router, TypeScript), Tailwind CSS v4 (CSS-first
`@theme`), Framer Motion 14 + Lenis (12 until 2026-10-06). Hosting: Vercel
(decided 2026-10-05, §8).

**Navigation:** top-level labels and order identical to the Wix site. Clean URLs
with 301s from every old path (`next.config.ts`). Since 2026-10-06 there are no
dropdowns; the "→" rows are reached from their parent page instead (§8).

| Label | New URL | Old Wix URL |
|---|---|---|
| Home | `/` | `/` |
| About | `/about` | `/about` |
| → Meet The Council 2026/27 (from About) | `/council/2026-27` | `/meet-the-council-2025-26` |
| → College of DIRs (from Archives) | `/archives/college-of-dirs` | `/college-of-dirs` |
| Calendar | `/calendar` | `/district-calendar` |
| Admin Documents | `/admin-documents` | `/admin-documents` |
| News | `/news` | `/blog` |
| → Newsletter (from News) | `/newsletter` | `/newsletter` |
| Archives | `/archives` | `/archives` |
| Media Crew | `/media-crew` | `/media-crew` |
| Contact | `/contact` | `/contact-8` |

**Content facts:**
- Rotary theme 2026-27 is **"Create Lasting Impact"** (RI President Olayinka
  "Yinka" H. Babalola). Do not use material tied to Sangkoo Yun.
- Interact was founded globally 5 Nov 1962; **in District 3220 in 1964.**
  District-facing copy uses 1964. `lib/site.ts` keeps both.
