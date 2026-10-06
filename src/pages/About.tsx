import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { PageIntro } from "@/components/common/PageIntro";
import { StudioCTA } from "@/components/common/StudioCTA";
import { Seo } from "@/components/seo/Seo";
import { getGamesByNewest } from "@/data/games";

const VALUES = [
  {
    number: "01",
    title: "Clarity comes first.",
    body: "Readable boards, comfortable targets, and rules you can understand at a glance. Every detail should help you find your next move.",
  },
  {
    number: "02",
    title: "Room for real life.",
    body: "Short sessions, offline play, and no pressure to keep a streak. Take a break whenever you need one; the puzzle will wait.",
  },
  {
    number: "03",
    title: "Small, on purpose.",
    body: "A tiny team keeps design, code, and player feedback close together. We focus on a few puzzles and the details that make them feel good.",
  },
];
const MARKS = [
  "tile_dot_6",
  "tile_bamboo_3",
  "tile_dragon_red",
  "tile_character_5",
  "tile_flower_orchid",
  "tile_flower_chrysanthemum",
];

export default function About() {
  const games = getGamesByNewest();
  return (
    <div className="studio-page">
      <Seo
        title="About the Studio"
        description="Independent mobile game studio crafting calming, free-to-play puzzle games with clear boards and quiet pacing."
        path="/about"
      />
      <PageIntro
        eyebrow="03 / About the studio"
        title="Small studio."
        accent="Room to play."
        description="We make thoughtful mobile puzzles for the quiet moments in an otherwise busy day."
        meta="Independent by design"
      />
      <section className="studio-shell studio-story">
        <div className="studio-story__art">
          <div className="asset-board">
            {MARKS.map((mark) => (
              <div key={mark}>
                <img
                  src={`/game-assets/nova-mahjong/${mark}.png`}
                  alt=""
                  width={198}
                  height={241}
                />
              </div>
            ))}
          </div>
          <p className="studio-kicker">On the board / Nova Mahjong</p>
        </div>
        <div className="studio-story__copy">
          <p className="studio-kicker">A note from the studio</p>
          <h2>
            A little less rush.
            <br />A little more <em>play.</em>
          </h2>
          <p>
            VeryFun Studio is a small independent team making free mobile puzzles on Google Play.
            Design, code, and store pages come from one desk.
          </p>
          <p>
            We build for spare attention: short sessions, readable boards, and offline play. Our
            games leave room to think, and room to put the phone down.
          </p>
          <Link to="/games" className="studio-text-link">
            Meet the games <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="studio-shell studio-values">
        <div className="studio-section-heading">
          <div>
            <p className="studio-kicker">What we care about</p>
            <h2>
              Good play starts <em>here.</em>
            </h2>
          </div>
        </div>
        <div className="studio-values__grid">
          {VALUES.map((value) => (
            <article key={value.number}>
              <span className="studio-kicker">{value.number}</span>
              <h3>{value.title}</h3>
              <p>{value.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="studio-shell studio-shelf" aria-label="Our games">
        <p className="studio-kicker">Made by VeryFun Studio</p>
        <div>
          {games.map((game) => (
            <Link key={game.slug} to={`/games/${game.slug}`}>
              <img src={game.icon} alt="" width={64} height={64} loading="lazy" />
              <strong>{game.title}</strong>
              <ArrowUpRight size={18} />
            </Link>
          ))}
        </div>
      </section>
      <StudioCTA
        title="Good ideas start with a conversation."
        description="Player feedback, thoughtful partnerships, or a simple hello — we are listening."
        to="/contact"
        label="Get in touch"
      />
    </div>
  );
}
