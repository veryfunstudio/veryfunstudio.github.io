import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import { Link } from "react-router";
import { Seo } from "@/components/seo/Seo";

interface EntityNotFoundProps {
  title: string;
  message: string;
  backTo: string;
  backLabel: string;
  secondaryTo?: string;
  secondaryLabel?: string;
}

const EntityNotFound = ({
  title,
  message,
  backTo,
  backLabel,
  secondaryTo,
  secondaryLabel,
}: EntityNotFoundProps) => {
  return (
    <section className="error-stage px-[3.125vw] py-28 lg:py-36">
      <Seo title={title} description={message} noindex />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="error-panel"
      >
        <Compass size={54} strokeWidth={1.5} />
        <span className="status-text">404</span>
        <h1>{title}</h1>
        <p>{message}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to={backTo} className="pill-button pill-button--accent">
            {backLabel}
          </Link>
          {secondaryTo && secondaryLabel && (
            <Link to={secondaryTo} className="pill-button">
              {secondaryLabel}
            </Link>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default EntityNotFound;
