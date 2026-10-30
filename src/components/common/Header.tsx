import { motion } from "framer-motion";
import { Menu, X } from "lucide";
import { MorphIcon } from "morphicons/react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { BRAND_ASSET_VERSION, NAV_ITEMS } from "@/lib/constants";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const isItemActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const background = [
      document.querySelector<HTMLElement>("#main-content"),
      document.querySelector<HTMLElement>("footer"),
    ];
    const previousInert = background.map((element) => element?.inert);
    for (const element of background) if (element) element.inert = true;
    menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const desktop = matchMedia("(min-width: 768px)");
    const onResize = () => {
      if (desktop.matches) setMobileOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMobileOpen(false);
        toggleRef.current?.focus();
      } else if (event.key === "Tab") {
        const controls = [
          toggleRef.current,
          ...Array.from(menuRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []),
        ].filter((element): element is HTMLButtonElement | HTMLAnchorElement => Boolean(element));
        const first = controls[0],
          last = controls.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    desktop.addEventListener("change", onResize);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      background.forEach((element, index) => {
        if (element) element.inert = Boolean(previousInert[index]);
      });
      desktop.removeEventListener("change", onResize);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  return (
    <header className="site-header fixed top-0 left-0 right-0 z-50">
      <div className="site-header__bar mx-auto flex h-16 max-w-[80rem] items-center justify-between px-[3.125vw]">
        <Link
          to="/"
          className="site-header__brand flex min-h-[44px] items-center gap-3 text-foreground no-underline"
        >
          <img
            src={`/logo-mark.png?v=${BRAND_ASSET_VERSION}`}
            alt=""
            width={40}
            height={40}
            className="site-header__logo"
          />
          <span className="site-header__wordmark">VeryFun Studio</span>
          <span className="site-header__brand-tag hidden sm:inline">Small games, good breaks.</span>
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
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
        >
          <MorphIcon icon={mobileOpen ? X : Menu} size={20} strokeWidth={2} spring="smooth" />
        </button>
      </div>

      <>
        {mobileOpen && (
          <motion.div
            ref={menuRef}
            inert={!mobileOpen}
            aria-hidden={!mobileOpen}
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="site-header__menu relative min-h-[calc(100dvh-4rem)] overflow-hidden border-t border-border-soft bg-background md:hidden"
          >
            <div className="site-header__menu-inner">
              <nav className="site-header__mobile-links" aria-label="Mobile navigation">
                {NAV_ITEMS.map((item) => {
                  const isActive = isItemActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={`site-header__mobile-link flex min-h-[58px] items-center rounded-xl px-4 font-sans text-lg ${
                        isActive ? "bg-accent text-white" : "text-foreground-soft"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        )}
      </>
    </header>
  );
};

export default Header;
