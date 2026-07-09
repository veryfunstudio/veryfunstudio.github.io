import type { Config } from "@react-router/dev/config";
import { BLOG_POSTS } from "./src/data/blog";
import { GAMES } from "./src/data/games";

export default {
  ssr: false,
  prerender: async () => {
    return [
      "/",
      "/about",
      "/games",
      ...GAMES.map((g) => `/games/${g.slug}`),
      "/blog",
      ...BLOG_POSTS.map((p) => `/blog/${p.id}`),
      "/contact",
      "/legal",
    ];
  },
} satisfies Config;
