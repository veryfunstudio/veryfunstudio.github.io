import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowUpRight, Download } from "lucide-react";
import { GAMES } from "@/data/games";
import { Seo } from "@/components/seo/Seo";

const Games = () => {
  const newest =
    [...GAMES].sort((a, b) => b.releaseDate.localeCompare(a.releaseDate))[0] ?? GAMES[0];

  return (
    <div className="site-page relative overflow-hidden px-[3.125vw] pt-28 pb-24 lg:pt-32">
      <Seo
        title="Our Mobile Games"
        description="Browse all six free mobile puzzle games from VeryFun Company: Sudoku, Tile Journey, Word Search, Arrow Out, Pearl, Bubble."
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
            <span className="page-kicker">Playable catalog</span>
            <h1>Pick a board.</h1>
            <p>
              Six quiet mobile puzzles for spare attention: number logic, word grids, tile matching,
              sorting, coloring, and quick arcade clearing.
            </p>
            <div className="games-hero-actions">
              <a
                href={newest.googlePlayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-button pill-button--accent"
              >
                <Download size={16} />
                Latest game
              </a>
              <Link to={`/games/${newest.slug}`} className="pill-button">
                Details
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          <div className="games-hero-panel">
            <div className="games-hero-panel__header">
              <span className="status-text">Latest release</span>
              <span className="status-text">{newest.releaseDate}</span>
            </div>
            <img
              src={newest.image}
              alt={newest.title}
              width={840}
              height={630}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <div className="games-hero-panel__footer">
              <span className="games-hero-panel__title">
                <img
                  src={newest.icon}
                  alt=""
                  width={32}
                  height={32}
                  loading="eager"
                  decoding="async"
                />
                <strong>{newest.title}</strong>
              </span>
              <span>{newest.technologies.slice(1).join(" / ")}</span>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="catalog-index" aria-label="Game catalog">
        <div className="catalog-index__head">
          <div>
            <span className="status-text">Choose your board</span>
            <h2>All playable boards.</h2>
          </div>
          <p>
            Six games, six different kinds of quiet focus. Open the brief when you want the full
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
                  <img
                    src={game.icon}
                    alt=""
                    width={32}
                    height={32}
                    loading="lazy"
                    decoding="async"
                  />
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
