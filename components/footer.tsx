import Link from "next/link";
import { profile } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.07] px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-mist-3 uppercase">
          {profile.name} — {profile.location}
        </p>
        <div className="flex items-center gap-5 text-[0.8125rem] text-mist-2">
          <a
            href={`mailto:${profile.email}`}
            className="transition-colors hover:text-mist"
          >
            Email
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-mist"
          >
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-mist"
          >
            GitHub
          </a>
          <Link href="/#work" className="transition-colors hover:text-mist">
            Work
          </Link>
        </div>
      </div>
    </footer>
  );
}
