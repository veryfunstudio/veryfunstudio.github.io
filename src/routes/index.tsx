import type { RouteRecord } from "vite-react-ssg";
import App from "@/App";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Games from "@/pages/Games";
import GameDetail from "@/pages/GameDetail";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import { GAMES } from "@/data/games";
import { BLOG_POSTS } from "@/data/blog";

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "games", element: <Games /> },
      {
        path: "games/:slug",
        element: <GameDetail />,
        getStaticPaths: () => GAMES.map((p) => `/games/${p.slug}`),
      },
      { path: "blog", element: <Blog /> },
      {
        path: "blog/:id",
        element: <BlogPost />,
        getStaticPaths: () => BLOG_POSTS.map((p) => `/blog/${p.id}`),
      },
      { path: "contact", element: <Contact /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];
