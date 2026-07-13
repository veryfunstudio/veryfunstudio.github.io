import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Seo } from "@/components/seo/Seo";
import { getNewestPost, getPostsByNewest } from "@/data/blog";
import { formatDate } from "@/lib/utils";

const Blog = () => {
  const sortedPosts = getPostsByNewest();
  const latestPost = getNewestPost();

  return (
    <div className="site-page relative overflow-hidden px-[3.125vw] pt-28 pb-24 lg:pt-32">
      <Seo
        title="Studio Notes"
        description="Short production notes from VeryFun Company on calm puzzle design, readable boards, mobile performance, and honest store pages."
        path="/blog"
      />

      <section className="blog-hero">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="blog-hero-copy"
        >
          <h1>How we think about small games.</h1>
          <p>
            Notes on calm puzzle design, readable boards, mobile performance, and the tradeoffs
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
            <strong>Notes worth opening.</strong>
          </div>
          <p>
            Practical notes on puzzle feel, board clarity, launch choices, and small-team tradeoffs.
          </p>
        </div>

        <div className="blog-index__list">
          {sortedPosts.map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`} className="blog-index-card">
              <span className="blog-index-card__media">
                <img
                  src={post.image}
                  alt=""
                  width={520}
                  height={340}
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className="blog-index-card__body">
                <span className="blog-index-card__meta">
                  <span>{post.category}</span>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </span>
                <strong>{post.title}</strong>
                <span>{post.excerpt}</span>
                <span className="blog-index-card__action">
                  Open note
                  <ArrowRight size={16} />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Blog;
