"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const QUICK_PROMPTS = [
  "Who is Swaroop?",
  "What has he built?",
  "His tech stack?",
];

export default function ChatWidget({ isDark }: { isDark: boolean }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", content: text.trim() };
    setMessages((p) => [...p, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const history = [...messages, userMsg].map((m) => ({ role: m.role, content: m.content }));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json();
      setMessages((p) => [...p, { id: `a-${Date.now()}`, role: "assistant", content: data.response || data.error || "Something went wrong." }]);
    } catch {
      setMessages((p) => [...p, { id: `e-${Date.now()}`, role: "assistant", content: "Connection error." }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed z-[45] bottom-[76px] left-5 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div
          className="w-12 h-12 rounded-[16px] flex items-center justify-center relative overflow-hidden"
          style={{
            background: open
              ? "linear-gradient(135deg, #EF4444, #F97316)"
              : "linear-gradient(135deg, #3B82F6, #8B5CF6)",
            boxShadow: open
              ? "0 4px 20px rgba(239,68,68,0.4)"
              : "0 4px 20px rgba(59,130,246,0.4)",
          }}
        >
          <div className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
            style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)" }} />
          <AnimatePresence mode="wait">
            {open ? (
              <motion.svg key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}
                width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </motion.svg>
            ) : (
              <motion.svg key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}
                width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <path d="M8 10h.01" /><path d="M12 10h.01" /><path d="M16 10h.01" />
              </motion.svg>
            )}
          </AnimatePresence>
        </div>

        {/* Pulse ring when closed */}
        {!open && (
          <motion.div
            className="absolute inset-0 rounded-[16px]"
            style={{ border: "2px solid rgba(59,130,246,0.4)" }}
            animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed z-[44] bottom-[136px] left-5 w-[340px] rounded-2xl overflow-hidden flex flex-col"
            style={{
              height: "420px",
              background: isDark ? "rgba(15,23,42,0.95)" : "rgba(255,255,255,0.95)",
              backdropFilter: "blur(40px) saturate(1.8)",
              WebkitBackdropFilter: "blur(40px) saturate(1.8)",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.2), 0 4px 16px rgba(0,0,0,0.08)",
            }}
          >
            {/* Header */}
            <div className="px-4 py-3 flex items-center gap-3 shrink-0"
              style={{ borderBottom: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)" }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div>
                <p className={`text-[13px] font-semibold ${isDark ? "text-white" : "text-[#1C1C1E]"}`}>Swaroop&apos;s Diary</p>
                <p className={`text-[10px] ${isDark ? "text-white/40" : "text-[#8E8E93]"}`}>AI-powered · Ask anything</p>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                <span className={`text-[10px] ${isDark ? "text-white/30" : "text-[#C7C7CC]"}`}>Online</span>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5" style={{ scrollbarWidth: "none" }}>
              {messages.length === 0 && !loading && (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={isDark ? "rgba(255,255,255,0.3)" : "#C7C7CC"} strokeWidth="1.5">
                      <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </div>
                  <p className={`text-[12px] text-center max-w-[200px] ${isDark ? "text-white/30" : "text-[#C7C7CC]"}`}>
                    Ask anything about Swaroop — his projects, skills, career, or education.
                  </p>
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {QUICK_PROMPTS.map((p) => (
                      <button key={p} onClick={() => send(p)}
                        className={`px-3 py-1 rounded-full text-[11px] font-medium cursor-pointer transition-colors ${
                          isDark
                            ? "bg-white/8 text-white/50 hover:bg-white/12"
                            : "bg-[#F2F2F7] text-[#6B6B70] hover:bg-[#E5E5EA]"
                        }`}>
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2 text-[13px] leading-relaxed ${
                      msg.role === "user"
                        ? "rounded-[16px] rounded-br-[4px] text-white"
                        : `rounded-[16px] rounded-bl-[4px] ${isDark ? "text-white/90" : "text-[#1C1C1E]"}`
                    }`}
                    style={{
                      background: msg.role === "user"
                        ? "linear-gradient(135deg, #3B82F6, #8B5CF6)"
                        : isDark ? "rgba(255,255,255,0.08)" : "#F2F2F7",
                    }}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className={`px-4 py-2.5 rounded-[16px] rounded-bl-[4px] flex gap-1 ${isDark ? "bg-white/8" : "bg-[#F2F2F7]"}`}>
                    {[0, 1, 2].map((i) => (
                      <motion.div key={i} className={`w-1.5 h-1.5 rounded-full ${isDark ? "bg-white/30" : "bg-[#C7C7CC]"}`}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12 }} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="px-3 py-2.5 shrink-0" style={{ borderTop: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)" }}>
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send(input)}
                  placeholder="Ask about Swaroop..."
                  disabled={loading}
                  className={`flex-1 px-3.5 py-2 rounded-full text-[13px] outline-none transition-colors ${
                    isDark
                      ? "bg-white/8 text-white placeholder-white/25 focus:bg-white/12"
                      : "bg-[#F2F2F7] text-[#1C1C1E] placeholder-[#C7C7CC] focus:bg-[#E5E5EA]"
                  }`}
                />
                <button
                  onClick={() => send(input)}
                  disabled={!input.trim() || loading}
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 disabled:opacity-30 cursor-pointer transition-opacity"
                  style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
