import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { BLOG_POSTS } from "@/data/blog";
import { Seo } from "@/components/seo/Seo";

const Blog = () => {
  const [featured, ...rest] = BLOG_POSTS;

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

      {rest.length > 0 && (
        <section className="blog-index">
          {rest.map((post, index) => (
            <Link key={post.id} to={`/blog/${post.id}`} className="blog-index-card">
              <span>{String(index + 2).padStart(2, "0")}</span>
              <img
                src={post.image}
                alt={`Featured image for ${post.title}`}
                width={480}
                height={360}
                loading="lazy"
                decoding="async"
              />
              <div>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </section>
      )}
    </div>
  );
};

export default Blog;
