# Game screenshot packs

Put real Google Play store screenshots here. The site gallery reads from
`Game.gallery` in `src/data/games.ts`.

## Layout

```
public/screenshots/{slug}/
  01-key-art.webp   # optional landscape key art (1200×630)
  02-board.jpg      # phone portrait board UI (≈1080×1920)
  03-focus.jpg      # second phone shot
```

## Data template (`games.ts`)

```ts
gallery: [
  {
    src: "/screenshots/nova-mahjong/01-key-art.webp",
    caption: "Store key art",
    alt: "Nova Mahjong For Seniors store key art",
    kind: "key-art",
    frame: "wide",
  },
  {
    src: "/screenshots/nova-mahjong/02-board.jpg",
    caption: "Board at rest",
    alt: "Nova Mahjong board",
    kind: "screen",
    frame: "phone",
  },
],
relatedPostSlugs: ["why-nova-mahjong-uses-large-clear-tiles"],
hook: "Large tiles. No clocks. Classic solitaire calm.",
```

## Caption style

- 2–6 words, mono label under the frame
- Prefer concrete board moments over marketing slogans
- `frame: "phone" | "wide" | "square"` drives UI chrome

## Current packs

Sample presentations (key art padded into phone frames) ship for **all seven** titles:

- `nova-mahjong`
- `classic-sudoku`
- `tile-journey`
- `word-search-block`
- `arrow-out`
- `pearl-coloring`
- `time-pop-puzzle`

Replace with real Play Console exports when available — keep paths or update `gallery` entries.
