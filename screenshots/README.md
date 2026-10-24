# Game gallery assets

Put verified Google Play artwork and real gameplay screenshots here. The site gallery reads from
`Game.gallery` in `src/data/games.ts`; never pad key art into a phone frame and label it gameplay.

## Layout

```
public/screenshots/{slug}/
  01-key-art.webp   # optional landscape key art (1200×630)
  02-board.jpg      # optional real phone portrait board UI (≈1080×1920)
  03-focus.jpg      # optional second real phone shot
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

All three featured titles ship verified landscape key art plus four real phone
screenshots pulled from the public Google Play listing (October 2026):

- `nova-mahjong` — felt board, large-tile layout, heart board, late-game layout
- `tile-journey` — fruit valley, sweet terrace, animal mill, night board
- `arrow-out` — sailboat, hidden cat, full-grid maze, orange tangle

Their app icons live under `public/images/` and are also shown in the gallery.
When a store listing updates, re-export the shots and keep captions concrete.
