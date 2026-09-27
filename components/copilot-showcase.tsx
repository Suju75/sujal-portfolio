"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { ReasoningTrace } from "./reasoning-trace";
import { Arrow } from "./icons";
export function CopilotShowcase() {
  const [view, setView] = useState<"overview" | "routing">("overview");
  const routingButton = useRef<HTMLButtonElement>(null);
  const showRouting = () => {
    setView("routing");
    routingButton.current?.focus();
  };
  return (
    <div className="copilot-showcase">
      <div
        className="showcase-switch"
        role="group"
        aria-label="Analytics Copilot project views"
      >
        <button
          type="button"
          aria-pressed={view === "overview"}
          onClick={() => setView("overview")}
        >
          Project overview
        </button>
        <button
          ref={routingButton}
          type="button"
          aria-pressed={view === "routing"}
          onClick={showRouting}
        >
          Explore routing <Arrow />
        </button>
      </div>
      {view === "overview" ? (
        <div className="copilot-overview">
          <a
            href="/images/copilot-overview.png"
            target="_blank"
            rel="noreferrer"
            aria-label="Open Analytics Copilot overview image at full size"
          >
            <Image
              src="/images/copilot-overview.png"
              alt="Analytics Copilot project overview: an agent router connects SQL and document retrieval, using a synthetic SaaS dataset and returning supporting evidence"
              width={1536}
              height={1024}
              sizes="(max-width:800px) 90vw, 650px"
            />
          </a>
          <div className="visual-caption">
            <span>
              Project visual · synthetic demo data
              <br />
              Status badges are part of the illustration.
            </span>
            <a
              href="/images/copilot-overview.png"
              target="_blank"
              rel="noreferrer"
            >
              Enlarge <Arrow diagonal />
            </a>
          </div>
          <div className="overview-bottom">
            <span className="eyebrow">BEHIND THE ANSWER</span>
            <p>
              SQL for the numbers.
              <br />
              Documents for the context.
            </p>
            <button type="button" className="text-link" onClick={showRouting}>
              Explore how a question is routed <Arrow />
            </button>
          </div>
        </div>
      ) : (
        <ReasoningTrace />
      )}
    </div>
  );
}
