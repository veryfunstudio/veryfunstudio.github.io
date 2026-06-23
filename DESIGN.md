# DESIGN.md

> Single source of truth for **how this site looks and feels**. Read this
> before building or restyling any component. Pairs with
> [`PRODUCT.md`](./PRODUCT.md) (the what & who).
>
> Structure borrowed from Vercel's Geist `design.md`: a machine-readable
> **Token block** at the top (any agent or script can parse it directly),
> followed by a **Why block** that explains the trade-offs in prose. The
> Token block is the contract; the Why block is the rationale. When they
> disagree, the Token block wins and the Why block needs updating.

---

## Token block

> These mirror the CSS variables in `@theme` of
> [`src/index.css`](./src/index.css) **plus** a few intent tokens that are
> currently expressed inline in components. The canonical home is
> `index.css`; this block is the readable mirror. **When you change one,
> change the other in the same commit.**

```yaml
version: alpha
name: VeryFun Notebook
description: |
  Warm paper, hand-lettered ink, one restrained burnt-sienna accent.
  The vibe is a well-kept notebook from a quiet indie studio — not a
  glossy SaaS landing page. Light theme only (no dark mode planned;
  see Why › Color).

colors:
  # Surface
  background: "#fdfbf7" # warm paper, page bg
  surface-raised: "bg-white (Tailwind native — not a custom token; cards, panels)"
  surface-warm: "#f6f1e8" # key-art wells, success icon wells
  surface-tint: "rgba(45, 45, 45, 0.05)" # subtle ink wash — pills, icon circles
  foreground: "#2d2d2d" # ink — body text, hard borders, primary btn bg

  # Secondary text
  muted: "#6e6960" # subtitles, meta — not for small text (see Why)

  # Accent — the ONE brand color. Four steps encode intent.
  accent: "#b6553a" # default — links, active nav, hover bg
  accent-hover: "#9c4628" # hover on accent fills
  accent-active: "#7e371f" # pressed
  accent-soft: "rgba(182, 85, 58, 0.12)" # subtle highlight bg

  # Focus — different hue so focus isn't mistaken for brand
  focus: "#2d5da1" # outline only, never as fill
  focus-soft: "rgba(45, 93, 161, 0.2)" # input focus glow

  # Borders — three steps encode weight. All promoted to @theme so they
  # resolve as first-class Tailwind utilities (border-soft / border-strong).
  # border-input stays inside the .hand-drawn-input component class.
  border-soft: "rgba(45, 45, 45, 0.10)" # card edges, dividers (most common)
  border-input: "rgba(45, 45, 45, 0.20)" # form fields (1.5px) — .hand-drawn-input
  border-strong: "#2d2d2d" # hero images, contact/about panels (2px)

typography:
  families:
    body: "Patrick Hand" # hand-lettered sans — body, UI, buttons, inputs
    heading: "Kalam" # hand-lettered weight 700 — headings only
  base:
    size: "18px"
    line-height: "1.6"
  wrapping:
    headings: "balance"
    body: "pretty"
  smoothing: "antialiased (-webkit + -moz)"
  scale: # Tailwind utility sizes actually in use; do not invent new steps
    heading-xl: "text-7xl" # hero h1 (lg)
    heading-lg: "text-5xl" # hero h1 (base), section h2 (lg)
    heading-md: "text-4xl" # section h2 (base), page h1
    heading-sm: "text-3xl" # feature h3, footer brand
    heading-xs: "text-2xl" # card h2 (Projects, About story)
    body-lg: "text-xl" # hero subtitle, lead paragraphs
    body-md: "text-base" # default UI, nav, buttons
    body-sm: "text-sm" # meta, tech chips, captions

shape:
  radius:
    card: "4px"
    button: "4px"
  # One radius scale: 4px everywhere. No wobbly/blobby corners.

space:
  base_unit: "4px"
  page_max_width: "80rem"
  page_padding_x: "6" # tailwind units (24px) — prefer for new work
  page_padding_x_legacy: "4" # older pages use px-4; do not mix within a section
  section_vertical: "py-24 lg:py-32"

shadow:
  soft: "0 1px 2px rgba(45,45,45,.04), 0 4px 12px rgba(45,45,45,.06)"
  soft-hover: "0 2px 4px rgba(45,45,45,.06), 0 8px 20px rgba(45,45,45,.08)"
  # Tinted to the ink hue. Never pure-black on warm paper.

motion:
  library: "framer-motion (LazyMotion + domAnimation, MotionConfig reducedMotion=user)"
  easing: "[0.16, 1, 0.3, 1]" # soft expo-out — the only easing allowed
  durations:
    hero_reveal: "0.6s"
    scroll_reveal: "0.5s"
    micro_hover: "0.15s"
  stagger_max_delay: "0.2s"
  reduced_motion: "global kill in index.css (≈0ms)"
  # Principle: motion only when it clarifies a change. Often 0ms is best.

components:
  button:
    class: ".hand-drawn-button"
    radius: "var(--radius-button)"
    border: "1.5px solid var(--color-border-strong)"
    hover: "background accent, color paper"
    active: "translateY(1px)"
  card:
    class: ".hand-drawn-card"
    radius: "var(--radius-card)"
    border: "1px solid var(--color-border-soft)"
    shadow: "var(--shadow-soft)"
    hover_shadow: "var(--shadow-soft-hover)"
  input:
    class: ".hand-drawn-input"
    radius: "var(--radius-button)"
    border: "1.5px solid var(--color-border-input)"
    focus: "border focus, glow focus-soft"

icons:
  ui: "lucide-react"
  brand: "react-icons (fa / fa6)"
  # Do not pull from a third set — breaks visual consistency.

a11y:
  skip_link: "App.tsx — keep visible-on-focus"
  focus_ring: "outline 3px solid var(--color-focus), offset 3px"
  contrast_floor: "WCAG AA. Muted-on-background is the borderline pair — ≥18px only."
```

---

## Why block

> The intent behind the tokens. If you find yourself disagreeing with one
> of these, read this section first — the answer is probably here.

### Direction in one paragraph

Warm paper, hand-lettered ink, one restrained accent. The vibe is a
well-kept notebook from a quiet studio — not a glossy SaaS landing page.
This is what taste-skill §4.2 ("max 1 accent, saturation < 80%") and
§4.4 ("pick one corner-radius scale and stick to it") gave us; do not
revert to the old post-it/yellow/red vocabulary.

### ⚠️ The rule of one source

**The source of truth for design tokens is [`src/index.css`](./src/index.css)
`@theme`. [`tailwind.config.js`](./tailwind.config.js) is intentionally
minimal** — it carries only the font-family aliases and the 18px body
base, because those are awkward to express purely in `@theme`. Every
color, radius, and shadow lives in `@theme` and resolves as a
first-class Tailwind utility (`bg-background`, `text-muted`, etc.).

- ✅ **Use** any token in the Token block above. They are all defined in
  `index.css` `@theme`.
- ❌ **Don't re-introduce** removed keys (`bg-post-it`, `tape`,
  `rounded-wobbly*`, `shadow-hand-drawn*`, `animate-jiggle`,
  `text-secondary-accent-light`, `bg-chart-*`, the old
  `primary`/`secondary`/`destructive` hex values). They were deleted on
  purpose — see the changelog comment in `tailwind.config.js` and drift
  fix #1 below. Re-adding one breaks the single-source contract this
  file exists to enforce.

### Color

**One accent.** Burnt sienna `#b6553a` is the only "brand" color. The
four steps (`accent` / `accent-hover` / `accent-active` / `accent-soft`)
encode interaction state so you don't invent new hexes for hover/press —
which was previously a vector for drift.

**Focus is a different hue.** `--color-focus` (`#2d5da1`, a calm blue)
exists _only_ for outlines and input focus glows. This is deliberate:
when a user tabs through the site, focus should read as "system
feedback," not as "brand color." Don't use it as a fill or a link color.

**No pure black or pure white.** Ink is `#2d2d2d`, paper is `#fdfbf7`.
Pure black on warm paper reads as a punched hole; pure white reads as
printer paper, breaking the warm-notebook metaphor.

**No post-it yellow, no bright red.** If you see `#fff9c4`, `#ff4d4d`,
or `--color-post-it`, that's the old palette — reject it.

**`muted` is borderline.** `#6e6960` on `#fdfbf7` passes WCAG AA only at
≥18px (≈4.5:1). It's fine for subtitles and lead paragraphs (which are
`text-xl`+), **never for body copy or small meta text** — for those, use
`text-foreground` directly.

**Light theme only — on purpose.** A dark mode would force rethinking
the warm-paper metaphor (what's "warm paper" in dark — warm black? that
reads as dingy, not calm). The notebook identity lives in the light
surface. If a dark mode ever becomes a real requirement, treat it as a
new design project, not a token swap.

**No P3/OKLCH today.** All our colors fit comfortably in sRGB and the
site doesn't lean on saturated primaries. Adding `oklch()` fallbacks
would be premature complexity. Revisit only if we add a saturated
illustration or brand mark that visibly clips on wide-gamut displays.

### Typography

Two Google Fonts, loaded in [`index.html`](./index.html). No third font
— ever.

- **Patrick Hand** is the default voice (body, UI, buttons, inputs).
- **Kalam** weight 700 is for headings only.

The hand-lettered character of the type _is_ the brand identity. That's
why we don't reach for blobby corners or jitter animation to fake
"playful" — the type already does that work, and adding more would make
it read as try-hard.

Body base `18px` / `1.6` line-height is large for a marketing site. That
matches our casual-puzzle audience (long sessions, less density needed)
and the wide hand-lettered shapes (which need more vertical room than a
condensed grotesque).

`text-wrap: balance` on headings and `pretty` on paragraphs is set
globally — keep it; it prevents the worst orphans without manual
intervention.

### Shape

**One radius scale: 4px everywhere** (`card` and `button` are the same).
Do **not** reintroduce `wobbly`, `255px 15px 225px ...`, or any freehand
blobby corner. The hand-drawn character now lives in the _lettering_ and
the _imperfection of rotation_ (see Components), not in blobby shapes.

Three border weights encode how loud the edge is:

- `border-soft` (`black/10`, 1px) — the default for cards and dividers.
  The edge should whisper; the content should speak.
- `border-input` (`black/20`, 1.5px) — form fields only, slightly louder
  so the affordance is unmissable.
- `border-strong` (`#2d2d2d`, 2px) — used sparingly for hero images and
  the contact/about panels, where the page wants a framed-photo feel.

### Motion

> Principle, borrowed from Geist: **motion only when it clarifies a
> change. Often 0ms is the best choice.**

Easing is always `[0.16, 1, 0.3, 1]` (a soft expo-out). Don't mix in
`ease-in-out` or bouncy springs — they break the calm tone.

Stagger by `delay`, not by chained animations. Keep delays ≤ `0.2s`.

`prefers-reduced-motion: reduce` collapses everything to ~0ms — already
handled globally in `index.css`. Don't override it per-component.

**No `jiggle`.** The old `animate-jiggle` (rotate ±1deg loop) is
retired; it reads as hyperactive, not calm.

### Components

Defined in `@layer components` of `index.css`:

| Class                | Use for                     |
| -------------------- | --------------------------- |
| `.hand-drawn-button` | primary & secondary buttons |
| `.hand-drawn-card`   | project cards, info panels  |
| `.hand-drawn-input`  | form fields                 |

**Always prefer these classes over re-deriving the same styles.** If you
need a variant (e.g. a destructive button), extend via `cva` in
[`src/lib/utils.ts`](./src/lib/utils.ts), don't hand-roll a one-off.

Imperfection-as-character: cards on `/about` use small per-item
`rotate(-0.8deg … 0.9deg)` via inline `style`. This is the only sanctioned
"hand-drawn" gesture beyond the type — keep rotations subtle and
asymmetric.

### Accessibility floor

- Skip-to-content link in [`App.tsx`](./src/App.tsx) — keep it.
- Focus ring: `outline: 3px solid --color-focus`, `outline-offset: 3px`.
  Never `outline: none` without replacing it.
- All non-decorative `<img>` carry alt text; decorative stacks use
  `alt=""`.
- Color contrast: foreground/background pairs all clear WCAG AA. The
  `--color-muted` on `--color-background` pair is the borderline one —
  fine at ≥18px, avoid for small text.

### Voice parallels

Geist's voice rules ("verb+noun naming", "never say 'successfully'",
"no marketing words") apply equally to **UI copy and headings** here,
not just docs. See `PRODUCT.md` › Voice & tone for the do/don't table.

---

## Known drift to fix (tech debt, not blocking new work)

These are the live gaps between the Tailwind config and the true tokens
in `index.css`. Anyone doing a cleanup pass should tackle them:

1. ~~**`tailwind.config.js`** still defines: `primary #ff4d4d`,
   `accent #ff4d4d`, `destructive #ff4d4d`, `secondary #2d5da1`,
   `post-it #fff9c4`, `tape`, `chart.*`, `rounded-wobbly*`,
   `shadow-hand-drawn*`, `animate-jiggle`.~~ **RESOLVED** — all stale
   keys removed; config now only carries `fontFamily` aliases and the
   `18px` body base (everything else lives in `@theme`). Verified by
   full build + compiled-CSS audit (`#c9c4b8` zero occurrences in the
   shipped `app-*.css`).
2. ~~**Promote the border intent tokens to `@theme`** so `border-soft` /
   `border-strong` resolve as first-class Tailwind utilities instead of
   being written inline as `border-black/10` / `border-2 border-border`.~~
   **RESOLVED** — `--color-border-soft` and `--color-border-strong` now
   live in `@theme`; all 12 inline references across Header, Footer,
   CtaFooterSection, FeaturesSection, App skip-link, About, BlogPost,
   Contact, and ProjectDetail migrated to `border-border-soft` /
   `border-border-strong`. Three decorative `outline-black/10` and one
   avatar `border-background` were intentionally left inline — they're
   not border-weight intent tokens.
3. ~~**`src/components/common/HeroSection.tsx`** is an older generic hero
   not currently routed anywhere.~~ **RESOLVED** — deleted; it had zero
   importers (`Home.tsx` uses `HeroSectionNiceUI` from the magicpath
   directory, not this file).
4. ~~**`/projects` page** still uses `bg-gradient-to-br from-[#f6f1e8] to-muted`
   — the `to-muted` half resolves to the stale Tailwind
   `muted` (`#c9c4b8`).~~ **RESOLVED** — the inline `#f6f1e8` hex was
   replaced with `from-surface-warm` (on both `/projects` and
   `/projects/:slug`); the `to-muted` half now resolves to the `@theme`
   `--color-muted` (`#6e6960`) since the stale config `muted` was
   removed in fix #1. No inline `#f6f1e8` hexes remain in `src/`.

---

## When you change this file

Design tokens are constraints, not suggestions. If you add a color,
radius, or motion pattern here, you are committing the whole site to it —
update `index.css` in the same change and audit existing components for
drift. The Token block and `index.css`'s `@theme` must always agree.
