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

- `bun run dev`: start the Vite dev server
- `bun run build`: type-check, lint, format-check, and build (runs in CI too)
- `bun run deploy`: build locally and publish `dist/` to `main`. Only useful
  when CI is unavailable. Day-to-day, prefer pushing to `source`.

## Deployment

Pushing to `source` triggers the **Deploy GitHub Pages** workflow
(`.github/workflows/deploy.yml`):

1. `actions/checkout` checks out `source`
2. `oven-sh/setup-bun` installs Bun
3. `bun install --frozen-lockfile`
4. `bun run build` (tsc → oxlint → oxfmt --check → vite build)
5. `peaceiris/actions-gh-pages` force-pushes `dist/` to `main`

GitHub Pages serves `main` at https://cookabc.github.io/. Concurrency is
limited to one in-flight deploy; newer pushes cancel earlier ones.

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

This bypasses CI by building locally and pushing `dist/` to `main` directly.

## Routing note

The app uses `createHashRouter`, so all routes live under `/#/...`. This
keeps GitHub Pages happy without needing a `404.html` SPA fallback.
