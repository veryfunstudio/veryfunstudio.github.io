import { ArrowRight, CheckCircle2, Download } from "lucide-react";
import { Link } from "react-router";
import { JsonLd } from "@/components/seo/JsonLd";
import { Seo } from "@/components/seo/Seo";
import { formatGameTags, GAMES, getGamesByNewest, getNewestGame } from "@/data/games";
import { BRAND, BRAND_LOGO_URL, GOOGLE_PLAY_DEVELOPER_URL, SITE_URL } from "@/lib/constants";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND.name,
  url: SITE_URL,
  logo: BRAND_LOGO_URL,
  description: BRAND.description,
  sameAs: [BRAND.social.github, BRAND.social.x, GOOGLE_PLAY_DEVELOPER_URL],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: BRAND.name,
  url: SITE_URL,
};

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
  const gameCount = GAMES.length;

  return (
    <div className="workshop-page">
      <Seo
        title="Indie Mobile Game Studio"
        description="Free, calming mobile puzzle games on Google Play. Offline-friendly, free to install, and built for spare attention."
        path="/"
      />
      <JsonLd schema={organizationSchema} />
      <JsonLd schema={websiteSchema} />

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
            <img
              src="/images/stitch/workshop-hero.jpg"
              alt="Wooden puzzle pieces arranged on a workshop table"
              width={900}
              height={900}
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      <section className="workshop-section" aria-label="Featured games">
        <div className="workshop-shell">
          <header className="section-heading">
            <div>
              <p className="eyebrow">The collection</p>
              <h2>Featured Games</h2>
            </div>
            <p>Calm, hand-crafted puzzles for real life.</p>
          </header>
          <div className="workshop-card-grid">
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
          </div>
        </div>
      </section>

      <section className="manifesto-band">
        <div className="workshop-shell manifesto-band__grid">
          <blockquote>
            "Good puzzles create focus without demanding it."<small>Our craft principle</small>
          </blockquote>
          <div>
            <h2>Our Craft Manifesto</h2>
            {PROMISES.map((item) => (
              <div key={item.title} className="manifesto-point">
                <CheckCircle2 size={18} />
                <p>
                  <strong>{item.title}:</strong> {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="workshop-cta">
        <div className="workshop-shell">
          <div className="workshop-cta__panel tactile-card">
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
          </div>
        </div>
      </section>
    </div>
  );
}
