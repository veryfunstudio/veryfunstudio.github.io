// Minimal static server mimicking GitHub Pages: try exact file, then
// <path>/index.html, then serve 404.html with a real 404 status.
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const root = new URL("../build/client", import.meta.url).pathname;
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
};

createServer((req, res) => {
  const url = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let file = normalize(join(root, url));
  if (!file.startsWith(root)) {
    res.writeHead(403).end();
    return;
  }
  let status = 200;
  if (!(existsSync(file) && statSync(file).isFile())) {
    if (existsSync(join(file, "index.html"))) {
      file = join(file, "index.html");
    } else {
      file = join(root, "404.html");
      status = 404;
    }
  }
  res.writeHead(status, { "content-type": MIME[extname(file)] ?? "application/octet-stream" });
  createReadStream(file).pipe(res);
}).listen(4321, () => console.log("serving on http://localhost:4321"));
