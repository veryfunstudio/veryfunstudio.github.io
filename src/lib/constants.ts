/** Canonical site origin. Single source of truth: import from here, not from Seo.tsx or App.tsx. */
export const SITE_URL = "https://cookabc.github.io";
export const GOOGLE_PLAY_DEVELOPER_URL =
  "https://play.google.com/store/apps/developer?id=songxugang";

export const BRAND = {
  name: "VeryFun Company",
  tagline: "Creating a happier world through games",
  description:
    "VeryFun Company is an independent game studio dedicated to crafting games that bring joy to people.",
  social: {
    github: "https://github.com/cookabc",
    x: "https://x.com/chuangcius",
  },
} as const;

export const NAV_ITEMS = [
  { path: "/", label: "Home" },
  { path: "/games", label: "Games" },
  { path: "/blog", label: "Blog" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
] as const;
