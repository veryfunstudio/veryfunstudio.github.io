import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { GameLoupe } from "@/components/common/GameLoupe";
import type { Game } from "@/data/games";
import { formatGameTags } from "@/data/games";

interface GameFeatureRowProps {
  game: Game;
  index: number;
}

export function GameFeatureRow({ game, index }: GameFeatureRowProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article id={`game-${game.slug}`} className={`studio-game-row studio-game-row--${index % 3}`}>
      {/* The artwork holds a loupe, so the panel is not a link any more —
          a button inside a link is invalid, and nesting them would give
          the screen reader two conflicting destinations. The title and the
          "Meet the game" link carry the navigation. */}
      <div className="studio-game-row__image">
        <GameLoupe
          src={game.image}
          alt={`${game.title} key art`}
          naturalWidth={1200}
          naturalHeight={630}
        />
        <span>VFS / GAME {number}</span>
      </div>
      <div className="studio-game-row__content">
        <div className="studio-game-row__top">
          <span>{formatGameTags(game)}</span>
        </div>
        <div className="studio-game-row__identity">
          <img src={game.icon} alt="" width={56} height={56} loading="lazy" />
          <span>Free on Android</span>
        </div>
        <h3>{game.title}</h3>
        <p className="studio-game-row__hook">{game.hook}</p>
        <p className="studio-game-row__description">{game.description}</p>
        <div className="studio-game-row__links">
          <Link to={`/games/${game.slug}`}>
            Meet the game <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <a href={game.googlePlayUrl} target="_blank" rel="noopener noreferrer">
            Google Play <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
