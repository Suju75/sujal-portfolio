"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { expo } from "@/lib/motion";

/**
 * Static-content version of the hero trace: draws once when scrolled into view.
 * Used on case-study pages to show that project's actual stage sequence.
 */
export function PipelineRow({ nodes }: { nodes: readonly string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const last = nodes.length - 1;
  const inset = 100 / nodes.length / 2;

  return (
    <div ref={ref} className="surface rounded-[var(--radius-card)] px-5 py-8 sm:px-8">
      <span className="label">Stage sequence</span>

      <div className="relative mt-7">
        <div
          className="absolute top-[7px] h-px bg-white/[0.09]"
          style={{ left: `${inset}%`, right: `${inset}%` }}
        />
        <motion.div
          className="absolute top-[7px] h-px origin-left"
          style={{
            left: `${inset}%`,
            width: `${100 - inset * 2}%`,
            background:
              "linear-gradient(90deg, rgba(124,132,255,0.6), rgba(111,227,192,0.85))",
          }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.3, ease: expo, delay: 0.15 }}
        />

        <div
          className="grid"
          style={{ gridTemplateColumns: `repeat(${nodes.length}, minmax(0, 1fr))` }}
        >
          {nodes.map((node, i) => (
            <div key={node} className="flex flex-col items-center text-center">
              <motion.span
                className="relative z-10 h-[15px] w-[15px] rounded-full border"
                initial={{ backgroundColor: "rgba(8,11,22,1)", scale: 0.8 }}
                animate={
                  inView
                    ? {
                        backgroundColor:
                          i === last
                            ? "rgba(111,227,192,0.9)"
                            : "rgba(124,132,255,0.9)",
                        borderColor:
                          i === last
                            ? "rgba(111,227,192,0.5)"
                            : "rgba(124,132,255,0.5)",
                        scale: 1,
                      }
                    : {}
                }
                transition={{
                  duration: 0.5,
                  ease: expo,
                  delay: 0.2 + i * (1.1 / nodes.length),
                }}
                style={{ borderColor: "rgba(255,255,255,0.14)" }}
              />
              <motion.span
                className="mt-3 font-mono text-[0.5625rem] tracking-[0.1em] uppercase sm:text-[0.625rem]"
                initial={{ opacity: 0, y: 6, color: "#626c84" }}
                animate={inView ? { opacity: 1, y: 0, color: "#eaeef7" } : {}}
                transition={{
                  duration: 0.5,
                  ease: expo,
                  delay: 0.28 + i * (1.1 / nodes.length),
                }}
              >
                {node}
              </motion.span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
