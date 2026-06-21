import { writeFileSync, mkdirSync, copyFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { PROJECTS } from "../src/data/projects";
import { BLOG_POSTS } from "../src/data/blog";

const SITE_URL = "https://cookabc.github.io";
const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, "..", "dist");
const today = new Date().toISOString().split("T")[0];

// Canonical public URLs, in priority order. Excludes /contact (noindex)
// and the 404 catch-all.
const staticRoutes: { path: string; lastmod?: string }[] = [
  { path: "/" },
  { path: "/about" },
  { path: "/projects" },
  { path: "/blog" },
  ...PROJECTS.map((p) => ({ path: `/projects/${p.slug}`, lastmod: p.releaseDate })),
  ...BLOG_POSTS.map((p) => ({ path: `/blog/${p.id}`, lastmod: p.date })),
];

function robots() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

function sitemap() {
  const urls = staticRoutes
    .map((r) => {
      const loc = `${SITE_URL}${r.path === "/" ? "" : r.path}`;
      const lastmod = r.lastmod ?? today;
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${r.path === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${r.path === "/" ? "1.0" : r.path.startsWith("/projects/") ? "0.8" : "0.6"}</priority>
  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function llmsTxt() {
  const gameLines = PROJECTS.map(
    (p) => `- [${p.title}](${SITE_URL}/projects/${p.slug}): ${p.description.split(".")[0]}.`,
  ).join("\n");
  const blogLines = BLOG_POSTS.map(
    (p) => `- [${p.title}](${SITE_URL}/blog/${p.id}): ${p.excerpt.split(".")[0]}.`,
  ).join("\n");
  return `# VeryFun Company

> VeryFun Company is an independent mobile game studio publishing calming, free-to-play puzzle games on Google Play.

## Games
${gameLines}

## Blog
${blogLines}

## Other pages
- [About the studio](${SITE_URL}/about)
- [All games](${SITE_URL}/projects)
- [Blog index](${SITE_URL}/blog)

## Google Play store pages
${PROJECTS.map((p) => `- [${p.title}](${p.googlePlayUrl})`).join("\n")}
`;
}

function write(file: string, content: string) {
  const target = resolve(outDir, file);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, content, "utf8");
  console.log(`  wrote dist/${file} (${content.length} bytes)`);
}

console.log("[seo] generating crawler assets...");
write("robots.txt", robots());
write("sitemap.xml", sitemap());
write("llms.txt", llmsTxt());

// SPA fallback for GitHub Pages: serve the app shell on unmatched paths so
// client-side routing can take over (e.g. /projects/typoslug). Real routes
// already have their own .html files; this only fires for true 404s.
const indexPath = resolve(outDir, "index.html");
if (existsSync(indexPath)) {
  copyFileSync(indexPath, resolve(outDir, "404.html"));
  console.log("  wrote dist/404.html (SPA fallback)");
}

console.log("[seo] done.");
