import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight, Gamepad2, Radar, Sparkles } from "lucide-react";
import { GAMES } from "@/data/games";
import { Seo } from "@/components/seo/Seo";

const TECH_STACK = ["Unity", "C#", "Android SDK", "TypeScript", "React", "Tailwind CSS"] as const;

const VALUES = [
  {
    icon: <Radar size={22} />,
    title: "Attention is the budget",
    body: "Every game is shaped around short, complete sessions that do not demand a streak or punish a pause.",
  },
  {
    icon: <Gamepad2 size={22} />,
    title: "Rules before spectacle",
    body: "The board has to read instantly. Polish supports the puzzle instead of hiding weak mechanics.",
  },
  {
    icon: <Sparkles size={22} />,
    title: "Free should still feel premium",
    body: "No paywalls, no timers, no extraction loop. The experience still deserves care, texture, and rhythm.",
  },
] as const;

const About = () => {
  const featured = GAMES.slice(0, 4);

  return (
    <div className="site-page relative overflow-hidden px-[3.125vw] pt-28 pb-24 lg:pt-32">
      <Seo
        title="About the Studio"
        description="Independent mobile game studio crafting calming, free-to-play puzzle games. Meet the team behind Tile Journey, Pearl Coloring, and more."
        path="/about"
      />

      <section className="about-hero">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="about-hero-copy"
        >
          <span className="page-kicker">Studio signal</span>
          <h1>Small team. Calm games. Sharp boards.</h1>
          <p>
            VeryFun Company builds free mobile puzzles for people who want a clear challenge
            without timers, pressure systems, or noisy monetization.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/games" className="pill-button pill-button--accent">
              See games
              <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="pill-button">
              Contact
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="about-hero-media"
        >
          <img
            src="/images/about.jpeg"
            alt="VeryFun Company team workspace"
            width={900}
            height={900}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="about-hero-badge">
            <span className="status-text">released</span>
            <strong>{String(GAMES.length).padStart(2, "0")}</strong>
          </div>
        </motion.div>
      </section>

      <section className="about-story">
        <div className="dash-line" />
        <div className="about-story-grid">
          <div>
            <h2>Games for spare attention.</h2>
          </div>
          <div className="about-story-copy">
            <p>
              We started as game makers who loved figuring out why small puzzles stick. The answer
              was rarely bigger features. It was pace, feedback, readability, and a clean reason to
              make one more move.
            </p>
            <p>
              Our catalog focuses on casual mobile play because the format asks for discipline.
              A good puzzle has to load fast, explain itself quickly, work offline, and still feel
              considered after hundreds of sessions.
            </p>
          </div>
        </div>
      </section>

      <section className="about-stack">
        <div className="about-stack-header">
          <p>Tools stay quiet. The game has to speak first.</p>
        </div>
        <div className="about-stack-grid">
          {TECH_STACK.map((tech) => (
            <div key={tech} className="about-stack-cell">
              {tech}
            </div>
          ))}
        </div>
      </section>

      <section className="about-values">
        {VALUES.map((value) => (
          <article key={value.title} className="about-value-card">
            <div aria-hidden="true">{value.icon}</div>
            <h3>{value.title}</h3>
            <p>{value.body}</p>
          </article>
        ))}
      </section>

      <section className="about-proof">
        <div className="about-proof-copy">
          <h2>Six ways to slow the room down.</h2>
        </div>
        <div className="about-proof-games">
          {featured.map((game) => (
            <Link key={game.id} to={`/games/${game.slug}`} className="about-proof-game">
              <img src={game.icon} alt="" width={44} height={44} loading="lazy" decoding="async" />
              <span>{game.title}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
