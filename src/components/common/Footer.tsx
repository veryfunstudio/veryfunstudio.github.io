import { Link } from "react-router";
import { GitHubIcon, GooglePlayIcon, XIcon } from "@/components/common/icons/BrandIcons";
import { BRAND, GOOGLE_PLAY_DEVELOPER_URL, NAV_ITEMS } from "@/lib/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerNav = NAV_ITEMS.filter((item) => item.path !== "/");

  return (
    <footer className="site-footer mt-auto">
      <div className="site-footer__shell">
        <div className="site-footer__top">
          <div>
            <Link to="/" className="site-footer__name">
              <img src="/logo-mark.png" alt="" width={40} height={40} />
              <span>VeryFun Studio</span>
            </Link>
            <p>Calming puzzles for real life — built to leave your attention intact.</p>
          </div>
          <nav className="site-footer__nav" aria-label="Footer navigation">
            {footerNav.map((item) => (
              <Link key={item.path} to={item.path}>
                {item.label}
              </Link>
            ))}
            <Link to="/legal">Legal</Link>
          </nav>
        </div>
        <div className="site-footer__bottom">
          <p>
            &copy; {currentYear} {BRAND.name}. Built in the modern workshop.
          </p>
          <div className="site-footer__social">
            <a
              href={GOOGLE_PLAY_DEVELOPER_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Google Play"
            >
              <GooglePlayIcon size={15} />
            </a>
            <a
              href={BRAND.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <GitHubIcon size={15} />
            </a>
            <a href={BRAND.social.x} target="_blank" rel="noopener noreferrer" aria-label="X">
              <XIcon size={15} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
