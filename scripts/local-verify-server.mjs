// Static verification server: same route/404 behavior as GitHub Pages, loopback only.
import { createReadStream } from "node:fs";
import { lstat, realpath, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, resolve, sep } from "node:path";
import { pipeline } from "node:stream";
import { fileURLToPath, pathToFileURL } from "node:url";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".js": "text/javascript",
  ".css": "text/css",
  ".webmanifest": "application/manifest+json",
  ".woff2": "font/woff2",
  ".svg": "image/svg+xml",
};
export function createVerificationServer(
  root = fileURLToPath(new URL("../build/client", import.meta.url)),
) {
  root = resolve(root);
  return createServer(async (req, res) => {
    const end = (status) => {
      res.writeHead(status);
      res.end();
    };
    try {
      if (!["GET", "HEAD"].includes(req.method)) {
        res.setHeader("Allow", "GET, HEAD");
        return end(405);
      }
      let pathname;
      try {
        pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
      } catch {
        return end(400);
      }
      if (
        pathname
          .split("/")
          .some((part) => part.startsWith(".") || part.includes("\\") || part.includes("\0"))
      )
        return end(403);
      let file = resolve(root, "." + pathname);
      if (file !== root && !file.startsWith(root + sep)) return end(403);
      let status = 200;
      try {
        if ((await stat(file)).isDirectory()) file = join(file, "index.html");
        if (!(await stat(file)).isFile()) throw new Error("Not a file");
      } catch {
        file = join(root, "404.html");
        status = 404;
      }
      const resolved = await realpath(file),
        base = await realpath(root);
      if (!resolved.startsWith(base + sep) || (await lstat(file)).isSymbolicLink()) return end(403);
      const size = (await stat(file)).size;
      res.writeHead(status, {
        "Content-Type": MIME[extname(file)] ?? "application/octet-stream",
        "Content-Length": size,
        "X-Content-Type-Options": "nosniff",
      });
      if (req.method === "HEAD") return res.end();
      pipeline(createReadStream(file), res, () => {});
    } catch {
      if (res.headersSent) res.destroy();
      else end(500);
    }
  });
}
if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  const server = createVerificationServer();
  server.on("error", (error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
  server.listen(Number(process.env.PORT ?? 4321), "127.0.0.1", () =>
    console.log(`serving on http://127.0.0.1:${server.address().port}`),
  );
}
