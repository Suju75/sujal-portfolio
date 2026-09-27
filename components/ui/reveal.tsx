"use client";
import { useEffect, useRef, type ReactNode } from "react";

/** Content is visible in server HTML; motion is a progressive enhancement. */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || preference.matches || !("IntersectionObserver" in window))
      return;
    let animation: Animation | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        animation = element.animate(
          [{ transform: `translateY(${y}px)` }, { transform: "translateY(0)" }],
          {
            duration: 800,
            delay: delay * 1000,
            easing: "cubic-bezier(.16,1,.3,1)",
          },
        );
        observer.disconnect();
      },
      { threshold: 0.08 },
    );
    const stop = () => {
      if (preference.matches) {
        animation?.cancel();
        observer.disconnect();
      }
    };
    preference.addEventListener("change", stop);
    observer.observe(element);
    return () => {
      observer.disconnect();
      animation?.cancel();
      preference.removeEventListener("change", stop);
    };
  }, [delay, y]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
export function RevealWords({
  text,
  className,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  return <span className={className}>{text}</span>;
}
