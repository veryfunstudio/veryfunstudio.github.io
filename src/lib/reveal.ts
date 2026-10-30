/**
 * A short settle, 250ms, ease-out. Prerendered content starts visible.
 *
 * A scroll-triggered animation is decoration on a page that already has
 * real motion in it, so it does the least it can: opacity plus a short
 * travel. Everything shares one duration and one curve.
 */
export const REVEAL = {
  initial: { opacity: 1, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-24px" },
  transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
} as const;

/**
 * Fade-only variant for elements whose CSS owns a hover transform (e.g.
 * tactile-card): motion's inline `transform: none` after the reveal would
 * override the hover lift.
 */
export const REVEAL_FADE = {
  initial: { opacity: 1 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-24px" },
  transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
} as const;
