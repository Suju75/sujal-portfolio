import Image from "next/image";
import { Arrow } from "./icons";

export function GeminiShowcase({ compact = false }: { compact?: boolean }) {
  return (
    <figure className="gemini-showcase">
      <a
        className="gemini-dashboard-preview"
        href="/images/gemini-adoption-dashboard.png"
        target="_blank"
        rel="noreferrer"
        aria-label="Open full-size Gemini adoption dashboard (sample data)"
      >
        <Image
          src="/images/gemini-adoption-dashboard.png"
          alt="Illustrative Gemini AI adoption dashboard in Looker Studio, with sample data showing licensed seats, active users, adoption trends, usage by app, team comparisons, and account-level usage"
          width={2880}
          height={1952}
          sizes={compact ? "(max-width:900px) 90vw, 560px" : "(max-width:900px) 90vw, 850px"}
        />
      </a>
      <figcaption>
        <span>Looker Studio dashboard · sample data for illustration</span>
        <a href="/images/gemini-adoption-dashboard.png" target="_blank" rel="noreferrer">
          View full size <Arrow diagonal />
        </a>
      </figcaption>
    </figure>
  );
}
