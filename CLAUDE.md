# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Always use Context7 MCP for library/API documentation, code generation, and setup steps without me having to ask.

## What this is

A single-page marketing site (React + Vite) for **XenTag™** and **XenAuth™**, tracking-label products by ZenduIT. It's a static landing page, not an app — no routing, no backend. Two supporting subsystems live alongside it: a Remotion project (`demo-video/`) that renders the product film/hero-loop MP4s consumed by the page, and Playwright screenshot scripts (`scripts/`) used for visual QA.

## Commands

Root site:
- `npm run dev` — start Vite dev server (default `http://localhost:5173`)
- `npm run build` — production build
- `npm run lint` — Oxlint (config: `.oxlintrc.json`; enforces `react/rules-of-hooks`)
- `npm run preview` — preview the production build

There is no test suite/runner in this repo.

Demo video (`demo-video/`, separate `package.json` — `cd demo-video` first):
- `npm run studio` — Remotion Studio for iterating on compositions
- `npm run render` / `render:film` / `render:hero` — render the three MP4s (`XenTagDemo`, `XenTagFilm`, `XenTagHeroLoop`) to `../public/assets/`
- `npm run poster` / `poster:film` — extract poster frames (ffmpeg) and, for the film, a WebP poster (ImageMagick `magick`)

Visual QA scripts (`scripts/`, run against a live `npm run dev` server on :5173 unless a URL is passed):
- `node scripts/shot.mjs [url] [out] [width] [height] [fullPage] [waitMs]` — full-page or viewport screenshot; scrolls the page first when `fullPage=true` to trigger the scroll-reveal animations, and prints any browser console errors it captured
- `node scripts/section.mjs [selector] [out] [width]` — screenshot a single section by selector
- `node scripts/composite.mjs [out]` — screenshots `#stage` from `file:///tmp/label-edit.html` (ad-hoc label-artwork compositing, not wired to the main site)

## Architecture

**Single-page composition.** `src/App.jsx` is the entire page: it imports one component per section and renders them in sequence inside `<main>`, plus two modals (`TraceModal`, `XenAuthModal`) and a `Nav`/`Footer` outside `<main>`. To add/reorder a section, edit the import list and JSX list in `App.jsx` — there's no section registry or config.

**Two products, one page.** Content and CTAs branch on which product a section is about: XenTag (BLE + cellular tracking, Cargo Ember/Trace Blue) vs XenAuth (NFC tap-to-verify, Verified Teal). `openTrace()`/`openXenAuth()` in `App.jsx` control which modal is open (mutually exclusive — opening one closes the other), and are threaded down as props to `Nav`, `ProductsBanner`, and `Products`.

**State lives in `App.jsx` and flows down as props** — no context, no state library. Modal open/closed state, nav scroll state, and the active-industry-tab index (`Industries`) are the only pieces of cross-component state; everything else is local to its component.

**Content vs. presentation split.** `src/data.jsx` holds copy/data arrays (`trustData()`, `incidentsData()`) consumed by `App.jsx` and passed down — check there first before assuming copy is hardcoded in a component. `src/clientLogos.js` similarly holds the client-logo list for `Clients.jsx`.

**Styling: inline styles + a thin global stylesheet, no CSS modules/CSS-in-JS library.** Components set most layout/color via `style={{}}` objects; `src/index.css` defines CSS custom properties (`--ink`, `--ember`, `--radius-md`, etc.) and a set of `!important` overrides keyed to component class names (e.g. `.product-card`, `.how-grid`, `.industry-tab`) that tighten specific sections toward the "evidence sheet" layout described in `DESIGN.md`. When changing a section's structural styling, check whether `index.css` already has overrides for its class names before duplicating rules inline.

**`DESIGN.md` and `PRODUCT.md` are the design/brand source of truth** — read them before any visual or copy change. Key constraints from those files that aren't obvious from the code:
- Two themes only: night console (`#0A0B0E`–`#15171B`, live-platform moments) and daylight warehouse (white/`#F1F3F5`, explaining moments). No third/mid-gray theme.
- Cargo Ember (`#C2410C`) is a signal color (CTAs, live/active states) capped at ~10% of any daylight surface — not a decorative wash.
- Monospace/tabular-nums text is reserved for machine-sourced values (serials, temperatures, battery %); everything human-written is Source Sans 3 / Helvetica Neue.
- No fabricated dashboards, reviews, or "success" UI shown before a real 2xx from the capture endpoint.
- Avoid generic-SaaS patterns explicitly banned in `PRODUCT.md`: uppercase eyebrow labels on every section, identical icon+heading+text grids, glassmorphism, gradient text, emoji-as-icon.

**Reveal-on-scroll animation** (`src/hooks/useRevealOnScroll.js`) is applied once globally from `App.jsx`, not per-component. It walks `section`/`footer` children via `IntersectionObserver` and animates them in with the Web Animations API. It's progressive enhancement by design (no-op without `IntersectionObserver`, animations, or when `prefers-reduced-motion` is set) — don't add competing per-component scroll-reveal logic.

**Email capture** (`src/hooks/useEmailCapture.js`) is the single hook behind every lead-capture form (demo booking, free-sample request, etc.) — it POSTs to `VITE_CAPTURE_ENDPOINT` (see `.env.example`; unset in dev, so submissions always land in the `failed` state), mirrors accepted leads into `localStorage` under `xt-leads`, and exposes a `mailto:sales@zenduit.com` fallback for the failed/unset-endpoint case. Reuse this hook rather than writing a new submit handler for new capture forms.

**Assets**: rendered video/poster files live in `public/assets/` and are produced by the `demo-video` Remotion project (see Commands above) — don't hand-edit or replace them without regenerating from `demo-video/`. `public/icons.svg` is a shared SVG sprite; one-off icons are inline React components in `src/components/Icons.jsx`.
