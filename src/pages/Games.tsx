import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowUpRight, Download, Grid3X3, Layers3 } from "lucide-react";
import { GAMES } from "@/data/games";
import { Seo } from "@/components/seo/Seo";
import GameCard from "@/components/common/GameCard";

const Games = () => {
  const [activeGenre, setActiveGenre] = useState("All");
  const newest =
    [...GAMES].sort((a, b) => b.releaseDate.localeCompare(a.releaseDate))[0] ?? GAMES[0];
  const genreCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const game of GAMES) {
      for (const genre of game.technologies.slice(1)) {
        counts.set(genre, (counts.get(genre) ?? 0) + 1);
      }
    }
    return counts;
  }, []);
  const genres = useMemo(() => ["All", ...genreCounts.keys()], [genreCounts]);
  const visibleGames = useMemo(
    () =>
      activeGenre === "All"
        ? GAMES
        : GAMES.filter((game) => game.technologies.slice(1).includes(activeGenre)),
    [activeGenre],
  );

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
            <img
              className="games-hero-icon"
              src={newest.icon}
              alt=""
              width={118}
              height={118}
              loading="eager"
              decoding="async"
            />
            <div className="games-hero-panel__footer">
              <strong>{newest.title}</strong>
              <span>{newest.technologies.slice(1).join(" / ")}</span>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="games-filter-strip" aria-label="Catalog controls">
        <div className="games-filter-metrics">
          <div>
            <Grid3X3 size={18} />
            <span>{GAMES.length} releases</span>
          </div>
          <div>
            <Layers3 size={18} />
            <span>{genreCounts.size} genres</span>
          </div>
          <div>
            <Download size={18} />
            <span>Google Play</span>
          </div>
        </div>
        <div className="games-filter-controls">
          <div>
            <span className="status-text">Signal filter</span>
            <strong>
              {visibleGames.length} / {GAMES.length} online
            </strong>
          </div>
          <div className="games-filter-buttons" role="list" aria-label="Filter games by genre">
            {genres.map((genre) => {
              const isActive = activeGenre === genre;
              const count = genre === "All" ? GAMES.length : (genreCounts.get(genre) ?? 0);

              return (
                <button
                  key={genre}
                  type="button"
                  className={isActive ? "is-active" : ""}
                  onClick={() => setActiveGenre(genre)}
                  aria-pressed={isActive}
                >
                  <span>{genre}</span>
                  <em>{String(count).padStart(2, "0")}</em>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pt-14 lg:pt-20">
        <motion.div layout className="game-grid">
          {visibleGames.map((game, index) => (
            <GameCard key={game.id} game={game} index={index} headingLevel="h2" />
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Games;
