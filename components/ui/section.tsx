import type { ReactNode } from "react";
import { Reveal } from "./reveal";

export function Section({
  id,
  label,
  title,
  intro,
  children,
  className = "",
}: {
  id?: string;
  label: string;
  title?: string;
  intro?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative px-6 py-24 sm:px-10 md:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="label">{label}</span>
            <span className="hairline h-px flex-1" />
          </div>
        </Reveal>

        {title ? (
          <Reveal delay={0.06}>
            <h2 className="mt-7 max-w-3xl text-3xl leading-[1.12] font-medium tracking-[-0.02em] text-mist sm:text-4xl md:text-[2.75rem]">
              {title}
            </h2>
          </Reveal>
        ) : null}

        {intro ? (
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-2xl text-[0.975rem] leading-relaxed text-mist-2">
              {intro}
            </p>
          </Reveal>
        ) : null}

        <div className={title || intro ? "mt-14" : "mt-10"}>{children}</div>
      </div>
    </section>
  );
}
