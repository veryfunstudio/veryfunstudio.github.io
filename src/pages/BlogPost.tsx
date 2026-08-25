import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import EntityNotFound from "@/components/common/EntityNotFound";
import { JsonLd } from "@/components/seo/JsonLd";
import { Seo } from "@/components/seo/Seo";
import {
  getBlogPath,
  getBlogPostByParam,
  getPostsByNewest,
  getRelatedGamesForPost,
} from "@/data/blog";
import { GAMES } from "@/data/games";
import { SITE_URL } from "@/lib/constants";
import { ORGANIZATION_REFERENCE } from "@/lib/schema";
import { formatDate } from "@/lib/utils";

/** Reused as both the BlogPosting author and publisher. */
const blogPublisher = ORGANIZATION_REFERENCE;

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const param = slug ?? "";
  const post = getBlogPostByParam(param);
  const isLegacyId = Boolean(post && param !== post.slug && /^\d+$/.test(param));

  // Client-side redirect for legacy /blog/:id (static HTML redirects also written at build).
  useEffect(() => {
    if (post && isLegacyId) {
      navigate(getBlogPath(post), { replace: true });
    }
  }, [post, isLegacyId, navigate]);

  if (!post) {
    return (
      <EntityNotFound
        title="Post not found"
        message="That note is not in the archive."
        path={`/blog/${param}`}
        backTo="/blog"
        backLabel="Back to blog"
      />
    );
  }

  if (isLegacyId) {
    return (
      <section className="error-stage px-[3.125vw] py-28 lg:py-36">
        <Seo title={post.title} description={post.excerpt} path={getBlogPath(post)} noindex />
        <p className="text-center text-muted">
          Redirecting to{" "}
          <Link to={getBlogPath(post)} className="underline underline-offset-2">
            {post.title}
          </Link>
          …
        </p>
      </section>
    );
  }

  const relatedPosts = getPostsByNewest()
    .filter((item) => item.id !== post.id)
    .slice(0, 2);
  const relatedGames = getRelatedGamesForPost(post, GAMES, 2);
  const hasFaq = post.faq.length > 0;
  const postPath = getBlogPath(post);

  return (
    <article className="article-detail site-page relative overflow-hidden px-[3.125vw] pt-28 pb-24 lg:pt-32">
      <Seo
        title={post.title}
        description={post.excerpt}
        path={postPath}
        image={post.image}
        imageWidth={1024}
        imageHeight={768}
        type="article"
        publishedTime={post.date}
      />
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          dateModified: post.date,
          image: `${SITE_URL}${post.image}`,
          url: `${SITE_URL}${postPath}`,
          author: blogPublisher,
          publisher: blogPublisher,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${SITE_URL}${postPath}`,
          },
        }}
      />
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
            {
              "@type": "ListItem",
              position: 3,
              name: post.title,
              item: `${SITE_URL}${postPath}`,
            },
          ],
        }}
      />
      {hasFaq && (
        <JsonLd
          schema={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: post.faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }}
        />
      )}

      <section className="article-masthead">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="article-hero"
        >
          <Link to="/blog" className="game-detail-back">
            <ArrowLeft size={16} />
            Blog
          </Link>
          <div>
            <span>{post.category}</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="article-image"
        >
          <img
            src={post.image}
            alt={`Featured image for ${post.title}`}
            width={1200}
            height={800}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </motion.div>
      </section>

      <section className="article-summary">
        <span className="section-kicker">At a glance</span>
        <h2>Key takeaways</h2>
        <ul>
          {post.summary.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="article-body">
        {post.sections.map((section) => (
          <div key={section.heading} className="article-section">
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ))}
      </section>

      {hasFaq && (
        <section className="article-faq">
          <div className="section-heading">
            <span className="section-kicker">Reader questions</span>
            <h2>FAQ</h2>
          </div>
          <div>
            {post.faq.map((item) => (
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
      )}

      {relatedGames.length > 0 && (
        <section className="related-strip" aria-label="Related games">
          <div className="related-strip__head">
            <span className="section-kicker">Related game</span>
            <h2>Play the idea.</h2>
            <p>Games connected to this note.</p>
          </div>
          <div className="related-strip__grid">
            {relatedGames.map((game) => {
              const full = GAMES.find((g) => g.slug === game.slug);
              if (!full) return null;
              return (
                <Link key={game.slug} to={`/games/${game.slug}`} className="related-card">
                  <div>
                    <strong>{full.title}</strong>
                    <span>{full.hook}</span>
                  </div>
                  <ArrowRight size={18} />
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <section className="article-next">
        <div className="article-next__intro">
          <span className="section-kicker">Continue reading</span>
          <h2>More notes.</h2>
          <Link to="/blog" className="pill-button">
            <ArrowLeft size={16} />
            All notes
          </Link>
        </div>

        <div className="article-related" aria-label="Related studio notes">
          {relatedPosts.map((item) => (
            <Link key={item.id} to={getBlogPath(item)} className="article-related-card">
              <div>
                <time dateTime={item.date}>{formatDate(item.date)}</time>
                <strong>{item.title}</strong>
                <p>{item.excerpt}</p>
              </div>
              <ArrowRight size={18} />
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
};

export default BlogPost;
