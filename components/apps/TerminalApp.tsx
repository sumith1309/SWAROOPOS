"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { NEOFETCH, CAREER, ALL_PRODUCTS, SKILLS, CERTIFICATIONS, EDUCATION, CONTACT, PROFESSIONAL_SUMMARY, DOMAINS, type Domain } from "@/lib/data";
import { useStore } from "@/lib/store";

interface TerminalLine {
  type: "input" | "output";
  content: string;
}

export default function TerminalApp() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", content: "SwaroopOS Terminal v2.0" },
    { type: "output", content: 'Type "swaroop --help" for available commands.\n' },
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
    const trimmed = cmd.trim().toLowerCase();

    if (trimmed === "swaroop --help" || trimmed === "help") {
      return `Available commands:
  swaroop --about        Professional summary
  swaroop --journey      Career timeline
  swaroop --stats        Key metrics
  swaroop --products     All products
  swaroop --products --domain <name>  Filter by domain
  swaroop --skills       Skills by category
  swaroop --contact      Contact information
  swaroop --location     Current location
  swaroop --education    Academic history
  swaroop --certifications  Certifications
  swaroop --github       GitHub repositories
  swaroop --secret       ???
  ls                     List domains
  whoami                 Who am I
  neofetch               System info
  clear                  Clear terminal
  exit                   Close terminal`;
    }

    if (trimmed === "swaroop --about") return PROFESSIONAL_SUMMARY;

    if (trimmed === "swaroop --journey") {
      return CAREER.map(
        (c) => `${c.version} — ${c.company} [${c.period}]\n    ${c.role} · ${c.location}${c.active ? " (ACTIVE)" : ""}`
      ).join("\n\n");
    }

    if (trimmed === "swaroop --stats") {
      return `Products Built:    20+
Domains:           5 (Education, Climate, Enterprise, FinTech, Construction)
Best Accuracy:     97% (Sahara Sense)
Social Impact:     380M outdoor workers targeted (Garmi Mitra)
Team Led:          Cross-functional coordination across all products
Experience:        Since 2019 (5+ years operations + AI product management)`;
    }

    if (trimmed.startsWith("swaroop --products")) {
      const domainMatch = trimmed.match(/--domain\s+(\w+)/);
      if (domainMatch) {
        const domain = domainMatch[1] as Domain;
        if (!(domain in DOMAINS)) return `Unknown domain: ${domainMatch[1]}. Available: education, climate, enterprise, fintech, construction`;
        const products = ALL_PRODUCTS.filter((p) => p.domain === domain);
        return products.map((p) => `  ${p.name} — ${p.tagline} (${p.year})`).join("\n");
      }
      return ALL_PRODUCTS.map((p) => `  [${p.domain}] ${p.name} — ${p.tagline} (${p.year})`).join("\n");
    }

    if (trimmed === "swaroop --skills") {
      return Object.entries(SKILLS)
        .map(([cat, items]) => `${cat}:\n${items.map((i) => `  · ${i}`).join("\n")}`)
        .join("\n\n");
    }

    if (trimmed === "swaroop --contact") {
      return `Email:    ${CONTACT.email}
Phone:    ${CONTACT.phone}
LinkedIn: ${CONTACT.linkedin}
GitHub:   ${CONTACT.github}
Location: ${CONTACT.location} · ${CONTACT.openTo}`;
    }

    if (trimmed === "swaroop --location") return `${CONTACT.location} · ${CONTACT.openTo}`;

    if (trimmed === "swaroop --education") {
      return EDUCATION.map(
        (e) => `${e.degree}\n  ${e.institution}\n  ${e.period}\n  ${e.campuses}`
      ).join("\n\n");
    }

    if (trimmed === "swaroop --github") {
      return `GitHub: https://github.com/sumith1309
Public Repos: 18
Top Repositories:
  COGNISPACE          — Enterprise AI Platform
  Project_Sahara_Sense — Dust Storm Prediction (97% accuracy)
  Bank-Statement-Analyzer — AI FinTech Tool
  Travel-Itinerary    — AI Travel Planner (Trails & Miles)
  Stationary_Hub      — B2B/B2C E-commerce
  Enterprise-Forecasting — ARIMA + XGBoost
  customer-churn-dashboard — ML Prediction
  Predictive-Maintenance — CNN-LSTM + CV
  NLP_Ticket_Classifier — Zero-shot Classification

Visit: https://github.com/sumith1309`;
    }

    if (trimmed === "swaroop --certifications") {
      return CERTIFICATIONS.map((c) => `  ✓ ${c}`).join("\n");
    }

    if (trimmed === "swaroop --secret") {
      return "You found it. The secret is: I built this portfolio too. 🔨";
    }

    if (trimmed === "ls") {
      return "education/  climate/  enterprise/  fintech/  construction/";
    }

    if (trimmed.startsWith("cd ") && trimmed.includes("ls")) {
      const dir = trimmed.replace("cd ", "").split("&&")[0].trim().replace("/", "");
      if (dir in DOMAINS) {
        const products = ALL_PRODUCTS.filter((p) => p.domain === dir);
        return products.map((p) => `${p.id}.app`).join("  ");
      }
      return `cd: no such directory: ${dir}`;
    }

    if (trimmed === "whoami") return "S. Jyothi Swaroop — AI Product Manager";

    if (trimmed === "neofetch") return NEOFETCH;

    if (trimmed === "cat readme.md" || trimmed === "cat README.md") {
      return `# SwaroopOS v2.0\n\nWelcome to S. Jyothi Swaroop's interactive portfolio.\nExplore 20+ AI products across 5 domains.\n\nType 'swaroop --help' for commands.`;
    }

    if (trimmed === "clear") return "__CLEAR__";

    if (trimmed === "exit") {
      return "__EXIT__";
    }

    if (trimmed === "") return "";

    return `swaroop: command not found: ${cmd.trim()}. Type 'swaroop --help' for available commands.`;
  }, []);

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
      const commands = ["swaroop --help", "swaroop --about", "swaroop --journey", "swaroop --stats", "swaroop --products", "swaroop --skills", "swaroop --contact", "swaroop --location", "swaroop --education", "swaroop --certifications", "swaroop --github", "swaroop --secret", "ls", "whoami", "neofetch", "clear", "exit"];
      const match = commands.find((c) => c.startsWith(input));
      if (match) setInput(match);
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
