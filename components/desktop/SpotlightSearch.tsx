"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore, type AppId } from "@/lib/store";
import { DOMAINS, ALL_PRODUCTS, CONTACT } from "@/lib/data";

type SearchAction =
  | { type: "app"; id: AppId }
  | { type: "project"; id: string }
  | { type: "url"; href: string }
  | { type: "copy"; text: string };

interface SearchItem {
  key: string;
  label: string;
  category: string;
  color: string;
  icon: React.ReactNode;
  action: SearchAction;
  keywords?: string;
}

function SearchIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

function DomainSearchIcon({ id }: { id: string }) {
  const paths: Record<string, React.ReactNode> = {
    education: <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></>,
    climate: <><path d="M12 2v2"/><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"/><path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"/></>,
    enterprise: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    fintech: <><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></>,
    construction: <><rect x="2" y="6" width="20" height="8" rx="1"/><path d="M17 14v7M7 14v7M17 3v3M7 3v3"/></>,
  };
  return <SearchIcon>{paths[id]}</SearchIcon>;
}

function SparkleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
    </svg>
  );
}

/* Recruiter fast-path actions come first — resume, live work, links. */
const RECRUITER_ITEMS: SearchItem[] = [
  { key: "act-work", label: "View Production Work", category: "Recruiter", color: "#0F172A", action: { type: "app", id: "showcase" as AppId }, keywords: "portfolio projects shipped live production", icon: <SearchIcon><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3l-4 4-4-4"/></SearchIcon> },
  { key: "act-resume", label: "Download Resume", category: "Recruiter", color: "#1e40af", action: { type: "url", href: "/api/cv" }, keywords: "cv resume download hire", icon: <SearchIcon><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></SearchIcon> },
  { key: "act-github", label: "Open GitHub", category: "Recruiter", color: "#0F172A", action: { type: "url", href: CONTACT.github }, keywords: "code repos source", icon: <SearchIcon><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5"/></SearchIcon> },
  { key: "act-linkedin", label: "Open LinkedIn", category: "Recruiter", color: "#0A66C2", action: { type: "url", href: CONTACT.linkedin }, keywords: "connect profile network", icon: <SearchIcon><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></SearchIcon> },
  { key: "act-email", label: `Copy Email — ${CONTACT.email}`, category: "Recruiter", color: "#047857", action: { type: "copy", text: CONTACT.email }, keywords: "contact mail reach", icon: <SearchIcon><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></SearchIcon> },
];

const APP_ITEMS: SearchItem[] = [
  ...Object.entries(DOMAINS).map(([id, d]) => ({
    key: `app-${id}`,
    label: d.label,
    category: "Domains",
    color: d.color,
    action: { type: "app", id: id as AppId } as SearchAction,
    icon: <DomainSearchIcon id={id} />,
  })),
  { key: "app-aichat", label: "Ask Swaroop AI", category: "AI", color: "#3B82F6", action: { type: "app", id: "aichat" as AppId }, icon: <SearchIcon><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 10h.01"/><path d="M12 10h.01"/><path d="M16 10h.01"/></SearchIcon> },
  { key: "app-about", label: "About Me", category: "System", color: "#3B82F6", action: { type: "app", id: "about" as AppId }, icon: <SearchIcon><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/></SearchIcon> },
  { key: "app-skills", label: "Skills & Expertise", category: "System", color: "#8B5CF6", action: { type: "app", id: "skills" as AppId }, icon: <SearchIcon><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/></SearchIcon> },
  { key: "app-terminal", label: "Terminal", category: "System", color: "#475569", action: { type: "app", id: "terminal" as AppId }, icon: <SearchIcon><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></SearchIcon> },
  { key: "app-contact", label: "Contact", category: "System", color: "#10B981", action: { type: "app", id: "contact" as AppId }, icon: <SearchIcon><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></SearchIcon> },
  { key: "app-calculator", label: "Calculator", category: "Utilities", color: "#F59E0B", action: { type: "app", id: "calculator" as AppId }, icon: <SearchIcon><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/></SearchIcon> },
  { key: "app-music", label: "Music Player", category: "Utilities", color: "#EC4899", action: { type: "app", id: "music" as AppId }, icon: <SearchIcon><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></SearchIcon> },
  { key: "app-calendar", label: "Calendar", category: "Utilities", color: "#3B82F6", action: { type: "app", id: "calendar" as AppId }, icon: <SearchIcon><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></SearchIcon> },
  { key: "app-settings", label: "Settings", category: "Utilities", color: "#64748B", action: { type: "app", id: "settings" as AppId }, icon: <SearchIcon><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></SearchIcon> },
  { key: "app-gallery", label: "Gallery", category: "Utilities", color: "#6366F1", action: { type: "app", id: "gallery" as AppId }, icon: <SearchIcon><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></SearchIcon> },
  { key: "app-tictactoe", label: "Tic-Tac-Toe", category: "Games", color: "#EF4444", action: { type: "app", id: "tictactoe" as AppId }, icon: <SearchIcon><line x1="8" y1="2" x2="8" y2="22"/><line x1="16" y1="2" x2="16" y2="22"/><line x1="2" y1="8" x2="22" y2="8"/><line x1="2" y1="16" x2="22" y2="16"/></SearchIcon> },
  { key: "app-game2048", label: "2048", category: "Games", color: "#F97316", action: { type: "app", id: "game2048" as AppId }, icon: <SearchIcon><rect x="3" y="3" width="18" height="18" rx="2"/><rect x="7" y="7" width="4" height="4" rx="1"/><rect x="13" y="7" width="4" height="4" rx="1"/></SearchIcon> },
];

/* Every project is searchable and opens its case study directly. */
const PROJECT_ITEMS: SearchItem[] = ALL_PRODUCTS.map((p) => ({
  key: `proj-${p.id}`,
  label: p.name,
  category: "Projects",
  color: DOMAINS[p.domain].color,
  action: { type: "project", id: p.id },
  keywords: `${p.tagline} ${p.techStack.flatMap((c) => c.items).join(" ")}`,
  icon: <SearchIcon><path d="M2 9.5V4a2 2 0 0 1 2-2h6l2 2h8a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"/></SearchIcon>,
}));

const ALL_ITEMS: SearchItem[] = [...RECRUITER_ITEMS, ...APP_ITEMS, ...PROJECT_ITEMS];

export default function SpotlightSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const openWindow = useStore((s) => s.openWindow);
  const setActiveProjectId = useStore((s) => s.setActiveProjectId);
  const setPendingAIQuery = useStore((s) => s.setPendingAIQuery);

  const q = query.trim().toLowerCase();
  const filtered = q
    ? ALL_ITEMS.filter(
        (item) =>
          item.label.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          (item.keywords || "").toLowerCase().includes(q)
      )
    : ALL_ITEMS.filter((item) => item.category !== "Projects");

  // Show "Ask AI" option when query is 3+ chars and no static results match
  const showAskAI = q.length >= 3 && filtered.length === 0;
  const totalItems = filtered.length + (showAskAI ? 1 : 0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      setQuery("");
      setSelectedIndex(0);
      setCopied(false);
      inputRef.current?.focus();
    }, 50);
    return () => clearTimeout(t);
  }, [open]);

  const run = (item: SearchItem) => {
    const a = item.action;
    if (a.type === "app") {
      openWindow(a.id);
      setOpen(false);
    } else if (a.type === "project") {
      setActiveProjectId(a.id);
      setOpen(false);
    } else if (a.type === "url") {
      window.open(a.href, "_blank", "noopener,noreferrer");
      setOpen(false);
    } else if (a.type === "copy") {
      navigator.clipboard?.writeText(a.text).catch(() => {});
      setCopied(true);
      setTimeout(() => setOpen(false), 700);
    }
  };

  const launchAIWithQuery = () => {
    setPendingAIQuery(query.trim());
    openWindow("aichat");
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, totalItems - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      if (showAskAI && selectedIndex === 0) {
        launchAIWithQuery();
      } else if (filtered[selectedIndex]) {
        run(filtered[selectedIndex]);
      }
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[90] bg-black/30"
            style={{ backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
            onClick={() => setOpen(false)}
          />

          {/* Search panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 z-[91] w-[520px] max-w-[90vw] rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(40px) saturate(1.8)",
              WebkitBackdropFilter: "blur(40px) saturate(1.8)",
              border: "1px solid rgba(255,255,255,0.6)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.25), 0 8px 20px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)",
            }}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[rgba(0,0,0,0.06)]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search projects, actions, apps..."
                aria-label="Search projects, actions, and apps"
                className="flex-1 bg-transparent text-[16px] text-[#1C1C1E] placeholder-[#C7C7CC] outline-none font-medium"
              />
              <kbd className="px-2 py-0.5 rounded-md bg-[#F2F2F7] text-[11px] font-mono text-[#8E8E93] font-medium">ESC</kbd>
            </div>

            {/* Results */}
            <div className="max-h-[360px] overflow-y-auto py-2" style={{ scrollbarWidth: "none" }}>
              {filtered.length === 0 && !showAskAI ? (
                <div className="px-5 py-8 text-center">
                  <p className="text-[14px] text-[#8E8E93]">No results found</p>
                </div>
              ) : (
                <>
                  {filtered.map((item, i) => (
                    <button
                      key={item.key}
                      onClick={() => run(item)}
                      onMouseEnter={() => setSelectedIndex(i)}
                      className={`w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors cursor-pointer ${
                        i === selectedIndex ? "bg-[#1e40af]" : "hover:bg-[rgba(0,0,0,0.04)]"
                      }`}
                    >
                      <div
                        className="w-8 h-8 rounded-[10px] flex items-center justify-center shrink-0"
                        style={{
                          background: i === selectedIndex ? "rgba(255,255,255,0.2)" : `${item.color}12`,
                          color: i === selectedIndex ? "white" : item.color,
                        }}
                      >
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-[14px] font-medium truncate ${i === selectedIndex ? "text-white" : "text-[#1C1C1E]"}`}>
                          {copied && item.action.type === "copy" ? "Copied to clipboard ✓" : item.label}
                        </p>
                      </div>
                      <span className={`text-[11px] font-medium shrink-0 ${i === selectedIndex ? "text-white/60" : "text-[#C7C7CC]"}`}>
                        {item.category}
                      </span>
                    </button>
                  ))}

                  {/* Ask AI option */}
                  {showAskAI && (
                    <button
                      onClick={launchAIWithQuery}
                      onMouseEnter={() => setSelectedIndex(filtered.length)}
                      className={`w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors cursor-pointer ${
                        selectedIndex === filtered.length ? "bg-[#8B5CF6]" : "hover:bg-[rgba(0,0,0,0.04)]"
                      }`}
                    >
                      <div
                        className="w-8 h-8 rounded-[10px] flex items-center justify-center shrink-0"
                        style={{
                          background: selectedIndex === filtered.length
                            ? "rgba(255,255,255,0.2)"
                            : "rgba(139,92,246,0.08)",
                          color: selectedIndex === filtered.length ? "white" : "#8B5CF6",
                        }}
                      >
                        <SparkleIcon />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-[14px] font-medium truncate ${
                          selectedIndex === filtered.length ? "text-white" : "text-[#1C1C1E]"
                        }`}>
                          Ask AI: {query.trim()}
                        </p>
                      </div>
                      <span className={`text-[11px] font-medium shrink-0 ${
                        selectedIndex === filtered.length ? "text-white/60" : "text-[#C7C7CC]"
                      }`}>
                        AI
                      </span>
                    </button>
                  )}
                </>
              )}
            </div>

            {/* Footer hint */}
            <div className="flex items-center justify-between px-5 py-2.5 border-t border-[rgba(0,0,0,0.06)] bg-[rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3 text-[11px] text-[#8E8E93]">
                <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-[#F2F2F7] text-[10px] font-mono">↑↓</kbd> Navigate</span>
                <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-[#F2F2F7] text-[10px] font-mono">↵</kbd> Open</span>
              </div>
              <span className="text-[11px] text-[#C7C7CC]">{totalItems} results</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
