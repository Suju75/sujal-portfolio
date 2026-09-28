"use client";

import { useId, useState } from "react";
import { Arrow } from "./icons";
import {
  candidateChecks,
  stockBudgets,
  stockStages,
  stockWalkthrough,
  type StockBudget,
  type StockScenario,
} from "@/lib/stock-agent";

const scenarios: { id: StockScenario; label: string }[] = [
  { id: "pass", label: "First candidate passes" },
  { id: "retry", label: "Reject → try next" },
  { id: "abstain", label: "Nobody passes" },
];

export function StockAgentFlow() {
  const [selected, setSelected] = useState(0);
  const [scenario, setScenario] = useState<StockScenario>("retry");
  const [budget, setBudget] = useState<StockBudget>("green");
  const id = useId();
  const stage = stockStages[selected];
  const config = stockBudgets[budget];
  const route = stockWalkthrough(scenario, budget);

  return (
    <section
      className="stock-architecture"
      id="decision-flow"
      aria-labelledby={`${id}-title`}
    >
      <header className="stock-intro">
        <p className="eyebrow accent-mint">
          INSIDE THE SYSTEM / INTERACTIVE ARCHITECTURE
        </p>
        <h2 id={`${id}-title`}>
          A decision is earned.
          <br />
          <span>Abstaining is a valid result.</span>
        </h2>
        <p>
          Follow the route from market data to a paper-research briefing. Then
          change a scenario to see where a candidate gets rejected and what
          happens next.
        </p>
      </header>

      <ol className="stock-funnel" aria-label="Screening funnel, upper limits">
        {[
          ["100", "Nifty universe"],
          ["≤15", "Screened"],
          ["≤5", "Shortlisted"],
          ["0–1", "Per briefing"],
        ].map(([value, label]) => (
          <li key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
            <Arrow />
          </li>
        ))}
      </ol>

      <div className="stock-explorer">
        <div className="stock-section-heading">
          <span>01</span>
          <h3>Follow the pipeline</h3>
          <p>Select a stage to look inside</p>
        </div>
        <div className="stock-explorer-grid">
          <div
            className="stock-stage-nav"
            role="group"
            aria-label="Pipeline stages"
          >
            {stockStages.map((item, index) => (
              <button
                key={item.name}
                type="button"
                aria-pressed={selected === index}
                aria-controls={`${id}-stage`}
                onClick={() => setSelected(index)}
              >
                <span className="stock-stage-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <strong>{item.name}</strong>
                  <small>{item.subtitle}</small>
                </span>
              </button>
            ))}
          </div>
          <div
            className="stock-stage-detail"
            id={`${id}-stage`}
            aria-live="polite"
            aria-atomic="true"
          >
            <div key={selected} className="stock-stage-content">
              <p className="stock-mono-label">{stage.type}</p>
              <h4>{stage.title}</h4>
              <p className="stock-stage-description">{stage.description}</p>
              <ol
                className={`stock-mini-route ${selected === 3 ? "stock-council-roles" : ""}`}
                aria-label={
                  selected === 3 ? "Council perspectives" : "Stage flow"
                }
              >
                {stage.nodes.map((node) => (
                  <li key={node}>{node}</li>
                ))}
              </ol>
              <ul className="stock-stage-facts">
                {stage.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <div className="stock-stage-output">
                <span>OUTPUT</span>
                <p>{stage.output}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="stock-simulator">
        <div className="stock-section-heading">
          <span>02</span>
          <h3>Test the decision path</h3>
          <p>Illustrative scenarios</p>
        </div>
        <p className="stock-sim-intro">
          One candidate at a time. A failed check takes the retry branch. The
          first complete pass stops the search.
        </p>
        <div className="stock-controls">
          <fieldset className="stock-scenario-picker">
            <legend>Choose an outcome</legend>
            {scenarios.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={scenario === item.id}
                onClick={() => setScenario(item.id)}
              >
                {item.label}
              </button>
            ))}
          </fieldset>
          <label className="stock-budget-picker">
            Compute budget
            <select
              value={budget}
              onChange={(event) => setBudget(event.target.value as StockBudget)}
            >
              {Object.entries(stockBudgets).map(([key, value]) => (
                <option value={key} key={key}>
                  {value.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div
          className="stock-route-result"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="stock-model-route">
            <span className="stock-budget-dot" data-budget={budget} />
            <strong>
              Up to {config.attempts}{" "}
              {config.attempts === 1 ? "attempt" : "attempts"}
            </strong>
            <span>Proposer: {config.proposer}</span>
            <span>Challenge / rebuttal: {config.other}</span>
            <span>Memory: {config.memory}</span>
          </div>
          <ol className="stock-candidates" aria-label="Candidate attempts">
            {route.candidates.map((candidate, index) => (
              <li
                key={candidate.name}
                className="stock-candidate"
                data-outcome={candidate.accepted ? "accepted" : "rejected"}
              >
                <div className="stock-candidate-heading">
                  <h4>{candidate.name}</h4>
                  <span>
                    {candidate.accepted ? "✓ Accepted" : "↳ Rejected"}
                  </span>
                </div>
                <ol
                  className="stock-checks"
                  aria-label={`${candidate.name} checks`}
                >
                  {candidateChecks.map((check, checkIndex) => {
                    const status =
                      candidate.failedAt === null ||
                      checkIndex < candidate.failedAt
                        ? "passed"
                        : checkIndex === candidate.failedAt
                          ? "failed"
                          : "not-reached";
                    return (
                      <li key={check} data-status={status}>
                        <span aria-hidden="true">
                          {status === "passed"
                            ? "✓"
                            : status === "failed"
                              ? "×"
                              : "·"}
                        </span>
                        {check}
                        <span className="sr-only">
                          : {status.replaceAll("-", " ")}
                        </span>
                      </li>
                    );
                  })}
                </ol>
                <p>{candidate.reason}</p>
                {index < route.candidates.length - 1 ? (
                  <div className="stock-retry">
                    <span aria-hidden="true">↓</span> Retry branch · move to the
                    next candidate
                  </div>
                ) : null}
              </li>
            ))}
          </ol>
          <div
            className="stock-final-result"
            data-accepted={Boolean(route.accepted)}
          >
            <span className="stock-result-icon" aria-hidden="true">
              {route.accepted ? "↗" : "—"}
            </span>
            <div>
              <p className="stock-mono-label">
                {route.accepted
                  ? "ACCEPTED → COMPOSER → TELEGRAM"
                  : "ABSTAIN → COMPOSER → TELEGRAM"}
              </p>
              <h4>
                {route.accepted
                  ? `${route.accepted.name} becomes the paper-research briefing.`
                  : "No signal. The system does not force a pick."}
              </h4>
              <p>
                {route.accepted
                  ? "Remaining candidates are not evaluated. The decision and its trace are preserved."
                  : scenario === "retry"
                    ? "Candidate A failed, and the red budget allows only one attempt. Candidate B is not evaluated."
                    : `None of the ${route.candidates.length} attempted ${route.candidates.length === 1 ? "candidates passes" : "candidates pass"}. The no-signal result and rejection reasons are preserved.`}
              </p>
            </div>
          </div>
        </div>
        <p className="stock-sim-note">
          Synthetic candidates, with memory and strict gate checks enabled. The
          budget can also block a model call entirely if its spending cap would
          be exceeded. No market data, model calls, or trades run on this page.
        </p>
      </div>

      <div className="stock-feedback-strip">
        <span aria-hidden="true">↺</span>
        <p>
          <strong>The loop continues after delivery.</strong> Closed paper
          outcomes → reflection → lessons → future challenges and memory checks.
        </p>
        <button
          type="button"
          className="text-link"
          onClick={() => {
            setSelected(6);
            document
              .getElementById(`${id}-stage`)
              ?.scrollIntoView({ block: "center", behavior: "instant" });
          }}
        >
          Explore learning <Arrow />
        </button>
      </div>

      <details className="stock-implementation">
        <summary>
          What the implementation does—and what this diagram abstracts
        </summary>
        <ul>
          <li>
            Architecture inspected at source revision <code>a4e12cf</code>. This
            is a code-based walkthrough, not a live service-status view. The
            repository remains private.
          </li>
          <li>
            The council’s five roles share one call. Proposal, devil’s advocate,
            rebuttal, memory audit, and composition are separate stages. Budget
            controls can change their models.
          </li>
          <li>
            The scheduled context builder currently supplies placeholder news
            and market-context fields; technical snapshots, institutional flows,
            and portfolio-risk context are wired. A separate news ingestion job
            does not yet imply those articles reach the council.
          </li>
          <li>
            Price checks, continuous learning, and the strict ship gate are
            configurable. The strict gate checks a strength score of at least
            3/5, supplied price fields, nonzero risk, and reward/risk of at
            least 1.5. These are implementation rules, not evidence of trading
            performance.
          </li>
          <li>
            Some malformed model responses use fallback outputs and some audits
            only log warnings. This architecture does not imply every error
            blocks delivery.
          </li>
        </ul>
      </details>
    </section>
  );
}
