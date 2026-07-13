import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BLOG_POSTS, getBlogPostById, getNewestPost, getPostsByNewest } from "./blog";

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
