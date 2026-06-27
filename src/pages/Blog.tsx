import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight, BookOpen, Gamepad2, Layers3 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { BLOG_POSTS } from "@/data/blog";
import { GAMES } from "@/data/games";
import { Seo } from "@/components/seo/Seo";

const Blog = () => {
  const featured = BLOG_POSTS[0];
  const [activeId, setActiveId] = useState(featured?.id ?? BLOG_POSTS[0]?.id ?? 1);
  const activePost = BLOG_POSTS.find((post) => post.id === activeId) ?? featured ?? BLOG_POSTS[0];
  const latestPost =
    [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date))[0] ?? activePost ?? featured;
  const categories = [...new Set(BLOG_POSTS.map((post) => post.category))];
  const linkedGames = GAMES.slice(0, 3);

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

        {latestPost && (
          <motion.aside
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="blog-signal-panel"
            aria-label="Studio notes signal summary"
          >
            <div className="blog-signal-panel__header">
              <span className="status-text">Notes signal</span>
              <strong>{String(BLOG_POSTS.length).padStart(2, "0")}</strong>
            </div>

            <div className="blog-signal-panel__matrix">
              <div>
                <BookOpen size={22} />
                <span>Queue</span>
                <strong>{BLOG_POSTS.length} field notes</strong>
              </div>
              <div>
                <Layers3 size={22} />
                <span>Themes</span>
                <strong>{categories.length} lanes</strong>
              </div>
              <div>
                <Gamepad2 size={22} />
                <span>Catalog</span>
                <strong>{GAMES.length} games</strong>
              </div>
            </div>

            <div className="blog-signal-panel__feature">
              <div>
                <span>{latestPost.category}</span>
                <time dateTime={latestPost.date}>{formatDate(latestPost.date)}</time>
              </div>
              <strong className="blog-signal-panel__feature-title">{latestPost.title}</strong>
              <p>{latestPost.excerpt}</p>
              <Link to={`/blog/${latestPost.id}`} className="pill-button pill-button--accent">
                Latest note
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="blog-signal-panel__games" aria-label="Games referenced by the notes">
              {linkedGames.map((game) => (
                <Link key={game.slug} to={`/games/${game.slug}`}>
                  <img src={game.icon} alt="" width={44} height={44} loading="eager" />
                  <span>{game.title}</span>
                </Link>
              ))}
            </div>
          </motion.aside>
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
