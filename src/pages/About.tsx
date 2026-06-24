import { useMemo } from "react";
import { Link } from "react-router-dom";
import { m } from "framer-motion";
import { Seo } from "@/components/seo/Seo";

const TECH_STACK = [
  { name: "Unity", rotation: -0.5 },
  { name: "C#", rotation: 0.7 },
  { name: "Android SDK", rotation: -0.3 },
  { name: "JavaScript", rotation: 0.9 },
  { name: "TypeScript", rotation: -0.8 },
  { name: "React", rotation: 0.4 },
  { name: "Tailwind CSS", rotation: -0.6 },
  { name: "Vite", rotation: 0.2 },
] as const;

const VALUES = [
  {
    title: "Innovation",
    description:
      "Continuously exploring new game mechanics and technologies to create unique gaming experiences",
    rotation: 0.5,
  },
  {
    title: "Quality",
    description: "Focusing on game quality and details to provide the best experience for players",
    rotation: -0.7,
  },
  {
    title: "Joy",
    description:
      "The core of games is bringing joy to players-this is the principle we always adhere to",
    rotation: 0.3,
  },
] as const;

const About = () => {
  const techRotations = useMemo(() => TECH_STACK.map((t) => t.rotation), []);
  const valueRotations = useMemo(() => VALUES.map((v) => v.rotation), []);

  return (
    <div>
      <Seo
        title="About the Studio"
        description="Independent mobile game studio crafting calming, free-to-play puzzle games. Meet the team behind Tile Journey, Pearl Coloring, and more."
        path="/about"
      />
      <section className="py-20">
        <div className="mx-auto max-w-[80rem] px-6">
          <div className="grid items-stretch gap-12 md:grid-cols-2">
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src="/images/about.jpeg"
                alt="The VeryFun Company team working together on game development"
                width={864}
                height={864}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="h-full w-full rounded-[4px] border-2 border-border-strong object-cover"
              />
            </m.div>
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col justify-center rounded-[4px] border-2 border-border-strong bg-white p-8 relative"
            >
              <p className="mb-3 font-patrick text-sm font-bold uppercase tracking-wide text-accent">
                Indie studio
              </p>
              <h1 className="mb-4 font-kalam text-4xl font-bold text-foreground sm:text-5xl">
                About Us
              </h1>
              <p className="mb-6 font-patrick text-xl text-muted">
                An indie studio crafting calming mobile puzzle games for Google Play
              </p>
              <h2 className="mb-6 font-kalam text-2xl font-bold text-foreground">Our Story</h2>
              <p className="mb-4 font-patrick text-lg leading-relaxed text-foreground">
                VeryFun Company started as a shared dream between friends who grew up playing games
                and stayed up too late figuring out how they worked. We turned that obsession into
                years of professional game development, then took the leap to build something of our
                own.
              </p>
              <p className="mb-4 font-patrick text-lg leading-relaxed text-foreground">
                Today we ship calming, free-to-play mobile puzzle games on Google Play - titles like
                Classic Sudoku 2026, Tile Journey, Pearl Coloring, and the rest of our lineup. Every
                game is built on Unity and designed around one principle: respect the player's time.
                No paywalls blocking progress, no timers pressuring you, just puzzles that feel good
                to solve.
              </p>
              <p className="font-patrick text-lg leading-relaxed text-foreground">
                We focus on the casual puzzle space because that is where we can do our best work -
                small, polished experiences that fit into a coffee break or a long evening, equally
                at home on a commute or beside the couch. Six games in, and we are just getting
                started.
              </p>
            </m.div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-[80rem] px-6">
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-16 max-w-3xl text-center"
          >
            <h2 className="mb-2 font-kalam text-2xl font-bold text-foreground">Tech Stack</h2>
            <p className="font-patrick text-lg text-foreground">
              The main technologies and tools we use
            </p>
          </m.div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {TECH_STACK.map((tech, index) => (
              <m.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="hand-drawn-card flex items-center justify-center bg-white p-6 text-center"
                style={{ transform: `rotate(${techRotations[index]}deg)` }}
              >
                <h3 className="font-kalam text-lg font-bold text-foreground">{tech.name}</h3>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-[80rem] px-6">
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-16 max-w-3xl text-center"
          >
            <h2 className="mb-2 font-kalam text-2xl font-bold text-foreground">Our Values</h2>
            <p className="font-patrick text-lg text-foreground">
              Our understanding and beliefs about game development
            </p>
          </m.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((value, index) => (
              <m.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="hand-drawn-card relative bg-white p-8"
                style={{ transform: `rotate(${valueRotations[index]}deg)` }}
              >
                <h3 className="mb-4 font-kalam text-xl font-bold text-foreground">{value.title}</h3>
                <p className="font-patrick leading-relaxed text-foreground">{value.description}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-[80rem] px-6 text-center">
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 font-kalam text-3xl font-bold text-foreground">Ready to play?</h2>
            <p className="mx-auto mb-8 max-w-2xl font-patrick text-lg text-muted">
              All six of our games are free on Google Play. Pick one and see what we mean by
              "respect the player's time."
            </p>
            <Link
              to="/games"
              className="hand-drawn-button inline-block bg-foreground px-8 py-3 font-patrick text-lg text-background no-underline"
            >
              Explore the games
            </Link>
          </m.div>
        </div>
      </section>
    </div>
  );
};

export default About;
