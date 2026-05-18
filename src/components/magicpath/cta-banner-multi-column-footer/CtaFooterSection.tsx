import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Gamepad2 } from "lucide-react";

const CtaFooterSection = () => {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-kalam text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Ready to Play?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-patrick text-xl text-foreground">
            Explore our collection of indie games and join our community of players who love
            creativity and fun.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/projects"
                className="hand-drawn-button inline-flex items-center gap-2 bg-accent px-6 py-3 font-patrick text-lg text-white no-underline"
              >
                <Gamepad2 size={20} />
                Explore Games
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact"
                className="hand-drawn-button inline-flex items-center gap-2 bg-white px-6 py-3 font-patrick text-lg text-foreground no-underline"
              >
                <Mail size={20} />
                Get in Touch
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaFooterSection;
