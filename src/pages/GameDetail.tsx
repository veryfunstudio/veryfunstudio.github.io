import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Download } from "lucide-react";
import { Link, useParams } from "react-router";
import EntityNotFound from "@/components/common/EntityNotFound";
import { JsonLd } from "@/components/seo/JsonLd";
import { Seo } from "@/components/seo/Seo";
import { getBlogPath, getRelatedPostsForGame } from "@/data/blog";
import { formatGameTags, getGameBySlug, getGameGallery, getRelatedGames } from "@/data/games";
import { SITE_URL } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

const GameDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const game = getGameBySlug(slug ?? "");
  const shouldReduceMotion = useReducedMotion();

  if (!game) {
    return (
      <EntityNotFound
        title="Game not found"
        message="That game is not in the current catalog."
        path={`/games/${slug ?? ""}`}
        backTo="/games"
        backLabel="Back to games"
      />
    );
  }

  const primaryTags = formatGameTags(game);
  const primaryFeatures = game.features.slice(0, 4);
  const secondaryFeatures = game.features.slice(4);
  const gallery = getGameGallery(game);
  const relatedGames = getRelatedGames(game, 3);
  const relatedPosts = getRelatedPostsForGame(game, 2);
  const releaseLabel = formatDate(game.releaseDate);
  const heroFacts = [
    { label: "Platform", value: "Android" },
    { label: "Price", value: "Free" },
    { label: "Release", value: releaseLabel },
  ];
  const motionEnter = shouldReduceMotion
    ? { initial: false as const, animate: undefined, transition: undefined }
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
      };
  const motionMedia = shouldReduceMotion
    ? { initial: false as const, animate: undefined, transition: undefined }
    : {
        initial: { opacity: 0, scale: 0.96 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] as const },
      };
  const hasBoardShots = gallery.some((item) => item.kind === "screen");

  return (
    <article className="site-page relative overflow-hidden px-[3.125vw] pt-28 pb-24 lg:pt-32">
      <Seo
        title={`${game.title} - Free Puzzle Game`}
        description={game.description}
        path={`/games/${game.slug}`}
        image={game.image}
        imageWidth={1200}
        imageHeight={630}
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
          initial={motionEnter.initial}
          animate={motionEnter.animate}
          transition={motionEnter.transition}
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
            <p className="game-detail-hook">{game.hook}</p>
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
            <span className="game-detail-release">Released {releaseLabel}</span>
          </div>
        </motion.div>

        <motion.div
          initial={motionMedia.initial}
          animate={motionMedia.animate}
          transition={motionMedia.transition}
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

      <section className="game-detail-gallery" aria-label={`${game.title} visuals`}>
        <div className="game-detail-gallery__head">
          <h2>Look closer.</h2>
          <p>
            {hasBoardShots
              ? "Store key art and in-game boards — the same calm presentation players meet on Google Play."
              : "Key art and app icon from the store listing."}
          </p>
        </div>
        <div className="game-detail-gallery__track">
          {gallery.map((shot) => {
            const frame = shot.frame ?? (shot.kind === "icon" ? "square" : "wide");
            return (
              <figure
                key={`${shot.kind}-${shot.src}`}
                className={`game-detail-gallery__item game-detail-gallery__item--${frame}`}
              >
                <div className="game-detail-gallery__frame">
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    width={frame === "phone" ? 1080 : frame === "square" ? 256 : 1200}
                    height={frame === "phone" ? 1920 : frame === "square" ? 256 : 630}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <figcaption>{shot.caption}</figcaption>
              </figure>
            );
          })}
        </div>
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

      {(relatedGames.length > 0 || relatedPosts.length > 0) && (
        <section className="related-strip" aria-label="Related content">
          {relatedGames.length > 0 && (
            <>
              <div className="related-strip__head">
                <h2>More boards.</h2>
                <p>Same catalog, different kind of quiet focus.</p>
              </div>
              <div className="related-strip__grid">
                {relatedGames.map((item) => (
                  <Link key={item.slug} to={`/games/${item.slug}`} className="related-card">
                    <img
                      src={item.image}
                      alt=""
                      width={400}
                      height={210}
                      loading="lazy"
                      decoding="async"
                    />
                    <div>
                      <strong>{item.title}</strong>
                      <span>{formatGameTags(item)}</span>
                    </div>
                    <ArrowRight size={18} />
                  </Link>
                ))}
              </div>
            </>
          )}

          {relatedPosts.length > 0 && (
            <>
              <div className="related-strip__head related-strip__head--secondary">
                <h2>Studio notes.</h2>
                <p>How we think about this kind of puzzle.</p>
              </div>
              <div className="related-strip__grid related-strip__grid--notes">
                {relatedPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={getBlogPath(post)}
                    className="related-card related-card--note"
                  >
                    <div>
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <strong>{post.title}</strong>
                      <p>{post.excerpt}</p>
                    </div>
                    <ArrowRight size={18} />
                  </Link>
                ))}
              </div>
            </>
          )}
        </section>
      )}
    </article>
  );
};

export default GameDetail;
