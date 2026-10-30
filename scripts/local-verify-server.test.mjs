import assert from "node:assert/strict";
import { once } from "node:events";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { createVerificationServer } from "./local-verify-server.mjs";

test("Pages-style server bounds files, handles malformed paths and preserves HTTP status", async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "vfs-server-"));
  const sibling = root + "-private";
  let server;
  try {
    await fs.mkdir(path.join(root, "about"));
    await fs.mkdir(sibling);
    await fs.writeFile(path.join(root, "about/index.html"), "ABOUT");
    await fs.writeFile(path.join(root, "404.html"), "MISSING");
    await fs.writeFile(path.join(sibling, "secret.txt"), "PRIVATE");
    await fs.symlink(path.join(sibling, "secret.txt"), path.join(root, "leak.txt"));
    server = createVerificationServer(root);
    server.listen(0, "127.0.0.1");
    await once(server, "listening");
    const base = `http://127.0.0.1:${server.address().port}`;
    assert.equal(await (await fetch(base + "/about")).text(), "ABOUT");
    assert.equal((await fetch(base + "/unknown")).status, 404);
    assert.equal((await fetch(base + "/%zz")).status, 400);
    assert.equal((await fetch(base + "/%2e%2e%2fprivate")).status, 403);
    assert.equal((await fetch(base + "/leak.txt")).status, 403);
    const head = await fetch(base + "/about", { method: "HEAD" });
    assert.equal(head.headers.get("content-length"), "5");
    assert.equal(await head.text(), "");
    assert.equal((await fetch(base + "/about", { method: "POST" })).status, 405);
  } finally {
    if (server?.listening) await new Promise((resolve) => server.close(resolve));
    await fs.rm(root, { recursive: true, force: true });
    await fs.rm(sibling, { recursive: true, force: true });
  }
});
