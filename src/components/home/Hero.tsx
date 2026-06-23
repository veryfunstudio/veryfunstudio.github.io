import { Link } from "react-router-dom";
import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PROJECTS } from "../../data/projects";

const HERO_GAMES = PROJECTS.slice(0, 6);

const HeroSectionNiceUI = () => {
  return (
    <section className="mx-auto max-w-[80rem] px-6 pt-24 pb-20 lg:pt-32 lg:pb-28">
      <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          <h1 className="font-kalam text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Calm puzzles,
            <br />
            crafted with care.
          </h1>
          <p className="max-w-[52ch] font-patrick text-xl leading-relaxed text-muted">
            VeryFun Company is an indie studio shipping free, offline-friendly puzzle games to
            Google Play. No paywalls, no timers. Just a quiet challenge whenever you want one.
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/projects"
              className="hand-drawn-button inline-flex items-center gap-2 bg-foreground px-6 py-3 font-patrick text-lg text-background no-underline"
            >
              Explore the games
              <ArrowRight size={18} />
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex">
                {HERO_GAMES.map((game, i) => (
                  <img
                    key={game.id}
                    src={game.icon}
                    alt=""
                    width={32}
                    height={32}
                    loading="eager"
                    decoding="async"
                    className="h-8 w-8 rounded-full border-2 border-background bg-white object-cover"
                    style={{ marginLeft: i > 0 ? "-10px" : 0, zIndex: HERO_GAMES.length - i }}
                  />
                ))}
              </div>
              <span className="font-patrick text-sm text-muted">6 games</span>
            </div>
          </div>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3"
        >
          {HERO_GAMES.map((game) => (
            <Link
              key={game.id}
              to={`/projects/${game.slug}`}
              className="hand-drawn-card group block overflow-hidden bg-white transition-shadow hover:shadow-[var(--shadow-soft-hover)]"
            >
              <img
                src={game.icon}
                alt={`${game.title} icon`}
                width={256}
                height={256}
                loading="lazy"
                decoding="async"
                className="aspect-square w-full object-cover"
              />
              <div className="px-3 py-2">
                <p className="truncate font-patrick text-sm text-foreground">{game.title}</p>
              </div>
            </Link>
          ))}
        </m.div>
      </div>
    </section>
  );
};

export default HeroSectionNiceUI;
