"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { NEOFETCH, CAREER, ALL_PRODUCTS, SKILLS, CERTIFICATIONS, EDUCATION, CONTACT, PROFESSIONAL_SUMMARY, DOMAINS, LANGUAGES, type Domain } from "@/lib/data";
import { useStore, type AppId } from "@/lib/store";

interface TerminalLine {
  type: "input" | "output";
  content: string;
}

export default function TerminalApp() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", content: "SwaroopOS Terminal v2.0" },
    { type: "output", content: 'Type "help" or "swaroop --help" for available commands.\n' },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const openWindow = useStore((s) => s.openWindow);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [lines]);

  const processCommand = useCallback((cmd: string): string => {
    const trimmed = cmd.trim();
    const lower = trimmed.toLowerCase();

    // ─── Standard Unix Commands ───

    if (lower === "clear") return "__CLEAR__";
    if (lower === "exit") return "__EXIT__";
    if (lower === "") return "";

    if (lower === "pwd") return "/home/swaroop/portfolio";
    if (lower === "date") return new Date().toString();
    if (lower === "hostname") return "swaroopos.local";
    if (lower === "uname" || lower === "uname -a") return "SwaroopOS 2.0.0 (Dubai/x86_64) — Built with Next.js, React, TypeScript";

    if (lower.startsWith("echo ")) return trimmed.slice(5);

    if (lower === "history") {
      if (history.length === 0) return "No commands in history.";
      return history.map((h, i) => `  ${String(i + 1).padStart(4)}  ${h}`).join("\n");
    }

    if (lower === "ls") return "education/  climate/  enterprise/  fintech/  construction/  README.md  .env  projects/";

    if (lower === "ls projects" || lower === "ls projects/") {
      return ALL_PRODUCTS.map((p) => `${p.id}.json`).join("  ");
    }

    if (lower.startsWith("cd ") && lower.includes("ls")) {
      const dir = lower.replace("cd ", "").split("&&")[0].trim().replace("/", "");
      if (dir in DOMAINS) {
        const products = ALL_PRODUCTS.filter((p) => p.domain === dir);
        return products.map((p) => `${p.id}.app`).join("  ");
      }
      return `cd: no such directory: ${dir}`;
    }

    if (lower === "cat readme.md" || lower === "cat README.md") {
      return `# SwaroopOS v2.0\n\nWelcome to S. Jyothi Swaroop's interactive portfolio.\n20+ AI products across 5 domains.\n97% prediction accuracy. 380M lives targeted.\n\nType 'help' for commands.`;
    }

    if (lower === "cat .env") return "Nice try. 🔒 Environment variables are secured.";

    // ─── cat projects/<id>.json ───
    if (lower.startsWith("cat projects/") && lower.endsWith(".json")) {
      const id = lower.replace("cat projects/", "").replace(".json", "");
      const product = ALL_PRODUCTS.find((p) => p.id === id);
      if (!product) return `cat: projects/${id}.json: No such file`;
      const obj = {
        name: product.name,
        domain: product.domain,
        year: product.year,
        tagline: product.tagline,
        problem: product.problem || null,
        impact: product.impact || null,
        architecture: product.architecture || null,
        metrics: product.metrics,
        techStack: product.techStack.flatMap((c) => c.items),
        role: product.role,
        github: product.github || null,
      };
      return JSON.stringify(obj, null, 2);
    }

    // ─── grep <keyword> ───
    if (lower.startsWith("grep ")) {
      const keyword = lower.slice(5).trim();
      if (!keyword) return "Usage: grep <keyword>";
      const matches = ALL_PRODUCTS.filter((p) => {
        const searchable = `${p.name} ${p.tagline} ${p.description} ${p.domain} ${p.features.join(" ")}`.toLowerCase();
        return searchable.includes(keyword.toLowerCase());
      });
      if (matches.length === 0) return `No matches for "${keyword}"`;
      return matches.map((p) => `  \x1b[32m${p.name}\x1b[0m (${p.domain}) — ${p.tagline}`).join("\n");
    }

    // ─── tree ───
    if (lower === "tree") {
      let output = ".\n";
      const domains = Object.keys(DOMAINS) as Domain[];
      domains.forEach((domain, di) => {
        const isLast = di === domains.length - 1;
        const prefix = isLast ? "└── " : "├── ";
        output += `${prefix}${domain}/\n`;
        const products = ALL_PRODUCTS.filter((p) => p.domain === domain);
        products.forEach((p, pi) => {
          const connector = isLast ? "    " : "│   ";
          const pPrefix = pi === products.length - 1 ? "└── " : "├── ";
          output += `${connector}${pPrefix}${p.id}.app (${p.year})\n`;
        });
      });
      return output.trimEnd();
    }

    // ─── open <app> ───
    if (lower.startsWith("open ")) {
      const appName = lower.slice(5).trim();
      const appMap: Record<string, AppId> = {
        about: "about", skills: "skills", terminal: "terminal", contact: "contact",
        showcase: "showcase", gallery: "gallery", calculator: "calculator", music: "music",
        settings: "settings", calendar: "calendar", chat: "aichat", aichat: "aichat",
        education: "education", climate: "climate", enterprise: "enterprise",
        fintech: "fintech", construction: "construction",
        tictactoe: "tictactoe", "2048": "game2048",
        resume: "resumetailor", "resume-tailor": "resumetailor", resumetailor: "resumetailor",
        recommender: "recommender", guide: "recommender",
        demo: "aidemo", playground: "aidemo", aidemo: "aidemo",
      };
      const appId = appMap[appName];
      if (appId) {
        openWindow(appId);
        return `Opening ${appName}...`;
      }
      return `open: application "${appName}" not found. Try: about, skills, showcase, gallery, contact, chat, terminal, settings`;
    }

    // ─── Swaroop Commands ───

    if (lower === "help" || lower === "swaroop --help") {
      return `╔══════════════════════════════════════════════════════╗
║                SwaroopOS Terminal v2.0                ║
╚══════════════════════════════════════════════════════╝

PROFILE
  swaroop --about           Professional summary
  swaroop --journey         Career timeline
  swaroop --impact          Business impact highlights
  swaroop --stats           Key metrics
  swaroop --timeline        ASCII career timeline

PRODUCTS
  swaroop --products        All 20+ products
  swaroop --products --domain <name>  Filter by domain
  swaroop --architecture <id>  Architecture of a product
  swaroop --compare         Compare flagship products

SKILLS & CREDENTIALS
  swaroop --skills          Skills by category
  swaroop --stack-depth     Full technology breakdown
  swaroop --certifications  Certifications
  swaroop --education       Academic history
  swaroop --languages       Languages spoken

CONNECT
  swaroop --contact         Contact info
  swaroop --github          GitHub repositories
  swaroop --location        Current location

SYSTEM
  open <app>           Open an app (showcase, gallery, chat, etc.)
  cat projects/<id>.json   View product data as JSON
  grep <keyword>       Search across all products
  tree                 Domain directory tree
  ls, pwd, date, history, echo, neofetch, whoami, clear, exit

EASTER EGGS
  swaroop --secret     ???
  sudo hire swaroop    ???
  ping recruiter       ???
  matrix               ???
  man swaroop          ???`;
    }

    if (lower === "swaroop --about") return PROFESSIONAL_SUMMARY;

    if (lower === "swaroop --journey") {
      return CAREER.map(
        (c) => `${c.version} — ${c.company} [${c.period}]\n    ${c.role} · ${c.location}${c.active ? " (ACTIVE)" : ""}\n    ${c.highlights.slice(0, 2).join("; ")}`
      ).join("\n\n");
    }

    if (lower === "swaroop --impact") {
      return `╔═══════════════════════════════════════════╗
║          BUSINESS IMPACT SUMMARY          ║
╚═══════════════════════════════════════════╝

  🎯 97%    Dust storm prediction accuracy (Sahara Sense)
            → 7-model AI ensemble with Kalman filtering
            → Real-time monitoring across 8 UAE emirates

  🛡️ 380M   Outdoor workers targeted (Garmi Mitra)
            → Voice-first alerts in 7 Indian languages
            → Crowdsourced shelter mapping in 18 cities

  💊 96.6%  Heart disease detection accuracy (Health Prediction)
            → Zero-bias architecture (98.4% fairness)
            → EU AI Act compliant

  ✅ 0      Defects in production (LUC Learners HRMS)
            → 10/10 + 14/14 acceptance criteria passed
            → 12 modules, 80+ employees, 3 organizations

  🚀 20+    AI products shipped across 5 industries
            → Education, Climate, Enterprise, FinTech, Construction`;
    }

    if (lower === "swaroop --stats") {
      return `Products Built:    20+
Domains:           5 (Education, Climate, Enterprise, FinTech, Construction)
Best Accuracy:     97% (Sahara Sense)
Health Accuracy:   96.6% (Heart Disease Detection)
Social Impact:     380M outdoor workers targeted (Garmi Mitra)
Prod Deployments:  Zero-defect (LUC Learners HRMS)
GitHub Repos:      22+ public repositories
Experience:        Since 2019 (5+ years operations + AI product management)
Languages:         ${LANGUAGES.map((l) => `${l.name} (${l.level})`).join(", ")}`;
    }

    if (lower === "swaroop --timeline") {
      return `
  2019 ─────── 2020 ─────── 2021 ─────── 2022 ─────── 2023 ─────── 2024 ─────── 2025 ─────── 2026
  │                                                                  │            │            │
  ▼                                                                  ▼            ▼            ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  v1.0  Geetha Constructions — Partner & Ops Manager         │
  │  Hyderabad · 5 years · Construction operations → tech       │
  └─────────────────────────────────────────────────────────────┘
                                                                     ┌────────────────────────────────┐
                                                                     │  SP Jain MAIB — Master's in AI │
                                                                     │  Singapore · Sydney · Dubai    │
                                                                     └────────────────────────────────┘
                                                                                  ┌──────────────────┐
                                                                                  │ v1.2 SP Jain JPT │
                                                                                  │ Project Manager  │
                                                                                  └──────────────────┘
                                                                                               ┌─────────────┐
                                                                                               │ v1.3 LUC    │
                                                                                               │ Biz Analyst  │
                                                                                               └─────────────┘
                                                                                               ┌─────────────┐
                                                                                               │ v2.0 Cogni  │
                                                                                               │ COO & Co-F  │
                                                                                               └─────────────┘`;
    }

    if (lower.startsWith("swaroop --products")) {
      const domainMatch = lower.match(/--domain\s+(\w+)/);
      if (domainMatch) {
        const domain = domainMatch[1] as Domain;
        if (!(domain in DOMAINS)) return `Unknown domain: ${domainMatch[1]}. Available: education, climate, enterprise, fintech, construction`;
        const products = ALL_PRODUCTS.filter((p) => p.domain === domain);
        return products.map((p) => `  ${p.featured ? "★" : "·"} ${p.name} — ${p.tagline} (${p.year})`).join("\n");
      }
      return ALL_PRODUCTS.map((p) => `  ${p.featured ? "★" : "·"} [${p.domain.padEnd(12)}] ${p.name} — ${p.tagline} (${p.year})`).join("\n");
    }

    // ─── swaroop --architecture <id> ───
    if (lower.startsWith("swaroop --architecture")) {
      const id = lower.replace("swaroop --architecture", "").trim();
      if (!id) {
        return "Usage: swaroop --architecture <product-id>\n\nAvailable IDs:\n" +
          ALL_PRODUCTS.filter((p) => p.architecture).map((p) => `  ${p.id}`).join("\n");
      }
      const product = ALL_PRODUCTS.find((p) => p.id === id);
      if (!product) return `Product not found: ${id}`;
      if (!product.architecture) return `No architecture data for ${product.name}`;
      return `${product.name} — System Architecture\n${"─".repeat(40)}\n\n${product.architecture}\n\nTech Stack: ${product.techStack.flatMap((c) => c.items).join(", ")}`;
    }

    if (lower === "swaroop --compare") {
      const featured = ALL_PRODUCTS.filter((p) => p.featured);
      const header = "Product".padEnd(16) + "Domain".padEnd(14) + "Year".padEnd(6) + "Key Metric";
      const divider = "─".repeat(60);
      const rows = featured.map((p) => {
        const metric = p.metrics[0] ? `${p.metrics[0].value} ${p.metrics[0].label}` : "—";
        return p.name.padEnd(16) + DOMAINS[p.domain].label.padEnd(14) + p.year.padEnd(6) + metric;
      });
      return `Flagship Products Comparison\n${divider}\n${header}\n${divider}\n${rows.join("\n")}\n${divider}`;
    }

    if (lower === "swaroop --stack-depth") {
      const allTech: Record<string, Set<string>> = {};
      ALL_PRODUCTS.forEach((p) => {
        p.techStack.forEach((cat) => {
          if (!allTech[cat.category]) allTech[cat.category] = new Set();
          cat.items.forEach((item) => allTech[cat.category].add(item));
        });
      });
      let output = "Technology Depth Analysis\n" + "═".repeat(40) + "\n\n";
      Object.entries(allTech).sort((a, b) => b[1].size - a[1].size).forEach(([cat, items]) => {
        output += `${cat} (${items.size} tools):\n`;
        output += `  ${Array.from(items).join(", ")}\n\n`;
      });
      output += `Total unique technologies: ${Object.values(allTech).reduce((s, set) => s + set.size, 0)}`;
      return output;
    }

    if (lower === "swaroop --skills") {
      return Object.entries(SKILLS)
        .map(([cat, items]) => `${cat}:\n${items.map((i) => `  · ${i}`).join("\n")}`)
        .join("\n\n");
    }

    if (lower === "swaroop --contact") {
      return `Email:    ${CONTACT.email}
Phone:    ${CONTACT.phone}
LinkedIn: ${CONTACT.linkedin}
GitHub:   ${CONTACT.github}
Location: ${CONTACT.location} · ${CONTACT.openTo}
Portfolio: https://swaroopos.vercel.app`;
    }

    if (lower === "swaroop --location") return `${CONTACT.location} · ${CONTACT.openTo}`;

    if (lower === "swaroop --education") {
      return EDUCATION.map(
        (e) => `${e.degree}\n  ${e.institution}\n  ${e.period}\n  ${e.campuses}`
      ).join("\n\n");
    }

    if (lower === "swaroop --languages") {
      return LANGUAGES.map((l) => `  ${l.name.padEnd(10)} ${l.level.padEnd(22)} ${"█".repeat(Math.round(l.percent / 5))}${"░".repeat(20 - Math.round(l.percent / 5))} ${l.percent}%`).join("\n");
    }

    if (lower === "swaroop --github") {
      return `GitHub: https://github.com/sumith1309
Public Repos: 22+
Top Repositories:
  SWAROOPOS              — This portfolio (SwaroopOS)
  COGNISPACE             — Enterprise AI Platform
  Project_Sahara_Sense   — Dust Storm Prediction (97% accuracy)
  Bank-Statement-Analyzer — AI FinTech Tool
  Travel-Itinerary       — AI Travel Planner (Trails & Miles)
  Stationary_Hub         — B2B/B2C E-commerce
  Enterprise-Forecasting — ARIMA + XGBoost + Gemini
  customer-churn-dashboard — ML Churn Prediction
  Predictive-Maintenance — CNN-LSTM + Computer Vision
  NLP_Ticket_Classifier  — Zero-shot Classification
  AI-Code-Archaeologist  — Legacy Code Analysis
  AI-Powered-Healthcare-Analytics — Model Comparison
  -HubSpot-Integration   — CRM Contact Manager

Visit: https://github.com/sumith1309`;
    }

    if (lower === "swaroop --certifications") {
      return CERTIFICATIONS.map((c) => `  ✓ ${c}`).join("\n");
    }

    if (lower === "whoami") return "S. Jyothi Swaroop — I architect AI systems that predict, protect, and automate";
    if (lower === "neofetch") return NEOFETCH;

    // ─── man swaroop ───
    if (lower === "man swaroop") {
      return `SWAROOP(1)                   SwaroopOS Manual                   SWAROOP(1)

NAME
       swaroop - AI Product Manager & Systems Architect

SYNOPSIS
       A builder who ships. 20+ AI products, 5 industries, 97% accuracy.

DESCRIPTION
       S. Jyothi Swaroop is an AI Product Manager and startup co-founder
       who builds production-grade AI systems across education, climate
       safety, enterprise automation, fintech, and construction.

       Started in construction operations (2019-2024), transitioned to
       AI product management. Currently COO & Co-Founder at CogniSpace
       and Business Analyst at LUC Learners, Dubai.

NOTABLE WORKS
       Sahara Sense      97% dust storm prediction for UAE (7-model ensemble)
       Garmi Mitra       Heatwave warnings for 380M Indian workers
       ALIA              AI teaching assistant with RAG pipeline
       CogniSpace        Enterprise AI platform (co-founded)

EDUCATION
       Master of AI in Business — SP Jain (Singapore · Sydney · Dubai)
       Bachelor of Commerce — Badruka College, Hyderabad

CONTACT
       Email:    ${CONTACT.email}
       GitHub:   github.com/sumith1309
       LinkedIn: linkedin.com/in/jyothi-swaroop-753116295
       Web:      swaroopos.vercel.app

SEE ALSO
       swaroop --impact, swaroop --products, swaroop --architecture

SwaroopOS v2.0                  March 2026                     SWAROOP(1)`;
    }

    // ─── Easter Eggs ───

    if (lower === "swaroop --secret") {
      return "You found it. The secret is: I built this entire portfolio too — the OS, the terminal, the AI chat, all of it. From construction sites to code. 🔨→💻";
    }

    if (lower === "sudo hire swaroop") {
      return `[sudo] verifying credentials...
✓ Skills verified: AI/ML, Full-Stack, Product Management
✓ Experience verified: 20+ products, 5 domains, 5+ years
✓ Impact verified: 97% accuracy, 380M lives, zero-defect deploys
✓ Availability: OPEN TO WORK

══════════════════════════════════════════
  ACCESS GRANTED

  Sending offer letter to:
  ${CONTACT.email}

  Or connect: ${CONTACT.linkedin}
══════════════════════════════════════════`;
    }

    if (lower === "ping recruiter") {
      return `PING recruiter (swaroop.hire) 56 bytes of data
64 bytes from swaroop: time=0.3ms — Status: AVAILABLE
64 bytes from swaroop: time=0.2ms — Response Time: < 1 hour
64 bytes from swaroop: time=0.1ms — Location: Dubai, UAE

--- recruiter ping statistics ---
3 packets transmitted, 3 received, 0% packet loss

📧 Reach out: ${CONTACT.email}
💼 LinkedIn: ${CONTACT.linkedin}`;
    }

    if (lower === "matrix") {
      return "__MATRIX__";
    }

    if (lower === "sudo rm -rf /") return "Nice try. SwaroopOS is protected. 🛡️";
    if (lower === "vim" || lower === "nano" || lower === "vi") return `${lower}: read-only filesystem. But I appreciate the effort.`;
    if (lower === "npm install" || lower === "yarn" || lower === "pnpm install") return "Already installed. This portfolio runs on 20+ products of pure experience.";
    if (lower === "curl" || lower.startsWith("curl ")) return "Try 'swaroop --contact' instead.";
    if (lower === "top" || lower === "htop") return `PID  %CPU  %MEM  COMMAND\n  1  99.9  100   building-ai-products\n  2   0.1    0   sleeping (never)`;

    return `command not found: ${cmd.trim()}\nType 'help' for available commands.`;
  }, [history, openWindow]);

  const handleSubmit = useCallback(() => {
    if (!input.trim() && input === "") {
      setLines((prev) => [...prev, { type: "input", content: "" }]);
      return;
    }

    const output = processCommand(input);

    if (output === "__CLEAR__") {
      setLines([]);
      setInput("");
      setHistory((prev) => [...prev, input]);
      setHistoryIndex(-1);
      return;
    }

    if (output === "__EXIT__") {
      const store = useStore.getState();
      store.closeWindow("terminal");
      return;
    }

    if (output === "__MATRIX__") {
      setLines((prev) => [...prev, { type: "input", content: input }]);
      setHistory((prev) => [...prev, input]);
      setHistoryIndex(-1);
      setInput("");
      // Matrix rain effect
      const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01";
      let count = 0;
      const interval = setInterval(() => {
        const line = Array.from({ length: 50 }, () => chars[Math.floor(Math.random() * chars.length)]).join(" ");
        setLines((prev) => [...prev, { type: "output", content: line }]);
        count++;
        if (count >= 12) {
          clearInterval(interval);
          setLines((prev) => [...prev, { type: "output", content: "\n[Matrix simulation ended. Welcome back to reality.]\n" }]);
        }
      }, 150);
      return;
    }

    setLines((prev) => [
      ...prev,
      { type: "input", content: input },
      ...(output ? [{ type: "output" as const, content: output }] : []),
    ]);
    setHistory((prev) => [...prev, input]);
    setHistoryIndex(-1);
    setInput("");
  }, [input, processCommand]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const commands = [
        "swaroop --help", "swaroop --about", "swaroop --journey", "swaroop --impact",
        "swaroop --stats", "swaroop --timeline", "swaroop --products", "swaroop --skills",
        "swaroop --contact", "swaroop --location", "swaroop --education", "swaroop --languages",
        "swaroop --certifications", "swaroop --github", "swaroop --compare", "swaroop --stack-depth",
        "swaroop --architecture", "swaroop --secret",
        "help", "ls", "tree", "whoami", "neofetch", "clear", "exit", "pwd", "date", "history",
        "open ", "grep ", "cat projects/", "man swaroop", "sudo hire swaroop", "ping recruiter", "matrix",
      ];
      const match = commands.find((c) => c.startsWith(input) && c !== input);
      if (match) setInput(match);
    } else if (e.ctrlKey && e.key === "l") {
      e.preventDefault();
      setLines([]);
    } else if (e.ctrlKey && e.key === "c") {
      e.preventDefault();
      setLines((prev) => [...prev, { type: "input", content: input + "^C" }]);
      setInput("");
    }
  };

  return (
    <div
      className="bg-[#0C0C0E] min-h-[400px] h-full flex flex-col font-mono text-[13px] leading-[1.7] relative"
      onClick={() => inputRef.current?.focus()}
      style={{ cursor: "text" }}
    >
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-0.5">
        {lines.map((line, i) => (
          <div key={i}>
            {line.type === "input" ? (
              <div>
                <span className="text-[#10B981]">visitor</span><span className="text-[#71717A]">@</span><span className="text-[#3B82F6]">swaroopOS</span>
                <span className="text-[#8B5CF6]"> ~ </span><span className="text-[#F59E0B]">$ </span>
                <span className="text-[#A1A1AA]">{line.content}</span>
              </div>
            ) : (
              <pre className="text-[#A1A1AA] whitespace-pre-wrap">{line.content}</pre>
            )}
          </div>
        ))}

        {/* Input line */}
        <div className="flex items-center">
          <span className="text-[#10B981]">visitor</span><span className="text-[#71717A]">@</span><span className="text-[#3B82F6]">swaroopOS</span>
          <span className="text-[#8B5CF6]"> ~ </span><span className="text-[#F59E0B]">$ </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-[#FAFAFA] outline-none caret-[#3B82F6]"
            autoFocus
            spellCheck={false}
            style={{ cursor: "text" }}
          />
        </div>
      </div>
    </div>
  );
}
