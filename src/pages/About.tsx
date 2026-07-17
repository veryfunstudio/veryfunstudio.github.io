import { motion } from "framer-motion";
import { ArrowRight, Feather, Grid3x3, Users } from "lucide-react";
import { Link } from "react-router";
import { Seo } from "@/components/seo/Seo";
import { getGamesByNewest } from "@/data/games";

const VALUES = [
  {
    icon: <Users size={22} />,
    title: "Attention is the budget",
    body: "Short sessions that never demand a streak or punish a pause.",
  },
  {
    icon: <Grid3x3 size={22} />,
    title: "Rules before spectacle",
    body: "The board has to read instantly. Polish supports the puzzle.",
  },
  {
    icon: <Feather size={22} />,
    title: "Free should still feel premium",
    body: "Free to install, no content paywalls, and no extraction loop. Still built with care.",
  },
] as const;

const About = () => {
  const featuredGames = getGamesByNewest().slice(0, 4);

  return (
    <div className="site-page relative overflow-hidden px-[3.125vw] pt-28 pb-24 lg:pt-32">
      <Seo
        title="About the Studio"
        description="Independent mobile game studio crafting calming, free-to-play puzzle games with clear boards and quiet pacing."
        path="/about"
        image={featuredGames[0]?.image}
        imageWidth={1200}
        imageHeight={630}
      />

      <section className="about-hero">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="about-hero-copy"
        >
          <h1>Calm games. Clear boards.</h1>
          <p>
            VeryFun Company is a small team building free mobile puzzles for people who want a clear
            challenge without pressure systems or noisy monetization. Timers appear only when they
            are part of the puzzle itself.
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
          <div className="about-product-board" aria-label="VeryFun Company game boards">
            {featuredGames.map((game, index) => (
              <Link
                key={game.slug}
                to={`/games/${game.slug}`}
                className="about-product-tile"
                aria-label={`Open ${game.title}`}
              >
                <img
                  src={game.image}
                  alt=""
                  width={760}
                  height={560}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : undefined}
                  decoding="async"
                />
                <span>
                  {String(index + 1).padStart(2, "0")}
                  <strong>{game.title}</strong>
                </span>
              </Link>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="about-principles">
        <div className="about-principles__copy">
          <h2>Games for spare attention.</h2>
          <p>
            We focus on casual mobile play because the format rewards discipline: a good puzzle
            loads fast, reads instantly, works offline, and still gives players a clean reason to
            make one more move.
          </p>
        </div>
        <div className="about-principles__list">
          {VALUES.map((value) => (
            <article key={value.title} className="about-principle">
              <div aria-hidden="true">{value.icon}</div>
              <div>
                <h3>{value.title}</h3>
                <p>{value.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
