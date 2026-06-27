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
            <h1>Six boards, one quiet rhythm.</h1>
            <p>
              Pick the kind of puzzle your brain wants right now. Number logic, word grids, tile
              matching, sorting, and quick arcade clearing all live here.
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

      <section className="catalog-index" aria-label="Release index">
        <div className="catalog-index__head">
          <div>
            <span className="status-text">Release index</span>
            <h2>All playable boards.</h2>
          </div>
          <p>
            Scan the catalog by release, genre, and session shape. Open a board for the full brief,
            or jump straight to Google Play.
          </p>
        </div>

        <div className="catalog-index__list">
          {GAMES.map((game, index) => (
            <div key={game.id} className="catalog-index__row">
              <Link to={`/games/${game.slug}`} aria-label={`Open ${game.title} details`}>
                <span className="catalog-index__number">{String(index + 1).padStart(2, "0")}</span>
                <img
                  src={game.icon}
                  alt=""
                  width={58}
                  height={58}
                  loading="lazy"
                  decoding="async"
                />
                <span className="catalog-index__title">
                  <strong>{game.title}</strong>
                  <em>{game.description}</em>
                </span>
                <span className="catalog-index__tags">
                  {game.technologies.slice(1).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </span>
                <span className="catalog-index__date">{game.releaseDate}</span>
              </Link>
              <a
                href={game.googlePlayUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Get ${game.title} on Google Play`}
              >
                <ArrowUpRight size={18} />
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Games;
