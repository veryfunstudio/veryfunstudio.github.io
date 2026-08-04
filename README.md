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
pnpm run deploy   # local-only fallback; see "Deployment" below
```

- `pnpm run dev`: start the React Router dev server
- `pnpm run build`: prerender all routes via `react-router build`, then
  generate SEO assets (robots.txt, sitemap.xml, llms.txt, 404.html)
- `pnpm run deploy`: build locally and publish `build/client/` to `release`.
  Only useful when CI is unavailable. Day-to-day, prefer pushing to `main`.

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

The app uses React Router v7 Framework mode with static prerendering
(`ssr: false` + `prerender`), so every route is pre-rendered to its own
HTML file under `build/client/` (e.g. `build/client/about/index.html`,
`build/client/games/nova-mahjong/index.html`). GitHub Pages and Vercel
serve these directly — no client-side router boot is needed for first
paint. `scripts/generate-seo.ts` also copies the SPA fallback
(`build/client/__spa-fallback.html`) to `build/client/404.html` with a
`noindex` meta, so deep links to unknown paths still load the app shell
without being indexed as duplicates of the home page.
