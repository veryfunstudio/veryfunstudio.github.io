import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { GitHubIcon, GooglePlayIcon, XIcon } from "@/components/common/icons/BrandIcons";
import { BRAND, BRAND_ASSET_VERSION, GOOGLE_PLAY_DEVELOPER_URL, NAV_ITEMS } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer mt-auto">
      <div className="site-footer__shell">
        <div className="studio-footer__invitation">
          <div>
            <p className="studio-kicker">Keep the good ideas moving</p>
            <h2>
              Let’s make room <em>for play.</em>
            </h2>
          </div>
          <Link to="/contact" className="studio-footer__contact">
            Get in touch <ArrowUpRight size={22} aria-hidden="true" />
          </Link>
        </div>
        <div className="studio-footer__middle">
          <Link to="/" className="site-footer__name">
            <img src={`/logo-mark.png?v=${BRAND_ASSET_VERSION}`} alt="" width={48} height={48} />
            <span>VeryFun Studio</span>
          </Link>
          <p>Small puzzle games with a little more heart and a lot more room to breathe.</p>
          <nav className="site-footer__nav" aria-label="Footer navigation">
            {NAV_ITEMS.map((item) => (
              <Link key={item.path} to={item.path}>
                {item.label}
              </Link>
            ))}
            <Link to="/legal">Legal</Link>
          </nav>
        </div>
        <div className="site-footer__bottom">
          <p>
            © {currentYear} {BRAND.name}. Designed for the in-between.
          </p>
          <div className="site-footer__social">
            <a
              href={GOOGLE_PLAY_DEVELOPER_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Google Play"
            >
              <GooglePlayIcon size={17} />
            </a>
            <a
              href={BRAND.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <GitHubIcon size={17} />
            </a>
            <a href={BRAND.social.x} target="_blank" rel="noopener noreferrer" aria-label="X">
              <XIcon size={17} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
