"use client";

import { lazy, Suspense } from "react";
import { Link } from "react-router";
import { ArrowRight, Download } from "lucide-react";
import { GAMES } from "@/data/games";
import { Seo } from "@/components/seo/Seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { GOOGLE_PLAY_DEVELOPER_URL, SITE_URL } from "@/lib/constants";

const HeroCanvas = lazy(() => import("@/components/home/HeroCanvas"));

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "VeryFun Company",
  url: SITE_URL,
  logo: `${SITE_URL}/images/about.jpeg`,
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

const PRINCIPLES = [
  {
    code: "pace",
    title: "Soft pressure",
    body: "No timers, energy gates, or forced streaks. Every session can stay short, calm, and complete.",
  },
  {
    code: "offline",
    title: "Pocket-ready",
    body: "Playable anywhere after install, with simple controls built for one hand and quick attention shifts.",
  },
  {
    code: "clarity",
    title: "Readable challenge",
    body: "Rules reveal themselves through clean boards, generous feedback, and puzzles that reward planning.",
  },
];

export default function Home() {
  const launchGame = GAMES[1] ?? GAMES[0];

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
        <Suspense fallback={null}>
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
                  Six mobile puzzles for spare moments: free, readable, offline, and built to leave
                  attention intact.
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

              <div className="hero-reveal relative">
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
                    <div className="signal-readout">
                      <span>{launchGame.technologies[1]}</span>
                      <strong>{launchGame.title}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative px-[3.125vw] py-28 lg:py-40">
          <div className="dash-line mb-12" />
          <div className="max-w-[92rem]">
            {[
              "No rush.",
              "No gatekeeping.",
              "No noisy loops.",
              "Just readable puzzles for people with real lives.",
            ].map((line) => (
              <p key={line} className="manifest-line mega-title">
                {line}
              </p>
            ))}
          </div>
        </section>

        <section className="px-[3.125vw] py-24 lg:py-36">
          <div className="dash-line mb-12" />
          <div className="principle-board">
            <div className="principle-intro">
              <h2>Fun without extraction.</h2>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/games" className="pill-button pill-button--accent">
                  Browse lineup
                  <ArrowRight size={16} />
                </Link>
                <Link to="/about" className="pill-button">
                  Studio notes
                </Link>
              </div>
            </div>
            {PRINCIPLES.map((item, index) => (
              <article key={item.code} className="principle-cell">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
