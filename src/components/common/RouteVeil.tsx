"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocation } from "react-router";
import { NAV_ITEMS } from "@/lib/constants";

export default function RouteVeil() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const lastPathRef = useRef(location.pathname);
  const didHydrateRef = useRef(false);
  const [visiblePath, setVisiblePath] = useState<string | null>(null);
  const activeItem =
    NAV_ITEMS.find((item) =>
      item.path === "/"
        ? (visiblePath ?? location.pathname) === "/"
        : (visiblePath ?? location.pathname).startsWith(item.path),
    ) ?? NAV_ITEMS[0];

  useEffect(() => {
    if (!didHydrateRef.current) {
      didHydrateRef.current = true;
      lastPathRef.current = location.pathname;
      return;
    }

    if (lastPathRef.current !== location.pathname) {
      lastPathRef.current = location.pathname;
      setVisiblePath(location.pathname);
    }
  }, [location.pathname]);

  if (reduceMotion || !visiblePath) {
    return null;
  }

  return (
    <motion.div
      key={visiblePath}
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
