"use client";

import { type PointerEvent, useCallback, useRef } from "react";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import type { GAMES } from "@/data/games";

type Game = (typeof GAMES)[number];

type GameCardProps = {
  game: Game;
  index: number;
  headingLevel?: "h2" | "h3";
};

export default function GameCard({ game, index, headingLevel = "h3" }: GameCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const Heading = headingLevel;

  const updateCardTilt = useCallback((event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType === "touch") return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    const rotateY = (x - 50) * 0.12;
    const rotateX = (50 - y) * 0.1;

    event.currentTarget.style.setProperty("--card-x", `${x.toFixed(2)}%`);
    event.currentTarget.style.setProperty("--card-y", `${y.toFixed(2)}%`);
    event.currentTarget.style.setProperty("--card-rotate-x", `${rotateX.toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--card-rotate-y", `${rotateY.toFixed(2)}deg`);
  }, []);

  const resetCardTilt = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;

    card.style.setProperty("--card-x", "50%");
    card.style.setProperty("--card-y", "22%");
    card.style.setProperty("--card-rotate-x", "0deg");
    card.style.setProperty("--card-rotate-y", "0deg");
  }, []);

  return (
    <Link
      ref={cardRef}
      to={`/games/${game.slug}`}
      className="game-magnetic-card"
      onPointerMove={updateCardTilt}
      onPointerLeave={resetCardTilt}
      onBlur={resetCardTilt}
    >
      <div className="game-card-media">
        <img
          src={game.image}
          alt={game.title}
          width={680}
          height={510}
          loading={index < 2 ? "eager" : "lazy"}
          decoding="async"
        />
      </div>
      <div className="game-card-copy">
        <img
          className="game-card-icon"
          src={game.icon}
          alt=""
          width={72}
          height={72}
          loading={index < 2 ? "eager" : "lazy"}
          decoding="async"
        />
        <span className="status-text">{String(game.id).padStart(2, "0")}</span>
        <Heading>{game.title}</Heading>
        <p>{game.description}</p>
        <div>
          {game.technologies.slice(1).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
      <ArrowUpRight className="game-card-arrow" size={22} />
    </Link>
  );
}
