/**
 * Tailwind config — intentionally minimal.
 *
 * The source of truth for design tokens is src/index.css (@theme).
 * This file only carries what Tailwind v4 can't infer from @theme:
 * the font-family aliases and the 18px body base. See DESIGN.md for the
 * full token contract and the rationale for each value.
 *
 * Anything previously defined here (post-it, tape, wobbly, hand-drawn
 * shadows, jiggle, primary/secondary/destructive, chart.*) was removed
 * because it was either unused or conflicted with @theme. Do not
 * re-introduce those keys without updating DESIGN.md in the same change.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", "Avenir Next", "Trebuchet MS", "system-ui", "sans-serif"],
        mono: ["DM Mono", "SFMono-Regular", "Cascadia Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        base: ["18px", { lineHeight: "1.6" }],
      },
    },
  },
  plugins: [],
};
