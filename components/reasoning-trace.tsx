"use client";
import { useState } from "react";
const routes = [
  {
    id: "sql",
    label: "SQL",
    prompt: "What was revenue last month?",
    source: "Structured data",
    path: "SQL",
    evidence: "Query + result table",
    explanation:
      "A numerical question follows the database route. Generated SQL passes SELECT-only checks before execution on a read-only connection.",
    detail: "Read-only access · query timeout · retry handling",
  },
  {
    id: "docs",
    label: "Documents",
    prompt: "How do we define an active account?",
    source: "Document knowledge",
    path: "RAG",
    evidence: "Retrieved passages + source links",
    explanation:
      "A definition question follows semantic document search. Local embeddings and pgvector retrieve relevant passages to ground the response.",
    detail: "Local embeddings · pgvector · source attribution",
  },
  {
    id: "both",
    label: "Combined",
    prompt: "What was revenue, and how is it defined?",
    source: "Data + documentation",
    path: "SQL + RAG",
    evidence: "Results + definitions + sources",
    explanation:
      "A mixed question needs both paths: structured results for the numbers and retrieved documentation for the definitions behind them.",
    detail: "Combined evidence · routing and numeric evaluation",
  },
] as const;
const stages = ["Question", "Route", "Evidence"];
export function ReasoningTrace() {
  const [selected, setSelected] = useState(2);
  const [stage, setStage] = useState(1);
  const route = routes[selected];
  const explanation =
    stage === 0
      ? "The wording of the question determines which evidence is needed. Choose an example above to explore the three routes."
      : stage === 1
        ? route.explanation
        : `The ${route.path} route produces ${route.evidence.toLowerCase()}. The answer can then be checked against its supporting material.`;
  return (
    <div className="trace-panel">
      <div className="trace-header">
        <span className="eyebrow">INSIDE ANALYTICS COPILOT</span>
        <span className="trace-tag">Architecture walkthrough</span>
      </div>
      <fieldset className="route-picker">
        <legend>Choose a question type</legend>
        {routes.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
          >
            {item.label}
          </button>
        ))}
      </fieldset>
      <div className="query-line" aria-live="polite" aria-atomic="true">
        <span aria-hidden="true">↳</span>
        <p>{route.prompt}</p>
      </div>
      <div className="route-map" data-route={route.id} aria-hidden="true">
        <span className="map-entry" />
        <svg viewBox="0 0 440 132" preserveAspectRatio="none">
          <path
            className="map-wire"
            d="M0 66H72C108 66 108 28 144 28H295C331 28 331 66 367 66H440M72 66C108 66 108 104 144 104H295C331 104 331 66 367 66"
          />
          <path
            className={`map-flow ${route.id !== "docs" ? "is-on" : ""}`}
            d="M0 66H72C108 66 108 28 144 28H295C331 28 331 66 367 66H440"
          />
          <path
            className={`map-flow ${route.id !== "sql" ? "is-on" : ""}`}
            d="M0 66H72C108 66 108 104 144 104H295C331 104 331 66 367 66H440"
          />
        </svg>
        <span
          className={`map-node node-sql ${route.id !== "docs" ? "is-on" : ""}`}
        >
          SQL<span>read-only</span>
        </span>
        <span
          className={`map-node node-rag ${route.id !== "sql" ? "is-on" : ""}`}
        >
          RAG<span>pgvector</span>
        </span>
        <span className="map-exit" />
      </div>
      <div
        className="stage-picker"
        role="group"
        aria-label="Inspect an architecture stage"
      >
        {stages.map((name, index) => (
          <button
            key={name}
            type="button"
            onClick={() => setStage(index)}
            aria-pressed={stage === index}
          >
            {name}
            <span>
              {index === 0 ? "Intent" : index === 1 ? route.path : "Sources"}
            </span>
          </button>
        ))}
      </div>
      <div className="trace-explanation" aria-live="polite" aria-atomic="true">
        <p>{explanation}</p>
        <span>{route.detail}</span>
      </div>
      <p className="trace-disclaimer">
        Illustrative questions and architecture. No live model or database runs
        here.
      </p>
    </div>
  );
}
