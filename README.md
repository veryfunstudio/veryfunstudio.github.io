# cookabc.github.io

This repo uses Bun for local development. Deployment is fully automated via
GitHub Actions.

## Branches

- `source`: application source code. **This is where you commit.**
- `main`: published static site output. **Do not touch this branch manually**
  — it is force-pushed by CI on every `source` update.

## Setup

```bash
bun install
```

## Commands

```bash
bun run dev
bun run build
bun run deploy   # local-only fallback; see "Deployment" below
```

- `bun run dev`: start the React Router dev server
- `bun run build`: prerender all routes via `react-router build`, then
  generate SEO assets (robots.txt, sitemap.xml, llms.txt, 404.html)
- `bun run deploy`: build locally and publish `build/client/` to `main`.
  Only useful when CI is unavailable. Day-to-day, prefer pushing to
  `source`.

## Deployment

Pushing to `source` triggers the **Deploy GitHub Pages** workflow
(`.github/workflows/deploy.yml`):

1. `actions/checkout` checks out `source`
2. `oven-sh/setup-bun` installs Bun
3. `bun install --frozen-lockfile`
4. `bun run build` (`react-router build` → `scripts/generate-seo.ts`)
5. `peaceiris/actions-gh-pages` force-pushes `build/client/` to `main`

GitHub Pages serves `main` at https://cookabc.github.io/. Concurrency is
limited to one in-flight deploy; newer pushes cancel earlier ones.

Vercel is wired via GitHub integration on the same `source` branch and
publishes to https://veryfuncompany.vercel.app/ using the same build
command. Both deployments run from identical source.

## Update dependencies

```bash
bun update
bun run build
```

## Standard workflow

```bash
git checkout source
git pull --rebase origin source

# make changes

git add .
git commit -m "Describe the change"
git push origin source
# CI builds and deploys automatically — watch with:
# gh run watch
```

If CI is broken or unavailable and you need to ship a hotfix:

```bash
bun run deploy
```

This bypasses CI by building locally and pushing `build/client/` to `main` directly.

## Routing note

The app uses React Router v7 Framework mode with static prerendering
(`ssr: false` + `prerender`), so every route is pre-rendered to its own
HTML file under `build/client/` (e.g. `build/client/about/index.html`,
`build/client/games/classic-sudoku/index.html`). GitHub Pages and Vercel
serve these directly — no client-side router boot is needed for first
paint. `scripts/generate-seo.ts` also copies the SPA fallback
(`build/client/__spa-fallback.html`) to `build/client/404.html` with a
`noindex` meta, so deep links to unknown paths still load the app shell
without being indexed as duplicates of the home page.
