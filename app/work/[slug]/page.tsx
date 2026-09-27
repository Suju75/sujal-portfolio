import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { work } from "@/lib/content";
import { PipelineRow } from "@/components/pipeline-row";
import { StatusBadge, WorkLinkButton } from "@/components/work-links";
import { ReasoningTrace } from "@/components/reasoning-trace";
import { Arrow } from "@/components/icons";
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
    alternates: { canonical: `/work/${item.slug}` },
    openGraph: {
      title: `${item.title} — Sujal Jethva`,
      description: item.tagline,
      url: `/work/${item.slug}`,
    },
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
  const next = work[(work.findIndex((w) => w.slug === slug) + 1) % work.length];
  return (
    <article className="case-study site-width">
      <div className="case-topline">
        <Link href="/#work" className="text-link">
          ← All work
        </Link>
        {item.status ? (
          <StatusBadge status={item.status} />
        ) : (
          <span className="project-status">{item.privateNote}</span>
        )}
      </div>
      <header className="case-heading">
        <p className="eyebrow accent-iris">
          {item.kind} / {item.year}
        </p>
        <h1>{item.title}</h1>
        <p>{item.tagline}</p>
        <div className="project-actions">
          {item.links.map((link) => (
            <WorkLinkButton key={link.href} link={link} />
          ))}
        </div>
      </header>
      <div className="case-summary">
        <div>
          <h2>AT A GLANCE</h2>
          <ul>
            {item.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>BUILT WITH</h2>
          <p>{item.stack.join(" / ")}</p>
          {item.privateNote ? <p>{item.privateNote}</p> : null}
        </div>
      </div>
      <div className="case-body">
        <section className="case-section">
          <h2>The problem</h2>
          <p>{item.problem}</p>
        </section>
        {item.slug === "analytics-copilot" ? (
          <>
            <figure className="copilot-case-image">
              <a
                href="/images/copilot-architecture.png"
                target="_blank"
                rel="noreferrer"
                aria-label="Open full-size Analytics Copilot architecture diagram"
              >
                <Image
                  src="/images/copilot-architecture.png"
                  alt="Analytics Copilot architecture: Streamlit sends a question to FastAPI; the router selects guarded PostgreSQL queries or local embeddings and pgvector retrieval before assembling a grounded answer"
                  width={1536}
                  height={1024}
                  sizes="(max-width:900px) 90vw, 850px"
                />
              </a>
              <figcaption>
                Project architecture illustration. Online badges depict the
                illustrated setup, not current service availability.{" "}
                <a
                  href="/images/copilot-architecture.png"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open full size ↗
                </a>
              </figcaption>
            </figure>
            <ReasoningTrace />
          </>
        ) : (
          <PipelineRow nodes={item.pipeline} />
        )}
        <section className="case-section">
          <h2>What I built</h2>
          {item.approach.map((step, index) => (
            <details
              key={step.heading}
              className="case-details"
              open={index === 0}
            >
              <summary>{step.heading}</summary>
              <p>{step.body}</p>
            </details>
          ))}
        </section>
        {item.slug === "gym-buddy-os" ? (
          <figure className="case-app-images">
            <Image
              src="/images/gym-home.jpg"
              alt="Gym Buddy member home with a demo workout and class booking"
              width={1284}
              height={2283}
              sizes="(max-width:560px) 45vw, 230px"
            />
            <Image
              src="/images/gym-plans.jpg"
              alt="Gym Buddy demo workout plan and classes navigation"
              width={1284}
              height={2283}
              sizes="(max-width:560px) 45vw, 230px"
            />
            <figcaption>App screenshots with demo content.</figcaption>
          </figure>
        ) : null}
        <section className="case-section">
          <h2>The result</h2>
          <ul>
            {item.outcome.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
        </section>
        <Link href={`/work/${next.slug}`} className="case-next">
          <span className="eyebrow">
            EXPLORE NEXT<strong>{next.title}</strong>
          </span>
          <Arrow />
        </Link>
      </div>
    </article>
  );
}
