/** 全站唯一的 framer 动效参数：与 index.css 的 --duration/--ease-out 同源。 */
export const MOTION = {
  duration: 0.25,
  ease: [0.16, 1, 0.3, 1],
} as const;

/** 面板/弹层这类大块入场稍慢一档，仍用同一条曲线，不新增 token。 */
export const MOTION_PANEL = {
  duration: 0.6,
  ease: MOTION.ease,
} as const;

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
  transition: { duration: MOTION.duration, ease: MOTION.ease },
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
  transition: { duration: MOTION.duration, ease: MOTION.ease },
} as const;
