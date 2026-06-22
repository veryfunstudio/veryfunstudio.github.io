import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { m, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS, BRAND } from "../../lib/constants";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isItemActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <header className="border-b-2 border-border py-6">
      <div className="mx-auto flex max-w-[80rem] items-center justify-between px-4">
        <m.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="font-kalam text-3xl font-bold text-foreground no-underline">
            {BRAND.name}
          </Link>
        </m.div>

        <nav className="hidden gap-8 md:flex" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = isItemActive(item.path);
            return (
              <m.div
                key={item.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="jiggle"
              >
                <Link
                  to={item.path}
                  aria-current={isActive ? "page" : undefined}
                  className={`font-patrick text-lg underline decoration-wavy decoration-accent decoration-2 ${
                    isActive ? "text-accent font-bold" : "text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              </m.div>
            );
          })}
        </nav>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {mobileOpen && (
          <m.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t-2 border-border md:hidden"
            aria-label="Mobile navigation"
          >
            <div className="mx-auto max-w-[80rem] px-4 py-4 flex flex-col gap-4">
              {NAV_ITEMS.map((item) => {
                const isActive = isItemActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`font-patrick text-lg ${
                      isActive ? "text-accent font-bold" : "text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
