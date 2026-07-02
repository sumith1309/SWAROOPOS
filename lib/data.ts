export type Domain = "education" | "climate" | "enterprise" | "fintech" | "construction";
export type SystemApp = "about" | "skills" | "terminal" | "contact";
export type AppId = Domain | SystemApp;

/**
 * Honest project categories. "production" requires real users + real
 * deployment; source-only work can never sit there, however impressive.
 */
export type Tier = "production" | "business" | "ai-agents" | "lab" | "concept";

export const CATEGORY_ORDER: Tier[] = ["production", "business", "ai-agents", "lab", "concept"];

export const CATEGORY_LABELS: Record<Tier, string> = {
  production: "In Production",
  business: "Client & Business Systems",
  "ai-agents": "AI & Agent Systems",
  lab: "ML Lab & Experiments",
  concept: "Design-stage Concepts",
};

/** Honest ownership labeling — never imply solo work on team builds. */
export type Ownership = "solo" | "team-owned" | "team";

/** What a visitor can actually open. */
export type ProjectStatus = "live" | "repo" | "private";

/**
 * Metric qualifier. Omitted = plain factual attribute (stack, counts of things
 * in the repo). Any impressive numeric claim must carry a kind.
 */
export type MetricKind = "verified" | "self-reported" | "estimated" | "designed-for";

export interface Metric {
  label: string;
  value: string;
  kind?: MetricKind;
  note?: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  domain: Domain;
  year: string;
  tier: Tier;
  ownership: Ownership;
  ownershipNote?: string;
  status: ProjectStatus;
  description: string;
  metrics: Metric[];
  techStack: { category: string; items: string[] }[];
  features: string[];
  role: string;
  featured: boolean;
  github?: string;
  website?: string;
  caseStudy?: string;
  /** Free hosting that sleeps — show a "may take a few seconds to wake" note. */
  coldStart?: boolean;
  problem?: string;
  impact?: string;
  architecture?: string;
}

/** Status chips per the honest label system. */
export function getStatusChips(p: Product): string[] {
  const chips: string[] = [];
  if (p.status === "live") chips.push(p.tier === "production" ? "Live production" : "Live");
  if (p.tier === "business") chips.push("Business system");
  if (p.id === "samba-retail") chips.push("Client system");
  if (p.tier === "concept") chips.push("Design-stage concept");
  if (p.tier === "lab" && p.status !== "live") chips.push("Experiment");
  if (p.tier === "lab" && p.status === "live") chips.push("Experiment");
  if (p.tier === "ai-agents" && p.status === "repo") chips.push("Source available");
  if (p.ownership === "team-owned") chips.push("Team project · solo-built modules");
  else if (p.ownership === "solo" && p.tier === "production") chips.push("Solo-built");
  return chips;
}

export interface CareerEntry {
  version: string;
  company: string;
  role: string;
  period: string;
  location: string;
  active: boolean;
  highlights: string[];
  stack: string[];
}

export interface DomainInfo {
  id: Domain;
  label: string;
  windowTitle: string;
  color: string;
  description: string;
}

export const DOMAINS: Record<Domain, DomainInfo> = {
  education: {
    id: "education",
    label: "Education",
    windowTitle: "Education Lab",
    color: "#6366F1",
    description: "AI-powered learning and teaching tools",
  },
  climate: {
    id: "climate",
    label: "Climate & Safety",
    windowTitle: "Weather Station",
    color: "#F59E0B",
    description: "Environmental monitoring and prediction systems",
  },
  enterprise: {
    id: "enterprise",
    label: "Enterprise AI",
    windowTitle: "Enterprise Console",
    color: "#8B5CF6",
    description: "Production platforms, agent systems, and business tools",
  },
  fintech: {
    id: "fintech",
    label: "FinTech & Analytics",
    windowTitle: "Trading Floor",
    color: "#10B981",
    description: "Financial analysis and data-driven tools",
  },
  construction: {
    id: "construction",
    label: "Construction & Ops",
    windowTitle: "Site Office",
    color: "#EF4444",
    description: "Where the builder was born — operations to digital transformation",
  },
};

export const SYSTEM_APPS: Record<SystemApp, { label: string; windowTitle: string }> = {
  about: { label: "About", windowTitle: "System Log" },
  skills: { label: "Skills", windowTitle: "System Specifications" },
  terminal: { label: "Terminal", windowTitle: "Terminal" },
  contact: { label: "Contact", windowTitle: "Connect" },
};

export const OWNERSHIP_LABELS: Record<Ownership, string> = {
  solo: "Solo-built & deployed",
  "team-owned": "Team project — systems I own",
  team: "Team project",
};

export const METRIC_KIND_LABELS: Record<MetricKind, string> = {
  verified: "verified",
  "self-reported": "self-reported",
  estimated: "estimated",
  "designed-for": "design target",
};

/* ────────────────────────────────────────────────────────────────────────────
   TIER 1 — PRODUCTION / SHIPPED & LIVE
   Real systems in production, or flagship systems with verified repo evidence.
──────────────────────────────────────────────────────────────────────────── */

const TIER_PRODUCTION: Product[] = [
  {
    id: "hrms",
    name: "HRMS Platform",
    tagline: "Multi-tenant HR system — solo-built, live, 80+ employees daily",
    domain: "enterprise",
    year: "2026",
    tier: "production",
    ownership: "solo",
    status: "live",
    description:
      "Multi-tenant HRMS built and deployed solo, now live and serving 3 organizations and 80+ employees daily. Twelve modules built end-to-end — attendance, leave, payroll, recruitment, performance, helpdesk, reports, dashboard, notifications, announcements, salary certificates, and employee management — delivered through a 6-phase lifecycle from policy engine to production go-live. Integrates BioTime (ZKTeco) biometric devices over REST with timezone handling for 64+ field employees. Hardened against SQL injection, IDOR, CSRF, and XSS, backed by a 794-test suite, with AWS S3 file storage.",
    problem:
      "Multiple organizations needed one HR platform — biometric attendance from field devices, leave, payroll, and helpdesk — where off-the-shelf tools didn't fit their workflows.",
    impact:
      "Live in production with zero-defect go-lives (10/10 and 14/14 acceptance criteria). 80+ employees across 3 organizations run attendance, leave, and payroll on it every day.",
    architecture:
      "Next.js 15 Frontend → Django 5.2 REST API → PostgreSQL → Redis + Celery Workers → BioTime (ZKTeco) REST Integration → AWS S3 Storage → Render Deployment",
    metrics: [
      { label: "Daily Users", value: "80+" },
      { label: "Organizations", value: "3" },
      { label: "Test Suite", value: "794 tests" },
      { label: "Go-lives", value: "Zero-defect" },
    ],
    techStack: [
      { category: "Backend", items: ["Django 5.2", "PostgreSQL", "Redis", "Celery"] },
      { category: "Frontend", items: ["Next.js 15", "TypeScript"] },
      { category: "Infrastructure", items: ["AWS S3", "Render", "BioTime/ZKTeco REST"] },
    ],
    features: [
      "12 modules built end-to-end by one engineer",
      "BioTime (ZKTeco) biometric integration for 64+ field employees",
      "Multi-tenant: 3 organizations on one deployment",
      "Security hardening: SQLi, IDOR, CSRF, XSS",
      "794-test suite; zero-defect production go-lives",
    ],
    role:
      "Built and deployed solo — architecture, all 12 modules, biometric integration, security hardening, and production operations. Code is private (client system); the live product is linked.",
    featured: true,
    website: "https://hrms-frontend-d7qs.onrender.com",
    caseStudy: "/projects/hrms",
    coldStart: true,
  },
  {
    id: "samba-retail",
    name: "Samba Retail",
    tagline: "Client retail website — solo-built, live in production",
    domain: "enterprise",
    // TODO: VERIFY — Samba Retail build year (assumed 2026)
    year: "2026",
    tier: "production",
    ownership: "solo",
    status: "live",
    description:
      "Client website built and deployed solo for a retail business: a Next.js 15 storefront with Sanity CMS so the owner edits content without a developer. Designed, built, and shipped end-to-end; live in production on Vercel.",
    problem:
      "A retail business needed a professional web presence the owner could update without calling a developer.",
    impact:
      "Live client site delivered end-to-end — design, build, CMS setup, and deployment — with content fully editable by the client.",
    architecture:
      "Next.js 15 Frontend → Sanity CMS (client-editable content) → Vercel Deployment",
    metrics: [
      { label: "Delivery", value: "Solo, end-to-end" },
      { label: "CMS", value: "Sanity (client-editable)" },
      { label: "Status", value: "Live" },
    ],
    techStack: [
      { category: "Frontend", items: ["Next.js 15", "TypeScript", "TailwindCSS"] },
      { category: "Content", items: ["Sanity CMS"] },
      { category: "Infrastructure", items: ["Vercel"] },
    ],
    features: [
      "Client-editable content via Sanity CMS",
      "Solo delivery: design → build → deploy",
      "Live production site for a real client",
    ],
    role: "Built and deployed solo for a client. Code is private; the live site is linked.",
    featured: true,
    website: "https://samba-retail-web.vercel.app",
  },
  {
    id: "alia",
    name: "ALIA + LMS Systems",
    tagline: "AI teaching assistant, ticketing & SSO — my systems inside a team-built LMS",
    domain: "education",
    year: "2026",
    tier: "production",
    ownership: "team-owned",
    ownershipNote:
      "The LMS at LUC Learners is a team build — I was one of several developers. These three systems are the parts I personally built and own.",
    status: "private",
    description:
      "Inside a team-built LMS, I personally built and own three systems. ALIA — an AI teaching assistant with a multi-turn tool-calling agent and a RAG pipeline grounded in actual course materials, self-hosted on AWS EC2. The support-ticket system — department routing, SLA tracking, and escalation logic. And single sign-on — Microsoft Entra ID plus Google OAuth/OIDC.",
    problem:
      "Students needed course-grounded AI help and staff needed a support workflow that routed, tracked, and escalated tickets — inside an LMS that also had to speak the organization's identity providers.",
    impact:
      "ALIA answers from real course materials instead of hallucinating; support tickets route to the right department with SLA and escalation; students and staff sign in with their existing Microsoft and Google accounts.",
    architecture:
      "React Frontend → FastAPI → Multi-turn Tool-calling Agent → LangChain RAG Pipeline (course materials) → pgvector Embeddings → PostgreSQL → Redis Cache → Self-hosted on AWS EC2",
    metrics: [
      { label: "Systems I Own", value: "3" },
      { label: "RAG Hosting", value: "Self-hosted · AWS EC2" },
      { label: "SSO", value: "Entra ID + Google OIDC" },
    ],
    techStack: [
      { category: "AI", items: ["LangChain", "RAG Pipeline", "pgvector", "Ollama/LLM"] },
      { category: "Backend", items: ["FastAPI", "PostgreSQL", "Redis"] },
      { category: "Auth", items: ["Microsoft Entra ID", "Google OAuth/OIDC"] },
      { category: "Infrastructure", items: ["AWS EC2 (self-hosted)"] },
    ],
    features: [
      "Multi-turn tool-calling AI agent grounded via RAG in course materials",
      "RAG stack self-hosted on AWS EC2",
      "Support tickets: department routing, SLA, escalation",
      "SSO: Microsoft Entra ID + Google OAuth/OIDC",
    ],
    role:
      "One of several developers on the LMS. I built ALIA end-to-end (agent, RAG pipeline, EC2 hosting), the support-ticket system, and both SSO integrations. Staging is access-restricted; code is private.",
    featured: true,
  },
  {
    id: "advait",
    name: "ADVAIT.io",
    tagline: "Autonomous AI software company — 35 agents from brief to verified code",
    domain: "enterprise",
    year: "2026",
    tier: "ai-agents",
    ownership: "solo",
    status: "repo",
    description:
      "An autonomous 'AI software company': 35 named agents across departments turn a one-line brief into working, verified code through a gated pipeline — CTO triage, contract-locked OpenAPI/SQL, tech-lead-routed engineering, build verification, Playwright browser QA, and a VP verdict. Deterministic validators and multi-model routing keep agents honest; live cost telemetry tracks spend per run.",
    problem:
      "Single-agent code generation drifts: no contracts, no verification, no accountability. Turning a brief into working software needs structure, not a bigger prompt.",
    impact:
      "A brief goes in; contract-checked, build-verified, browser-tested code comes out — enforced by deterministic validators rather than trust-me output, with cost telemetry on every run.",
    architecture:
      "Brief → CTO Triage → Contract Lock (OpenAPI + SQL) → Tech-Lead Routing → Engineering Agents → Build Verification → Playwright Browser QA → VP Verdict",
    metrics: [
      { label: "Named Agents", value: "35", kind: "verified", note: "per repo README" },
      { label: "Tests", value: "143 pytest", kind: "verified", note: "per repo README" },
      { label: "Browser QA", value: "Playwright" },
      { label: "Contracts", value: "OpenAPI + SQL locked" },
    ],
    techStack: [
      { category: "Backend", items: ["Python", "FastAPI", "pytest"] },
      { category: "Frontend", items: ["TypeScript", "React", "Vite"] },
      { category: "AI", items: ["Multi-model Routing", "Deterministic Validators", "Cost Telemetry"] },
      { category: "QA", items: ["Playwright", "Build Verification"] },
    ],
    features: [
      "35 named agents in a gated, department-style pipeline",
      "Contract-locked OpenAPI + SQL before any code is written",
      "Build verification + Playwright browser QA before the VP verdict",
      "Deterministic validators and multi-model routing",
      "Live cost telemetry per run",
    ],
    role:
      "Built end-to-end with AI-assisted development (Claude Code) — agent architecture, gated pipeline, validators, and QA harness.",
    featured: true,
    github: "https://github.com/sumith1309/ADVAIT.io",
  },
  {
    id: "webq-team",
    name: "WebQ Team",
    tagline: "Autonomous AI marketing agency — 34 agents, 11 teams, human approval gate",
    domain: "enterprise",
    year: "2026",
    tier: "ai-agents",
    ownership: "solo",
    status: "repo",
    description:
      "An autonomous AI marketing agency: 34 agents across 11 teams turn a brief into approval-gated marketing deliverables. A human approval gate sits before anything ships, per-client brand memory keeps voice consistent across campaigns, and revisions route back to the agent that owns the piece.",
    problem:
      "AI marketing output is generic and unaccountable: no brand memory between requests, no clear owner for revisions, and nothing stopping bad output from shipping.",
    impact:
      "One brief becomes coordinated deliverables from 11 specialist teams — and nothing ships without a human saying yes. Revisions go to the owning agent instead of starting over.",
    architecture:
      "Brief → Team Routing (11 Teams · 34 Agents) → Drafting → Human Approval Gate → Owning-Agent Revisions → Per-Client Brand Memory → Deliverables",
    metrics: [
      { label: "Agents", value: "34", kind: "verified", note: "per repo README" },
      { label: "Teams", value: "11", kind: "verified", note: "per repo README" },
      { label: "Tests", value: "257 pytest", kind: "verified", note: "per repo README" },
      { label: "Shipping", value: "Human approval gate" },
    ],
    techStack: [
      { category: "Backend", items: ["Python", "FastAPI", "pytest"] },
      { category: "Frontend", items: ["TypeScript", "React", "Vite"] },
      { category: "AI", items: ["Per-client Brand Memory", "Owning-Agent Revisions", "Approval Gating"] },
    ],
    features: [
      "34 agents organized into 11 specialist teams",
      "Human approval gate before anything ships",
      "Per-client brand memory across campaigns",
      "Revisions routed to the owning agent",
    ],
    role:
      "Built end-to-end with AI-assisted development (Claude Code) — team architecture, approval workflow, and brand-memory system.",
    featured: true,
    github: "https://github.com/sumith1309/WEBQ-",
  },
];

/* ────────────────────────────────────────────────────────────────────────────
   TIER 2 — SERIOUS AI / RAG / AGENT SYSTEMS & VENTURES
──────────────────────────────────────────────────────────────────────────── */

const TIER_SYSTEMS: Product[] = [
  {
    id: "prism-rag",
    name: "Prism-RAG",
    tagline: "RBAC-enforced RAG — access control at the vector-store filter level",
    domain: "enterprise",
    year: "2026",
    tier: "ai-agents",
    ownership: "solo",
    status: "repo",
    description:
      "RAG where security is structural: role-based access control is enforced at the vector-store filter level (Qdrant), not just in the prompt — users cannot retrieve what they are not allowed to see. Dense and BM25 retrieval are fused with reciprocal rank fusion and reranked with BGE. Seven answer modes, confidence scoring, clarify-before-answer behavior, and a public Pipeline Lab with ECharts analytics.",
    problem:
      "Most 'secure' RAG systems filter in the prompt, which a determined user can talk their way around. Access control has to live in retrieval itself.",
    impact:
      "Documents a user cannot access are never retrieved in the first place — the security boundary is the vector-store filter, not a polite instruction to the model.",
    architecture:
      "React 18 → FastAPI → JWT Auth → RBAC Filter @ Qdrant → MiniLM Embeddings + BM25 → RRF Fusion → BGE Reranker → 7 Answer Modes → Confidence Scoring",
    metrics: [
      { label: "Access Control", value: "Vector-store level" },
      { label: "Answer Modes", value: "7", kind: "verified", note: "per repo README" },
      { label: "Retrieval", value: "Dense + BM25 → RRF" },
      { label: "Reranker", value: "BGE" },
    ],
    techStack: [
      { category: "Backend", items: ["FastAPI", "SQLModel", "Qdrant", "JWT/bcrypt"] },
      { category: "AI", items: ["MiniLM Embeddings", "BGE Reranker", "RRF Fusion", "BM25"] },
      { category: "Frontend", items: ["React 18", "TypeScript", "Vite", "Tailwind", "ECharts"] },
    ],
    features: [
      "RBAC enforced at the Qdrant filter level, not in the prompt",
      "Dense + BM25 retrieval fused via reciprocal rank fusion",
      "BGE reranking, confidence scoring, clarify-before-answer",
      "7 answer modes and a public Pipeline Lab with analytics",
    ],
    role: "Built end-to-end with AI-assisted development (Claude Code).",
    featured: false,
    github: "https://github.com/sumith1309/Prism-RAG",
  },
  {
    id: "sahara-sense",
    name: "Sahara Sense",
    tagline: "Dust storm prediction platform — 7-model ensemble with Kalman filtering (UAE)",
    domain: "climate",
    year: "2025",
    tier: "ai-agents",
    ownership: "solo",
    status: "repo",
    description:
      "Dust storm prediction and monitoring platform designed for the UAE and broader MENA region. A 7-model ensemble (ARIMA, XGBoost, LSTM, Prophet, Ridge, Random Forest, Gradient Boosting) fused with Kalman filtering reports R² = 0.97 on validation (self-reported). Real-time monitoring across 8 UAE emirates with 9+ weather API integrations, WebSocket live updates, and personalized health advisories for 8 user groups.",
    problem:
      "Dust storms in the UAE disrupt transport and pose severe health risks, while existing weather services give generic, delayed alerts with no personalization.",
    impact:
      "Designed for proactive alerts: ensemble forecasts feed personalized health advisories for vulnerable groups — construction workers, asthmatics, outdoor athletes — across all 8 emirates.",
    architecture:
      "Next.js 14 Frontend → FastAPI Backend → 7-Model AI Ensemble (ARIMA, XGBoost, LSTM, Prophet, Ridge, Random Forest, Gradient Boosting) → Kalman Filter Fusion → 9 Weather APIs → WebSocket Real-time Layer → Leaflet Maps",
    metrics: [
      { label: "R² (validation)", value: "0.97", kind: "self-reported", note: "documented in repo README" },
      { label: "AI Models", value: "7" },
      { label: "Weather APIs", value: "9+" },
      { label: "Emirates", value: "8" },
    ],
    techStack: [
      { category: "Frontend", items: ["Next.js 14", "Leaflet", "Recharts"] },
      { category: "Backend", items: ["FastAPI", "WebSocket"] },
      { category: "AI", items: ["7-Model Ensemble", "Kalman Filtering"] },
    ],
    features: [
      "R² = 0.97 on validation (self-reported, documented in README)",
      "7-model ensemble fused with Kalman filtering",
      "9+ weather API integrations across 8 emirates",
      "WebSocket live updates (45ms latency, self-reported)",
      "Personalized health advisories for 8 user groups",
      "Multi-language support (EN/AR)",
    ],
    role: "Built end-to-end: data pipeline, ensemble architecture, real-time frontend, health advisory system.",
    featured: false,
    github: "https://github.com/sumith1309/Project_Sahara_Sense",
  },
  {
    id: "bsa",
    name: "Bank Statement Analyzer",
    tagline: "AI FinTech tool — statement to auditor-ready vouchers",
    domain: "fintech",
    year: "2026",
    tier: "ai-agents",
    ownership: "solo",
    status: "repo",
    description:
      "Full-stack TypeScript application that converts raw bank statements (Excel) into auditor-ready voucher files. Intelligent column detection, hybrid AI + deterministic regex classification, RAG-powered chatbot for transaction querying, interactive Apache ECharts analytics, and 8 Excel export modes with monthly consolidation and ZIP bundling.",
    problem:
      "Accountants and auditors spend hours manually classifying bank transactions and reformatting statements into voucher entries, leading to costly errors and audit delays.",
    impact:
      "Estimated 80% reduction in manual classification time; 8 export modes eliminate repetitive reformatting for audit preparation.",
    architecture:
      "React 19 → Express 5 → GPT-4o-mini (Hybrid AI + Regex) → RAG Chatbot → Apache ECharts → SheetJS Excel Engine → ZIP Bundler",
    metrics: [
      { label: "AI Engine", value: "GPT-4o-mini" },
      { label: "Export Modes", value: "8" },
      { label: "Classification", value: "Hybrid AI + Regex" },
      { label: "Query Interface", value: "RAG Chatbot" },
    ],
    techStack: [
      { category: "Frontend", items: ["React 19", "Apache ECharts"] },
      { category: "Backend", items: ["Express 5", "SheetJS", "Archiver (ZIP)"] },
      { category: "AI", items: ["OpenAI GPT-4o-mini", "RAG Pipeline", "Deterministic Regex Classifier"] },
    ],
    features: ["Hybrid AI + deterministic classification", "RAG-powered chatbot", "8 export functions with month consolidation"],
    role: "Built end-to-end.",
    featured: false,
    github: "https://github.com/sumith1309/Bank-Statement-Analyzer",
  },
  {
    id: "code-archaeologist",
    name: "Code Archaeologist",
    tagline: "AI legacy-code analysis platform",
    domain: "enterprise",
    year: "2025",
    tier: "ai-agents",
    ownership: "solo",
    status: "repo",
    description:
      "AI-powered platform for understanding, documenting, and modernizing legacy codebases. Supports 10+ programming languages with static analysis, intelligent documentation generation, interactive visualizations, and a REST API. FastAPI backend, Next.js 14 frontend, PostgreSQL storage.",
    problem:
      "Engineering teams inherit legacy codebases with zero documentation, spending weeks reverse-engineering business logic before they can safely make changes.",
    impact:
      "Automated analysis across 10+ languages is designed to cut codebase onboarding from weeks to hours and capture tribal knowledge before it walks out the door.",
    architecture:
      "Next.js 14 Frontend → FastAPI Backend → Static Analysis Engine (10+ Languages) → AI Documentation Generator → Interactive Visualization Layer → PostgreSQL Storage → Docker Deployment",
    metrics: [
      { label: "Languages", value: "10+" },
      { label: "Analysis", value: "Static + AI" },
      { label: "Output", value: "Docs + Visualizations" },
      { label: "API", value: "REST" },
    ],
    techStack: [
      { category: "Frontend", items: ["Next.js 14", "TypeScript", "React"] },
      { category: "Backend", items: ["FastAPI", "PostgreSQL", "REST API"] },
      { category: "AI", items: ["Static Analysis Engine", "AI Documentation Generator"] },
      { category: "Infrastructure", items: ["Docker", "Multi-language Parser"] },
    ],
    features: [
      "AI-powered legacy code analysis",
      "10+ language support",
      "Interactive codebase visualizations",
      "Automated documentation generation",
    ],
    role: "Built end-to-end.",
    featured: false,
    github: "https://github.com/sumith1309/AI-Code-Archaeologist",
  },
  {
    id: "urban-illusion",
    name: "Urban Illusion",
    tagline: "Graphics-craft showcase — Next.js + TypeScript + GLSL shaders",
    domain: "enterprise",
    year: "2026",
    tier: "lab",
    ownership: "solo",
    status: "live",
    description:
      "A graphics-intensive web experience built to push browser rendering: custom GLSL shaders inside a Next.js + TypeScript app. A craft piece — live on Vercel.",
    metrics: [
      { label: "Stack", value: "Next.js + GLSL" },
      { label: "Focus", value: "Shader craft" },
      { label: "Status", value: "Live" },
    ],
    techStack: [
      { category: "Frontend", items: ["Next.js", "TypeScript", "GLSL Shaders"] },
      { category: "Infrastructure", items: ["Vercel"] },
    ],
    features: ["Custom GLSL shader work in the browser", "Live deployment on Vercel"],
    role: "Built end-to-end.",
    featured: false,
    github: "https://github.com/sumith1309/Urban_Illusion",
    website: "https://urban-illusion.vercel.app",
  },
];

/* ────────────────────────────────────────────────────────────────────────────
   TIER 3 — ML / NOTEBOOK / EXPERIMENTAL LAB
──────────────────────────────────────────────────────────────────────────── */

const TIER_LAB: Product[] = [
  {
    id: "health",
    name: "Health Prediction",
    tagline: "Heart disease detection — fairness-aware ML, designed around EU AI Act principles",
    domain: "enterprise",
    year: "2025",
    tier: "lab",
    ownership: "solo",
    status: "repo",
    description:
      "ML system for early heart disease detection using Gradient Boosting, reporting 96.6% accuracy on its validation set (self-reported). Uses SMOTE resampling as a bias control across demographics, is designed around EU AI Act principles with risk-management documentation, and ships with an interactive dashboard.",
    problem:
      "Heart disease is the leading cause of death globally, yet early screening tools are inaccessible to primary care and often carry demographic bias.",
    impact:
      "Demonstrates a fairness-aware ML workflow: bias controls via SMOTE, transparent model explanations, and risk documentation modeled on EU AI Act principles.",
    architecture:
      "Patient Data Input → Feature Engineering → SMOTE Resampling (Bias Control) → Gradient Boosting Classifier → Fairness Audit → Risk Management Documentation → React Dashboard",
    metrics: [
      { label: "Accuracy", value: "96.6%", kind: "self-reported", note: "validation set, per README" },
      { label: "Bias Controls", value: "SMOTE resampling" },
      { label: "Compliance", value: "EU AI Act principles" },
    ],
    techStack: [
      { category: "Frontend", items: ["React", "Framer Motion", "TailwindCSS"] },
      { category: "AI", items: ["Gradient Boosting", "SMOTE Resampling", "scikit-learn", "Feature Engineering"] },
      { category: "Compliance", items: ["Risk Documentation", "Fairness Audit", "Model Explanations"] },
    ],
    features: [
      "96.6% validation-set accuracy (self-reported)",
      "SMOTE resampling as a demographic bias control",
      "Designed around EU AI Act principles with risk documentation",
      "Transparent model decision explanations",
    ],
    role: "Built end-to-end: ML pipeline, fairness workflow, documentation, dashboard.",
    featured: false,
    github: "https://github.com/sumith1309/Predicting-Health-with-Precision",
  },
  {
    id: "garmi-mitra",
    name: "Garmi Mitra",
    tagline: "AI heatwave early-warning system — designed for India's outdoor workers",
    domain: "climate",
    year: "2025",
    tier: "concept",
    ownership: "solo",
    status: "private",
    description:
      "AI-driven heatwave warning system designed for India's 380 million outdoor workers, with personalized risk assessment using a composite Heat Risk Index (UTCI + WBGT + Heat Index). Voice-first multilingual alerts in 7 Indian languages via Telegram bot with Google TTS, coverage designs for 18 Indian cities, crowdsourced shelter mapping, and 4 UN SDG-aligned modules.",
    problem:
      "India's outdoor workers — construction, agriculture, delivery — face lethal heatwave risk with no accessible, personalized warning system in their own language.",
    impact:
      "Designed so that voice-first alerts reach workers regardless of literacy, and crowdsourced shelter mapping gives actionable escape routes during heat emergencies.",
    architecture:
      "Next.js 14 → FastAPI → Heat Risk Index (UTCI + WBGT + Heat Index) → Mapbox GL JS → Telegram Bot API → Google TTS (7 languages) → Crowdsourced Shelter DB",
    metrics: [
      { label: "Designed For", value: "380M outdoor workers", kind: "designed-for" },
      { label: "Languages", value: "7" },
      { label: "Cities", value: "18" },
      { label: "UN SDG Modules", value: "4" },
    ],
    techStack: [
      { category: "Frontend", items: ["Next.js 14", "Mapbox GL JS"] },
      { category: "Backend", items: ["FastAPI", "Google TTS"] },
      { category: "Distribution", items: ["Telegram Bot API"] },
    ],
    features: [
      "Composite Heat Risk Index (UTCI + WBGT + Heat Index)",
      "Voice-first multilingual alerts via Telegram bot",
      "7 Indian languages via Google TTS",
      "Crowdsourced shelter mapping",
    ],
    role: "Designed and built end-to-end: risk index, multilingual alerts, Telegram distribution, shelter mapping.",
    featured: false,
  },
  {
    id: "forecasting",
    name: "Enterprise Forecasting",
    tagline: "ARIMA + XGBoost + Gemini AI",
    domain: "fintech",
    year: "2025",
    tier: "lab",
    ownership: "solo",
    status: "repo",
    description:
      "Sales forecasting platform combining 4 ML models (Naïve, ARIMA, Random Forest, XGBoost) with Google Gemini AI-powered insights. Interactive dashboard, seasonality detection, feature importance analysis, synthetic data generator, and CSV import/export.",
    problem:
      "Finance teams rely on spreadsheet-based forecasting with single models, missing seasonal patterns and producing inaccurate projections.",
    impact:
      "4-model ensemble is designed to reduce forecast error versus single-model approaches (estimated 25-35%). Gemini explains trends in plain English for non-technical stakeholders.",
    architecture:
      "Streamlit Dashboard → Python ML Pipeline (Naïve + ARIMA + Random Forest + XGBoost) → Google Gemini AI Insights → Seasonality Detector → CSV Import/Export",
    metrics: [
      { label: "ML Models", value: "4" },
      { label: "AI Insights", value: "Gemini" },
      { label: "Seasonality", value: "Auto-detect" },
      { label: "Data", value: "CSV + Synthetic" },
    ],
    techStack: [
      { category: "Frontend", items: ["Streamlit", "Plotly"] },
      { category: "AI", items: ["ARIMA", "XGBoost", "Random Forest", "Google Gemini"] },
      { category: "Backend", items: ["Python", "Pandas", "scikit-learn", "statsmodels"] },
    ],
    features: ["Multi-model ensemble", "Gemini AI integration", "Seasonality detection"],
    role: "Built end-to-end.",
    featured: false,
    github: "https://github.com/sumith1309/Enterprise-Forecasting",
  },
  {
    id: "churn",
    name: "Customer Churn Dashboard",
    tagline: "Random Forest + XGBoost prediction",
    domain: "fintech",
    year: "2025",
    tier: "lab",
    ownership: "solo",
    status: "repo",
    description:
      "Customer churn prediction dashboard with real-time risk assessment, interactive Chart.js/Plotly visualizations, model performance comparison (Random Forest, XGBoost), three-tier risk classification, and retention recommendations with ROI analysis.",
    problem:
      "Subscription businesses lose 5-7% of customers monthly without early warning, and retention teams lack data-driven prioritization.",
    impact:
      "Three-tier risk classification enables targeted retention campaigns, with ROI analysis quantifying the value of each saved account (improvement figures are estimates).",
    architecture:
      "Python ML Pipeline (Random Forest + XGBoost) → Three-tier Risk Classifier → Chart.js/Plotly Dashboard → ROI Analyzer → Retention Recommender",
    metrics: [
      { label: "Models", value: "RF + XGBoost" },
      { label: "Risk Tiers", value: "3" },
      { label: "Visualizations", value: "Chart.js + Plotly" },
      { label: "Output", value: "ROI Analysis" },
    ],
    techStack: [
      { category: "Frontend", items: ["HTML/CSS", "Chart.js", "Plotly"] },
      { category: "AI", items: ["Random Forest", "XGBoost", "scikit-learn"] },
      { category: "Backend", items: ["Python", "Pandas", "NumPy"] },
    ],
    features: ["Churn prediction", "Feature importance analysis", "Interactive dashboard"],
    role: "Built end-to-end.",
    featured: false,
    github: "https://github.com/sumith1309/customer-churn-dashboard",
  },
  {
    id: "predictive-maintenance",
    name: "Predictive Maintenance",
    tagline: "CNN-LSTM + computer vision",
    domain: "enterprise",
    year: "2025",
    tier: "lab",
    ownership: "solo",
    status: "repo",
    description:
      "End-to-end predictive maintenance system combining 4 approaches: Logistic Regression sensor analysis, CNN-LSTM hybrid time-series detection, Statistical Process Control charting, and 2D CNN visual defect detection. Interactive dashboard with Apache ECharts and in-browser TF.js inference.",
    problem:
      "Manufacturing plants lose significant production capacity to unplanned equipment failures, with reactive maintenance costing far more than planned interventions.",
    impact:
      "Combines sensor anomaly detection with visual defect identification (downtime-reduction figures are projections). In-browser TF.js inference enables monitoring without cloud dependency.",
    architecture:
      "Sensor Data Pipeline → Logistic Regression + CNN-LSTM Hybrid → SPC Control Charts → 2D CNN Visual Inspector → TensorFlow.js In-Browser Inference → Apache ECharts Dashboard",
    metrics: [
      { label: "ML Approaches", value: "4" },
      { label: "Inference", value: "In-browser TF.js" },
      { label: "Detection", value: "Sensor + Visual" },
      { label: "Dashboard", value: "Apache ECharts" },
    ],
    techStack: [
      { category: "Frontend", items: ["HTML/CSS", "Apache ECharts", "TensorFlow.js"] },
      { category: "AI", items: ["CNN-LSTM Hybrid", "Logistic Regression", "2D CNN", "Statistical Process Control"] },
      { category: "Backend", items: ["Python", "TensorFlow", "Keras"] },
    ],
    features: ["CNN-LSTM prediction", "Computer vision inspection", "Statistical process control"],
    role: "Built end-to-end.",
    featured: false,
    github: "https://github.com/sumith1309/Predictive-Maintenance",
  },
  {
    id: "inventory",
    name: "AI Inventory Management",
    tagline: "Monte Carlo simulation",
    domain: "fintech",
    year: "2025",
    tier: "lab",
    ownership: "solo",
    status: "repo",
    description:
      "Inventory management platform with predictive analytics, Monte Carlo simulations (100-10,000 iterations), Bayesian sensitivity analysis, ML demand forecasting (hybrid linear regression + moving average), and a multi-SKU dashboard with reorder point optimization.",
    problem:
      "Supply chain managers set reorder points using static rules-of-thumb, leading to costly overstocking or dangerous stockouts.",
    impact:
      "Monte Carlo simulations quantify demand uncertainty with confidence intervals; carrying-cost reduction figures are estimates.",
    architecture:
      "Demand Data → ML Forecasting (Linear Regression + Moving Average) → Monte Carlo Simulator (100-10K iterations) → Bayesian Sensitivity Analysis → Reorder Point Optimizer → Multi-SKU Dashboard",
    metrics: [
      { label: "Simulations", value: "Up to 10K" },
      { label: "Analysis", value: "Bayesian + Monte Carlo" },
      { label: "Forecasting", value: "Hybrid ML" },
      { label: "Scope", value: "Multi-SKU" },
    ],
    techStack: [
      { category: "Frontend", items: ["Streamlit", "Plotly", "Matplotlib"] },
      { category: "AI", items: ["Monte Carlo Simulation", "Bayesian Analysis", "Linear Regression", "Moving Average"] },
      { category: "Backend", items: ["Python", "NumPy", "SciPy", "Pandas"] },
    ],
    features: ["Monte Carlo demand simulation", "Inventory optimization", "Reorder point calculation"],
    role: "Built end-to-end.",
    featured: false,
    github: "https://github.com/sumith1309/AI_Applications_in_Reorder_Point_Inventory_Management",
  },
  {
    id: "nlp-classifier",
    name: "NLP Ticket Classifier",
    tagline: "Zero-shot classification with SLA tracking",
    domain: "enterprise",
    year: "2025",
    tier: "ai-agents",
    ownership: "solo",
    status: "repo",
    description: "Zero-shot ticket classification using BART-large-mnli with SLA tracking and automated routing.",
    problem:
      "Support teams manually triage and route incoming tickets, causing inconsistent categorization and missed SLAs.",
    impact:
      "Zero-shot approach eliminates the need for labeled training data, enabling deployment without months of data collection (misrouting-reduction figures are projections).",
    architecture: "Python Backend → BART-large-mnli (Zero-shot) → SLA Tracker → Priority Router → Dashboard",
    metrics: [
      { label: "Model", value: "BART-large-mnli" },
      { label: "Approach", value: "Zero-shot" },
      { label: "Training Data", value: "None Required" },
    ],
    techStack: [
      { category: "Backend", items: ["Python", "Flask"] },
      { category: "AI", items: ["BART-large-mnli", "Hugging Face Transformers", "Zero-shot Classification"] },
      { category: "Infrastructure", items: ["SLA Engine", "Priority Routing"] },
    ],
    features: ["Zero-shot classification", "SLA tracking", "Automated routing"],
    role: "Built end-to-end.",
    featured: false,
    github: "https://github.com/sumith1309/NLP_Ticket_Classifier",
  },
  {
    id: "trails-miles",
    name: "Trails & Miles",
    tagline: "AI travel planner with RAG chatbot",
    domain: "enterprise",
    year: "2025",
    tier: "ai-agents",
    ownership: "solo",
    status: "repo",
    description:
      "AI-powered travel planning platform for Indian travellers featuring GPT-4o itinerary generation (day-wise blocks), RAG-powered chatbot with SSE streaming, destination intelligence for 6 countries and 36+ cities, an India-specific visa hub, and 25 domestic city guides.",
    problem:
      "Indian travellers waste hours across fragmented travel blogs, visa portals, and booking sites, with no single platform offering AI-personalized itineraries with India-specific context.",
    impact:
      "Covers 6 countries and 36+ cities with structured day-wise itineraries (time-saving figures are estimates).",
    architecture:
      "Next.js Frontend → Express Backend → GPT-4o Itinerary Engine → RAG Chatbot (SSE Streaming) → Destination Intelligence DB → Visa Hub API",
    metrics: [
      { label: "AI Engine", value: "GPT-4o" },
      { label: "Countries", value: "6" },
      { label: "Cities", value: "36+" },
      { label: "Domestic Guides", value: "25" },
    ],
    techStack: [
      { category: "Frontend", items: ["Next.js", "React", "TailwindCSS"] },
      { category: "Backend", items: ["Express", "Node.js"] },
      { category: "AI", items: ["OpenAI GPT-4o", "RAG Pipeline", "SSE Streaming"] },
    ],
    features: ["AI-powered itinerary generation", "RAG chatbot", "Personalized recommendations"],
    role: "Built end-to-end.",
    featured: false,
    github: "https://github.com/sumith1309/Travel-Itinerary",
  },
  {
    id: "stationeryhub",
    name: "StationeryHub",
    tagline: "B2B/B2C e-commerce with AI search",
    domain: "enterprise",
    year: "2025",
    tier: "lab",
    ownership: "solo",
    status: "repo",
    description: "E-commerce platform with AI-powered search and Razorpay payment integration for B2B and B2C segments.",
    problem:
      "Small stationery businesses lack affordable digital storefronts, while bulk buyers have no efficient way to discover and order supplies.",
    impact:
      "AI-powered search improves product discovery over keyword-only search (estimated); Razorpay enables instant transactions for the Indian market.",
    architecture:
      "React Frontend → Node.js/Express Backend → AI Search Engine → MongoDB Product Catalog → Razorpay Payment Gateway",
    metrics: [
      { label: "Payment", value: "Razorpay" },
      { label: "Search", value: "AI-Powered" },
      { label: "Segments", value: "B2B + B2C" },
    ],
    techStack: [
      { category: "Frontend", items: ["React", "TailwindCSS"] },
      { category: "Backend", items: ["Node.js", "Express", "MongoDB"] },
      { category: "Infrastructure", items: ["Razorpay", "AI Search Engine"] },
    ],
    features: ["AI-powered search", "B2B/B2C marketplace", "Razorpay integration"],
    role: "Built end-to-end.",
    featured: false,
    github: "https://github.com/sumith1309/Stationary_Hub",
  },
  {
    id: "ai-email",
    name: "AI Email Automation",
    tagline: "Intelligent email processing & automation",
    domain: "enterprise",
    year: "2025",
    tier: "concept",
    ownership: "solo",
    status: "private",
    description: "AI-powered email automation system for intelligent processing and workflow automation.",
    problem:
      "Knowledge workers spend hours daily reading, classifying, and responding to routine emails.",
    impact:
      "Automated classification and response drafting with priority-based routing (time-saving figures are estimates).",
    architecture:
      "Email Ingestion Layer → NLP Classification Engine → Priority Router → Auto-Response Generator → Workflow Trigger Engine",
    metrics: [
      { label: "Automation", value: "End-to-end" },
      { label: "Classification", value: "NLP-based" },
      { label: "Response", value: "Auto-draft" },
    ],
    techStack: [
      { category: "Backend", items: ["Python", "FastAPI"] },
      { category: "AI", items: ["NLP Classification", "Auto-Response Generation"] },
      { category: "Infrastructure", items: ["Email APIs", "Workflow Engine"] },
    ],
    features: ["Intelligent email classification", "Automated responses", "Workflow automation"],
    role: "Built end-to-end.",
    featured: false,
  },
  {
    id: "taskflow",
    name: "TaskFlow",
    tagline: "Socket.IO real-time task management",
    domain: "enterprise",
    year: "2025",
    tier: "lab",
    ownership: "solo",
    status: "repo",
    description:
      "Real-time task management web application for small teams. Role-based dashboards with Kanban board and analytics, JWT authentication, Socket.IO real-time updates, file attachments via MongoDB GridFS, and online presence indicators.",
    problem:
      "Small teams are underserved by enterprise project management tools that are overpriced and complex, yet need real-time collaboration beyond spreadsheets.",
    impact:
      "Socket.IO real-time updates eliminate manual refresh cycles; role-based dashboards give managers instant visibility.",
    architecture:
      "React Frontend → Express + Socket.IO Backend → JWT Auth Middleware → MongoDB + GridFS → Chart.js Analytics → Online Presence Engine",
    metrics: [
      { label: "Real-time", value: "Socket.IO" },
      { label: "Auth", value: "JWT" },
      { label: "Storage", value: "MongoDB GridFS" },
    ],
    techStack: [
      { category: "Frontend", items: ["React", "Chart.js"] },
      { category: "Backend", items: ["Node.js", "Express", "Socket.IO", "MongoDB", "GridFS"] },
      { category: "Infrastructure", items: ["JWT Authentication", "Online Presence Engine"] },
    ],
    features: ["Real-time task updates via Socket.IO", "Role-based Kanban + analytics dashboards", "File attachments with GridFS"],
    role: "Built end-to-end.",
    featured: false,
    github: "https://github.com/sumith1309/LUC_Progress_Tracker",
  },
  {
    id: "housing",
    name: "Housing Price Service",
    tagline: "Docker + Kubernetes deployment",
    domain: "fintech",
    year: "2025",
    tier: "lab",
    ownership: "solo",
    status: "repo",
    description: "Housing price prediction service deployed with Docker and Kubernetes.",
    problem:
      "ML models for real estate pricing often remain in notebooks and never reach a served API, lacking containerized infrastructure.",
    impact:
      "Containerized deployment demonstrates reproducible ML serving with Kubernetes orchestration.",
    architecture:
      "Feature Input → scikit-learn ML Model → Flask REST API → Docker Container → Kubernetes Orchestration → Load Balancer → Prediction Response",
    metrics: [
      { label: "Deployment", value: "Kubernetes" },
      { label: "Containers", value: "Docker" },
      { label: "API", value: "REST" },
    ],
    techStack: [
      { category: "Backend", items: ["Python", "Flask", "scikit-learn"] },
      { category: "Infrastructure", items: ["Docker", "Kubernetes", "kubectl"] },
      { category: "AI", items: ["ML Regression Model", "Feature Engineering"] },
    ],
    features: ["Containerized deployment", "Kubernetes orchestration", "ML prediction"],
    role: "Built end-to-end.",
    featured: false,
    github: "https://github.com/sumith1309/Housing-Price-Service",
  },
  {
    id: "cost-estimator",
    name: "Construction Cost Estimator",
    tagline: "SaaS tool with payment integration",
    domain: "construction",
    year: "2024",
    tier: "business",
    ownership: "solo",
    status: "repo",
    description:
      "SaaS construction cost estimation tool with Gumroad payment integration (₹499), JWT-secured server-side calculations, itemized 6-component cost breakdowns, construction timeline estimates, and downloadable PDF reports. Zero client-side secrets architecture to prevent bypass.",
    problem:
      "Homeowners and small builders in India get wildly inconsistent cost estimates from contractors, with no transparent tool to validate pricing.",
    impact:
      "Instant cost reports with a 6-component itemized breakdown give homeowners transparency into where every rupee goes.",
    architecture:
      "React Frontend → JWT Auth Gate → Gumroad Payment (₹499) → Express Server-side Calculator → 6-Component Cost Engine → PDF Report Generator → Download",
    metrics: [
      { label: "Payment", value: "Gumroad ₹499" },
      { label: "Cost Components", value: "6" },
      { label: "Security", value: "Zero Client Secrets" },
    ],
    techStack: [
      { category: "Frontend", items: ["React", "TailwindCSS"] },
      { category: "Backend", items: ["Express", "Node.js", "JWT", "PDF Generator"] },
      { category: "Infrastructure", items: ["Gumroad Payment Gateway", "Server-side Calculation Engine"] },
    ],
    features: ["Instant cost estimation", "Payment integration", "Automated quoting"],
    role: "Built to solve real problems experienced during 5 years of construction operations.",
    featured: false,
    github: "https://github.com/sumith1309/instant-house-construction-cost-report",
  },
  {
    id: "healthcare-analytics",
    name: "Healthcare Analytics Platform",
    tagline: "AI model comparison for healthcare KPIs",
    domain: "enterprise",
    year: "2026",
    tier: "lab",
    ownership: "solo",
    status: "repo",
    description:
      "Analytics platform for evaluating and comparing AI model performance across healthcare departments (Radiology, Pathology, Cardiology, Operations). Python analysis engine with statistical comparison, interactive ECharts dashboard, 6-month accuracy forecasts using linear regression, and an executive one-pager report.",
    problem:
      "Hospital IT teams deploy multiple AI models across departments but lack a unified platform to compare performance and justify AI investment.",
    impact:
      "Unified dashboard across 4 departments eliminates siloed model evaluation; forecasting enables proactive retraining decisions.",
    architecture:
      "Python Analysis Engine (Pandas + statsmodels) → Statistical Model Comparator → Linear Regression Forecaster → ECharts Interactive Dashboard → Matplotlib/Seaborn Reports → Executive One-Pager PDF",
    metrics: [
      { label: "Departments", value: "4" },
      { label: "KPIs", value: "4" },
      { label: "Forecast Horizon", value: "6 months" },
      { label: "Models Compared", value: "3" },
    ],
    techStack: [
      { category: "Frontend", items: ["HTML/CSS", "Apache ECharts"] },
      { category: "Backend", items: ["Python", "Pandas", "statsmodels"] },
      { category: "AI", items: ["Linear Regression Forecasting", "Statistical Model Comparison"] },
    ],
    features: ["AI model comparison", "Interactive ECharts dashboard", "6-month accuracy forecasting", "Executive one-pager report"],
    role: "Built end-to-end.",
    featured: false,
    github: "https://github.com/sumith1309/AI-Powered-Healthcare-Analytics",
  },
  {
    id: "hubspot-integration",
    name: "HubSpot Contact Manager",
    tagline: "CRM data cleaning & standardization",
    domain: "enterprise",
    year: "2026",
    tier: "lab",
    ownership: "solo",
    status: "repo",
    description:
      "Web application for managing, cleaning, and standardizing HubSpot CRM contacts. CSV drag-and-drop upload with auto-column mapping, Clean Bot for missing fields, Standardize Bot for name/phone/email normalization, Audit Agent with visual data quality reports, and one-click batch push to HubSpot.",
    problem:
      "Sales teams operate on dirty CRM data — duplicates, inconsistent formats, missing emails — leading to failed outreach and inaccurate reporting.",
    impact:
      "Three automated bots fix data quality issues that would take a sales ops team days to resolve manually.",
    architecture:
      "React + Vite Frontend → CSV Parser (Auto-Column Mapping) → Clean Bot → Standardize Bot → Audit Agent (Visual Reports) → Netlify Functions → HubSpot API (Batch Push)",
    metrics: [
      { label: "Bots", value: "3" },
      { label: "CRM", value: "HubSpot" },
      { label: "Push", value: "One-click Batch" },
    ],
    techStack: [
      { category: "Frontend", items: ["React", "Vite", "TailwindCSS"] },
      { category: "Backend", items: ["Netlify Functions", "HubSpot API"] },
      { category: "AI", items: ["Clean Bot", "Standardize Bot", "Audit Agent"] },
    ],
    features: ["CSV upload with auto-column mapping", "Clean/Standardize/Audit bots", "One-click batch push to HubSpot"],
    role: "Built end-to-end.",
    featured: false,
    github: "https://github.com/sumith1309/-HubSpot-Integration",
  },
];

/* ────────────────────────────────────────────────────────────────────────────
   EXPORTS — production-first ordering everywhere
──────────────────────────────────────────────────────────────────────────── */

const AUTHORED: Product[] = [...TIER_PRODUCTION, ...TIER_SYSTEMS, ...TIER_LAB];

/** All projects, ordered by honest category, then authoring order. */
export const ALL_PRODUCTS: Product[] = CATEGORY_ORDER.flatMap((c) =>
  AUTHORED.filter((p) => p.tier === c)
);

export const PRODUCTION_PRODUCTS = ALL_PRODUCTS.filter((p) => p.tier === "production");
export const BUSINESS_PRODUCTS = ALL_PRODUCTS.filter((p) => p.tier === "business");
export const AGENT_PRODUCTS = ALL_PRODUCTS.filter((p) => p.tier === "ai-agents");
export const LAB_PRODUCTS = ALL_PRODUCTS.filter((p) => p.tier === "lab");
export const CONCEPT_PRODUCTS = ALL_PRODUCTS.filter((p) => p.tier === "concept");

/** Production + business systems — the credibility anchors (CV, featured). */
export const FEATURED_PRODUCTS: Product[] = [...PRODUCTION_PRODUCTS, ...BUSINESS_PRODUCTS];
/** Everything else. */
export const ADDITIONAL_PRODUCTS: Product[] = [...AGENT_PRODUCTS, ...LAB_PRODUCTS, ...CONCEPT_PRODUCTS];

export const LIVE_PRODUCTS = ALL_PRODUCTS.filter((p) => p.status === "live");

export function getProductsByDomain(domain: Domain): Product[] {
  return ALL_PRODUCTS.filter((p) => p.domain === domain);
}

export function getProductsByTier(tier: Tier): Product[] {
  return ALL_PRODUCTS.filter((p) => p.tier === tier);
}

export function getProduct(id: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.id === id);
}

export const CAREER: CareerEntry[] = [
  {
    version: "v1.3",
    company: "Learners Education",
    role: "AI Product Manager & Full-Stack Developer (Intern)",
    period: "Feb 2026 – Present",
    location: "Dubai, UAE",
    active: true,
    highlights: [
      "Single-handedly built and deployed a production multi-tenant HRMS platform now live and serving 3 organizations and 80+ employees daily",
      "Architected and developed all 12 modules end-to-end: attendance, leave, payroll, recruitment, performance, helpdesk, reports, dashboard, notifications, announcements, salary certificates, employee management",
      "Engineered 6-phase delivery lifecycle from policy engine through biometric integration, payroll settlement, and production go-live",
      "Integrated BioTime biometric system (ZKTeco devices) with timezone handling and employee mapping for 64+ field employees",
      "Achieved zero-defect production deployments (10/10 + 14/14 acceptance criteria across all phases)",
      "One of several developers on the company's LMS — personally built and own the ALIA AI teaching assistant (RAG, self-hosted on AWS EC2), the support-ticket system (department routing, SLA, escalation), and SSO via Microsoft Entra ID + Google OAuth/OIDC",
    ],
    stack: ["Django 5.2", "Next.js 15", "PostgreSQL", "Redis", "Celery", "FastAPI", "AWS EC2"],
  },
  {
    version: "v1.2",
    company: "SP Jain JPT",
    role: "Project Manager",
    period: "Jun – Dec 2025",
    location: "Dubai, UAE",
    active: false,
    highlights: [
      "AI-powered mock interview and roleplay platform",
      "WebRTC audio/video with live analytics",
      "HeyGen AI avatars, WebSocket live feedback",
      "Certificate of Appreciation from VP Administration",
    ],
    stack: ["React 18", "Vite", "TailwindCSS", "WebRTC", "WebSocket"],
  },
  {
    version: "v1.0",
    company: "Geetha Constructions",
    role: "Partner & Operations Manager",
    period: "Jun 2019 – Sep 2024",
    location: "Hyderabad, India",
    active: false,
    highlights: [
      "Co-managed construction operations for residential and commercial projects",
      "Reduced operational delays by an estimated 30% with data-driven decisions",
      "Budget forecasting and quality assurance for concurrent deliveries",
      "Built SaaS construction cost estimation tool",
    ],
    stack: [],
  },
];

export const EDUCATION = [
  {
    institution: "SP Jain School of Global Management",
    degree: "Master of AI in Business (MAIB)",
    period: "Sep 2024 – Sep 2026 (Expected)",
    campuses: "Singapore · Sydney · Dubai",
    coursework: ["AI Strategy & Implementation", "MLOps & Model Deployment", "Data-Driven Decision Making", "AI Ethics & Governance"],
  },
  {
    institution: "Badruka College of Commerce and Arts",
    degree: "Bachelor of Commerce (General)",
    period: "Jun 2019 – Jul 2022",
    campuses: "Hyderabad, India",
  },
];

export const SKILLS = {
  Engineering: [
    "Python",
    "TypeScript",
    "SQL (PostgreSQL, MySQL)",
    "React/Next.js",
    "Django",
    "FastAPI",
    "Express",
    "tRPC",
    "REST APIs",
    "WebSocket",
    "Git",
    "Docker",
    "CI/CD",
    "AWS (EC2, S3)",
    "Vercel",
    "Render",
  ],
  "AI Engineering": [
    "RAG Pipelines",
    "Agent Systems & Tool Calling",
    "LLM Integration (OpenAI, Gemini, Claude, Ollama)",
    "AI-Assisted Development (Claude Code)",
    "Prompt Engineering",
    "NLP",
    "Computer Vision",
    "Ensemble Methods",
    "Data Visualization",
    "ETL Processes",
  ],
  "Product & Delivery": [
    "Product Strategy & Roadmapping",
    "PRD/TRD Documentation",
    "Sprint Planning & Agile (JIRA)",
    "Stakeholder Management",
    "Acceptance Criteria",
    "Feature Prioritization",
    "Go-to-Market Planning",
  ],
  "Business & Operations": [
    "Business Process Automation",
    "Resource Planning",
    "Vendor Management",
    "Budget Forecasting",
    "Cross-functional Coordination",
    "Client Communication",
    "Revit (Construction Design)",
  ],
};

export const CERTIFICATIONS = [
  "Claude Code in Action (Anthropic, 2026)",
  "Python Programming Certificate",
  "Microsoft Office Specialist — Word, Excel, PowerPoint (Advanced)",
  "MySQL Database Fundamentals (Oracle)",
  "JIRA Administration (Atlassian)",
];

export const LANGUAGES = [
  { name: "English", level: "Professional Working", percent: 80 },
  { name: "Telugu", level: "Native", percent: 100 },
  { name: "Hindi", level: "Conversational", percent: 60 },
];

export const CONTACT = {
  email: "sumithswaroop@gmail.com",
  phone: "+91 9490064789",
  linkedin: "https://linkedin.com/in/jyothi-swaroop-753116295",
  github: "https://github.com/sumith1309",
  website: "https://swaroopos.vercel.app",
  location: "Dubai, UAE",
  openTo: "Open to Hyderabad",
};

/** Primary identity — used consistently on every surface. */
export const NAME = "Swaroop Jyothi";
export const ROLE_TITLE = "Forward Deployed Engineer & AI Transformation Consultant";

export const HEADLINE = "I build production systems that businesses run on.";
export const SUBHERO =
  "Forward Deployed Engineer and AI Transformation Consultant focused on SaaS platforms, automation systems, AI agents, and applied ML tools. Human-led, AI-accelerated delivery.";
/** @deprecated use SUBHERO */
export const SUBLINE = SUBHERO;

/** Above-the-fold proof — production facts only, full context on the cards. */
export const PROOF_POINTS = [
  "Live HRMS used by 3 organizations and 80+ employees daily",
  "ZKTeco BioTime biometric integration for 64+ field employees",
  "Multi-tenant Django architecture, security hardening, 794 tests",
];

export const PROFESSIONAL_SUMMARY =
  "I build production systems that businesses run on. Solo-built and deployed a multi-tenant HRMS now serving 3 organizations and 80+ employees daily; shipped a live client retail site end-to-end; built the RAG-powered ALIA teaching assistant, support ticketing, and SSO inside a team LMS. I work Forward-Deployed-Engineer style — embedded in the business problem, shipping working software — and use AI-assisted development (Claude Code) to compress build cycles while staying accountable for architecture, verification, and delivery. Master of AI in Business, SP Jain (Dubai), expected September 2026.";

export const NEOFETCH = `       ╔═══╗
       ║ S ║         Swaroop Jyothi
       ╚═══╝         ─────────────────
                      OS: SwaroopOS v3.0
  ███████████         Role: Builder — production systems
  █ SWAROOP █         Focus: Forward Deployed Engineer
  ███████████         Location: Dubai, UAE (open to Hyderabad)
                      Live: HRMS · Samba Retail · Urban Illusion
                      Systems: ${ALL_PRODUCTS.length} across 5 domains
                      AI-assisted: Claude Code
                      Uptime: Since 2019
                      Shell: Next.js 16 + React 19`;
