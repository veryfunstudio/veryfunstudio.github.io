# Design: Replace placeholder games with real Play Store titles

Date: 2026-06-21
Status: Draft — awaiting user review

## 1. Goal

Replace the four fictional games in `src/data/projects.ts`
(Joy Adventure / Pixel Dungeon / Space Exploration / Magic Farm) with the
six real Google Play titles published by the studio:

| #   | Package ID                       | Working slug         | Play Store URL                                                               |
| --- | -------------------------------- | -------------------- | ---------------------------------------------------------------------------- |
| 1   | `com.codex.sudokumobilegame`     | `sudoku-mobile-game` | https://play.google.com/store/apps/details?id=com.codex.sudokumobilegame     |
| 2   | `com.veryfun.tilejourney`        | `tile-journey`       | https://play.google.com/store/apps/details?id=com.veryfun.tilejourney        |
| 3   | `com.cookabc.zenwordsearch`      | `zen-word-search`    | https://play.google.com/store/apps/details?id=com.cookabc.zenwordsearch      |
| 4   | `com.veryfuncompany.kittyescape` | `kitty-escape`       | https://play.google.com/store/apps/details?id=com.veryfuncompany.kittyescape |
| 5   | `com.veryfun.pearlcoloring`      | `pearl-coloring`     | https://play.google.com/store/apps/details?id=com.veryfun.pearlcoloring      |
| 6   | `com.veryfuncompany.bubble`      | `bubble-shooter`     | https://play.google.com/store/apps/details?id=com.veryfuncompany.bubble      |

The final slugs will reflect each game's actual Play Store title once fetched
(the values above are working defaults; concrete decision is made during
implementation after WebFetch).

## 2. Approach

**One-shot scraping (Approach A from brainstorming):**

1. For each of the six Play Store URLs, use the `WebFetch` tool to extract:
   - Display title
   - Short / long description
   - First feature graphic URL and first screenshot URL
   - Icon URL (square)
   - Released date (from "Released on")
   - Primary category (Puzzle, Casual, etc.)
2. Download two image assets per game via `curl` into `public/images/`:
   - `public/images/<slug>-icon.webp` — square icon (~256×256)
   - `public/images/<slug>.webp` — main feature graphic / hero screenshot
3. Hand-curate `description`, `fullDescription`, and `features` from the
   official Play Store copy, matching the site's playful tone.
4. Write all six entries into `src/data/projects.ts`, expand the `Project`
   interface, and update consumers.

No new runtime or build dependencies. No scraper libraries.

## 3. Data model changes

`Project` interface (in `src/data/projects.ts`) gains three fields and
renames one:

```ts
export interface Project {
  id: number;
  packageId: string; // NEW — e.g. "com.codex.sudokumobilegame"
  title: string;
  description: string; // 1–2 sentences, used on cards
  fullDescription: string; // 4–6 sentence paragraph for detail page
  icon: string; // NEW — square icon path
  image: string; // hero / feature graphic path
  technologies: string[]; // Semantics shift: tags like ["Android", "Puzzle", "Casual", "Offline"]
  features: string[]; // 5–6 bullets distilled from Play Store copy
  releaseDate: string;
  slug: string;
  googlePlayUrl: string; // RENAMED from externalLink
  rotation: number; // existing visual jitter, kept
}
```

Reasoning:

- `packageId` enables future tooling (sitemap, badges) and is the only stable
  Play Store identifier.
- `icon` is separate from `image` because cards/detail headers benefit from a
  small square mark in addition to the wide hero.
- `technologies` is reused (not renamed) to minimize churn in
  `Projects.tsx` / `ProjectDetail.tsx`. The values become genre/platform tags
  like `["Android", "Puzzle", "Offline"]`. Field renaming would touch two
  more files for no semantic gain.
- `externalLink` → `googlePlayUrl` clarifies intent and surfaces the change
  in TypeScript errors so no consumer is missed.

## 4. File-by-file changes

| File                                                                                                                                                     | Change                                                                                                                                                                       |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/data/projects.ts`                                                                                                                                   | Replace interface and PROJECTS array with 6 real entries.                                                                                                                    |
| `src/pages/ProjectDetail.tsx`                                                                                                                            | Use `googlePlayUrl`; CTA text → "Get on Google Play"; render `icon` next to the title; tweak alt text.                                                                       |
| `src/pages/Projects.tsx`                                                                                                                                 | No logic change — purely data-driven. Optional polish: show `icon` chip on each card.                                                                                        |
| `src/components/magicpath/features-section-with-alternating-layout/FeaturesSection.tsx`                                                                  | Expand `GAME_ICONS` from 4 to 6 lucide icons themed to the new games (Grid3x3, LayoutGrid, BookText, Cat, Palette, Circle).                                                  |
| `src/components/magicpath/hero-call-to-action-section/HeroSectionNiceUI.tsx`                                                                             | Replace hardcoded 4 image paths in avatar stack and 2×2 grid with 6 real game images; update "4 unique games" → "6 unique games"; lay the right grid out as 2 cols × 3 rows. |
| `src/components/magicpath/cta-banner-multi-column-footer/CtaFooterSection.tsx`                                                                           | No change — no hardcoded references.                                                                                                                                         |
| `public/images/Joy Adventure.jpeg`<br/>`public/images/Pixel Dungeon.jpeg`<br/>`public/images/Space Exploration.jpeg`<br/>`public/images/Magic Farm.jpeg` | Delete.                                                                                                                                                                      |
| `public/images/<slug>.webp` × 6                                                                                                                          | New — hero screenshots / feature graphics.                                                                                                                                   |
| `public/images/<slug>-icon.webp` × 6                                                                                                                     | New — square icons.                                                                                                                                                          |

Blog content (`src/content/blog`, `public/images/*Strategies*.jpeg` etc.) is
unaffected.

## 5. Detail page CTA

Replace this block in `ProjectDetail.tsx` (lines 124–134):

```tsx
<a
  href={project.externalLink}
  ...
>
  <ExternalLink size={18} />
  View Live Site
</a>
```

with:

```tsx
<a
  href={project.googlePlayUrl}
  target="_blank"
  rel="noopener noreferrer"
  aria-label={`Get ${project.title} on Google Play`}
  className="hand-drawn-button inline-flex items-center gap-2 bg-white px-8 py-3 font-patrick text-lg no-underline text-foreground"
>
  <ExternalLink size={18} />
  Get on Google Play
</a>
```

Icon stays as `ExternalLink` (lucide does not ship a Google Play glyph; the
button text carries the meaning).

## 6. Hero section layout

Right-side image grid currently shows four 2×2 cards. With six titles, the
spec is:

- 2-column × 3-row grid on `lg`, 2 cols × 3 rows on `sm`+; collapses to a
  single column on the smallest breakpoint.
- The "stack of avatars" (line 58 area) becomes 6 small overlapping circles
  using the icon assets; copy changes to "6 unique games crafted with love".
- Existing `rotate-*` decoration is reused with a fresh per-card pattern:
  `-rotate-2, rotate-1, rotate-1, -rotate-1, -rotate-1, rotate-2`.

## 7. Risks / open items

- **Play Store layout drift:** WebFetch parses the rendered page; if the
  layout changes drastically, extraction may need retries. Mitigation: the
  spec is fulfilled the moment data lands in `projects.ts`; we don't ship a
  recurring scraper.
- **Image hot-link policy:** We download into `public/images/` so we don't
  hot-link Google CDN. Files become part of the repo.
- **Image format / size:** Standardize on `.webp`. If a source asset is JPEG
  only, convert via `cwebp` (available on most macOS dev boxes; if missing,
  fall back to `.jpg` and note in the plan).
- **Title casing for slug:** Working slugs in §1 are placeholders until the
  Play Store title is fetched. Final slugs are decided during step 1 of
  implementation and recorded in the plan.

## 8. Out of scope

- Mass refactor of the Projects/Detail pages beyond the listed CTA and icon
  tweaks.
- Localization, i18n, or alternate-language Play Store data.
- Build-time data pipelines or recurring sync jobs (rejected as Approach B).
- Blog content updates.

## 9. Acceptance criteria

- `src/data/projects.ts` exports exactly 6 `Project` entries, one per
  package ID listed in §1, with all required fields populated (no TODOs).
- `npm run build` (or the project's TS check) passes.
- `public/images/` contains 12 new assets (6 icons + 6 hero images) and the
  4 old `.jpeg` placeholders are removed.
- Every `Get on Google Play` link in `ProjectDetail` opens the corresponding
  Play Store URL in a new tab.
- Hero section shows 6 game thumbnails (avatars + grid) and the "6 unique
  games" copy.
- No other page references the deleted placeholder names.
