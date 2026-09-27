import { education, experience } from "@/lib/content";
import { Reveal } from "./ui/reveal";
export function Experience() {
  return (
    <div>
      <div className="experience-list">
        {experience.map((role, index) => (
          <Reveal key={role.org}>
            <article className="experience-row">
              <div className="experience-date">
                <span className={role.current ? "accent-mint" : ""}>
                  {role.period}
                </span>
                <span>{role.place}</span>
                {role.current ? (
                  <span className="current-label">
                    <span className="status-dot" />
                    Current role
                  </span>
                ) : null}
              </div>
              <div>
                <h3>{role.org}</h3>
                <p className="experience-role">{role.role}</p>
                {index === 1 ? (
                  <div className="role-metrics">
                    <span>
                      <strong>120K+</strong> records analyzed
                    </span>
                    <span>
                      <strong>30%</strong> forecast accuracy gain
                    </span>
                    <span>
                      <strong>35%</strong> less manual effort
                    </span>
                  </div>
                ) : null}
                <p className="experience-summary">{role.bullets[0]}</p>
                <details className="role-details">
                  <summary>
                    More about my work <span aria-hidden="true">+</span>
                  </summary>
                  <ul>
                    {role.bullets.slice(1).map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </details>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <div className="education-section">
        <p className="eyebrow">EDUCATION</p>
        <div>
          {education.map((item) => (
            <article key={item.school}>
              <h3>{item.school}</h3>
              <p>{item.degree}</p>
              <span>{item.period}</span>
              {item.detail ? <small>{item.detail}</small> : null}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
