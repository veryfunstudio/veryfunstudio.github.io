import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { BRAND, NAV_ITEMS } from "@/lib/constants";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isItemActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  return (
    <header className="site-header fixed top-0 left-0 right-0 z-50">
      <div className="site-header__bar mx-auto flex h-16 max-w-[80rem] items-center justify-between px-[3.125vw]">
        <Link
          to="/"
          className="site-header__brand flex min-h-[44px] items-baseline gap-2 text-foreground no-underline"
        >
          <span className="font-serif text-xl leading-none tracking-tight">{BRAND.name}</span>
          <span className="site-header__brand-tag hidden sm:inline font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
            Studio
          </span>
        </Link>

        <nav className="site-header__nav hidden md:flex" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = isItemActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                aria-current={isActive ? "page" : undefined}
                className={`site-header__nav-link ${isActive ? "is-active" : ""}`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="site-header-active"
                    className="site-header__nav-active"
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.nav
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="site-header__menu relative min-h-[calc(100dvh-4rem)] overflow-hidden border-t border-border-soft bg-background md:hidden"
            aria-label="Mobile navigation"
          >
            <div className="site-header__menu-inner">
              <div className="site-header__mobile-links">
                {NAV_ITEMS.map((item) => {
                  const isActive = isItemActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={`site-header__mobile-link flex min-h-[58px] items-center rounded-lg px-4 font-sans text-lg ${
                        isActive ? "bg-surface text-foreground" : "text-muted"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
