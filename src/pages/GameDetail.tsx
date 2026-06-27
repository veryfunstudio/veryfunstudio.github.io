import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Download, MoveRight, Sparkles } from "lucide-react";
import { getGameBySlug } from "@/data/games";
import { Seo } from "@/components/seo/Seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/constants";
import EntityNotFound from "@/components/common/EntityNotFound";

const GameDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const game = getGameBySlug(slug ?? "");

  if (!game) {
    return (
      <EntityNotFound
        title="Game not found"
        message="That game is not in the current catalog."
        backTo="/games"
        backLabel="Back to games"
      />
    );
  }

  const primaryTags = game.technologies.slice(1);
  const sessionSteps = [
    ["01", "Open", game.features[0] ?? "Start a clean board"],
    ["02", "Read", game.features[1] ?? "Find the first clear move"],
    ["03", "Solve", game.features[2] ?? "Use simple tools when stuck"],
    ["04", "Return", game.features[5] ?? "Come back without pressure"],
  ];

  return (
    <article className="site-page relative overflow-hidden px-[3.125vw] pt-28 pb-24 lg:pt-32">
      <Seo
        title={`${game.title} - Free Puzzle Game`}
        description={game.description}
        path={`/games/${game.slug}`}
        image={game.image}
        type="article"
      />
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: game.title,
          description: game.answer,
          url: `${SITE_URL}/games/${game.slug}`,
          image: `${SITE_URL}${game.image}`,
          applicationCategory: "GameApplication",
          operatingSystem: "Android",
          softwareVersion: "1.0",
          datePublished: game.releaseDate,
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          downloadUrl: game.googlePlayUrl,
          featureList: game.features,
        }}
      />
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: game.faq.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }}
      />
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Games", item: `${SITE_URL}/games` },
            {
              "@type": "ListItem",
              position: 3,
              name: game.title,
              item: `${SITE_URL}/games/${game.slug}`,
            },
          ],
        }}
      />

      <section className="game-detail-hero">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="game-detail-copy"
        >
          <Link to="/games" className="game-detail-back">
            <ArrowLeft size={16} />
            Games
          </Link>
          <div>
            <img src={game.icon} alt="" width={72} height={72} loading="eager" decoding="async" />
            <h1>{game.title}</h1>
          </div>
          <p>{game.description}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={game.googlePlayUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Get ${game.title} on Google Play`}
              className="pill-button pill-button--accent"
            >
              <Download size={16} />
              Google Play
            </a>
            <span className="pill-button" aria-label={`Released ${game.releaseDate}`}>
              {game.releaseDate}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="game-detail-media"
        >
          <img
            src={game.image}
            alt={`${game.title} key art`}
            width={1200}
            height={900}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <img
            className="game-detail-icon"
            src={game.icon}
            alt=""
            width={132}
            height={132}
            loading="eager"
            decoding="async"
          />
          <div className="game-detail-tags">
            {primaryTags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="game-detail-brief">
        <div>
          <Sparkles size={22} />
          <h2>What it feels like</h2>
        </div>
        <p>{game.answer}</p>
      </section>

      <section className="game-detail-session">
        <div className="game-detail-session-copy">
          <span className="status-text">First session</span>
          <h2>Four calm moves before the game gets deep.</h2>
          <p>
            The loop is deliberately legible: understand the board, make one confident move, clear
            space, and leave with progress still intact.
          </p>
        </div>

        <div className="game-detail-session-board" aria-label={`${game.title} session flow`}>
          {sessionSteps.map(([code, label, body], index) => (
            <article key={label} className="game-detail-session-step">
              <span>{code}</span>
              <div>
                <strong>{label}</strong>
                <p>{body}</p>
              </div>
              {index < sessionSteps.length - 1 && <MoveRight size={18} aria-hidden="true" />}
            </article>
          ))}
        </div>
      </section>

      <section className="game-detail-system">
        <div className="game-detail-feature-grid">
          {game.features.map((feature) => (
            <div key={feature}>{feature}</div>
          ))}
        </div>
        <div className="game-detail-description">
          <h2>Designed for repeat play.</h2>
          <p>{game.fullDescription}</p>
        </div>
      </section>

      <section className="game-detail-faq">
        <h2>Questions players ask.</h2>
        <div>
          {game.faq.map((item) => (
            <details key={item.question}>
              <summary>
                <span>{item.question}</span>
                <span aria-hidden="true">+</span>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </article>
  );
};

export default GameDetail;
