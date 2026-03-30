"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore, type AppId } from "@/lib/store";
import { DOMAINS } from "@/lib/data";

interface SearchItem {
  id: AppId;
  label: string;
  category: string;
  color: string;
  icon: React.ReactNode;
}

const SEARCH_ITEMS: SearchItem[] = [
  // Domains
  ...Object.entries(DOMAINS).map(([id, d]) => ({
    id: id as AppId,
    label: d.label,
    category: "Domains",
    color: d.color,
    icon: <DomainSearchIcon id={id} />,
  })),
  // System
  { id: "aichat", label: "Ask Swaroop AI", category: "AI", color: "#3B82F6", icon: <SearchIcon><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 10h.01"/><path d="M12 10h.01"/><path d="M16 10h.01"/></SearchIcon> },
  { id: "about", label: "About Me", category: "System", color: "#3B82F6", icon: <SearchIcon><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/></SearchIcon> },
  { id: "skills", label: "Skills & Expertise", category: "System", color: "#8B5CF6", icon: <SearchIcon><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/></SearchIcon> },
  { id: "terminal", label: "Terminal", category: "System", color: "#475569", icon: <SearchIcon><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></SearchIcon> },
  { id: "contact", label: "Contact", category: "System", color: "#10B981", icon: <SearchIcon><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></SearchIcon> },
  // Utilities
  { id: "calculator", label: "Calculator", category: "Utilities", color: "#F59E0B", icon: <SearchIcon><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/></SearchIcon> },
  { id: "music", label: "Music Player", category: "Utilities", color: "#EC4899", icon: <SearchIcon><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></SearchIcon> },
  { id: "calendar", label: "Calendar", category: "Utilities", color: "#3B82F6", icon: <SearchIcon><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></SearchIcon> },
  { id: "settings", label: "Settings", category: "Utilities", color: "#64748B", icon: <SearchIcon><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></SearchIcon> },
  { id: "gallery", label: "Gallery", category: "Utilities", color: "#6366F1", icon: <SearchIcon><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></SearchIcon> },
  { id: "showcase", label: "Showcase", category: "Utilities", color: "#F97316", icon: <SearchIcon><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3l-4 4-4-4"/></SearchIcon> },
  { id: "tictactoe", label: "Tic-Tac-Toe", category: "Games", color: "#EF4444", icon: <SearchIcon><line x1="8" y1="2" x2="8" y2="22"/><line x1="16" y1="2" x2="16" y2="22"/><line x1="2" y1="8" x2="22" y2="8"/><line x1="2" y1="16" x2="22" y2="16"/></SearchIcon> },
  { id: "game2048", label: "2048", category: "Games", color: "#F97316", icon: <SearchIcon><rect x="3" y="3" width="18" height="18" rx="2"/><rect x="7" y="7" width="4" height="4" rx="1"/><rect x="13" y="7" width="4" height="4" rx="1"/></SearchIcon> },
];

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

export default function SpotlightSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const openWindow = useStore((s) => s.openWindow);
  const setPendingAIQuery = useStore((s) => s.setPendingAIQuery);

  const filtered = query.trim()
    ? SEARCH_ITEMS.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      )
    : SEARCH_ITEMS;

  // Show "Ask AI" option when query is 3+ chars and no static results match
  const showAskAI = query.trim().length >= 3 && filtered.length === 0;
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
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const launch = (id: AppId) => {
    openWindow(id);
    setOpen(false);
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
        launch(filtered[selectedIndex].id);
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
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search apps, tools, games..."
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
                      key={item.id}
                      onClick={() => launch(item.id)}
                      onMouseEnter={() => setSelectedIndex(i)}
                      className={`w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors cursor-pointer ${
                        i === selectedIndex ? "bg-[#3B82F6]" : "hover:bg-[rgba(0,0,0,0.04)]"
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
                          {item.label}
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
