import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowUpRight, Download, Grid3X3, Layers3 } from "lucide-react";
import { GAMES } from "@/data/games";
import { Seo } from "@/components/seo/Seo";

const Games = () => {
  const newest = [...GAMES].sort((a, b) => b.releaseDate.localeCompare(a.releaseDate))[0] ?? GAMES[0];

  return (
    <div className="relative overflow-hidden px-[3.125vw] pt-28 pb-24 lg:pt-32">
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
            <span className="bracket-tag">Playable catalog</span>
            <h1>Six boards, one quiet rhythm.</h1>
            <p>
              Pick the kind of puzzle your brain wants right now. Number logic, word grids,
              tile matching, sorting, and quick arcade clearing all live here.
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
              <strong>{newest.title}</strong>
              <span>{newest.technologies.slice(1).join(" / ")}</span>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="games-filter-strip" aria-label="Catalog summary">
        <div>
          <Grid3X3 size={18} />
          <span>{GAMES.length} releases</span>
        </div>
        <div>
          <Layers3 size={18} />
          <span>{new Set(GAMES.flatMap((game) => game.technologies.slice(1))).size} genres</span>
        </div>
        <div>
          <Download size={18} />
          <span>Google Play</span>
        </div>
      </section>

      <section className="pt-14 lg:pt-20">
        <div className="game-grid">
          {GAMES.map((game, index) => (
            <Link key={game.id} to={`/games/${game.slug}`} className="game-magnetic-card">
              <div className="game-card-media">
                <img
                  src={game.image}
                  alt={game.title}
                  width={680}
                  height={510}
                  loading={index < 2 ? "eager" : "lazy"}
                  decoding="async"
                />
              </div>
              <div className="game-card-copy">
                <span className="status-text">{String(index + 1).padStart(2, "0")}</span>
                <h2>{game.title}</h2>
                <p>{game.description}</p>
                <div>
                  {game.technologies.slice(1).map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </div>
              <ArrowUpRight className="game-card-arrow" size={22} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Games;
