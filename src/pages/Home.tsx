"use client";

import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, CircleDot, Download, Gamepad2, Sparkles } from "lucide-react";
import { GAMES } from "@/data/games";
import { Seo } from "@/components/seo/Seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/constants";
import GameCard from "@/components/common/GameCard";

const HeroCanvas = lazy(() => import("@/components/home/HeroCanvas"));

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "VeryFun Company",
  url: SITE_URL,
  logo: `${SITE_URL}/images/about.jpeg`,
  description:
    "Independent mobile game studio publishing calming, free-to-play puzzle games on Google Play.",
  sameAs: GAMES.map((p) => p.googlePlayUrl),
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "VeryFun Company",
  url: SITE_URL,
};

const PRINCIPLES = [
  {
    code: "pace",
    title: "Soft pressure",
    body: "No timers, energy gates, or forced streaks. Every session can stay short, calm, and complete.",
  },
  {
    code: "offline",
    title: "Pocket-ready",
    body: "Playable anywhere after install, with simple controls built for one hand and quick attention shifts.",
  },
  {
    code: "clarity",
    title: "Readable challenge",
    body: "Rules reveal themselves through clean boards, generous feedback, and puzzles that reward planning.",
  },
];

const METRICS = [
  ["06", "released games"],
  ["00", "timers"],
  ["100", "percent free"],
  ["24", "hour offline play"],
];

const PLAYTEST_MOVES = [
  {
    label: "number lock",
    note: "Place one clean digit, then breathe before the next.",
  },
  {
    label: "tile triple",
    note: "Match a small stack and keep the tray from crowding.",
  },
  {
    label: "word path",
    note: "Trace a quiet line through letters without a clock.",
  },
  {
    label: "arrow clear",
    note: "Untangle one direction and watch the board open.",
  },
  {
    label: "pearl sort",
    note: "Group color by color until the hidden picture appears.",
  },
  {
    label: "bubble arc",
    note: "Aim once, bank softly, clear a pocket of color.",
  },
];

export default function Home() {
  const [time, setTime] = useState("");
  const [activeCell, setActiveCell] = useState(14);

  const featured = useMemo(() => GAMES.slice(0, 3), []);
  const launchGame = GAMES[1] ?? GAMES[0];
  const activeMove = activeCell % GAMES.length;
  const activeGame = GAMES[activeMove] ?? GAMES[0];
  const activeMoveMeta = PLAYTEST_MOVES[activeMove] ?? PLAYTEST_MOVES[0];

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")} GMT+8`,
      );
    };
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <Seo
        title="Indie Mobile Game Studio"
        description="Free, calming mobile puzzle games on Google Play. No timers, no paywalls."
        path="/"
      />
      <JsonLd schema={organizationSchema} />
      <JsonLd schema={websiteSchema} />

      <div className="fixed inset-0 z-0">
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
      </div>

      <div className="relative z-10">
        <section className="relative min-h-[100svh] px-[3.125vw] pb-8 pt-24">
          <div className="hero-shell">
            <div className="hero-reveal flex items-center justify-between gap-4">
              <span className="bracket-tag">Indie puzzle lab</span>
              <span className="status-text hidden sm:inline">{time}</span>
            </div>

            <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.82fr)] lg:py-0">
              <div className="space-y-8">
                <div className="hero-reveal space-y-2">
                  <p className="label-tag text-accent">VeryFun Company</p>
                  <h1 className="kinetic-title max-w-[11ch]">
                    Quiet games.
                    <span>Bright logic.</span>
                  </h1>
                </div>

                <p className="hero-reveal max-w-[42ch] text-base leading-relaxed text-muted sm:text-lg">
                  Six mobile puzzles for spare moments: free, readable, offline, and built to leave
                  attention intact.
                </p>

                <div className="hero-reveal flex flex-wrap gap-3">
                  <Link to="/games" className="pill-button pill-button--accent">
                    <Sparkles size={16} />
                    Explore games
                  </Link>
                  <a
                    href={launchGame.googlePlayUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pill-button"
                  >
                    <Download size={16} />
                    Google Play
                  </a>
                </div>
              </div>

              <div className="hero-reveal relative">
                <div className="signal-deck">
                  <div className="signal-orbit" aria-hidden="true">
                    {featured.map((game, index) => (
                      <span
                        key={game.id}
                        style={{ transform: `rotate(${index * 120}deg) translateY(-45%)` }}
                      />
                    ))}
                  </div>
                  <div className="signal-screen">
                    <img
                      src={launchGame.image}
                      alt={launchGame.title}
                      width={760}
                      height={570}
                      loading="eager"
                      decoding="async"
                    />
                    <div className="signal-readout">
                      <span>{launchGame.technologies[1]}</span>
                      <strong>{launchGame.title}</strong>
                    </div>
                  </div>
                </div>

                <div className="hero-chip hero-chip--top">
                  <span className="status-text">catalog</span>
                  <strong>{String(GAMES.length).padStart(2, "0")}</strong>
                </div>
                <div className="hero-chip hero-chip--bottom">
                  <span className="status-text">mode</span>
                  <strong>Offline</strong>
                </div>
              </div>
            </div>

            <div className="hero-reveal grid gap-3 border-t border-border-soft pt-5 sm:grid-cols-4">
              {METRICS.map(([value, label]) => (
                <div key={label} className="metric-strip">
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="marquee-rail">
          <div className="marquee-track">
            {[...GAMES, ...GAMES].map((game, index) => (
              <span key={`${game.id}-${index}`}>
                <img
                  src={game.icon}
                  alt=""
                  width={22}
                  height={22}
                  loading="lazy"
                  decoding="async"
                />
                {game.title}
              </span>
            ))}
          </div>
        </div>

        <section className="relative px-[3.125vw] py-28 lg:py-40">
          <div className="dash-line mb-12" />
          <div className="max-w-[92rem]">
            {[
              "No rush.",
              "No gatekeeping.",
              "No noisy loops.",
              "Just readable puzzles for people with real lives.",
            ].map((line) => (
              <p key={line} className="manifest-line mega-title">
                {line}
              </p>
            ))}
          </div>
        </section>

        <section className="playtest-section px-[3.125vw] py-24 lg:py-36">
          <div className="playtest-panel">
            <div className="playtest-copy">
              <div className="playtest-copy__top">
                <Gamepad2 size={24} />
                <span className="status-text">Live playtest</span>
              </div>
              <h2>Tap the board. Feel the catalog answer.</h2>
              <p>
                A small playable signal for the whole studio: six rhythms, one calm input model, no
                timer pushing the player around.
              </p>
            </div>

            <div className="playtest-board-wrap">
              <div className="playtest-board" aria-label="Interactive game rhythm selector">
                {Array.from({ length: 36 }, (_, index) => {
                  const gameIndex = index % GAMES.length;
                  const game = GAMES[gameIndex];
                  const isActive = index === activeCell;
                  const isSoft = (index + activeMove) % 5 === 0;

                  return (
                    <button
                      key={`${game.slug}-${index}`}
                      type="button"
                      className={`playtest-cell ${isActive ? "is-active" : ""} ${isSoft ? "is-soft" : ""}`}
                      onClick={() => setActiveCell(index)}
                      aria-label={`Preview ${game.title}`}
                      aria-pressed={isActive}
                    >
                      <span>{index % 3 === 0 ? String(game.id) : game.title.slice(0, 1)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <aside className="playtest-readout" aria-live="polite">
              <div className="playtest-readout__hero">
                <img
                  src={activeGame.icon}
                  alt=""
                  width={96}
                  height={96}
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <span className="status-text">{activeMoveMeta.label}</span>
                  <h3>{activeGame.title}</h3>
                </div>
              </div>
              <p>{activeMoveMeta.note}</p>
              <div className="playtest-readout__tags">
                {activeGame.technologies.slice(1).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to={`/games/${activeGame.slug}`} className="pill-button">
                  Details
                  <ArrowRight size={15} />
                </Link>
                <a
                  href={activeGame.googlePlayUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-button pill-button--accent"
                >
                  <Download size={15} />
                  Play
                </a>
              </div>
            </aside>
          </div>
        </section>

        <section className="px-[3.125vw] py-20 lg:py-32">
          <div className="mb-10 grid gap-6 lg:grid-cols-[0.7fr_1fr] lg:items-end">
            <div>
              <span className="page-kicker">Playable catalog</span>
              <h2 className="mt-4 max-w-[10ch]">Choose a board.</h2>
            </div>
            <p className="max-w-[54ch] text-base leading-relaxed text-muted lg:justify-self-end">
              Every title has a different rhythm: number logic, tile matching, word search, route
              planning, coloring, and sharp little board problems.
            </p>
          </div>

          <div className="game-grid">
            {GAMES.map((game, index) => (
              <GameCard key={game.id} game={game} index={index} />
            ))}
          </div>
        </section>

        <section className="runway-section">
          <div className="runway-heading px-[3.125vw]">
            <span className="page-kicker">Game runway</span>
            <p>Six releases in one studio shelf.</p>
          </div>
          <div className="runway-track">
            {GAMES.map((game, index) => (
              <article key={game.id} className="runway-card">
                <div className="runway-media">
                  <img
                    src={game.image}
                    alt={game.title}
                    width={780}
                    height={585}
                    loading="lazy"
                    decoding="async"
                  />
                  <img
                    className="runway-icon"
                    src={game.icon}
                    alt=""
                    width={118}
                    height={118}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="runway-copy">
                  <div className="flex items-center gap-3">
                    <CircleDot size={16} className="text-accent" />
                    <span className="status-text">
                      {String(index + 1).padStart(2, "0")} / {String(GAMES.length).padStart(2, "0")}
                    </span>
                  </div>
                  <h3>{game.title}</h3>
                  <p>{game.answer}</p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={game.googlePlayUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pill-button pill-button--accent"
                    >
                      <Download size={15} />
                      Download
                    </a>
                    <Link to={`/games/${game.slug}`} className="pill-button">
                      Details
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="px-[3.125vw] py-24 lg:py-36">
          <div className="dash-line mb-12" />
          <div className="principle-board">
            <div className="principle-intro">
              <h2>Fun without extraction.</h2>
            </div>
            {PRINCIPLES.map((item, index) => (
              <article key={item.code} className="principle-cell">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="closing-stage px-[3.125vw] py-28 lg:py-44">
          <div className="closing-panel">
            <h2 className="closing-reveal">Open a puzzle and let the day get quieter.</h2>
            <div className="closing-reveal flex flex-wrap justify-center gap-3">
              <Link to="/games" className="pill-button pill-button--accent">
                Browse lineup
                <ArrowRight size={16} />
              </Link>
              <Link to="/about" className="pill-button">
                Studio notes
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
