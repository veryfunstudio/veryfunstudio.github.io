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

The current three-title catalog ships verified landscape key art only:

- `nova-mahjong`
- `tile-journey`
- `arrow-out`

Their app icons live under `public/images/` and are also shown in the gallery. Add phone-framed
items only after real Play Console exports are available.
