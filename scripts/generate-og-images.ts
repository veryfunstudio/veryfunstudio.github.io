// Branded per-game Open Graph cards (1200x630) rendered with the local
// Chrome headless CLI: an inline workshop-styled template embedding the key
// art via file://, screenshotted into public/og/<slug>.png. Zero extra
// dependencies. Run before `pnpm build` so the cards ship with the site.
// Usage: pnpm og
import { execFile } from "node:child_process";
import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";
import { GAMES } from "../src/data/games";

const execFileAsync = promisify(execFile);

const publicDir = new URL("../public", import.meta.url).pathname;
const outDir = join(publicDir, "og");

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
].filter(Boolean);

const chrome = CHROME_CANDIDATES.find((candidate) => existsSync(candidate));
if (!chrome) {
  console.error("Chrome not found. Set CHROME_PATH to a Chrome/Chromium binary.");
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });

const template = (title: string, hook: string, imageFileUrl: string) => `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@500&family=Fredoka:wght@600&family=Literata:ital,opsz,wght@1,7..72,500&display=swap">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1200px;
    height: 630px;
    background-color: #faf6f0;
    background-image:
      linear-gradient(#ece1d0 1px, transparent 1px),
      linear-gradient(90deg, #ece1d0 1px, transparent 1px);
    background-size: 40px 40px;
    color: #2e231c;
    font-family: "Fredoka", sans-serif;
  }
  .card {
    display: grid;
    grid-template-columns: 1.05fr 0.95fr;
    align-items: center;
    height: 100%;
    border: 1.5px solid rgba(46, 35, 28, 0.28);
    margin: 28px;
    padding: 0 72px;
    background: rgba(250, 246, 240, 0.82);
  }
  .eyebrow {
    color: #d35a3d;
    font-family: "DM Mono", monospace;
    font-size: 21px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }
  h1 {
    margin-top: 26px;
    max-width: 12ch;
    font-size: 84px;
    font-weight: 600;
    letter-spacing: -0.03em;
    line-height: 0.98;
  }
  .hook {
    margin-top: 30px;
    max-width: 24ch;
    color: #b8472d;
    font-family: "Literata", serif;
    font-size: 33px;
    font-style: italic;
    line-height: 1.25;
  }
  .foot {
    margin-top: 44px;
    color: #8a7a6d;
    font-family: "DM Mono", monospace;
    font-size: 19px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  figure {
    justify-self: center;
    width: 470px;
    margin: 0;
    padding: 16px 16px 58px;
    border: 1px solid rgba(46, 35, 28, 0.14);
    border-radius: 18px;
    background: #ffffff;
    box-shadow: 0 8px 20px rgba(46, 35, 28, 0.08), 0 24px 48px rgba(46, 35, 28, 0.08);
    transform: rotate(-2.5deg);
  }
  figure img {
    width: 100%;
    aspect-ratio: 1200 / 630;
    border-radius: 10px;
    object-fit: cover;
  }
  figure figcaption {
    padding-top: 16px;
    color: #8a7a6d;
    font-family: "DM Mono", monospace;
    font-size: 17px;
    letter-spacing: 0.08em;
    text-align: center;
    text-transform: uppercase;
  }
</style>
</head>
<body>
  <div class="card">
    <div>
      <p class="eyebrow">VeryFun Studio · Free puzzle game</p>
      <h1>${title}</h1>
      <p class="hook">${hook}</p>
      <p class="foot">Free on Google Play — Offline friendly</p>
    </div>
    <figure>
      <img src="${imageFileUrl}" alt="">
      <figcaption>From the workshop</figcaption>
    </figure>
  </div>
</body>
</html>`;

for (const game of GAMES) {
  const imageFileUrl = `file://${join(publicDir, game.image)}`;
  const harness = join(tmpdir(), `vfs-og-${game.slug}.html`);
  const out = join(outDir, `${game.slug}.png`);
  writeFileSync(harness, template(game.title, game.hook, imageFileUrl));
  await execFileAsync(chrome, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--virtual-time-budget=8000",
    "--window-size=1200,630",
    `--screenshot=${out}`,
    `file://${harness}`,
  ]);
  rmSync(harness, { force: true });
  console.log(`generated public/og/${game.slug}.png`);
}
