export interface FaqItem {
  question: string;
  answer: string;
}

export interface GameScreenshot {
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
  gallery?: GameScreenshot[];
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
        src: "/screenshots/nova-mahjong/02-board.jpg",
        caption: "Board at rest",
        alt: "Nova Mahjong board presentation",
        kind: "screen",
        frame: "phone",
      },
      {
        src: "/screenshots/nova-mahjong/03-focus.jpg",
        caption: "Readable tiles up close",
        alt: "Nova Mahjong tile focus",
        kind: "screen",
        frame: "phone",
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
    id: 1,
    packageId: "com.codex.sudokumobilegame",
    title: "Classic Sudoku 2026",
    description:
      "A clean, calming Sudoku with multiple difficulty levels, smart hints, and zero pressure - perfect for daily brain training.",
    fullDescription:
      "Classic Sudoku 2026 is a relaxing, no-pressure spin on the 9×9 logic puzzle that has charmed players for generations. Fill rows, columns, and boxes with numbers 1 through 9, earn points as you complete lines, and watch your skills sharpen across multiple difficulty levels. There are no timers - only smart hints, an undo button, and a clean interface that gets out of your way. Play offline anywhere, track your improvement, and pick the puzzle that fits your mood, whether that's a five-minute coffee break or a long flight.",
    icon: "/images/classic-sudoku-icon.webp",
    image: "/images/classic-sudoku.webp",
    technologies: ["Android", "Puzzle", "Logic"],
    features: [
      "Multiple difficulty levels for every skill",
      "No time limits - play stress-free",
      "Smart hints, undo, and erase tools",
      "Score system for an extra challenge",
      "Progress tracking across sessions",
      "Fully playable offline",
    ],
    answer:
      "Classic Sudoku 2026 is a free, calming Android puzzle game that reinvents the classic 9×9 number logic grid with multiple difficulty levels, smart hints, and a stress-free no-timer design. Players fill rows, columns, and boxes with digits 1-9, earn points for completed lines, and track progress over time. The game works fully offline and is suitable for all skill levels, from quick coffee-break puzzles to longer sessions.",
    hook: "Nine-by-nine logic. Zero countdown pressure.",
    relatedPostSlugs: ["how-we-balance-difficulty-in-classic-sudoku", "designing-a-readable-board"],
    gallery: [
      {
        src: "/screenshots/classic-sudoku/01-key-art.webp",
        caption: "Store key art",
        alt: "Classic Sudoku 2026 store key art",
        kind: "key-art",
        frame: "wide",
      },
      {
        src: "/screenshots/classic-sudoku/02-board.jpg",
        caption: "Grid first, chrome second",
        alt: "Classic Sudoku board presentation",
        kind: "screen",
        frame: "phone",
      },
      {
        src: "/screenshots/classic-sudoku/03-focus.jpg",
        caption: "Quiet focus mode",
        alt: "Classic Sudoku focus presentation",
        kind: "screen",
        frame: "phone",
      },
    ],
    faq: [
      {
        question: "Is Classic Sudoku 2026 free to play?",
        answer:
          "Yes, Classic Sudoku 2026 is completely free to download and play on Google Play. There are no paywalls - every puzzle and difficulty level is accessible without spending money.",
      },
      {
        question: "Does Classic Sudoku 2026 work offline?",
        answer:
          "Yes, the game is fully playable offline. Once installed, you can solve puzzles anywhere without an internet connection - perfect for flights, commutes, or areas with poor connectivity.",
      },
      {
        question: "How many difficulty levels does Classic Sudoku 2026 have?",
        answer:
          "The game offers multiple difficulty levels ranging from beginner-friendly grids to expert challenges. Each level scales the puzzle complexity so players of all skill levels can find the right amount of challenge.",
      },
      {
        question: "Does Classic Sudoku 2026 have a timer?",
        answer:
          "No. Classic Sudoku 2026 is designed to be stress-free with no time limits. You can take as long as you need on any puzzle, making it ideal for relaxing rather than racing against the clock.",
      },
    ],
    releaseDate: "2026-06-14",
    slug: "classic-sudoku",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=com.codex.sudokumobilegame",
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
        src: "/screenshots/tile-journey/02-board.jpg",
        caption: "Themed boards",
        alt: "Tile Journey board presentation",
        kind: "screen",
        frame: "phone",
      },
      {
        src: "/screenshots/tile-journey/03-focus.jpg",
        caption: "Match-three in motion",
        alt: "Tile Journey focus presentation",
        kind: "screen",
        frame: "phone",
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
    id: 3,
    packageId: "com.cookabc.zenwordsearch",
    title: "Word Search Block",
    description:
      "A serene word-search puzzle with clear themes, helpful hints, and a soothing visual style - for relaxed vocabulary training.",
    fullDescription:
      "Word Search Block is a peaceful word-puzzle escape designed to bring calm and focus into the everyday. Swipe across the letter grid to discover hidden words tied together by clear, friendly themes - perfect for sharpening vocabulary and spelling without the pressure of a timer. Each level scales gently in difficulty as you progress, and a thoughtful hint system keeps you moving when you get stuck. Whether you're winding down before bed or sneaking in a quick break, the soft visual style makes every session feel like a small breather.",
    icon: "/images/word-search-block-icon.webp",
    image: "/images/word-search-block.webp",
    technologies: ["Android", "Word", "Casual"],
    features: [
      "Hundreds of themed word puzzles",
      "Simple swipe-to-select controls",
      "Helpful hints when you're stuck",
      "Progressive difficulty curve",
      "Clean, calming visual style",
      "Play anytime, anywhere",
    ],
    answer:
      "Word Search Block is a free, calming word-search puzzle game for Android. Players swipe across a letter grid to discover hidden words grouped by friendly themes, sharpening vocabulary and spelling skills at a relaxed pace. The game features hundreds of themed puzzles, a gentle difficulty curve, helpful hints, and a clean visual style designed for mindful play - perfect for winding down or quick breaks.",
    hook: "Themed word grids for unhurried vocabulary play.",
    relatedPostSlugs: ["how-themed-puzzles-build-vocabulary"],
    gallery: [
      {
        src: "/screenshots/word-search-block/01-key-art.webp",
        caption: "Store key art",
        alt: "Word Search Block store key art",
        kind: "key-art",
        frame: "wide",
      },
      {
        src: "/screenshots/word-search-block/02-board.jpg",
        caption: "Themed letter grids",
        alt: "Word Search Block board presentation",
        kind: "screen",
        frame: "phone",
      },
      {
        src: "/screenshots/word-search-block/03-focus.jpg",
        caption: "Swipe to find words",
        alt: "Word Search Block focus presentation",
        kind: "screen",
        frame: "phone",
      },
    ],
    faq: [
      {
        question: "Is Word Search Block free to play?",
        answer:
          "Yes, Word Search Block is free to download and play on Google Play. All puzzles are accessible without payment, though optional ads may appear between levels.",
      },
      {
        question: "How many word puzzles does Word Search Block have?",
        answer:
          "Word Search Block includes hundreds of themed word puzzles that scale gently in difficulty. New themes and levels are added regularly to keep the content fresh for returning players.",
      },
      {
        question: "Is Word Search Block suitable for kids?",
        answer:
          "Yes, the game's clean themes, simple swipe controls, and vocabulary-building nature make it suitable for players of all ages, including children learning spelling and word recognition.",
      },
      {
        question: "Does Word Search Block have a timer?",
        answer:
          "No, Word Search Block has no time limits. The game is designed for relaxed, pressure-free play so you can take as long as you need on each puzzle.",
      },
    ],
    releaseDate: "2026-06-20",
    slug: "word-search-block",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=com.cookabc.zenwordsearch",
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
        src: "/screenshots/arrow-out/02-board.jpg",
        caption: "Clear the grid",
        alt: "Arrow Out board presentation",
        kind: "screen",
        frame: "phone",
      },
      {
        src: "/screenshots/arrow-out/03-focus.jpg",
        caption: "Plan the path",
        alt: "Arrow Out focus presentation",
        kind: "screen",
        frame: "phone",
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
  {
    id: 5,
    packageId: "com.veryfun.pearlcoloring",
    title: "Pearl Coloring",
    description:
      "Sort glowing pearls, reveal pixel-art masterpieces, and slip into a calm world of color and gentle puzzles.",
    fullDescription:
      "Pearl Coloring blends color sorting with pixel-art creation into something soft, glowing, and quietly addictive. Tap to arrange lustrous pearls into matching color groups, plan your shelf to clear each puzzle, and watch hidden pixel-art designs reveal themselves layer by layer. Every level is a tiny artistic moment: gentle audio, polished 3D pearls, and a steady drip of new themes and limited-time collections. There's no pressure here - just sorting, planning, and the small satisfaction of a finished picture, with full offline support so you can play whenever the mood strikes.",
    icon: "/images/pearl-coloring-icon.webp",
    image: "/images/pearl-coloring.webp",
    technologies: ["Android", "Pixel Art", "Sorting"],
    features: [
      "Hundreds of pixel-art puzzles",
      "Simple tap-to-sort gameplay",
      "Polished 3D pearls and audio feedback",
      "Limited-time themed collections",
      "Gentle brain exercise for any age",
      "Full offline support",
    ],
    answer:
      "Pearl Coloring is a free Android puzzle game that blends color sorting with pixel-art creation. Players tap to arrange lustrous 3D pearls into matching color groups, clearing each puzzle shelf to reveal hidden pixel-art designs layer by layer. The game features hundreds of puzzles, polished 3D visuals and audio, limited-time themed collections, gentle brain exercise suitable for all ages, and full offline support for play anywhere.",
    hook: "Sort pearls. Reveal pixel art. Stay soft.",
    relatedPostSlugs: ["how-pearl-coloring-blends-sorting-and-pixel-art"],
    gallery: [
      {
        src: "/screenshots/pearl-coloring/01-key-art.webp",
        caption: "Store key art",
        alt: "Pearl Coloring store key art",
        kind: "key-art",
        frame: "wide",
      },
      {
        src: "/screenshots/pearl-coloring/02-board.jpg",
        caption: "Sort, then reveal",
        alt: "Pearl Coloring board presentation",
        kind: "screen",
        frame: "phone",
      },
      {
        src: "/screenshots/pearl-coloring/03-focus.jpg",
        caption: "Pixel art payoff",
        alt: "Pearl Coloring focus presentation",
        kind: "screen",
        frame: "phone",
      },
    ],
    faq: [
      {
        question: "Is Pearl Coloring free to play?",
        answer:
          "Yes, Pearl Coloring is free to download and play on Google Play. All core puzzles are accessible without payment, with optional ads and in-app purchases for cosmetic items.",
      },
      {
        question: "Does Pearl Coloring work offline?",
        answer:
          "Yes, Pearl Coloring has full offline support. Once installed, you can sort pearls and reveal pixel art anywhere without an internet connection.",
      },
      {
        question: "What is the gameplay in Pearl Coloring?",
        answer:
          "In Pearl Coloring, you tap to sort glowing 3D pearls into matching color groups on a shelf. When all colors are grouped correctly, the puzzle clears and reveals a hidden pixel-art design. The difficulty increases gradually across hundreds of levels.",
      },
      {
        question: "Is Pearl Coloring suitable for children?",
        answer:
          "Yes, Pearl Coloring is designed as gentle brain exercise suitable for any age. The simple tap-to-sort mechanics and calming visual style make it appropriate for children and adults alike.",
      },
    ],
    releaseDate: "2026-06-08",
    slug: "pearl-coloring",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=com.veryfun.pearlcoloring",
  },
  {
    id: 6,
    packageId: "com.veryfuncompany.bubble",
    title: "Time Pop Puzzle",
    description:
      "Quick AM/PM → 24-hour drills where the timer is the skill — short rounds, clean style, instant feedback.",
    fullDescription:
      "Time Pop Puzzle is a casual brain-training game about quick time conversion. Read the AM/PM time, choose the correct 24-hour answer, and keep your streak going. Unlike our calmer boards, the clock here is intentional: recognition speed is the lesson. Each round is short, clear, and fast, with simple taps, streak rewards, and instant feedback so a spare moment becomes useful practice.",
    icon: "/images/time-pop-puzzle-icon.webp",
    image: "/images/time-pop-puzzle.webp",
    technologies: ["Android", "Brain Training", "Casual"],
    features: [
      "Simple time-conversion puzzles",
      "Fast tap-based gameplay",
      "Streak rewards and instant feedback",
      "Clean casual puzzle style",
      "Practice 12-hour and 24-hour formats",
      "Playable in short sessions anytime",
    ],
    answer:
      "Time Pop Puzzle is a free Android brain-training game that tests quick time conversion. Players read an AM/PM clock and tap the matching 24-hour answer to keep a streak alive. Rounds are short, feedback is instant, and the clean casual style makes it easy to practice 12-hour and 24-hour time formats in spare moments. The timer is part of the core mechanic — not a pressure system bolted onto a calm board game.",
    hook: "AM/PM to 24-hour — the timer is the puzzle.",
    relatedPostSlugs: [
      "why-time-pop-puzzle-focuses-on-12-vs-24-hour-conversion",
      "why-our-puzzles-avoid-timers",
    ],
    gallery: [
      {
        src: "/screenshots/time-pop-puzzle/01-key-art.webp",
        caption: "Store key art",
        alt: "Time Pop Puzzle store key art",
        kind: "key-art",
        frame: "wide",
      },
      {
        src: "/screenshots/time-pop-puzzle/02-board.jpg",
        caption: "Convert before it pops",
        alt: "Time Pop Puzzle board presentation",
        kind: "screen",
        frame: "phone",
      },
      {
        src: "/screenshots/time-pop-puzzle/03-focus.jpg",
        caption: "Timer is the skill",
        alt: "Time Pop Puzzle focus presentation",
        kind: "screen",
        frame: "phone",
      },
    ],
    faq: [
      {
        question: "Is Time Pop Puzzle free to play?",
        answer:
          "Yes, Time Pop Puzzle is free to download and play on Google Play. Core time-conversion rounds are accessible without payment.",
      },
      {
        question: "What do you do in Time Pop Puzzle?",
        answer:
          "Each round shows a time in AM/PM format. Tap the correct 24-hour equivalent before the timer runs out to keep your streak going. The pace is fast but forgiving, making it ideal for quick practice.",
      },
      {
        question: "Why does Time Pop have a timer if other VeryFun games avoid them?",
        answer:
          "Here the timer is the puzzle. Learning 12- vs 24-hour conversion is about quick recognition, so the clock is the skill — not a streak stick bolted onto a calm board game.",
      },
      {
        question: "Is Time Pop Puzzle good for learning time formats?",
        answer:
          "Yes, the game is built around converting between 12-hour and 24-hour time, so repeated play helps make the conversion feel natural.",
      },
      {
        question: "Can I play Time Pop Puzzle offline?",
        answer:
          "Once installed, the core puzzle rounds can be played without an internet connection, so you can practice anytime.",
      },
    ],
    releaseDate: "2026-06-23",
    slug: "time-pop-puzzle",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=com.veryfuncompany.bubble",
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
export function getGameScreenshots(game: Game): GameScreenshot[] {
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
