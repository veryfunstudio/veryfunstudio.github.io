import { Link } from "react-router";
import { GitHubIcon, GooglePlayIcon, XIcon } from "@/components/common/icons/BrandIcons";
import { GAMES } from "@/data/games";
import { BRAND, GOOGLE_PLAY_DEVELOPER_URL, NAV_ITEMS } from "@/lib/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerNav = NAV_ITEMS.filter((item) => item.path !== "/");
  const gameLinks = GAMES.slice(0, 4);

  return (
    <footer className="site-footer mt-auto">
      <div className="site-footer__shell">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link to="/" className="site-footer__name font-serif">
              {BRAND.name}
            </Link>
            <p>Free mobile puzzles with clear boards and calm pacing.</p>
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

          <nav className="site-footer__col" aria-label="Games">
            <p className="site-footer__col-title">Games</p>
            <ul>
              {gameLinks.map((game) => (
                <li key={game.slug}>
                  <Link to={`/games/${game.slug}`}>{game.title}</Link>
                </li>
              ))}
              <li>
                <Link to="/games">All games →</Link>
              </li>
            </ul>
          </nav>

          <nav className="site-footer__col" aria-label="Studio">
            <p className="site-footer__col-title">Studio</p>
            <ul>
              {footerNav.map((item) => (
                <li key={item.path}>
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer__col">
            <p className="site-footer__col-title">Contact</p>
            <ul>
              <li>
                <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
              </li>
              <li>
                <Link to="/legal">Privacy & Terms</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>
            &copy; {currentYear} {BRAND.name}. All rights reserved.
          </p>
          <p className="site-footer__count">{GAMES.length} games on Google Play</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
