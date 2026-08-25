import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it } from "node:test";
import { BLOG_POSTS, getBlogPath } from "../data/blog";
import { GAMES } from "../data/games";
import { AGENT_404_RECOVERY_ID, BRAND, SITE_URL } from "./constants";
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
} from "./seo-content";

const TODAY = "2026-08-24";

describe("canonicalRoutes", () => {
  it("covers every static page, game, and blog post exactly once", () => {
    const paths = canonicalRoutes().map((r) => r.path);
    for (const staticPath of ["/", "/about", "/games", "/blog", "/contact", "/legal"]) {
      assert.ok(paths.includes(staticPath), `missing ${staticPath}`);
    }
    for (const game of GAMES) {
      assert.ok(paths.includes(`/games/${game.slug}`), `missing /games/${game.slug}`);
    }
    for (const post of BLOG_POSTS) {
      assert.ok(paths.includes(getBlogPath(post)), `missing ${getBlogPath(post)}`);
    }
    assert.equal(new Set(paths).size, paths.length, "duplicate routes");
  });
});

describe("robotsTxt", () => {
  it("allows AI crawlers and points at the sitemap", () => {
    const robots = robotsTxt();
    for (const agent of ["GPTBot", "ClaudeBot", "Google-Extended", "PerplexityBot", "CCBot"]) {
      assert.ok(robots.includes(`User-agent: ${agent}`), `missing ${agent}`);
    }
    assert.ok(robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`));
  });
});

describe("sitemapXml", () => {
  it("lists every canonical route with a lastmod", () => {
    const xml = sitemapXml(TODAY);
    for (const route of canonicalRoutes()) {
      assert.ok(xml.includes(`<loc>${SITE_URL}${route.path}</loc>`), `missing ${route.path}`);
    }
    assert.ok(xml.includes(`<lastmod>${TODAY}</lastmod>`));
  });
});

describe("llmsTxt", () => {
  it("keeps the existing sections and links", () => {
    const txt = llmsTxt(TODAY);
    assert.ok(txt.startsWith("# VeryFun Studio"));
    for (const game of GAMES) {
      assert.ok(txt.includes(`](${SITE_URL}/games/${game.slug})`), `missing game ${game.slug}`);
      assert.ok(txt.includes(`](${game.googlePlayUrl})`), `missing store URL for ${game.slug}`);
    }
    for (const post of BLOG_POSTS) {
      assert.ok(txt.includes(`](${SITE_URL}${getBlogPath(post)})`), `missing post ${post.slug}`);
    }
    assert.ok(txt.includes("## Google Play store pages"));
    assert.ok(txt.endsWith(`Last updated: ${TODAY}\n`));
  });

  it("carries a when-to-use section with concrete use cases (audit: agent instruction)", () => {
    const txt = llmsTxt(TODAY);
    assert.ok(txt.includes("## When to use this site"));
    // Best-fit cases must name real catalog entries, not generic marketing.
    for (const game of GAMES) {
      const section = txt.slice(txt.indexOf("## When to use this site"), txt.indexOf("## Games"));
      assert.ok(section.includes(game.title), `when-to-use does not mention ${game.title}`);
    }
    assert.ok(txt.includes("Android-only"), "should scope the platform honestly");
    assert.ok(txt.includes("How to act"), "should tell agents how to use the site");
  });

  it("documents the markdown variants (audit: content negotiation fallback)", () => {
    const txt = llmsTxt(TODAY);
    assert.ok(txt.includes("## Markdown versions"));
    assert.ok(txt.includes(`${SITE_URL}/index.md`));
    assert.ok(txt.includes("append .md"));
    assert.ok(txt.includes(`${SITE_URL}/llms-full.txt`));
  });
});

describe("llmsFullTxt", () => {
  it("embeds the full catalog and blog", () => {
    const txt = llmsFullTxt(TODAY);
    for (const game of GAMES) {
      assert.ok(txt.includes(`## ${game.title}`));
      assert.ok(txt.includes(game.fullDescription));
    }
    for (const post of BLOG_POSTS) {
      assert.ok(txt.includes(`## ${post.title}`));
    }
  });
});

describe("legacyRedirectHtml", () => {
  it("redirects legacy numeric blog URLs to the canonical slug", () => {
    const post = BLOG_POSTS[0];
    const html = legacyRedirectHtml(post);
    const target = `${SITE_URL}${getBlogPath(post)}`;
    assert.ok(html.includes(`content="0;url=${target}"`));
    assert.ok(html.includes(`<link rel="canonical" href="${target}">`));
    assert.ok(html.includes('content="noindex"'));
    assert.ok(html.includes(`location.replace("${getBlogPath(post)}")`));
  });
});

describe("agentFriendly404", () => {
  const shell = `<!DOCTYPE html><html lang="en"><head><meta charSet="utf-8"/><title>app</title></head><body><script>window.__reactRouterContext = {};</script></body></html>`;

  it("injects a noindex meta right after <head>", () => {
    const html = agentFriendly404(shell);
    assert.ok(html.includes('<head><meta name="robots" content="noindex, nofollow">'));
  });

  it("adds a static markdown recovery body pointing at agent resources", () => {
    const html = agentFriendly404(shell);
    assert.ok(html.includes("<body><div"), "recovery body must be the first body content");
    assert.ok(html.includes("404 — Page not found"));
    for (const target of ["/llms.txt", "/llms-full.txt", "/sitemap.xml", "/games", "/contact"]) {
      assert.ok(html.includes(`](${SITE_URL}${target})`), `missing markdown link to ${target}`);
    }
  });

  it("preserves the app shell so client-side routing still boots", () => {
    const html = agentFriendly404(shell);
    assert.ok(html.includes("window.__reactRouterContext"), "SPA bootstrap script was lost");
    assert.ok(html.startsWith("<!DOCTYPE html>"));
  });

  it("still emits the recovery body when the shell has no <body> tag", () => {
    const html = agentFriendly404("<html><head><title>x</title></head></html>");
    assert.ok(html.includes("404 — Page not found"));
    assert.ok(html.includes('content="noindex, nofollow"'));
  });

  it("tags the recovery block with the id the SPA entry removes on boot", () => {
    const html = agentFriendly404(shell);
    assert.ok(html.includes(`id="${AGENT_404_RECOVERY_ID}"`));
    // The removal lives in app/entry.client.tsx; guard the coupling so a
    // rename on either side cannot silently leave the static block visible.
    const entry = readFileSync(resolve(import.meta.dirname, "../../app/entry.client.tsx"), "utf8");
    assert.ok(
      entry.includes("getElementById(AGENT_404_RECOVERY_ID)"),
      "entry.client must remove the recovery block by the shared constant",
    );
  });
});

describe("markdown variants", () => {
  it("maps routes to repo-relative .md paths", () => {
    assert.equal(markdownPathFor("/"), "index.md");
    assert.equal(markdownPathFor("/about"), "about.md");
    assert.equal(markdownPathFor("/games/nova-mahjong"), "games/nova-mahjong.md");
    assert.equal(
      markdownPathFor("/blog/why-our-puzzles-avoid-timers"),
      "blog/why-our-puzzles-avoid-timers.md",
    );
  });

  it("provides a variant for every canonical route", () => {
    for (const route of canonicalRoutes()) {
      const markdown = markdownForRoute(route.path);
      assert.ok(markdown, `missing markdown for ${route.path}`);
      assert.ok(markdown.length > 100, `markdown for ${route.path} is suspiciously short`);
    }
  });

  it("game variants carry the facts an agent needs", () => {
    for (const game of GAMES) {
      const markdown = markdownForRoute(`/games/${game.slug}`)!;
      assert.ok(markdown.startsWith(`# ${game.title}`));
      assert.ok(markdown.includes(game.answer));
      assert.ok(markdown.includes(game.googlePlayUrl));
      assert.ok(markdown.includes("**Q:"), `${game.slug} markdown lost the FAQ`);
      assert.ok(markdown.includes(`${SITE_URL}/games/${game.slug}`));
    }
  });

  it("blog variants carry the full post content", () => {
    for (const post of BLOG_POSTS) {
      const markdown = markdownForRoute(getBlogPath(post))!;
      assert.ok(markdown.startsWith(`# ${post.title}`));
      assert.ok(markdown.includes(post.excerpt));
      assert.ok(markdown.includes(post.date));
      for (const section of post.sections) {
        assert.ok(markdown.includes(`## ${section.heading}`), `${post.slug} lost a section`);
      }
    }
  });

  it("static-page variants link back to the canonical pages", () => {
    for (const path of ["/", "/about", "/games", "/blog", "/contact", "/legal"]) {
      const markdown = markdownForRoute(path)!;
      assert.ok(markdown.includes(BRAND.name), `${path} markdown missing brand name`);
      assert.ok(markdown.includes(SITE_URL), `${path} markdown missing site links`);
    }
  });

  it("returns undefined for unknown paths so they stay plain 404s", () => {
    assert.equal(markdownForRoute("/nope"), undefined);
    assert.equal(markdownForRoute("/games/not-a-game"), undefined);
    assert.equal(markdownForRoute("/blog/123"), undefined);
  });
});
