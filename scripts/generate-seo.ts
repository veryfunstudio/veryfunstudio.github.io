import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { BLOG_POSTS } from "../src/data/blog";
import {
  agentFriendly404,
  canonicalRoutes,
  legacyRedirectHtml,
  llmsFullTxt,
  llmsTxt,
  markdownForRoute,
  markdownPathFor,
  robotsTxt,
  sitemapXml,
} from "../src/lib/seo-content";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, "..", "build", "client");
const today = new Date().toISOString().split("T")[0];

function write(file: string, content: string) {
  const target = resolve(outDir, file);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, content, "utf8");
  console.log(`  wrote build/client/${file} (${content.length} bytes)`);
}

console.log("[seo] generating crawler assets...");
write("robots.txt", robotsTxt());
write("sitemap.xml", sitemapXml(today));
write("llms.txt", llmsTxt(today));
write("llms-full.txt", llmsFullTxt(today));

// Markdown variant of every canonical page, served by GitHub Pages as
// text/markdown. Agents discover them via <link rel="alternate"> on each page
// and the "Markdown versions" section of llms.txt.
for (const route of canonicalRoutes()) {
  const markdown = markdownForRoute(route.path);
  if (markdown) write(markdownPathFor(route.path), markdown);
}

// Static redirects for legacy numeric blog URLs (/blog/<id>).
for (const post of BLOG_POSTS) {
  write(`blog/${post.id}/index.html`, legacyRedirectHtml(post));
}

// SPA fallback for GitHub Pages: serve the app shell on unmatched paths so
// client-side routing can take over (e.g. /games/typoslug). Real routes
// already have their own .html files; this only fires for true 404s.
// GitHub Pages serves 404.html with a real HTTP 404 status; agentFriendly404
// adds a noindex meta (so garbage URLs are not indexed as duplicates of the
// home page) and a static markdown recovery body for agents and no-JS
// clients. React removes the static body when the SPA hydrates.
const spaFallbackPath = resolve(outDir, "__spa-fallback.html");
if (existsSync(spaFallbackPath)) {
  write("404.html", agentFriendly404(readFileSync(spaFallbackPath, "utf8")));
}

console.log("[seo] done.");
