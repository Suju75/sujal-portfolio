"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useReducer, useRef, useState } from "react";
import { expo } from "@/lib/motion";

const QUERY = "Why did churn move last quarter?";
const NODES = ["Parse", "Route", "Retrieve", "Verify", "Answer"] as const;

/** What each stage reports while it is the active node. */
const DETAIL: Record<string, string> = {
  Parse: "intent + entities",
  Route: "sql + docs",
  Retrieve: "pgvector · read-only sql",
  Verify: "numbers checked",
  Answer: "evidence attached",
};

const EVIDENCE = [
  { kind: "sql", text: "SELECT … FROM subscriptions" },
  { kind: "table", text: "result set" },
  { kind: "source", text: "docs/definitions.md" },
] as const;

type State = { typed: number; active: number };
type Action = { type: "type" } | { type: "advance" } | { type: "reset" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "type":
      return { ...state, typed: Math.min(state.typed + 1, QUERY.length) };
    case "advance":
      return { ...state, active: Math.min(state.active + 1, NODES.length) };
    case "reset":
      return { typed: 0, active: 0 };
  }
}

export function ReasoningTrace() {
  const [state, dispatch] = useReducer(reducer, { typed: 0, active: 0 });
  const [reduced, setReduced] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setReduced(true);
      return;
    }

    let cancelled = false;
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const t = setTimeout(resolve, ms);
        timers.current.push(t);
      });

    const run = async () => {
      while (!cancelled) {
        dispatch({ type: "reset" });
        await wait(520);
        if (cancelled) return;

        for (let i = 0; i < QUERY.length; i++) {
          dispatch({ type: "type" });
          await wait(26);
          if (cancelled) return;
        }

        await wait(300);
        for (let i = 0; i < NODES.length; i++) {
          dispatch({ type: "advance" });
          await wait(600);
          if (cancelled) return;
        }

        await wait(2600);
      }
    };

    void run();

    return () => {
      cancelled = true;
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, []);

  // Reduced motion gets the completed end state rather than a frozen empty one.
  const typed = reduced ? QUERY.length : state.typed;
  const active = reduced ? NODES.length : state.active;

  const fill = active <= 1 ? 0 : ((active - 1) / (NODES.length - 1)) * 100;
  const settled = active >= NODES.length;

  return (
    <div className="surface-raised relative overflow-hidden rounded-[var(--radius-card)] p-5 sm:p-7">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <span className="label">Analytics Copilot — query trace</span>
        <span className="flex items-center gap-2 font-mono text-[0.625rem] tracking-[0.14em] text-mist-3 uppercase">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-iris/70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-iris" />
          </span>
          schematic
        </span>
      </div>

      {/* Query */}
      <div className="mt-6 flex items-start gap-3 font-mono text-[0.8125rem] leading-relaxed sm:text-sm">
        <span className="mt-px shrink-0 text-iris">›</span>
        <p className="text-mist">
          {QUERY.slice(0, typed)}
          {typed < QUERY.length ? (
            <span className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.16em] bg-iris" />
          ) : null}
        </p>
      </div>

      {/* Pipeline */}
      <div className="relative mt-9">
        {/* Track */}
        <div className="absolute top-[7px] right-[10%] left-[10%] h-px bg-white/[0.09]" />
        {/* Fill */}
        <motion.div
          className="absolute top-[7px] left-[10%] h-px origin-left"
          style={{
            width: "80%",
            background:
              "linear-gradient(90deg, rgba(124,132,255,0.55), rgba(124,132,255,0.95))",
            scaleX: 0,
          }}
          animate={{ scaleX: fill / 100 }}
          transition={{ duration: 0.6, ease: expo }}
        />
        {/* Travelling head */}
        {active > 0 && !settled ? (
          <motion.div
            className="absolute top-[3px] z-10 h-2 w-2 rounded-full bg-iris"
            style={{ boxShadow: "0 0 14px 3px rgba(124,132,255,0.6)" }}
            animate={{ left: `calc(10% + ${fill * 0.8}% - 4px)` }}
            transition={{ duration: 0.6, ease: expo }}
          />
        ) : null}

        <div className="grid grid-cols-5">
          {NODES.map((node, i) => {
            const on = active > i;
            const isCurrent = active === i + 1;
            return (
              <div key={node} className="flex flex-col items-center text-center">
                <motion.span
                  className="relative z-10 h-[15px] w-[15px] rounded-full border"
                  animate={{
                    backgroundColor: on
                      ? node === "Verify" || node === "Answer"
                        ? "rgba(111,227,192,0.9)"
                        : "rgba(124,132,255,0.9)"
                      : "rgba(8,11,22,1)",
                    borderColor: on
                      ? node === "Verify" || node === "Answer"
                        ? "rgba(111,227,192,0.55)"
                        : "rgba(124,132,255,0.55)"
                      : "rgba(255,255,255,0.14)",
                    scale: isCurrent ? 1.28 : 1,
                    boxShadow: isCurrent
                      ? "0 0 18px 4px rgba(124,132,255,0.35)"
                      : "0 0 0 0 rgba(0,0,0,0)",
                  }}
                  transition={{ duration: 0.45, ease: expo }}
                />
                <motion.span
                  className="mt-3 font-mono text-[0.5625rem] tracking-[0.1em] uppercase sm:text-[0.625rem]"
                  animate={{ color: on ? "#eaeef7" : "#626c84" }}
                  transition={{ duration: 0.4 }}
                >
                  {node}
                </motion.span>
                <span className="mt-1 hidden font-mono text-[0.5rem] leading-tight text-mist-3 sm:block">
                  <AnimatePresence mode="wait">
                    {on ? (
                      <motion.span
                        key="d"
                        initial={{ opacity: 0, y: 3 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="block"
                      >
                        {DETAIL[node]}
                      </motion.span>
                    ) : null}
                  </AnimatePresence>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Evidence — the payoff. Mint appears only once something is grounded. */}
      <div className="mt-9 min-h-[76px] border-t border-white/[0.07] pt-5">
        <AnimatePresence>
          {settled ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.7, ease: expo }}
            >
              <div className="flex items-center gap-2">
                <svg
                  viewBox="0 0 16 16"
                  className="h-3.5 w-3.5 shrink-0 text-verify"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2.5 8.5l3.5 3.5 7.5-8" />
                </svg>
                <span className="font-mono text-[0.625rem] tracking-[0.14em] text-verify uppercase">
                  answer grounded in evidence
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {EVIDENCE.map((e, i) => (
                  <motion.span
                    key={e.text}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: expo, delay: 0.1 + i * 0.09 }}
                    className="flex items-center gap-2 rounded-full border border-verify/20 bg-verify/[0.06] px-3 py-1.5 font-mono text-[0.6875rem] text-mist-2"
                  >
                    <span className="text-verify/80">{e.kind}</span>
                    <span className="text-mist-3">/</span>
                    <span className="truncate">{e.text}</span>
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.p
              key="pending"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-mono text-[0.6875rem] tracking-[0.1em] text-mist-3 uppercase"
            >
              no answer released without evidence
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
