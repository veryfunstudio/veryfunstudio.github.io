import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { formatGameTags, GAMES, getGameBySlug, getGamesByNewest, getNewestGame } from "./games";

describe("games data helpers", () => {
  it("getGamesByNewest returns a newest-first sorted copy without mutating source", () => {
    const originalFirst = GAMES[0];
    const sorted = getGamesByNewest();

    assert.notStrictEqual(sorted, GAMES);
    assert.deepStrictEqual(
      sorted.map((g) => g.releaseDate),
      [...GAMES]
        .sort((a, b) => b.releaseDate.localeCompare(a.releaseDate))
        .map((g) => g.releaseDate),
    );
    assert.strictEqual(GAMES[0], originalFirst);
  });

  it("getNewestGame returns the newest release", () => {
    const newest = getNewestGame();
    const expected = getGamesByNewest()[0];
    assert.strictEqual(newest, expected);
  });

  it("getGameBySlug returns the matching game or undefined", () => {
    const existing = GAMES[0];
    assert.strictEqual(getGameBySlug(existing.slug), existing);
    assert.strictEqual(getGameBySlug("non-existent-slug"), undefined);
  });

  it("formatGameTags drops the first technology and joins the rest with ' / '", () => {
    const game = GAMES[0];
    const expected = game.technologies.slice(1).join(" / ");
    assert.strictEqual(formatGameTags(game), expected);
  });

  it("formatGameTags returns an empty string when only the platform tag is present", () => {
    const game = { ...GAMES[0], technologies: ["Android"] };
    assert.strictEqual(formatGameTags(game), "");
  });
});
