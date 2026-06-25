import { m } from "framer-motion";
import { Link } from "react-router";
import { formatDate } from "@/lib/utils";
import { BLOG_POSTS } from "@/data/blog";
import { Seo } from "@/components/seo/Seo";

const Blog = () => {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <div>
      <Seo
        title="Blog - Game Dev Insights"
        description="Notes on mobile game design, Unity development, and indie studio life from the team behind Tile Journey, Arrow Out, and the rest of the VeryFun Company lineup."
        path="/blog"
      />
      <section className="py-20">
        <div className="mx-auto max-w-[80rem] px-6">
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <p className="mb-3 font-patrick text-sm font-bold uppercase tracking-wide text-accent">
              Field notes
            </p>
            <h1 className="mb-4 font-kalam text-4xl font-bold text-foreground sm:text-5xl">
              Our Blog
            </h1>
            <p className="max-w-2xl font-patrick text-xl text-foreground">
              Sharing experiences, tips, and insights from game development
            </p>
          </m.div>

          {/* Featured post hero */}
          {featured && (
            <m.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="hand-drawn-card mb-16 grid overflow-hidden bg-surface md:grid-cols-2"
            >
              <div className="overflow-hidden">
                <img
                  src={featured.image}
                  alt={`Featured image for blog post: ${featured.title}`}
                  width={1024}
                  height={768}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="h-64 w-full object-cover sm:h-full"
                />
              </div>
              <div className="flex flex-col justify-center p-8">
                <div className="mb-4 flex items-center gap-3">
                  <span className="rounded-full bg-accent-soft px-3 py-1 font-patrick text-xs font-bold text-accent">
                    Featured
                  </span>
                  <span className="rounded-full bg-surface-tint px-3 py-1 font-patrick text-sm text-foreground">
                    {featured.category}
                  </span>
                  <time dateTime={featured.date} className="font-patrick text-sm text-muted">
                    {formatDate(featured.date)}
                  </time>
                </div>
                <h2 className="mb-4 font-kalam text-3xl font-bold leading-tight text-foreground">
                  {featured.title}
                </h2>
                <p className="mb-6 font-patrick text-lg leading-relaxed text-foreground">
                  {featured.excerpt}
                </p>
                <Link
                  to={`/blog/${featured.id}`}
                  className="hand-drawn-button inline-block w-fit bg-surface px-6 py-2 font-patrick text-base no-underline text-foreground"
                >
                  Read Featured Post →
                </Link>
              </div>
            </m.article>
          )}

          {/* Remaining posts as a list */}
          {rest.length > 0 && (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
              {rest.map((post) => (
                <article
                  key={post.id}
                  className="hand-drawn-card overflow-hidden bg-surface relative"
                >
                  <img
                    src={post.image}
                    alt={`Featured image for blog post: ${post.title}`}
                    width={1024}
                    height={768}
                    loading="lazy"
                    decoding="async"
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="rounded-full bg-surface-tint px-3 py-1 font-patrick text-sm text-foreground">
                        {post.category}
                      </span>
                      <time dateTime={post.date} className="font-patrick text-sm text-foreground">
                        {formatDate(post.date)}
                      </time>
                    </div>
                    <h2 className="mb-3 font-kalam text-xl font-bold text-foreground">
                      {post.title}
                    </h2>
                    <p className="mb-4 font-patrick leading-relaxed text-foreground">
                      {post.excerpt}
                    </p>
                    <Link to={`/blog/${post.id}`} className="link-accent font-patrick text-base">
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
