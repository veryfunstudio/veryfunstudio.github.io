"use client";

import { useState } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS, BRAND } from "@/lib/constants";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isItemActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

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

        <nav className="hidden gap-8 md:flex" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = isItemActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                aria-current={isActive ? "page" : undefined}
                className={`relative py-2 font-sans text-sm font-medium uppercase tracking-wide transition-opacity duration-150 ${
                  isActive
                    ? "text-foreground"
                    : "text-foreground/50 hover:text-foreground"
                }`}
              >
                {item.label}
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
            className="site-header__menu border-t border-border-soft bg-background md:hidden"
            aria-label="Mobile navigation"
          >
            <div className="mx-auto flex max-w-[80rem] flex-col gap-1 px-6 py-4">
              {NAV_ITEMS.map((item) => {
                const isActive = isItemActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex min-h-[44px] items-center rounded-lg px-3 font-sans text-base uppercase ${
                      isActive
                        ? "bg-surface text-foreground"
                        : "text-muted"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
