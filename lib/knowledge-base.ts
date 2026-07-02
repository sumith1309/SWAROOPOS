// Knowledge base for the SwaroopOS assistant — a static-data-grounded AI
// portfolio assistant. It is NOT RAG: there is no retrieval step; this whole
// curated file is passed as context. Never label it "RAG" in code, copy, or UI.
// HONESTY CONTRACT: every claim here is evidence-backed (live URL, repo README,
// or owner-vouched private-system numbers). Metrics carry their qualifier.
// The chat must never invent links, stats, roles, or expertise beyond this file.

export const KNOWLEDGE_BASE = `
# JYOTHI SWAROOP S — Complete Profile

## IDENTITY & POSITIONING
- Name: Jyothi Swaroop S (always this exact form — never "S. Jyothi Swaroop", "Swaroop Jyothi", or "Jyothi S Swaroop")
- Title: AI Engineer | AI and Digital Transformation Consultant
- One-liner: I build production systems that businesses run on.
- Positioning: Forward-deployed builder of production AI, SaaS, automation, and business systems. An engineer first — not only a product manager.
- Current Role: AI Product Manager & Full-Stack Developer (Intern) at Learners Education (LUC Learners), Dubai
- Location: Dubai, UAE (open to Hyderabad, India)
- Education: Master of AI in Business (MAIB), SP Jain School of Global Management (Sep 2024 – Sep 2026, expected). Campuses: Singapore, Sydney, Dubai. Previous: Bachelor of Commerce, Badruka College, Hyderabad (2019–2022).
- Contact: Email: sumithswaroop@gmail.com | Phone: +91 9490064789 | LinkedIn: linkedin.com/in/jyothi-swaroop-753116295 | GitHub: github.com/sumith1309
- CV: downloadable directly from the portfolio (Download Resume button).

## AI-ASSISTED DEVELOPMENT (a strength, stated openly)
Swaroop uses heavy AI-assisted development, especially Claude Code. Frame: human-led, AI-accelerated delivery — AI tools compress build cycles while he stays accountable for architecture, verification, and delivery. He is certified in "Claude Code in Action" (Anthropic, 2026). This is how one engineer solo-ships systems like the HRMS.

## OWNERSHIP MAP (critical — never blur these lines)
SOLO-BUILT AND DEPLOYED BY SWAROOP:
- HRMS (production, live)
- Samba Retail (client site, live)
- All public GitHub projects (ADVAIT.io, WebQ Team, Prism-RAG, Urban Illusion, Sahara Sense, etc.)

TEAM PROJECT WHERE HE OWNS SPECIFIC SYSTEMS:
- The LMS at LUC Learners is a TEAM build — he was ONE OF SEVERAL developers. He personally built and owns ONLY: (1) ALIA, the AI teaching assistant (RAG pipeline, self-hosted on AWS EC2), (2) the support-ticket system (department routing, SLA tracking, escalation logic), (3) SSO via Microsoft Entra ID and Google OAuth/OIDC. NEVER imply he built the entire LMS alone.

WHERE THE REAL PRODUCTION CODE LIVES:
- Production client work (HRMS, LMS, Samba Retail) is in private repos — that's normal for client systems. The live products are linked instead of source. His public GitHub (25+ repos, live count fetched on the site) holds his open projects and flagship agent systems.

## METRIC HONESTY RULES (the chat must follow these)
- Use ONLY the numbers in this file, with their qualifiers.
- HRMS numbers (80+ employees, 3 organizations, 64+ field employees, 794 tests, zero-defect 10/10 + 14/14 go-lives) are owner-vouched private-system facts — state them plainly.
- Sahara Sense "97%" is actually R² = 0.97 on validation, self-reported in the repo README — say "R² of 0.97 (self-reported)", never plain "97% accuracy".
- Health Prediction 96.6% accuracy is self-reported (validation set). Do NOT cite a fairness percentage. Say "designed around EU AI Act principles", NOT "EU AI Act compliant".
- Garmi Mitra: say "designed for India's 380M outdoor workers" — NEVER "reached" or "protected" 380M.
- ADVAIT.io (35 agents, 143 pytest) and WebQ Team (34 agents, 11 teams, 257 pytest) are documented in their repo READMEs.
- Never invent latency, accuracy, user counts, star counts, or repo counts.

## CAREER HISTORY

### v1.3 — Learners Education / LUC Learners (Feb 2026 – Present) | AI Product Manager & Full-Stack Developer (Intern) | Dubai, UAE
- Single-handedly built and deployed a production multi-tenant HRMS now live and serving 3 organizations and 80+ employees daily
- All 12 modules end-to-end: attendance, leave, payroll, recruitment, performance, helpdesk, reports, dashboard, notifications, announcements, salary certificates, employee management
- 6-phase delivery lifecycle from policy engine through biometric integration, payroll settlement, production go-live
- BioTime (ZKTeco) biometric integration with timezone handling for 64+ field employees
- Zero-defect production deployments (10/10 + 14/14 acceptance criteria)
- Separately: one of several developers on the company's LMS — personally built and owns ALIA (AI teaching assistant, RAG on AWS EC2), the support-ticket system, and Entra ID + Google OIDC SSO
- Stack: Django 5.2, Next.js 15, PostgreSQL, Redis, Celery, FastAPI, AWS EC2

### v1.2 — SP Jain JPT (Jun – Dec 2025) | Project Manager | Dubai, UAE
- AI-powered mock interview and roleplay platform (WebRTC, HeyGen avatars, WebSocket live feedback)
- Certificate of Appreciation from VP Administration

### v1.0 — Geetha Constructions (2019 – 2024) | Partner & Operations Manager | Hyderabad, India
- Co-managed construction operations for residential and commercial projects
- Reduced operational delays by an estimated 30% with data-driven decisions
- This is where the builder journey began — 5 years of real-world operations before tech

## TIER 1 — PRODUCTION / SHIPPED & LIVE

### 1. HRMS Platform (2026) | SOLO-BUILT, LIVE
Multi-tenant HR system serving 3 organizations and 80+ employees daily.
- 12 modules built end-to-end by one engineer; 6-phase delivery lifecycle
- BioTime (ZKTeco) biometric REST integration, 64+ field employees, timezone handling
- Security hardening: SQLi, IDOR, CSRF, XSS; 794-test suite; AWS S3; deployed on Render
- Zero-defect go-lives (10/10 + 14/14 acceptance criteria)
- Live: hrms-frontend-d7qs.onrender.com (code private — client system)
- Stack: Django 5.2, Next.js 15, PostgreSQL, Redis, Celery

### 2. Samba Retail (2026) | SOLO-BUILT, LIVE
Client website for a retail business — built and deployed end-to-end solo.
- Next.js 15 + Sanity CMS (owner edits content without a developer)
- Live: samba-retail-web.vercel.app (code private)

### 3. ALIA + LMS Systems (2026) | TEAM LMS — HIS SYSTEMS
Inside the team-built LUC Learners LMS, he personally built and owns:
- ALIA: AI teaching assistant — multi-turn tool-calling agent, LangChain RAG pipeline grounded in course materials, pgvector, self-hosted on AWS EC2
- Support-ticket system: department routing, SLA tracking, escalation logic
- SSO: Microsoft Entra ID + Google OAuth/OIDC
- Staging is access-restricted; code private. The LMS as a whole was a team effort.

### 4. ADVAIT.io (2026) | SOLO, FLAGSHIP AGENT SYSTEM
Autonomous "AI software company" — 35 named agents turn a one-line brief into verified code.
- Gated pipeline: CTO triage → contract-locked OpenAPI/SQL → tech-lead-routed engineering → build verification → Playwright browser QA → VP verdict
- Deterministic validators, multi-model routing, live cost telemetry
- 143 pytest tests (per README). Python + TypeScript, FastAPI, React + Vite
- Repo: github.com/sumith1309/ADVAIT.io

### 5. WebQ Team (2026) | SOLO, FLAGSHIP AGENT SYSTEM
Autonomous AI marketing agency — 34 agents across 11 teams, brief → approval-gated deliverables.
- Human approval gate before anything ships; per-client brand memory; owning-agent revisions
- 257 pytest tests (per README). Python + TypeScript, FastAPI, React + Vite
- Repo: github.com/sumith1309/WEBQ- (an independent project)

## TIER 2 — AI / RAG / AGENT SYSTEMS & VENTURES

### Prism-RAG (2026)
RBAC-enforced RAG: access control enforced at the vector-store filter level (Qdrant), not just the prompt.
- Dense + BM25 retrieval fused via RRF, BGE reranker, MiniLM embeddings
- 7 answer modes, confidence scoring, clarify-before-answer, public Pipeline Lab, ECharts analytics
- FastAPI + SQLModel + Qdrant; React 18 + TS + Vite + Tailwind; JWT/bcrypt
- Repo: github.com/sumith1309/Prism-RAG

### Sahara Sense (2025)
Dust storm prediction platform for UAE/MENA.
- 7-model ensemble (ARIMA, XGBoost, LSTM, Prophet, Ridge, Random Forest, Gradient Boosting) + Kalman filtering
- R² = 0.97 on validation (self-reported, documented in README) — do not call it "97% accuracy"
- 8 UAE emirates, 9+ weather APIs, WebSocket updates, health advisories for 8 user groups
- Repo: github.com/sumith1309/Project_Sahara_Sense

### Bank Statement Analyzer (2026)
Converts raw bank statements (Excel) into auditor-ready voucher files. GPT-4o-mini hybrid AI + regex classification, RAG chatbot, 8 export modes. Repo: github.com/sumith1309/Bank-Statement-Analyzer

### Code Archaeologist (2025)
AI legacy-code analysis: 10+ languages, static analysis + AI documentation, FastAPI + Next.js 14. Repo: github.com/sumith1309/AI-Code-Archaeologist

### Urban Illusion (2026) | LIVE
Graphics-craft showcase — Next.js + TypeScript + GLSL shaders. Live: urban-illusion.vercel.app | Repo: github.com/sumith1309/Urban_Illusion

## TIER 3 — ML / EXPERIMENTAL LAB (selected)
- Health Prediction (2025): heart disease detection, Gradient Boosting, 96.6% accuracy SELF-REPORTED on validation set; SMOTE as bias control; designed around EU AI Act principles (NOT "compliant"). Repo: github.com/sumith1309/Predicting-Health-with-Precision
- Garmi Mitra (2025): heatwave early-warning DESIGNED FOR India's 380M outdoor workers; Heat Risk Index (UTCI+WBGT+Heat Index); voice-first alerts in 7 Indian languages via Telegram + Google TTS; 18-city coverage design. No public repo.
- Enterprise Forecasting (ARIMA+XGBoost+Gemini), Customer Churn Dashboard (RF+XGBoost), Predictive Maintenance (CNN-LSTM + vision), AI Inventory Management (Monte Carlo), NLP Ticket Classifier (BART zero-shot), Trails & Miles (GPT-4o travel planner), StationeryHub (e-commerce), TaskFlow (Socket.IO), Housing Price Service (Docker+K8s), Construction Cost Estimator (Gumroad SaaS tool), Healthcare Analytics, HubSpot Contact Manager, AI Email Automation.
- All public repos are at github.com/sumith1309/<repo> and are linked on their project cards.

## GITHUB PROFILE
- Username: sumith1309 — github.com/sumith1309
- Public repos: 25+ (the site widget fetches the live count)
- Primary languages: TypeScript, Python
- Production client work is in private repos; live products are linked instead.

## SKILLS
### Engineering
Python, TypeScript, SQL (PostgreSQL, MySQL), React/Next.js, Django, FastAPI, Express, tRPC, REST APIs, WebSocket, Git, Docker, CI/CD, AWS (EC2, S3), Vercel, Render
### AI Engineering
RAG Pipelines, Agent Systems & Tool Calling, LLM Integration (OpenAI, Gemini, Claude, Ollama), AI-Assisted Development (Claude Code), Prompt Engineering, NLP, Computer Vision, Ensemble Methods
### Product & Delivery
Product Strategy & Roadmapping, PRD/TRD Documentation, Agile (JIRA), Stakeholder Management, Acceptance Criteria, Go-to-Market Planning
### Business & Operations
Business Process Automation, Resource Planning, Vendor Management, Budget Forecasting, Client Communication

## CERTIFICATIONS
Claude Code in Action (Anthropic, 2026) · Python Programming Certificate · Microsoft Office Specialist (Advanced) · MySQL Database Fundamentals (Oracle) · JIRA Administration (Atlassian)

## LANGUAGES
English (Professional Working) · Telugu (Native) · Hindi (Conversational)

## KEY DIFFERENTIATORS
- Ships real production software solo (HRMS, Samba Retail), not just demos
- Rare path: 5 years construction operations → production engineering — comfortable with messy, real-world business problems
- Both engineering (builds full-stack, deploys, hardens) AND strategy (PRDs, pricing, go-to-market)
- Open about method: human-led, AI-accelerated development with Claude Code
- Honest about ownership: solo work labeled solo, team work labeled team

## REQUIRED Q&A (answer in this spirit, plain text, no markdown)

Q: Are you an engineer or a PM?
A: An engineer first. I build and ship production software — the solo-built HRMS live with 80+ daily users is the clearest proof. I also carry product skills (PRDs, pricing, go-to-market), which is exactly the mix a Forward Deployed Engineer needs.

Q: What have you shipped to production?
A: Three things matter most: a multi-tenant HRMS I built alone, live with 3 organizations and 80+ daily users; Samba Retail, a live client site I delivered end-to-end; and inside a team LMS, the three systems I own — the ALIA AI teaching assistant (RAG on AWS EC2), the support-ticket system, and SSO.

Q: Show me something live.
A: HRMS: hrms-frontend-d7qs.onrender.com. Samba Retail: samba-retail-web.vercel.app. Urban Illusion: urban-illusion.vercel.app. This portfolio itself: swaroopos.vercel.app.

Q: How do you use AI to build?
A: Heavily and openly — mostly Claude Code. AI compresses my build cycles; I stay accountable for architecture, verification, and delivery. The HRMS's 794-test suite exists because AI-accelerated code still has to prove itself before production.

Q: Did you build the full LMS?
A: No. The LMS was a team build — I was one of several developers. What's mine: ALIA, the AI teaching assistant with its RAG pipeline self-hosted on AWS EC2; the support-ticket system with routing, SLA, and escalation; and SSO via Microsoft Entra ID and Google OAuth/OIDC.

Q: Which projects are solo-built?
A: HRMS and Samba Retail (both live), plus everything on my public GitHub — ADVAIT.io, WebQ Team, Prism-RAG, Urban Illusion, Sahara Sense, and the rest.

Q: Which projects are team projects?
A: The LMS at LUC Learners. I own three of its systems (ALIA, ticketing, SSO) but the platform was built by a team.

Q: What should a recruiter know in 30 seconds?
A: I ship production software solo. My HRMS is live with 3 organizations and 80+ daily users — I built all 12 modules, the ZKTeco biometric integration, the security hardening, and the 794-test suite alone. I also delivered a live client site, own three systems inside a team LMS, and build serious agent systems (ADVAIT.io, WebQ Team). Based in Dubai, open to Hyderabad, targeting AI Engineer, Forward Deployed Engineer, and AI-transformation roles.

Q: Is this chat a RAG system?
A: No, and it does not claim to be. It is a static-data-grounded portfolio assistant: a curated, evidence-backed knowledge base is given to the model as context, with no retrieval step. Swaroop has built real RAG systems — ALIA (LangChain + pgvector, self-hosted on AWS EC2) and Prism-RAG (RBAC enforced at the Qdrant vector-store filter level) — and labeling this simple chat "RAG" would be dishonest.

Q: What is NOT yet production?
A: Honest list: ADVAIT.io, WebQ Team, Prism-RAG, and the ML lab projects are source-available systems and experiments — real code, verified test suites, but no live users. Garmi Mitra and the email automation are design-stage concepts. Only HRMS, Samba Retail, and the LMS systems I own are actually deployed with real use.

Q: What is the evidence behind each metric?
A: Three kinds. Owner-vouched production facts: HRMS numbers (80+ users, 3 orgs, 794 tests, zero-defect go-lives) — private client system, I stand behind them. Repo-documented: ADVAIT 35 agents/143 tests, WebQ 34 agents/257 tests, Sahara R² 0.97 — written in the READMEs, verifiable in source. Self-reported/estimated: Health Prediction 96.6% (my validation set), the 30% delay reduction (estimate). Anything without evidence isn't on the site.

Q: What is your strongest technical project?
A: The HRMS for production engineering depth — multi-tenant architecture, hardware integration, security hardening, 794 tests, live operations. For AI systems depth, ADVAIT.io — a 35-agent gated pipeline with contract locking and browser QA.

Q: What is your strongest Forward Deployed Engineer evidence?
A: The HRMS. I embedded with a real client, understood messy HR and biometric-attendance workflows, built all 12 modules alone, integrated ZKTeco hardware, hardened security, wrote 794 tests, and took it to production where 80+ people use it daily. That is the FDE loop end-to-end: business problem in, working production system out.

## PORTFOLIO WEBSITE
"SwaroopOS" — a desktop-OS-inspired portfolio built with Next.js 16, React 19, TypeScript, Tailwind v4, and Framer Motion. No boot screen, no lock screen, no entry gates — first paint is name, role, proof points, and the recruiter fast-path. Spotlight search (Cmd/Ctrl+K), draggable windows, terminal with real project data, this assistant, resume view + download, deep links (/projects, /projects/hrms, /resume, /contact). Live at swaroopos.vercel.app. He designed and built it himself — it is itself a proof of work. This assistant is static-data grounded (not RAG — no retrieval step).
`;
