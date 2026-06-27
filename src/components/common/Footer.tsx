import { Link } from "react-router";
import { FaGithub, FaGooglePlay } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { ArrowRight, Download } from "lucide-react";
import { GAMES } from "@/data/games";
import { BRAND } from "@/lib/constants";

const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/developer?id=songxugang";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const latestGame =
    [...GAMES].sort((a, b) => b.releaseDate.localeCompare(a.releaseDate))[0] ?? GAMES[0];

  return (
    <footer className="site-footer mt-auto">
      <div className="site-footer__shell">
        <div className="site-footer__signal">
          <span className="status-text">Studio sign-off</span>
          <strong>{String(GAMES.length).padStart(2, "0")}</strong>
          <span className="status-text">released games</span>
        </div>

        <div className="site-footer__main">
          <div className="site-footer__brand">
            <Link to="/" className="site-footer__name">
              {BRAND.name}
            </Link>
            <h2>Quiet puzzles for loud days.</h2>
            <p>
              {BRAND.tagline}. Free mobile games with clear boards, soft pressure, and one more move
              when the day needs a reset.
            </p>
            <div className="site-footer__actions">
              <a
                href={latestGame.googlePlayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-button pill-button--accent"
                aria-label={`Download ${latestGame.title} on Google Play`}
              >
                <Download size={16} />
                Latest game
              </a>
              <Link to="/games" className="pill-button">
                Full catalog
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="site-footer__catalog" aria-label="Game catalog shortcuts">
            {GAMES.map((game, index) => (
              <Link key={game.id} to={`/games/${game.slug}`} className="site-footer__game">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <img
                  src={game.icon}
                  alt=""
                  width={44}
                  height={44}
                  loading="lazy"
                  decoding="async"
                />
                <strong>{game.title}</strong>
              </Link>
            ))}
          </div>

          <div className="site-footer__meta">
            <div className="site-footer__latest">
              <span className="status-text">Latest release</span>
              <img
                src={latestGame.icon}
                alt=""
                width={64}
                height={64}
                loading="lazy"
                decoding="async"
              />
              <strong>{latestGame.title}</strong>
              <span>{latestGame.releaseDate}</span>
            </div>

            <nav className="site-footer__links" aria-label="Footer links">
              <a
                href={GOOGLE_PLAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Google Play developer page"
              >
                <FaGooglePlay size={16} />
                Google Play
              </a>
              <a
                href={BRAND.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our GitHub page"
              >
                <FaGithub size={16} />
                GitHub
              </a>
              <a
                href={BRAND.social.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our X page"
              >
                <FaXTwitter size={16} />X
              </a>
            </nav>
          </div>
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
