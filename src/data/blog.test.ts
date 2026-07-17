import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { describe, it } from "node:test";
import {
  BLOG_POSTS,
  getBlogPath,
  getBlogPostById,
  getBlogPostByParam,
  getBlogPostBySlug,
  getNewestPost,
  getPostsByNewest,
} from "./blog";

describe("blog data helpers", () => {
  it("getPostsByNewest returns a newest-first sorted copy without mutating source", () => {
    const originalFirst = BLOG_POSTS[0];
    const sorted = getPostsByNewest();

    assert.notStrictEqual(sorted, BLOG_POSTS);
    assert.deepStrictEqual(
      sorted.map((p) => p.date),
      [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date)).map((p) => p.date),
    );
    assert.strictEqual(BLOG_POSTS[0], originalFirst);
  });

  it("getNewestPost returns the newest post by date", () => {
    const newest = getNewestPost();
    const expected = getPostsByNewest()[0];
    assert.strictEqual(newest, expected);
  });

  it("getBlogPostById returns the matching post or undefined", () => {
    const existing = BLOG_POSTS[0];
    assert.strictEqual(getBlogPostById(existing.id), existing);
    assert.strictEqual(getBlogPostById(-1), undefined);
    assert.strictEqual(getBlogPostById(Number.NaN), undefined);
  });
});

describe("blog catalog integrity", () => {
  it("has unique ids, slugs, and complete post content", () => {
    const ids = BLOG_POSTS.map((p) => p.id);
    const slugs = BLOG_POSTS.map((p) => p.slug);
    assert.strictEqual(new Set(ids).size, ids.length);
    assert.strictEqual(new Set(slugs).size, slugs.length);

    for (const post of BLOG_POSTS) {
      assert.match(post.date, /^\d{4}-\d{2}-\d{2}$/);
      assert.match(post.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      assert.ok(post.title.length > 0);
      assert.ok(post.excerpt.length > 0);
      assert.ok(post.sections.length > 0);
      assert.ok(post.summary.length > 0);
      assert.ok(existsSync(`public${post.image}`), `missing image ${post.image}`);
      assert.strictEqual(getBlogPath(post), `/blog/${post.slug}`);
      assert.strictEqual(getBlogPostBySlug(post.slug), post);
      assert.strictEqual(getBlogPostByParam(post.slug), post);
      assert.strictEqual(getBlogPostByParam(String(post.id)), post);
    }
  });
});
