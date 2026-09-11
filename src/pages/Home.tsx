import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Download } from "lucide-react";
import { Link } from "react-router";
import { JsonLd } from "@/components/seo/JsonLd";
import { Seo } from "@/components/seo/Seo";
import {
  formatGameTags,
  GAMES,
  getCollageSatellites,
  getGamesByNewest,
  getNewestGame,
} from "@/data/games";
import { GOOGLE_PLAY_DEVELOPER_URL } from "@/lib/constants";
import { REVEAL, REVEAL_FADE } from "@/lib/reveal";
import { ORGANIZATION_SCHEMA, WEBSITE_SCHEMA } from "@/lib/schema";

const PROMISES = [
  {
    title: "No dark patterns",
    body: "No manipulative streaks, pressure loops, or content paywalls.",
  },
  {
    title: "Offline friendly",
    body: "Your games stay available when the connection does not.",
  },
  {
    title: "Clear by design",
    body: "Large targets, readable boards, and feedback that respects attention.",
  },
];

export default function Home() {
  const latestGame = getNewestGame();
  const catalog = getGamesByNewest();
  const satellites = getCollageSatellites(latestGame);
  const gameCount = GAMES.length;

  return (
    <div className="workshop-page">
      <Seo
        title="Indie Mobile Game Studio"
        description="Free, calming mobile puzzle games on Google Play. Offline-friendly, free to install, and built for spare attention."
        path="/"
      />
      <JsonLd schema={ORGANIZATION_SCHEMA} />
      <JsonLd schema={WEBSITE_SCHEMA} />

      <section className="workshop-hero">
        <div className="workshop-shell workshop-hero__grid">
          <div className="workshop-hero__copy">
            <p className="eyebrow">VeryFun Studio · Independent studio</p>
            <h1>
              Quiet games.
              <br />
              <span>Bright logic.</span>
            </h1>
            <p>
              {gameCount} calming mobile puzzles for spare moments. Free to install, easy on the
              eyes, fully offline, and built to leave your attention intact.
            </p>
            <div className="button-row">
              <Link to="/games" className="workshop-button workshop-button--accent">
                Browse games <ArrowRight size={17} />
              </Link>
              <a
                href={GOOGLE_PLAY_DEVELOPER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="workshop-button"
              >
                <Download size={17} /> Get on Google Play
              </a>
            </div>
          </div>
          <div className="workshop-hero__media grid-paper">
            <div className="hero-collage">
              <figure className="hero-collage__piece hero-collage__piece--main">
                <div className="hero-collage__float">
                  <img
                    src={latestGame.image}
                    alt={`${latestGame.title} key art`}
                    width={760}
                    height={560}
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
                <figcaption>N°01 — {latestGame.title}</figcaption>
              </figure>
              {satellites.map((game, index) => (
                <figure
                  key={game.slug}
                  className={`hero-collage__piece hero-collage__piece--sat${index + 1}`}
                >
                  <div className="hero-collage__float">
                    <img src={game.icon} alt="" width={240} height={240} loading="lazy" />
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="workshop-section" aria-label="Featured games">
        <div className="workshop-shell">
          <motion.header className="section-heading" {...REVEAL}>
            <div>
              <p className="eyebrow">The collection</p>
              <h2>Featured Games</h2>
            </div>
            <p>Calm, hand-crafted puzzles for real life.</p>
          </motion.header>
          <motion.div className="workshop-card-grid" {...REVEAL}>
            {catalog.map((game, index) => (
              <article key={game.slug} className="workshop-game-card tactile-card">
                <Link to={`/games/${game.slug}`} className="workshop-game-card__media">
                  <img
                    src={game.image}
                    alt={`${game.title} key art`}
                    width={760}
                    height={560}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  <span>{formatGameTags(game)}</span>
                </Link>
                <div className="workshop-game-card__body">
                  <div className="numbered-title">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{game.title}</h3>
                  </div>
                  <p>{game.description}</p>
                </div>
                <div className="workshop-game-card__actions">
                  <span>Free on Android</span>
                  <Link to={`/games/${game.slug}`} aria-label={`Open ${game.title}`}>
                    Learn more <ArrowRight size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="manifesto-band">
        <div className="workshop-shell manifesto-band__grid">
          <motion.blockquote {...REVEAL}>
            <span className="manifesto-band__mark" aria-hidden="true">
              &ldquo;
            </span>
            <p>
              Good puzzles create <em>focus</em> without demanding it.
            </p>
            <footer>
              <small>Our craft principle</small>
              <small>VeryFun Studio</small>
            </footer>
          </motion.blockquote>
          <motion.div {...REVEAL}>
            <h2>Our Craft Manifesto</h2>
            {PROMISES.map((item) => (
              <div key={item.title} className="manifesto-point">
                <CheckCircle2 size={18} />
                <p>
                  <strong>{item.title}:</strong> {item.body}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="workshop-cta">
        <div className="workshop-shell">
          <motion.div className="workshop-cta__panel tactile-card" {...REVEAL_FADE}>
            <p className="eyebrow">Latest release</p>
            <h2>{latestGame.title}</h2>
            <p>
              {latestGame.hook} Learn more about the game, see store artwork, or install from Google
              Play.
            </p>
            <div className="button-row">
              <Link
                to={`/games/${latestGame.slug}`}
                className="workshop-button workshop-button--accent"
              >
                Learn more <ArrowRight size={17} />
              </Link>
              <Link to="/blog" className="workshop-button">
                Studio blog
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
