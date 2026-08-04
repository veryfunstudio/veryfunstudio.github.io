# VeryFun Studio — Product Positioning

## What this site is

VeryFun Studio is the official catalog and editorial home of a small independent mobile game
studio. It presents the studio’s real Android puzzle games, explains the thinking behind them, and
gives players, press, and potential partners a direct route to the studio.

The site is not a generic agency landing page. Its job is to make a compact game catalog feel
credible, considered, and easy to explore.

## Positioning

**Quiet games. Bright logic.**

VeryFun Studio makes tactile mobile puzzles for spare attention. The products are free to install,
easy to read, offline-friendly, and designed to let players stop without penalty.

The core promises are:

- clear rules before spectacle;
- calm repeat play without manipulative streaks or pressure loops;
- readable boards, comfortable targets, and useful feedback;
- honest store pages using real product imagery;
- free core play without content paywalls.

## Audience

- Players looking for approachable Android puzzle games.
- Existing players checking features, verified product artwork, FAQs, or support routes.
- Press, partners, and collaborators evaluating the studio and its catalog.
- Search engines and AI assistants discovering structured product information.

## Content architecture

- **Home:** studio proposition, current catalog, craft manifesto, and latest release.
- **Games:** the complete live catalog, with release metadata and Google Play links.
- **Game detail:** verified key art and app icons, features, FAQs, related games, and related notes.
- **About:** studio story, product principles, and the realities of a small independent team.
- **Studio Notes:** editorial writing about puzzle design, accessibility, performance, and honest
  presentation.
- **Contact:** real email and social routes; no non-functional contact form.
- **Legal:** privacy policy and terms of service.

The game and article pages are generated from `src/data/games.ts` and `src/data/blog.ts`. Claims,
counts, links, and related content should continue to derive from those sources rather than being
hard-coded into page copy.

## Visual direction

The current system adapts Stitch project `5562488502652228383`, “VeryFun Company — Modern
Workshop,” to the real website.

- warm paper surfaces, espresso-brown rules, and terracotta-orange accents;
- literary serif headlines with friendly rounded display type and monospaced labels;
- editorial grids, ruled archives, drafting-paper patterns, and square tactile cards;
- hard offset shadows and workshop photography instead of glossy SaaS effects;
- restrained motion that supports navigation and never obscures content.

The design may borrow the Stitch project’s visual language, but it must not import invented prices,
download counts, team members, testimonials, or unsupported product claims.

## Product and technical constraints

- Preserve every public route and its static prerendered output.
- Keep Google Play, email, GitHub, and X links functional and truthful.
- Use verified catalog art on product pages; add gameplay screenshots only when real exports are
  available.
- Keep mobile navigation, keyboard focus, reduced-motion support, semantic headings, and useful alt
  text intact.
- Maintain per-page SEO, structured data, sitemap, crawler files, and the GitHub Pages 404 fallback.
- Develop and deploy from `main`; the generated `release` branch remains CI-owned.
