import { motion } from "framer-motion";
import { Link } from "react-router";
import { Seo } from "@/components/seo/Seo";
import { MOTION_PANEL } from "@/lib/reveal";

const NotFound = () => {
  return (
    <section className="error-stage px-[3.125vw] py-28 lg:py-36">
      <Seo
        title="Page Not Found (404)"
        description="The page you're looking for doesn't exist on VeryFun Studio."
        noindex
      />
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: MOTION_PANEL.duration, ease: MOTION_PANEL.ease }}
        className="error-panel"
      >
        <svg
          className="error-art"
          viewBox="0 0 160 120"
          role="img"
          aria-label="A miniature empty browser window"
        >
          <rect className="ea-win" x="14" y="14" width="132" height="92" rx="8" />
          <path className="ea-bar" d="M14 32h132" />
          <circle cx="26" cy="23" r="2.2" />
          <circle cx="34" cy="23" r="2.2" />
          <circle cx="42" cy="23" r="2.2" />
          <rect className="ea-row" x="26" y="46" width="62" height="6" rx="3" />
          <rect className="ea-row" x="26" y="60" width="84" height="6" rx="3" />
          <path className="ea-path" d="M48 82h22M88 82h18" />
          <circle className="ea-dot" cx="80" cy="82" r="3" />
          <circle className="ea-dot" cx="112" cy="82" r="3" />
        </svg>
        <span className="status-text">404</span>
        <h1>This route is off the board.</h1>
        <p>The page you are looking for is not part of the current VeryFun catalog.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/" className="pill-button">
            Home
          </Link>
          <Link to="/games" className="pill-button pill-button--accent">
            Browse games
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default NotFound;
