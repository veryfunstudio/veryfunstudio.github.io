import { Link } from "react-router";
import { FaGithub, FaGooglePlay } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
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
            <a href={GOOGLE_PLAY_DEVELOPER_URL} target="_blank" rel="noopener noreferrer">
              <FaGooglePlay size={15} />
              Google Play
            </a>
            <a href={BRAND.social.github} target="_blank" rel="noopener noreferrer">
              <FaGithub size={15} />
              GitHub
            </a>
            <a href={BRAND.social.x} target="_blank" rel="noopener noreferrer">
              <FaXTwitter size={15} />
              Twitter
            </a>
          </nav>
        </div>

        <div className="site-footer__bottom">
          <p>
            &copy; {currentYear} {BRAND.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
