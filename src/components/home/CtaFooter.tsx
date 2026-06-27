import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight, Download } from "lucide-react";

const CtaFooterSection = () => {
  return (
    <section className="mx-auto max-w-[80rem] px-6 py-24 lg:py-32">
      <div className="dash-line mb-16" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="grid gap-12 lg:grid-cols-2 lg:items-end"
      >
        <div>
          <p className="font-sans text-sm font-medium uppercase tracking-widest text-muted">
            Ready to play?
          </p>
          <h2 className="mt-4 font-sans text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
            All six games are free on Google Play.
          </h2>
        </div>

        <div className="flex flex-col gap-4 lg:items-end">
          <p className="max-w-[40ch] font-sans text-base leading-relaxed text-muted lg:text-right">
            No ads, no in-app purchases, no subscriptions. Just download and play.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/games"
              className="pill-button pill-button--accent"
            >
              Browse the lineup
              <ArrowRight size={16} />
            </Link>
            <a
              href="https://play.google.com/store/apps/developer?id=songxugang"
              target="_blank"
              rel="noopener noreferrer"
              className="pill-button"
            >
              <Download size={16} />
              Google Play
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CtaFooterSection;
