import { m } from "framer-motion";
import { Link } from "react-router-dom";
import { GAMES } from "@/data/games";
import { Seo } from "@/components/seo/Seo";

const Games = () => {
  return (
    <div>
      <Seo
        title="Our Mobile Games"
        description="Browse all six free mobile puzzle games from VeryFun Company: Sudoku, Tile Journey, Word Search, Arrow Out, Pearl, Bubble."
        path="/games"
      />
      <section className="py-20">
        <div className="mx-auto max-w-[80rem] px-6">
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-full bg-accent-soft px-3 py-1 font-patrick text-sm font-bold text-accent">
                {GAMES.length} free games
              </span>
              <span className="h-px flex-1 bg-border-soft" aria-hidden="true" />
            </div>
            <h1 className="mb-4 font-kalam text-4xl font-bold text-foreground sm:text-5xl">
              Our Games
            </h1>
            <p className="max-w-2xl font-patrick text-xl text-foreground">
              Each one is built to respect your time — no paywalls, no timers, just puzzles that
              feel good to solve.
            </p>
          </m.div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-[80rem] px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {GAMES.map((game) => (
              <article
                key={game.id}
                className="hand-drawn-card relative flex flex-col bg-white p-6"
              >
                <div className="mb-4 flex items-center gap-4">
                  <img
                    src={game.icon}
                    alt={`${game.title} icon`}
                    width={80}
                    height={80}
                    loading="lazy"
                    decoding="async"
                    className="h-16 w-16 flex-shrink-0 rounded-[4px] border border-border-soft bg-surface-warm object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className="font-kalam text-xl font-bold text-foreground">{game.title}</h2>
                      <span className="rounded-full bg-accent-soft px-2 py-0.5 font-patrick text-xs font-bold text-accent">
                        Free
                      </span>
                    </div>
                    <time dateTime={game.releaseDate} className="font-patrick text-sm text-muted">
                      {game.releaseDate}
                    </time>
                  </div>
                </div>
                <p className="mb-4 font-patrick text-base leading-relaxed text-foreground">
                  {game.description}
                </p>
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1.5">
                    {game.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-surface-tint px-2.5 py-0.5 font-patrick text-xs text-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-auto flex items-center gap-3 pt-2">
                  <Link
                    to={`/games/${game.slug}`}
                    className="hand-drawn-button inline-block bg-white px-4 py-1.5 font-patrick text-sm no-underline text-foreground"
                  >
                    Details
                  </Link>
                  <a
                    href={game.googlePlayUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-accent font-patrick text-sm"
                  >
                    Google Play
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Games;
