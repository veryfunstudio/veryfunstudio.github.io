// Visual baseline capture. Serves build/client through the same static
// server used for local verification, then screenshots key breakpoints with
// the locally installed Chrome (headless CLI, zero extra dependencies).
// Each target is framed through an exact-size iframe harness: headless CLI
// screenshots of narrow windows render at the wrong scale, while an iframe
// gives the embedded page a true W×H viewport (media queries included).
// Tall variants trade viewport realism for reach, pulling below-fold bands
// into frame since the CLI cannot scroll.
// Usage: pnpm build && pnpm baseline
import { execFile } from "node:child_process";
import { once } from "node:events";
import { existsSync, mkdirSync, mkdtempSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { createVerificationServer } from "./local-verify-server.mjs";

const execFileAsync = promisify(execFile);

const buildDir = fileURLToPath(new URL("../build/client", import.meta.url));
// CI sets VFS_BASELINE_OUT to a scratch dir so captures can be diffed
// against the committed baselines without overwriting them.
const outDir =
  process.env.VFS_BASELINE_OUT ?? fileURLToPath(new URL("../visual-baseline", import.meta.url));

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
].filter(Boolean);

const TARGETS = [
  { name: "home-desktop-1440", path: "/", width: 1440, height: 900 },
  { name: "home-tall-1440", path: "/", width: 1440, height: 2600 },
  { name: "home-mobile-390", path: "/", width: 390, height: 844 },
  { name: "home-mobile-tall-390", path: "/", width: 390, height: 2600 },
  { name: "games-tall-1440", path: "/games", width: 1440, height: 2200 },
  { name: "about-tall-1440", path: "/about", width: 1440, height: 2800 },
  { name: "blog-desktop-1440", path: "/blog", width: 1440, height: 900 },
  { name: "blog-tall-1440", path: "/blog", width: 1440, height: 2200 },
  { name: "blog-mobile-390", path: "/blog", width: 390, height: 1800 },
  { name: "legal-tall-1440", path: "/legal", width: 1440, height: 2000 },
  {
    name: "article-tall-1440",
    path: "/blog/why-nova-mahjong-uses-large-clear-tiles",
    width: 1440,
    height: 3000,
  },
  { name: "contact-tall-1440", path: "/contact", width: 1440, height: 1600 },
  { name: "game-detail-tall-1440", path: "/games/nova-mahjong", width: 1440, height: 2800 },
];

const chrome = CHROME_CANDIDATES.find((candidate) => existsSync(candidate));
if (!chrome) {
  console.error("Chrome not found. Set CHROME_PATH to a Chrome/Chromium binary.");
  process.exit(1);
}
if (!existsSync(buildDir)) {
  console.error("build/client is missing. Run `pnpm build` first.");
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });
const scratch = mkdtempSync(join(tmpdir(), "vfs-baseline-"));
const harnessPath = join(scratch, "harness.html");

const server = createVerificationServer();
try {
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const origin = `http://127.0.0.1:${server.address().port}`;

  for (const target of TARGETS) {
    const out = `${outDir}/${target.name}.png`;
    writeFileSync(
      harnessPath,
      `<!doctype html><html><body style="margin:0"><iframe src="${origin}${target.path}" style="width:${target.width}px;height:${target.height}px;border:0;display:block"></iframe></body></html>`,
    );
    // Headless CLI screenshots can flake and come out blank (virtual time
    // expiring before the iframe paints). Guard by file size: every real
    // page here compresses to far more than 30KB of PNG.
    //
    // The tall variants (2000–3000px) pull in every image on the page; a flat
    // 6s budget sometimes expired with a few images still undecoded, and the
    // same commit then scored RMSE 0 and RMSE 0.18 on consecutive runs.
    // Scale the budget with viewport height so tall captures get the time.
    const budget = Math.max(6000, Math.round((target.height / 900) * 6000));
    for (let attempt = 1; attempt <= 3; attempt++) {
      await execFileAsync(chrome, [
        "--headless=new",
        // Deterministic software WebGL includes the real 3D scene in the baseline.
        "--use-gl=angle",
        "--use-angle=swiftshader",
        "--enable-unsafe-swiftshader",
        "--hide-scrollbars",
        "--force-prefers-reduced-motion=reduce",
        ...(process.env.CI ? ["--no-sandbox"] : []),
        `--virtual-time-budget=${budget}`,
        `--window-size=${target.width},${target.height}`,
        `--screenshot=${out}`,
        `file://${harnessPath}`,
      ]);
      const size = statSync(out).size;
      if (size >= 30_000) break;
      if (attempt === 3) {
        throw new Error(`${target.name}.png looks blank (${size}B after 3 attempts)`);
      }
      console.warn(`${target.name}.png suspiciously small (${size}B), retrying`);
    }
    console.log(`captured ${out}`);
  }
} finally {
  await new Promise((resolve) => server.close(resolve));
  rmSync(scratch, { recursive: true, force: true });
}
