import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
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
      <Link
        to={`/games/${game.slug}`}
        className="studio-game-row__image"
        aria-label={`Explore ${game.title}`}
      >
        <img
          src={game.image}
          alt={`${game.title} key art`}
          width={1200}
          height={630}
          loading="lazy"
        />
        <span>VFS / GAME {number}</span>
      </Link>
      <div className="studio-game-row__content">
        <div className="studio-game-row__top">
          <span>GAME / {number}</span>
          <span>{formatGameTags(game)}</span>
        </div>
        <div className="studio-game-row__identity">
          <img src={game.icon} alt="" width={56} height={56} loading="lazy" />
          <span>Free to install · Android</span>
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
