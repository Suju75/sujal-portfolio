import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { work } from "@/lib/content";
import { Reveal, RevealWords } from "@/components/ui/reveal";
import { PipelineRow } from "@/components/pipeline-row";

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = work.find((w) => w.slug === slug);
  if (!item) return {};
  return {
    title: `${item.title} — Sujal Jethva`,
    description: item.tagline,
  };
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = work.find((w) => w.slug === slug);
  if (!item) notFound();

  const index = work.findIndex((w) => w.slug === slug);
  const next = work[(index + 1) % work.length];

  return (
    <article className="px-6 pt-32 pb-8 sm:px-10 sm:pt-40">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.14em] text-mist-3 uppercase transition-colors hover:text-mist"
          >
            <svg
              viewBox="0 0 16 16"
              className="h-3 w-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 8H3M7 4L3 8l4 4" />
            </svg>
            All work
          </Link>
        </Reveal>

        <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="label">{item.kind}</span>
          <span className="font-mono text-[0.625rem] tracking-[0.14em] text-mist-3">
            {item.year}
          </span>
        </div>

        <h1 className="mt-6 text-[2.4rem] leading-[1.05] font-medium tracking-[-0.035em] sm:text-[3.25rem]">
          <RevealWords text={item.title} className="block text-lume" />
        </h1>

        <Reveal delay={0.2}>
          <p className="mt-7 max-w-2xl text-[1.125rem] leading-relaxed text-mist-2">
            {item.tagline}
          </p>
        </Reveal>

        <Reveal delay={0.28}>
          <p className="mt-7 max-w-2xl border-l border-iris/30 pl-5 text-[1rem] leading-relaxed text-mist italic">
            {item.premise}
          </p>
        </Reveal>

        {/* Meta */}
        <Reveal delay={0.34}>
          <div className="mt-12 grid gap-8 border-y border-white/[0.07] py-8 sm:grid-cols-[1.4fr_1fr]">
            <div>
              <span className="label">Stack</span>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-white/[0.07] bg-white/[0.025] px-2 py-1 font-mono text-[0.625rem] tracking-wide text-mist-2"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="label">Links</span>
              <div className="mt-3 flex flex-col gap-2">
                {item.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 text-[0.9375rem] text-mist transition-colors hover:text-iris"
                  >
                    {l.label}
                    <svg
                      viewBox="0 0 16 16"
                      className="h-3 w-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 11L11 5M6 5h5v5" />
                    </svg>
                  </a>
                ))}
                {item.privateNote ? (
                  <p className="text-[0.8125rem] leading-relaxed text-mist-3">
                    {item.privateNote}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Problem */}
        <section className="mt-16">
          <Reveal>
            <span className="label">The problem</span>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-5 text-[1.0625rem] leading-[1.75] text-mist-2">
              {item.problem}
            </p>
          </Reveal>
        </section>

        {/* Pipeline */}
        <div className="mt-16">
          <PipelineRow nodes={item.pipeline} />
        </div>

        {/* Approach */}
        <section className="mt-16">
          <Reveal>
            <span className="label">Approach</span>
          </Reveal>

          <div className="mt-8 space-y-10">
            {item.approach.map((step, i) => (
              <Reveal key={step.heading} delay={i * 0.05}>
                <div className="border-l border-white/[0.09] pl-6 transition-colors duration-500 hover:border-iris/40">
                  <h2 className="text-[1.1875rem] font-medium tracking-[-0.015em] text-mist">
                    {step.heading}
                  </h2>
                  <p className="mt-3 text-[1rem] leading-[1.75] text-mist-2">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Outcome */}
        <section className="mt-16">
          <Reveal>
            <span className="label">Where it landed</span>
          </Reveal>
          <ul className="mt-6 space-y-4">
            {item.outcome.map((o, i) => (
              <Reveal key={o} delay={i * 0.05}>
                <li className="flex gap-3.5 text-[1rem] leading-relaxed text-mist-2">
                  <svg
                    viewBox="0 0 16 16"
                    className="mt-[0.35em] h-3.5 w-3.5 shrink-0 text-verify"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2.5 8.5l3.5 3.5 7.5-8" />
                  </svg>
                  <span>{o}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* Next */}
        <Reveal>
          <Link
            href={`/work/${next.slug}`}
            className="group surface mt-20 flex items-center justify-between gap-6 rounded-[var(--radius-card)] p-6 sm:p-8"
          >
            <div>
              <span className="label">Next</span>
              <p className="mt-2.5 text-[1.375rem] font-medium tracking-[-0.02em] text-mist transition-colors group-hover:text-iris">
                {next.title}
              </p>
            </div>
            <svg
              viewBox="0 0 16 16"
              className="h-5 w-5 shrink-0 text-mist-3 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 group-hover:text-iris"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
