import type { Config } from "@react-router/dev/config";
import { GAMES } from "./src/data/games";
import { BLOG_POSTS } from "./src/data/blog";

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
    ];
  },
} satisfies Config;
