import HeroSectionNiceUI from "../components/magicpath/hero-call-to-action-section/HeroSectionNiceUI";
import FeaturesSection from "../components/magicpath/features-section-with-alternating-layout/FeaturesSection";
import CtaFooterSection from "../components/magicpath/cta-banner-multi-column-footer/CtaFooterSection";
import { Seo } from "../components/seo/Seo";

const Home = () => {
  return (
    <div>
      <Seo
        title="Indie Mobile Game Studio"
        description="VeryFun Company crafts calming, free-to-play mobile puzzle games on Google Play — Classic Sudoku 2026, Tile Journey, Word Search Block, Arrow Out, Pearl Coloring, and Bubble Shoot."
        path="/"
      />
      <HeroSectionNiceUI />
      <FeaturesSection />
      <CtaFooterSection />
    </div>
  );
};

export default Home;
