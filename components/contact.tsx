"use client";

import { motion } from "framer-motion";
import { expo, viewportOnce } from "@/lib/motion";
import { profile } from "@/lib/content";
import { RevealWords } from "./ui/reveal";

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "GitHub", value: "github.com/Suju75", href: profile.github },
  { label: "Résumé", value: "One page, PDF", href: profile.resume },
];

export function Contact() {
  return (
    <section id="contact" className="relative px-6 py-28 sm:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="hairline h-px w-full" />

        <div className="grid gap-12 pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <span className="label">Contact</span>
            <h2 className="mt-7 text-[2.1rem] leading-[1.08] font-medium tracking-[-0.03em] sm:text-[2.75rem]">
              <RevealWords text="Looking for applied AI" className="block text-lume" />
              <RevealWords
                text="and analytics roles."
                className="block text-lume"
                delay={0.14}
              />
            </h2>
            <p className="mt-6 max-w-lg text-[1.0625rem] leading-relaxed text-mist-2">
              I am an M.S. Business Analytics candidate at UT Dallas graduating in
              May 2027. If you are hiring for LLM application work, analytics
              engineering, or BI, the fastest way to reach me is email — I reply to
              everything.
            </p>
          </div>

          <div className="flex flex-col justify-center">
            <div className="divide-y divide-white/[0.07]">
              {channels.map((c, i) => (
                <motion.a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.75, ease: expo, delay: i * 0.08 }}
                  className="group flex items-center justify-between gap-6 py-6"
                >
                  <div>
                    <span className="label">{c.label}</span>
                    <p className="mt-2 text-[1.0625rem] text-mist transition-colors group-hover:text-iris">
                      {c.value}
                    </p>
                  </div>
                  <svg
                    viewBox="0 0 16 16"
                    className="h-4 w-4 shrink-0 text-mist-3 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:text-iris"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </motion.a>
              ))}
            </div>

            <p className="mt-6 font-mono text-[0.625rem] tracking-[0.12em] text-mist-3 uppercase">
              {profile.location} · {profile.phone}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
