export type Domain = "education" | "climate" | "enterprise" | "fintech" | "construction";
export type SystemApp = "about" | "skills" | "terminal" | "contact";
export type AppId = Domain | SystemApp;

export interface Product {
  id: string;
  name: string;
  tagline: string;
  domain: Domain;
  year: string;
  description: string;
  metrics: { label: string; value: string }[];
  techStack: { category: string; items: string[] }[];
  features: string[];
  role: string;
  featured: boolean;
  github?: string;
  problem?: string;
  impact?: string;
  architecture?: string;
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
    description: "Production-grade enterprise platforms and tools",
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

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: "alia",
    name: "ALIA",
    tagline: "Adaptive Learning Intelligence Agent — AI-Powered Teaching Assistant Plugin",
    domain: "education",
    year: "2026",
    description:
      "LMS-agnostic AI teaching assistant plugin serving two user segments: students (adaptive learning paths, AI tutoring, struggle detection) and educators (lesson planning, quiz generation, analytics). Features a multi-turn tool-calling AI agent with RAG pipeline grounding responses in actual course materials, real-time analytics engine for learning pattern detection, and automated intervention triggers.",
    problem: "Educators spend 40% of their time on repetitive tasks (quiz creation, grading, lesson planning) while students lack personalized support outside classroom hours.",
    impact: "AI tutoring provides 24/7 personalized learning support. Struggle detection identifies at-risk students before they fall behind. Automated lesson planning saves educators 15+ hours per week.",
    architecture: "React 19 Frontend → FastAPI → Multi-turn Tool-calling Agent → LangChain RAG Pipeline → pgvector Embeddings → PostgreSQL + TimescaleDB → Redis Cache → Ollama/LLM",
    metrics: [
      { label: "Architecture", value: "Multi-turn Agent" },
      { label: "Pipeline", value: "RAG + pgvector" },
      { label: "Users", value: "Students & Educators" },
    ],
    techStack: [
      { category: "Backend", items: ["FastAPI", "PostgreSQL", "TimescaleDB", "pgvector", "Redis"] },
      { category: "AI", items: ["Ollama/LLM", "LangChain", "RAG Pipeline"] },
      { category: "Frontend", items: ["React 19"] },
    ],
    features: [
      "Multi-turn AI agent with tool calling",
      "RAG pipeline grounded in course materials",
      "Real-time analytics engine",
      "Automated intervention detection",
      "Payment gateway integration",
    ],
    role: "Defined product requirements (PRD, TRD), architected the AI agent, designed payment integration with complete documentation",
    featured: true,
  },
  {
    id: "sahara-sense",
    name: "Sahara Sense",
    tagline: "Dust Storm Prediction Platform — AI Environmental Monitoring (UAE)",
    domain: "climate",
    year: "2025",
    description:
      "Enterprise-grade dust storm prediction and monitoring platform designed for UAE and the broader MENA region. Leverages a sophisticated 7-model AI ensemble with Kalman filtering to achieve 97%+ prediction accuracy. Features real-time monitoring across 8 UAE emirates with 9+ weather API integrations, WebSocket live updates at 45ms latency, and personalized health advisories for 8 distinct user groups.",
    problem: "Dust storms in the UAE cause billions in damages annually, disrupt transportation, and pose severe health risks. Existing weather services provide generic, delayed alerts without personalization.",
    impact: "97%+ prediction accuracy enables proactive evacuations and infrastructure protection. Personalized health advisories protect vulnerable populations across 8 user groups including construction workers, asthmatics, and outdoor athletes.",
    architecture: "Next.js 14 Frontend → FastAPI Backend → 7-Model AI Ensemble (ARIMA, XGBoost, LSTM, Prophet, Ridge, Random Forest, Gradient Boosting) → Kalman Filter Fusion → 9 Weather APIs → WebSocket Real-time Layer → Leaflet Maps",
    metrics: [
      { label: "Accuracy", value: "97%" },
      { label: "AI Models", value: "7" },
      { label: "APIs", value: "9+" },
      { label: "Cities", value: "8" },
    ],
    techStack: [
      { category: "Frontend", items: ["Next.js 14", "Leaflet", "Recharts"] },
      { category: "Backend", items: ["FastAPI", "WebSocket"] },
      { category: "AI", items: ["7-Model Ensemble", "Kalman Filtering"] },
    ],
    features: [
      "97%+ prediction accuracy",
      "7-model AI ensemble with Kalman filtering",
      "9+ weather API integrations",
      "WebSocket live updates (45ms latency)",
      "Personalized health advisories for 8 user groups",
      "Multi-language support (EN/AR)",
      "Interactive Leaflet satellite maps",
    ],
    role: "Built end-to-end: data pipeline, AI ensemble architecture, real-time frontend, health advisory system",
    github: "https://github.com/sumith1309/Project_Sahara_Sense",
    featured: true,
  },
  {
    id: "garmi-mitra",
    name: "Garmi Mitra",
    tagline: "AI Heatwave Early Warning System — Social Impact (India)",
    domain: "climate",
    year: "2025",
    description:
      "AI-driven heatwave warning system targeting India's 380 million outdoor workers with personalized risk assessment using a proprietary Heat Risk Index combining UTCI, WBGT, and Heat Index. Delivers voice-first multilingual alerts in 7 Indian languages via Telegram bot with Google TTS integration. Covers 18 Indian cities with crowdsourced shelter mapping and 4 UN SDG-aligned modules.",
    problem: "India's 380M outdoor workers (construction, agriculture, delivery) face lethal heatwave risks with no accessible, personalized warning system in their language.",
    impact: "Voice-first alerts in 7 languages ensure illiterate workers receive life-saving warnings. Crowdsourced shelter mapping provides immediate actionable escape routes during heat emergencies.",
    architecture: "Next.js 14 → FastAPI → Proprietary Heat Risk Index (UTCI + WBGT + Heat Index) → Mapbox GL JS → Telegram Bot API → Google TTS (7 languages) → Crowdsourced Shelter DB",
    metrics: [
      { label: "Workers Targeted", value: "380M" },
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
      "Proprietary Heat Risk Index (UTCI + WBGT + Heat Index)",
      "Telegram bot with voice-first multilingual alerts",
      "7 Indian languages via Google TTS",
      "Crowdsourced shelter mapping",
      "4 UN SDG-aligned modules",
      "18 Indian cities coverage",
    ],
    role: "Designed product end-to-end: risk index algorithm, multilingual alert system, Telegram distribution, crowdsourced mapping",
    featured: true,
  },
  {
    id: "cognispace",
    name: "CogniSpace",
    tagline: "Enterprise AI Service Platform",
    domain: "enterprise",
    year: "2026",
    description:
      "Enterprise-grade AI service platform providing modern development teams with tools and infrastructure to build, deploy, and scale AI-powered applications. Features a premium marketing site with immersive 3D visuals (Three.js), comprehensive developer dashboard, interactive AI playground for model testing, and robust API layer with JWT + API key authentication.",
    problem: "Development teams struggle to integrate AI capabilities without deep ML expertise, complex infrastructure setup, and months of development time.",
    impact: "Self-service onboarding reduces integration time from months to hours. Interactive demos convert enterprise leads through developer engagement.",
    architecture: "Next.js 16 App Router → tRPC + REST API Gateway → Redis Rate Limiter → Auth Middleware (JWT + API Key) → AI Service Layer → PostgreSQL + Redis",
    metrics: [
      { label: "Role", value: "COO & Co-Founder" },
      { label: "UI Components", value: "18" },
      { label: "Billing", value: "Stripe" },
    ],
    techStack: [
      { category: "Frontend", items: ["Next.js 16", "React 19", "TypeScript", "Three.js"] },
      { category: "Backend", items: ["tRPC", "PostgreSQL", "Redis"] },
      { category: "Infrastructure", items: ["Stripe", "AWS ECS Fargate"] },
    ],
    features: [
      "AI playground for model testing",
      "API key management with scope control",
      "Real-time usage analytics dashboard",
      "Stripe-integrated billing system",
      "Immersive 3D landing experience",
      "18 accessible UI components design system",
    ],
    role: "Co-founded. Defined product vision, pricing strategy, and go-to-market. Led end-to-end product development.",
    github: "https://github.com/sumith1309/COGNISPACE",
    featured: true,
  },
];

export const ADDITIONAL_PRODUCTS: Product[] = [
  {
    id: "bsa",
    name: "Bank Statement Analyzer",
    tagline: "AI FinTech Tool — Statement to Voucher Converter",
    domain: "fintech",
    year: "2026",
    description: "Full-stack TypeScript application that converts raw bank statements (Excel) into auditor-ready voucher files. Features intelligent column detection, hybrid AI + deterministic regex classification, RAG-powered chatbot for transaction querying, interactive Apache ECharts analytics, and 8 professional Excel export modes with monthly consolidation and ZIP bundling.",
    metrics: [{ label: "AI", value: "GPT-4o-mini" }, { label: "Exports", value: "8 modes" }],
    techStack: [{ category: "Stack", items: ["React 19", "Express 5", "OpenAI GPT-4o-mini", "Apache ECharts", "SheetJS"] }],
    features: ["Hybrid AI + deterministic classification", "RAG-powered chatbot", "8 export functions with month consolidation"],
    role: "Built end-to-end",
    github: "https://github.com/sumith1309/Bank-Statement-Analyzer",
    featured: false,
  },
  {
    id: "nlp-classifier",
    name: "NLP Ticket Classifier",
    tagline: "Zero-shot Classification with SLA Tracking",
    domain: "enterprise",
    year: "2025",
    description: "Zero-shot ticket classification using BART-large-mnli with SLA tracking.",
    metrics: [{ label: "Model", value: "BART-large-mnli" }],
    techStack: [{ category: "Stack", items: ["Python", "BART", "Zero-shot Classification"] }],
    features: ["Zero-shot classification", "SLA tracking", "Automated routing"],
    role: "Built end-to-end",
    github: "https://github.com/sumith1309/NLP_Ticket_Classifier",
    featured: false,
  },
  {
    id: "trails-miles",
    name: "Trails & Miles",
    tagline: "AI Travel Planner with RAG Chatbot",
    domain: "enterprise",
    year: "2025",
    description: "AI-powered travel planning platform for Indian travellers featuring GPT-4o itinerary generation (day-wise morning/afternoon/evening blocks), RAG-powered chatbot with SSE streaming, destination intelligence for 6 countries and 36+ cities, India-specific visa hub, and 25 domestic city guides.",
    metrics: [{ label: "AI", value: "GPT-4o" }],
    techStack: [{ category: "Stack", items: ["GPT-4o", "RAG", "Full-stack"] }],
    features: ["AI-powered itinerary generation", "RAG chatbot", "Personalized recommendations"],
    role: "Built end-to-end",
    github: "https://github.com/sumith1309/Travel-Itinerary",
    featured: false,
  },
  {
    id: "stationeryhub",
    name: "StationeryHub",
    tagline: "B2B/B2C E-commerce with AI Search",
    domain: "enterprise",
    year: "2025",
    description: "Full-featured e-commerce platform with AI-powered search and Razorpay payment integration.",
    metrics: [{ label: "Payment", value: "Razorpay" }],
    techStack: [{ category: "Stack", items: ["E-commerce", "AI Search", "Razorpay"] }],
    features: ["AI-powered search", "B2B/B2C marketplace", "Razorpay integration"],
    role: "Built end-to-end",
    github: "https://github.com/sumith1309/Stationary_Hub",
    featured: false,
  },
  {
    id: "forecasting",
    name: "Enterprise Forecasting",
    tagline: "ARIMA + XGBoost + Gemini AI",
    domain: "fintech",
    year: "2025",
    description: "Comprehensive production-ready sales forecasting platform combining 4 ML models (Naïve, ARIMA, Random Forest, XGBoost) with Google Gemini AI-powered insights. Features a corporate interactive dashboard, seasonality detection, feature importance analysis, synthetic data generator, and CSV import/export.",
    metrics: [{ label: "Models", value: "ARIMA + XGBoost" }],
    techStack: [{ category: "Stack", items: ["ARIMA", "XGBoost", "Gemini AI"] }],
    features: ["Multi-model ensemble", "Gemini AI integration", "Enterprise-grade forecasting"],
    role: "Built end-to-end",
    github: "https://github.com/sumith1309/Enterprise-Forecasting",
    featured: false,
  },
  {
    id: "ai-email",
    name: "AI Email Automation",
    tagline: "Intelligent Email Processing & Automation",
    domain: "enterprise",
    year: "2025",
    description: "AI-powered email automation system for intelligent processing and workflow automation.",
    metrics: [],
    techStack: [{ category: "Stack", items: ["AI", "Email Processing", "Automation"] }],
    features: ["Intelligent email classification", "Automated responses", "Workflow automation"],
    role: "Built end-to-end",
    featured: false,
  },
  {
    id: "churn",
    name: "Customer Churn Dashboard",
    tagline: "Random Forest + XGBoost Prediction",
    domain: "fintech",
    year: "2025",
    description: "Professional-grade customer churn prediction dashboard with real-time risk assessment, interactive Chart.js/Plotly visualizations, model performance comparison (Random Forest, XGBoost), three-tier risk classification, and actionable retention recommendations with ROI analysis.",
    metrics: [{ label: "Models", value: "RF + XGBoost" }],
    techStack: [{ category: "Stack", items: ["Random Forest", "XGBoost", "Dashboard"] }],
    features: ["Churn prediction", "Feature importance analysis", "Interactive dashboard"],
    role: "Built end-to-end",
    github: "https://github.com/sumith1309/customer-churn-dashboard",
    featured: false,
  },
  {
    id: "predictive-maintenance",
    name: "Predictive Maintenance",
    tagline: "CNN-LSTM + Computer Vision",
    domain: "enterprise",
    year: "2025",
    description: "End-to-end predictive maintenance system combining 4 approaches: Logistic Regression sensor analysis, CNN-LSTM hybrid time-series detection, Statistical Process Control charting, and 2D CNN visual defect detection. Features an interactive HTML dashboard with Apache ECharts and in-browser TF.js inference.",
    metrics: [],
    techStack: [{ category: "Stack", items: ["CNN-LSTM", "Logistic Regression", "SPC", "Computer Vision"] }],
    features: ["CNN-LSTM prediction", "Computer vision inspection", "Statistical process control"],
    role: "Built end-to-end",
    github: "https://github.com/sumith1309/Predictive-Maintenance",
    featured: false,
  },
  {
    id: "health",
    name: "Health Prediction",
    tagline: "96.6% Accuracy, EU AI Act Compliance",
    domain: "enterprise",
    year: "2025",
    description: "Production-grade ML system for early heart disease detection achieving 96.6% accuracy with Gradient Boosting. Features zero-bias architecture (98.4% fairness across demographics via SMOTE resampling), EU AI Act compliant risk management, and a premium fintech-style dashboard with Framer Motion animations.",
    metrics: [{ label: "Accuracy", value: "96.6%" }],
    techStack: [{ category: "Stack", items: ["ML", "EU AI Act Compliance"] }],
    features: ["96.6% prediction accuracy", "EU AI Act compliant", "Transparent model decisions"],
    role: "Built end-to-end",
    github: "https://github.com/sumith1309/Predicting-Health-with-Precision",
    featured: false,
  },
  {
    id: "inventory",
    name: "AI Inventory Management",
    tagline: "Monte Carlo Simulation",
    domain: "fintech",
    year: "2025",
    description: "Intelligent inventory management platform with predictive analytics, Monte Carlo simulations (100-10,000 iterations), Bayesian sensitivity analysis, ML demand forecasting (hybrid linear regression + moving average), and multi-SKU dashboard with real-time reorder point optimization.",
    metrics: [],
    techStack: [{ category: "Stack", items: ["Monte Carlo", "Simulation", "Optimization"] }],
    features: ["Monte Carlo demand simulation", "Inventory optimization", "Reorder point calculation"],
    role: "Built end-to-end",
    github: "https://github.com/sumith1309/AI_Applications_in_Reorder_Point_Inventory_Management",
    featured: false,
  },
  {
    id: "taskflow",
    name: "TaskFlow",
    tagline: "Socket.IO Real-time Dashboards",
    domain: "enterprise",
    year: "2025",
    description: "Real-time task management with Socket.IO and role-based dashboards.",
    metrics: [],
    techStack: [{ category: "Stack", items: ["Socket.IO", "Role-based Dashboards"] }],
    features: ["Real-time collaboration", "Role-based access", "Live dashboards"],
    role: "Built end-to-end",
    featured: false,
  },
  {
    id: "housing",
    name: "Housing Price Service",
    tagline: "Docker + Kubernetes Deployment",
    domain: "fintech",
    year: "2025",
    description: "Housing price prediction service deployed with Docker and Kubernetes.",
    metrics: [],
    techStack: [{ category: "Stack", items: ["Docker", "Kubernetes", "ML"] }],
    features: ["Containerized deployment", "Kubernetes orchestration", "ML prediction"],
    role: "Built end-to-end",
    featured: false,
  },
  {
    id: "cost-estimator",
    name: "Construction Cost Estimator",
    tagline: "SaaS Tool with Payment Integration",
    domain: "construction",
    year: "2024",
    description: "Production SaaS construction cost estimation tool with Gumroad payment integration (₹499), JWT-secured server-side calculations, itemized 6-component cost breakdowns, construction timeline estimates, and downloadable PDF reports. Built with zero client-side secrets architecture to prevent bypass.",
    metrics: [{ label: "Type", value: "SaaS" }, { label: "Payment", value: "Gumroad" }],
    techStack: [{ category: "Stack", items: ["SaaS", "Gumroad", "Automation"] }],
    features: ["Instant cost estimation", "Payment integration", "Automated quoting"],
    role: "Built to solve real problems experienced during 5 years of construction operations",
    github: "https://github.com/sumith1309/instant-house-construction-cost-report",
    featured: false,
  },
];

export const ALL_PRODUCTS = [...FEATURED_PRODUCTS, ...ADDITIONAL_PRODUCTS];

export function getProductsByDomain(domain: Domain): Product[] {
  return ALL_PRODUCTS.filter((p) => p.domain === domain);
}

export const CAREER: CareerEntry[] = [
  {
    version: "v2.0",
    company: "CogniSpace",
    role: "COO & Co-Founder",
    period: "Jan 2026 – Present",
    location: "Dubai, UAE",
    active: true,
    highlights: [
      "Co-founded enterprise AI service platform",
      "Defined product vision, pricing strategy, go-to-market funnel",
      "Led end-to-end product development: AI playground, API management, Stripe billing",
      "Designed immersive 3D landing with Three.js, 18 UI components",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Three.js", "tRPC", "PostgreSQL", "Redis", "Stripe", "AWS"],
  },
  {
    version: "v1.3",
    company: "LUC Learners",
    role: "Business Analyst & Digital Product Manager",
    period: "Feb 2026 – Present",
    location: "Dubai, UAE",
    active: true,
    highlights: [
      "Led product requirements and sprint coordination for multi-tenant HRMS",
      "Defined specifications across 12 modules serving 80+ employees",
      "Coordinated 6-phase delivery lifecycle",
      "Zero-defect production deployments (10/10 + 14/14 acceptance criteria)",
    ],
    stack: ["Django 5.2", "Next.js 15", "PostgreSQL", "Redis", "Celery"],
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
    period: "2019 – 2024",
    location: "Hyderabad, India",
    active: false,
    highlights: [
      "Co-managed construction operations for residential and commercial projects",
      "Reduced operational delays by 30% with data-driven decisions",
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
  "Product Management": [
    "Product Strategy & Roadmapping",
    "PRD/TRD Documentation",
    "Sprint Planning & Agile (JIRA)",
    "Stakeholder Management",
    "User Story Writing",
    "Acceptance Criteria",
    "Feature Prioritization",
    "Go-to-Market Planning",
  ],
  "AI & Data": [
    "NLP",
    "Computer Vision",
    "Ensemble Methods",
    "Prompt Engineering",
    "RAG Pipelines",
    "LLM Integration (OpenAI, Gemini, Claude, Ollama)",
    "Data Visualization",
    "ETL Processes",
  ],
  Technical: [
    "Python",
    "TypeScript",
    "SQL (PostgreSQL, MySQL)",
    "React/Next.js",
    "FastAPI",
    "Django",
    "Express",
    "tRPC",
    "REST APIs",
    "WebSocket",
    "Git",
    "Docker",
    "CI/CD",
    "AWS",
    "Vercel",
    "Render",
  ],
  "Business & Operations": [
    "Business Process Automation",
    "Resource Planning",
    "Vendor Management",
    "Budget Forecasting",
    "Cross-functional Coordination",
    "Client Communication",
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
  location: "Dubai, UAE",
  openTo: "Open to Hyderabad",
};

export const PROFESSIONAL_SUMMARY =
  "AI Product Manager and startup co-founder with hands-on experience defining, building, and shipping 20+ AI-powered digital products across healthcare, education, HR tech, and supply chain domains. Currently COO & Co-Founder at CogniSpace (enterprise AI platform) while completing Master's in AI in Business (SP Jain, Dubai) and leading business analysis for a production HRMS platform at LUC Learners.";

export const BOOT_LINES = [
  "[SwaroopOS v2.0]",
  "> Initializing system...",
  "> Loading origin_module: Hyderabad, India",
  "> Construction operations loaded — 5 years experience",
  "> Transferring skills: operations → product_management",
  "> Location updated: Dubai, UAE",
  "> Academic module: SP Jain MAIB [2024-2026]",
  "> Compiling products...",
  "> ████████████████████████████ 20+ AI products compiled",
  "> Domains registered: Education, Climate, Enterprise, FinTech, Construction",
  "> System ready.",
  ">",
  "> Welcome, visitor. Press any key or wait to continue...",
];

export const NEOFETCH = `       ╔═══╗
       ║ S ║         S. Jyothi Swaroop
       ╚═══╝         ─────────────────
                      OS: SwaroopOS v2.0
  ███████████         Role: AI Product Manager
  █ SWAROOP █         Location: Dubai, UAE
  ███████████         Products: 20+
                      Domains: 5
                      Accuracy: 97% (best)
                      Impact: 380M targeted
                      Uptime: Since 2019
                      Shell: Next.js 15 + React 19`;
