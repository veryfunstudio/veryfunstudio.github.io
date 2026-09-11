// Pixel-diff fresh captures against the committed visual baselines using
// ImageMagick's RMSE metric (preinstalled on GitHub ubuntu runners). The
// normalized RMSE (0..1) must stay under VFS_RMSE_THRESHOLD (default 0.03);
// diff images are written for the workflow's artifact upload.
// Usage: VFS_CAPTURE_DIR=/tmp/captures node scripts/compare-visual-baseline.mjs
import { execFile } from "node:child_process";
import { existsSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const baselineDir = new URL("../visual-baseline", import.meta.url).pathname;
const captureDir = process.env.VFS_CAPTURE_DIR;
const diffDir = process.env.VFS_DIFF_DIR ?? join(captureDir ?? "", "_diff");
const threshold = Number(process.env.VFS_RMSE_THRESHOLD ?? "0.03");
const FUZZ = "8%";

if (!captureDir || !existsSync(captureDir)) {
  console.error("VFS_CAPTURE_DIR must point at the directory of fresh captures.");
  process.exit(1);
}
if (!Number.isFinite(threshold) || threshold <= 0 || threshold >= 1) {
  console.error(`VFS_RMSE_THRESHOLD must be in (0, 1), got "${process.env.VFS_RMSE_THRESHOLD}".`);
  process.exit(1);
}
mkdirSync(diffDir, { recursive: true });

const im = await (async () => {
  for (const candidate of ["compare", "magick"]) {
    try {
      await execFileAsync(candidate, candidate === "magick" ? ["-version"] : ["-version"]);
      return candidate;
    } catch {
      // try next
    }
  }
  return null;
})();
if (!im) {
  console.error("ImageMagick not found (need `compare` or `magick`).");
  process.exit(1);
}

const compareArgs = (baseline, captured, diff) =>
  im === "magick"
    ? ["compare", "-fuzz", FUZZ, "-metric", "RMSE", baseline, captured, diff]
    : ["-fuzz", FUZZ, "-metric", "RMSE", baseline, captured, diff];

const rmseOf = async (baseline, captured, diff) => {
  try {
    const { stderr } = await execFileAsync(im, compareArgs(baseline, captured, diff));
    return stderr;
  } catch (error) {
    // compare exits 1 when images differ; the metric still lands on stderr.
    return error.stderr ?? "";
  }
};

const basenames = readdirSync(baselineDir).filter((name) => name.endsWith(".png"));
const failures = [];

for (const name of basenames) {
  const baseline = join(baselineDir, name);
  const captured = join(captureDir, name);
  if (!existsSync(captured)) {
    failures.push({ name, rmse: null, reason: "missing capture" });
    continue;
  }
  const metricOutput = await rmseOf(baseline, captured, join(diffDir, name));
  const match = /\(([\d.]+)\)\s*$/.exec(metricOutput.trim());
  if (!match) {
    failures.push({ name, rmse: null, reason: `unparsable metric: ${metricOutput.trim()}` });
    continue;
  }
  const rmse = Number(match[1]);
  const status = rmse <= threshold ? "ok  " : "FAIL";
  console.log(`${status} ${name} rmse=${rmse}`);
  if (rmse > threshold) failures.push({ name, rmse, reason: `rmse ${rmse} > ${threshold}` });
}

if (failures.length > 0) {
  console.error(`\n${failures.length}/${basenames.length} baseline(s) exceeded the threshold:`);
  for (const failure of failures) {
    console.error(`- ${failure.name}: ${failure.reason}`);
  }
  console.error(
    "If the visual change is intentional, refresh baselines via the workflow's update mode.",
  );
  process.exit(1);
}
console.log(`\nAll ${basenames.length} baseline(s) within RMSE threshold ${threshold}.`);
