"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useLocation } from "react-router";
import { NAV_ITEMS } from "@/lib/constants";

export default function ScrollSignal() {
  const { scrollYProgress } = useScroll();
  const location = useLocation();
  const activeItem =
    NAV_ITEMS.find((item) =>
      item.path === "/" ? location.pathname === "/" : location.pathname.startsWith(item.path),
    ) ?? NAV_ITEMS[0];
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.24,
  });

  return (
    <div className="scroll-signal" aria-hidden="true">
      <motion.div className="scroll-signal__top" style={{ scaleX: progress }} />
      <div className="scroll-signal__side">
        <span>{activeItem.label}</span>
        <div>
          <motion.i style={{ scaleY: progress }} />
        </div>
        <em>Scroll</em>
      </div>
    </div>
  );
}
