# DESIGN.md

> Single source of truth for how the VeryFun Company site looks and behaves.
> The implemented token source is [src/index.css](./src/index.css) `@theme`.
> Keep this document and that file aligned in the same change.

## Token Block

```yaml
version: beta
name: VeryFun Signal Stage
description: |
  A dark, high-contrast brand surface for a calm mobile-puzzle studio: near-black
  stage, warm off-white type, acid-green action, product screenshots under a
  subtle signal-grid atmosphere. The site should feel precise and luminous, not
  generic SaaS, casino-mobile, or notebook-paper cozy.

colors:
  background: "#07080d"
  foreground: "#f4f7e8"
  muted: "#a6adb7"
  surface: "#10131b"
  surface-warm: "#151b18"
  surface-tint: "rgba(244, 247, 232, 0.05)"
  accent: "#c8ff3d"
  accent-hover: "#e2ff75"
  accent-active: "#9fd823"
  accent-soft: "rgba(200, 255, 61, 0.12)"
  border: "rgba(244, 247, 232, 0.14)"
  border-soft: "rgba(244, 247, 232, 0.08)"
  border-input: "rgba(244, 247, 232, 0.16)"
  border-strong: "rgba(244, 247, 232, 0.24)"
  focus: "#c8ff3d"
  focus-soft: "rgba(200, 255, 61, 0.18)"

typography:
  families:
    sans: "Space Grotesk, Avenir Next, Trebuchet MS, system-ui"
    mono: "DM Mono, SFMono-Regular, Cascadia Mono, ui-monospace"
    serif_alias: "Space Grotesk, Avenir Next, Trebuchet MS, system-ui"
  headings:
    weight: 650-700
    line-height: 0.82-0.98 on display, 0.94 default
    letter-spacing: 0
    wrap: balance
  body:
    weight: 400
    line-height: 1.55 default, 1.62 for paragraphs
    wrap: pretty
  labels:
    family: mono
    casing: uppercase for compact metadata only
    size-floor: "0.875rem"
    letter-spacing: 0.1em on `.status-text`

shape:
  card-radius: 8px
  button-radius: 999px
  app-icon-radius: 9-12px
  focus-radius: 6px

layout:
  page-padding-x: "3.125vw"
  max-header-width: "80rem"
  hero-min-height: "100svh on home, min(38-44rem, calc(100svh - 10rem)) on pages"
  primary-grid: "two-panel split with minmax(0, .9fr) / minmax(22rem, 1.1fr)"
  catalog-grid: "3 columns desktop, responsive collapse in media queries"
  z-index:
    decor: 0
    content: 1
    media-overlay: 2
    header: 50
    skip-link: 70

shadow:
  soft: "0 0 0 1px rgba(244, 247, 232, 0.06)"
  soft-hover: "0 14px 48px rgba(0, 0, 0, 0.30), 0 0 0 1px rgba(244, 247, 232, 0.14)"
  glow: "0 0 34px rgba(200, 255, 61, 0.11)"
  hero-media: "0 24px 78px rgba(0, 0, 0, 0.24-0.40)"

motion:
  libraries: "framer-motion, WebGL canvas"
  easing: "cubic-bezier(0.16, 1, 0.3, 1)"
  page-transition: "0.28s opacity/translate/blur"
  hero-reveal: "home-only title focus + media settle choreography, 0.74-1s"
  image-hover: "0.25-0.42s transform/filter"
  reduced-motion: "MotionConfig reducedMotion=user plus CSS media query; home WebGL falls back to static CSS"

components:
  pill-button: "primary/secondary CTA, uppercase sans, 46px min height"
  glass-card: "legacy dark panel; avoid blur unless it frames hero or media overlays"
  dark-input: "rounded field for dark surfaces"
  site-header: "fixed blurred header with active nav pill"
  hero-shell: "home glass viewport around WebGL stage"
  signal-screen: "rotated product screenshot frame"
  games-lineup: "interactive game selector"
  catalog-card: "image-led game card"
  game-detail-media: "large product image with signal-grid overlay"
  contact-route: "large contact action tile"

icons:
  ui: "lucide-react"
  brand_assets: "public/favicon*.png plus game icons and screenshots"
```

## Direction

The current site is a dark brand stage for calm puzzle games. The visual paradox
is intentional: the games are quiet, but the site uses a luminous signal language
to make the catalog feel alive and modern. The player should read the brand as
small, careful, and technically polished, not soft-paper nostalgic.

## Color

Use the near-black background `#07080d` as the stage. Use `#f4f7e8` for primary
text and `#a6adb7` for supporting copy. The only brand action color is
`#c8ff3d`; reserve it for CTAs, active navigation, important metadata, focus,
and small glows.

Do not add a second saturated brand color without a full palette decision. Blue
and orange appear only as ambient background gradients in the current CSS; they
are atmosphere, not interactive colors.

Do not return to the old warm-paper / notebook system unless the project is
explicitly being redesigned. The live product now uses a dark luminous identity.

## Typography

Space Grotesk is the primary brand voice. It gives the site a precise, game-UI
edge while staying friendly enough for casual puzzles. DM Mono is reserved for
dates, tags, compact status text, and machine-like metadata.

Display headings are intentionally large and tight, but must not overflow. Keep
letter spacing at `0`; do not use negative tracking. Display clamp maximums cap
at 6rem across the site, including the home hero. If a heading breaks badly,
reduce the max clamp or rewrite the copy before shrinking the entire layout.

Compact metadata, captions, and mono labels should stay at or above `0.875rem`.
Use uppercase sparingly for navigation, buttons, and metadata. Do not set body
copy in all caps.

## Layout

The dominant page pattern is a two-panel cinematic split: copy and actions on
one side, product image or interactive catalog on the other. Sections use full
viewport or near-viewport pacing, then dense image-led grids for browsing.

Cards are allowed when they are acting as product frames, detail panels, or
contact routes. Avoid generic icon-heading-text card grids. A card should either
carry product imagery, a route action, or a concrete feature.

Keep `px-[3.125vw]` for page gutters unless refactoring an entire page. The
header max width is `80rem`; page sections are allowed to breathe wider.

## Imagery

Game screenshots and icons are core brand assets. Every game card, detail hero,
and latest-release area should show the actual product image from
`public/images/`. Product screenshots are more trustworthy than abstract
illustration.

Image treatment:

- Use `object-fit: cover` inside fixed aspect frames.
- Add dark overlays only when they improve legibility. The signal-grid material
  should be rare and named, not repeated as generic stripes.
- Keep saturation and contrast enhancements subtle: the CSS currently uses
  `saturate(1.04-1.12)` and `contrast(1.04-1.07)`.
- Always provide useful alt text when the image is content. Decorative repeated
  thumbnails may use empty alt text.

## Motion

Motion should feel like signal, not spectacle. The WebGL home background is
ambient and decorative for users who have not requested reduced motion; reduced
motion uses the static CSS fallback instead. The home hero has one signature
entrance: title focus, copy lift, and a product screenshot settle. Elsewhere,
motion stays functional: route transitions, selectors, image hover feedback, and
FAQ affordances.

Do not add bounce, elastic easing, or large layout shifts. Use the existing
`--ease-brand` curve. Honor reduced-motion support at both React and CSS levels.

## Components

Prefer existing component classes before adding new one-offs:

| Class                               | Use                                              |
| ----------------------------------- | ------------------------------------------------ |
| `.pill-button`                      | CTAs and compact route actions                   |
| `.pill-button--accent`              | Primary Google Play / explore actions            |
| `.glass-card`                       | Legacy dark panel; do not use as default chrome  |
| `.dark-input`                       | Dark form controls                               |
| `.site-header*`                     | Fixed navigation and mobile menu                 |
| `.hero-shell`, `.signal-screen`     | Home hero frame and product screenshot           |
| `.games-hero*`, `.games-lineup*`    | Catalog hero and interactive selector            |
| `.catalog-card*`                    | Game grid cards                                  |
| `.game-detail*`                     | Detail page hero, brief, feature, and FAQ panels |
| `.about-*`, `.contact-*`, `.blog-*` | Page-specific brand panels                       |

Avoid pairing wide soft shadows with decorative borders on generic cards. The
existing system uses borders for structure and shadows mostly for large media or
hover elevation.

## Accessibility

- Text contrast must meet WCAG AA against the dark background and translucent
  surfaces.
- Interactive targets should remain at least 44px high where practical.
- Keep the skip link in [app/root.tsx](./app/root.tsx).
- Keep `:focus-visible` visible. Accent focus is acceptable because the accent is
  used as system signal as well as brand action.
- Keep WebGL non-essential. The fallback class `.hero-canvas-fallback` must
  remain visually credible.
- Do not hide important content behind animation classes that may fail to run.

## Drift Notes

This file replaces the previous "VeryFun Notebook" direction. Any references to
Patrick Hand, Kalam, warm paper, 4px card radii, or burnt-sienna accent are stale
unless they are part of an explicit future redesign.

Known implementation quirks to watch:

1. `body::before` uses an inline SVG turbulence texture. Keep it subtle; do not
   expand it into a hand-drawn or paper-grain motif.
2. Decorative grid/line materials should remain constrained. Prefer ordinary
   borders, overlays, and spacing before adding new stripe or grid effects.
3. Some route patterns still use large display clamps. Verify mobile screenshots
   after changing heading copy.
