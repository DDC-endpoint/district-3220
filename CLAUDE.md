# Interact District 3220 website

Rebuild of interactdistrict3220.org in Next.js 16 + Tailwind v4. Running status
and content gaps: `HANDOFF.md`. Content source of truth: `CONTENT.md`, `ARCHIVES.md`.

## The design is locked

The home page on `main` is the approved design system. **Read
`design/DECISIONS.md` before any visual work**, and compare new pages against
the screenshots in `design/reference/`.

The short version, so nobody drifts:
- Warm chalk page `#F7F5F0`, near-black ink text. Light theme only.
- Dark blue **navy-900 `#0A1628`** is the deep colour: full-bleed photo bands
  and the closing CTA panel. Warm near-black `ink-panel` only for the
  members/officers band.
- **One accent: Signal blue** (`accent` `#2E7DF6` marks, `accent-fill`
  `#155FD9` buttons, `accent-text` `#124AAD` links). No cyan, no orange, no
  second accent. Interact cyan lives only inside the logo.
- Fraunces 600 headings, Instrument Sans body, monospace `label-micro` labels.
- Pill buttons via `components/ui/button.tsx`; any other pressable control
  gets the `press` utility (DECISIONS §5); 18–20px radii; nothing square.
- Motion vocabulary is the home page's effects; no new effects, video, glass,
  grain or glow.

Changing any of that needs the user's explicit OK, recorded as a dated revision
in `design/DECISIONS.md`. If code and the doc disagree, ask; don't silently fix
either. `design/archive/` is superseded history: never build from it.

Describe colours and tokens from `app/globals.css`, not from memory or token
names.

## Working

- Install: `npm ci` (network and `ffmpeg-static` notes: HANDOFF "Dependencies").
- Dev server: `npm run dev` → http://localhost:4100 (pinned in package.json;
  `npm start` serves a production build on 4100 too).
- Checks: `npx tsc --noEmit` and `npx next build`. `npm run preview` builds
  with the Cloudflare adapter and serves it in the Workers runtime on :8787;
  run it after changes to config, caching, images or the calendar.
- `/kit` (dev only) renders every shared inner-page component. New pages build
  from `components/page`, `components/people` and `components/forms`, not from
  one-off markup.
- Every content gap goes through `<Placeholder>`; never invent facts, dates or
  names to fill one. Public copy is formal and plain: no requests to the
  district and no notes about the old site on public pages (DECISIONS §8).
- Dialogs use `useModal` (focus, Tab trap, Escape, scroll lock) and put
  `data-lenis-prevent` on the overlay. First-viewport content animates with
  the CSS load utilities (`rise-in-load`, `clip-in-load`), not `Reveal`.
  The motion map is in `design/DECISIONS.md` §6.
- Hosting is Cloudflare (Workers via the OpenNext adapter; setup in HANDOFF
  "To switch on at launch"). Forms send via pre-filled email until a back-end exists.
- Verify UI in a real browser at 1440×900 and 390×844 before calling it done.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
