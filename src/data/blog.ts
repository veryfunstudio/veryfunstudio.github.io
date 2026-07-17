export interface BlogPostSection {
  heading: string;
  paragraphs: string[];
}

export interface BlogPostFaq {
  question: string;
  answer: string;
}

export interface BlogPost {
  id: number;
  /** URL segment, e.g. why-our-puzzles-avoid-timers */
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  summary: string[];
  sections: BlogPostSection[];
  faq: BlogPostFaq[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: "why-our-puzzles-avoid-timers",
    title: "Why Our Puzzles Avoid Timers",
    excerpt:
      "Timers create urgency, but they often clash with spare-attention design. Here is how we replace countdown pressure with tension that lives inside the board itself.",
    date: "2026-04-10",
    category: "Design Note",
    image: "/images/classic-sudoku.webp",
    summary: [
      "VeryFun Company games are built for spare attention, so timers are removed unless they are part of the core mechanic.",
      "Tension comes from the puzzle state itself: deduction, blocked paths, and limited slots.",
      "Hints, undo, and readable feedback protect short mobile sessions from turning into frustration.",
      "Clear rules and readable boards come before visual polish and monetization.",
    ],
    sections: [
      {
        heading: "The problem with timers in casual puzzles",
        paragraphs: [
          "Timers are one of the fastest ways to make a puzzle feel exciting. They are also one of the fastest ways to make a relaxed player leave. VeryFun Company games are built for spare attention, so we remove the clock unless it is truly part of the mechanic.",
          "That principle guides the whole catalog: clear rules first, visual polish second, monetization last. If a feature makes the board harder to read or the session harder to leave, it usually does not belong.",
        ],
      },
      {
        heading: "How the board replaces the clock",
        paragraphs: [
          "When the timer disappears, the board has to carry the tension. Sudoku uses deduction. Arrow Out uses blocked paths. Tile Journey uses limited slots. The player still has decisions to make, but the pressure comes from the puzzle state instead of a countdown.",
        ],
      },
      {
        heading: "Designing for interruption",
        paragraphs: [
          "This changes how we tune failure. A player should be able to pause, glance away, and return without losing the thread. Hints, undo, and readable feedback are not shortcuts. They are the tools that keep a short mobile session from turning into frustration.",
        ],
      },
      {
        heading: "Calm does not mean easy",
        paragraphs: [
          "The result is quieter, but not easier. We still want players to plan ahead, spot patterns, and feel the satisfaction of a clean solve. We simply do not want the game to punish real life for interrupting.",
        ],
      },
    ],
    faq: [
      {
        question: "Why remove timers from puzzle games?",
        answer:
          "Timers can make relaxed players leave. Our games are designed for spare attention, so tension belongs in the board, not in a countdown.",
      },
      {
        question: "Do hints and undo make the game too easy?",
        answer:
          "No. They prevent a single mistake or interruption from breaking the session while still letting the player plan ahead and solve the logic.",
      },
      {
        question: "How does this affect monetization?",
        answer:
          "Monetization comes last in our design order. If a feature makes the board harder to read or the session harder to leave, it usually does not belong.",
      },
    ],
  },
  {
    id: 2,
    slug: "designing-a-readable-board",
    title: "Designing a Readable Board",
    excerpt:
      "A mobile puzzle has only seconds to explain itself. The board must teach the player before any tutorial appears.",
    date: "2026-03-25",
    category: "Board Craft",
    image: "/images/word-search-block.webp",
    summary: [
      "Readable boards start with visual hierarchy before any effects are added.",
      "Phones require strong silhouettes, generous hit targets, and feedback near the move.",
      "Decoration must not obscure the state of play.",
      "The best interface moment is the one players do not notice.",
      "The board is the product; menus, rewards, and visual texture support it.",
    ],
    sections: [
      {
        heading: "Hierarchy before effects",
        paragraphs: [
          "Readable boards start with hierarchy. Before we add effects, we decide what the player must see first: the selected tile, the legal move, the blocked path, the completed group, or the next useful hint.",
        ],
      },
      {
        heading: "Designing for real phones",
        paragraphs: [
          "On a phone, every visual choice competes with finger size, glare, motion, and a short session window. That is why our boards use strong silhouettes, generous hit targets, and feedback that appears near the move instead of in a distant status panel.",
        ],
      },
      {
        heading: "Testing decoration limits",
        paragraphs: [
          "We also test how much decoration the board can survive. A flower tile, pearl shelf, or bubble cluster can be charming, but it cannot blur the state of play. If the art style makes a legal move harder to recognize, the art is failing the puzzle.",
        ],
      },
      {
        heading: "The invisible interface",
        paragraphs: [
          "The best interface moment is the one players do not notice. They tap, the board responds, and the next decision is already clear. That kind of calm takes many tiny cuts: contrast, spacing, motion duration, sound level, and the order of feedback.",
        ],
      },
      {
        heading: "Board-first rule",
        paragraphs: [
          "This is why our games share a simple rule: the board is the product. Menus, rewards, and visual texture support it. They never outrank it.",
        ],
      },
    ],
    faq: [
      {
        question: "What makes a puzzle board readable?",
        answer:
          "Clear visual hierarchy, strong silhouettes, generous hit targets, and feedback placed near the player's move.",
      },
      {
        question: "How do you balance art and clarity?",
        answer:
          "We test how much decoration the board can survive. If an art style makes a legal move harder to recognize, the art is failing the puzzle.",
      },
      {
        question: "Why does the board matter more than menus?",
        answer:
          "The board is where the game actually happens. Menus and rewards support it, but they should never outrank the clarity of play.",
      },
    ],
  },
  {
    id: 3,
    slug: "keeping-mobile-builds-light",
    title: "Keeping Mobile Builds Light",
    excerpt:
      "Casual puzzle games should feel instant. We tune runtime, art, and interaction choices around low-friction play.",
    date: "2026-03-10",
    category: "Production",
    image: "/images/tile-journey.webp",
    summary: [
      "Heavy builds with long launches and stutters contradict quick calm sessions.",
      "Performance is treated as part of game design, not an afterthought.",
      "Offline play shapes production choices for core content.",
      "Every flourish needs a performance budget.",
      "The target is fast, clear, immediate, and clean.",
    ],
    sections: [
      {
        heading: "The cost of a heavy build",
        paragraphs: [
          "A casual puzzle can lose a player before the first move if the build feels heavy. Long launches, stutters, oversized downloads, and battery drain all contradict the promise of a quick calm session.",
        ],
      },
      {
        heading: "Performance as design",
        paragraphs: [
          "We treat performance as part of game design. Tile counts, particle effects, texture sizes, and sound layers are tuned around the phone in the player's hand, not the device on a developer desk.",
        ],
      },
      {
        heading: "Offline-first production",
        paragraphs: [
          "Offline play also affects production choices. A game should not depend on a perfect connection to load the next quiet moment. Core boards, basic progression, and the primary loop need to keep working when the commute goes underground.",
        ],
      },
      {
        heading: "Flourish with a budget",
        paragraphs: [
          "That does not mean the games should look plain. It means every flourish needs a budget. A small animation that confirms a move is worth more than a heavy effect that only looks good in a trailer.",
        ],
      },
      {
        heading: "The light-build target",
        paragraphs: [
          "The target is simple: open quickly, read clearly, respond immediately, and leave no mess behind. When the build behaves that way, the puzzle feels calmer before the player can name why.",
        ],
      },
    ],
    faq: [
      {
        question: "What makes a mobile puzzle build feel heavy?",
        answer:
          "Long launches, stutters, oversized downloads, and battery drain all make a build feel heavy and contradict a quick calm session.",
      },
      {
        question: "Why is offline play important for production?",
        answer:
          "Casual games are often played in transit. Core boards, progression, and the primary loop should keep working when the connection drops.",
      },
      {
        question: "How do you keep visuals appealing without bloat?",
        answer:
          "Every flourish gets a budget. A small animation that confirms a move is worth more than a heavy effect that only looks good in a trailer.",
      },
    ],
  },
  {
    id: 4,
    slug: "store-pages-need-honest-screens",
    title: "Store Pages Need Honest Screens",
    excerpt:
      "A store page is the first usability test for a puzzle game. Screenshots should show the real board, not a fantasy of it.",
    date: "2026-02-20",
    category: "Launch",
    image: "/images/pearl-coloring.webp",
    summary: [
      "A store page is the first usability test for a puzzle game.",
      "Screenshots should show the real board, interaction, and reward state.",
      "Calm games rely on trust between the store promise and the actual experience.",
      "Direct copy with concrete claims helps the right player decide quickly.",
      "The best launch asset matches the game's clarity.",
    ],
    sections: [
      {
        heading: "The store page as a usability test",
        paragraphs: [
          "A store page is not only marketing. For a puzzle game, it is the first usability test. Can a player understand the board from one image? Can they tell what a move does? Can they see why the game might feel good?",
        ],
      },
      {
        heading: "What screenshots should answer",
        paragraphs: [
          "We try to make screenshots answer those questions directly. Show the board. Show the interaction. Show the reward state. Avoid scenes that look dramatic but hide the actual play.",
        ],
      },
      {
        heading: "Trust and honest presentation",
        paragraphs: [
          "This matters because calm games rely on trust. If the store page promises a soft, readable puzzle and the install opens into clutter, the player notices immediately. The inverse is also true: honest screens attract players who want the real pace of the game.",
        ],
      },
      {
        heading: "Direct copy and concrete claims",
        paragraphs: [
          "Copy should be just as direct. We prefer concrete claims like no timers, offline play, helpful hints, and clear themes. Those details help the right player decide quickly.",
        ],
      },
      {
        heading: "A page that behaves like the game",
        paragraphs: [
          "The best launch asset is a page that behaves like the game itself: clear, specific, and easy to leave with a confident decision.",
        ],
      },
    ],
    faq: [
      {
        question: "Why are honest screenshots important?",
        answer:
          "Calm games rely on trust. If the store page promises a readable puzzle but the install opens into clutter, the player notices immediately.",
      },
      {
        question: "What should a puzzle store page show?",
        answer:
          "It should show the real board, the interaction, and the reward state. Avoid dramatic scenes that hide the actual play.",
      },
      {
        question: "How does copy affect conversion?",
        answer:
          "Direct copy with concrete claims like no timers, offline play, and helpful hints helps the right player decide quickly and confidently.",
      },
    ],
  },
  {
    id: 5,
    slug: "why-nova-mahjong-uses-large-clear-tiles",
    title: "Why Nova Mahjong Uses Large, Clear Tiles",
    excerpt:
      "Nova Mahjong For Seniors is built around readability first. Large tiles, high contrast, and calm pacing make classic mahjong solitaire comfortable for older players and relaxed brain training.",
    date: "2026-07-03",
    category: "Design Note",
    image: "/images/nova-mahjong.webp",
    summary: [
      "Mahjong solitaire fits relaxed brain training with simple rules and immediate feedback.",
      "Larger tiles, stronger contrast, and wider spacing reduce mis-taps and glare problems.",
      "Hint, Undo, and Shuffle keep players in flow without breaking the challenge.",
      "No timer and offline play support flexible session lengths.",
      "The board serves the player's attention, not the other way around.",
    ],
    sections: [
      {
        heading: "Mahjong solitaire as relaxed training",
        paragraphs: [
          "Mahjong solitaire is a natural fit for relaxed brain training. The rules are simple: match identical free tiles and clear the board. For older players, this clear goal and immediate feedback are easier to manage than games that demand fast reflexes or complex controls.",
        ],
      },
      {
        heading: "Tile size and readability testing",
        paragraphs: [
          "Nova Mahjong For Seniors starts with tile size. We tested across several devices and found that larger tiles reduce mis-taps, stronger contrast helps in bright or glare-heavy environments, and wider spacing keeps fingers from covering the tiles they want to tap.",
        ],
      },
      {
        heading: "Tools that preserve flow",
        paragraphs: [
          "The game also gives players three tools to stay in flow: Hint points out a possible match, Undo reverses a mistaken tap, and Shuffle reorders the board when no moves remain. These are not difficulty shortcuts. They prevent a single slip or dead end from breaking the session.",
        ],
      },
      {
        heading: "Flexible, offline sessions",
        paragraphs: [
          "There is no timer, and the game works offline. That means a round can last five minutes on a train or twenty minutes on the sofa, without signal anxiety or countdown pressure.",
        ],
      },
      {
        heading: "The design rule behind Nova Mahjong",
        paragraphs: [
          "The design rule behind Nova Mahjong is simple: the board serves the player's attention, not the other way around. Large tiles, clear rules, gentle feedback, and zero pressure are how we put that rule into practice.",
        ],
      },
    ],
    faq: [
      {
        question: "Why are large tiles important for senior players?",
        answer:
          "Larger tiles reduce mis-taps, stronger contrast helps in bright or glare-heavy environments, and wider spacing keeps fingers from covering the tiles.",
      },
      {
        question: "How do Hint, Undo, and Shuffle affect difficulty?",
        answer:
          "They are not difficulty shortcuts. They prevent a single slip or dead end from breaking the session while keeping the core matching challenge intact.",
      },
      {
        question: "Can Nova Mahjong be played without internet?",
        answer:
          "Yes. The game works offline, so players can enjoy a round on the train, on the sofa, or anywhere without signal anxiety.",
      },
    ],
  },
  {
    id: 6,
    slug: "how-we-balance-difficulty-in-classic-sudoku",
    title: "How We Balance Difficulty in Classic Sudoku",
    excerpt:
      "Classic Sudoku 2026 offers multiple difficulty levels, but empty cells alone do not define difficulty. Here is how we tune the inference chain from beginner to expert.",
    date: "2026-06-30",
    category: "Board Craft",
    image: "/images/classic-sudoku.webp",
    summary: [
      "Difficulty is defined by inference depth, not the number of empty cells.",
      "Beginner, intermediate, and expert grids teach distinct logical techniques.",
      "Hints highlight the next logical deduction instead of dropping a random number.",
      "Players can choose their cognitive load for different moments.",
      "No timer keeps difficulty in the logic rather than the clock.",
    ],
    sections: [
      {
        heading: "Difficulty beyond empty cells",
        paragraphs: [
          "Sudoku difficulty is not simply a count of empty cells. A puzzle becomes harder when the player must follow longer chains of inference to find the next certain number. In Classic Sudoku 2026, we design each level around the depth of that inference chain.",
        ],
      },
      {
        heading: "The inference chain by level",
        paragraphs: [
          "Beginner grids reward simple scanning: a row, column, or box is missing one obvious digit. Intermediate grids introduce candidate marking and hidden singles. Expert grids require advanced patterns such as X-Wing, swordfish, or forcing chains.",
        ],
      },
      {
        heading: "Hints that teach",
        paragraphs: [
          "The hint system is tuned to teach, not just solve. When a player asks for help, the game highlights the next logical deduction rather than dropping a random number onto the board. This keeps the puzzle coherent and the player learning.",
        ],
      },
      {
        heading: "Choosing cognitive load",
        paragraphs: [
          "Multiple difficulty levels let players choose their cognitive load. A five-minute coffee break might call for an easy grid, while a long flight might invite an expert challenge. The no-timer design means the difficulty lives in the logic, not the clock.",
        ],
      },
      {
        heading: "Accessible without being shallow",
        paragraphs: [
          "By separating difficulty from speed, Classic Sudoku 2026 stays accessible without becoming shallow. The same 9x9 grid can offer a gentle warmup or a deep logical workout depending on the level you choose.",
        ],
      },
    ],
    faq: [
      {
        question: "What really makes a Sudoku puzzle harder?",
        answer:
          "A puzzle becomes harder when the player must follow longer chains of inference to find the next certain number, not just when more cells are empty.",
      },
      {
        question: "How do hints work in Classic Sudoku 2026?",
        answer:
          "Hints highlight the next logical deduction rather than dropping a random number onto the board, so the puzzle stays coherent and the player keeps learning.",
      },
      {
        question: "Why is there no timer?",
        answer:
          "Without a timer, difficulty lives in the logic rather than the clock. A coffee break can be easy and a long flight can be expert without time pressure.",
      },
    ],
  },
  {
    id: 7,
    slug: "why-tile-journey-works-offline",
    title: "Why Tile Journey Works Offline",
    excerpt:
      "Tile Journey has thousands of 3D levels and works fully offline. Here is how we package content so the game survives commutes, flights, and dead zones.",
    date: "2026-06-28",
    category: "Production",
    image: "/images/tile-journey.webp",
    summary: [
      "Casual games are often played in transit with unreliable signal.",
      "Core levels, tile art, and progression ship locally with the install.",
      "Optional themed worlds update without blocking the main loop.",
      "Progress saves locally and syncs when the connection returns.",
      "Daily rewards are forgiving for offline days.",
    ],
    sections: [
      {
        heading: "The offline moments that matter",
        paragraphs: [
          "Casual games are often played in transit. A commute goes underground. A flight enters airplane mode. A parking garage loses signal. If the game stops working the moment the network drops, the promise of a quick calm session breaks.",
        ],
      },
      {
        heading: "Core content shipped locally",
        paragraphs: [
          "Tile Journey ships its core levels, tile art, and progression data locally. When you install the game, you receive a large batch of handcrafted 3D levels that are ready to play without any further download.",
        ],
      },
      {
        heading: "Optional updates and the main loop",
        paragraphs: [
          "New themed worlds and limited-time collections are delivered as optional updates. They download over Wi-Fi when available, but they never block the main loop. You can keep matching tiles even if the latest world has not finished downloading.",
        ],
      },
      {
        heading: "Progress saving and sync",
        paragraphs: [
          "Progress is saved locally and synced when the connection returns. Daily rewards and streaks are designed to be forgiving: if you play offline for a day, you pick up where you left off without penalty.",
        ],
      },
      {
        heading: "A reliable game anywhere",
        paragraphs: [
          "The result is a game that feels reliable. Whether you open it for one level or fifty, Tile Journey is ready wherever you are.",
        ],
      },
    ],
    faq: [
      {
        question: "What content is available offline in Tile Journey?",
        answer:
          "Core levels, tile art, and progression data ship locally, so a large batch of handcrafted 3D levels is ready to play without any further download.",
      },
      {
        question: "How are new worlds delivered?",
        answer:
          "New themed worlds and limited-time collections arrive as optional updates over Wi-Fi. They never block the main matching loop.",
      },
      {
        question: "What happens to progress during offline play?",
        answer:
          "Progress is saved locally and synced when the connection returns. Daily rewards and streaks are forgiving, so you pick up where you left off without penalty.",
      },
    ],
  },
  {
    id: 8,
    slug: "how-themed-puzzles-build-vocabulary",
    title: "How Themed Puzzles Build Vocabulary",
    excerpt:
      "Word Search Block turns word finding into a calm vocabulary exercise. Grouping words by theme is the design choice that makes it work for all ages.",
    date: "2026-06-26",
    category: "Design Note",
    image: "/images/word-search-block.webp",
    summary: [
      "Themes turn a list of words into a memory aid with context.",
      "Puzzles activate mental categories for low-pressure vocabulary practice.",
      "Difficulty scales through word length, grid density, and direction.",
      "Hints reveal the first letter to preserve the satisfaction of discovery.",
      "Clean themes and short sessions suit spellers, learners, and adults alike.",
    ],
    sections: [
      {
        heading: "Why theme matters",
        paragraphs: [
          "A word search grid without a theme is just a list of letters. Add a theme and the grid becomes a memory aid: animals, colors, countries, or foods give the words context and make them easier to recall.",
        ],
      },
      {
        heading: "Theme as vocabulary exercise",
        paragraphs: [
          "In Word Search Block, every puzzle centers on a clear theme. Players are not only hunting for spelling patterns; they are activating a mental category. This small design choice turns a casual puzzle into a low-pressure vocabulary exercise.",
        ],
      },
      {
        heading: "Three ways difficulty scales",
        paragraphs: [
          "Difficulty scales in three ways: word length, grid density, and the use of diagonal or backward words. A beginner grid might use short horizontal words under a friendly theme. An advanced grid can hide longer words in every direction.",
        ],
      },
      {
        heading: "Hints that protect discovery",
        paragraphs: [
          "The hint system keeps the learning loop intact. When a player is stuck, a hint reveals the first letter of a remaining word rather than the full answer. This preserves the satisfaction of discovery while preventing abandonment.",
        ],
      },
      {
        heading: "Lifelong vocabulary habit",
        paragraphs: [
          "Vocabulary growth is a lifelong habit. By keeping themes clean, controls simple, and sessions short, Word Search Block works for young spellers, language learners, and adults who want a calm mental warm-up.",
        ],
      },
    ],
    faq: [
      {
        question: "How does a theme help players find words?",
        answer:
          "A theme gives words context and turns the grid into a memory aid, making it easier to recall and locate related terms.",
      },
      {
        question: "How does difficulty scale in Word Search Block?",
        answer:
          "Difficulty scales through word length, grid density, and the use of diagonal or backward words.",
      },
      {
        question: "Why reveal only the first letter in hints?",
        answer:
          "Revealing the first letter preserves the satisfaction of discovery while preventing a stuck player from abandoning the puzzle.",
      },
    ],
  },
  {
    id: 9,
    slug: "the-logic-behind-arrow-outs-handcrafted-levels",
    title: "The Logic Behind Arrow Out's Handcrafted Levels",
    excerpt:
      "Arrow Out is easy to learn and quietly hard to put down. Every level is designed by hand so the solution path feels intentional, not random.",
    date: "2026-06-24",
    category: "Board Craft",
    image: "/images/arrow-out.webp",
    summary: [
      "A simple rule hides a deep ordering problem.",
      "Short levels introduce one concept at a time.",
      "The core campaign uses handcrafted levels instead of procedural generation.",
      "Hints point to the next safe arrow, not the entire solution.",
      "Controlled pacing creates accessible depth.",
    ],
    sections: [
      {
        heading: "One simple rule, deep ordering",
        paragraphs: [
          "Every tile in Arrow Out points in a direction, and every level asks the same question: which arrow leaves first so the rest can follow? This simple rule hides a deep ordering problem, and we design each level to explore a different corner of that problem.",
        ],
      },
      {
        heading: "Teaching one concept per level",
        paragraphs: [
          "Short levels introduce one concept. A single blocked arrow teaches the player to look ahead. A pair of crossing arrows teaches sequencing. Longer levels combine these concepts into chains that require several moves of planning.",
        ],
      },
      {
        heading: "Why handcrafted beats procedural",
        paragraphs: [
          "We do not use procedural generation for the core campaign. Handcrafted levels let us guarantee that each puzzle has a deliberate solution path and at least one satisfying unlock moment where the board suddenly opens up.",
        ],
      },
      {
        heading: "Hints that respect the logic",
        paragraphs: [
          "The hint system respects that design. When you are stuck, the hint points to the next safe arrow to remove, not the entire solution. This keeps the player engaged with the logic rather than skipping it.",
        ],
      },
      {
        heading: "Accessible pacing, lasting depth",
        paragraphs: [
          "By controlling the pacing of concepts, Arrow Out stays accessible without running out of depth. The first level takes seconds; the later levels can take minutes of quiet thought.",
        ],
      },
    ],
    faq: [
      {
        question: "What is the core rule of Arrow Out?",
        answer:
          "Every tile points in a direction, and each level asks which arrow leaves first so the rest can follow.",
      },
      {
        question: "Why are levels handcrafted instead of generated?",
        answer:
          "Handcrafted levels guarantee a deliberate solution path and at least one satisfying unlock moment where the board suddenly opens up.",
      },
      {
        question: "How do hints work without spoiling the puzzle?",
        answer:
          "Hints point to the next safe arrow to remove, not the entire solution, so players stay engaged with the ordering logic.",
      },
    ],
  },
  {
    id: 10,
    slug: "how-pearl-coloring-blends-sorting-and-pixel-art",
    title: "How Pearl Coloring Blends Sorting and Pixel Art",
    excerpt:
      "Pearl Coloring combines color sorting with pixel-art creation. The result is a calm puzzle where every solved shelf reveals a small piece of art.",
    date: "2026-06-22",
    category: "Design Note",
    image: "/images/pearl-coloring.webp",
    summary: [
      "Color sorting becomes a pixel-art reward.",
      "Pearl shapes and color groups stay distinct so the puzzle remains clear.",
      "Reveals happen in stages for ongoing satisfaction.",
      "Themed collections keep the art fresh without changing the core loop.",
      "The game blends logical structure with creative delight.",
    ],
    sections: [
      {
        heading: "Two reward layers",
        paragraphs: [
          "Color sorting is a satisfying mechanic on its own: move pearls until each shelf holds one color. Pearl Coloring adds a second reward layer by turning those sorted colors into pixel-art images that reveal themselves as you play.",
        ],
      },
      {
        heading: "Balancing sorting and art",
        paragraphs: [
          "The design challenge is balance. The sorting mechanic must remain clear while the emerging art builds anticipation. We keep the pearl shapes consistent and the color groups distinct, so the puzzle state never competes with the picture.",
        ],
      },
      {
        heading: "Staged reveals",
        paragraphs: [
          "Reveals happen in stages rather than all at once. Each completed shelf adds another block of color to the final image. This creates small moments of satisfaction throughout the level and a stronger payoff when the picture is complete.",
        ],
      },
      {
        heading: "Fresh themed collections",
        paragraphs: [
          "Limited-time themed collections keep the art fresh without changing the core loop. Seasonal images and special palettes give returning players something new to look forward to while the sorting mechanic stays familiar.",
        ],
      },
      {
        heading: "Structure plus delight",
        paragraphs: [
          "By blending a logical puzzle with a creative reward, Pearl Coloring appeals to players who want both structure and delight. It is a puzzle and a small art break at the same time.",
        ],
      },
    ],
    faq: [
      {
        question: "How does Pearl Coloring combine sorting and art?",
        answer:
          "Players sort pearls by color, and those sorted colors gradually reveal pixel-art images as the level progresses.",
      },
      {
        question: "Why do reveals happen in stages?",
        answer:
          "Each completed shelf adds another block of color, creating small moments of satisfaction throughout the level and a stronger final payoff.",
      },
      {
        question: "How are themed collections handled?",
        answer:
          "Limited-time themed collections deliver seasonal images and special palettes as optional content without changing the familiar sorting loop.",
      },
    ],
  },
  {
    id: 11,
    slug: "why-time-pop-puzzle-focuses-on-12-vs-24-hour-conversion",
    title: "Why Time Pop Puzzle Focuses on 12- vs 24-Hour Conversion",
    excerpt:
      "Time Pop Puzzle turns a small everyday skill into a quick brain-training habit. The narrow focus is intentional: repeated practice makes time conversion automatic.",
    date: "2026-06-21",
    category: "Design Note",
    image: "/images/time-pop-puzzle.webp",
    summary: [
      "Converting between 12- and 24-hour time is a practical daily skill.",
      "Short rounds lower the barrier to repeated practice.",
      "Streaks and instant feedback reinforce learning.",
      "A narrow scope turns a conscious calculation into an automatic habit.",
      "The game becomes a daily mental warm-up rather than a generic distraction.",
    ],
    sections: [
      {
        heading: "A practical, everyday skill",
        paragraphs: [
          "Converting between 12-hour and 24-hour time is a practical skill that appears on schedules, tickets, devices, and travel plans. Time Pop Puzzle isolates that skill and turns it into a fast, repeatable exercise.",
        ],
      },
      {
        heading: "Short rounds by design",
        paragraphs: [
          "Each round is short by design. The player reads an AM or PM time and taps the matching 24-hour answer. The brevity lowers the barrier to entry and makes the game easy to open in a spare minute.",
        ],
      },
      {
        heading: "Streaks and instant feedback",
        paragraphs: [
          "Streaks and instant feedback reinforce learning. A correct answer extends the streak; a wrong answer shows the correct conversion immediately. This tight feedback loop helps the brain build automatic associations between the two formats.",
        ],
      },
      {
        heading: "The value of narrow scope",
        paragraphs: [
          "The narrow scope is the point. Instead of mixing many math or memory tasks, Time Pop Puzzle repeats one conversion pattern across varied values. That repetition is what turns a conscious calculation into an automatic habit.",
        ],
      },
      {
        heading: "From puzzle to daily habit",
        paragraphs: [
          "By focusing on a single useful skill, the game becomes a daily mental warm-up rather than a generic distraction. Players leave with a slightly stronger grasp of a format they will use again tomorrow.",
        ],
      },
    ],
    faq: [
      {
        question: "What skill does Time Pop Puzzle practice?",
        answer:
          "It practices converting between 12-hour and 24-hour time, a skill used on schedules, tickets, devices, and travel plans.",
      },
      {
        question: "How do streaks help learning?",
        answer:
          "Streaks reward correct answers and a tight feedback loop shows the correct conversion immediately, helping the brain build automatic associations.",
      },
      {
        question: "Why focus on only one conversion type?",
        answer:
          "Repeating one conversion pattern across varied values turns a conscious calculation into an automatic habit.",
      },
    ],
  },
];

export function getBlogPostById(id: number): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.id === id);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

/** Resolve by slug, or by numeric id string for legacy URLs. */
export function getBlogPostByParam(param: string): BlogPost | undefined {
  const bySlug = getBlogPostBySlug(param);
  if (bySlug) return bySlug;
  if (/^\d+$/.test(param)) {
    return getBlogPostById(Number.parseInt(param, 10));
  }
  return undefined;
}

export function getBlogPath(post: Pick<BlogPost, "slug">): string {
  return `/blog/${post.slug}`;
}

/** Posts ordered newest-first by date. Sorted copy; does not mutate the source. */
export function getPostsByNewest(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));
}

/** Newest post by date, falling back to the first archive entry. */
export function getNewestPost(): BlogPost {
  return getPostsByNewest()[0] ?? BLOG_POSTS[0];
}

/** Studio notes that mention this game by title, slug, or genre keywords. */
export function getRelatedPostsForGame(
  game: { title: string; slug: string; technologies: string[] },
  limit = 2,
): BlogPost[] {
  const needles = [
    game.title.toLowerCase(),
    game.slug.replace(/-/g, " "),
    ...game.technologies.slice(1).map((t) => t.toLowerCase()),
  ].filter((n) => n.length > 2);

  return getPostsByNewest()
    .filter((post) => {
      const hay = `${post.title} ${post.excerpt} ${post.category}`.toLowerCase();
      return needles.some((needle) => hay.includes(needle));
    })
    .slice(0, limit);
}

/** Games mentioned in a post title/excerpt (for cross-links on blog pages). */
export function getRelatedGamesForPost(
  post: BlogPost,
  games: { title: string; slug: string }[],
  limit = 2,
): { title: string; slug: string }[] {
  const hay = `${post.title} ${post.excerpt}`.toLowerCase();
  return games
    .filter((game) => {
      const title = game.title.toLowerCase();
      const slugWords = game.slug.replace(/-/g, " ");
      return hay.includes(title) || hay.includes(slugWords) || hay.includes(game.slug);
    })
    .slice(0, limit);
}
