import { ArrowRight, Download } from "lucide-react";
import { lazy, Suspense } from "react";
import { Link } from "react-router";
import { JsonLd } from "@/components/seo/JsonLd";
import { Seo } from "@/components/seo/Seo";
import { formatGameTags, GAMES, getGamesByNewest, getNewestGame } from "@/data/games";
import { BRAND, BRAND_LOGO_URL, GOOGLE_PLAY_DEVELOPER_URL, SITE_URL } from "@/lib/constants";

const HeroCanvas = lazy(() => import("@/components/home/HeroCanvas"));

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
    title: "No rush",
    body: "Short sessions and calm pacing. Timers only when they are the puzzle.",
  },
  {
    title: "No gatekeeping",
    body: "Free to install on Google Play. Core puzzles stay playable without paywalls.",
  },
  {
    title: "No noisy loops",
    body: "Readable boards, calm feedback, and puzzles that respect attention.",
  },
];

export default function Home() {
  const latestGame = getNewestGame();
  const catalog = getGamesByNewest();
  const gameCount = GAMES.length;

  return (
    <div className="relative overflow-hidden">
      <Seo
        title="Indie Mobile Game Studio"
        description="Free, calming mobile puzzle games on Google Play. Offline-friendly, free to install, and built for spare attention."
        path="/"
      />
      <JsonLd schema={organizationSchema} />
      <JsonLd schema={websiteSchema} />

      <div className="fixed inset-0 z-0">
        <Suspense
          fallback={
            <div
              className="hero-canvas-suspense absolute inset-0"
              style={{ pointerEvents: "none" }}
              aria-hidden="true"
            />
          }
        >
          <HeroCanvas />
        </Suspense>
      </div>

      <div className="relative z-10">
        <section className="relative min-h-[100svh] px-[3.125vw] pb-8 pt-24">
          <div className="hero-shell">
            <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.82fr)] lg:py-0">
              <div className="space-y-8">
                <div className="hero-reveal">
                  <p className="status-text mb-4">VeryFun Company</p>
                  <h1
                    className="kinetic-title max-w-[11ch]"
                    aria-label="Quiet games. Bright logic."
                  >
                    Quiet games. <span aria-hidden="true">Bright logic.</span>
                  </h1>
                </div>

                <p className="hero-reveal max-w-[42ch] text-base leading-relaxed text-muted sm:text-lg">
                  {gameCount} mobile puzzles for spare moments: free to install, readable, offline,
                  and built to leave attention intact.
                </p>

                <div className="hero-reveal flex flex-wrap gap-3">
                  <Link to="/games" className="pill-button pill-button--accent">
                    Explore games
                    <ArrowRight size={16} />
                  </Link>
                  <a
                    href={GOOGLE_PLAY_DEVELOPER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pill-button"
                  >
                    <Download size={16} />
                    Google Play
                  </a>
                </div>
              </div>

              <div className="hero-reveal hero-reveal--media relative">
                <div className="signal-deck">
                  <div className="signal-screen signal-screen--hero">
                    <img
                      src={latestGame.image}
                      alt={latestGame.title}
                      width={760}
                      height={570}
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                  <div className="signal-deck__chips">
                    {catalog.slice(0, 3).map((game) => (
                      <Link
                        key={game.slug}
                        to={`/games/${game.slug}`}
                        className="signal-deck__chip"
                      >
                        <img src={game.icon} alt="" width={32} height={32} decoding="async" />
                        <span>{game.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="home-promise-section px-[3.125vw] py-20 lg:py-28">
          <div className="home-promise">
            <div className="home-promise__copy">
              <p className="status-text">Latest release</p>
              <h2>{latestGame.title}</h2>
              <p className="home-promise__hook">{latestGame.hook}</p>
              <p>{latestGame.description}</p>
              <Link to={`/games/${latestGame.slug}`} className="home-promise__preview">
                <img
                  src={latestGame.image}
                  alt={`${latestGame.title} key art`}
                  width={760}
                  height={560}
                  loading="lazy"
                  decoding="async"
                />
                <span>
                  {formatGameTags(latestGame)}
                  <ArrowRight size={16} />
                </span>
              </Link>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to={`/games/${latestGame.slug}`} className="pill-button pill-button--accent">
                  Open brief
                  <ArrowRight size={16} />
                </Link>
                <a
                  href={latestGame.googlePlayUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-button"
                  aria-label={`Get ${latestGame.title} on Google Play`}
                >
                  <Download size={16} />
                  Google Play
                </a>
              </div>
            </div>
            <div className="home-promise__list">
              <p className="status-text">Studio promise</p>
              {PROMISES.map((item, index) => (
                <article key={item.title} className="home-promise__item">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="home-catalog-section px-[3.125vw] pb-24 lg:pb-32"
          aria-label="Game catalog"
        >
          <div className="home-catalog">
            <div className="home-catalog__head">
              <div>
                <p className="status-text">Full catalog</p>
                <h2>Every board, one click away.</h2>
              </div>
              <p>
                {gameCount} free Android puzzles: pick a brief for rules and screenshots, or jump
                straight to Google Play.
              </p>
            </div>
            <ul className="home-catalog__list">
              {catalog.map((game, index) => (
                <li key={game.slug}>
                  <Link to={`/games/${game.slug}`} className="home-catalog__item">
                    <img
                      src={game.icon}
                      alt=""
                      width={48}
                      height={48}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="home-catalog__index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="home-catalog__copy">
                      <strong>{game.title}</strong>
                      <small>{game.hook}</small>
                    </span>
                    <ArrowRight size={18} className="home-catalog__arrow" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="home-catalog__foot">
              <Link to="/games" className="pill-button pill-button--accent">
                Browse all games
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
