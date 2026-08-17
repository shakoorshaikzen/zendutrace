---
name: XenTag Landing
description: Smart tracking labels for high-value goods — industrial confidence, evidence over decoration.
colors:
  ink: "#0F1114"
  ink-soft: "#4B5259"
  ink-muted: "#5C636B"
  night: "#0A0B0E"
  night-panel: "#15171B"
  cargo-ember: "#C2410C"
  ember-cta: "#C2410C"
  ember-cta-hover: "#D2470A"
  ember-mid: "#EA580C"
  ember-bright: "#FF7A2E"
  ember-soft: "#FFB37E"
  ember-link: "#FF8A2B"
  ember-on-light: "#9A3412"
  error-red: "#E5484D"
  error-text-dark: "#FF9AA0"
  signal-green: "#1E8A5B"
  signal-green-dark: "#00E5A0"
  trace-blue: "#5CB3F8"
  nfc-blue: "#0284C7"
  verified-teal: "#0D9488"
  verified-teal-bright: "#2DD4BF"
  paper: "#FFFFFF"
  cloud: "#F1F3F5"
  label-warm: "#FBF5EF"
typography:
  display:
    fontFamily: "Archivo, Source Sans 3, Helvetica Neue, Helvetica, sans-serif"
    fontSize: "clamp(32px, 4vw, 54px)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.02em"
  modal-display:
    fontFamily: "Archivo, Source Sans 3, Helvetica Neue, Helvetica, sans-serif"
    fontSize: "clamp(36px, 5.2vw, 68px)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  modal-lead:
    fontFamily: "Source Sans 3, Helvetica Neue, Helvetica, sans-serif"
    fontSize: "clamp(16px, 1.3vw, 19px)"
    fontWeight: 400
    lineHeight: 1.62
  price-anchor:
    fontFamily: "Archivo, Source Sans 3, Helvetica Neue, Helvetica, sans-serif"
    fontSize: "clamp(72px, 7.5vw, 108px)"
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Archivo, Source Sans 3, Helvetica Neue, Helvetica, sans-serif"
    fontSize: "clamp(32px, 4.2vw, 52px)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Source Sans 3, Helvetica Neue, Helvetica, sans-serif"
    fontSize: "21px"
    fontWeight: 700
    lineHeight: 1.2
  title-fluid:
    fontFamily: "Archivo, Source Sans 3, Helvetica Neue, Helvetica, sans-serif"
    fontSize: "clamp(22px, 2.2vw, 30px)"
    fontWeight: 700
    lineHeight: 1.15
  panel-headline:
    fontFamily: "Archivo, Source Sans 3, Helvetica Neue, Helvetica, sans-serif"
    fontSize: "clamp(28px, 3.2vw, 40px)"
    fontWeight: 700
    lineHeight: 1.08
  price-anchor-compact:
    fontFamily: "Archivo, Source Sans 3, Helvetica Neue, Helvetica, sans-serif"
    fontSize: "clamp(44px, 5.5vw, 64px)"
    fontWeight: 800
    lineHeight: 0.9
  lead:
    fontFamily: "Source Sans 3, Helvetica Neue, Helvetica, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
  body:
    fontFamily: "Source Sans 3, Helvetica Neue, Helvetica, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.62
  body-fluid:
    fontFamily: "Source Sans 3, Helvetica Neue, Helvetica, sans-serif"
    fontSize: "clamp(14px, 1.2vw, 16.5px)"
    fontWeight: 500
    lineHeight: 1.55
  body-small:
    fontFamily: "Source Sans 3, Helvetica Neue, Helvetica, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
  price-unit:
    fontFamily: "Archivo, Source Sans 3, Helvetica Neue, Helvetica, sans-serif"
    fontSize: "clamp(20px, 1.8vw, 26px)"
    fontWeight: 700
    lineHeight: 1.1
  label:
    fontFamily: "Source Sans 3, Helvetica Neue, Helvetica, sans-serif"
    fontSize: "11px"
    fontWeight: 700
    letterSpacing: "0.08em"
  machine:
    fontFamily: "JetBrains Mono, ui-monospace, Menlo, monospace"
    fontSize: "11px"
    fontWeight: 700
rounded:
  sm: "9px"
  md: "12px"
  lg: "16px"
  card: "20px"
  xl: "22px"
  band: "28px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "24px"
  lg: "36px"
  section: "80px"
  section-tight: "44px"
  section-peak: "clamp(88px, 9vw, 116px)"
components:
  button-primary:
    backgroundColor: "{colors.ember-cta}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "14px 26px"
  button-primary-hover:
    backgroundColor: "{colors.ember-cta-hover}"
  button-ghost-dark:
    backgroundColor: "#FFFFFF0F"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "14px 24px"
  chip-category:
    backgroundColor: "#C2410C1A"
    textColor: "{colors.ember-on-light}"
    rounded: "8px"
    padding: "6px 12px"
  chip-intent:
    backgroundColor: "#FF7A2E29"
    textColor: "{colors.ember-soft}"
    rounded: "{rounded.pill}"
    padding: "9px 18px"
  card-product:
    backgroundColor: "{colors.paper}"
    rounded: "0"
    padding: "40px"
---

# Design System: XenTag Landing

## 1. Overview

**Creative North Star: "The Label on the Crate"**

The physical label is the identity. Every distinctive visual on this site — barcodes, QR blocks, NFC tap targets, mono serial codes, peel-and-stick renders — comes off the surface of the product itself. The page doesn't decorate around the label; it reproduces it, at hero scale, on cards, inside phone mockups, on cartons. When a new section needs a visual, the first question is always: *what does this look like printed on the label, or on the crate it's stuck to?*

The system runs two worlds. **Night surfaces** (#0A0B0E–#15171B) carry the live-platform moments — hero over real freight footage, walkthrough console, modals, footer — where Cargo Ember and Signal Green glow like telemetry. **Daylight surfaces** (white and #F1F3F5) do the explaining: products, comparisons, the how-it-works run. The voice throughout is a seasoned ops engineer: numbers carry the argument, decoration is banned, and everything shown is either real footage, a real platform screenshot, or a faithful render of the physical label.

Vertical rhythm is tiered, not uniform: an 80px section baseline, a 44px tight coupling where sections form one narrative unit (the demo film flowing into the 3-step how-it-works), and `clamp(88px,9vw,116px)` of air around the page's peak moment (the lifecycle walkthrough console). Anchored sections carry `scroll-margin-top: 96px` to clear the floating nav.

**Key Characteristics:**
- The label artifact (barcode + QR + NFC + serial) recurs as the brand's signature illustration
- Isometric hairline "dieline" drawings are the illustration system: ink wireframes of cartons, plates, and map planes with one ember accent each
- Spec-sheet seams: daylight sections meet at a hairline rule with registration crosses, like trim marks on a dieline sheet
- Night consoles carry a lit top edge: a 1px ember hairline with a soft light fall beneath it
- The footer signs off with a giant low-opacity XENTAG wordmark watermark
- Two committed themes — night console and daylight warehouse — never a third
- Cargo Ember is a working color: CTAs and live signals, not washes
- Machine text (mono, tabular) whenever a number comes from a device
- Tactile confidence: chunky pressable buttons, firm 1px borders, objects with weight
- Three-tier section rhythm: baseline / tight narrative pairs / peak air

## 2. Colors

A hi-vis working palette against industrial neutrals — every hue means something on the dashboard.

### Primary
- **Cargo Ember** (#C2410C — also the CTA face; hover #D2470A): the brand's single loud voice. Buttons, live-tracking routes, active states, price anchors. The CTA face is #C2410C so white button text holds ≥4.5:1 (AA, 5.18:1). Supporting tones: **Ember Mid** (#EA580C) for large display numbers on dark only; **Ember Bright** (#FF7A2E) for glows and active telemetry on dark; **Ember Soft** (#FFB37E) for selected-state text on dark; **Ember Link** (#FF8A2B) for link hovers and code accents on dark; **Ember on Light** (#9A3412) as accent text on daylight surfaces.
- **Error Red** (#E5484D, with #FF9AA0 for error text on dark): form validation only.

### Secondary
- **Signal Green** (#1E8A5B on light, #00E5A0 on dark, #2FBF83 in the walkthrough console): exclusively for live/healthy/delivered states — LIVE dots, delivered stamps, in-range temperature. Never decorative.
- **Trace Blue** (#5CB3F8): XenTag product accent on dark surfaces (map traces, product glyphs, the XenAuth headline "+").

### Tertiary
- **NFC Blue** (#0284C7): the tap-to-verify wave marks on label renders.
- **Verified Teal** (#0D9488): XenAuth authentication states (VERIFIED badges).

### Neutral
- **Ink** (#0F1114): headings and primary text on light; base of dark panels.
- **Ink Soft** (#4B5259): body copy on light surfaces.
- **Ink Muted** (#5C636B): captions, footnotes, and secondary values on light — the floor for readable text (6.1:1). #878E96 is reserved for idle/disabled states only, never body copy.
- **Night** (#0A0B0E) and **Night Panel** (#15171B): the console world's floor and furniture.
- **Paper** (#FFFFFF) and **Cloud** (#F1F3F5): daylight surfaces. **Label Warm** (#FBF5EF) is reserved for the XenTag product card's tinted field.
- On dark, text runs on a white-alpha ramp: rgba(255,255,255,0.9+) headings, ~0.7 body, ~0.55 captions. Never below 0.45 for readable text.

### Named Rules
**The Ember Budget Rule.** Cargo Ember is a signal, not a paint. On daylight sections it appears only on CTAs, active states, and live data — roughly ≤10% of the surface. If a section feels orange, it's over budget.

**The Two Worlds Rule.** Every surface is either night console or daylight warehouse. No mid-gray third theme, no section that can't say which world it belongs to.

## 3. Typography

**Display Font:** Archivo (700/800) — a grotesk with print heritage for headlines and the hero's freight-stencil voice; falls back to Source Sans 3 / Helvetica Neue.
**Body Font:** Source Sans 3 with Helvetica Neue fallback — the original Helvetica Neue workhorse, with a webfont so weight and metrics stay consistent across platforms.
**Machine Font:** JetBrains Mono (system monospace fallback)

**Character:** One neo-grotesk family doing everything through weight and scale — the typographic equivalent of shipping-carton print. Monospace appears only where a machine is speaking. Form controls inherit the stack globally (`button, input, select, textarea { font: inherit }`). CSS tokens: `--font-display`, `--font-body`, `--font-machine`.

### Hierarchy
- **Display** (700, clamp(34px, 3.6vw, 58px), 0.98, -0.025em): hero and lockup headlines. Prefer sentence case; reserve uppercase for short label/status chips.
- **Headline** (700, clamp(28px, 3.6vw, 44px), 1.06, -0.025em): every full-width section h2 — one scale, no drift. Sanctioned deviations: the final CTA ask (52px max), the quiet risk band (32px max), and panel headlines inside cards (Platform, 40px max).
- **Title** (700, 21–30px): card and step titles.
- **Body** (400–500, 14–16.5px, 1.55–1.65 light / 1.6–1.66 on dark): #4B5259 on light, rgba(255,255,255,0.7) on dark. Max measure ~44rem / 68ch. `text-wrap: pretty` on all paragraphs; `balance` on h1–h3.
- **Label** (700, 10.5–12px, 0.06–0.14em tracking, UPPERCASE): status chips and category tags — short machine-adjacent labels only.
- **Machine** (JetBrains Mono 700, 9–12px, tabular-nums): serials (XT-48192), telemetry values (-2.0°C, 94%), FCC IDs.

### Named Rules
**The Machine Voice Rule.** If a value comes from a device — a temperature, a battery percentage, a serial, an ETA — set it in monospace with tabular numerals. If a human wrote it, set it in Source Sans 3 / Helvetica Neue. Never mix.

**The One Scale Rule.** Full-width section headings share one clamp. A new section does not get to invent a new heading size; it inherits `clamp(32px, 4.2vw, 52px)` or documents its role-based exception here.

**The Lead-In Rule.** Each major section heading may carry exactly one ember-colored phrase — `#C2410C` on daylight, `#FF7A2E` on night — naming the section's payoff ("One job.", "Live on the map."). One phrase, never a whole heading, never a second hue.

## 4. Elevation

Ambient lift. Surfaces carry large, soft, heavily-negative-spread shadows that read as physical weight under studio light — a crate on a floor, a label on a box — plus a firm 1px border doing the actual edge definition. Depth on night surfaces comes from layered panel tones (#0A0B0E → #15171B → rgba(255,255,255,0.05)) and glow (Ember/Green box-shadows on live elements), not from darker shadows.

### Shadow Vocabulary
- **Card ambient** (`0 1px 2px rgba(13,16,20,0.03), 0 24px 60px -34px rgba(13,16,20,0.28)`): daylight cards at rest.
- **Panel ambient** (`0 2px 6px rgba(13,16,20,0.08), 0 60px 130px -60px rgba(13,16,20,0.55)`): the big framed consoles (walkthrough, media frames).
- **Object lift** (`filter: drop-shadow(0 18px 22px rgba(13,16,20,0.28))`): label renders and floating artifacts. Physical objects take `drop-shadow`, never `box-shadow` — surface shadows belong to containers, object shadows to the things sitting on them.
- **Live glow** (`0 0 8–14px` of the signal's own color at 0.7–0.8 alpha): status dots, tracking dots, active progress.

### Named Rules
**The Heavy Object Rule.** Shadows are oversized, diffuse, and low-opacity — weight, not float. If a shadow is small, crisp, and dark, it's wrong (that's a 2014 app).

## 5. Components

Tactile confidence: chunky, pressable, firmly bordered — equipment you'd operate with gloves on.

### Buttons
- **Shape:** primary CTAs are pills (999px) — nav Book a demo, hero actions, form submits, floating play controls; secondary/utility buttons stay confidently rounded (12px)
- **Primary:** Cargo Ember face (#C2410C), white 600–700 text, 14–16px padding blocks (`14px 26px`)
- **Hover:** lighter face (#D2470A) + `translateY(-1px)`, .18s ease — a press, not a glide
- **Sending/disabled:** face at 0.6 alpha, cursor default, label swaps to "Sending…"
- **Ghost (dark surfaces):** rgba(255,255,255,0.06) fill, 1px rgba(255,255,255,0.16) border, white text
- **Text link buttons:** 600 weight in Ember-on-light (#9A3412) with an → that gains gap on hover
- **Focus:** global `:focus-visible` — 2px #FF7A2E outline on links/buttons, Ember ring on inputs

### Chips
- **Category tags:** tinted fill of their own hue (e.g. rgba(194,65,12,0.1)), 11px/700/tracked uppercase text in the deep tone (#9A3412), 8px radius
- **Intent chips (form toggles):** pill radius, `aria-pressed`; selected = rgba(255,122,46,0.16) fill, rgba(255,122,46,0.65) border, Ember Soft text; idle = white-alpha glass
- **Status pills:** pill radius, dark glass fill on dark, leading glowing dot in Signal Green or Ember

### Cards / Containers
- **Evidence layouts:** Product dossiers, process steps, and integration matrices share straight 1px separators with no outer radius or ambient shadow. They read as one technical sheet, not a grid of floating marketing cards.
- **Framed proof:** Platform captures, product film, and the industry photo stage carry a generous 20px curve; the API console 16px. The screenshot or physical label may carry object lift inside the frame; the frame itself stays quiet.
- **Utility panels:** 20–22px is reserved for self-contained interactive consoles, modals, and product walkthrough stages where the object genuinely needs enclosure. Full-width bands that read as one curved console — the risk stat band, the final CTA panel, the footer's top shoulder — use the 28px band radius.
- **Background:** Paper on daylight; Cloud for neutral working fields; #15171B on night; Label Warm is reserved for XenTag product artifacts.
- **Border:** rgba(13,16,20,0.08–0.12) on light; rgba(255,255,255,0.08–0.16) on dark.
- **Internal Padding:** 40px product dossiers, 24–30px process and utility regions.

### Inputs / Fields
- **Style:** 9–12px radius; on dark: rgba(255,255,255,0.05–0.08) fill, rgba(255,255,255,0.12–0.2) border, white 13–15px text
- **Error:** border swaps to Error Red with a plain one-line message in #FF9AA0; message clears on typing
- **Failed submit:** honest inline fallback with a mailto link in Ember Link — never a false success state

### Navigation
- Fixed dark pill over the hero; 16px/500 links in rgba(255,255,255,0.86), Ember CTA button rightmost; dropdown panels are night-panel cards with icon + title + one-line description rows. Below 980px the link row collapses to a 44×44 hamburger opening a night-panel sheet (products, sections, Compare, Book a demo); closes on link click and Escape.

### Modals
- Full-screen fixed overlays (z 110) with blurred night scrim; `role="dialog"`, `aria-modal`, labeled; close via ×, backdrop, and Escape; body scroll locks while open.

### The Label (signature component)
A white rounded-rect (14–18px) rendering of the physical product: XenTag wordmark top-left, mono status top-right, barcode + QR + serial in the body, dashed NFC tap target. It appears at hero scale, in product cards, in the walkthrough, and inside phone mockups — always with Object lift shadow, often at a slight rotation (-3° to 2.5°). New illustrations should derive from it rather than inventing new artwork.

## 6. Do's and Don'ts

### Do:
- **Do** show the product working: real footage, real platform screenshots, faithful label renders (PRODUCT.md principle #1).
- **Do** let numbers carry the argument — $6/label, 1-year battery, 29 countries — in mono/tabular where they're telemetry.
- **Do** keep every surface in one of the two worlds: night console or daylight warehouse.
- **Do** pair every shadow with a 1px border; ambient lift plus firm edge.
- **Do** preserve `prefers-reduced-motion` handling on marquees and Framer springs (MotionConfig `reducedMotion="user"`), and the touch-hold marquee pause.
- **Do** show success states only after the capture endpoint confirms (2xx); failures get the honest sales@ fallback.

### Don't:
- **Don't** ship "generic AI-generated SaaS landing page" grammar (PRODUCT.md anti-reference): uppercase tracked eyebrow labels on every section, identical icon+heading+text card grids, decorative glassmorphism, gradient text.
- **Don't** use startup-cute copy — "supercharge", "unleash", emoji bullets — or emoji as UI icons anywhere.
- **Don't** fabricate dashboards or reviews; fabricated proof is banned outright.
- **Don't** spend Cargo Ember on decoration — no orange washes, no orange section backgrounds on daylight surfaces.
- **Don't** use consumer-gadget gloss; this is industrial B2B. If it looks like a phone-case ad, it's off-brand.
- **Don't** set body copy in #878E96 or below rgba(255,255,255,0.45) on dark — muted tones are for idle states; #5C636B is the caption floor on light.
- **Don't** claim an action succeeded before it did — no success UI ahead of a confirmed send.
