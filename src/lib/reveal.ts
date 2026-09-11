export const REVEAL = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
} as const;

/**
 * Fade-only variant for elements whose CSS owns a hover transform (e.g.
 * tactile-card): motion's inline `transform: none` after the reveal would
 * override the hover lift.
 */
export const REVEAL_FADE = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
} as const;
