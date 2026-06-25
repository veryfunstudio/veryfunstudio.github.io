import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GAMES } from "@/data/games";
import { Link } from "react-router";

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
};

function GameBlock({ game, reverse }: { game: (typeof GAMES)[number]; reverse?: boolean }) {
  return (
    <m.div {...reveal} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
      <div className={reverse ? "lg:order-last" : ""}>
        <Link
          to={`/games/${game.slug}`}
          className="hand-drawn-card group block overflow-hidden bg-surface transition-shadow hover:shadow-[var(--shadow-soft-hover)]"
        >
          <div className="bg-surface-warm p-6 sm:p-10">
            <img
              src={game.image}
              alt={`${game.title} key art`}
              width={1200}
              height={630}
              loading="lazy"
              decoding="async"
              className="aspect-[1200/630] w-full object-contain"
            />
          </div>
        </Link>
      </div>
      <div className={`space-y-5 ${reverse ? "lg:order-first" : ""}`}>
        <div className="flex items-center gap-3">
          <img
            src={game.icon}
            alt=""
            width={48}
            height={48}
            loading="lazy"
            decoding="async"
            className="h-12 w-12 rounded-[4px] border border-border-soft bg-surface object-cover"
          />
          <h3 className="font-kalam text-3xl font-bold tracking-tight text-foreground">
            {game.title}
          </h3>
          <span className="rounded-full bg-accent-soft px-2.5 py-0.5 font-patrick text-sm font-bold text-accent">
            Free
          </span>
        </div>
        <p className="max-w-[52ch] font-patrick text-lg leading-relaxed text-muted">
          {game.description}
        </p>
        <Link
          to={`/games/${game.slug}`}
          className="link-accent inline-flex items-center gap-1.5 font-patrick text-base"
        >
          Read more about {game.title}
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </m.div>
  );
}

const FeaturesSection = () => {
  return (
    <section className="mx-auto max-w-[80rem] px-6 py-24 lg:py-32">
      <m.div {...reveal} className="mb-20 max-w-3xl">
        <h2 className="font-kalam text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
          Six puzzles, one philosophy.
        </h2>
        <p className="mt-5 font-patrick text-xl leading-relaxed text-muted">
          Every game we ship respects your time. No paywalls, no timers, no pressure. Just a calm
          challenge for whatever mood you're in.
        </p>
      </m.div>

      <div className="space-y-24 lg:space-y-32">
        {GAMES.map((game, i) => (
          <GameBlock key={game.id} game={game} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
