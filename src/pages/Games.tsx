import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowUpRight, CalendarDays, Download, Grid3X3, Layers3, Play } from "lucide-react";
import { GAMES } from "@/data/games";
import { Seo } from "@/components/seo/Seo";

const Games = () => {
  const [activeGenre, setActiveGenre] = useState("All");
  const [activeSlug, setActiveSlug] = useState(GAMES[0]?.slug ?? "");
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
  const activeGame = visibleGames.find((game) => game.slug === activeSlug) ?? visibleGames[0];

  useEffect(() => {
    if (!visibleGames.some((game) => game.slug === activeSlug)) {
      setActiveSlug(visibleGames[0]?.slug ?? "");
    }
  }, [activeSlug, visibleGames]);

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

      {activeGame && (
        <section className="games-spotlight" aria-label="Selected game preview">
          <div className="games-spotlight-copy">
            <div className="games-spotlight-copy__top">
              <span className="status-text">Selected board</span>
              <span>{String(activeGame.id).padStart(2, "0")}</span>
            </div>
            <div className="games-spotlight-copy__title">
              <img
                src={activeGame.icon}
                alt=""
                width={82}
                height={82}
                loading="eager"
                decoding="async"
              />
              <h2>{activeGame.title}</h2>
            </div>
            <p>{activeGame.description}</p>
            <div className="games-spotlight-tags">
              {activeGame.technologies.slice(1).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="games-spotlight-actions">
              <Link to={`/games/${activeGame.slug}`} className="pill-button pill-button--accent">
                <Play size={16} />
                Open
              </Link>
              <a
                href={activeGame.googlePlayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-button"
              >
                <Download size={16} />
                Google Play
              </a>
            </div>
          </div>

          <div className="games-spotlight-media">
            <motion.img
              key={activeGame.slug}
              src={activeGame.image}
              alt={`${activeGame.title} key art`}
              width={980}
              height={735}
              loading="lazy"
              decoding="async"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="games-spotlight-release">
              <CalendarDays size={16} />
              <span>{activeGame.releaseDate}</span>
            </div>
          </div>
        </section>
      )}

      <section className="catalog-index" aria-label="Release index">
        <div className="catalog-index__head">
          <div>
            <span className="status-text">Release index</span>
            <h2>{activeGenre === "All" ? "All playable boards." : `${activeGenre} boards.`}</h2>
          </div>
          <p>
            Scan the catalog by release, genre, and session shape. Select a row to update the
            preview, or open the detail page for the full game brief.
          </p>
        </div>

        <motion.div layout className="catalog-index__list">
          {visibleGames.map((game, index) => (
            <motion.div
              key={game.id}
              layout
              className={`catalog-index__row${activeGame?.slug === game.slug ? " is-active" : ""}`}
            >
              <button
                type="button"
                onClick={() => setActiveSlug(game.slug)}
                aria-pressed={activeGame?.slug === game.slug}
                aria-label={`Preview ${game.title}`}
              >
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
              </button>
              <Link to={`/games/${game.slug}`} aria-label={`Open ${game.title} details`}>
                <ArrowUpRight size={18} />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Games;
