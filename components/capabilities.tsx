import { capabilities, certifications } from "@/lib/content";
export function Capabilities() {
  return (
    <div className="capability-list">
      {capabilities.map((group) => (
        <div className="capability-row" key={group.group}>
          <h3>
            {group.group}
            {group.lead ? <span>Core focus</span> : null}
          </h3>
          <p>
            {group.items.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </p>
        </div>
      ))}
      <p className="certifications">
        <span className="eyebrow">CONTINUED LEARNING</span>
        {certifications.join(" · ")}
      </p>
    </div>
  );
}
