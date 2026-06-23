# PRODUCT.md

> Single source of truth for **what this site is, who it's for, and how it
> should sound**. Read this before designing or writing any page.
> Pairs with [`DESIGN.md`](./DESIGN.md) (the visual system).

## What this is

**VeryFun Company** — the marketing site for a one-team indie mobile-game
studio. Not a storefront, not a docs portal, not a community. The site's
entire job is to send people to **Google Play** with enough trust and
context that they download.

- Live URL: <https://cookabc.github.io/>
- Delivery: SSG (vite-react-ssg) → static `dist/` → GitHub Pages
- Routing: `createHashRouter` (`/#/...`), so every route is one file

## The product line (6 games, all on Google Play)

Every game shares one design principle: **respect the player's time** — no
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

## Who it's for

**Primary:** Casual puzzle players on Android. They want a 5-minute
coffee-break game that doesn't nickel-and-dime them. They arrive from
Google search ("free offline sudoku") or a Google Play listing and want to
confirm "is this legit, is it actually free, does it work offline" in under
10 seconds.

**Secondary:** Potential collaborators / press / players reaching out
about a specific title. They hit `/contact`.

**Not the audience:** Hardcore gamers, PC/console players, investors.
Don't optimize pages for them.

## What the site must do (ranked)

1. **Get each visitor to a Google Play listing.** Every game card, every
   CTA, every project-detail page ultimately points at `googlePlayUrl`.
2. **Answer the four questions a casual player asks before downloading**:
   Is it free? Does it work offline? Is there a timer? Is it suitable for
   my skill/age? — these live verbatim in each game's FAQ and `answer`
   fields.
3. **Establish the studio's voice** in ~3 scrolls of the home page: indie,
   calm, anti-paywall, anti-timer.
4. **Be discoverable via search** (SEO/SSG/JsonLd already wired — see
   [`scripts/generate-seo.ts`](./scripts/generate-seo.ts)).

## Voice & tone

| Do                                               | Don't                                        |
| ------------------------------------------------ | -------------------------------------------- |
| "Calm puzzles, crafted with care."               | "Unleash epic brain-blasting challenges!"    |
| "No paywalls, no timers."                        | "Freemium with optional IAPs."               |
| "Respect the player's time."                     | "Maximize engagement and retention."         |
| Concrete details: "200+ levels", "works offline" | Vague hype: "best-in-class", "revolutionary" |
| Short sentences, warm register                   | Marketing-speak, exclamation marks           |

**Tone in one line:** the quiet confidence of a studio that would rather
you enjoy one of their games than read ten paragraphs about it.

## Page map

| Route             | Purpose                                           | CTA                                   |
| ----------------- | ------------------------------------------------- | ------------------------------------- |
| `/`               | Hook + lineup overview                            | "Explore the games" → `/projects`     |
| `/about`          | Studio story, values, tech stack                  | "Explore our games" → `/projects`     |
| `/projects`       | All 6 games with key art                          | Per-game "View Details" → detail page |
| `/projects/:slug` | One game deep-dive (features, FAQ, `answer`)      | Google Play button                    |
| `/blog`           | (Stub — currently empty, see `src/content/blog/`) | —                                     |
| `/blog/:id`       | (Stub)                                            | —                                     |
| `/contact`        | Email / GitHub / X + mailto form                  | mailto                                |

## Non-goals (explicit)

- **Not** an in-browser game host. Games live on Google Play.
- **Not** an account/login surface.
- **Not** a press kit or investor deck (could be added later — keep the
  `/about` page uncluttered in the meantime).
- **Not** a multi-language site (English only for now).

## When you change this file

Any product decision above is a **constraint on design**, not a footnote.
If you change the audience or the non-goals, re-read `DESIGN.md` and check
the visual language still fits.
