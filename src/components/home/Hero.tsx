import { Link } from "react-router";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GAMES } from "@/data/games";

const HERO_GAMES = GAMES.slice(0, 6);

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const HeroSectionNiceUI = () => {
  return (
    <section className="relative mx-auto max-w-[80rem] px-6 pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="grid items-center gap-16 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-8"
        >
          <motion.h1
            variants={itemVariants}
            className="font-sans text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            Calm puzzles,
            <br />
            <span className="text-accent">crafted with care.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-[52ch] font-sans text-lg leading-relaxed text-muted"
          >
            VeryFun Company is an indie studio shipping free, offline-friendly
            puzzle games to Google Play. No paywalls, no timers. Just a quiet
            challenge whenever you want one.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
            <Link
              to="/games"
              className="pill-button pill-button--accent"
            >
              Explore the games
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/about"
              className="pill-button"
            >
              About us
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-3 pt-2">
            <div className="flex">
              {HERO_GAMES.map((game, i) => (
                <img
                  key={game.id}
                  src={game.icon}
                  alt=""
                  width={36}
                  height={36}
                  loading="eager"
                  decoding="async"
                  className="h-9 w-9 rounded-full border-2 border-background bg-surface object-cover"
                  style={{ marginLeft: i > 0 ? "-10px" : 0, zIndex: HERO_GAMES.length - i }}
                />
              ))}
            </div>
            <span className="font-sans text-sm text-muted">{HERO_GAMES.length} games, all free</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3"
        >
          {HERO_GAMES.map((game) => (
            <Link
              key={game.id}
              to={`/games/${game.slug}`}
              className="glass-card group block overflow-hidden"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={game.icon}
                  alt={`${game.title} icon`}
                  width={256}
                  height={256}
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="truncate font-sans text-sm font-medium text-foreground">
                    {game.title}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSectionNiceUI;
