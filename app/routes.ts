import { index, type RouteConfig, route } from "@react-router/dev/routes";

export default [
  index("../src/pages/Home.tsx"),
  route("about", "../src/pages/About.tsx"),
  route("games", "../src/pages/Games.tsx"),
  route("games/:slug", "../src/pages/GameDetail.tsx"),
  route("blog", "../src/pages/Blog.tsx"),
  route("blog/:slug", "../src/pages/BlogPost.tsx"),
  route("contact", "../src/pages/Contact.tsx"),
  route("legal", "../src/pages/Legal.tsx"),
  route("*", "../src/pages/NotFound.tsx"),
] satisfies RouteConfig;
