import { useCallback, useRef, useState } from "react";

/**
 * A loupe over the game's own key art.
 *
 * The collection used to be a poster with a paragraph beside it. A loupe is
 * the oldest way to say "look closer": the artwork is the real shipped key
 * art, and moving the pointer over it lifts a lens that magnifies whatever is
 * underneath — the mahjong faces on the board, the flower tiles in the
 * stack, the arrows in the grid.
 *
 * It magnifies the real image rather than drawing a stand-in, so nothing here
 * is an invented rendering of a game piece.
 *
 * The lens follows the pointer, and a tap or a click puts it there too, so
 * it works on a touch screen where there is no hover. It is a real button:
 * keyboard users can focus it and the lens opens in the middle, and the
 * label says so.
 */
interface Props {
  /** Path to the game's key art. */
  src: string;
  alt: string;
  /** Natural pixel size of the source image, used to map the pointer to art. */
  naturalWidth: number;
  naturalHeight: number;
}

const LENS_FRACTION = 0.42;
const ZOOM = 2.6;

export function GameLoupe({ src, alt, naturalWidth, naturalHeight }: Props) {
  const frame = useRef<HTMLButtonElement>(null);
  const [lens, setLens] = useState<{ x: number; y: number } | null>(null);

  const place = useCallback((clientX: number, clientY: number) => {
    const element = frame.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    setLens({ x: clientX - rect.left, y: clientY - rect.top });
  }, []);

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      if (event.pointerType === "touch") return;
      place(event.clientX, event.clientY);
    },
    [place],
  );

  /** The lens geometry, in pixels, for the current frame size. */
  const geometry = (() => {
    const element = frame.current;
    if (!element || !lens) return null;
    const rect = element.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    if (!width || !height) return null;

    // The art is drawn with object-fit: cover, so work out how it is scaled
    // and where it sits inside the frame.
    const scale = Math.max(width / naturalWidth, height / naturalHeight);
    const drawnWidth = naturalWidth * scale;
    const drawnHeight = naturalHeight * scale;
    const offsetX = (width - drawnWidth) / 2;
    const offsetY = (height - drawnHeight) / 2;

    // Where the pointer lands in the artwork's own coordinates.
    const artX = (lens.x - offsetX) / scale;
    const artY = (lens.y - offsetY) / scale;

    const diameter = Math.max(80, Math.min(width, height) * LENS_FRACTION);
    return {
      diameter,
      left: Math.max(0, Math.min(width - diameter, lens.x - diameter / 2)),
      top: Math.max(0, Math.min(height - diameter, lens.y - diameter / 2)),
      // The magnified image inside the lens.
      backgroundSize: `${drawnWidth * ZOOM}px ${drawnHeight * ZOOM}px`,
      backgroundPosition: `${diameter / 2 - artX * scale * ZOOM}px ${
        diameter / 2 - artY * scale * ZOOM
      }px`,
    };
  })();

  return (
    <button
      ref={frame}
      type="button"
      className="studio-loupe"
      aria-label={`${alt}. Look closer: move the pointer over the artwork, or focus this to magnify the centre.`}
      onPointerMove={onPointerMove}
      onPointerLeave={() => setLens(null)}
      onPointerDown={(event) => place(event.clientX, event.clientY)}
      onFocus={() => {
        const element = frame.current;
        if (!element) return;
        const rect = element.getBoundingClientRect();
        setLens({ x: rect.width / 2, y: rect.height / 2 });
      }}
      onBlur={() => setLens(null)}
    >
      <img src={src} alt={alt} width={1200} height={630} loading="lazy" />
      {geometry && (
        <span
          className="studio-loupe__lens"
          aria-hidden="true"
          style={{
            width: `${geometry.diameter}px`,
            height: `${geometry.diameter}px`,
            left: `${geometry.left}px`,
            top: `${geometry.top}px`,
            backgroundImage: `url(${src})`,
            backgroundSize: geometry.backgroundSize,
            backgroundPosition: geometry.backgroundPosition,
          }}
        />
      )}
    </button>
  );
}
