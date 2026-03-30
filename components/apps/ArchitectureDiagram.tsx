"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ArchitectureDiagramProps {
  architecture: string;
  color: string;
}

const TECH_EXPLANATIONS: Record<string, string> = {
  "FastAPI": "High-performance Python web framework -- chosen for async support and automatic OpenAPI docs",
  "React 19": "Latest React with server components -- chosen for concurrent rendering and streaming",
  "Next.js 14": "Full-stack React framework -- chosen for SSR, API routes, and edge runtime",
  "Next.js 16": "Latest Next.js with App Router -- chosen for streaming SSR and server actions",
  "PostgreSQL": "Enterprise-grade relational DB -- chosen for ACID compliance and JSON support",
  "Redis": "In-memory data store -- chosen for sub-millisecond caching and pub/sub",
  "pgvector": "Vector similarity extension for PostgreSQL -- chosen for embedding storage and semantic search",
  "TimescaleDB": "Time-series extension for PostgreSQL -- chosen for high-ingest analytics workloads",
  "WebSocket": "Full-duplex real-time protocol -- chosen for live data streaming at 45ms latency",
  "Kalman Filtering": "Recursive state estimator -- chosen to fuse noisy multi-model predictions into accurate forecasts",
  "LangChain": "LLM orchestration framework -- chosen for tool calling, chains, and RAG pipeline management",
  "Ollama/LLM": "Local LLM inference -- chosen for privacy, cost control, and offline capability",
  "RAG Pipeline": "Retrieval-Augmented Generation -- grounds AI responses in actual course materials, not hallucination",
  "GPT-4o-mini": "OpenAI's efficient model -- chosen for cost-effective classification at scale",
  "GPT-4o": "OpenAI's flagship model -- chosen for complex reasoning and multi-step itinerary generation",
  "ARIMA": "Time-series forecasting model -- chosen for capturing linear trends and seasonality",
  "XGBoost": "Gradient boosting -- chosen for tabular data prediction with feature importance",
  "LSTM": "Long Short-Term Memory network -- chosen for sequence modeling in time-series prediction",
  "Prophet": "Facebook's forecasting tool -- chosen for handling holidays and trend changepoints",
  "Random Forest": "Ensemble tree model -- chosen for robust baseline prediction with low overfitting",
  "Gradient Boosting": "Sequential ensemble -- chosen for achieving 96.6% accuracy on structured health data",
  "SMOTE Resampling": "Oversampling technique -- chosen to eliminate demographic bias in training data",
  "BART-large-mnli": "Zero-shot NLI model -- chosen to classify without labeled training data",
  "Stripe": "Payment infrastructure -- chosen for subscription billing and usage-based pricing",
  "Three.js": "3D rendering library -- chosen for immersive landing page experiences",
  "tRPC": "End-to-end typesafe APIs -- chosen for full-stack TypeScript type safety",
  "Docker": "Containerization -- chosen for consistent deployment across environments",
  "Kubernetes": "Container orchestration -- chosen for auto-scaling and self-healing deployments",
  "Mapbox GL JS": "Interactive maps -- chosen for customizable vector tiles and 3D terrain",
  "Leaflet": "Lightweight mapping -- chosen for satellite imagery overlays and marker clustering",
  "Telegram Bot API": "Messaging distribution -- chosen to reach 380M workers on their existing platform",
  "Google TTS": "Text-to-speech -- chosen for voice alerts in 7 Indian languages for illiterate workers",
  "Razorpay": "Indian payment gateway -- chosen for UPI, netbanking, and card support",
  "Socket.IO": "Real-time engine -- chosen for bidirectional event-based task updates",
  "MongoDB": "Document database -- chosen for flexible schema and GridFS file storage",
  "Chart.js": "Charting library -- chosen for interactive doughnut, bar, and line visualizations",
  "Apache ECharts": "Enterprise visualization -- chosen for high-performance dashboards with large datasets",
  "Framer Motion": "Animation library -- chosen for spring physics and gesture-based interactions",
  "TensorFlow.js": "In-browser ML -- chosen for client-side inference without server round-trips",
  "Plotly": "Scientific plotting -- chosen for interactive 3D charts and statistical visualizations",
  "Express": "Node.js web framework -- chosen for middleware ecosystem and REST API routing",
  "Express 5": "Latest Express -- chosen for async error handling and improved routing",
  "Streamlit": "Python dashboard framework -- chosen for rapid ML prototyping with interactive widgets",
  "scikit-learn": "Python ML library -- chosen for classical ML algorithms and model evaluation",
  "Hugging Face Transformers": "NLP model hub -- chosen for pre-trained zero-shot classification models",
  "SheetJS": "Excel processing -- chosen for reading/writing complex Excel workbooks in the browser",
  "Vite": "Build tool -- chosen for instant HMR and optimized production bundles",
  "React": "UI library -- chosen for component-based architecture and ecosystem maturity",
  "JWT": "JSON Web Tokens -- chosen for stateless authentication with role-based access",
  "Node.js": "JavaScript runtime -- chosen for event-driven I/O and unified frontend/backend language",
  "Python": "Programming language -- chosen for ML ecosystem (scikit-learn, pandas, numpy)",
  "Flask": "Lightweight Python framework -- chosen for simple REST API endpoints",
  "Netlify Functions": "Serverless backend -- chosen for zero-config deployment of API endpoints",
  "HubSpot API": "CRM integration -- chosen for contact management and data standardization",
  "AWS ECS Fargate": "Serverless containers -- chosen for auto-scaling without managing servers",
  "EU AI Act Risk Framework": "Regulatory compliance -- chosen to meet EU high-risk AI system requirements",
  "Fairness Auditor": "Bias detection module -- achieving 98.4% demographic parity across protected groups",
  "Gumroad": "Digital product payments -- chosen for simple one-time purchase flow",
};

function getExplanation(nodeName: string): string {
  const trimmed = nodeName.trim();
  if (TECH_EXPLANATIONS[trimmed]) return TECH_EXPLANATIONS[trimmed];
  // Try case-insensitive match
  const key = Object.keys(TECH_EXPLANATIONS).find(
    (k) => k.toLowerCase() === trimmed.toLowerCase()
  );
  if (key) return TECH_EXPLANATIONS[key];
  return "Technology used in this pipeline";
}

export default function ArchitectureDiagram({ architecture, color }: ArchitectureDiagramProps) {
  const nodes = architecture.split(/\s*[→→>]+\s*/).filter(Boolean);
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close tooltip when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveNode(null);
      }
    }
    if (activeNode !== null) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [activeNode]);

  return (
    <div className="pl-8" ref={containerRef}>
      <div className="flex flex-wrap items-center gap-1.5 p-4 rounded-[12px] bg-[#F8FAFC] border border-[rgba(0,0,0,0.04)]">
        {nodes.map((node, i) => (
          <div key={`${node}-${i}`} className="flex items-center gap-1.5">
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08, type: "spring", stiffness: 200, damping: 20 }}
                className="px-3 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap cursor-pointer select-none"
                style={{
                  background: activeNode === i ? `${color}20` : `${color}08`,
                  color: `${color}CC`,
                  border: `1.5px solid ${activeNode === i ? `${color}40` : `${color}18`}`,
                  boxShadow: activeNode === i ? `0 2px 8px ${color}15` : `0 1px 3px ${color}06`,
                }}
                onClick={() => setActiveNode(activeNode === i ? null : i)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                {node.trim()}
              </motion.div>

              {/* Tooltip */}
              <AnimatePresence>
                {activeNode === i && (
                  <motion.div
                    initial={{ opacity: 0, y: -4, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50"
                    style={{ minWidth: 200, maxWidth: 280 }}
                  >
                    {/* Arrow */}
                    <div
                      className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45"
                      style={{ background: "#1C1C1E" }}
                    />
                    {/* Content */}
                    <div
                      className="relative px-3 py-2.5 rounded-lg text-[11px] leading-relaxed text-white font-medium"
                      style={{
                        background: "#1C1C1E",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                      }}
                    >
                      <p className="text-white/90 font-semibold text-[11px] mb-1">
                        {node.trim()}
                      </p>
                      <p className="text-white/65 text-[10px] leading-snug">
                        {getExplanation(node)}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {i < nodes.length - 1 && (
              <motion.svg
                width="16" height="12" viewBox="0 0 16 12"
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + i * 0.08 }}
                className="shrink-0"
              >
                <path d="M0 6h12M10 2l4 4-4 4" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
              </motion.svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
