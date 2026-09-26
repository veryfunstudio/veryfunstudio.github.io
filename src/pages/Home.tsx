import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { GameFeatureRow } from "@/components/common/GameFeatureRow";
import { JsonLd } from "@/components/seo/JsonLd";
import { Seo } from "@/components/seo/Seo";
import { getBlogPath, getPostsByNewest } from "@/data/blog";
import { GAMES, getGamesByNewest } from "@/data/games";
import { REVEAL } from "@/lib/reveal";
import { ORGANIZATION_SCHEMA, WEBSITE_SCHEMA } from "@/lib/schema";
import { formatDate } from "@/lib/utils";

const TONES: Record<string, string> = {
  "nova-mahjong": "mahjong",
  "tile-journey": "tile",
  "arrow-out": "arrow",
};

export default function Home() {
  const games = getGamesByNewest();
  const featuredGames = games.slice(0, 3);
  const notes = getPostsByNewest().slice(0, 2);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeGame = featuredGames[activeIndex] ?? featuredGames[0];

  return (
    <div className="studio-page">
      <Seo
        title="Indie Mobile Game Studio"
        description="Free, calming mobile puzzle games on Google Play. Offline-friendly, free to install, and built for spare attention."
        path="/"
      />
      <JsonLd schema={ORGANIZATION_SCHEMA} />
      <JsonLd schema={WEBSITE_SCHEMA} />

      <section className="studio-hero" aria-labelledby="studio-hero-title">
        <div className="studio-shell studio-hero__topline">
          <span>Independent puzzle studio</span>
          <span>Made for the in-between</span>
          <span>Est. in play / {String(GAMES.length).padStart(2, "0")} games</span>
        </div>
        <div className="studio-shell studio-hero__grid">
          <div className="studio-hero__copy">
            <p className="studio-kicker">
              <span className="studio-kicker__dot" /> A softer kind of screen time
            </p>
            <h1 id="studio-hero-title">
              Make room
              <br />
              for <em>play.</em>
            </h1>
            <p className="studio-hero__intro">
              Small, satisfying puzzle games for the moments between everything else. Clear to pick
              up, easy to put down, and made with care.
            </p>
            <div className="studio-hero__actions">
              <Link to="/games" className="studio-action studio-action--dark">
                Explore the games <ArrowUpRight size={19} aria-hidden="true" />
              </Link>
              <Link to="/about" className="studio-text-link">
                Meet the studio <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div
            className={`studio-hero__stage studio-hero__stage--${TONES[activeGame.slug] ?? "mahjong"}`}
          >
            <div className="studio-hero__orbit studio-hero__orbit--one" aria-hidden="true" />
            <div className="studio-hero__orbit studio-hero__orbit--two" aria-hidden="true" />
            <span className="studio-hero__stage-label">PLAY OBJECT / 0{activeIndex + 1}</span>
            <AnimatePresence mode="sync" initial={false}>
              <motion.div
                key={activeGame.slug}
                className="studio-hero__artwork"
                initial={{ opacity: 0, y: 26, rotate: -5, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, rotate: -3, scale: 1 }}
                exit={{ opacity: 0, y: -18, rotate: 3, scale: 0.96 }}
                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              >
                <img
                  src={activeGame.image}
                  alt={`${activeGame.title} key art`}
                  width={1200}
                  height={630}
                  fetchPriority={activeIndex === 0 ? "high" : "auto"}
                />
                <div className="studio-hero__artwork-foot">
                  <span>VeryFun Studio</span>
                  <span>001 — 00{activeIndex + 1}</span>
                </div>
              </motion.div>
            </AnimatePresence>
            <span className="studio-hero__spark studio-hero__spark--one" aria-hidden="true">
              ✳
            </span>
            <span className="studio-hero__spark studio-hero__spark--two" aria-hidden="true">
              ✦
            </span>
            <div className="studio-hero__stage-bottom" aria-live="polite">
              <div>
                <span>Now showing</span>
                <strong>{activeGame.title}</strong>
              </div>
              <Link to={`/games/${activeGame.slug}`} aria-label={`Explore ${activeGame.title}`}>
                <ArrowUpRight size={22} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
        <div className="studio-shell studio-hero__rail">
          <div className="studio-hero__selectors" aria-label="Choose a featured game">
            {featuredGames.map((game, index) => (
              <button
                key={game.slug}
                type="button"
                className={index === activeIndex ? "is-current" : ""}
                aria-pressed={index === activeIndex}
                onClick={() => setActiveIndex(index)}
              >
                <span>0{index + 1}</span>
                <span>{game.title}</span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </button>
            ))}
          </div>
          <a href="#studio-collection" className="studio-hero__scroll">
            Scroll to explore <ArrowDown size={16} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section
        id="studio-collection"
        className="studio-collection"
        aria-labelledby="studio-collection-title"
      >
        <div className="studio-shell">
          <motion.div className="studio-section-heading" {...REVEAL}>
            <div>
              <p className="studio-kicker">01 / The collection</p>
              <h2 id="studio-collection-title">
                Pick your <em>puzzle.</em>
              </h2>
            </div>
            <p>
              Three different ways to find your focus. One shared idea: the player sets the pace.
            </p>
          </motion.div>
          <div className="studio-game-list">
            {games.map((game, index) => (
              <GameFeatureRow key={game.slug} game={game} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="studio-principles" aria-labelledby="studio-principles-title">
        <div className="studio-shell studio-principles__inner">
          <div>
            <p className="studio-kicker">02 / A little philosophy</p>
            <h2 id="studio-principles-title">
              The fun part is <em>thinking.</em>
            </h2>
          </div>
          <div className="studio-principles__list">
            <article>
              <span>01</span>
              <h3>Room to pause.</h3>
              <p>No streaks to protect. No timer unless it is the puzzle.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Clarity first.</h3>
              <p>Readable boards and honest feedback make every move feel good.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Play anywhere.</h3>
              <p>Our games are designed to be enjoyed offline, at your own pace.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="studio-notes" aria-labelledby="studio-notes-title">
        <div className="studio-shell">
          <div className="studio-section-heading">
            <div>
              <p className="studio-kicker">03 / From the studio</p>
              <h2 id="studio-notes-title">
                Notes from <em>behind the board.</em>
              </h2>
            </div>
            <Link to="/blog" className="studio-text-link">
              All studio notes <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className="studio-notes__grid">
            {notes.map((note, index) => (
              <Link key={note.slug} to={getBlogPath(note)} className="studio-note-card">
                <span className="studio-note-card__meta">
                  <span>
                    0{index + 1} / {note.category}
                  </span>
                  <time dateTime={note.date}>{formatDate(note.date)}</time>
                </span>
                <h3>{note.title}</h3>
                <p>{note.excerpt}</p>
                <span className="studio-note-card__arrow">
                  <ArrowUpRight size={22} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
