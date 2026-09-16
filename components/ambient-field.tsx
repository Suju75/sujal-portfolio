"use client";

import { useEffect, useRef } from "react";

/**
 * Ambient depth behind everything: two fixed gradient wells, a cursor-tracked
 * spotlight, and film grain. The spotlight is written straight to CSS custom
 * properties via rAF so it never triggers a React render on mouse move.
 */
export function AmbientField() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    let frame = 0;
    // Current and target positions, eased toward each other for weight.
    let x = window.innerWidth / 2;
    let y = window.innerHeight * 0.3;
    let tx = x;
    let ty = y;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const tick = () => {
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      el.style.setProperty("--mx", `${x.toFixed(1)}px`);
      el.style.setProperty("--my", `${y.toFixed(1)}px`);
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base wells */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 18% -8%, rgba(124,132,255,0.16) 0%, transparent 62%)," +
            "radial-gradient(60% 50% at 92% 8%, rgba(76,79,224,0.13) 0%, transparent 60%)," +
            "radial-gradient(90% 70% at 50% 108%, rgba(111,227,192,0.05) 0%, transparent 60%)",
        }}
      />

      {/* Cursor spotlight */}
      <div
        ref={ref}
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 30%), rgba(124,132,255,0.10), transparent 70%)",
        }}
      />

      {/* Fine grid, fading out before it becomes wallpaper */}
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.028) 1px, transparent 1px)," +
            "linear-gradient(to bottom, rgba(255,255,255,0.028) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(120% 78% at 50% 0%, black 0%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(120% 78% at 50% 0%, black 0%, transparent 72%)",
        }}
      />

      {/* Grain keeps the gradients from looking like plastic */}
      <div className="grain absolute inset-0 opacity-[0.16] mix-blend-overlay" />
    </div>
  );
}
