import type { RouteRecord } from "vite-react-ssg";
import App from "../App";
import Home from "../pages/Home";
import About from "../pages/About";
import Projects from "../pages/Projects";
import ProjectDetail from "../pages/ProjectDetail";
import Blog from "../pages/Blog";
import BlogPost from "../pages/BlogPost";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";
import { PROJECTS } from "../data/projects";
import { BLOG_POSTS } from "../data/blog";

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "projects", element: <Projects /> },
      {
        path: "projects/:slug",
        element: <ProjectDetail />,
        getStaticPaths: () => PROJECTS.map((p) => `/projects/${p.slug}`),
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
