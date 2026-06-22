import { Link } from "react-router-dom";
import { m } from "framer-motion";
import { Gamepad2 } from "lucide-react";
import { PROJECTS } from "../../../data/projects";

const HERO_GAMES = PROJECTS.slice(0, 6);
const ROTATIONS = ["-rotate-2", "rotate-1", "rotate-1", "-rotate-1", "-rotate-1", "rotate-2"];

const HeroSectionNiceUI = () => {
  return (
    <section className="overflow-hidden py-16 sm:py-24">
      <div className="mx-auto max-w-[80rem] px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <m.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="space-y-6">
              <h1 className="font-kalam text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                Creating a <span className="text-accent">Happier World</span>
              </h1>
              <p className="max-w-lg font-patrick text-xl leading-relaxed text-foreground">
                We are an independent game studio dedicated to crafting games that bring joy to
                people. Through our games, we aim to create a world filled with imagination and
                hope.
              </p>
            </div>

            <m.div
              className="flex flex-col gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/projects"
                  className="hand-drawn-button inline-flex items-center gap-2 bg-white px-6 py-3 font-patrick text-lg text-foreground no-underline"
                >
                  <Gamepad2 size={20} />
                  View Our Games
                </Link>
              </m.div>
              <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/about"
                  className="hand-drawn-button inline-block bg-white px-6 py-3 font-patrick text-lg text-foreground no-underline"
                >
                  About Us
                </Link>
              </m.div>
            </m.div>

            <m.div
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="flex gap-1">
                {HERO_GAMES.map((game, i) => (
                  <m.img
                    key={game.id}
                    src={game.icon}
                    alt={`${game.title} icon`}
                    width={40}
                    height={40}
                    loading="eager"
                    decoding="async"
                    className="h-10 w-10 rounded-full border-2 border-background bg-white object-cover shadow-hand-drawn-light"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1 + i * 0.1, duration: 0.3 }}
                    style={{ marginLeft: i > 0 ? "-8px" : 0, zIndex: HERO_GAMES.length - i }}
                  />
                ))}
              </div>
              <p className="font-patrick text-base text-foreground">
                <span className="font-bold">{HERO_GAMES.length} unique games</span> crafted with
                love
              </p>
            </m.div>
          </m.div>

          <m.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {HERO_GAMES.map((game, i) => (
                <m.figure
                  key={game.id}
                  className={`hand-drawn-card jiggle relative overflow-hidden bg-white ${ROTATIONS[i % ROTATIONS.length]}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.12, duration: 0.4 }}
                >
                  {i % 2 === 0 ? (
                    <div className="tape" aria-hidden="true" />
                  ) : (
                    <div className="tack" aria-hidden="true" />
                  )}
                  <img
                    src={game.icon}
                    alt={`${game.title} icon`}
                    width={256}
                    height={256}
                    loading={i < 2 ? "eager" : "lazy"}
                    decoding="async"
                    className="aspect-square w-full object-cover"
                  />
                </m.figure>
              ))}
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionNiceUI;
