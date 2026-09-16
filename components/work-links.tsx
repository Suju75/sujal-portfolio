import type { WorkLink } from "@/lib/content";

/** Live and source links read as buttons; a landing page stays quieter. */
const STYLES: Record<WorkLink["kind"], string> = {
  live: "border-verify/45 bg-verify/[0.12] text-verify hover:border-verify/70 hover:bg-verify/20",
  source:
    "border-iris/45 bg-iris/[0.12] text-iris hover:border-iris/70 hover:bg-iris/20",
  site: "border-white/[0.12] bg-white/[0.02] text-mist-2 hover:border-white/25 hover:text-mist",
};

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
      className={`group/link inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[0.8125rem] font-medium transition-colors duration-300 ${STYLES[link.kind]} ${className}`}
    >
      {link.label}
      <svg
        viewBox="0 0 16 16"
        className="h-3 w-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 11L11 5M6 5h5v5" />
      </svg>
    </a>
  );
}

/** The mint badge, used wherever work is publicly verifiable. */
export function StatusBadge({ status }: { status: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-verify/30 bg-verify/[0.08] px-2.5 py-1">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-verify/60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-verify" />
      </span>
      <span className="font-mono text-[0.625rem] tracking-[0.12em] text-verify uppercase">
        {status}
      </span>
    </span>
  );
}
