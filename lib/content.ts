/**
 * Single source of truth for every fact on this site.
 * Every metric, date, and link here is taken from the resume or a verified live URL.
 * If something cannot be verified, it does not belong in this file.
 */

export const profile = {
  name: "Sujal Jethva",
  discipline: "Applied AI / LLM Engineer",
  currentRole: "AI Specialist Intern",
  currentOrg: "PROJXON",
  location: "Dallas, TX",
  email: "jethvasujal86@gmail.com",
  phone: "(214) 899-7210",
  github: "https://github.com/Suju75",
  linkedin: "https://www.linkedin.com/in/sujal-jethva-1116-/",
  resume: "/Sujal_Jethva_Applied_AI_Resume.pdf",
  headline: "Applied AI, grounded in data. Built for people.",
  subhead:
    "Sujal Jethva is an Applied AI / LLM Engineer in Dallas building RAG, text-to-SQL, and analytics applications. Explore his projects, professional experience, and shipped iOS product.",
  availability: "M.S. Business Analytics candidate · graduating May 2027",
} as const;

/** Verified, quantified outcomes. Each maps to a specific resume bullet. */
export const proof = [
  {
    value: "120K+",
    label: "operational records",
    note: "modeled in SQL and Python to build forecasting logic",
  },
  {
    value: "30%",
    label: "forecast accuracy gain",
    note: "supporting Director-level decisions at Bharat Futurist AI",
  },
  {
    value: "29",
    label: "licenses, 6 teams",
    note: "covered by the Gemini adoption system built at PROJXON",
  },
  {
    value: "35%",
    label: "manual effort removed",
    note: "via automated SQL reporting pipelines across 5+ sources",
  },
] as const;

/**
 * kind drives how prominently a link is rendered:
 * "live" = a running thing anyone can open, "source" = readable code, "site" = a landing page.
 */
export type WorkLink = {
  label: string;
  /** Compact label, for tight spots like the hero proof row. */
  short: string;
  href: string;
  kind: "live" | "source" | "site";
};

export type Work = {
  slug: string;
  title: string;
  kind: string;
  year: string;
  tagline: string;
  /** One-sentence "why this is hard" framing. */
  premise: string;
  stack: readonly string[];
  links: readonly WorkLink[];
  /** null when the source is private — renders as a stated fact, never a dead link. */
  privateNote: string | null;
  featured: boolean;
  /** Three short facts, for people who scan instead of read. */
  highlights: readonly string[];
  /** Badge shown only when something here is publicly verifiable. null otherwise. */
  status: string | null;
  /** Case-study body. */
  problem: string;
  approach: readonly { heading: string; body: string }[];
  /** The animated pipeline nodes shown on the case-study page. */
  pipeline: readonly string[];
  outcome: readonly string[];
};

export const work: readonly Work[] = [
  {
    slug: "analytics-copilot",
    title: "Analytics Copilot",
    kind: "Evidence-grounded analytics assistant",
    year: "2026",
    tagline:
      "Answers plain-English business questions by routing each query to SQL, document retrieval, or both — and never answers without showing its evidence.",
    premise:
      "An analytics assistant that is confidently wrong is worse than no assistant at all. The hard part is not generating an answer; it is proving the answer.",
    stack: [
      "Python",
      "FastAPI",
      "Claude API",
      "Gemini API",
      "PostgreSQL",
      "pgvector",
      "Streamlit",
    ],
    links: [
      {
        label: "Read the source",
        short: "GitHub",
        href: "https://github.com/Suju75/analytics-copilot",
        kind: "source",
      },
    ],
    privateNote: null,
    featured: true,
    highlights: [
      "SQL, RAG, and combined routing",
      "SELECT-only, read-only guardrails",
      "Routing and numeric eval suite",
    ],
    status: "Source public on GitHub",
    problem:
      "Business users ask questions that live in two different places. “What was churn last quarter?” is a SQL question. “What counts as an active account?” is a documentation question. “Why did churn move?” is both. Most LLM assistants collapse this distinction, hand the model everything, and hope. The result is answers that read fluently and cite nothing.",
    approach: [
      {
        heading: "Route before you answer",
        body: "Each incoming question is classified to a path — structured SQL, semantic document search, or a combined route that needs both. Routing happens before generation, so the system knows what kind of evidence an answer will require before it commits to producing one.",
      },
      {
        heading: "Text-to-SQL with defense in depth",
        body: "Generated SQL is not trusted by default. The layer enforces SELECT-only statements against a read-only connection, applies query timeouts, and auto-retries on failure rather than surfacing a broken query to the user. The guardrails are layered so that no single check is the only thing standing between a model and the database.",
      },
      {
        heading: "Retrieval that stays local",
        body: "Documentation is embedded with local embedding models and searched semantically over pgvector, keeping the retrieval path inside Postgres rather than adding a separate vector service to operate.",
      },
      {
        heading: "Routing and numeric evaluation",
        body: "A dedicated eval suite scores two things that actually matter in analytics: whether the router picked the right path, and whether the numbers in the final answer are correct. Accuracy claims come from the suite, not from impressions.",
      },
    ],
    pipeline: ["Parse", "Route", "Retrieve", "Verify", "Answer"],
    outcome: [
      "Every response carries its evidence — the SQL that ran, the data table it returned, the chart, and source links back to the documents used.",
      "Routing and number-accuracy are measured by an eval suite rather than asserted.",
      "Guardrails are layered (SELECT-only, read-only role, timeouts, auto-retry) so a single failed check cannot expose the database.",
    ],
  },
  {
    slug: "gym-buddy-os",
    title: "The Gym Buddy OS",
    kind: "Multi-tenant iOS product, shipped",
    year: "2026",
    tagline:
      "A multi-tenant gym-management app with owner, trainer, and member roles — built, released to the Apple App Store, and running.",
    premise:
      "Multi-tenancy is where most side projects quietly break. One gym seeing another gym's members is not a bug you get to fix later.",
    stack: [
      "React Native (Expo)",
      "Prisma",
      "PostgreSQL",
      "Docker",
      "EAS Build",
      "App Store Connect",
    ],
    links: [
      {
        label: "Get it on the App Store",
        short: "App Store",
        href: "https://apps.apple.com/app/the-gym-buddy-os/id6808116640",
        kind: "live",
      },
      {
        label: "thegymbuddy.in",
        short: "Site",
        href: "https://thegymbuddy.in",
        kind: "site",
      },
    ],
    privateNote: "Source is private — walkthrough available on request.",
    featured: true,
    highlights: [
      "Public release on the App Store",
      "Owner, trainer, member roles",
      "Per-record tenant isolation",
    ],
    status: "Live on the Apple App Store",
    problem:
      "Independent gyms run on spreadsheets and WhatsApp. Replacing that means one system serving three different people — an owner who needs the business view, a trainer who needs their own roster, and a member who should only ever see themselves — while guaranteeing that no gym's data is ever visible to another.",
    approach: [
      {
        heading: "Tenant isolation on every record",
        body: "Per-tenant data isolation is enforced at the record level rather than filtered in the UI, so isolation does not depend on a screen remembering to scope its query.",
      },
      {
        heading: "Three roles, three products",
        body: "Owner, trainer, and member each get a distinct role-based dashboard. The same backend serves all three, with the role determining not just what is displayed but what is retrievable.",
      },
      {
        heading: "Shipping is part of the engineering",
        body: "Built the backend API and the release pipeline end to end — EAS builds through App Store Connect, to an actual public v1.0 release rather than a TestFlight demo.",
      },
    ],
    pipeline: ["Auth", "Resolve tenant", "Scope by role", "Serve"],
    outcome: [
      "Publicly available to install from the Apple App Store.",
      "Strict per-tenant data isolation enforced on every record.",
      "Role-based dashboards for owner, trainer, and member off one backend.",
    ],
  },
  {
    slug: "stock-selection-agent",
    title: "Indian Stock Selection Agent",
    kind: "Agentic research & decision routing",
    year: "2026",
    tagline:
      "A Nifty 100 research pipeline that screens, proposes, challenges, and checks each candidate—with explicit routes for retrying or producing no signal.",
    premise:
      "A proposal is only the start. The engineering challenge is deciding what evidence it needs, what can reject it, and when to stop searching.",
    stack: [
      "Python",
      "Claude API",
      "pandas",
      "APScheduler",
      "SQLite",
      "Telegram Bot API",
      "Streamlit",
    ],
    links: [],
    privateNote: "Private repo — available on request.",
    featured: false,
    highlights: [
      "Nifty 100 screening universe",
      "Bounded retries + explicit abstention",
      "Paper-trading only",
    ],
    status: null,
    problem:
      "An LLM can produce a convincing stock thesis without a reliable process behind it. This project makes that process explicit: filter the universe, constrain the context, challenge a proposal, record the rejection reasons, and stop when the evidence or compute budget is insufficient.",
    approach: [
      {
        heading: "Route work by cost and responsibility",
        body: "Deterministic indicators narrow the Nifty 100 before Haiku triage. A single Sonnet council call contributes five role-specific perspectives, followed by separate proposal, challenge, and rebuttal stages. The compute budget changes both the proposing model and the candidate-attempt limit.",
      },
      {
        heading: "Make rejection a first-class route",
        body: "Candidate review includes decision validation, optional price sanity checks, a devil’s-advocate challenge, and a checked rebuttal. Configurable memory and ship gates add further rejection points. A failure moves to the next candidate within the attempt limit; the first complete pass ends the search.",
      },
      {
        heading: "Preserve decisions and learn from closures",
        body: "Telegram briefings communicate either the accepted paper-research candidate or a no-signal result. SQLite stores decision traces, rejection reasons, and model usage. With continuous learning enabled, closed paper outcomes feed reflection, historical analogues, and lessons for later reviews.",
      },
    ],
    pipeline: ["Screen", "Triage", "Council", "Review", "Briefing", "Learn"],
    outcome: [
      "An inspectable route from a 100-stock universe to at most one accepted candidate per briefing.",
      "Bounded candidate retries, model-cost controls, explicit rejection reasons, and a no-signal outcome when no attempted candidate passes.",
      "Paper-research delivery through Telegram, with stored traces and an optional feedback loop. No live capital deployed; trading performance is not claimed.",
    ],
  },
  {
    slug: "gemini-adoption-system",
    title: "Gemini AI Adoption System",
    kind: "Built at PROJXON",
    year: "2026",
    tagline:
      "A four-part system that turned Google Workspace admin logs into an executive view of how 29 licenses across 6 teams actually use AI.",
    premise:
      "Companies buy AI licenses and then cannot answer whether anyone uses them. That question is an analytics problem, not an AI problem.",
    stack: [
      "Google Admin Reports API",
      "Google Apps Script",
      "Looker Studio",
      "Gemini",
    ],
    links: [],
    privateNote:
      "Internal client work — architecture discussed at a high level only.",
    featured: false,
    highlights: [
      "29 licenses across 6 teams",
      "Daily automated pipeline",
      "CEO-facing 30/60/90 plan",
    ],
    status: null,
    problem:
      "An organization with Gemini licenses across six teams had no visibility into adoption. Without usage data, leadership cannot tell the difference between a tool that failed and a tool nobody was onboarded onto — and cannot make a defensible call on renewal.",
    approach: [
      {
        heading: "A daily pipeline off the admin logs",
        body: "A scheduled Admin Reports API pipeline pulls usage daily, giving adoption a time series instead of a one-off audit snapshot.",
      },
      {
        heading: "An executive dashboard",
        body: "Usage is surfaced in a dashboard aimed at the people making the renewal decision, covering all 29 licenses across the 6 teams.",
      },
      {
        heading: "A custom analyst Gem",
        body: "Built a custom “AI Usage Analyst” Gem so the adoption data could be questioned conversationally rather than only read as charts.",
      },
      {
        heading: "A plan, not just a report",
        body: "Closed the loop with a CEO-facing 30/60/90 adoption plan, so the analysis produced a decision instead of a deck.",
      },
    ],
    pipeline: ["Admin API", "Daily pull", "Dashboard", "30/60/90 plan"],
    outcome: [
      "Daily, scheduled adoption reporting replacing manual audits.",
      "Coverage of 29 licenses across 6 teams in one executive view.",
      "A CEO-facing 30/60/90 adoption plan derived from the data.",
    ],
  },
];

export const featuredWork = work.filter((w) => w.featured);

/**
 * Anything a stranger can open and check for themselves, paired with its project.
 * Derived from `work` so the hero can never advertise a link the case study lacks.
 */
export const liveProof = work.flatMap((w) =>
  w.links
    .filter((l) => l.kind !== "site")
    .map((l) => ({ project: w.title, ...l })),
);

export type ExperienceItem = {
  role: string;
  org: string;
  orgNote?: string;
  period: string;
  place: string;
  current?: boolean;
  bullets: readonly string[];
};

export const experience: readonly ExperienceItem[] = [
  {
    role: "AI Specialist Intern",
    org: "PROJXON",
    orgNote: "Business Optimization Consulting",
    period: "June 2026 — Present",
    place: "Dallas, TX",
    current: true,
    bullets: [
      "Built a four-part Gemini AI-usage solution covering 29 licenses across 6 teams: a daily Admin Reports API pipeline, an executive dashboard, a custom “AI Usage Analyst” Gem, and a CEO-facing 30/60/90 adoption plan.",
      "Automated a social-analytics pipeline across 3 brand accounts (Python + Meta Graph API → pandas → Sheets → Looker Studio), replacing manual weekly reporting with scheduled dashboards.",
      "Evaluated four LLM families (Claude, Gemini, Grok, GPT) against business use cases and standardized reusable prompts and workflows for team adoption.",
    ],
  },
  {
    role: "Data Analyst",
    org: "Bharat Futurist AI",
    period: "June 2024 — June 2025",
    place: "Surat, India",
    bullets: [
      "Analyzed 120K+ operational records with SQL (CTEs, window functions) and Python to build forecasting logic, improving accuracy 30% and supporting Director-level decisions.",
      "Automated SQL reporting pipelines across 5+ sources and built KPI-driven Power BI dashboards, cutting manual effort 35% and turnaround time 30%.",
    ],
  },
  {
    role: "Software & Data Intern",
    org: "TOPS Technologies Pvt. Ltd",
    period: "March 2024 — June 2024",
    place: "Surat, India",
    bullets: [
      "Built end-to-end full-stack web apps (Java, Spring Boot, React, MySQL) with RESTful APIs and dynamic UIs.",
      "Automated SQL reporting workflows and optimized complex queries, reducing manual reporting effort 60% and improving reliability.",
    ],
  },
];

export const education = [
  {
    school: "The University of Texas at Dallas",
    degree: "M.S. Business Analytics, AI Flex",
    detail: "GPA 3.4 · GRE 336/340",
    period: "Aug 2025 — May 2027",
    place: "Dallas, TX",
  },
  {
    school: "Veer Narmad South Gujarat University",
    degree: "Bachelor of Computer Applications",
    detail: null,
    period: "Feb 2025",
    place: "Surat, India",
  },
] as const;

export const capabilities = [
  {
    group: "AI / GenAI",
    lead: true,
    items: [
      "RAG",
      "Text-to-SQL",
      "LLM Tool-Calling",
      "AI Agents & Automations",
      "Prompt Engineering",
      "Vector Databases (pgvector)",
      "Embeddings & Semantic Search",
      "LLM Evaluation & Guardrails",
      "Claude / OpenAI / Gemini APIs",
    ],
  },
  {
    group: "Programming & Backend",
    lead: false,
    items: [
      "Python (Pandas, NumPy, scikit-learn)",
      "SQL (CTEs, Window Functions)",
      "FastAPI",
      "Java",
      "Spring Boot",
      "React / React Native",
      "Streamlit",
      "REST APIs",
    ],
  },
  {
    group: "BI & Data",
    lead: false,
    items: [
      "Power BI",
      "Tableau",
      "Looker Studio",
      "ETL",
      "Data Modeling",
      "KPI Reporting",
      "Statistical Analysis",
      "Predictive Modeling",
    ],
  },
  {
    group: "Tools & Databases",
    lead: false,
    items: [
      "PostgreSQL",
      "MySQL",
      "Prisma",
      "Docker",
      "Git / GitHub",
      "Google Apps Script",
      "Meta Graph API",
      "Excel",
    ],
  },
] as const;

export const certifications = [
  "Google Professional Data Analytics Certificate",
  "Prompt Engineering for ChatGPT",
] as const;
