import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
test("original Nova tiles retain their recorded provenance without sibling repos", async () => {
  const provenance = JSON.parse(
    await readFile(new URL("docs/game-asset-provenance.json", root), "utf8"),
  );
  for (const entry of provenance.novaMahjong) {
    const hash = createHash("sha256")
      .update(await readFile(new URL(entry.file, root)))
      .digest("hex");
    assert.equal(hash, entry.sha256, entry.file);
  }
});
test("every bundled font family retains its full OFL notice", async () => {
  for (const name of ["dmmono", "dmsans", "instrumentserif", "spacegrotesk"]) {
    const license = await readFile(new URL(`public/fonts/OFL-${name}.txt`, root), "utf8");
    assert.match(license, /SIL OPEN FONT LICENSE/);
    assert.match(license, /Copyright/);
  }
});
