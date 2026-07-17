import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { describe, it } from "node:test";
import {
  formatGameTags,
  GAMES,
  getGameBySlug,
  getGameScreenshots,
  getGamesByNewest,
  getNewestGame,
  getRelatedGames,
} from "./games";

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

describe("games catalog integrity", () => {
  it("has unique ids and slugs", () => {
    const ids = GAMES.map((g) => g.id);
    const slugs = GAMES.map((g) => g.slug);
    assert.strictEqual(new Set(ids).size, ids.length);
    assert.strictEqual(new Set(slugs).size, slugs.length);
  });

  it("keeps Play URLs aligned with package ids and ships local art", () => {
    for (const game of GAMES) {
      assert.ok(
        game.googlePlayUrl.endsWith(`id=${game.packageId}`),
        `${game.slug} Play URL does not match packageId`,
      );
      assert.match(game.releaseDate, /^\d{4}-\d{2}-\d{2}$/);
      assert.ok(game.faq.length > 0, `${game.slug} is missing FAQ`);
      assert.ok(game.answer.length > 40, `${game.slug} answer is too short`);
      assert.ok(existsSync(`public${game.icon}`), `missing icon ${game.icon}`);
      assert.ok(existsSync(`public${game.image}`), `missing image ${game.image}`);
      const shots = getGameScreenshots(game);
      assert.ok(shots.length >= 2, `${game.slug} gallery should have assets`);
      for (const shot of shots) {
        assert.ok(existsSync(`public${shot.src}`), `missing screenshot ${shot.src}`);
      }
      const related = getRelatedGames(game, 3);
      assert.ok(!related.some((r) => r.slug === game.slug));
    }
  });
});
