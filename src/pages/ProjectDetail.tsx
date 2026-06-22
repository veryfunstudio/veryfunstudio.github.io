import { useParams, Link } from "react-router-dom";
import { m } from "framer-motion";
import { getProjectBySlug } from "../data/projects";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { Seo } from "../components/seo/Seo";
import { JsonLd } from "../components/seo/JsonLd";
import { SITE_URL } from "../components/seo/Seo";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug ?? "");

  if (!project) {
    return (
      <section className="py-20">
        <div className="mx-auto max-w-[80rem] px-4 text-center">
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="mb-4 font-kalam text-6xl font-bold text-accent">404</h1>
            <p className="mb-2 font-patrick text-2xl text-foreground">Project Not Found</p>
            <p className="mb-8 font-patrick text-lg text-muted">
              This project seems to have wandered off into another dimension...
            </p>
            <Link
              to="/projects"
              className="hand-drawn-button inline-block bg-white px-8 py-3 font-patrick text-lg no-underline text-foreground"
            >
              ← Back to Projects
            </Link>
          </m.div>
        </div>
      </section>
    );
  }

  return (
    <article>
      <Seo
        title={`${project.title} - Free Mobile Puzzle Game`}
        description={project.description}
        path={`/projects/${project.slug}`}
        image={project.image}
        type="article"
      />
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: project.title,
          description: project.description,
          url: `${SITE_URL}/projects/${project.slug}`,
          image: `${SITE_URL}${project.image}`,
          applicationCategory: "GameApplication",
          operatingSystem: "Android",
          softwareVersion: "1.0",
          datePublished: project.releaseDate,
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          downloadUrl: project.googlePlayUrl,
          featureList: project.features,
        }}
      />
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: project.faq.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }}
      />
      <section className="py-16">
        <div className="mx-auto max-w-[80rem] px-4">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8 overflow-hidden rounded-[4px] border-2 border-border bg-gradient-to-br from-[#f6f1e8] to-muted outline outline-1 outline-black/10">
              <img
                src={project.image}
                alt={`${project.title} key art`}
                width={1200}
                height={630}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="mx-auto block aspect-[1200/630] w-full object-contain p-4 sm:p-8"
              />
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-10"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={project.icon}
                  alt={`${project.title} icon`}
                  width={80}
                  height={80}
                  loading="eager"
                  decoding="async"
                  className="h-16 w-16 flex-shrink-0 rounded-[4px] border-2 border-border bg-white object-cover  sm:h-20 sm:w-20"
                />
                <h1 className="font-kalam text-4xl font-bold text-foreground sm:text-5xl">
                  {project.title}
                </h1>
              </div>
              <time dateTime={project.releaseDate} className="font-patrick text-sm text-muted">
                Released {project.releaseDate}
              </time>
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mb-12 max-w-3xl"
          >
            <p className="font-patrick text-xl leading-relaxed text-foreground">
              {project.fullDescription}
            </p>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12 grid gap-8 lg:grid-cols-2"
          >
            <div className="hand-drawn-card relative bg-white p-8">
              <h2 className="mb-6 font-kalam text-2xl font-bold text-foreground">Key Features</h2>
              <ul className="space-y-4">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 font-patrick text-lg text-foreground"
                  >
                    <span className="mt-0.5 text-accent" aria-hidden="true">
                      ✦
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="hand-drawn-card relative bg-white p-8">
              <h2 className="mb-6 font-kalam text-2xl font-bold text-foreground">Tech Stack</h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-black/5 px-4 py-2 font-patrick text-base text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <a
              href={project.googlePlayUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Get ${project.title} on Google Play`}
              className="hand-drawn-button inline-flex items-center gap-2 bg-white px-8 py-3 font-patrick text-lg no-underline text-foreground"
            >
              <ExternalLink size={18} />
              Get on Google Play
            </a>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 font-patrick text-lg underline decoration-wavy decoration-accent decoration-2 text-accent"
            >
              <ArrowLeft size={18} />
              Back to Projects
            </Link>
          </m.div>
        </div>
      </section>
    </article>
  );
};

export default ProjectDetail;
