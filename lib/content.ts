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
  headline: "I build AI systems that show their evidence.",
  subhead:
    "Applied AI / LLM engineer with an analytics foundation. I work on the unglamorous half of GenAI — query routing, text-to-SQL guardrails, retrieval grounding, and evaluation — so that an answer arrives with the SQL, the table, and the source that produced it.",
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
      "5-stage evidence pipeline",
      "SELECT-only, read-only guardrails",
      "Eval-scored routing accuracy",
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
        heading: "Evaluated, not vibed",
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
      "Public v1.0 on the App Store",
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
      "Live on the Apple App Store as v1.0 — publicly installable, not a prototype.",
      "Strict per-tenant data isolation enforced on every record.",
      "Role-based dashboards for owner, trainer, and member off one backend.",
    ],
  },
  {
    slug: "stock-selection-agent",
    title: "Indian Stock Selection Agent",
    kind: "Multi-agent research pipeline",
    year: "2026",
    tagline:
      "Role-specific agents move Nifty 100 candidates through quantitative filters and an adversarial scoring gate before anything is allowed through.",
    premise:
      "A single LLM asked to pick stocks will agree with itself. Separating the roles that screen, challenge, and decide is what makes the output worth reading.",
    stack: ["Python", "LLM orchestration", "Telegram Bot API"],
    links: [],
    privateNote: "Private repo — available on request.",
    featured: false,
    highlights: [
      "Nifty 100 screening universe",
      "Adversarial scoring gate",
      "Paper-trading only",
    ],
    status: null,
    problem:
      "Screening the Nifty 100 with one model produces confident, unfalsifiable picks. There is no internal disagreement, so nothing filters out the false positives — which is the only failure mode that costs you anything.",
    approach: [
      {
        heading: "Separate the roles",
        body: "Screening, challenging, and deciding are handled by distinct role-specific agents with separate responsibilities, so the component that proposes a candidate is never the component that approves it.",
      },
      {
        heading: "A devil's advocate in the loop",
        body: "Candidates that clear the quantitative filters then face an adversarial scoring gate whose job is to argue against them. Surviving that argument is the bar, not passing a screen.",
      },
      {
        heading: "An explicit ship gate",
        body: "Rather than ranking everything, the pipeline applies explicit ship-gate logic tuned to suppress false positives, and delivers what survives through Telegram.",
      },
    ],
    pipeline: ["Screen", "Filter", "Challenge", "Ship gate"],
    outcome: [
      "Nifty 100 universe narrowed through layered quantitative filters and an adversarial review stage.",
      "Explicit ship-gate logic used to control false positives instead of ranking everything.",
      "Results delivered via Telegram. Paper-trading only — no live capital deployed.",
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
