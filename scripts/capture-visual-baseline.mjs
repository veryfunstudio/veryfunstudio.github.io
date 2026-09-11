// Visual baseline capture. Serves build/client through the same static
// server used for local verification, then screenshots key breakpoints with
// the locally installed Chrome (headless CLI, zero extra dependencies).
// Each target is framed through an exact-size iframe harness: headless CLI
// screenshots of narrow windows render at the wrong scale, while an iframe
// gives the embedded page a true W×H viewport (media queries included).
// Tall variants trade viewport realism for reach, pulling below-fold bands
// into frame since the CLI cannot scroll.
// Usage: pnpm build && pnpm baseline
import { execFile, spawn } from "node:child_process";
import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const buildDir = new URL("../build/client", import.meta.url).pathname;
// CI sets VFS_BASELINE_OUT to a scratch dir so captures can be diffed
// against the committed baselines without overwriting them.
const outDir =
  process.env.VFS_BASELINE_OUT ?? new URL("../visual-baseline", import.meta.url).pathname;
const serverScript = new URL("./local-verify-server.mjs", import.meta.url).pathname;
const harnessPath = join(tmpdir(), "vfs-baseline-harness.html");

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
  { name: "blog-tall-1440", path: "/blog", width: 1440, height: 2200 },
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

const server = spawn(process.execPath, [serverScript], {
  stdio: ["ignore", "pipe", "inherit"],
});

try {
  await new Promise((resolve, reject) => {
    server.stdout.on("data", (chunk) => {
      if (String(chunk).includes("serving on")) resolve();
    });
    server.on("exit", (code) => reject(new Error(`verify server exited early (${code})`)));
  });

  for (const target of TARGETS) {
    const out = `${outDir}/${target.name}.png`;
    writeFileSync(
      harnessPath,
      `<!doctype html><html><body style="margin:0"><iframe src="http://localhost:4321${target.path}" style="width:${target.width}px;height:${target.height}px;border:0;display:block"></iframe></body></html>`,
    );
    await execFileAsync(chrome, [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      ...(process.env.CI ? ["--no-sandbox"] : []),
      "--virtual-time-budget=6000",
      `--window-size=${target.width},${target.height}`,
      `--screenshot=${out}`,
      `file://${harnessPath}`,
    ]);
    console.log(`captured ${out}`);
  }
} finally {
  server.kill();
  rmSync(harnessPath, { force: true });
}
