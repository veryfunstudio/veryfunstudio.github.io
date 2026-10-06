import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";

export function StudioCTA({
  title,
  description,
  to,
  label,
}: {
  title: string;
  description: string;
  to: string;
  label: string;
}) {
  return (
    <section className="studio-cta studio-shell">
      <div>
        <p className="studio-kicker">A little more to explore</p>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <Link to={to} className="studio-action studio-action--dark">
        {label}
        <ArrowUpRight size={18} aria-hidden="true" />
      </Link>
    </section>
  );
}
