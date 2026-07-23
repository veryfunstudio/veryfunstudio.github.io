import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Seo } from "@/components/seo/Seo";
import { getGamesByNewest } from "@/data/games";

const VALUES = [
  {
    number: "01",
    title: "Attention is the budget",
    body: "Short sessions that never demand a streak or punish a pause.",
  },
  {
    number: "02",
    title: "Rules before spectacle",
    body: "The board has to read instantly. Polish supports the puzzle.",
  },
  {
    number: "03",
    title: "Free should still feel premium",
    body: "Free to install, no content paywalls, and no extraction loop. Still built with care.",
  },
] as const;

const About = () => {
  const featuredGames = getGamesByNewest().slice(0, 4);

  return (
    <div className="workshop-page">
      <Seo
        title="About the Studio"
        description="Independent mobile game studio crafting calming, free-to-play puzzle games with clear boards and quiet pacing."
        path="/about"
        image={featuredGames[0]?.image}
        imageWidth={1200}
        imageHeight={630}
      />

      <section className="about-hero">
        <div className="workshop-shell about-hero__grid">
          <div className="about-hero-copy">
            <p className="eyebrow">Independent by design</p>
            <h1>
              Built for the <span>quiet moments.</span>
            </h1>
            <p>
              VeryFun Company is a small independent studio shipping free mobile puzzles on Google
              Play. We are a tiny team: design, code, and store pages from one desk. We build for
              spare attention — short sessions, readable boards, offline play — and we skip pressure
              systems unless the timer <em>is</em> the puzzle. We do not ship dark-pattern streaks,
              content paywalls, or games that punish a pause.
            </p>
            <div className="button-row">
              <Link to="/games" className="workshop-button workshop-button--accent">
                See the games <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="workshop-button">
                Contact
              </Link>
            </div>
          </div>
          <div className="about-hero-media tactile-card">
            <img
              src="/images/stitch/workshop-bench.jpg"
              alt="A warm, organized independent game design workbench"
              width={1000}
              height={800}
            />
            <span>One small studio. Every detail considered.</span>
          </div>
        </div>
      </section>
      <section className="workshop-section">
        <div className="workshop-shell">
          <header className="section-heading">
            <div>
              <p className="eyebrow">The manifesto</p>
              <h2>Play with structural honesty.</h2>
            </div>
            <p>Rules first, calm feedback, and no systems that punish a pause.</p>
          </header>
          <div className="manifesto-grid">
            <article>
              <h3>Quiet gaming</h3>
              <p>Timers disappear unless the clock is the puzzle. Sessions fit around life.</p>
            </article>
            <article>
              <h3>Structural honesty</h3>
              <p>Interfaces reveal the state of play clearly. Decoration never hides a rule.</p>
            </article>
            <article>
              <h3>Deep accessibility</h3>
              <p>High contrast, comfortable targets, and readable boards welcome more players.</p>
            </article>
            <article>
              <h3>Indie soul</h3>
              <p>
                Small-team decisions stay close to the game, the store page, and player feedback.
              </p>
            </article>
          </div>
        </div>
      </section>
      <section className="workshop-section workshop-section--ruled">
        <div className="workshop-shell values-layout">
          <div>
            <p className="eyebrow">Our core values</p>
            <h2>Games for spare attention.</h2>
          </div>
          <div className="values-list">
            {VALUES.map((value) => (
              <article key={value.title}>
                <span>{value.number}</span>
                <div>
                  <h3>{value.title}</h3>
                  <p>{value.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="workshop-section">
        <div className="workshop-shell">
          <header className="section-heading">
            <div>
              <p className="eyebrow">The catalog</p>
              <h2>What leaves the workshop.</h2>
            </div>
          </header>
          <div className="about-catalog">
            {featuredGames.map((game, index) => (
              <Link key={game.slug} to={`/games/${game.slug}`}>
                <img src={game.icon} alt="" width={64} height={64} />
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{game.title}</strong>
                <ArrowRight size={18} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="workshop-cta">
        <div className="workshop-shell">
          <div className="workshop-cta__panel tactile-card">
            <h2>Want to work with us?</h2>
            <p>
              We are always listening to players, partners, and people who care about thoughtful
              games.
            </p>
            <Link to="/contact" className="workshop-button workshop-button--accent">
              Say hello <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
