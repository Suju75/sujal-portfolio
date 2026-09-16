"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { expo, viewportOnce } from "@/lib/motion";
import { education, experience } from "@/lib/content";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 72%", "end 62%"],
  });
  // The timeline spine draws itself as you scroll — same trace motif as the hero.
  const height = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div>
      <div ref={ref} className="relative pl-8 sm:pl-12">
        {/* Spine */}
        <div className="absolute top-2 bottom-2 left-[3px] w-px bg-white/[0.08]" />
        <motion.div
          className="absolute top-2 left-[3px] w-px origin-top"
          style={{
            height,
            background:
              "linear-gradient(180deg, rgba(124,132,255,0.9), rgba(111,227,192,0.55))",
          }}
        />

        <div className="space-y-14">
          {experience.map((role, i) => (
            <motion.div
              key={`${role.org}-${role.period}`}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.85, ease: expo, delay: i * 0.05 }}
              className="relative"
            >
              {/* Node */}
              <span
                className={`absolute top-[7px] -left-8 h-[9px] w-[9px] rounded-full border sm:-left-12 ${
                  role.current
                    ? "border-verify/50 bg-verify"
                    : "border-white/20 bg-ink-3"
                }`}
                style={
                  role.current
                    ? { boxShadow: "0 0 14px 3px rgba(111,227,192,0.35)" }
                    : undefined
                }
              />

              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <div>
                  <h3 className="text-[1.125rem] font-medium tracking-[-0.015em] text-mist">
                    {role.role}
                  </h3>
                  <p className="mt-1 text-[0.9375rem] text-iris">
                    {role.org}
                    {role.orgNote ? (
                      <span className="text-mist-3"> — {role.orgNote}</span>
                    ) : null}
                  </p>
                </div>
                <div className="shrink-0 text-left sm:text-right">
                  <p className="font-mono text-[0.6875rem] tracking-[0.1em] text-mist-2 uppercase">
                    {role.period}
                  </p>
                  <p className="mt-1 font-mono text-[0.625rem] tracking-[0.1em] text-mist-3 uppercase">
                    {role.place}
                  </p>
                </div>
              </div>

              <ul className="mt-5 space-y-3">
                {role.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex gap-3 text-[0.9375rem] leading-relaxed text-mist-2"
                  >
                    <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-mist-3" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mt-20">
        <div className="flex items-center gap-4">
          <span className="label">Education</span>
          <span className="hairline h-px flex-1" />
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {education.map((e, i) => (
            <motion.div
              key={e.school}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, ease: expo, delay: i * 0.07 }}
              className="surface rounded-[var(--radius-card)] p-6 sm:p-7"
            >
              <h3 className="text-[1.0625rem] font-medium tracking-[-0.015em] text-mist">
                {e.school}
              </h3>
              <p className="mt-2 text-[0.9375rem] text-mist-2">{e.degree}</p>
              {e.detail ? (
                <p className="mt-2 font-mono text-[0.6875rem] tracking-[0.1em] text-iris uppercase">
                  {e.detail}
                </p>
              ) : null}
              <p className="mt-4 font-mono text-[0.625rem] tracking-[0.12em] text-mist-3 uppercase">
                {e.period} · {e.place}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
