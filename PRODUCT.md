# Product

> Single source of truth for what this site is, who it serves, and how it should
> sound. Pair with [DESIGN.md](./DESIGN.md), which documents the visual system
> implemented in [src/index.css](./src/index.css).

## Register

brand

## What This Is

**VeryFun Company** is the marketing site for a small independent mobile-game
studio. It is a brand and catalog surface, not a storefront, account product,
docs portal, or in-browser game host. Its primary job is to help visitors choose
one of the studio's Android puzzle games and continue to Google Play.

- Live URL: <https://cookabc.github.io/>
- Delivery: React Router framework mode with `ssr: false` and prerendered
  routes, built to `build/client/` for GitHub Pages and Vercel.
- Source of truth for game content: [src/data/games.ts](./src/data/games.ts)
- Source of truth for blog content: [src/data/blog.ts](./src/data/blog.ts)

## Product Line

The catalog currently contains six Google Play games. They share a studio
promise: clear boards, short sessions, no timers where they do not belong, and no
paywall that blocks progress.

| Game                | What It Is                   | Player Promise                        |
| ------------------- | ---------------------------- | ------------------------------------- |
| Classic Sudoku 2026 | 9x9 number logic             | Calm deduction, smart hints, no timer |
| Tile Journey        | 3D tile matching             | Mindful matching across themed levels |
| Word Search Block   | Themed word search           | Vocabulary play with a gentle curve   |
| Arrow Out           | Directional tile logic       | Minimal rules, sharp move planning    |
| Pearl Coloring      | Color sorting into pixel art | Soft sorting with creative payoff     |
| Bubble Shoot        | Bubble shooter               | 200+ levels, beatable without paying  |

## Users

**Primary:** Android casual-puzzle players choosing a quick download. They arrive
from search, a Google Play listing, or a shared link and want to answer the
decision in seconds: what is the game, is it free, is it fair, does it fit a
short break, and where do I download it?

**Secondary:** players, collaborators, press, or partners who want studio context
or a direct contact route.

**Not the audience:** hardcore PC/console gamers, investor audiences, or people
looking to play games inside the browser.

## Product Purpose

The site succeeds when it:

1. Sends visitors to Google Play with enough context to download confidently.
2. Makes each game understandable from screenshots, one-sentence positioning,
   feature lists, and FAQ answers.
3. Establishes the studio's point of view in one short visit: calm games, clear
   boards, bright logic, no noisy extraction loop.
4. Preserves SEO and structured data for the catalog, blog, FAQs, and app detail
   pages.

## Brand Personality

The current identity is **calm, precise, and luminous**.

The voice is a small studio that cares about puzzle feel more than hype. It can
use vivid language when describing the visual system, but product claims stay
plain and concrete.

| Do                                                | Don't                                        |
| ------------------------------------------------- | -------------------------------------------- |
| "Six quiet mobile puzzles for spare attention."   | "Epic brain games that will blow your mind." |
| "No timers, no paywalls, no forced streaks."      | "Maximize engagement and retention."         |
| "Readable boards, calm feedback, quick sessions." | "Best-in-class puzzle entertainment."        |
| "Every level beatable without paying."            | "Optional monetization mechanics."           |

## Design Principles

1. **Make the game visual first.** Screenshots and key art are the proof. Never
   replace product imagery with generic decoration.
2. **Respect spare attention.** Pages should scan quickly, with direct CTAs to
   `/games`, game detail pages, and Google Play.
3. **Let contrast carry the brand.** The live identity is dark, crisp, and
   electric: near-black stage, warm off-white type, acid-green action.
4. **Keep claims concrete.** Prefer "200+ levels", "works offline", "no timer",
   and "free on Google Play" over broad quality adjectives.
5. **Motion clarifies, then gets out of the way.** WebGL atmosphere and page
   transitions can create presence, but game comprehension and performance win.

## Accessibility & Inclusion

- WCAG AA is the minimum for text contrast and interactive states.
- Casual puzzle players may be on small phones, older hardware, or bright ambient
  light. Use large readable type, clear tap targets, and strong foreground/background contrast.
- The site already uses visible focus states, a skip link, semantic routes, image
  dimensions, and `MotionConfig reducedMotion="user"`. Keep those intact.
- Hero WebGL must remain decorative and optional. The CSS fallback in
  `.hero-canvas-fallback` is part of the product experience, not an afterthought.

## Page Map

| Route          | Purpose                                   | Primary Action                             |
| -------------- | ----------------------------------------- | ------------------------------------------ |
| `/`            | Brand hook and newest-game focus          | Explore games / Google Play developer page |
| `/games`       | Interactive catalog for all six games     | Per-game detail or Google Play             |
| `/games/:slug` | Game-specific brief, FAQ, structured data | Google Play                                |
| `/blog`        | Studio notes index                        | Open a note                                |
| `/blog/:id`    | Long-form production/design note          | Read context                               |
| `/about`       | Studio values and latest work             | See games / contact                        |
| `/contact`     | Email, GitHub, and X routes               | Email the studio                           |

## Non-Goals

- Do not host playable web versions of the games.
- Do not add login, account, or community surfaces.
- Do not make the site feel like a generic mobile-game ad funnel with fake
  urgency, autoplay chaos, star-rating theater, or limited-time pressure.
- Do not revert to the old warm notebook design without treating it as a new
  brand redesign decision.
- Do not add dark/light theme switching casually. The current brand is built
  around a dark luminous stage.
