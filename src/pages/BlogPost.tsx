import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen, Gamepad2 } from "lucide-react";
import { BLOG_POSTS, getBlogPostById } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import { Seo } from "@/components/seo/Seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/constants";
import EntityNotFound from "@/components/common/EntityNotFound";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const post = getBlogPostById(Number(id));

  if (!post) {
    return (
      <EntityNotFound
        title="Post not found"
        message="That note is not in the archive."
        backTo="/blog"
        backLabel="Back to blog"
      />
    );
  }

  const seoTitle = post.title.length > 40 ? `${post.title.slice(0, 37)}...` : post.title;
  const relatedPosts = BLOG_POSTS.filter((item) => item.id !== post.id).slice(0, 2);
  const readingMinutes = Math.max(3, Math.ceil(post.content.join(" ").split(/\s+/).length / 180));

  return (
    <article className="site-page relative overflow-hidden px-[3.125vw] pt-28 pb-24 lg:pt-32">
      <Seo
        title={seoTitle}
        description={post.excerpt}
        path={`/blog/${post.id}`}
        image={post.image}
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
          url: `${SITE_URL}/blog/${post.id}`,
          author: {
            "@type": "Organization",
            name: "VeryFun Company",
            url: SITE_URL,
          },
          publisher: {
            "@type": "Organization",
            name: "VeryFun Company",
            url: SITE_URL,
            logo: {
              "@type": "ImageObject",
              url: `${SITE_URL}/images/about.jpeg`,
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${SITE_URL}/blog/${post.id}`,
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
              item: `${SITE_URL}/blog/${post.id}`,
            },
          ],
        }}
      />

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

      <section className="article-body">
        {post.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </section>

      <section className="article-console">
        <div className="article-console__summary">
          <div>
            <BookOpen size={22} />
            <span className="status-text">Field note complete</span>
          </div>
          <h2>Keep the studio signal moving.</h2>
          <p>
            {readingMinutes} minute read on {post.category.toLowerCase()}, written from the same
            constraints that shape the games: clarity, pace, and repeatable decisions.
          </p>
          <div className="article-console__actions">
            <Link to="/blog" className="pill-button">
              <ArrowLeft size={16} />
              Archive
            </Link>
            <Link to="/games" className="pill-button pill-button--accent">
              <Gamepad2 size={16} />
              Games
            </Link>
          </div>
        </div>

        <div className="article-related" aria-label="Related studio notes">
          {relatedPosts.map((item, index) => (
            <Link key={item.id} to={`/blog/${item.id}`} className="article-related-card">
              <span>{String(index + 1).padStart(2, "0")}</span>
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
