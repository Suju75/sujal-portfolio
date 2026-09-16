"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useState } from "react";
import { profile } from "@/lib/content";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Capabilities", href: "/#capabilities" },
  { label: "Experience", href: "/#experience" },
];

export function Nav() {
  const { scrollY, scrollYProgress } = useScroll();
  const [lifted, setLifted] = useState(false);

  // Spring the progress bar so it trails the scroll slightly instead of snapping.
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.0005,
  });

  useMotionValueEvent(scrollY, "change", (v) => setLifted(v > 24));

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`relative transition-all duration-500 ${
          lifted
            ? "border-b border-white/[0.07] bg-ink/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
          <Link
            href="/"
            className="group flex items-baseline gap-2.5 text-sm font-medium tracking-tight"
          >
            <span className="text-mist">{profile.name}</span>
            <span className="hidden font-mono text-[0.6875rem] tracking-[0.14em] text-mist-3 uppercase transition-colors group-hover:text-iris sm:inline">
              {profile.discipline}
            </span>
          </Link>

          <div className="flex items-center gap-1 sm:gap-2">
            <div className="hidden items-center gap-1 md:flex">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-full px-3.5 py-2 text-[0.8125rem] text-mist-2 transition-colors hover:text-mist"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            <Link
              href="/#contact"
              className="group relative overflow-hidden rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-2 text-[0.8125rem] font-medium text-mist transition-colors hover:border-iris/45"
            >
              <span className="relative z-10">Get in touch</span>
              <span className="absolute inset-0 -translate-y-full bg-iris/15 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
            </Link>
          </div>
        </nav>

        {/* Reading progress — the one persistent trace line on the page. */}
        <motion.div
          aria-hidden
          className="absolute bottom-0 left-0 h-px w-full origin-left"
          style={{
            scaleX: progress,
            background:
              "linear-gradient(90deg, rgba(124,132,255,0.2), rgba(124,132,255,0.95), rgba(111,227,192,0.8))",
          }}
        />
      </div>
    </header>
  );
}
