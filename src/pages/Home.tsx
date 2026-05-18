import HeroSectionNiceUI from "../components/magicpath/hero-call-to-action-section/HeroSectionNiceUI";
import FeaturesSection from "../components/magicpath/features-section-with-alternating-layout/FeaturesSection";
import CtaFooterSection from "../components/magicpath/cta-banner-multi-column-footer/CtaFooterSection";

const Home = () => {
  return (
    <div>
      <HeroSectionNiceUI />
      <FeaturesSection />
      <CtaFooterSection />
    </div>
  );
};

export default Home;
