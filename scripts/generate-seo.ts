import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { BLOG_POSTS } from "../src/data/blog";
import { GAMES } from "../src/data/games";

const SITE_URL = "https://cookabc.github.io";
const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, "..", "build", "client");
const today = new Date().toISOString().split("T")[0];

// Canonical public URLs, in priority order. Excludes /contact (noindex)
// and the 404 catch-all.
const staticRoutes: { path: string; lastmod?: string }[] = [
  { path: "/" },
  { path: "/about" },
  { path: "/games" },
  { path: "/blog" },
  ...GAMES.map((p) => ({ path: `/games/${p.slug}`, lastmod: p.releaseDate })),
  ...BLOG_POSTS.map((p) => ({ path: `/blog/${p.id}`, lastmod: p.date })),
];

function robots() {
  return `# Search engines
User-agent: *
Allow: /

# AI crawlers — explicitly allowed for citation/training
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: CCBot
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

function sitemap() {
  const urls = staticRoutes
    .map((r) => {
      const loc = `${SITE_URL}${r.path}`;
      const lastmod = r.lastmod ?? today;
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${r.path === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${r.path === "/" ? "1.0" : r.path.startsWith("/games/") ? "0.8" : "0.6"}</priority>
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
  const gameLines = GAMES.map(
    (p) => `- [${p.title}](${SITE_URL}/games/${p.slug}): ${p.answer}`,
  ).join("\n");
  const blogLines = BLOG_POSTS.map(
    (p) => `- [${p.title}](${SITE_URL}/blog/${p.id}): ${p.excerpt}`,
  ).join("\n");
  return `# VeryFun Company

> VeryFun Company is an independent mobile game studio publishing calming, free-to-play puzzle games on Google Play. All games are free, work offline, and have no timers or paywalls.

## Games
${gameLines}

## Blog
${blogLines}

## Other pages
- [About the studio](${SITE_URL}/about)
- [All games](${SITE_URL}/games)
- [Blog index](${SITE_URL}/blog)

## Google Play store pages
${GAMES.map((p) => `- [${p.title}](${p.googlePlayUrl})`).join("\n")}

Last updated: ${today}
`;
}

function llmsFullTxt() {
  const gameSections = GAMES.map((p) => {
    const faqLines = p.faq.map((f) => `**Q: ${f.question}**\nA: ${f.answer}`).join("\n\n");
    return `## ${p.title}

${p.answer}

${p.fullDescription}

- Platform: Android (Google Play)
- Price: Free
- Store: ${p.googlePlayUrl}
- Released: ${p.releaseDate}
- Technologies: ${p.technologies.join(", ")}

### Features
${p.features.map((f) => `- ${f}`).join("\n")}

### FAQ
${faqLines}
`;
  }).join("\n---\n\n");

  const blogSections = BLOG_POSTS.map((p) => {
    const sectionBlocks = p.sections
      .map((s) => `### ${s.heading}\n\n${s.paragraphs.join("\n\n")}`)
      .join("\n\n");
    const faqBlock =
      p.faq.length > 0
        ? `### FAQ\n\n${p.faq.map((f) => `**Q: ${f.question}**\nA: ${f.answer}`).join("\n\n")}`
        : "";
    return `## ${p.title}

${p.excerpt}

- Published: ${p.date}
- Category: ${p.category}
- URL: ${SITE_URL}/blog/${p.id}

### Key takeaways
${p.summary.map((s) => `- ${s}`).join("\n")}

${sectionBlocks}
${faqBlock ? `\n${faqBlock}` : ""}
`;
  }).join("\n---\n\n");

  return `# VeryFun Company — Full Content for LLMs

> VeryFun Company is an independent mobile game studio publishing calming, free-to-play puzzle games on Google Play. All games are free, work offline, and have no timers or paywalls. The studio has shipped 7 titles including Classic Sudoku 2026, Tile Journey, Word Search Block, Arrow Out, Pearl Coloring, Time Pop Puzzle, and Nova Mahjong For Seniors.
>
> Site: ${SITE_URL}
> Last updated: ${today}

---

# Games

${gameSections}

---

# Blog

${blogSections}
`;
}

function write(file: string, content: string) {
  const target = resolve(outDir, file);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, content, "utf8");
  console.log(`  wrote build/client/${file} (${content.length} bytes)`);
}

console.log("[seo] generating crawler assets...");
write("robots.txt", robots());
write("sitemap.xml", sitemap());
write("llms.txt", llmsTxt());
write("llms-full.txt", llmsFullTxt());

// SPA fallback for GitHub Pages: serve the app shell on unmatched paths so
// client-side routing can take over (e.g. /games/typoslug). Real routes
// already have their own .html files; this only fires for true 404s.
// GitHub Pages always returns HTTP 200 for 404.html, so we inject a
// noindex meta to prevent every garbage URL (/asdf, /wp-admin, ...) from
// being indexed as a duplicate of the home page.
const spaFallbackPath = resolve(outDir, "__spa-fallback.html");
if (existsSync(spaFallbackPath)) {
  const fallbackHtml = readFileSync(spaFallbackPath, "utf8");
  const noindexMeta = '<meta name="robots" content="noindex, nofollow">';
  // Prefer injecting right after <head> to stay valid; fall back to <title>.
  const injected = fallbackHtml.includes("<head>")
    ? fallbackHtml.replace("<head>", `<head>${noindexMeta}`)
    : fallbackHtml.replace("<title>", `${noindexMeta}<title>`);
  write("404.html", injected);
}

console.log("[seo] done.");
