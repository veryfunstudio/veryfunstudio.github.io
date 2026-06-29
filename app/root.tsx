import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";
import type { Route } from "./+types/root";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import NotFound from "@/pages/NotFound";
import "@/index.css";

const ROUTED_STATIC_PATHS = new Set(["/", "/about", "/games", "/blog", "/contact"]);
const DETAIL_ROUTE_PATTERNS = [/^\/games\/[^/]+$/, /^\/blog\/[^/]+$/];

const normalizePathname = (pathname: string) => pathname.replace(/\/+$/, "") || "/";

const hasKnownRouteShape = (pathname: string) => {
  const normalizedPathname = normalizePathname(pathname);

  return (
    ROUTED_STATIC_PATHS.has(normalizedPathname) ||
    DETAIL_ROUTE_PATTERNS.some((pattern) => pattern.test(normalizedPathname))
  );
};

export const links: Route.LinksFunction = () => [
  { rel: "icon", type: "image/png", sizes: "512x512", href: "/favicon.png" },
  { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
  { rel: "shortcut icon", href: "/favicon.ico" },
  { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#07080d" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-[100dvh] flex-col bg-background text-foreground">
        <a href="#main-content" className="skip-link sr-only focus:not-sr-only">
          Skip to main content
        </a>
        <Header />
        <AnimatePresence mode="wait" initial={false}>
          <motion.main
            key={location.pathname}
            id="main-content"
            className="site-main flex-1"
            tabIndex={-1}
            initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {hasKnownRouteShape(location.pathname) ? <Outlet /> : <NotFound />}
          </motion.main>
        </AnimatePresence>
        <Footer />
      </div>
    </MotionConfig>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Error";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
