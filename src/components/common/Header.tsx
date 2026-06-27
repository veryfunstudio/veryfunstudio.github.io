"use client";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, Menu, X } from "lucide-react";
import { NAV_ITEMS, BRAND } from "@/lib/constants";
import { GAMES } from "@/data/games";

const latestGame =
  [...GAMES].sort((a, b) => b.releaseDate.localeCompare(a.releaseDate))[0] ?? GAMES[0];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isItemActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className="site-header fixed top-0 left-0 right-0 z-50">
      <div className="site-header__bar mx-auto flex h-16 max-w-[80rem] items-center justify-between px-[3.125vw]">
        <Link
          to="/"
          className="site-header__brand flex min-h-[44px] items-center gap-3 font-sans text-xl font-medium tracking-tight text-foreground no-underline uppercase"
        >
          <img
            src="/favicon.png"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 shrink-0 rounded-[6px]"
            decoding="async"
          />
          {BRAND.name}
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
          className="flex min-h-[44px] min-w-[44px] items-center justify-center text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.nav
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
                      className={`site-header__mobile-link flex min-h-[58px] items-center rounded-lg px-4 font-sans text-lg uppercase ${
                        isActive ? "bg-surface text-foreground" : "text-muted"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              {latestGame && (
                <div className="site-header__mobile-footer">
                  <div className="site-header__mobile-panel">
                    <div>
                      <span>Latest release</span>
                      <strong>{latestGame.title}</strong>
                      <em>{latestGame.releaseDate}</em>
                    </div>
                    <img
                      src={latestGame.icon}
                      alt=""
                      width={72}
                      height={72}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="site-header__mobile-actions">
                    <a
                      href={latestGame.googlePlayUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setMobileOpen(false)}
                    >
                      <Download size={15} />
                      Google Play
                    </a>
                    <Link to="/games" onClick={() => setMobileOpen(false)}>
                      Catalog
                      <ArrowRight size={15} />
                    </Link>
                  </div>

                  <div className="site-header__mobile-status" aria-hidden="true">
                    <span>{String(GAMES.length).padStart(2, "0")} games</span>
                    <span>No timers</span>
                  </div>
                </div>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
