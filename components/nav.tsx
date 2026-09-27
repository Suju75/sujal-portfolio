"use client";
import Link from "next/link";
import { useRef } from "react";
import { profile } from "@/lib/content";
import { Arrow } from "./icons";
const links = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Toolkit", href: "/#capabilities" },
  { label: "Contact", href: "/#contact" },
];
export function Nav() {
  const menu = useRef<HTMLDetailsElement>(null);
  return (
    <header className="site-header">
      <nav className="site-width nav-inner" aria-label="Main navigation">
        <Link href="/" className="wordmark" aria-label="Sujal Jethva home">
          <span className="monogram">
            sj<span>.</span>
          </span>
          <span>Sujal Jethva</span>
        </Link>
        <div className="desktop-nav">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
        <a
          href={profile.resume}
          className="nav-resume"
          target="_blank"
          rel="noreferrer"
        >
          Résumé <Arrow diagonal />
        </a>
        <details
          ref={menu}
          className="mobile-menu"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              menu.current?.removeAttribute("open");
              menu.current?.querySelector("summary")?.focus();
            }
          }}
        >
          <summary>
            Menu <span aria-hidden="true">+</span>
          </summary>
          <div>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => menu.current?.removeAttribute("open")}
              >
                {link.label}
                <Arrow />
              </Link>
            ))}
          </div>
        </details>
      </nav>
    </header>
  );
}
