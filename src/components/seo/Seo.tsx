import { Helmet } from "react-helmet-async";

import { SITE_URL } from "@/lib/constants";
const SITE_NAME = "VeryFun Company";
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/about.jpeg`;

interface SeoProps {
  title: string;
  description: string;
  /** Path beginning with `/`, e.g. `/projects/classic-sudoku`. Defaults to `/`. */
  path?: string;
  /** Absolute URL or path-relative. Falls back to the default site image. */
  image?: string;
  /** og:type. `website` for most pages, `article` for blog posts. */
  type?: "website" | "article";
  /** For articles: ISO date string. */
  publishedTime?: string;
  /** Prevent indexing of this page. */
  noindex?: boolean;
}

/**
 * Per-page SEO head tags. Renders into react-helmet-async which
 * vite-react-ssg hoists into the static HTML at build time.
 */
export function Seo({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  type = "website",
  publishedTime,
  noindex = false,
}: SeoProps) {
  const url = `${SITE_URL}${path}`;
  const absoluteImage = encodeURI(image.startsWith("http") ? image : `${SITE_URL}${image}`);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:url" content={url} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
    </Helmet>
  );
}
