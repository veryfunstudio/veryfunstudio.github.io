import { useParams, Link } from "react-router-dom";
import { m } from "framer-motion";
import { getBlogPostById } from "@/data/blog";
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
        title="Post Not Found"
        message="This blog post seems to have wandered off..."
        backTo="/blog"
        backLabel="Back to Blog"
      />
    );
  }

  const seoTitle = post.title.length > 40 ? post.title.slice(0, 37) + "…" : post.title;

  return (
    <article>
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
      <section className="py-16">
        <div className="mx-auto max-w-[80rem] px-6">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-surface-tint px-4 py-1.5 font-patrick text-sm text-foreground">
                {post.category}
              </span>
              <time dateTime={post.date} className="font-patrick text-sm text-muted">
                {formatDate(post.date)}
              </time>
            </div>
            <h1 className="mb-6 font-kalam text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              {post.title}
            </h1>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <img
              src={post.image}
              alt={`Featured image for: ${post.title}`}
              width={1024}
              height={768}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="mb-12 h-auto w-full rounded-[4px] border-2 border-border-strong sm:h-[28rem] sm:object-cover"
            />
          </m.div>

          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto max-w-3xl"
          >
            {post.content.map((paragraph, index) => (
              <p
                key={index}
                className="mb-6 font-patrick text-lg leading-relaxed text-foreground last:mb-0"
              >
                {paragraph}
              </p>
            ))}
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-16 text-center"
          >
            <div className="hand-drawn-card inline-block bg-surface p-8">
              <Link to="/blog" className="link-accent font-patrick text-lg font-medium">
                ← Back to All Posts
              </Link>
            </div>
          </m.div>
        </div>
      </section>
    </article>
  );
};

export default BlogPost;
