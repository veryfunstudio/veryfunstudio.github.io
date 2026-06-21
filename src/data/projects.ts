export interface Project {
  id: number;
  packageId: string;
  title: string;
  description: string;
  fullDescription: string;
  icon: string;
  image: string;
  technologies: string[];
  features: string[];
  releaseDate: string;
  slug: string;
  googlePlayUrl: string;
  rotation: number;
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    packageId: "com.codex.sudokumobilegame",
    title: "Classic Sudoku 2026",
    description:
      "A clean, calming take on Sudoku with multiple difficulty levels, smart hints, and zero pressure — perfect for daily brain training on the go.",
    fullDescription:
      "Classic Sudoku 2026 is a relaxing, no-pressure spin on the 9×9 logic puzzle that has charmed players for generations. Fill rows, columns, and boxes with numbers 1 through 9, earn points as you complete lines, and watch your skills sharpen across multiple difficulty levels. There are no timers — only smart hints, an undo button, and a clean interface that gets out of your way. Play offline anywhere, track your improvement, and pick the puzzle that fits your mood, whether that's a five-minute coffee break or a long flight.",
    icon: "/images/classic-sudoku-icon.png",
    image: "/images/classic-sudoku.png",
    technologies: ["Android", "Puzzle", "Offline", "Free to Play"],
    features: [
      "Multiple difficulty levels for every skill",
      "No time limits — play stress-free",
      "Smart hints, undo, and erase tools",
      "Score system for an extra challenge",
      "Progress tracking across sessions",
      "Fully playable offline",
    ],
    releaseDate: "2026-06-14",
    slug: "classic-sudoku",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=com.codex.sudokumobilegame",
    rotation: -0.5,
  },
  {
    id: 2,
    packageId: "com.veryfun.tilejourney",
    title: "Tile Journey",
    description:
      "A relaxing 3D tile-matching adventure across hand-crafted themed worlds — match three, plan ahead, and unwind.",
    fullDescription:
      "Tile Journey turns the classic match-three puzzle into a mindful 3D expedition. Travel through dreamy clouds, vibrant landscapes, and richly themed levels, each demanding sharp observation and a little forward planning to keep your tile slots clear. Strategic power-ups — shuffle, undo, and free-match — keep frustration at bay, while the no-timer pacing lets you settle in for one quick level or a long evening of puzzles. With thousands of stages to conquer and offline play anywhere, it's a daily companion for casual players and puzzle veterans alike.",
    icon: "/images/tile-journey-icon.png",
    image: "/images/tile-journey.png",
    technologies: ["Android", "3D Puzzle", "Match-3", "Offline"],
    features: [
      "Thousands of hand-crafted 3D levels",
      "Diverse themed worlds to explore",
      "No time limits — play at your pace",
      "Power-ups: shuffle, undo, and free match",
      "Strategic tile-slot planning",
      "Fully playable offline anytime",
    ],
    releaseDate: "2026-06-08",
    slug: "tile-journey",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=com.veryfun.tilejourney",
    rotation: 0.7,
  },
  {
    id: 3,
    packageId: "com.cookabc.zenwordsearch",
    title: "Word Search Block",
    description:
      "A serene word-search puzzle built around clear themes, helpful hints, and a soothing visual style — for relaxed vocabulary training.",
    fullDescription:
      "Word Search Block is a peaceful word-puzzle escape designed to bring calm and focus into the everyday. Swipe across the letter grid to discover hidden words tied together by clear, friendly themes — perfect for sharpening vocabulary and spelling without the pressure of a timer. Each level scales gently in difficulty as you progress, and a thoughtful hint system keeps you moving when you get stuck. Whether you're winding down before bed or sneaking in a quick break, the soft visual style makes every session feel like a small breather.",
    icon: "/images/word-search-block-icon.png",
    image: "/images/word-search-block.png",
    technologies: ["Android", "Word", "Casual", "Brain Training"],
    features: [
      "Hundreds of themed word puzzles",
      "Simple swipe-to-select controls",
      "Helpful hints when you're stuck",
      "Progressive difficulty curve",
      "Clean, calming visual style",
      "Play anytime, anywhere",
    ],
    releaseDate: "2026-06-20",
    slug: "word-search-block",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=com.cookabc.zenwordsearch",
    rotation: -0.3,
  },
  {
    id: 4,
    packageId: "com.veryfuncompany.kittyescape",
    title: "Arrow Out",
    description:
      "A deceptively simple arrow-tile puzzle where every move matters — clear the grid, one direction at a time.",
    fullDescription:
      "Arrow Out is the kind of puzzle that's easy to learn and quietly impossible to put down. Every tile points somewhere, and your job is to send it off the grid without letting another arrow block its path. Plan a few moves ahead, untangle the chain, and watch the board open up. Hundreds of handcrafted levels mix short brain teasers with longer think-aheads, and the minimal, relaxing visual style keeps things calm even when the logic gets thorny. No timers, no pressure — just a sharp puzzle waiting on every screen.",
    icon: "/images/arrow-out-icon.png",
    image: "/images/arrow-out.png",
    technologies: ["Android", "Puzzle", "Logic", "Casual"],
    features: [
      "Hundreds of handcrafted levels",
      "Simple to learn, hard to master",
      "No time limits — play stress-free",
      "Helpful hints when you're stuck",
      "Clean, minimal visual style",
      "Smooth, satisfying controls",
    ],
    releaseDate: "2026-05-26",
    slug: "arrow-out",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=com.veryfuncompany.kittyescape",
    rotation: 0.4,
  },
  {
    id: 5,
    packageId: "com.veryfun.pearlcoloring",
    title: "Pearl Coloring",
    description:
      "Sort glowing pearls, reveal pixel-art masterpieces, and slip into a calm world of color, creativity, and gentle puzzles.",
    fullDescription:
      "Pearl Coloring blends color sorting with pixel-art creation into something soft, glowing, and quietly addictive. Tap to arrange lustrous pearls into matching color groups, plan your shelf to clear each puzzle, and watch hidden pixel-art designs reveal themselves layer by layer. Every level is a tiny artistic moment: gentle audio, polished 3D pearls, and a steady drip of new themes and limited-time collections. There's no pressure here — just sorting, planning, and the small satisfaction of a finished picture, with full offline support so you can play whenever the mood strikes.",
    icon: "/images/pearl-coloring-icon.png",
    image: "/images/pearl-coloring.png",
    technologies: ["Android", "Puzzle", "Pixel Art", "Offline"],
    features: [
      "Hundreds of pixel-art puzzles",
      "Simple tap-to-sort gameplay",
      "Polished 3D pearls and audio feedback",
      "Limited-time themed collections",
      "Gentle brain exercise for any age",
      "Full offline support",
    ],
    releaseDate: "2026-06-08",
    slug: "pearl-coloring",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=com.veryfun.pearlcoloring",
    rotation: -0.6,
  },
  {
    id: 6,
    packageId: "com.veryfuncompany.bubble",
    title: "Bubble Shoot",
    description:
      "A bright, generous bubble shooter with 200+ levels, daily rewards, and zero paywalls — every stage is fully beatable for free.",
    fullDescription:
      "Bubble Shoot is a colorful, satisfying spin on the bubble-pop classic, built around the promise that no level requires real money. Aim, release, and match three or more bubbles of the same color to clear the board, then earn stars based on how cleanly you played. Smart power-ups, daily rewards, and frequent events keep boosters flowing, so you can tackle the trickiest stages without ever hitting a paywall. With over 200 well-crafted levels and new challenges added regularly, it's a relaxing pick-up-and-play for a quick break or a long session.",
    icon: "/images/bubble-shoot-icon.png",
    image: "/images/bubble-shoot.png",
    technologies: ["Android", "Bubble Shooter", "Casual", "Free to Play"],
    features: [
      "200+ well-crafted levels with regular updates",
      "Every level beatable without paying",
      "Daily rewards and seasonal events",
      "Special boosters and bubble types",
      "Smooth controls and lag-free play",
      "Easy to learn, satisfying to master",
    ],
    releaseDate: "2026-05-07",
    slug: "bubble-shoot",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=com.veryfuncompany.bubble",
    rotation: 0.5,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}
