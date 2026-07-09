"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Seo } from "@/components/seo/Seo";
import { GAMES } from "@/data/games";

const Games = () => {
  const newest =
    [...GAMES].sort((a, b) => b.releaseDate.localeCompare(a.releaseDate))[0] ?? GAMES[0];
  const [activeSlug, setActiveSlug] = useState(newest.slug);
  const activeGame = GAMES.find((game) => game.slug === activeSlug) ?? newest;

  return (
    <div className="site-page relative overflow-hidden px-[3.125vw] pt-28 pb-24 lg:pt-32">
      <Seo
        title="Our Mobile Games"
        description="Browse all seven free mobile puzzle games from VeryFun Company: Sudoku, Tile Journey, Word Search, Arrow Out, Pearl, Time Pop, and Nova Mahjong."
        path="/games"
      />

      <section className="relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="games-hero"
        >
          <div className="games-hero-copy">
            <h1>Pick a board.</h1>
            <p>
              Seven quiet mobile puzzles for spare attention: number logic, word grids, tile
              matching, sorting, coloring, time conversion, and classic mahjong.
            </p>
            <div className="games-hero-actions">
              <a
                href={activeGame.googlePlayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-button pill-button--accent"
              >
                <Download size={16} />
                Google Play
              </a>
              <Link to={`/games/${activeGame.slug}`} className="pill-button">
                Details
                <ArrowUpRight size={16} />
              </Link>
            </div>

            <div className="games-lineup" aria-label="Choose a featured game">
              {GAMES.map((game, index) => {
                const isActive = game.slug === activeGame.slug;

                return (
                  <button
                    key={game.slug}
                    type="button"
                    className={`games-lineup__item ${isActive ? "is-active" : ""}`}
                    aria-pressed={isActive}
                    onClick={() => setActiveSlug(game.slug)}
                    onFocus={() => setActiveSlug(game.slug)}
                    onMouseEnter={() => setActiveSlug(game.slug)}
                  >
                    <img src={game.icon} alt="" width={40} height={40} decoding="async" />
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{game.title}</strong>
                    <small>{game.technologies.slice(1).join(" / ")}</small>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="games-hero-panel">
            <motion.img
              key={activeGame.slug}
              src={activeGame.image}
              alt={activeGame.title}
              width={840}
              height={630}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              initial={{ opacity: 0, scale: 1.035 }}
              animate={{ opacity: 1, scale: 1.01 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="games-hero-panel__footer">
              <strong>{activeGame.title}</strong>
              <span>{activeGame.technologies.slice(1).join(" / ")}</span>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="catalog-index" aria-label="Game catalog">
        <div className="catalog-index__head">
          <div>
            <h2>All playable boards.</h2>
          </div>
          <p>
            Seven games, seven different kinds of quiet focus. Open the brief when you want the full
            rules, or go straight to Google Play.
          </p>
        </div>

        <div className="catalog-index__grid">
          {GAMES.map((game) => (
            <article key={game.id} className="catalog-card">
              <Link
                to={`/games/${game.slug}`}
                className="catalog-card__media"
                aria-label={`Open ${game.title} details`}
              >
                <img
                  src={game.image}
                  alt={`${game.title} key art`}
                  width={760}
                  height={560}
                  loading="lazy"
                  decoding="async"
                />
              </Link>

              <div className="catalog-card__body">
                <div className="catalog-card__title">
                  <h3>{game.title}</h3>
                </div>
                <p>{game.description}</p>
                <div className="catalog-card__meta">
                  <span>{game.technologies.slice(1).join(" / ")}</span>
                  <span>{game.releaseDate}</span>
                </div>
                <div className="catalog-card__actions">
                  <Link to={`/games/${game.slug}`}>
                    Open brief
                    <ArrowUpRight size={16} />
                  </Link>
                  <a
                    href={game.googlePlayUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Get ${game.title} on Google Play`}
                  >
                    <Download size={15} />
                    Google Play
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Games;
