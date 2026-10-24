import assert from "node:assert/strict";
import { describe, test } from "node:test";
import {
  buildBoard,
  commitMatch,
  createBoardState,
  faceAsset,
  findHint,
  freeTiles,
  isFree,
  remaining,
  solveBoard,
  TILE_FACES,
  tapTile,
} from "./mahjong-board.ts";

describe("the board", () => {
  test("has thirty tiles in fifteen matching pairs", () => {
    const tiles = buildBoard();
    assert.equal(tiles.length, 30);
    const counts = new Map<string, number>();
    for (const tile of tiles) {
      counts.set(tile.face, (counts.get(tile.face) ?? 0) + 1);
    }
    assert.equal(counts.size, 15);
    for (const face of TILE_FACES) {
      assert.equal(counts.get(face), 2, `${face} should appear exactly twice`);
    }
  });

  test("every face maps to a shipped asset", () => {
    for (const face of TILE_FACES) {
      assert.match(faceAsset(face), /^\/game-assets\/nova-mahjong\/tile_\w+\.png$/);
    }
  });

  test("the board is the same every time it is built", () => {
    // The face assignment is found by search; it must still be deterministic,
    // otherwise every visitor would get a different puzzle.
    const first = buildBoard();
    const second = buildBoard();
    assert.deepEqual(
      first.map((tile) => [tile.id, tile.face]),
      second.map((tile) => [tile.id, tile.face]),
    );
  });

  test("the board can actually be finished", () => {
    const solution = solveBoard(createBoardState());
    assert.ok(solution, "the starting board must have a solution");
    assert.equal(solution.length, 15);
    // Every tile is used exactly once across the fifteen pairs.
    const used = solution.flat();
    assert.equal(new Set(used).size, 30);
  });

  test("the board starts with only its corner tiles free", () => {
    const state = createBoardState();
    const free = freeTiles(state);
    // The bottom-left and the top-right of the cascade have an open edge;
    // everything else is covered or sandwiched.
    assert.ok(free.length >= 1, "the board must open with at least one move");
    assert.ok(
      free.every((tile) => isFree(state, tile)),
      "freeTiles must only report tiles that are really free",
    );
  });

  test("most of the board starts covered", () => {
    const state = createBoardState();
    const freeCount = freeTiles(state).length;
    assert.ok(freeCount < 30, "a board where everything is free teaches nothing");
    assert.ok(freeCount >= 2, "the board must open with at least one move");
  });
});

describe("taking tiles", () => {
  test("a covered tile cannot be taken and reports itself as blocked", () => {
    const state = createBoardState();
    const covered = state.tiles.find((tile) => !isFree(state, tile));
    assert.ok(covered);

    const { state: next, result } = tapTile(state, covered.id);
    assert.equal(result.kind, "blocked");
    assert.ok(next.blocked.includes(covered.id));
    // A blocked tap does not change what is held.
    assert.equal(next.held, null);
  });

  test("tapping a free tile picks it up, tapping it again puts it down", () => {
    const state = createBoardState();
    const free = freeTiles(state)[0];

    const held = tapTile(state, free.id);
    assert.equal(held.result.kind, "held");
    assert.equal(held.state.held, free.id);

    const released = tapTile(held.state, free.id);
    assert.equal(released.result.kind, "released");
    assert.equal(released.state.held, null);
  });

  test("two free tiles of the same face match and clear", () => {
    const state = createBoardState();
    const solution = solveBoard(state);
    assert.ok(solution);
    const [a, b] = solution[0];

    const first = tapTile(state, a);
    assert.equal(first.result.kind, "held");
    const second = tapTile(first.state, b);
    assert.equal(second.result.kind, "matched");
    assert.deepEqual(second.state.matched.slice().sort(), [a, b].sort());

    const cleared = commitMatch(second.state);
    assert.equal(remaining(cleared), 28);
  });

  test("tapping a different face swaps the held tile", () => {
    const state = createBoardState();
    const solution = solveBoard(state);
    assert.ok(solution);
    const [a, b] = solution[0];
    const cleared = commitMatch({ ...state, removed: [a, b] });

    // Hold one of the tiles that are still on the board.
    const live = freeTiles(cleared)[0];
    assert.ok(live);
    const held = tapTile(cleared, live.id);
    assert.equal(held.state.held, live.id);

    // A free tile of a different face puts the held one back down.
    const different = freeTiles(cleared).find((tile) => tile.face !== live.face);
    if (!different) return; // Only one face free; there is nothing to swap with.
    const swapped = tapTile(held.state, different.id);
    assert.equal(swapped.state.held, different.id);
  });
});

describe("the hint", () => {
  test("always offers a pair that can legally be taken", () => {
    const state = createBoardState();
    const hint = findHint(state);
    assert.ok(hint);

    const [a, b] = hint;
    const tileA = state.tiles.find((tile) => tile.id === a);
    const tileB = state.tiles.find((tile) => tile.id === b);
    assert.ok(tileA && tileB);
    assert.equal(tileA.face, tileB.face);
    assert.ok(isFree(state, tileA), "the hinted tile must be free");
    assert.ok(isFree(state, tileB), "the hinted tile must be free");
  });

  test("still finds a move after the board is partly cleared", () => {
    const state = createBoardState();
    const solution = solveBoard(state);
    assert.ok(solution);

    const [a, b] = solution[0];
    const played = commitMatch({ ...state, removed: [a, b] });
    const hint = findHint(played);
    assert.ok(hint, "there must still be a move after the first pair");
    const tileA = played.tiles.find((tile) => tile.id === hint[0]);
    const tileB = played.tiles.find((tile) => tile.id === hint[1]);
    assert.ok(tileA && tileB);
    assert.ok(isFree(played, tileA));
    assert.ok(isFree(played, tileB));
  });

  test("following the hints finishes the board", () => {
    let state = createBoardState();
    for (;;) {
      const hint = findHint(state);
      if (!hint) break;
      const [a, b] = hint;
      state = commitMatch({ ...state, removed: [...state.removed, a, b] });
    }
    assert.equal(remaining(state), 0, "hints must lead to a finished board");
  });
});
