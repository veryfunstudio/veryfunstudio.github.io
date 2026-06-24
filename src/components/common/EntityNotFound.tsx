import { Link } from "react-router-dom";
import { m } from "framer-motion";

interface EntityNotFoundProps {
  title: string;
  message: string;
  backTo: string;
  backLabel: string;
  secondaryTo?: string;
  secondaryLabel?: string;
}

/**
 * Inline 404 fallback for detail pages (e.g. /games/:slug, /blog/:id)
 * when the looked-up entity doesn't exist. Distinct from the top-level
 * NotFound page, which handles the catch-all "*" route.
 */
const EntityNotFound = ({
  title,
  message,
  backTo,
  backLabel,
  secondaryTo,
  secondaryLabel,
}: EntityNotFoundProps) => {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-[80rem] px-6 text-center">
        <m.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-4 font-kalam text-6xl font-bold text-accent">404</h1>
          <p className="mb-2 font-patrick text-2xl text-foreground">{title}</p>
          <p className="mb-8 font-patrick text-lg text-muted">{message}</p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to={backTo}
              className="hand-drawn-button inline-block bg-surface px-8 py-3 font-patrick text-lg no-underline text-foreground"
            >
              ← {backLabel}
            </Link>
            {secondaryTo && secondaryLabel && (
              <Link
                to={secondaryTo}
                className="hand-drawn-button inline-block bg-foreground px-8 py-3 font-patrick text-lg no-underline text-background"
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </m.div>
      </div>
    </section>
  );
};

export default EntityNotFound;
