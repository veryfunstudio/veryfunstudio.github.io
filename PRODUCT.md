# Product

> Single source of truth for **what this site is, who it's for, and how it
> should sound**. Read this before designing or writing any page.
> Pairs with [`DESIGN.md`](./DESIGN.md) (the visual system).

## Register

brand

## What this is

**VeryFun Company** is the marketing site for a one-team indie mobile-game
studio. Not a storefront, not a docs portal, not a community. The site's
entire job is to send people to **Google Play** with enough trust and
context that they download.

- Live URL: <https://cookabc.github.io/>
- Delivery: SSG (React Router v7 Framework mode, `ssr: false` + `prerender`)
  → static `build/client/` → GitHub Pages + Vercel
- Routing: React Router pre-renders every route to its own HTML file
  under `build/client/` (`/about`, `/games/:slug`, etc.); GitHub Pages
  and Vercel serve them directly, with `build/client/404.html` (a copy of
  the SPA fallback with `noindex`) as an SPA fallback for unknown paths

## The product line (6 games, all on Google Play)

Every game shares one design principle: **respect the player's time** - no
paywalls blocking progress, no timers, no pressure. Source of truth:
[`src/data/projects.ts`](./src/data/projects.ts).

| Game                | What it is                                  | Tone                 |
| ------------------- | ------------------------------------------- | -------------------- |
| Classic Sudoku 2026 | Calming 9×9 logic, smart hints, no timer    | Quiet brain-training |
| Tile Journey        | 3D match-three across themed worlds         | Mindful expedition   |
| Word Search Block   | Themed word-search, gentle difficulty curve | Peaceful vocabulary  |
| Arrow Out           | Arrow-tile logic, every move matters        | Minimal & sharp      |
| Pearl Coloring      | Color-sort reveals pixel art                | Soft & creative      |
| Bubble Shoot        | 200+ levels, fully beatable free            | Generous classic     |

## Users

**Primary:** Casual puzzle players on Android. They want a 5-minute
coffee-break game that doesn't nickel-and-dime them. They arrive from
Google search ("free offline sudoku") or a Google Play listing and want to
confirm "is this legit, is it actually free, does it work offline" in under
10 seconds. Context: a phone, a spare moment, a low-stakes decision.

**Secondary:** Potential collaborators / press / players reaching out
about a specific title. They hit `/contact`.

**Not the audience:** Hardcore gamers, PC/console players, investors.
Don't optimize pages for them.

## Product Purpose

Get each visitor to a Google Play listing. Concretely, the site must:

1. **Send each visitor to a Google Play listing.** Every game card, every
   CTA, every project-detail page ultimately points at `googlePlayUrl`.
2. **Answer the four questions a casual player asks before downloading**:
   Is it free? Does it work offline? Is there a timer? Is it suitable for
   my skill/age? - these live verbatim in each game's FAQ and `answer`
   fields.
3. **Establish the studio's voice** in ~3 scrolls of the home page: indie,
   calm, anti-paywall, anti-timer.
4. **Be discoverable via search** (SEO/SSG/JsonLd already wired - see
   [`scripts/generate-seo.ts`](./scripts/generate-seo.ts)).

## Brand Personality

Warm. Quiet. Anti-hype.

The studio's voice in one line: the quiet confidence of a studio that
would rather you enjoy one of their games than read ten paragraphs about
it.

| Do                                               | Don't                                        |
| ------------------------------------------------ | -------------------------------------------- |
| "Calm puzzles, crafted with care."               | "Unleash epic brain-blasting challenges!"    |
| "No paywalls, no timers."                        | "Freemium with optional IAPs."               |
| "Respect the player's time."                     | "Maximize engagement and retention."         |
| Concrete details: "200+ levels", "works offline" | Vague hype: "best-in-class", "revolutionary" |
| Short sentences, warm register                   | Marketing-speak, exclamation marks           |

The visual identity is a **well-kept notebook from a quiet indie studio**:
warm paper, hand-lettered ink (Patrick Hand + Kalam), one restrained
burnt-sienna accent, 4px corners, soft tinted shadows. Not a glossy SaaS
landing page. (Full token system in [`DESIGN.md`](./DESIGN.md).)

## Anti-references

- **Mobile-game F2P marketing pages** - autoplay video banners, fake
  review stars, urgent "Limited time!" CTAs, neon gradient buttons,
  star-rating popups. The whole genre reads as extractive; we are the
  opposite.
- **Generic SaaS landing pages** - centered hero over dark mesh, three
  identical feature cards, "trusted by" logo wall, pricing table. This is
  not a SaaS product and the template would mis-signal it.
- **The studio's own old palette** - post-it yellow + bright red + wobbly
  blobby corners. It read as cartoonish; the current notebook identity is
  the deliberate correction. Don't revert (see DESIGN.md drift #1).
- **AI-default premium-consumer palettes** - cream/sand/paper backgrounds
  with brass/oxblood/ochre accents. The current warm-paper + burnt-sienna
  is documented as a brand choice, but the instinct to "soften it toward
  beige" is exactly the cross-project monoculture move to resist.

## Design Principles

1. **Respect the player's time - in the design too.** If the site makes
   a casual player scroll, read, or click more than necessary to reach a
   Play listing, it has failed. Density serves the visitor, not the
   studio's ego.
2. **Show, don't tell.** Concrete game screenshots, real feature lists,
   real FAQ answers beat adjectives. Never write "best-in-class" when you
   can write "200+ levels, works offline".
3. **Calm by construction.** Motion clarifies change; it doesn't decorate.
   One accent color, one radius scale, one easing curve. The hand-lettered
   type already carries the personality - don't pile on.
4. **One source of truth for the visual system.** `DESIGN.md`'s Token
   block mirrors `src/index.css` `@theme`. When they disagree, the
   Token block wins and the prose updates. No inline hexes, no
   one-off radii.
5. **Accessibility is the floor, not a feature.** WCAG AA contrast,
   keyboard reachability, focus rings, reduced-motion, alt text -
   non-negotiable on every page.

## Accessibility & Inclusion

- **WCAG AA** is the floor for color contrast. Body text targets AAA where
  practical. The known borderline pair is `--color-muted` (#6e6960) on
  `--color-background` (#fdfbf7): passes AA only at ≥18px, so muted is
  reserved for subtitles and lead paragraphs, never body copy or small
  meta text.
- **Keyboard reachability.** Skip-to-content link on every page; visible
  focus ring (`outline: 3px solid --color-focus`, offset 3px); never
  `outline: none` without a replacement.
- **Reduced motion.** A global `prefers-reduced-motion: reduce` block in
  `index.css` collapses all transitions/animations to ~0ms. Don't override
  it per-component. The framer-motion `MotionConfig reducedMotion="user"`
  at the app root is the runtime backstop.
- **Images.** All non-decorative `<img>` carry descriptive alt text;
  decorative avatar stacks use `alt=""`. Width + height attributes prevent
  CLS.
- **Audience consideration.** Casual puzzle players skew older and to
  lower-spec Android hardware; design for legibility on small screens,
  low contrast tolerance, and slow connections (SSG + WebP assets + no
  client-side data fetching).

## Page map

| Route             | Purpose                                      | CTA                                   |
| ----------------- | -------------------------------------------- | ------------------------------------- |
| `/`               | Hook + lineup overview                       | "Explore the games" → `/projects`     |
| `/about`          | Studio story, values, tech stack             | "Explore the games" → `/projects`     |
| `/projects`       | All 6 games with key art                     | Per-game "View Details" → detail page |
| `/projects/:slug` | One game deep-dive (features, FAQ, `answer`) | Google Play button                    |
| `/blog`           | Blog index                                   | Per-post link                         |
| `/blog/:id`       | One blog post                                | -                                     |
| `/contact`        | Email / GitHub / X + mailto form             | mailto                                |

## Non-goals (explicit)

- **Not** an in-browser game host. Games live on Google Play.
- **Not** an account/login surface.
- **Not** a press kit or investor deck (could be added later - keep the
  `/about` page uncluttered in the meantime).
- **Not** a multi-language site (English only for now).
- **Not** a dark-mode site. Light theme only - the notebook identity
  lives in the warm paper surface. A dark mode would be a new design
  project, not a token swap.

## When you change this file

Any product decision above is a **constraint on design**, not a footnote.
If you change the audience, the anti-references, or the non-goals,
re-read `DESIGN.md` and check the visual language still fits.
