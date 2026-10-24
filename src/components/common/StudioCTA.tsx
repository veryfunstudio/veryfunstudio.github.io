import { ArrowUpRight, Play } from "lucide-react";
import { Link } from "react-router";

export function StudioCTA({
  title,
  description,
  to,
  label,
  storeUrl,
}: {
  title: string;
  description: string;
  to: string;
  label: string;
  /** Optional second action: go straight to the listing instead of the catalog. */
  storeUrl?: string;
}) {
  return (
    <section className="studio-cta studio-shell">
      <div>
        <p className="studio-kicker">A little more to explore</p>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="studio-cta__actions">
        <Link to={to} className="studio-action studio-action--dark">
          {label}
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
        {storeUrl && (
          <a
            href={storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="studio-action studio-action--store"
          >
            <Play size={17} aria-hidden="true" />
            Google Play
          </a>
        )}
      </div>
    </section>
  );
}
