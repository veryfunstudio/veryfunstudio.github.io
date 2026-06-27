"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollSignal() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.24,
  });

  return (
    <div className="scroll-signal" aria-hidden="true">
      <motion.div className="scroll-signal__top" style={{ scaleX: progress }} />
    </div>
  );
}
