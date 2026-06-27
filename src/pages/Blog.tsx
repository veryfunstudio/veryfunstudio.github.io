import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { BLOG_POSTS } from "@/data/blog";
import { Seo } from "@/components/seo/Seo";

const Blog = () => {
  const featured = BLOG_POSTS[0];
  const [activeId, setActiveId] = useState(featured?.id ?? BLOG_POSTS[0]?.id ?? 1);
  const activePost = BLOG_POSTS.find((post) => post.id === activeId) ?? featured ?? BLOG_POSTS[0];

  return (
    <div className="site-page relative overflow-hidden px-[3.125vw] pt-28 pb-24 lg:pt-32">
      <Seo
        title="Blog - Game Dev Insights"
        description="Notes on mobile game design, Unity development, and indie studio life from the team behind Tile Journey, Arrow Out, and the rest of the VeryFun Company lineup."
        path="/blog"
      />

      <section className="blog-hero">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="blog-hero-copy"
        >
          <span className="page-kicker">Studio notes</span>
          <h1>How we think about small games.</h1>
          <p>
            Notes on mobile puzzle design, Unity production, launch discipline, and the tradeoffs
            behind a tiny independent catalog.
          </p>
        </motion.div>

        {featured && (
          <motion.article
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="blog-featured"
          >
            <img
              src={featured.image}
              alt={`Featured image for ${featured.title}`}
              width={1024}
              height={768}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <div>
              <span>{featured.category}</span>
              <time dateTime={featured.date}>{formatDate(featured.date)}</time>
              <h2>{featured.title}</h2>
              <p>{featured.excerpt}</p>
              <Link to={`/blog/${featured.id}`} className="pill-button pill-button--accent">
                Read article
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.article>
        )}
      </section>

      <section className="blog-console" aria-label="Article reading console">
        <div className="blog-console__rail">
          <div>
            <span className="status-text">Reading queue</span>
            <strong>{String(BLOG_POSTS.length).padStart(2, "0")} notes</strong>
          </div>

          <div className="blog-console__list">
            {BLOG_POSTS.map((post, index) => {
              const isActive = post.id === activePost.id;

              return (
                <button
                  key={post.id}
                  type="button"
                  className={isActive ? "is-active" : ""}
                  onClick={() => setActiveId(post.id)}
                  onFocus={() => setActiveId(post.id)}
                  onMouseEnter={() => setActiveId(post.id)}
                  aria-pressed={isActive}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{post.category}</strong>
                  <em>{formatDate(post.date)}</em>
                </button>
              );
            })}
          </div>
        </div>

        <motion.article
          key={activePost.id}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          className="blog-console__preview"
        >
          <div className="blog-console__image">
            <img
              src={activePost.image}
              alt={`Featured image for ${activePost.title}`}
              width={980}
              height={680}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="blog-console__copy">
            <div>
              <span>{activePost.category}</span>
              <time dateTime={activePost.date}>{formatDate(activePost.date)}</time>
            </div>
            <h2>{activePost.title}</h2>
            <p>{activePost.excerpt}</p>
            <Link to={`/blog/${activePost.id}`} className="pill-button pill-button--accent">
              Open note
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.article>
      </section>
    </div>
  );
};

export default Blog;
