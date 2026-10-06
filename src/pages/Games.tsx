import { ArrowUpRight } from "lucide-react";
import { GameFeatureRow } from "@/components/common/GameFeatureRow";
import { PageIntro } from "@/components/common/PageIntro";
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

      <PageIntro
        eyebrow="01 / The games"
        title="Find your"
        accent="next move."
        description="Three different puzzles. One shared idea: clear rules, thoughtful pauses, and the pleasure of figuring it out."
        meta={`${String(games.length).padStart(2, "0")} games / Free to install / Android`}
      >
        <nav className="studio-catalog__quicklinks" aria-label="Jump to a game">
          {games.map((game, index) => (
            <a key={game.slug} href={`#game-${game.slug}`}>
              <span>0{index + 1}</span>
              {game.title}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          ))}
        </nav>
      </PageIntro>
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
