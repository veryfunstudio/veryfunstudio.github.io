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
    <header className="border-b border-border-soft py-5">
      <div className="mx-auto flex max-w-[80rem] items-center justify-between px-6">
        <Link
          to="/"
          className="flex min-h-[44px] items-center gap-3 font-kalam text-2xl font-bold tracking-tight text-foreground no-underline"
        >
          <img
            src="/favicon.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-[8px]"
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
                className={`font-patrick text-base underline-offset-4 transition-colors ${
                  isActive ? "text-accent" : "text-muted hover:text-foreground hover:underline"
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
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-border-soft md:hidden"
            aria-label="Mobile navigation"
          >
            <div className="mx-auto flex max-w-[80rem] flex-col gap-4 px-6 py-4">
              {NAV_ITEMS.map((item) => {
                const isActive = isItemActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex min-h-[44px] items-center font-patrick text-base ${
                      isActive ? "text-accent" : "text-foreground"
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
