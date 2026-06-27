"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLocation } from "react-router";
import { NAV_ITEMS } from "@/lib/constants";

export default function RouteVeil() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const activeItem =
    NAV_ITEMS.find((item) =>
      item.path === "/" ? location.pathname === "/" : location.pathname.startsWith(item.path),
    ) ?? NAV_ITEMS[0];

  if (reduceMotion) {
    return null;
  }

  return (
    <motion.div
      key={location.pathname}
      className="route-veil"
      aria-hidden="true"
      initial={{ opacity: 1, scaleX: 1 }}
      animate={{ opacity: 0, scaleX: 0 }}
      transition={{ duration: 0.74, ease: [0.16, 1, 0.3, 1] }}
    >
      <span>{activeItem.label}</span>
    </motion.div>
  );
}
