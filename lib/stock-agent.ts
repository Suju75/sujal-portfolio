/** Architecture checked against india-stock-agent, commit a4e12cf. */
export const stockStages = [
  {
    name: "Schedule & inputs",
    subtitle: "Start with market context",
    type: "SCHEDULED · PYTHON",
    title: "A briefing begins on the clock.",
    description:
      "Weekday jobs assemble technical snapshots, institutional flows, and portfolio state before the model reasons about a candidate.",
    nodes: ["Market data", "Portfolio state", "Briefing context"],
    details: [
      "Pre-open at 07:30 IST; post-close at 16:30 IST. Separate jobs ingest prices, flows, corporate actions, and news.",
      "The context builder gathers screening results and institutional flows; portfolio risk is loaded from stored state. Data-health snapshots provide operational context.",
      "Scheduled news and market-context inputs are still partially stubbed. Separate ingestion jobs and the briefing context are not fully connected; see implementation notes.",
    ],
    output: "A bounded candidate set + portfolio context",
  },
  {
    name: "Quantitative screen",
    subtitle: "100 → up to 15",
    type: "DETERMINISTIC · PANDAS",
    title: "Let rules do the first pass.",
    description:
      "The Nifty 100 universe is screened using price and volume indicators. This stage does not ask an LLM to pick stocks.",
    nodes: ["Nifty 100", "Indicator rules", "≤15 candidates"],
    details: [
      "Require at least 60 price bars. A candidate must match at least one screen: RSI extremes, a recent bullish MACD crossover, a Bollinger-band break, or elevated volume.",
      "Volume is compared with 1.5× its 20-day average; RSI thresholds are below 30 or above 70.",
      "Sort by the number of matching screens, then ticker. Keep at most 15 candidates.",
    ],
    output: "Screen hits and technical snapshots for triage",
  },
  {
    name: "Fast triage",
    subtitle: "Up to 15 → up to 5",
    type: "CLAUDE HAIKU · WITH FALLBACK",
    title: "Spend attention selectively.",
    description:
      "A lightweight model narrows a larger shortlist before the more expensive review stages begin.",
    nodes: ["Price check", "Haiku triage", "≤5 survivors"],
    details: [
      "Before triage, enabled price sanity checks remove invalid inputs. If none remain, the briefing is skipped early.",
      "When there are more than five candidates, Haiku returns a shortlist drawn only from the supplied tickers.",
      "With five or fewer candidates, the model call is bypassed and the sorted set proceeds directly.",
      "If the API call or response parsing fails, deterministic ranking by screen-hit count supplies the fallback shortlist.",
    ],
    output: "Up to five survivors, ready for the council",
  },
  {
    name: "Analyst council",
    subtitle: "Five lenses, one call",
    type: "CLAUDE SONNET · ROLE-SCOPED INPUTS",
    title: "Separate the perspectives.",
    description:
      "One structured council call produces five role-specific views. The proposing and challenging steps happen in later, separate calls.",
    nodes: ["Technicals", "Flows", "News", "Market context", "Portfolio risk"],
    details: [
      "Each role receives a distinct input schema rather than an unrestricted copy of every field.",
      "The risk view is portfolio-only: positions, concentration, drawdown, cooldowns, and available capacity.",
      "The shared council report feeds candidate review. This is five perspectives in one call, not five independent model executions.",
    ],
    output: "A structured council report + portfolio constraints",
  },
  {
    name: "Candidate review",
    subtitle: "Propose → challenge → gate",
    type: "SEQUENTIAL REVIEW · EXPLICIT REJECTION",
    title: "A proposal has to survive objections.",
    description:
      "Candidates are tried in order, within the compute budget. A failed candidate check routes to the next candidate; the first complete pass ends the search.",
    nodes: [
      "Proposal",
      "Validation",
      "Challenge",
      "Rebuttal",
      "Memory",
      "Ship gate",
    ],
    details: [
      "Validate the proposed decision, price fields, and reward/risk geometry. Apply a second price sanity check when enabled.",
      "A separate devil’s-advocate call challenges the proposal; a rebuttal must confirm the decision and address high-severity risks.",
      "With the relevant checks enabled, enforced memory lessons and the strict ship gate can reject it. No candidate passing within the attempt limit produces an abstention.",
    ],
    output: "At most one accepted candidate — or no signal",
  },
  {
    name: "Delivery & records",
    subtitle: "Explain and preserve the result",
    type: "COMPOSER → TELEGRAM + SQLITE",
    title: "The reasoning leaves a trail.",
    description:
      "A composer turns the accepted decision, or the no-signal outcome, into a readable paper-research briefing.",
    nodes: ["Decision", "Composer", "Telegram"],
    details: [
      "Format the briefing as Telegram HTML, with a required paper-trading disclaimer and a cost footer.",
      "Persist briefings, signals, rejection reasons, reasoning traces, and model usage in SQLite.",
      "A Streamlit dashboard exposes the stored research history, lessons, and operational controls. No live-money execution is part of this walkthrough.",
    ],
    output: "A readable briefing + an inspectable research record",
  },
  {
    name: "Learning loop",
    subtitle: "Outcomes inform later reviews",
    type: "OPTIONAL CONTINUOUS LEARNING",
    title: "Close the loop on the decision.",
    description:
      "When continuous learning is enabled, closed paper outcomes feed reflection and lesson editing for later reviews.",
    nodes: ["Closed outcome", "Reflection", "Lessons", "Next review"],
    details: [
      "Track paper signals through target hit, stop-out, or holding-period expiry, then reflect on the stored decision trace.",
      "The lesson editor maintains observations and enforced lessons. Only enforced lessons can trigger a memory-auditor rejection.",
      "Historical analogues inform later challenges. Weekly post-mortems provide a wider review of outcomes and failures; learning is not a measured profitability claim.",
    ],
    output: "Historical context → challenge; enforced lessons → memory check",
  },
] as const;

export const stockBudgets = {
  green: {
    label: "Green · standard",
    attempts: 3,
    proposer: "Opus",
    other: "Sonnet",
    memory: "Haiku",
  },
  amber: {
    label: "Amber · reduced",
    attempts: 2,
    proposer: "Sonnet",
    other: "Sonnet",
    memory: "Haiku",
  },
  red: {
    label: "Red · minimal",
    attempts: 1,
    proposer: "Haiku",
    other: "Haiku",
    memory: "Haiku",
  },
} as const;

export type StockBudget = keyof typeof stockBudgets;
export type StockScenario = "pass" | "retry" | "abstain";

export const candidateChecks = [
  "Propose",
  "Validate",
  "Challenge",
  "Rebuttal",
  "Memory",
  "Ship gate",
] as const;

/** Synthetic routes illustrate control flow, never real investment signals. */
export function stockWalkthrough(scenario: StockScenario, budget: StockBudget) {
  const limit = stockBudgets[budget].attempts;
  const count =
    scenario === "pass" ? 1 : scenario === "retry" ? Math.min(2, limit) : limit;
  const candidates = Array.from({ length: count }, (_, index) => {
    const accepted =
      scenario === "pass" || (scenario === "retry" && index === 1);
    // Deliberately varied failures show where the same retry branch is taken.
    const failedAt = accepted
      ? null
      : scenario === "retry"
        ? 3
        : [1, 4, 5][index];
    const reason = accepted
      ? "All checks pass. Stop searching."
      : failedAt === 1
        ? "Price or reward/risk validation fails."
        : failedAt === 3
          ? "The rebuttal does not address a severe risk."
          : failedAt === 4
            ? "An enforced memory lesson is violated."
            : "The strict ship gate rejects the candidate.";
    return {
      name: `Candidate ${String.fromCharCode(65 + index)}`,
      accepted,
      failedAt,
      reason,
    };
  });
  return {
    candidates,
    accepted: candidates.find((candidate) => candidate.accepted) ?? null,
    limit,
  };
}
