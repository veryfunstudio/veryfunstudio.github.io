import { motion } from "framer-motion";
import { Link } from "react-router";
import { Compass } from "lucide-react";
import { Seo } from "@/components/seo/Seo";

const NotFound = () => {
  return (
    <section className="error-stage px-[3.125vw] py-28 lg:py-36">
      <Seo
        title="Page Not Found (404)"
        description="The page you're looking for doesn't exist on VeryFun Company."
        noindex
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="error-panel"
      >
        <Compass size={54} strokeWidth={1.5} />
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
