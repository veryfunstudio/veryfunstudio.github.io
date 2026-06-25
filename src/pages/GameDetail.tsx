import { useParams, Link } from "react-router";
import { m } from "framer-motion";
import { getGameBySlug } from "@/data/games";
import { ExternalLink, ArrowLeft } from "lucide-react";
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
        title="Game Not Found"
        message="This game seems to have wandered off into another dimension..."
        backTo="/games"
        backLabel="Back to Games"
      />
    );
  }

  return (
    <article>
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
      <section className="py-16">
        <div className="mx-auto max-w-[80rem] px-6">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8 overflow-hidden rounded-[4px] border-2 border-border-strong bg-gradient-to-br from-surface-warm to-muted">
              <img
                src={game.image}
                alt={`${game.title} key art`}
                width={1200}
                height={630}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="mx-auto block aspect-[1200/630] w-full object-contain p-4 sm:p-8"
              />
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-10"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={game.icon}
                  alt={`${game.title} icon`}
                  width={80}
                  height={80}
                  loading="eager"
                  decoding="async"
                  className="h-16 w-16 flex-shrink-0 rounded-[4px] border-2 border-border-strong bg-surface object-cover  sm:h-20 sm:w-20"
                />
                <h1 className="font-kalam text-4xl font-bold text-foreground sm:text-5xl">
                  {game.title}
                </h1>
              </div>
              <time dateTime={game.releaseDate} className="font-patrick text-sm text-muted">
                Released {game.releaseDate}
              </time>
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mb-12 max-w-3xl"
          >
            <p className="mb-6 font-patrick text-2xl leading-relaxed text-foreground">
              {game.answer}
            </p>
            <p className="font-patrick text-xl leading-relaxed text-foreground">
              {game.fullDescription}
            </p>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12 grid gap-8 lg:grid-cols-2"
          >
            <div className="hand-drawn-card relative bg-surface p-8">
              <h2 className="mb-6 font-kalam text-2xl font-bold text-foreground">Key Features</h2>
              <ul className="space-y-4">
                {game.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 font-patrick text-lg text-foreground"
                  >
                    <span className="mt-0.5 text-accent" aria-hidden="true">
                      ✦
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="hand-drawn-card relative bg-surface p-8">
              <h2 className="mb-6 font-kalam text-2xl font-bold text-foreground">Genres & Tags</h2>
              <div className="flex flex-wrap gap-3">
                {game.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-surface-tint px-4 py-2 font-patrick text-base text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mb-12"
          >
            <h2 className="mb-6 font-kalam text-2xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
            <div className="flex flex-col gap-3">
              {game.faq.map((item, index) => (
                <details key={index} className="hand-drawn-card group bg-surface p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-patrick text-lg font-bold text-foreground transition-colors hover:text-accent">
                    <span>{item.question}</span>
                    <span
                      className="flex-shrink-0 text-accent transition-transform duration-200 group-open:rotate-45"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 font-patrick text-base leading-relaxed text-foreground">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <a
              href={game.googlePlayUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Get ${game.title} on Google Play`}
              className="hand-drawn-button inline-flex items-center gap-2 bg-surface px-8 py-3 font-patrick text-lg no-underline text-foreground"
            >
              <ExternalLink size={18} />
              Get on Google Play
            </a>
            <Link
              to="/games"
              className="link-accent inline-flex items-center gap-2 font-patrick text-lg"
            >
              <ArrowLeft size={18} />
              Back to Games
            </Link>
          </m.div>
        </div>
      </section>
    </article>
  );
};

export default GameDetail;
