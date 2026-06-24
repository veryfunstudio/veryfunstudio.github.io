import { m } from "framer-motion";
import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import { Seo } from "@/components/seo/Seo";

const NotFound = () => {
  return (
    <section className="py-20">
      <Seo
        title="Page Not Found (404)"
        description="The page you're looking for doesn't exist on VeryFun Company."
        noindex
      />
      <div className="mx-auto max-w-[80rem] px-6 text-center">
        <m.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="mb-6 font-kalam text-8xl font-bold text-accent sm:text-9xl">404</h1>
          <p className="mb-3 font-patrick text-3xl text-foreground">Oops! Page not found</p>
          <p className="mx-auto mb-10 max-w-lg font-patrick text-xl leading-relaxed text-muted">
            The page you&apos;re looking for seems to have wandered off into another dimension...
          </p>
          <div className="mb-10 flex justify-center text-muted" aria-hidden="true">
            <Compass size={64} strokeWidth={1.5} />
          </div>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/"
              className="hand-drawn-button inline-block bg-surface px-10 py-4 font-patrick text-xl no-underline text-foreground"
            >
              ← Back Home
            </Link>
            <Link
              to="/games"
              className="hand-drawn-button inline-block bg-foreground px-10 py-4 font-patrick text-xl no-underline text-background"
            >
              Browse our games
            </Link>
          </div>
        </m.div>
      </div>
    </section>
  );
};

export default NotFound;
