import { Link } from "react-router";
import { FaGithub, FaGooglePlay } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BRAND } from "@/lib/constants";

const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/developer?id=songxugang";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto">
      <div className="dash-line mx-[3.125vw]" />
      <div className="mx-auto max-w-[80rem] px-[3.125vw] py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-end">
          <div>
            <Link
              to="/"
              className="font-sans text-2xl font-medium tracking-tight text-foreground no-underline uppercase"
            >
              {BRAND.name}
            </Link>
            <p className="mt-3 max-w-[40ch] font-sans text-base leading-relaxed text-muted">
              {BRAND.tagline}
            </p>
          </div>

          <div className="flex flex-col gap-6 lg:items-end">
            <div className="flex items-center gap-3">
              <a
                href={GOOGLE_PLAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-button"
                aria-label="Visit our Google Play developer page"
              >
                <FaGooglePlay size={16} />
                Google Play
              </a>
              <a
                href={BRAND.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-button"
                aria-label="Visit our GitHub page"
              >
                <FaGithub size={16} />
                GitHub
              </a>
              <a
                href={BRAND.social.x}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-button"
                aria-label="Visit our X page"
              >
                <FaXTwitter size={16} />
                X
              </a>
            </div>
          </div>
        </div>

        <div className="dash-line mt-16" />

        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-sans text-sm text-muted uppercase tracking-wide">
            &copy; {currentYear} {BRAND.name}. All rights reserved.
          </p>
          <p className="font-sans text-sm text-muted uppercase tracking-wide">
            Built with care. No paywalls, no timers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
