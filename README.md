# veryfunstudio.github.io

This repo uses pnpm for local development. Deployment is fully automated via
GitHub Actions.

The live catalog and editorial content are defined in `src/data/games.ts` and
`src/data/blog.ts`.

## Branches

- `main`: application source code and the default development branch.
- `release`: published static site output. **Do not touch this branch manually**
  — it is force-pushed by CI on every `main` update.

## Setup

```bash
pnpm install
```

## Commands

```bash
pnpm run dev
pnpm run build
pnpm run check
pnpm og
pnpm baseline
pnpm run deploy   # local-only fallback; see "Deployment" below
```

- `pnpm run dev`: start the React Router dev server
- `pnpm run build`: prerender all routes via `react-router build`, then
  generate SEO/agent assets (robots.txt, sitemap.xml, llms.txt, llms-full.txt,
  a `.md` markdown variant per page, 404.html)
- `pnpm run check`: lint, typecheck, test, and build
- `pnpm og`: regenerate the home and per-game social cards when the art direction
  or game catalog changes
- `pnpm baseline`: refresh the desktop and mobile visual references after a build
- `pnpm run deploy`: build locally and publish `build/client/` to `release`.
  Only useful when CI is unavailable. Day-to-day, prefer pushing to `main`.

## Visual system

The entire site uses one studio system: warm ivory surfaces, deep green ink,
muted green game stages, and a restrained orange accent. Space Grotesk sets
headings, DM Sans handles reading text, Instrument Serif provides short title
accents, and DM Mono is reserved for small metadata.

- `src/index.css`: design tokens, type, buttons, focus states, and global layout.
- `src/studio-relaunch.css`: component layouts and the shared responsive rules.
- `PageIntro`, `NoteCard`, and `StudioCTA`: shared titles, journal cards, and calls
  to action across the home, catalog, journal, about, contact, and legal pages.
- Game and article detail pages use the same masthead, reading widths, FAQ rows,
  related cards, header, and footer. Retired workshop styles are no longer loaded.

Use the existing game imagery throughout the site. Do not add invented workplace
photography or redraw game pieces as generic decorative shapes. Asset origins
and SHA-256 checksums are recorded in `docs/game-asset-provenance.json`.

### Interactive home display

`HeroPlayObject.tsx` lazily loads `src/lib/play-object-scene.ts`. Nova Mahjong uses
six original `CompositeCropped` PNGs copied unchanged from the sibling
`021_MahjongJourney/H5` game client. Three.js adds depth and lighting around those
actual faces. Clicking, tapping, or pressing Enter/Space rearranges the display.

Tile Journey and Arrow Out currently use their existing verified key art on a
3D presentation card. These are labelled **Game artwork**, not gameplay. Replace
this mode only when verified game-specific source assets are available.

Animation stops after each interaction and while offscreen or the tab is hidden.
Reduced-motion mode applies changes immediately. Key art remains visible while
loading and after asset, WebGL, or context failures. GPU resources are disposed
when navigating away from the home page.

### Visual verification

Run `pnpm run check` for lint, types, existing tests, and production prerendering.
Review all main routes at 1440px and 390px, including the mobile menu, journal
links, game FAQs, and missing-resource states. Check actual game texture loading,
mouse/keyboard/touch interactions, and static fallbacks separately from layout.
Update `visual-baseline/` and social cards when the visual system changes.

## Deployment

Pushing to `main` triggers the **Deploy GitHub Pages** workflow
(`.github/workflows/deploy.yml`):

1. `actions/checkout` checks out `main`
2. `pnpm/action-setup` installs pnpm
3. `pnpm install --frozen-lockfile`
4. `pnpm run build` (`react-router build` → `scripts/generate-seo.ts`)
5. `peaceiris/actions-gh-pages` force-pushes `build/client/` to `release`

GitHub Pages serves `release` at https://veryfunstudio.github.io/. Concurrency is
limited to one in-flight deploy; newer pushes cancel earlier ones.

Vercel is wired via GitHub integration on the same `main` branch and remains a
non-canonical verification deployment using the same build command. Both deployments run from
identical source.

## Update dependencies

```bash
pnpm update
pnpm run build
```

## Standard workflow

```bash
git checkout main
git pull --rebase origin main

# make changes

git add .
git commit -m "Describe the change"
git push origin main
# CI builds and deploys automatically — watch with:
# gh run watch
```

If CI is broken or unavailable and you need to ship a hotfix:

```bash
pnpm run deploy
```

This bypasses CI by building locally and pushing `build/client/` to `release` directly.

## Routing note

The app uses React Router v8 Framework mode with static prerendering
(`ssr: false` + `prerender`), so every route is pre-rendered to its own
HTML file under `build/client/` (e.g. `build/client/about/index.html`,
`build/client/games/nova-mahjong/index.html`). GitHub Pages and Vercel
serve these directly — no client-side router boot is needed for first
paint. `scripts/generate-seo.ts` also copies the SPA fallback
(`build/client/__spa-fallback.html`) to `build/client/404.html` with a
`noindex` meta and a static markdown recovery body (links to llms.txt,
llms-full.txt, sitemap.xml, and the main sections). GitHub Pages serves it
with a real HTTP 404 status; agents and no-JS clients get the markdown site
map, and React removes the static block on hydration so deep links to unknown
paths still load the app shell.

## Agent-facing files

`src/lib/seo-content.ts` generates the machine-readable surface at build time:

- `robots.txt`, `sitemap.xml`
- `llms.txt` (site overview + "when to use this site" guidance) and
  `llms-full.txt` (complete catalog and blog in one file)
- a markdown variant per canonical page, served as `text/markdown` — append
  `.md` to any page path (home page: `/index.md`). Pages advertise their
  variant via `<link rel="alternate" type="text/markdown">` (see
  `src/components/seo/Seo.tsx`)

Keep page copy that feeds these files (`src/data/*`, `src/lib/constants.ts`)
accurate when editing; the generators are covered by `src/lib/seo-content.test.ts`.
