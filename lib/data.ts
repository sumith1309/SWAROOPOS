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
  website?: string;
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
    website: "https://www.cognispace.co.in/",
    featured: true,
  },
  {
    id: "health",
    name: "Health Prediction",
    tagline: "96.6% Accuracy Heart Disease Detection — EU AI Act Compliant",
    domain: "enterprise",
    year: "2025",
    description:
      "Production-grade ML system for early heart disease detection achieving 96.6% accuracy with Gradient Boosting. Features a zero-bias architecture with 98.4% fairness across demographics via SMOTE resampling, full EU AI Act high-risk system compliance with transparent risk management documentation, and a premium fintech-style dashboard with Framer Motion animations.",
    problem: "Heart disease is the leading cause of death globally, yet early screening tools are inaccessible to primary care and often carry demographic bias that disproportionately misdiagnoses underrepresented groups.",
    impact: "96.6% accuracy enables reliable early screening at the primary care level. 98.4% fairness score ensures equitable predictions across demographics. Full EU AI Act compliance makes this deployment-ready for regulated healthcare markets.",
    architecture: "Patient Data Input → Feature Engineering → SMOTE Resampling (Bias Elimination) → Gradient Boosting Classifier (96.6%) → Fairness Auditor (98.4% Demographic Parity) → EU AI Act Risk Management Module → React Dashboard (Framer Motion)",
    metrics: [
      { label: "Accuracy", value: "96.6%" },
      { label: "Fairness", value: "98.4%" },
      { label: "Compliance", value: "EU AI Act" },
      { label: "Bias", value: "Zero-bias" },
    ],
    techStack: [
      { category: "Frontend", items: ["React", "Framer Motion", "TailwindCSS"] },
      { category: "AI", items: ["Gradient Boosting", "SMOTE Resampling", "scikit-learn", "Feature Engineering"] },
      { category: "Compliance", items: ["EU AI Act Risk Framework", "Fairness Auditor", "Transparent Model Explanations"] },
    ],
    features: [
      "96.6% heart disease prediction accuracy",
      "Zero-bias architecture (98.4% fairness across demographics)",
      "EU AI Act high-risk system compliance",
      "Transparent model decision explanations",
      "Premium fintech-style interactive dashboard",
    ],
    role: "Built end-to-end: ML pipeline, fairness framework, compliance documentation, dashboard",
    github: "https://github.com/sumith1309/Predicting-Health-with-Precision",
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
    problem: "Accountants and auditors spend hours manually classifying bank transactions and reformatting statements into voucher entries, leading to costly errors and audit delays.",
    impact: "Estimated 80% reduction in manual transaction classification time. 8 export modes eliminate repetitive reformatting, enabling same-day audit preparation that previously took 2-3 days.",
    architecture: "React 19 → Express 5 → GPT-4o-mini (Hybrid AI + Regex) → RAG Chatbot → Apache ECharts → SheetJS Excel Engine → ZIP Bundler",
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
    problem: "Support teams manually triage and route incoming tickets, causing inconsistent categorization, missed SLAs, and delayed resolutions for high-priority issues.",
    impact: "Projected 60% reduction in ticket misrouting. Zero-shot approach eliminates the need for labeled training data, enabling instant deployment without months of data collection.",
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
    problem: "Indian travellers waste hours across fragmented travel blogs, visa portals, and booking sites to plan trips, with no single platform offering AI-personalized itineraries with India-specific visa and budget context.",
    impact: "Estimated 70% reduction in trip planning time. Covers 6 countries and 36+ cities with structured day-wise itineraries, eliminating the need for manual research across multiple sources.",
    architecture: "Next.js Frontend → Express Backend → GPT-4o Itinerary Engine → RAG Chatbot (SSE Streaming) → Destination Intelligence DB → Visa Hub API",
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
    problem: "Small stationery businesses lack affordable digital storefronts, while bulk buyers (schools, offices) have no efficient way to discover and order supplies with intelligent product search.",
    impact: "AI-powered search improves product discovery by an estimated 40% over keyword-only search. Razorpay integration enables instant B2B and B2C transactions for the Indian market.",
    architecture: "React Frontend → Node.js/Express Backend → AI Search Engine → MongoDB Product Catalog → Razorpay Payment Gateway",
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
    problem: "Finance teams rely on spreadsheet-based forecasting with single models, missing seasonal patterns and producing inaccurate projections that lead to inventory overstock or stockouts.",
    impact: "4-model ensemble reduces forecast error by an estimated 25-35% over single-model approaches. Gemini AI provides plain-English explanations of trends, making forecasts accessible to non-technical stakeholders.",
    architecture: "Streamlit Dashboard → Python ML Pipeline (Naïve + ARIMA + Random Forest + XGBoost) → Google Gemini AI Insights → Seasonality Detector → CSV Import/Export",
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
    problem: "Knowledge workers spend 2-3 hours daily reading, classifying, and responding to routine emails, diverting attention from high-value strategic work.",
    impact: "Estimated 50% reduction in email handling time through automated classification and response drafting. Priority-based routing ensures critical emails are addressed within minutes instead of hours.",
    architecture: "Email Ingestion Layer → NLP Classification Engine → Priority Router → Auto-Response Generator → Workflow Trigger Engine",
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
    problem: "Subscription businesses lose 5-7% of customers monthly without early warning, and retention teams lack data-driven prioritization to focus on the highest-risk accounts.",
    impact: "Three-tier risk classification enables targeted retention campaigns. Estimated 15-20% improvement in retention rates by intervening before at-risk customers churn, with ROI analysis quantifying the value of each saved account.",
    architecture: "Python ML Pipeline (Random Forest + XGBoost) → Three-tier Risk Classifier → Chart.js/Plotly Dashboard → ROI Analyzer → Retention Recommender",
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
    problem: "Manufacturing plants lose an estimated 5-20% of production capacity to unplanned equipment failures, with reactive maintenance costing 3-9x more than planned interventions.",
    impact: "Projected 30-40% reduction in unplanned downtime by combining sensor anomaly detection with visual defect identification. In-browser TF.js inference enables real-time monitoring without cloud dependency.",
    architecture: "Sensor Data Pipeline → Logistic Regression + CNN-LSTM Hybrid → SPC Control Charts → 2D CNN Visual Inspector → TensorFlow.js In-Browser Inference → Apache ECharts Dashboard",
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
    role: "Built end-to-end",
    github: "https://github.com/sumith1309/Predictive-Maintenance",
    featured: false,
  },
  {
    id: "inventory",
    name: "AI Inventory Management",
    tagline: "Monte Carlo Simulation",
    domain: "fintech",
    year: "2025",
    description: "Intelligent inventory management platform with predictive analytics, Monte Carlo simulations (100-10,000 iterations), Bayesian sensitivity analysis, ML demand forecasting (hybrid linear regression + moving average), and multi-SKU dashboard with real-time reorder point optimization.",
    problem: "Supply chain managers set reorder points using static rules-of-thumb, leading to either costly overstocking (tying up capital) or dangerous stockouts (losing revenue and customers).",
    impact: "Monte Carlo simulations (up to 10,000 iterations) quantify demand uncertainty with confidence intervals. Estimated 20-30% reduction in carrying costs while maintaining 95%+ service levels through optimized reorder points.",
    architecture: "Demand Data → ML Forecasting (Linear Regression + Moving Average) → Monte Carlo Simulator (100-10K iterations) → Bayesian Sensitivity Analysis → Reorder Point Optimizer → Multi-SKU Dashboard",
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
    role: "Built end-to-end",
    github: "https://github.com/sumith1309/AI_Applications_in_Reorder_Point_Inventory_Management",
    featured: false,
  },
  {
    id: "taskflow",
    name: "TaskFlow",
    tagline: "Socket.IO Real-time Task Management",
    domain: "enterprise",
    year: "2025",
    description: "Lightweight real-time task management web application for small teams (1 Manager + 3 Employees). Features role-based dashboards with Kanban board and analytics for managers, JWT authentication, Socket.IO real-time updates, file attachments via MongoDB GridFS, online presence indicators, and a glassmorphism Ocean Glass UI design system.",
    problem: "Small teams (3-5 people) are underserved by enterprise project management tools that are overpriced and complex, yet need real-time collaboration beyond shared spreadsheets.",
    impact: "Socket.IO real-time updates eliminate manual refresh cycles and status meetings. Role-based dashboards give managers instant visibility into team progress without micromanaging.",
    architecture: "React Frontend (Ocean Glass UI) → Express + Socket.IO Backend → JWT Auth Middleware → MongoDB + GridFS → Chart.js Analytics → Online Presence Engine",
    metrics: [
      { label: "Real-time", value: "Socket.IO" },
      { label: "Auth", value: "JWT" },
      { label: "Storage", value: "MongoDB GridFS" },
      { label: "UI System", value: "Ocean Glass" },
    ],
    techStack: [
      { category: "Frontend", items: ["React", "Chart.js", "Glassmorphism CSS"] },
      { category: "Backend", items: ["Node.js", "Express", "Socket.IO", "MongoDB", "GridFS"] },
      { category: "Infrastructure", items: ["JWT Authentication", "Online Presence Engine"] },
    ],
    features: ["Real-time task updates via Socket.IO", "Role-based Kanban + analytics dashboards", "File attachments with GridFS", "Online presence tracking"],
    role: "Built end-to-end",
    github: "https://github.com/sumith1309/LUC_Progress_Tracker",
    featured: false,
  },
  {
    id: "housing",
    name: "Housing Price Service",
    tagline: "Docker + Kubernetes Deployment",
    domain: "fintech",
    year: "2025",
    description: "Housing price prediction service deployed with Docker and Kubernetes.",
    problem: "ML models for real estate pricing often remain in notebooks and never reach production, lacking the containerized infrastructure needed for reliable, scalable API serving.",
    impact: "Kubernetes orchestration enables auto-scaling to handle traffic spikes during peak listing seasons. Containerized deployment ensures reproducible predictions across environments with zero configuration drift.",
    architecture: "Feature Input → scikit-learn ML Model → Flask REST API → Docker Container → Kubernetes Orchestration → Load Balancer → Prediction Response",
    metrics: [
      { label: "Deployment", value: "Kubernetes" },
      { label: "Containers", value: "Docker" },
      { label: "API", value: "REST" },
      { label: "Scaling", value: "Auto-scale" },
    ],
    techStack: [
      { category: "Backend", items: ["Python", "Flask", "scikit-learn"] },
      { category: "Infrastructure", items: ["Docker", "Kubernetes", "kubectl"] },
      { category: "AI", items: ["ML Regression Model", "Feature Engineering"] },
    ],
    features: ["Containerized deployment", "Kubernetes orchestration", "ML prediction"],
    role: "Built end-to-end",
    github: "https://github.com/sumith1309/Housing-Price-Service",
    featured: false,
  },
  {
    id: "cost-estimator",
    name: "Construction Cost Estimator",
    tagline: "SaaS Tool with Payment Integration",
    domain: "construction",
    year: "2024",
    description: "Production SaaS construction cost estimation tool with Gumroad payment integration (₹499), JWT-secured server-side calculations, itemized 6-component cost breakdowns, construction timeline estimates, and downloadable PDF reports. Built with zero client-side secrets architecture to prevent bypass.",
    problem: "Homeowners and small builders in India get wildly inconsistent cost estimates from contractors, with no transparent, standardized tool to validate pricing before committing to a project.",
    impact: "Instant cost reports replace weeks of back-and-forth with contractors. 6-component itemized breakdown gives homeowners transparency into where every rupee goes, reducing disputes and budget overruns.",
    architecture: "React Frontend → JWT Auth Gate → Gumroad Payment (₹499) → Express Server-side Calculator → 6-Component Cost Engine → PDF Report Generator → Download",
    metrics: [
      { label: "Type", value: "Production SaaS" },
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
    role: "Built to solve real problems experienced during 5 years of construction operations",
    github: "https://github.com/sumith1309/instant-house-construction-cost-report",
    featured: false,
  },
  {
    id: "healthcare-analytics",
    name: "Healthcare Analytics Platform",
    tagline: "AI Model Comparison for Healthcare KPIs",
    domain: "enterprise",
    year: "2026",
    description: "Comprehensive analytics platform for evaluating and comparing AI model performance across healthcare departments (Radiology, Pathology, Cardiology, Operations). Features Python analysis engine with statistical comparison, interactive ECharts web dashboard with real-time visualizations, 6-month accuracy forecasts using linear regression, and an executive one-pager report for stakeholders.",
    problem: "Hospital IT teams deploy multiple AI models across departments but lack a unified platform to compare performance, track KPI trends, and justify AI investment to non-technical executives.",
    impact: "Unified dashboard across 4 departments eliminates siloed model evaluation. 6-month accuracy forecasts enable proactive model retraining before performance degrades below clinical thresholds.",
    architecture: "Python Analysis Engine (Pandas + statsmodels) → Statistical Model Comparator → Linear Regression Forecaster → ECharts Interactive Dashboard → Matplotlib/Seaborn Reports → Executive One-Pager PDF",
    metrics: [
      { label: "Departments", value: "4" },
      { label: "KPIs", value: "4" },
      { label: "Forecast Horizon", value: "6 months" },
      { label: "Models Compared", value: "3 (Baseline + v1 + v2)" },
    ],
    techStack: [
      { category: "Frontend", items: ["HTML/CSS", "Apache ECharts"] },
      { category: "Backend", items: ["Python", "Pandas", "statsmodels"] },
      { category: "AI", items: ["Linear Regression Forecasting", "Statistical Model Comparison"] },
      { category: "Visualization", items: ["Matplotlib", "Seaborn", "ECharts"] },
    ],
    features: ["AI model comparison (Baseline vs AI_v1 vs AI_v2)", "Interactive ECharts dashboard", "6-month accuracy forecasting", "Executive one-pager report"],
    role: "Built end-to-end",
    github: "https://github.com/sumith1309/AI-Powered-Healthcare-Analytics",
    featured: false,
  },
  {
    id: "hubspot-integration",
    name: "HubSpot Contact Manager",
    tagline: "CRM Data Cleaning & Standardization",
    domain: "enterprise",
    year: "2026",
    description: "Modern web application for managing, cleaning, and standardizing HubSpot CRM contacts. Features CSV drag-and-drop upload with auto-column mapping, Clean Bot for auto-filling missing fields, Standardize Bot for name/phone/email normalization, Audit Agent with visual data quality reports, and one-click batch push to HubSpot via API.",
    problem: "Sales teams operate on dirty CRM data — duplicate contacts, inconsistent phone formats, missing emails — leading to failed outreach campaigns and inaccurate pipeline reporting.",
    impact: "3 automated bots (Clean, Standardize, Audit) fix data quality issues that would take a sales ops team days to resolve manually. One-click batch push ensures clean data flows directly into HubSpot without re-entry.",
    architecture: "React + Vite Frontend → CSV Parser (Auto-Column Mapping) → Clean Bot → Standardize Bot → Audit Agent (Visual Reports) → Netlify Functions → HubSpot API (Batch Push)",
    metrics: [
      { label: "Bots", value: "3" },
      { label: "CRM", value: "HubSpot" },
      { label: "Upload", value: "Drag-and-drop CSV" },
      { label: "Push", value: "One-click Batch" },
    ],
    techStack: [
      { category: "Frontend", items: ["React", "Vite", "TailwindCSS"] },
      { category: "Backend", items: ["Netlify Functions", "HubSpot API"] },
      { category: "AI", items: ["Clean Bot", "Standardize Bot", "Audit Agent"] },
    ],
    features: ["CSV upload with auto-column mapping", "Clean Bot for missing fields", "Standardize Bot for data normalization", "Audit Agent with visual reports", "One-click batch push to HubSpot"],
    role: "Built end-to-end",
    github: "https://github.com/sumith1309/-HubSpot-Integration",
    featured: false,
  },
  {
    id: "code-archaeologist",
    name: "Code Archaeologist",
    tagline: "AI Legacy Code Analysis Platform",
    domain: "enterprise",
    year: "2025",
    description: "Enterprise-grade AI-powered platform for understanding, documenting, and modernizing legacy codebases. Supports 10+ programming languages with advanced static analysis, intelligent documentation generation, interactive visualizations, and a REST API. Built with FastAPI backend, Next.js 14 frontend, and PostgreSQL storage.",
    problem: "Engineering teams inherit legacy codebases with zero documentation, spending weeks reverse-engineering business logic before they can safely make changes or plan migrations.",
    impact: "Automated analysis of 10+ languages reduces codebase onboarding from weeks to hours. AI-generated documentation captures tribal knowledge that would otherwise be lost when original developers leave.",
    architecture: "Next.js 14 Frontend → FastAPI Backend → Static Analysis Engine (10+ Languages) → AI Documentation Generator → Interactive Visualization Layer → PostgreSQL Storage → Docker Deployment",
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
    features: ["AI-powered legacy code analysis", "10+ language support", "Interactive codebase visualizations", "Automated documentation generation", "REST API"],
    role: "Built end-to-end",
    github: "https://github.com/sumith1309/AI-Code-Archaeologist",
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
    period: "Jun 2019 – Sep 2024",
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
    period: "Sep 2024 – Aug 2026 (Expected)",
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
    "Vibe Coding",
    "Revit",
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
  "97% prediction accuracy. 380M lives targeted. 20+ AI products built across 5 industries. I architect AI systems that predict dust storms, protect outdoor workers from heatwaves, and automate enterprise operations. Single-handedly built and deployed a production HRMS platform serving 80+ employees daily. COO & Co-Founder at CogniSpace. Master's in AI in Business (SP Jain, Dubai).";

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
