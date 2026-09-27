import type { ReactNode } from "react";
import { Reveal } from "./reveal";
export function Section({
  id,
  label,
  title,
  intro,
  children,
  className = "",
}: {
  id?: string;
  label: string;
  title?: string;
  intro?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`content-section site-width ${className}`}>
      <Reveal>
        <div className="section-heading">
          <p className="eyebrow">{label}</p>
          {title ? <h2>{title}</h2> : null}
          {intro ? <p className="section-intro">{intro}</p> : null}
        </div>
      </Reveal>
      {children}
    </section>
  );
}
