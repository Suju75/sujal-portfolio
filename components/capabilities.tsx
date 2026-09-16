"use client";

import { motion } from "framer-motion";
import { expo, viewportOnce } from "@/lib/motion";
import { capabilities, certifications } from "@/lib/content";

export function Capabilities() {
  return (
    <div>
      <div className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-white/[0.07] bg-white/[0.06] md:grid-cols-2">
        {capabilities.map((group, gi) => (
          <motion.div
            key={group.group}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: expo, delay: gi * 0.07 }}
            className="relative bg-ink-2 p-7 sm:p-8"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-[1.0625rem] font-medium tracking-[-0.015em] text-mist">
                {group.group}
              </h3>
              {group.lead ? (
                <span className="font-mono text-[0.5625rem] tracking-[0.14em] text-verify uppercase">
                  primary
                </span>
              ) : null}
            </div>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {group.items.map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{
                    duration: 0.5,
                    ease: expo,
                    delay: gi * 0.05 + i * 0.022,
                  }}
                  className={`rounded-md border px-2.5 py-1.5 text-[0.75rem] transition-colors duration-300 ${
                    group.lead
                      ? "border-iris/20 bg-iris/[0.07] text-mist hover:border-iris/45"
                      : "border-white/[0.07] bg-white/[0.02] text-mist-2 hover:border-white/20"
                  }`}
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="label">Certified</span>
        {certifications.map((c, i) => (
          <span key={c} className="flex items-center gap-3">
            {i > 0 ? <span className="text-mist-3">·</span> : null}
            <span className="text-[0.8125rem] text-mist-2">{c}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
