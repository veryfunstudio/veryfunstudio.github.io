"use client";

import { ArrowRight, Download } from "lucide-react";
import { lazy, Suspense } from "react";
import { Link } from "react-router";
import { JsonLd } from "@/components/seo/JsonLd";
import { Seo } from "@/components/seo/Seo";
import { GAMES, getGameBySlug } from "@/data/games";
import { BRAND_LOGO_URL, GOOGLE_PLAY_DEVELOPER_URL, SITE_URL } from "@/lib/constants";

const HeroCanvas = lazy(() => import("@/components/home/HeroCanvas"));

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "VeryFun Company",
  url: SITE_URL,
  logo: BRAND_LOGO_URL,
  description:
    "Independent mobile game studio publishing calming, free-to-play puzzle games on Google Play.",
  sameAs: GAMES.map((p) => p.googlePlayUrl),
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "VeryFun Company",
  url: SITE_URL,
};

const PROMISES = [
  {
    title: "No rush",
    body: "Short sessions, no timers, and no forced streaks.",
  },
  {
    title: "No gatekeeping",
    body: "Free games on Google Play, built to keep playing simple.",
  },
  {
    title: "No noisy loops",
    body: "Readable boards, calm feedback, and puzzles that respect attention.",
  },
];

export default function Home() {
  const launchGame = getGameBySlug("nova-mahjong") ?? GAMES[0];
  const latestGame =
    [...GAMES].sort((a, b) => b.releaseDate.localeCompare(a.releaseDate))[0] ?? launchGame;

  return (
    <div className="relative overflow-hidden">
      <Seo
        title="Indie Mobile Game Studio"
        description="Free, calming mobile puzzle games on Google Play. No timers, no paywalls."
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
                  <h1
                    className="kinetic-title max-w-[11ch]"
                    aria-label="Quiet games. Bright logic."
                  >
                    Quiet games. <span aria-hidden="true">Bright logic.</span>
                  </h1>
                </div>

                <p className="hero-reveal max-w-[42ch] text-base leading-relaxed text-muted sm:text-lg">
                  Seven mobile puzzles for spare moments: free, readable, offline, and built to
                  leave attention intact.
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
                  <div className="signal-screen">
                    <img
                      src={launchGame.image}
                      alt={launchGame.title}
                      width={760}
                      height={570}
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="home-promise-section px-[3.125vw] py-20 lg:py-28">
          <div className="dash-line mb-12" />
          <div className="home-promise">
            <div className="home-promise__copy">
              <p className="status-text">Latest release</p>
              <h2>{latestGame.title}</h2>
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
                  {latestGame.technologies.slice(1).join(" / ")}
                  <ArrowRight size={16} />
                </span>
              </Link>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to={`/games/${latestGame.slug}`} className="pill-button pill-button--accent">
                  Open brief
                  <ArrowRight size={16} />
                </Link>
                <Link to="/games" className="pill-button">
                  All games
                </Link>
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
      </div>
    </div>
  );
}
