import { profile } from "@/lib/content";
import { Arrow } from "./icons";
export function Contact() {
  return (
    <section id="contact" className="contact-section site-width">
      <div>
        <p className="eyebrow accent-mint">
          <span className="status-dot" />
          OPEN TO AI & ANALYTICS OPPORTUNITIES
        </p>
        <h2>
          Let’s build
          <br />
          something <span>useful.</span>
        </h2>
        <p>
          Applied AI, LLM applications, and data analytics.
          <br />
          Based in Dallas. Graduating from UT Dallas in May 2027.
        </p>
        <a className="contact-email" href={`mailto:${profile.email}`}>
          {profile.email}
          <Arrow diagonal />
        </a>
      </div>
      <div className="contact-links">
        <a href={profile.resume} target="_blank" rel="noreferrer">
          <span>
            View my résumé<small>Experience, skills, and education · PDF</small>
          </span>
          <Arrow diagonal />
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          <span>
            LinkedIn<small>Connect with me</small>
          </span>
          <Arrow diagonal />
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer">
          <span>
            GitHub<small>Explore my code</small>
          </span>
          <Arrow diagonal />
        </a>
      </div>
    </section>
  );
}
