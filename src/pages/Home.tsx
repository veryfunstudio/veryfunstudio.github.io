import { Hero, Features, CtaFooter } from "@/components/home";
import { Seo } from "@/components/seo/Seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { PROJECTS } from "@/data/projects";
import { SITE_URL } from "@/lib/constants";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "VeryFun Company",
  url: SITE_URL,
  logo: `${SITE_URL}/images/about.jpeg`,
  description:
    "Independent mobile game studio publishing calming, free-to-play puzzle games on Google Play.",
  sameAs: PROJECTS.map((p) => p.googlePlayUrl),
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "VeryFun Company",
  url: SITE_URL,
};

const Home = () => {
  return (
    <div>
      <Seo
        title="Indie Mobile Game Studio"
        description="VeryFun Company crafts calming, free-to-play mobile puzzle games on Google Play - Classic Sudoku 2026, Tile Journey, Word Search Block, Arrow Out, Pearl Coloring, and Bubble Shoot."
        path="/"
      />
      <JsonLd schema={organizationSchema} />
      <JsonLd schema={websiteSchema} />
      <Hero />
      <Features />
      <CtaFooter />
    </div>
  );
};

export default Home;
