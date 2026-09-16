"use client";

import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, type PointerEvent } from "react";
import { expo, viewportOnce } from "@/lib/motion";
import { work, type Work } from "@/lib/content";
import { StatusBadge, WorkLinkButton } from "./work-links";

/** Column spans, deliberately uneven so no two cards read as the same tile. */
const SPANS = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
];

export function WorkGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
      {work.map((item, i) => (
        <motion.div
          key={item.slug}
          className={SPANS[i % SPANS.length]}
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: expo, delay: (i % 2) * 0.1 }}
        >
          <WorkCard item={item} emphasis={item.featured} />
        </motion.div>
      ))}
    </div>
  );
}

function WorkCard({ item, emphasis }: { item: Work; emphasis: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  // Pointer-relative glow + a very slight tilt. Subtle enough to feel like
  // material, not a party trick.
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const rx = useSpring(0, { stiffness: 150, damping: 20 });
  const ry = useSpring(0, { stiffness: 150, damping: 20 });

  const glow = useMotionTemplate`radial-gradient(520px circle at ${gx}% ${gy}%, rgba(124,132,255,0.13), transparent 62%)`;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    gx.set(px * 100);
    gy.set(py * 100);
    ry.set((px - 0.5) * 6);
    rx.set((0.5 - py) * 5);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      className="group surface relative h-full overflow-hidden rounded-[var(--radius-card)]"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: glow }}
      />

      {/* The whole card opens the case study. Real links sit above this. */}
      <Link
        href={`/work/${item.slug}`}
        aria-label={`Case study: ${item.title}`}
        className="absolute inset-0 z-0"
      />

      <div className="pointer-events-none relative z-10 flex h-full flex-col p-6 sm:p-8">
        <div className="flex items-start justify-between gap-6">
          <span className="label">{item.kind}</span>
          <span className="font-mono text-[0.625rem] tracking-[0.14em] text-mist-3">
            {item.year}
          </span>
        </div>

        {/* Publicly verifiable work says so, in the one colour reserved for evidence. */}
        {item.status ? (
          <div className="mt-5 self-start">
            <StatusBadge status={item.status} />
          </div>
        ) : null}

        <h3
          className={`font-medium tracking-[-0.025em] text-mist ${item.status ? "mt-4" : "mt-6"} ${
            emphasis
              ? "text-[1.75rem] sm:text-[2rem]"
              : "text-[1.5rem] sm:text-[1.65rem]"
          }`}
        >
          {item.title}
        </h3>

        <p className="mt-3 max-w-lg text-[0.9375rem] leading-relaxed text-mist-2">
          {item.tagline}
        </p>

        {emphasis ? (
          <p className="mt-4 max-w-lg border-l border-iris/25 pl-4 text-[0.875rem] leading-relaxed text-mist-3 italic">
            {item.premise}
          </p>
        ) : null}

        {/* The skim layer: three facts, no sentences. */}
        <ul className="mt-5 flex flex-col gap-2">
          {item.highlights.map((h) => (
            <li
              key={h}
              className="flex items-center gap-2.5 text-[0.8125rem] text-mist"
            >
              <svg
                viewBox="0 0 16 16"
                className="h-3 w-3 shrink-0 text-verify"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2.5 8.5l3.5 3.5 7.5-8" />
              </svg>
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {item.stack.slice(0, emphasis ? 6 : 4).map((s) => (
            <span
              key={s}
              className="rounded-md border border-white/[0.07] bg-white/[0.025] px-2 py-1 font-mono text-[0.625rem] tracking-wide text-mist-3"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2.5 pt-7">
          {item.links.map((l) => (
            <WorkLinkButton
              key={l.href}
              link={l}
              className="pointer-events-auto relative z-20"
            />
          ))}

          <span className="flex items-center gap-2 px-1 text-[0.8125rem] font-medium text-mist-2 transition-colors group-hover:text-mist">
            Case study
            <svg
              viewBox="0 0 16 16"
              className="h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </span>

          {item.privateNote ? (
            <span className="font-mono text-[0.625rem] tracking-[0.1em] text-mist-3 uppercase">
              source private
            </span>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}
