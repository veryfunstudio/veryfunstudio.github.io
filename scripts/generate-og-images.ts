// Generate the 1200×630 social cards from the same visual language as the site.
// Run `pnpm og` before building when the catalog or the art direction changes.
import { execFile } from "node:child_process";
import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";
import { GAMES, getNewestGame } from "../src/data/games";

const execFileAsync = promisify(execFile);
const publicDir = new URL("../public", import.meta.url).pathname;
const outDir = join(publicDir, "og");
const chrome = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
]
  .filter((path): path is string => Boolean(path))
  .find(existsSync);

if (!chrome) throw new Error("Chrome not found. Set CHROME_PATH to a Chrome/Chromium binary.");
mkdirSync(outDir, { recursive: true });

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character] ?? character,
  );

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@500&family=Instrument+Serif:ital@0;1&family=Space+Grotesk:wght@600;700&display=swap');
  * { box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; margin: 0; overflow: hidden; }
  body { background: #f6f4ed; color: #172333; font-family: 'Space Grotesk', Arial, sans-serif; }
  .card { position: relative; display: grid; grid-template-columns: 1fr 0.88fr; width: 100%; height: 100%; overflow: hidden; }
  .copy { display: flex; flex-direction: column; justify-content: center; padding: 70px 56px 70px 68px; }
  .kicker, .bottom, .stage-label, .stage-foot { font-family: 'DM Mono', monospace; font-weight: 500; letter-spacing: 0.09em; text-transform: uppercase; }
  .kicker { display: flex; align-items: center; gap: 12px; margin: 0 0 38px; font-size: 15px; }
  .kicker::before { width: 10px; height: 10px; border-radius: 50%; background: #e76843; content: ''; }
  h1 { max-width: 610px; margin: 0; font-size: 86px; font-weight: 700; letter-spacing: -0.085em; line-height: 0.91; }
  h1 em { color: #e76843; font-family: 'Instrument Serif', Georgia, serif; font-weight: 400; letter-spacing: -0.05em; }
  .card.game h1 { font-size: 68px; line-height: 0.96; }
  .description { max-width: 450px; margin: 34px 0 0; color: #3e4b55; font-size: 23px; line-height: 1.35; }
  .bottom { position: absolute; right: 0; bottom: 0; left: 0; display: flex; justify-content: space-between; align-items: center; height: 58px; padding: 0 68px; border-top: 1px solid rgba(23,35,51,.18); background: #f6f4ed; font-size: 13px; }
  .bottom strong { font-family: 'Space Grotesk', Arial, sans-serif; font-size: 19px; letter-spacing: -0.05em; text-transform: none; }
  .stage { position: relative; display: grid; place-items: center; overflow: hidden; border-left: 1px solid rgba(23,35,51,.16); background: var(--tone); }
  .stage::before { position: absolute; inset: 0; background-image: linear-gradient(rgba(23,35,51,.08) 1px, transparent 1px),linear-gradient(90deg, rgba(23,35,51,.08) 1px, transparent 1px); background-size: 48px 48px; content: ''; }
  .stage::after { position: absolute; width: 85%; aspect-ratio: 1; border: 1px solid rgba(23,35,51,.2); border-radius: 50%; content: ''; }
  .stage-label { position: absolute; z-index: 2; top: 36px; left: 36px; font-size: 13px; }
  figure { position: relative; z-index: 1; width: 76%; margin: -30px 0 0; padding: 9px 9px 36px; border-radius: 4px; background: #fffefa; box-shadow: 0 28px 35px rgba(23,35,51,.25); transform: rotate(-4deg); }
  figure img { display: block; width: 100%; aspect-ratio: 1.25; object-fit: cover; }
  figcaption { display: flex; justify-content: space-between; margin-top: 11px; font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.07em; text-transform: uppercase; }
  .stage-foot { position: absolute; z-index: 2; right: 34px; bottom: 77px; left: 34px; font-size: 12px; }
`;

const card = (options: {
  title: string;
  description: string;
  imageFileUrl: string;
  tone: string;
  label: string;
  number: string;
  home?: boolean;
}) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><style>${styles}</style></head><body>
  <div class="card ${options.home ? "home" : "game"}" style="--tone:${options.tone}">
    <div class="copy">
      <p class="kicker">Independent puzzle studio</p>
      <h1>${options.home ? "Make room<br>for <em>play.</em>" : escapeHtml(options.title)}</h1>
      <p class="description">${escapeHtml(options.description)}</p>
    </div>
    <div class="stage">
      <span class="stage-label">${escapeHtml(options.label)} / ${options.number}</span>
      <figure><img src="${options.imageFileUrl}" alt=""><figcaption><span>VeryFun Studio</span><span>001 — ${options.number}</span></figcaption></figure>
      <span class="stage-foot">Small games, good breaks.</span>
    </div>
    <div class="bottom"><strong>VeryFun Studio</strong><span>MADE FOR THE IN-BETWEEN</span></div>
  </div>
</body></html>`;

async function capture(filename: string, html: string) {
  const harness = join(tmpdir(), `vfs-og-${filename.replaceAll("/", "-")}-${process.pid}.html`);
  const output = join(publicDir, filename);
  try {
    writeFileSync(harness, html);
    await execFileAsync(chrome!, [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--virtual-time-budget=8000",
      "--force-prefers-reduced-motion=reduce",
      "--window-size=1200,630",
      `--screenshot=${output}`,
      `file://${harness}`,
    ]);
    console.log(`generated public/${filename}`);
  } finally {
    rmSync(harness, { force: true });
  }
}

const newest = getNewestGame();
await capture(
  "og-studio-relaunch.png",
  card({
    title: "Make room for play.",
    description: "Small, satisfying puzzle games for the moments between everything else.",
    imageFileUrl: `file://${join(publicDir, newest.image)}`,
    tone: "#dce8d9",
    label: "Play object",
    number: "01",
    home: true,
  }),
);

const tones: Record<string, string> = {
  "nova-mahjong": "#dce8d9",
  "tile-journey": "#e6ebb6",
  "arrow-out": "#eecac1",
};
for (const [index, game] of GAMES.entries()) {
  await capture(
    `og/${game.slug}.png`,
    card({
      title: game.title,
      description: game.hook,
      imageFileUrl: `file://${join(publicDir, game.image)}`,
      tone: tones[game.slug] ?? "#dce8d9",
      label: "Game",
      number: String(index + 1).padStart(2, "0"),
    }),
  );
}
