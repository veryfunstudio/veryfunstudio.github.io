// Capture exact desktop/mobile viewports with the pinned Playwright browser.
// Tall variants preserve the existing baseline framing. Wait for local assets
// and a still layout instead of racing Chrome's virtual-time screenshot timer.
// Usage: pnpm build && pnpm exec playwright install chromium && pnpm baseline
import { once } from "node:events";
import { existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";
import { createVerificationServer } from "./local-verify-server.mjs";

const buildDir = fileURLToPath(new URL("../build/client", import.meta.url));
const outDir =
  process.env.VFS_BASELINE_OUT ?? fileURLToPath(new URL("../visual-baseline", import.meta.url));

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

if (!existsSync(buildDir)) {
  throw new Error("build/client is missing. Run `pnpm build` first.");
}
mkdirSync(outDir, { recursive: true });

async function waitForStillLayout(page) {
  let previous = "";
  let stillSince = Date.now();
  const deadline = Date.now() + 10_000;
  while (Date.now() < deadline) {
    const current = await page.evaluate(() =>
      [...document.querySelectorAll("main h1, main h2, main h3, main img")]
        .map((node) => {
          const rect = node.getBoundingClientRect();
          if (rect.bottom < 0 || rect.top > innerHeight) return null;
          return [
            ...[rect.x, rect.y, rect.width, rect.height].map((value) => value.toFixed(2)),
            getComputedStyle(node).opacity,
          ];
        })
        .filter(Boolean),
    );
    const signature = JSON.stringify(current);
    if (signature !== previous) {
      previous = signature;
      stillSince = Date.now();
    } else if (Date.now() - stillSince >= 350) {
      return;
    }
    await page.waitForTimeout(50);
  }
  throw new Error("Visible headings and images did not settle before capture.");
}

const server = createVerificationServer();
let browser;
try {
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const origin = `http://127.0.0.1:${server.address().port}`;
  browser = await chromium.launch({
    executablePath: process.env.CHROME_PATH || undefined,
    args: [
      "--hide-scrollbars",
      "--use-gl=angle",
      "--use-angle=swiftshader",
      "--enable-unsafe-swiftshader",
    ],
  });
  for (const target of TARGETS) {
    const page = await browser.newPage({
      viewport: { width: target.width, height: target.height },
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
      colorScheme: "dark",
    });
    try {
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      const response = await page.goto(origin + target.path, { waitUntil: "networkidle" });
      if (response?.status() !== 200) throw new Error(`${target.path}: HTTP ${response?.status()}`);
      await page.locator("main h1").waitFor({ state: "visible" });
      await page.evaluate(async () => {
        for (const image of document.images) image.loading = "eager";
        await Promise.all([
          document.fonts.ready,
          ...[...document.images].map(async (image) => {
            try {
              await image.decode();
            } catch {
              throw new Error(`Image did not decode: ${image.currentSrc || image.src}`);
            }
          }),
        ]);
      });
      await waitForStillLayout(page);
      if (errors.length) throw new Error(errors.join("\n"));
      const path = `${outDir}/${target.name}.png`;
      await page.screenshot({ path, animations: "disabled" });
      console.log(`captured ${path}`);
    } finally {
      await page.close();
    }
  }
} finally {
  try {
    await browser?.close();
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}
