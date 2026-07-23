import { ArrowRight, Download } from "lucide-react";
import { Link } from "react-router";
import { JsonLd } from "@/components/seo/JsonLd";
import { Seo } from "@/components/seo/Seo";
import { formatGameTags, GAMES, getGamesByNewest } from "@/data/games";
import { SITE_URL } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

const Games = () => {
  const games = getGamesByNewest();
  const gameCount = GAMES.length;

  return (
    <div className="workshop-page">
      <Seo
        title="Our Mobile Games"
        description={`Browse all ${gameCount} free mobile puzzle games from VeryFun Company: Nova Mahjong, Tile Journey, and Arrow Out.`}
        path="/games"
      />
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "VeryFun Company Games",
          description: `Catalog of ${gameCount} free mobile puzzle games.`,
          url: `${SITE_URL}/games`,
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: games.length,
            itemListElement: games.map((game, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `${SITE_URL}/games/${game.slug}`,
              name: game.title,
            })),
          },
        }}
      />

      <section className="archive-hero">
        <div className="workshop-shell archive-hero__grid">
          <div>
            <p className="eyebrow">The collection</p>
            <h1>
              Games from
              <br />
              the workshop.
            </h1>
            <p>
              Quiet Android puzzles made for spare attention, clear thinking, and play that can
              pause when life interrupts.
            </p>
          </div>
          <div className="archive-count">
            <strong>{String(gameCount).padStart(2, "0")}</strong>
            <span>Playable boards</span>
          </div>
        </div>
      </section>

      <section className="workshop-section" aria-label="Game catalog">
        <div className="workshop-shell workshop-card-grid">
          {games.map((game, index) => (
            <article key={game.id} className="workshop-game-card tactile-card">
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
                  <h2>{game.title}</h2>
                </div>
                <p className="card-hook">{game.hook}</p>
                <p>{game.description}</p>
                <div className="card-meta">
                  <time dateTime={game.releaseDate}>{formatDate(game.releaseDate)}</time>
                  <span>Free · Android</span>
                </div>
              </div>
              <div className="workshop-game-card__actions">
                <Link to={`/games/${game.slug}`}>
                  Open brief <ArrowRight size={15} />
                </Link>
                <a href={game.googlePlayUrl} target="_blank" rel="noopener noreferrer">
                  <Download size={15} /> Google Play
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="principle-band">
        <div className="workshop-shell">
          <p className="eyebrow">Built for real life</p>
          <h2>Start quickly. Read clearly. Stop without penalty.</h2>
          <p>
            Every board is tuned around calm repeat play, offline access, and rules that make sense
            before the effects arrive.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Games;
