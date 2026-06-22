import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

const SITE_URL = "https://cookabc.github.io";
const DEFAULT_TITLE = "VeryFun Company — Indie Mobile Game Studio";
const DEFAULT_DESCRIPTION =
  "VeryFun Company is an independent studio publishing calming, free-to-play mobile puzzle games on Google Play, including Classic Sudoku 2026, Tile Journey, and Bubble Shoot.";
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/about.jpeg`;

function App() {
  return (
    <>
      <Helmet titleTemplate="%s — VeryFun Company">
        <html lang="en" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{DEFAULT_TITLE}</title>
        <meta name="description" content={DEFAULT_DESCRIPTION} />
        <link rel="canonical" href={`${SITE_URL}/`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="VeryFun Company" />
        <meta property="og:title" content={DEFAULT_TITLE} />
        <meta property="og:description" content={DEFAULT_DESCRIPTION} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:url" content={`${SITE_URL}/`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={DEFAULT_TITLE} />
        <meta name="twitter:description" content={DEFAULT_DESCRIPTION} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
      </Helmet>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">
          <div className="flex min-h-screen flex-col">
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-wobbly focus:border-2 focus:border-border focus:bg-white focus:px-4 focus:py-2 focus:font-patrick focus:text-foreground focus:shadow-hand-drawn focus:no-underline"
            >
              Skip to main content
            </a>
            <Header />
            <main id="main-content" className="flex-1" tabIndex={-1}>
              <Outlet />
            </main>
            <Footer />
          </div>
        </MotionConfig>
      </LazyMotion>
    </>
  );
}

export default App;
