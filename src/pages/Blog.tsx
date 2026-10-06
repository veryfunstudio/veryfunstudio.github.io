import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { NoteCard } from "@/components/common/NoteCard";
import { PageIntro } from "@/components/common/PageIntro";
import { StudioCTA } from "@/components/common/StudioCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { Seo } from "@/components/seo/Seo";
import { getBlogPath, getPostsByNewest } from "@/data/blog";
import { SITE_URL } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

export default function Blog() {
  const [featured, ...posts] = getPostsByNewest();
  return (
    <div className="studio-page">
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
          blogPost: [featured, ...posts].map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            datePublished: post.date,
            url: `${SITE_URL}${getBlogPath(post)}`,
          })),
        }}
      />
      <PageIntro
        eyebrow="02 / Studio notes"
        title="Behind"
        accent="the board."
        description="Thoughts on clear rules, quiet moments, and the small decisions that make a puzzle feel good."
        meta={`${String(posts.length + 1).padStart(2, "0")} notes / From the studio`}
      />
      <section className="studio-shell journal-feature" aria-label="Latest studio note">
        <Link
          to={getBlogPath(featured)}
          className="journal-feature__image"
          aria-label={`Read ${featured.title}`}
        >
          <img src={featured.image} alt="" width={1200} height={630} fetchPriority="high" />
        </Link>
        <div className="journal-feature__copy">
          <p className="studio-kicker">Latest note / {featured.category}</p>
          <h2>
            <Link to={getBlogPath(featured)}>{featured.title}</Link>
          </h2>
          <p>{featured.excerpt}</p>
          <div>
            <time dateTime={featured.date}>{formatDate(featured.date)}</time>
            <Link to={getBlogPath(featured)} className="studio-text-link">
              Read the note <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="studio-shell journal-index" aria-label="Studio notes index">
        <div className="studio-section-heading">
          <div>
            <p className="studio-kicker">The archive</p>
            <h2>
              More from <em>the studio.</em>
            </h2>
          </div>
          <span className="studio-kicker">{String(posts.length).padStart(2, "0")} stories</span>
        </div>
        <div className="journal-grid">
          {posts.map((post) => (
            <NoteCard key={post.id} post={post} />
          ))}
        </div>
      </section>
      <StudioCTA
        title="Read the note. Open the board."
        description="The ideas behind our games make more sense with a puzzle in your hands."
        to="/games"
        label="Explore the games"
      />
    </div>
  );
}
