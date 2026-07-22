import { BRAND, SITE_URL } from "@/lib/constants";

const SITE_NAME = BRAND.name;
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/tile-journey.webp`;
const DEFAULT_OG_IMAGE_WIDTH = 1200;
const DEFAULT_OG_IMAGE_HEIGHT = 630;

interface SeoProps {
  title: string;
  description: string;
  /** Path beginning with `/`, e.g. `/games/nova-mahjong`. Defaults to `/`. */
  path?: string;
  /** Absolute URL or path-relative. Falls back to the default site image. */
  image?: string;
  /** Pixel width for the Open Graph image. */
  imageWidth?: number;
  /** Pixel height for the Open Graph image. */
  imageHeight?: number;
  /** og:type. `website` for most pages, `article` for blog posts. */
  type?: "website" | "article";
  /** For articles: ISO date string. */
  publishedTime?: string;
  /** Prevent indexing of this page. */
  noindex?: boolean;
}

/**
 * Per-page SEO head tags. Uses React 19's built-in `<meta>`, `<title>`,
 * and `<link>` elements which are automatically hoisted to `<head>`.
 */
export function Seo({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  imageWidth = DEFAULT_OG_IMAGE_WIDTH,
  imageHeight = DEFAULT_OG_IMAGE_HEIGHT,
  type = "website",
  publishedTime,
  noindex = false,
}: SeoProps) {
  const url = `${SITE_URL}${path}`;
  const absoluteImage = encodeURI(image.startsWith("http") ? image : `${SITE_URL}${image}`);
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} - ${SITE_NAME}`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {!noindex && <link rel="canonical" href={url} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:width" content={String(imageWidth)} />
      <meta property="og:image:height" content={String(imageHeight)} />
      <meta property="og:url" content={url} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={BRAND.social.xHandle} />
      <meta name="twitter:creator" content={BRAND.social.xHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
      <meta name="twitter:image:alt" content={fullTitle} />
    </>
  );
}
