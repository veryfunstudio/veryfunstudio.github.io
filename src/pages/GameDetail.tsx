import { motion } from "framer-motion";
import { ArrowLeft, Download } from "lucide-react";
import { Link, useParams } from "react-router";
import EntityNotFound from "@/components/common/EntityNotFound";
import { JsonLd } from "@/components/seo/JsonLd";
import { Seo } from "@/components/seo/Seo";
import { formatGameTags, getGameBySlug } from "@/data/games";
import { SITE_URL } from "@/lib/constants";

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

  const primaryTags = formatGameTags(game);
  const primaryFeatures = game.features.slice(0, 4);
  const secondaryFeatures = game.features.slice(4);
  const heroFacts = [
    { label: "Platform", value: "Android" },
    { label: "Price", value: "Free" },
    { label: "Release", value: game.releaseDate },
  ];

  return (
    <article className="site-page relative overflow-hidden px-[3.125vw] pt-28 pb-24 lg:pt-32">
      <Seo
        title={`${game.title} - Free Puzzle Game`}
        description={game.description}
        path={`/games/${game.slug}`}
        image={game.image}
        imageWidth={1200}
        imageHeight={630}
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
            <span className="game-detail-mark">
              <span>{primaryTags}</span>
            </span>
            <h1>{game.title}</h1>
          </div>
          <p>{game.description}</p>
          <div className="game-detail-actions">
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
            <span className="game-detail-release">Released {game.releaseDate}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="game-detail-showcase"
        >
          <div className="game-detail-media">
            <img
              src={game.image}
              alt={`${game.title} key art`}
              width={1200}
              height={900}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>

          <div className="game-detail-identity">
            <div className="game-detail-identity__app">
              <img src={game.icon} alt="" width={56} height={56} decoding="async" />
              <div>
                <strong>{game.title}</strong>
                <span>{primaryTags}</span>
              </div>
            </div>
            <dl>
              {heroFacts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>
      </section>

      <section className="game-detail-brief">
        <div>
          <h2>Clear rules, calm repeat play.</h2>
        </div>
        <p>{game.answer}</p>
      </section>

      <section className="game-detail-summary">
        <div className="game-detail-summary__copy">
          <h2>One clear loop, tuned for quiet repeat play.</h2>
          <p>{game.fullDescription}</p>
          {secondaryFeatures.length > 0 && (
            <div className="game-detail-summary__notes">
              {secondaryFeatures.map((feature) => (
                <span key={feature}>{feature}</span>
              ))}
            </div>
          )}
        </div>

        <div className="game-detail-summary__features">
          {primaryFeatures.map((feature) => (
            <div key={feature}>
              <strong>{feature}</strong>
            </div>
          ))}
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
