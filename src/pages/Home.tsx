import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { MahjongBoard } from "@/components/common/MahjongBoard";
import { JsonLd } from "@/components/seo/JsonLd";
import { Seo } from "@/components/seo/Seo";
import { getPostsByNewest } from "@/data/blog";
import { GAMES } from "@/data/games";
import { ORGANIZATION_SCHEMA, WEBSITE_SCHEMA } from "@/lib/schema";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = GAMES[activeIndex];
  const notes = getPostsByNewest().slice(0, 2);
  return (
    <div className="studio-page playroom">
      <Seo
        title="Indie Mobile Game Studio"
        description="Small puzzle games for a good break. Try a Mahjong board, then discover VeryFun Studio's Android games."
        path="/"
      />
      <JsonLd schema={ORGANIZATION_SCHEMA} />
      <JsonLd schema={WEBSITE_SCHEMA} />
      <section className="playroom-main" aria-labelledby="playroom-title">
        <div className="playroom-heading">
          <h1 id="playroom-title">A little room for play.</h1>
          <Link to="/about">
            Meet the studio <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="playroom-table">
          <div className="playroom-shelf">
            <div className="playroom-shelf-title">
              <h2>Pick a puzzle</h2>
              <span>{GAMES.length} games</span>
            </div>
            <div className="playroom-games" role="group" aria-label="Choose a game">
              {GAMES.map((game, index) => (
                <button
                  type="button"
                  key={game.slug}
                  onClick={() => setActiveIndex(index)}
                  aria-pressed={activeIndex === index}
                >
                  <img src={game.icon} alt="" width={56} height={56} />
                  <span>
                    <strong>{game.title}</strong>
                    <small>
                      {game.technologies.filter((value) => value !== "Android").join(" / ")}
                    </small>
                  </span>
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              ))}
            </div>
            <div className="playroom-game-info" aria-live="polite">
              <h2>{active.title}</h2>
              <p>{active.hook}</p>
              <a
                className="playroom-install"
                href={active.googlePlayUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get it on Google Play <ArrowUpRight size={16} />
              </a>
              <Link className="playroom-details" to={`/games/${active.slug}`}>
                Game details <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div
            className={`playroom-surface ${active.slug === "nova-mahjong" ? "playroom-surface--board" : ""}`}
          >
            {active.slug === "nova-mahjong" ? (
              <>
                <div className="playroom-surface-head">
                  <span>Try a board</span>
                  <span>No timer</span>
                </div>
                <MahjongBoard />
              </>
            ) : (
              <>
                <div className="playroom-surface-head">
                  <span>{active.title}</span>
                  <span>Game artwork</span>
                </div>
                <Link className="playroom-art" to={`/games/${active.slug}`}>
                  <img src={active.image} alt={`${active.title} game artwork`} />
                  <span>
                    Explore {active.title} <ArrowUpRight size={18} />
                  </span>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
      <section className="playroom-notes" aria-labelledby="playroom-notes-title">
        <div>
          <h2 id="playroom-notes-title">Behind the games</h2>
          <Link to="/blog">
            All notes <ArrowUpRight size={16} />
          </Link>
        </div>
        {notes.map((note) => (
          <Link key={note.id} to={`/blog/${note.slug}`}>
            <span>{note.category}</span>
            <h3>{note.title}</h3>
            <ArrowUpRight size={20} />
          </Link>
        ))}
      </section>
    </div>
  );
}
