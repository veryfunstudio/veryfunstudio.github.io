export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  content: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Why Our Puzzles Avoid Timers",
    excerpt:
      "Timers can create urgency, but they often make calm puzzles feel noisy. Here is how we design pressure out of the board.",
    date: "2026-04-10",
    category: "Design Note",
    image: "/images/classic-sudoku.webp",
    content: [
      "A timer is one of the fastest ways to make a puzzle feel exciting. It is also one of the fastest ways to make a relaxed player leave. VeryFun Company games are built for spare attention, so we remove the clock unless it is truly part of the mechanic.",
      "Without a timer, the board has to carry the tension. Sudoku uses deduction. Arrow Out uses blocked paths. Tile Journey uses limited slots. The player still has decisions to make, but the pressure comes from the puzzle state instead of a countdown.",
      "This changes how we tune failure. A player should be able to pause, glance away, and return without losing the thread. Hints, undo, and readable feedback are not shortcuts. They are the tools that keep a short mobile session from turning into frustration.",
      "The result is quieter, but not easier. We still want players to plan ahead, spot patterns, and feel the satisfaction of a clean solve. We simply do not want the game to punish real life for interrupting.",
      "That principle guides the whole catalog: clear rules first, visual polish second, monetization last. If a feature makes the board harder to read or the session harder to leave, it usually does not belong.",
    ],
  },
  {
    id: 2,
    title: "Designing a Readable Board",
    excerpt:
      "A mobile puzzle has only a few seconds to explain itself. The board needs to teach before any tutorial appears.",
    date: "2026-03-25",
    category: "Board Craft",
    image: "/images/word-search-block.webp",
    content: [
      "Readable boards start with hierarchy. Before we add effects, we decide what the player must see first: the selected tile, the legal move, the blocked path, the completed group, or the next useful hint.",
      "On a phone, every visual choice competes with finger size, glare, motion, and a short session window. That is why our boards use strong silhouettes, generous hit targets, and feedback that appears near the move instead of in a distant status panel.",
      "We also test how much decoration the board can survive. A flower tile, pearl shelf, or bubble cluster can be charming, but it cannot blur the state of play. If the art style makes a legal move harder to recognize, the art is failing the puzzle.",
      "The best interface moment is the one players do not notice. They tap, the board responds, and the next decision is already clear. That kind of calm takes many tiny cuts: contrast, spacing, motion duration, sound level, and the order of feedback.",
      "This is why our games share a simple rule: the board is the product. Menus, rewards, and visual texture support it. They never outrank it.",
    ],
  },
  {
    id: 3,
    title: "Keeping Mobile Builds Light",
    excerpt:
      "Small puzzle games should feel instant. We keep runtime, art, and interaction choices pointed at low-friction play.",
    date: "2026-03-10",
    category: "Production",
    image: "/images/tile-journey.webp",
    content: [
      "A casual puzzle can lose a player before the first move if the build feels heavy. Long launches, stutters, oversized downloads, and battery drain all contradict the promise of a quick calm session.",
      "We treat performance as part of game design. Tile counts, particle effects, texture sizes, and sound layers are tuned around the phone in the player's hand, not the device on a developer desk.",
      "Offline play also affects production choices. A game should not depend on a perfect connection to load the next quiet moment. Core boards, basic progression, and the primary loop need to keep working when the commute goes underground.",
      "That does not mean the games should look plain. It means every flourish needs a budget. A small animation that confirms a move is worth more than a heavy effect that only looks good in a trailer.",
      "The target is simple: open quickly, read clearly, respond immediately, and leave no mess behind. When the build behaves that way, the puzzle feels calmer before the player can name why.",
    ],
  },
  {
    id: 4,
    title: "Store Pages Need Honest Screens",
    excerpt:
      "The first promise a puzzle game makes is visual. Screenshots should show the actual board, not a fantasy of the game.",
    date: "2026-02-20",
    category: "Launch",
    image: "/images/pearl-coloring.webp",
    content: [
      "A store page is not only marketing. For a puzzle game, it is the first usability test. Can a player understand the board from one image? Can they tell what a move does? Can they see why the game might feel good?",
      "We try to make screenshots answer those questions directly. Show the board. Show the interaction. Show the reward state. Avoid scenes that look dramatic but hide the actual play.",
      "This matters because calm games rely on trust. If the store page promises a soft, readable puzzle and the install opens into clutter, the player notices immediately. The inverse is also true: honest screens attract players who want the real pace of the game.",
      "Copy should be just as direct. We prefer concrete claims like no timers, offline play, helpful hints, and clear themes. Those details help the right player decide quickly.",
      "The best launch asset is a page that behaves like the game itself: clear, specific, and easy to leave with a confident decision.",
    ],
  },
];

export function getBlogPostById(id: number): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.id === id);
}
