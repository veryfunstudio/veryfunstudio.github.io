export interface FaqItem {
  question: string;
  answer: string;
}

export interface GameVisual {
  src: string;
  /** Short label under the frame, e.g. "Board at rest". */
  caption: string;
  alt: string;
  kind: "key-art" | "icon" | "screen";
  /** Presentation: phone portrait, wide key art, or square icon. */
  frame?: "phone" | "wide" | "square";
}

export interface Game {
  id: number;
  packageId: string;
  title: string;
  description: string;
  fullDescription: string;
  /** 50-80 word direct-answer paragraph for LLM extraction. */
  answer: string;
  /** 6–12 word catalog differentiator shown under the title. */
  hook: string;
  icon: string;
  image: string;
  technologies: string[];
  features: string[];
  faq: FaqItem[];
  releaseDate: string;
  slug: string;
  googlePlayUrl: string;
  /** Hand-picked studio notes (blog slugs). */
  relatedPostSlugs?: string[];
  /**
   * Store gallery. Prefer real Play screenshots under
   * `public/screenshots/{slug}/`. Captions + frame drive the detail UI.
   */
  gallery?: GameVisual[];
}

export const GAMES: Game[] = [
  {
    id: 7,
    packageId: "com.veryfuncompany.mahjongjourney",
    title: "Nova Mahjong For Seniors",
    description:
      "A calm, classic mahjong solitaire with large clear tiles, hundreds of handcrafted puzzles, and no time limits - built for relaxed brain training.",
    fullDescription:
      "Enjoy a relaxing tile-matching experience with Nova Mahjong For Seniors — a calm and classic mahjong puzzle game designed for seniors and anyone who loves peaceful brain training. Whether you are new to mahjong or already enjoy classic tile-matching games, Nova Mahjong For Seniors is easy to learn and satisfying to play. Match identical tiles, clear the board, and enjoy a soothing journey through beautifully crafted mahjong puzzles. With classic gameplay, large clear tiles, helpful boosters, and offline support, every level is comfortable, stress-free, and gentle on attention.",
    icon: "/images/nova-mahjong-icon.webp",
    image: "/images/nova-mahjong.webp",
    technologies: ["Android", "Mahjong", "Puzzle"],
    features: [
      "Classic mahjong solitaire gameplay",
      "Large, clear tiles designed for comfort",
      "Hundreds of handcrafted puzzles",
      "Helpful boosters: Hint, Undo, Shuffle",
      "No time limits - play at your pace",
      "Fully playable offline",
    ],
    answer:
      "Nova Mahjong For Seniors is a free Android mahjong solitaire game designed for relaxed, peaceful brain training. Players match identical free tiles to clear the board across hundreds of handcrafted puzzles with large, clear tiles and helpful boosters. There are no time limits, the game works offline, and the calm visuals make it suitable for seniors and anyone who enjoys classic tile-matching puzzles.",
    hook: "Large tiles. No clocks. Classic solitaire calm.",
    relatedPostSlugs: ["why-nova-mahjong-uses-large-clear-tiles", "why-our-puzzles-avoid-timers"],
    gallery: [
      {
        src: "/screenshots/nova-mahjong/01-key-art.webp",
        caption: "Store key art",
        alt: "Nova Mahjong For Seniors store key art",
        kind: "key-art",
        frame: "wide",
      },
      {
        src: "/images/nova-mahjong-icon.webp",
        caption: "App icon",
        alt: "Nova Mahjong For Seniors app icon",
        kind: "icon",
        frame: "square",
      },
    ],
    faq: [
      {
        question: "Is Nova Mahjong For Seniors free to play?",
        answer:
          "Yes, Nova Mahjong For Seniors is free to download and play on Google Play. All core puzzles are accessible without payment.",
      },
      {
        question: "How do you play Nova Mahjong For Seniors?",
        answer:
          "Match two identical mahjong tiles to remove them from the board. Only free and unblocked tiles can be matched. Clear every tile to complete the level.",
      },
      {
        question: "Does Nova Mahjong For Seniors have time limits?",
        answer:
          "No. The game is designed to be stress-free, so you can take as long as you need on each puzzle.",
      },
      {
        question: "Can I play Nova Mahjong For Seniors offline?",
        answer:
          "Yes, Nova Mahjong For Seniors is fully playable offline once installed, so you can enjoy it anywhere without an internet connection.",
      },
    ],
    releaseDate: "2026-06-29",
    slug: "nova-mahjong",
    googlePlayUrl:
      "https://play.google.com/store/apps/details?id=com.veryfuncompany.mahjongjourney",
  },
  {
    id: 2,
    packageId: "com.veryfun.tilejourney",
    title: "Tile Journey",
    description:
      "A relaxing 3D tile-matching adventure across hand-crafted themed worlds - match three, plan ahead, and unwind at your own pace.",
    fullDescription:
      "Tile Journey turns the classic match-three puzzle into a mindful 3D expedition. Travel through dreamy clouds, vibrant landscapes, and richly themed levels, each demanding sharp observation and a little forward planning to keep your tile slots clear. Strategic power-ups - shuffle, undo, and free-match - keep frustration at bay, while the no-timer pacing lets you settle in for one quick level or a long evening of puzzles. With thousands of stages to conquer and offline play anywhere, it's a daily companion for casual players and puzzle veterans alike.",
    icon: "/images/tile-journey-icon.webp",
    image: "/images/tile-journey.webp",
    technologies: ["Android", "Match-3", "3D"],
    features: [
      "Thousands of hand-crafted 3D levels",
      "Diverse themed worlds to explore",
      "No time limits - play at your pace",
      "Power-ups: shuffle, undo, and free match",
      "Strategic tile-slot planning",
      "Fully playable offline anytime",
    ],
    answer:
      "Tile Journey is a free 3D tile-matching puzzle game for Android where players travel through thousands of hand-crafted themed levels, matching three identical tiles to clear the board. The game features strategic power-ups (shuffle, undo, free match), no time limits, and full offline support. It blends casual match-three mechanics with mindful pacing, making it suitable for both quick breaks and extended puzzle sessions across diverse visual worlds.",
    hook: "3D match-three. Offline. Thousands of levels.",
    relatedPostSlugs: ["why-tile-journey-works-offline", "keeping-mobile-builds-light"],
    gallery: [
      {
        src: "/screenshots/tile-journey/01-key-art.webp",
        caption: "Store key art",
        alt: "Tile Journey store key art",
        kind: "key-art",
        frame: "wide",
      },
      {
        src: "/images/tile-journey-icon.webp",
        caption: "App icon",
        alt: "Tile Journey app icon",
        kind: "icon",
        frame: "square",
      },
    ],
    faq: [
      {
        question: "Is Tile Journey free to play?",
        answer:
          "Yes, Tile Journey is free to download and play on Google Play. The game includes optional ads and in-app purchases for power-ups, but all levels are beatable without spending money.",
      },
      {
        question: "How many levels does Tile Journey have?",
        answer:
          "Tile Journey features thousands of hand-crafted 3D levels across diverse themed worlds. New levels are added regularly, ensuring there is always fresh content for returning players.",
      },
      {
        question: "Does Tile Journey require an internet connection?",
        answer:
          "No, Tile Journey can be played fully offline once installed. An internet connection is only needed for the initial download and optional features like cloud save or new content updates.",
      },
      {
        question: "What are the power-ups in Tile Journey?",
        answer:
          "Tile Journey offers three main power-ups: Shuffle (rearranges all tiles on the board), Undo (reverses your last move), and Free Match (removes a tile without needing a triple). These help when you get stuck on difficult levels.",
      },
    ],
    releaseDate: "2026-06-08",
    slug: "tile-journey",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=com.veryfun.tilejourney",
  },
  {
    id: 4,
    packageId: "com.veryfuncompany.kittyescape",
    title: "Arrow Out",
    description:
      "A deceptively simple arrow-tile puzzle where every move matters - clear the grid, one direction at a time.",
    fullDescription:
      "Arrow Out is the kind of puzzle that's easy to learn and quietly impossible to put down. Every tile points somewhere, and your job is to send it off the grid without letting another arrow block its path. Plan a few moves ahead, untangle the chain, and watch the board open up. Hundreds of handcrafted levels mix short brain teasers with longer think-aheads, and the minimal, relaxing visual style keeps things calm even when the logic gets thorny. No timers, no pressure - just a sharp puzzle waiting on every screen.",
    icon: "/images/arrow-out-icon.webp",
    image: "/images/arrow-out.webp",
    technologies: ["Android", "Puzzle", "Logic"],
    features: [
      "Hundreds of handcrafted levels",
      "Simple to learn, hard to master",
      "No time limits - play stress-free",
      "Helpful hints when you're stuck",
      "Clean, minimal visual style",
      "Smooth, satisfying controls",
    ],
    answer:
      "Arrow Out is a free Android logic puzzle game where every tile points in a direction and your goal is to send each arrow off the grid without it being blocked by another. The game features hundreds of handcrafted levels that range from quick brain teasers to extended think-aheads, a helpful hint system, no time limits, and a clean minimal visual style. It is easy to learn but quietly hard to put down.",
    hook: "One direction at a time. Handcrafted paths.",
    relatedPostSlugs: ["the-logic-behind-arrow-outs-handcrafted-levels"],
    gallery: [
      {
        src: "/screenshots/arrow-out/01-key-art.webp",
        caption: "Store key art",
        alt: "Arrow Out store key art",
        kind: "key-art",
        frame: "wide",
      },
      {
        src: "/images/arrow-out-icon.webp",
        caption: "App icon",
        alt: "Arrow Out app icon",
        kind: "icon",
        frame: "square",
      },
    ],
    faq: [
      {
        question: "Is Arrow Out free to play?",
        answer:
          "Yes, Arrow Out is free to download and play on Google Play. All levels are accessible without payment, with optional ads between stages.",
      },
      {
        question: "How many levels does Arrow Out have?",
        answer:
          "Arrow Out features hundreds of handcrafted levels that mix short brain teasers with longer strategic puzzles. Each level has a deliberate, elegant solution - no procedurally generated filler.",
      },
      {
        question: "Does Arrow Out have a time limit?",
        answer:
          "No, Arrow Out has no timers. The game is designed to be stress-free, letting you think through each move at your own pace without pressure.",
      },
      {
        question: "Are there hints in Arrow Out?",
        answer:
          "Yes, Arrow Out includes a hint system that helps you when you are stuck on a difficult level, so you never feel permanently blocked by a tough puzzle.",
      },
    ],
    releaseDate: "2026-05-26",
    slug: "arrow-out",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=com.veryfuncompany.kittyescape",
  },
];

export function getGameBySlug(slug: string): Game | undefined {
  return GAMES.find((game) => game.slug === slug);
}

/**
 * Games ordered newest-first by releaseDate. Sorted copy; does not mutate the
 * source array. Centralized so callers never hand-roll the comparator.
 */
export function getGamesByNewest(): Game[] {
  return [...GAMES].sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));
}

/** Newest game by releaseDate, falling back to the first catalog entry. */
export function getNewestGame(): Game {
  return getGamesByNewest()[0] ?? GAMES[0];
}

/**
 * Secondary tag list (platform tag dropped) joined for display, e.g.
 * `["Android", "Mahjong", "Puzzle"]` -> `"Mahjong / Puzzle"`.
 */
export function formatGameTags(game: Game): string {
  return game.technologies.slice(1).join(" / ");
}

/**
 * Visual assets for the detail gallery. Prefer `game.gallery` (captioned
 * store shots). Fall back to key art + icon for titles without a pack yet.
 */
export function getGameGallery(game: Game): GameVisual[] {
  if (game.gallery && game.gallery.length > 0) {
    return game.gallery;
  }
  return [
    {
      src: game.image,
      caption: "Key art",
      alt: `${game.title} key art`,
      kind: "key-art",
      frame: "wide",
    },
    {
      src: game.icon,
      caption: "App icon",
      alt: `${game.title} app icon`,
      kind: "icon",
      frame: "square",
    },
  ];
}

/** Other games sharing secondary genre tags, newest first. */
export function getRelatedGames(game: Game, limit = 3): Game[] {
  const tags = new Set(game.technologies.slice(1).map((t) => t.toLowerCase()));
  return getGamesByNewest()
    .filter((candidate) => candidate.slug !== game.slug)
    .map((candidate) => {
      const overlap = candidate.technologies
        .slice(1)
        .filter((t) => tags.has(t.toLowerCase())).length;
      return { candidate, overlap };
    })
    .sort(
      (a, b) =>
        b.overlap - a.overlap || b.candidate.releaseDate.localeCompare(a.candidate.releaseDate),
    )
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}
