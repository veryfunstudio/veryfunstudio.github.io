import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import NotFound from "@/pages/NotFound";
import type { Route } from "./+types/root";
import "@/index.css";

const ROUTED_STATIC_PATHS = new Set(["/", "/about", "/games", "/blog", "/contact", "/legal"]);
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
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Caprasimo&family=Nunito:wght@400;500;600;700&display=swap",
  },
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
        <meta name="theme-color" content="#faf9f7" />
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
  let status = "Error";
  let details = "Something went wrong. Please try again.";

  if (isRouteErrorResponse(error)) {
    status = String(error.status);
    details = error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
  }

  return (
    <main className="error-stage px-[3.125vw] py-28 lg:py-36">
      <div className="error-panel">
        <span className="status-text">{status}</span>
        <h1>Something went wrong.</h1>
        <p>{details}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/" className="pill-button">
            Home
          </Link>
          <Link to="/games" className="pill-button pill-button--accent">
            Browse games
          </Link>
        </div>
      </div>
      {import.meta.env.DEV && error instanceof Error && error.stack && (
        <pre className="mx-auto mt-10 max-w-3xl overflow-x-auto rounded-xl border border-border-soft bg-surface p-4 text-xs text-muted">
          <code>{error.stack}</code>
        </pre>
      )}
    </main>
  );
}
