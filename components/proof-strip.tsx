"use client";

import { motion } from "framer-motion";
import { expo, viewportOnce } from "@/lib/motion";
import { proof } from "@/lib/content";

export function ProofStrip() {
  return (
    <section className="relative px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="hairline h-px w-full" />
        <div className="grid grid-cols-2 gap-y-10 py-11 md:grid-cols-4">
          {proof.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, ease: expo, delay: i * 0.08 }}
              className="px-1 md:px-0"
            >
              <div className="text-[2.1rem] leading-none font-medium tracking-[-0.03em] text-mist sm:text-[2.4rem]">
                {p.value}
              </div>
              <div className="mt-2.5 text-[0.8125rem] font-medium text-mist">
                {p.label}
              </div>
              <div className="mt-1.5 max-w-[15rem] text-xs leading-relaxed text-mist-3">
                {p.note}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="hairline h-px w-full" />
      </div>
    </section>
  );
}
