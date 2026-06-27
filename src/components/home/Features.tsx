import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GAMES } from "@/data/games";
import { Link } from "react-router";

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

function GameCard({ game, featured = false }: { game: (typeof GAMES)[number]; featured?: boolean }) {
  return (
    <motion.div
      {...reveal}
      className={`glass-card group overflow-hidden ${featured ? "md:col-span-2 md:row-span-2" : ""}`}
    >
      <Link to={`/games/${game.slug}`} className="block">
        <div className={`relative overflow-hidden ${featured ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
          <img
            src={game.image}
            alt={`${game.title} key art`}
            width={featured ? 1200 : 600}
            height={featured ? 675 : 450}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
            <div className="flex items-center gap-3">
              <img
                src={game.icon}
                alt=""
                width={40}
                height={40}
                loading="lazy"
                decoding="async"
                className="h-10 w-10 rounded-lg border border-border-soft bg-surface object-cover"
              />
              <div>
                <h3 className="font-sans text-lg font-semibold tracking-tight text-foreground md:text-xl">
                  {game.title}
                </h3>
                <span className="inline-block rounded-full bg-accent-soft px-2 py-0.5 font-sans text-xs font-medium text-accent">
                  Free
                </span>
              </div>
            </div>
            <p className={`mt-3 font-sans text-sm leading-relaxed text-muted ${featured ? "max-w-[50ch]" : ""}`}>
              {game.description}
            </p>
            <div className="mt-4 inline-flex items-center gap-1 font-sans text-sm font-medium text-accent transition-colors group-hover:text-accent-hover">
              View details
              <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

const FeaturesSection = () => {
  return (
    <section className="mx-auto max-w-[80rem] px-6 py-24 lg:py-32">
      <motion.div {...reveal} className="mb-16 max-w-2xl">
        <h2 className="font-sans text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
          Six puzzles, one philosophy.
        </h2>
        <p className="mt-5 font-sans text-lg leading-relaxed text-muted">
          Every game we ship respects your time. No paywalls, no timers, no pressure.
          Just a calm challenge for whatever mood you are in.
        </p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {GAMES.map((game, i) => (
          <GameCard key={game.id} game={game} featured={i === 0} />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
