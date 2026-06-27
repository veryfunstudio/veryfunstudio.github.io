import { Link } from "react-router";
import { FaGithub, FaGooglePlay } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GAMES } from "@/data/games";
import { BRAND } from "@/lib/constants";

const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/developer?id=songxugang";

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
            <p>Free mobile puzzles with clear boards, soft pressure, and no timers.</p>
          </div>

          <div className="site-footer__summary" aria-label="Studio summary">
            <span>{String(GAMES.length).padStart(2, "0")} games</span>
            <span>No timers</span>
            <span>Offline play</span>
          </div>

          <nav className="site-footer__links" aria-label="Footer links">
            <Link to="/games">Games</Link>
            <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer">
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
          <p>Built with care. No paywalls, no timers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
