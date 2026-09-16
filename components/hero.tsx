"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ReasoningTrace } from "./reasoning-trace";
import { RevealWords } from "./ui/reveal";
import { expo } from "@/lib/motion";
import { profile } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative px-6 pt-36 pb-20 sm:px-10 sm:pt-44 md:pb-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: expo }}
              className="flex flex-wrap items-center gap-x-3 gap-y-2"
            >
              <span className="flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-3 py-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-verify/70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-verify" />
                </span>
                <span className="font-mono text-[0.625rem] tracking-[0.14em] text-mist-2 uppercase">
                  {profile.currentRole} · {profile.currentOrg}
                </span>
              </span>
              <span className="font-mono text-[0.625rem] tracking-[0.14em] text-mist-3 uppercase">
                {profile.location}
              </span>
            </motion.div>

            <h1 className="mt-8 text-[2.5rem] leading-[1.03] font-medium tracking-[-0.035em] sm:text-[3.4rem] md:text-[4rem]">
              <RevealWords text="I build AI systems" className="block text-lume" />
              <RevealWords
                text="that show their evidence."
                className="block text-lume"
                delay={0.16}
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: expo, delay: 0.5 }}
              className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-mist-2"
            >
              {profile.subhead}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: expo, delay: 0.62 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Link
                href="#work"
                className="group relative overflow-hidden rounded-full bg-mist px-6 py-3 text-sm font-medium text-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5"
              >
                <span className="relative z-10">See the work</span>
              </Link>
              <a
                href={`mailto:${profile.email}`}
                className="group relative overflow-hidden rounded-full border border-white/[0.12] px-6 py-3 text-sm font-medium text-mist transition-colors duration-500 hover:border-iris/45"
              >
                <span className="relative z-10">{profile.email}</span>
                <span className="absolute inset-0 -translate-y-full bg-iris/15 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
              </a>
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 px-2 py-3 text-sm font-medium text-mist-2 transition-colors hover:text-mist"
              >
                Résumé
                <svg
                  viewBox="0 0 16 16"
                  className="h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 3v8M4.5 7.5L8 11l3.5-3.5" />
                </svg>
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: expo, delay: 0.8 }}
              className="mt-8 font-mono text-[0.6875rem] tracking-[0.1em] text-mist-3 uppercase"
            >
              {profile.availability}
            </motion.p>
          </div>

          {/* Signature animation */}
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: expo, delay: 0.35 }}
          >
            <ReasoningTrace />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
