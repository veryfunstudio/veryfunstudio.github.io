import { RotateCcw, Sparkles } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  type BoardState,
  boardExtent,
  commitMatch,
  createBoardState,
  FACE_LABELS,
  faceAsset,
  findHint,
  heldFace,
  isFree,
  remaining,
  TILE_UNITS,
  tapTile,
} from "@/lib/mahjong-board";

/**
 * A real, playable Nova Mahjong board.
 *
 * This is the site's one true interactive surface: the studio sells "make
 * room for play", so the home page plays rather than describes. The tiles
 * are the shipped game faces (public/game-assets/nova-mahjong/*.png,
 * unchanged — see docs/game-asset-provenance.json), laid on the classic
 * solitaire rule: a tile is free when nothing covers it and at least one side
 * is open; two free tiles of the same face go together.
 *
 * The whole board is one button per tile with real semantics, so it works
 * with a keyboard and a screen reader. Nothing here depends on WebGL, which
 * matters because the previous hero display silently fell back to a poster
 * on machines without a GPU.
 */
export function MahjongBoard() {
  const [state, setState] = useState<BoardState>(() => createBoardState());
  const [message, setMessage] = useState<string>("");
  const [hintIds, setHintIds] = useState<number[]>([]);
  const clearTimer = useRef<number | undefined>(undefined);

  const extent = useMemo(() => boardExtent(state.tiles), [state.tiles]);
  const left = remaining(state);
  const held = heldFace(state);
  const finished = left === 0;

  // The clear animation is short; the timer is cleaned up so a fast replay
  // does not clear a board the player has already restarted.
  useEffect(
    () => () => {
      if (clearTimer.current) window.clearTimeout(clearTimer.current);
    },
    [],
  );

  const say = useCallback((text: string) => {
    setMessage(text);
    if (clearTimer.current) window.clearTimeout(clearTimer.current);
  }, []);

  const handleTap = useCallback(
    (id: number) => {
      const { state: next, result } = tapTile(state, id);

      if (result.kind === "blocked") {
        setState(next);
        say("That tile is covered. Clear what is on top of it first.");
        return;
      }

      if (result.kind === "matched") {
        setState(next);
        // The hint is spent once its pair is taken.
        setHintIds([]);
        say("Matched.");
        // Let the pair flash before it leaves the board.
        clearTimer.current = window.setTimeout(() => {
          setState((current) => commitMatch(current));
        }, 420);
        return;
      }

      if (result.kind === "held") {
        setState(next);
        const tile = next.tiles.find((item) => item.id === id);
        say(tile ? `Holding ${FACE_LABELS[tile.face]}.` : "");
        return;
      }

      if (result.kind === "released") {
        setState(next);
        say("");
        return;
      }

      setState(next);
    },
    [say, state],
  );

  const handleHint = useCallback(() => {
    const hint = findHint(state);
    if (!hint) {
      say("No move left on this board.");
      return;
    }
    setHintIds([hint[0], hint[1]]);
    const first = state.tiles.find((tile) => tile.id === hint[0]);
    say(first ? `Try the two ${FACE_LABELS[first.face]} tiles — both are free.` : "");
  }, [say, state]);

  const handleReset = useCallback(() => {
    if (clearTimer.current) window.clearTimeout(clearTimer.current);
    setState(createBoardState());
    setHintIds([]);
    say("");
  }, [say]);

  return (
    <div className="mahjong">
      <div className="mahjong__stage">
        <div className="mahjong__board">
          <div
            className="mahjong__field"
            style={{
              // The board's extent in half-units drives the tile positions, so
              // the layout and the rules share one set of numbers.
              ["--mahjong-width" as string]: `${extent.width}`,
              ["--mahjong-height" as string]: `${extent.height}`,
            }}
          >
            {state.tiles.map((tile) => {
              const gone = state.removed.includes(tile.id);
              const isMatched = state.matched.includes(tile.id);
              const free = !gone && !isMatched && isFree(state, tile);
              const isHeld = state.held === tile.id;
              const isHinted = hintIds.includes(tile.id);
              const blocked = state.blocked.includes(tile.id);

              // The tile fills its cell minus a hair, so neighbours read as
              // separate tiles instead of one slab. The cell itself still
              // decides what covers what.
              const cellW = (TILE_UNITS / extent.width) * 100;
              const cellH = (TILE_UNITS / extent.height) * 100;
              const inset = 3;

              return (
                <button
                  key={tile.id}
                  type="button"
                  className={[
                    "mahjong__tile",
                    free ? "is-free" : "",
                    isHeld ? "is-held" : "",
                    isMatched ? "is-matched" : "",
                    isHinted ? "is-hinted" : "",
                    blocked ? "is-blocked" : "",
                    gone ? "is-gone" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  style={{
                    left: `calc(${(tile.x / extent.width) * 100}% + ${inset}px)`,
                    top: `calc(${(tile.y / extent.height) * 100}% + ${inset}px)`,
                    width: `calc(${cellW}% - ${inset * 2}px)`,
                    height: `calc(${cellH}% - ${inset * 2}px)`,
                    zIndex: tile.layer + 1,
                  }}
                  disabled={gone || isMatched}
                  aria-label={`${FACE_LABELS[tile.face]}${free ? ", free" : ", covered"}`}
                  onClick={() => handleTap(tile.id)}
                >
                  <img src={faceAsset(tile.face)} alt="" aria-hidden="true" />
                </button>
              );
            })}
          </div>
        </div>

        {/* The held tile sits outside the board, so the player sees what they
            picked up before choosing its twin. */}
        <div className="mahjong__hand" aria-live="polite">
          <span className="mahjong__hand-label">In hand</span>
          <div className="mahjong__hand-slot">
            {held ? <img src={faceAsset(held)} alt={FACE_LABELS[held]} /> : null}
          </div>
        </div>
      </div>

      <div className="mahjong__bar">
        <p className="mahjong__status" role="status">
          {finished
            ? "Board cleared. That is the whole game."
            : message || `${left} tiles left. Pick two matching free tiles.`}
        </p>
        <div className="mahjong__actions">
          <button type="button" className="mahjong__btn" onClick={handleHint}>
            <Sparkles size={16} aria-hidden="true" />
            Hint
          </button>
          <button type="button" className="mahjong__btn" onClick={handleReset}>
            <RotateCcw size={16} aria-hidden="true" />
            Restart
          </button>
        </div>
      </div>
    </div>
  );
}
