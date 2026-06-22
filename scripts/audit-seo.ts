#!/usr/bin/env bun
/**
 * Sprint-1 SEO audit. Verifies acceptance criteria A1–A6 and A11–A13
 * against the freshly built dist/ directory. Run with `bun run scripts/audit-seo.ts`.
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { resolve, join } from "node:path";

const dist = resolve(import.meta.dir, "..", "dist");
const SITE = "https://cookabc.github.io";
const SLUGS = [
  "classic-sudoku",
  "tile-journey",
  "word-search-block",
  "arrow-out",
  "pearl-coloring",
  "bubble-shoot",
];
const BLOG_IDS = ["1", "2", "3", "4"];

let pass = 0;
let fail = 0;
const ok = (k: string, msg: string) => {
  pass++;
  console.log(`  \u2713 ${k}: ${msg}`);
};
const bad = (k: string, msg: string) => {
  fail++;
  console.error(`  \u2717 ${k}: ${msg}`);
};

function readHtml(rel: string): string {
  const p = join(dist, rel);
  if (!existsSync(p)) return "";
  return readFileSync(p, "utf8");
}

console.log("\n=== A2: route count ===");
const allHtml: string[] = [];
function walk(dir: string) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p);
    else if (e.endsWith(".html")) allHtml.push(p);
  }
}
walk(dist);
const expected = 1 + 1 + 1 + 6 + 1 + 4 + 1; // home, about, projects, 6 games, blog index, 4 posts, contact
if (allHtml.length >= expected)
  ok("A2", `${allHtml.length} HTML files in dist (need ${expected}+)`);
else bad("A2", `only ${allHtml.length} HTML files, need ${expected}+`);

console.log("\n=== A1: real content in #root ===");
let emptyRoot = 0;
for (const f of allHtml) {
  if (readFileSync(f, "utf8").includes('<div id="root"></div>')) {
    emptyRoot++;
    console.error(`  \u2717 empty root: ${f}`);
  }
}
if (emptyRoot === 0) ok("A1", "no empty #root in any page");
else bad("A1", `${emptyRoot} pages have empty #root`);

console.log("\n=== A3/A4/A5/A6: unique meta per page ===");
const pages: { name: string; html: string }[] = [
  { name: "home", html: readHtml("index.html") },
  { name: "about", html: readHtml("about.html") },
  { name: "projects", html: readHtml("projects.html") },
  { name: "blog", html: readHtml("blog.html") },
  ...SLUGS.map((s) => ({ name: `projects/${s}`, html: readHtml(`projects/${s}.html`) })),
  ...BLOG_IDS.map((id) => ({ name: `blog/${id}`, html: readHtml(`blog/${id}.html`) })),
];

const titles = new Map<string, string>();
const descs = new Map<string, string>();
const canon = new Map<string, string>();
const ogImage = new Map<string, string>();
const ogUrl = new Map<string, string>();

for (const p of pages) {
  const titleMatch = p.html.match(/<title[^>]*>([^<]+)<\/title>/);
  const descMatch = p.html.match(/<meta[^>]*name="description"[^>]*content="([^"]+)"/);
  const canonMatch = p.html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/);
  const ogImgMatch = p.html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/);
  const ogUrlMatch = p.html.match(/<meta[^>]*property="og:url"[^>]*content="([^"]+)"/);

  if (!titleMatch) {
    bad(`A3/${p.name}`, "missing <title>");
    continue;
  }
  if (!descMatch) {
    bad(`A4/${p.name}`, "missing description meta");
    continue;
  }
  if (!canonMatch) {
    bad(`A5/${p.name}`, "missing canonical");
    continue;
  }
  if (!ogImgMatch) {
    bad(`A6/${p.name}`, "missing og:image");
    continue;
  }
  if (!ogUrlMatch) {
    bad(`A6/${p.name}`, "missing og:url");
    continue;
  }

  titles.set(p.name, titleMatch[1].trim());
  descs.set(p.name, descMatch[1].trim());
  canon.set(p.name, canonMatch[1].trim());
  ogImage.set(p.name, ogImgMatch[1].trim());
  ogUrl.set(p.name, ogUrlMatch[1].trim());
}

// unique check
const titleVals = [...titles.values()];
const descVals = [...descs.values()];
if (new Set(titleVals).size === titleVals.length) ok("A3", `${titleVals.length} unique titles`);
else bad("A3", "duplicate titles");
if (new Set(descVals).size === descVals.length) ok("A4", `${descVals.length} unique descriptions`);
else bad("A4", "duplicate descriptions");

// description length 100-200 (Google truncates ~155-160; metadata itself has no hard cap)
const badLen = [...descs.entries()].filter(([, d]) => d.length < 100 || d.length > 200);
if (badLen.length === 0) ok("A4-len", "all descriptions 100–200 chars");
else
  bad(
    "A4-len",
    `${badLen.length} out of range: ${badLen.map(([n, d]) => `${n}=${d.length}`).join(", ")}`,
  );

// canonical points to self
let canonOk = true;
for (const [name, c] of canon) {
  const expectedUrl = name === "home" ? `${SITE}/` : `${SITE}/${name}`;
  if (!c.startsWith(expectedUrl)) {
    canonOk = false;
    console.error(`  \u2717 ${name}: canonical=${c} expected ~${expectedUrl}`);
  }
}
if (canonOk) ok("A5", "all canonicals self-referential");
else bad("A5", "canonical mismatch");

// og:url matches canonical
let ogUrlOk = true;
for (const [name, u] of ogUrl)
  if (u !== canon.get(name)) {
    ogUrlOk = false;
    console.error(`  \u2717 ${name}: og:url=${u} != canonical=${canon.get(name)}`);
  }
if (ogUrlOk) ok("A6-url", "og:url matches canonical");
else bad("A6-url", "og:url mismatch");

// og:image unique per game page (not all about.jpeg)
const gameImages = SLUGS.map((s) => ogImage.get(`projects/${s}`)).filter(Boolean);
if (new Set(gameImages).size === gameImages.length)
  ok("A6-img", `${gameImages.length} distinct og:images on game pages`);
else bad("A6-img", "game pages share og:image");

console.log("\n=== A11: robots.txt ===");
const robots = readHtml("robots.txt");
if (robots.includes("Allow: /") && robots.includes("sitemap.xml")) ok("A11", "robots.txt valid");
else bad("A11", "robots.txt missing fields");

console.log("\n=== A12: sitemap.xml ===");
const sitemap = readHtml("sitemap.xml");
const urlCount = (sitemap.match(/<url>/g) || []).length;
if (urlCount >= 13) ok("A12", `${urlCount} <url> entries (need 13+, excluding contact)`);
else bad("A12", `only ${urlCount} <url> entries`);
if (sitemap.includes("<lastmod>")) ok("A12-lastmod", "lastmod present");
else bad("A12-lastmod", "missing lastmod");

console.log("\n=== A13: llms.txt ===");
const llms = readHtml("llms.txt");
if (llms.startsWith("# VeryFun Company")) ok("A13", "llms.txt has H1 title");
else bad("A13", "llms.txt missing title");
const llmsUrlCount = (llms.match(/https:\/\/cookabc\.github\.io/g) || []).length;
if (llmsUrlCount >= 13) ok("A13", `${llmsUrlCount} site URLs in llms.txt`);
else bad("A13", `only ${llmsUrlCount} URLs`);

// --- JSON-LD structured data (A7–A10) ---

/** Extract all JSON-LD blocks from a page as parsed objects. */
function extractJsonLd(html: string): object[] {
  const out: object[] = [];
  const re = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    try {
      out.push(JSON.parse(m[1].trim()));
    } catch {
      // ignore malformed
    }
  }
  return out;
}

console.log("\n=== A7: Organization JSON-LD on home ===");
const homeLd = extractJsonLd(readHtml("index.html"));
const org = homeLd.find((o) => (o as { "@type"?: string })["@type"] === "Organization");
if (org) {
  const sameAs = (org as { sameAs?: unknown }).sameAs;
  const sameAsCount = Array.isArray(sameAs) ? sameAs.length : 0;
  if (sameAsCount >= 6) ok("A7", `Organization with sameAs[${sameAsCount}] (need 6)`);
  else bad("A7", `Organization present but sameAs has ${sameAsCount} entries (need 6)`);
} else {
  bad("A7", "home page missing Organization JSON-LD");
}

console.log("\n=== A8: SoftwareApplication on each game page ===");
let a8Pass = 0;
let a8Fail = 0;
for (const slug of SLUGS) {
  const ld = extractJsonLd(readHtml(`projects/${slug}.html`));
  const app = ld.find((o) => (o as { "@type"?: string })["@type"] === "SoftwareApplication");
  if (app) {
    a8Pass++;
    console.log(`  \u2713 projects/${slug}: SoftwareApplication present`);
  } else {
    a8Fail++;
    console.error(`  \u2717 projects/${slug}: SoftwareApplication missing`);
  }
}
if (a8Fail === 0) ok("A8", `${a8Pass}/6 game pages have SoftwareApplication`);
else bad("A8", `${a8Fail}/6 game pages missing SoftwareApplication`);

console.log("\n=== A9: BlogPosting on each blog page ===");
let a9Pass = 0;
let a9Fail = 0;
for (const id of BLOG_IDS) {
  const ld = extractJsonLd(readHtml(`blog/${id}.html`));
  const post = ld.find((o) => (o as { "@type"?: string })["@type"] === "BlogPosting");
  if (post) {
    a9Pass++;
    console.log(`  \u2713 blog/${id}: BlogPosting present`);
  } else {
    a9Fail++;
    console.error(`  \u2717 blog/${id}: BlogPosting missing`);
  }
}
if (a9Fail === 0) ok("A9", `${a9Pass}/4 blog pages have BlogPosting`);
else bad("A9", `${a9Fail}/4 blog pages missing BlogPosting`);

console.log("\n=== A10: FAQPage with >=3 entries on each game page ===");
let a10Pass = 0;
let a10Fail = 0;
for (const slug of SLUGS) {
  const ld = extractJsonLd(readHtml(`projects/${slug}.html`));
  const faq = ld.find((o) => (o as { "@type"?: string })["@type"] === "FAQPage");
  if (faq) {
    const me = (faq as { mainEntity?: unknown[] }).mainEntity;
    const count = Array.isArray(me) ? me.length : 0;
    if (count >= 3) {
      a10Pass++;
      console.log(`  \u2713 projects/${slug}: FAQPage with ${count} entries`);
    } else {
      a10Fail++;
      console.error(`  \u2717 projects/${slug}: FAQPage has only ${count} entries (need 3+)`);
    }
  } else {
    a10Fail++;
    console.error(`  \u2717 projects/${slug}: FAQPage missing`);
  }
}
if (a10Fail === 0) ok("A10", `${a10Pass}/6 game pages have FAQPage with >=3 entries`);
else bad("A10", `${a10Fail}/6 game pages missing or insufficient FAQ`);

// --- A14: every <img> has width + height + alt ---

console.log("\n=== A14: image width/height/alt on all pages ===");
let imgPass = 0;
let imgFail = 0;
for (const p of pages) {
  const imgRe = /<img\s+[^>]*>/g;
  let im: RegExpExecArray | null;
  while ((im = imgRe.exec(p.html))) {
    const tag = im[0];
    const hasW = /\swidth=/.test(tag);
    const hasH = /\sheight=/.test(tag);
    const hasAlt = /\salt=/.test(tag);
    if (hasW && hasH && hasAlt) {
      imgPass++;
    } else {
      imgFail++;
      const missing = [!hasW && "width", !hasH && "height", !hasAlt && "alt"]
        .filter(Boolean)
        .join(", ");
      console.error(`  \u2717 ${p.name}: <img> missing ${missing}`);
    }
  }
}
if (imgFail === 0) ok("A14", `${imgPass} <img> tags all have width+height+alt`);
else bad("A14", `${imgFail} <img> tags missing attributes (of ${imgPass + imgFail} total)`);

// --- A15: JSON-LD structural validation ---

console.log("\n=== A15: JSON-LD structural validation ===");
let schemaFail = 0;

// Organization on home: must have name, url, sameAs array
if (org) {
  const o = org as Record<string, unknown>;
  if (!o.name || !o.url || !Array.isArray(o.sameAs)) {
    schemaFail++;
    bad("A15-org", "Organization missing name/url/sameAs");
  }
}

// SoftwareApplication: must have name, operatingSystem, applicationCategory
for (const slug of SLUGS) {
  const ld = extractJsonLd(readHtml(`projects/${slug}.html`));
  const app = ld.find((o) => (o as { "@type"?: string })["@type"] === "SoftwareApplication") as
    | Record<string, unknown>
    | undefined;
  if (!app || !app.name || !app.operatingSystem || !app.applicationCategory) {
    schemaFail++;
    bad(`A15-app/${slug}`, "SoftwareApplication missing required fields");
  }
}

// BlogPosting: must have headline, datePublished, author
for (const id of BLOG_IDS) {
  const ld = extractJsonLd(readHtml(`blog/${id}.html`));
  const post = ld.find((o) => (o as { "@type"?: string })["@type"] === "BlogPosting") as
    | Record<string, unknown>
    | undefined;
  if (!post || !post.headline || !post.datePublished || !post.author) {
    schemaFail++;
    bad(`A15-post/${id}`, "BlogPosting missing required fields");
  }
}

// FAQPage: each mainEntity must have name + acceptedAnswer.text
for (const slug of SLUGS) {
  const ld = extractJsonLd(readHtml(`projects/${slug}.html`));
  const faq = ld.find((o) => (o as { "@type"?: string })["@type"] === "FAQPage") as
    | Record<string, unknown>
    | undefined;
  const me = (faq?.mainEntity ?? []) as Array<Record<string, unknown>>;
  const broken = me.filter(
    (q) => !q.name || !(q.acceptedAnswer as Record<string, unknown> | undefined)?.text,
  );
  if (broken.length > 0) {
    schemaFail++;
    bad(`A15-faq/${slug}`, `${broken.length} FAQ entries missing name or acceptedAnswer.text`);
  }
}

if (schemaFail === 0) ok("A15", "all JSON-LD schemas structurally valid");
else bad("A15", `${schemaFail} schema validation failures`);

console.log(`\n=== RESULT: ${pass} passed, ${fail} failed ===`);
process.exit(fail > 0 ? 1 : 0);
