import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { BLOG_POSTS } from "@/data/blog";
import { Seo } from "@/components/seo/Seo";

const Blog = () => {
  const sortedPosts = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));
  const latestPost = sortedPosts[0] ?? BLOG_POSTS[0];

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
            className="blog-featured"
            aria-label="Latest studio note"
          >
            <img
              src={latestPost.image}
              alt={`Featured image for ${latestPost.title}`}
              width={980}
              height={680}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <div>
              <div>
                <span>{latestPost.category}</span>
                <time dateTime={latestPost.date}>{formatDate(latestPost.date)}</time>
              </div>
              <h2>{latestPost.title}</h2>
              <p>{latestPost.excerpt}</p>
              <Link to={`/blog/${latestPost.id}`} className="pill-button pill-button--accent">
                Latest note
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.aside>
        )}
      </section>

      <section className="blog-index" aria-label="Studio notes index">
        <div className="blog-index__head">
          <div>
            <span className="status-text">Reading queue</span>
            <strong>{String(BLOG_POSTS.length).padStart(2, "0")} notes</strong>
          </div>
          <p>Short notes on puzzles, production, launches, and keeping mobile games calm.</p>
        </div>

        <div className="blog-index__list">
          {sortedPosts.map((post, index) => (
            <Link key={post.id} to={`/blog/${post.id}`} className="blog-index-card">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <strong>{post.title}</strong>
              <p>{post.excerpt}</p>
              <ArrowRight size={18} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Blog;
