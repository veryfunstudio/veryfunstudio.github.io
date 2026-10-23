/**
 * The Nova Mahjong board, as a small pure state machine.
 *
 * Why a real board instead of a poster: the studio's pitch is "make room for
 * play", and the one thing a puzzle site can show that a static image cannot
 * is the actual verb. These are the shipped Nova Mahjong face assets
 * (public/game-assets/nova-mahjong/*.png, copied unchanged from the game
 * client — see docs/game-asset-provenance.json). Six faces, each appearing
 * twice, is a twelve-tile board: small enough to finish, real enough to teach
 * the rule.
 *
 * The rules are solitaire's, not mahjong's: a tile may be taken when it is
 * free — nothing on top of it, and at least one of its side edges is open —
 * and two free tiles of the same face may be taken together.
 *
 * Geometry is in half-tile units. A tile is 2 × 2 units, tiles sit on a
 * 2-unit pitch, and each row of the cascade steps one unit right and a little
 * down. The result is a shingled deck — the way a mahjong board actually
 * looks — rather than a flat grid.
 *
 *   row 3 (top)      ▢ ▢ ▢
 *   row 2            ▢ ▢ ▢
 *   row 1          ▢ ▢ ▢
 *   row 0 (base)  ▢ ▢ ▢
 *
 * Each row covers the row below it, so "free" and "covered" are properties
 * the player can see on the board, not rules they have to take on faith.
 *
 * Everything here is pure and synchronous so it can be unit tested without a
 * DOM. Rendering lives in the component.
 */

/** The six faces used on the board, in the order they appear in the assets. */
export const TILE_FACES = [
  "tile_dot_6",
  "tile_bamboo_3",
  "tile_character_5",
  "tile_dragon_red",
  "tile_flower_orchid",
  "tile_flower_chrysanthemum",
] as const;

export type TileFace = (typeof TILE_FACES)[number];

/** Asset path for a face. Kept in one place so the component never guesses. */
export const faceAsset = (face: TileFace): string => `/game-assets/nova-mahjong/${face}.png`;

/** Human-readable label for a face, used for screen-reader text. */
export const FACE_LABELS: Record<TileFace, string> = {
  tile_dot_6: "six of dots",
  tile_bamboo_3: "three of bamboo",
  tile_character_5: "five of characters",
  tile_dragon_red: "red dragon",
  tile_flower_orchid: "orchid",
  tile_flower_chrysanthemum: "chrysanthemum",
};

/** A tile is 2 half-units wide and tall. */
export const TILE_UNITS = 2;
/** Tiles sit on a 2-unit pitch, with a small gap so each one reads. */
export const TILE_PITCH = 2;
/** Each row of the cascade steps this far down. */
export const ROW_STEP = 1.55;
/** Each row of the cascade steps this far right. */
export const ROW_SHIFT = 1;
/** Tiles per row, and rows in the cascade. */
export const ROWS = 4;
export const COLUMNS = 3;

export interface Tile {
  id: number;
  face: TileFace;
  /** Top-left corner in half-tile units. */
  x: number;
  y: number;
  /** Higher means nearer the viewer. */
  layer: number;
}

export interface BoardState {
  tiles: Tile[];
  /** Ids of tiles already taken off the board. */
  removed: number[];
  /** The single tile currently held up, if any. */
  held: number | null;
  /** The pair just matched, awaiting its clear animation. */
  matched: number[];
  /** Ids the player tried that could not be taken, so the UI can explain. */
  blocked: number[];
}

export type TapResult =
  | { kind: "blocked"; tileId: number }
  | { kind: "held"; tileId: number }
  | { kind: "matched"; ids: [number, number] }
  | { kind: "released"; tileId: number }
  | { kind: "ignored"; tileId: number };

/**
 * The geometry, before any faces are assigned.
 *
 * Row 0 is the bottom of the cascade and row 3 the top. Within a row the
 * tiles are evenly pitched; each row steps one unit right of the row below,
 * which is what makes the rows overlap and gives the board its shingled look.
 */
function buildGeometry(): Array<{ x: number; y: number; layer: number }> {
  const cells: Array<{ x: number; y: number; layer: number }> = [];
  for (let row = 0; row < ROWS; row += 1) {
    for (let column = 0; column < COLUMNS; column += 1) {
      cells.push({
        x: row * ROW_SHIFT + column * TILE_PITCH,
        y: (ROWS - 1 - row) * ROW_STEP,
        layer: row,
      });
    }
  }
  return cells;
}

/** Do two rectangles share any area? */
const overlaps = (ax: number, ay: number, bx: number, by: number): boolean =>
  ax < bx + TILE_UNITS && bx < ax + TILE_UNITS && ay < by + TILE_UNITS && by < ay + TILE_UNITS;

const byId = (state: BoardState, id: number): Tile | undefined =>
  state.tiles.find((tile) => tile.id === id);

/**
 * Is this tile free to take?
 *
 * Two conditions, both visible on the board:
 *   1. Nothing on a higher layer overlaps it.
 *   2. At least one of its side edges is clear — left *or* right.
 *
 * The "or" is the rule that trips people up. A tile wedged between two
 * neighbours is stuck, but the end tile of a row is free because its outer
 * side is open. Only looking for a clear edge on *both* sides would lock the
 * board from the first move.
 */
export function isFree(state: BoardState, tile: Tile): boolean {
  if (state.removed.includes(tile.id)) return false;
  if (state.matched.includes(tile.id)) return false;

  const gone = new Set(state.removed);
  let leftBlocked = false;
  let rightBlocked = false;

  for (const other of state.tiles) {
    if (other.id === tile.id || gone.has(other.id)) continue;

    if (other.layer > tile.layer) {
      // Higher layer: covered if the footprints share any area.
      if (overlaps(tile.x, tile.y, other.x, other.y)) return false;
      continue;
    }

    if (other.layer === tile.layer) {
      // Same layer: only a horizontally adjacent tile in the same row band
      // blocks an edge.
      const sameBand = other.y < tile.y + TILE_UNITS && tile.y < other.y + TILE_UNITS;
      if (!sameBand) continue;
      if (other.x + TILE_UNITS === tile.x) leftBlocked = true;
      if (tile.x + TILE_UNITS === other.x) rightBlocked = true;
    }
  }

  return !(leftBlocked && rightBlocked);
}

/** Tiles that can be taken right now. */
export function freeTiles(state: BoardState): Tile[] {
  return state.tiles.filter((tile) => isFree(state, tile));
}

/** How many tiles are still on the board. */
export function remaining(state: BoardState): number {
  return state.tiles.length - state.removed.length - state.matched.length;
}

/**
 * Find a full solution, if there is one.
 *
 * Depth-first over free pairs. Twelve tiles is six pairs, so the search is
 * trivial — but it is a search rather than a guess, which is what lets the
 * hint button promise a move that actually works.
 *
 * Returns the matched pairs in order, or null when the board is dead.
 */
export function solveBoard(state: BoardState): Array<[number, number]> | null {
  const seen = new Set<string>();

  const search = (current: BoardState): Array<[number, number]> | null => {
    if (remaining(current) === 0) return [];

    const key = current.removed
      .slice()
      .sort((a, b) => a - b)
      .join(",");
    if (seen.has(key)) return null;
    seen.add(key);

    const free = freeTiles(current);
    for (let i = 0; i < free.length; i += 1) {
      for (let j = i + 1; j < free.length; j += 1) {
        if (free[i].face !== free[j].face) continue;
        const next: BoardState = {
          ...current,
          removed: [...current.removed, free[i].id, free[j].id],
        };
        const rest = search(next);
        if (rest) return [[free[i].id, free[j].id], ...rest];
      }
    }
    return null;
  };

  return search(state);
}

/**
 * Build a board that is solvable by construction.
 *
 * Instead of assigning six faces and then hoping the result can be solved,
 * this plays a legal game backwards: it repeatedly picks two tiles that are
 * free *right now* and gives them the next unused face. If the search runs
 * all the way down, the faces it assigned describe a board with a known
 * solution — because the search walked one.
 *
 * The search is deterministic (tiles in id order, faces in TILE_FACES
 * order), so every visitor gets the same puzzle.
 */
function assignFaces(cells: Array<{ x: number; y: number; layer: number }>): Tile[] {
  const tiles: Tile[] = cells.map((cell, id) => ({
    id,
    face: TILE_FACES[0],
    ...cell,
  }));
  const removed = new Set<number>();
  const usedFaces = new Set<TileFace>();

  const freeNow = (): number[] =>
    tiles
      .filter((tile) => !removed.has(tile.id))
      .filter((tile) =>
        isFree({ tiles, removed: [...removed], held: null, matched: [], blocked: [] }, tile),
      )
      .map((tile) => tile.id);

  const search = (): boolean => {
    if (removed.size === tiles.length) return true;

    const free = freeNow();
    for (let i = 0; i < free.length; i += 1) {
      for (let j = i + 1; j < free.length; j += 1) {
        const a = free[i];
        const b = free[j];
        for (const face of TILE_FACES) {
          if (usedFaces.has(face)) continue;
          usedFaces.add(face);
          tiles[a].face = face;
          tiles[b].face = face;
          removed.add(a);
          removed.add(b);
          if (search()) return true;
          removed.delete(a);
          removed.delete(b);
          usedFaces.delete(face);
        }
      }
    }
    return false;
  };

  if (!search()) {
    // A board that cannot be finished would be a broken promise, so this
    // must never ship silently.
    throw new Error("No solvable face assignment was found for the board");
  }
  return tiles;
}

/**
 * The board.
 *
 * The faces are assigned by search so the puzzle is always completable; the
 * geometry is fixed so it looks the same on every machine.
 */
export function buildBoard(): Tile[] {
  return assignFaces(buildGeometry());
}

/** The board's extent in half-tile units, for laying it out in the DOM. */
export function boardExtent(tiles: Tile[]): { width: number; height: number } {
  let maxX = 0;
  let maxY = 0;
  for (const tile of tiles) {
    maxX = Math.max(maxX, tile.x + TILE_UNITS);
    maxY = Math.max(maxY, tile.y + TILE_UNITS);
  }
  return { width: maxX, height: maxY };
}

export function createBoardState(): BoardState {
  return { tiles: buildBoard(), removed: [], held: null, matched: [], blocked: [] };
}

/**
 * Handle a tap on a tile.
 *
 * The rules the player feels:
 *  - tapping a free tile picks it up
 *  - tapping a second free tile of the same face clears the pair
 *  - tapping the held tile puts it back
 *  - tapping a different face swaps the held tile
 *  - tapping a covered tile says why it is covered instead of doing nothing
 */
export function tapTile(state: BoardState, id: number): { state: BoardState; result: TapResult } {
  const tile = byId(state, id);
  if (!tile) return { state, result: { kind: "ignored", tileId: id } };
  if (state.removed.includes(id) || state.matched.includes(id)) {
    return { state, result: { kind: "ignored", tileId: id } };
  }

  // Tapping the held tile again puts it down.
  if (state.held === id) {
    return {
      state: { ...state, held: null, blocked: state.blocked.filter((b) => b !== id) },
      result: { kind: "released", tileId: id },
    };
  }

  // A covered tile: report it, so the UI can say what is in the way.
  if (!isFree(state, tile)) {
    const blocked = state.blocked.includes(id) ? state.blocked : [...state.blocked, id];
    return { state: { ...state, blocked }, result: { kind: "blocked", tileId: id } };
  }

  if (state.held !== null) {
    const heldTile = byId(state, state.held);
    if (heldTile && heldTile.face === tile.face) {
      return {
        state: {
          ...state,
          held: null,
          matched: [state.held, id],
          blocked: state.blocked.filter((b) => b !== state.held && b !== id),
        },
        result: { kind: "matched", ids: [state.held, id] },
      };
    }
    // Different face: the held tile goes back down, this one is picked up.
    return {
      state: { ...state, held: id, blocked: state.blocked.filter((b) => b !== id) },
      result: { kind: "held", tileId: id },
    };
  }

  return {
    state: { ...state, held: id, blocked: state.blocked.filter((b) => b !== id) },
    result: { kind: "held", tileId: id },
  };
}

/** Move matched tiles to removed and clear the held pair. */
export function commitMatch(state: BoardState): BoardState {
  if (state.matched.length === 0) return state;
  return { ...state, removed: [...state.removed, ...state.matched], matched: [] };
}

/** The face currently held up, if any. */
export function heldFace(state: BoardState): TileFace | null {
  const tile = state.held !== null ? byId(state, state.held) : undefined;
  return tile ? tile.face : null;
}

/**
 * A hint: the first pair of a real solution, so it always works.
 * Null when the board is already finished or has no solution left.
 */
export function findHint(state: BoardState): [number, number] | null {
  const solution = solveBoard(state);
  return solution && solution.length > 0 ? solution[0] : null;
}
