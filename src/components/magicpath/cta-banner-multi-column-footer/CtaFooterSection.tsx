import { m } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CtaFooterSection = () => {
  return (
    <section className="mx-auto max-w-[80rem] px-6 py-24 lg:py-32">
      <m.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="border-t border-black/10 pt-16"
      >
        <p className="font-patrick text-base text-muted">Like what you see?</p>
        <h2 className="mt-3 max-w-2xl font-kalam text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
          All six games are free on Google Play.
        </h2>
        <div className="mt-8">
          <Link
            to="/projects"
            className="hand-drawn-button inline-flex items-center gap-2 bg-foreground px-6 py-3 font-patrick text-lg text-background no-underline"
          >
            Browse the lineup
            <ArrowRight size={18} />
          </Link>
        </div>
      </m.div>
    </section>
  );
};

export default CtaFooterSection;
