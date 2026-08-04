import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { JsonLd } from "@/components/seo/JsonLd";
import { Seo } from "@/components/seo/Seo";
import { getBlogPath, getPostsByNewest } from "@/data/blog";
import { SITE_URL } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

const Blog = () => {
  const sortedPosts = getPostsByNewest();

  return (
    <div className="workshop-page">
      <Seo
        title="Studio Notes"
        description="Short production notes from VeryFun Studio on calm puzzle design, readable boards, mobile performance, and honest store pages."
        path="/blog"
      />
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "VeryFun Studio Notes",
          url: `${SITE_URL}/blog`,
          blogPost: sortedPosts.map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            datePublished: post.date,
            url: `${SITE_URL}${getBlogPath(post)}`,
          })),
        }}
      />

      <section className="archive-hero">
        <div className="workshop-shell archive-hero__grid">
          <div>
            <p className="eyebrow">Archives</p>
            <h1>Studio Notes</h1>
            <p>
              Thoughts on craft, the joy of play, and building things that matter. Updated when the
              coffee is fresh.
            </p>
          </div>
          <div className="archive-count">
            <strong>{String(sortedPosts.length).padStart(2, "0")}</strong>
            <span>Published notes</span>
          </div>
        </div>
      </section>
      <section className="notes-index" aria-label="Studio notes index">
        <div className="workshop-shell">
          {sortedPosts.map((post, index) => (
            <Link key={post.id} to={getBlogPath(post)} className="note-row">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="note-row__number">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <strong>{post.title}</strong>
                <small>{post.category}</small>
              </div>
              <ArrowRight size={18} />
            </Link>
          ))}
        </div>
      </section>
      <section className="workshop-cta">
        <div className="workshop-shell">
          <div className="workshop-cta__panel tactile-card">
            <p className="eyebrow">From thought to play</p>
            <h2>Read the note. Open the board.</h2>
            <p>Every studio note connects back to a real product decision in our small catalog.</p>
            <Link to="/games" className="workshop-button workshop-button--accent">
              Browse games <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
