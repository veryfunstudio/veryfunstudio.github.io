/** Canonical site origin. Single source of truth: import from here, not from Seo.tsx or App.tsx. */
export const SITE_URL = "https://veryfunstudio.github.io";
export const BRAND_ASSET_VERSION = "20260804-v2";
export const BRAND_LOGO_URL = `${SITE_URL}/favicon.png?v=${BRAND_ASSET_VERSION}`;
export const GOOGLE_PLAY_DEVELOPER_URL =
  "https://play.google.com/store/apps/developer?id=songxugang";
export const LEGAL_ENTITY_NAME = "VeryFun Studio";

export const BRAND = {
  name: "VeryFun Studio",
  tagline: "Quiet games. Bright logic.",
  description: "VeryFun Studio makes calm, tactile mobile puzzle games for spare attention.",
  email: "chuangcius@gmail.com",
  social: {
    github: "https://github.com/veryfunstudio",
    x: "https://x.com/veryfunstudio",
    xHandle: "@veryfunstudio",
  },
} as const;

export const NAV_ITEMS = [
  { path: "/", label: "Home" },
  { path: "/games", label: "Games" },
  { path: "/blog", label: "Blog" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
] as const;
