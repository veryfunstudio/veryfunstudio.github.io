/**
 * Tailwind config — intentionally minimal.
 *
 * The source of truth for design tokens is src/index.css (@theme).
 * This file only carries what Tailwind v4 can't infer from @theme:
 * the font-family aliases and the 18px body base. See DESIGN.md for the
 * full token contract and the rationale for each value.
 *
 * Keep this file minimal: spacing, colors, shadows and motion tokens belong
 * to @theme, and duplicating them here makes the two sources drift. Any new
 * key must be justified in DESIGN.md in the same change.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Avenir Next", "Trebuchet MS", "system-ui", "sans-serif"],
        display: ["Fredoka", "Inter", "system-ui", "sans-serif"],
        mono: ["DM Mono", "SFMono-Regular", "Cascadia Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        base: ["17px", { lineHeight: "1.65" }],
      },
    },
  },
  plugins: [],
};
