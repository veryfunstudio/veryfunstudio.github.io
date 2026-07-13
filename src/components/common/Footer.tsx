import { Link } from "react-router";
import { GitHubIcon, GooglePlayIcon, XIcon } from "@/components/common/icons/BrandIcons";
import { BRAND, GOOGLE_PLAY_DEVELOPER_URL } from "@/lib/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer mt-auto">
      <div className="site-footer__shell">
        <div className="site-footer__main">
          <div className="site-footer__brand">
            <Link to="/" className="site-footer__name">
              {BRAND.name}
            </Link>
            <p>Free mobile puzzles with clear boards and no timers.</p>
          </div>

          <nav className="site-footer__links" aria-label="Footer links">
            <Link to="/games">Games</Link>
            <a
              href={GOOGLE_PLAY_DEVELOPER_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Google Play"
              className="site-footer__icon-link"
            >
              <GooglePlayIcon size={15} />
              <span className="sr-only">Google Play</span>
            </a>
            <a
              href={BRAND.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="site-footer__icon-link"
            >
              <GitHubIcon size={15} />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href={BRAND.social.x}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="site-footer__icon-link"
            >
              <XIcon size={15} />
              <span className="sr-only">X</span>
            </a>
          </nav>
        </div>

        <div className="site-footer__bottom">
          <p>
            &copy; {currentYear} {BRAND.name}. All rights reserved.
          </p>
          <nav aria-label="Legal links" className="site-footer__legal">
            <Link to="/legal">Privacy & Terms</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
