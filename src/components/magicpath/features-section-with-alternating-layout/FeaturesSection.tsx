import { m, type Variants } from "framer-motion";
import { BookText, Check, Circle, Grid3x3, LayoutGrid, MoveRight, Palette } from "lucide-react";
import { PROJECTS, type Project } from "../../../data/projects";
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

const GAME_ICONS: LucideIcon[] = [Grid3x3, LayoutGrid, BookText, MoveRight, Palette, Circle];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, duration: 0.6 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const FeaturesSection = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-[80rem] px-6">
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-16 lg:space-y-24"
        >
          <m.div variants={itemVariants} className="text-center">
            <span className="hand-drawn-card inline-block px-4 py-1 font-kalam text-sm font-bold text-foreground">
              Our Games
            </span>
            <h2 className="mt-6 font-kalam text-4xl font-bold text-foreground lg:text-5xl">
              Puzzles for Every Mood
            </h2>
            <p className="mx-auto mt-4 max-w-3xl font-patrick text-xl leading-relaxed text-foreground">
              From quick logic grids to dreamy 3D tile-matching, our free mobile puzzle games are
              crafted to respect your time. No paywalls, no timers — just a calm challenge whenever
              you want one.
            </p>
          </m.div>

          {PROJECTS.map((project: Project, index: number) => {
            const Icon = GAME_ICONS[index % GAME_ICONS.length];
            const isReversed = index % 2 === 1;

            return (
              <m.div
                key={project.id}
                variants={itemVariants}
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
              >
                <div className={`space-y-6 ${isReversed ? "lg:order-last" : ""}`}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-wobbly border-2 border-border bg-post-it">
                    <Icon size={24} strokeWidth={2.4} className="text-foreground" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-kalam text-3xl font-bold text-foreground">
                      {project.title}
                    </h3>
                    <p className="font-patrick text-lg leading-relaxed text-foreground">
                      {project.description}
                    </p>
                    <ul className="space-y-3">
                      {project.features.slice(0, 3).map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-secondary-accent" />
                          <span className="font-patrick text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to={`/projects/${project.slug}`}
                      className="hand-drawn-button inline-block bg-white px-6 py-2 font-patrick text-base text-foreground no-underline"
                    >
                      Explore {project.title}
                    </Link>
                  </m.div>
                </div>

                <div className={isReversed ? "lg:order-first" : ""}>
                  <figure
                    className={`hand-drawn-card jiggle relative overflow-hidden bg-white ${
                      project.rotation > 0 ? "rotate-1" : "-rotate-1"
                    }`}
                  >
                    <div className="tape" aria-hidden="true" />
                    <div className="bg-gradient-to-br from-post-it to-muted p-4">
                      <img
                        src={project.image}
                        alt={`${project.title} key art`}
                        width={1200}
                        height={630}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[1200/630] w-full object-contain"
                      />
                    </div>
                  </figure>
                </div>
              </m.div>
            );
          })}
        </m.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
