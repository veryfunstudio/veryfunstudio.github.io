import type { ReactNode } from "react";

interface PageIntroProps {
  eyebrow: string;
  title: string;
  accent?: string;
  description: string;
  meta?: string;
  children?: ReactNode;
}

export function PageIntro({ eyebrow, title, accent, description, meta, children }: PageIntroProps) {
  return (
    <header className="page-intro">
      <div className="studio-shell">
        <div className="page-intro__meta">
          <span className="studio-kicker">{eyebrow}</span>
          <span>{meta ?? "VeryFun Studio / Small games, good breaks"}</span>
        </div>
        <h1>
          {title}
          {accent && (
            <>
              {" "}
              <em>{accent}</em>
            </>
          )}
        </h1>
        <p className="page-intro__description">{description}</p>
        {children}
      </div>
    </header>
  );
}
