import type { WorkLink } from "@/lib/content";
import { Arrow, GithubIcon } from "./icons";
export function WorkLinkButton({
  link,
  className = "",
}: {
  link: WorkLink;
  className?: string;
}) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer"
      className={`button ${link.kind === "live" ? "button-mint" : link.kind === "source" ? "button-iris" : "button-outline"} ${className}`}
    >
      {link.kind === "source" ? <GithubIcon /> : null}
      {link.kind === "source" ? "View on GitHub" : link.label}
      <Arrow diagonal />
    </a>
  );
}
export function StatusBadge({ status }: { status: string }) {
  return (
    <span className="project-status">
      <span className="status-dot" />
      {status}
    </span>
  );
}
