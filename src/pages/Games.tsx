import { ArrowDown, ArrowUpRight } from "lucide-react";
import { GameFeatureRow } from "@/components/common/GameFeatureRow";
import { JsonLd } from "@/components/seo/JsonLd";
import { Seo } from "@/components/seo/Seo";
import { GAMES, getGamesByNewest } from "@/data/games";
import { SITE_URL } from "@/lib/constants";

export default function Games() {
  const games = getGamesByNewest();

  return (
    <div className="studio-page studio-catalog">
      <Seo
        title="Our Mobile Games"
        description={`Browse all ${GAMES.length} free mobile puzzle games from VeryFun Studio: Nova Mahjong, Tile Journey, and Arrow Out.`}
        path="/games"
      />
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "VeryFun Studio Games",
          description: `Catalog of ${GAMES.length} free mobile puzzle games.`,
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

      <section className="studio-catalog__intro" aria-labelledby="catalog-title">
        <div className="studio-shell">
          <div className="studio-catalog__eyebrow">
            <span>THE GAME INDEX</span>
            <span>VOL. 001 — {String(games.length).padStart(2, "0")} TITLES</span>
          </div>
          <h1 id="catalog-title">
            Find your <em>next move.</em>
          </h1>
          <div className="studio-catalog__intro-bottom">
            <p>
              One small studio. Three very different puzzles. All built around clear rules,
              thoughtful pauses, and the pleasure of figuring it out.
            </p>
            <a href="#game-nova-mahjong" className="studio-action studio-action--dark">
              Explore the index <ArrowDown size={19} aria-hidden="true" />
            </a>
          </div>
          <nav className="studio-catalog__quicklinks" aria-label="Jump to a game">
            {games.map((game, index) => (
              <a key={game.slug} href={`#game-${game.slug}`}>
                <span>0{index + 1}</span>
                {game.title}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            ))}
          </nav>
        </div>
      </section>
      <section className="studio-collection studio-collection--catalog" aria-label="Game catalog">
        <div className="studio-shell studio-game-list">
          {games.map((game, index) => (
            <GameFeatureRow key={game.slug} game={game} index={index} />
          ))}
        </div>
      </section>
      <section className="studio-catalog__closing">
        <div className="studio-shell">
          <p>Made to fit real life.</p>
          <strong>Open a game. Take your time.</strong>
        </div>
      </section>
    </div>
  );
}
