"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Mode = "classify" | "summarize";

const EXAMPLE_TRANSACTIONS = [
  "Salary Credit 85000",
  "Swiggy Food Order 450",
  "Uber Ride 280",
  "Electricity Bill Payment",
  "Amazon Purchase 2999",
];

const CATEGORY_COLORS: Record<string, string> = {
  "Income": "#10B981",
  "Expense-Food": "#F59E0B",
  "Expense-Transport": "#6366F1",
  "Expense-Utilities": "#EC4899",
  "Expense-Shopping": "#8B5CF6",
  "Expense-Entertainment": "#F97316",
  "Expense-Healthcare": "#EF4444",
  "Expense-Education": "#3B82F6",
  "Transfer": "#14B8A6",
  "Investment": "#22C55E",
  "EMI/Loan": "#E11D48",
  "Other": "#6B7280",
};

export default function AIDemoApp() {
  const [mode, setMode] = useState<Mode>("classify");
  const [classifyInput, setClassifyInput] = useState("");
  const [summarizeInput, setSummarizeInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [classifyResult, setClassifyResult] = useState<{ result: string; confidence?: string } | null>(null);
  const [summarizeResult, setSummarizeResult] = useState<string | null>(null);

  const handleSubmit = async (text: string) => {
    if (!text.trim() || loading) return;
    setLoading(true);

    if (mode === "classify") {
      setClassifyResult(null);
    } else {
      setSummarizeResult(null);
    }

    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, mode }),
      });
      const data = await res.json();

      if (mode === "classify") {
        setClassifyResult({ result: data.result, confidence: data.confidence });
      } else {
        setSummarizeResult(data.result);
      }
    } catch {
      if (mode === "classify") {
        setClassifyResult({ result: "Error — please try again" });
      } else {
        setSummarizeResult("Error — please try again.");
      }
    }

    setLoading(false);
  };

  const getCategoryColor = (category: string): string => {
    return CATEGORY_COLORS[category] || "#6B7280";
  };

  return (
    <div className="flex flex-col h-full min-h-[450px] bg-[#0A0A0F] text-white">
      {/* Header */}
      <div className="px-5 pt-5 pb-3">
        <h3 className="text-[16px] font-bold text-white/90">AI Playground</h3>
        <p className="text-[12px] text-white/40 mt-0.5">
          Try AI features live — powered by GPT-4o-mini
        </p>
      </div>

      {/* Mode tabs */}
      <div className="px-5 mb-4">
        <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
          {(["classify", "summarize"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-2 rounded-lg text-[12px] font-medium transition-all cursor-pointer ${
                mode === m
                  ? "text-white"
                  : "text-white/40 hover:text-white/60"
              }`}
              style={
                mode === m
                  ? { background: "linear-gradient(135deg, #3B82F6, #8B5CF6)" }
                  : undefined
              }
            >
              {m === "classify" ? "Transaction Classifier" : "Text Summarizer"}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-5" style={{ scrollbarWidth: "none" }}>
        <AnimatePresence mode="wait">
          {mode === "classify" ? (
            <motion.div
              key="classify"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Input */}
              <div className="flex items-center gap-2 mb-3">
                <input
                  type="text"
                  value={classifyInput}
                  onChange={(e) => setClassifyInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit(classifyInput)}
                  placeholder="e.g., NEFT to Axis Bank 50000"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 text-[13px] text-white placeholder-white/30 outline-none border border-white/10 focus:border-[#3B82F6] transition-colors"
                  disabled={loading}
                />
                <button
                  onClick={() => handleSubmit(classifyInput)}
                  disabled={!classifyInput.trim() || loading}
                  className="px-4 py-2.5 rounded-xl text-[13px] font-medium text-white shrink-0 transition-all disabled:opacity-40 cursor-pointer"
                  style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)" }}
                >
                  Classify
                </button>
              </div>

              {/* Example buttons */}
              <div className="flex flex-wrap gap-2 mb-5">
                {EXAMPLE_TRANSACTIONS.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => {
                      setClassifyInput(ex);
                      handleSubmit(ex);
                    }}
                    disabled={loading}
                    className="px-3 py-1.5 rounded-lg text-[11px] font-medium text-white/60 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white/80 transition-all cursor-pointer"
                  >
                    {ex}
                  </button>
                ))}
              </div>

              {/* Loading */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center py-8"
                >
                  <div className="bg-white/5 rounded-2xl px-5 py-3 flex items-center gap-2 border border-white/10">
                    <span className="text-[13px] text-white/50">Classifying</span>
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Result */}
              <AnimatePresence>
                {!loading && classifyResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-white/5 rounded-2xl p-5 border border-white/10"
                  >
                    <p className="text-[11px] text-white/40 uppercase tracking-wider mb-3">
                      Classification Result
                    </p>
                    <div className="flex items-center gap-3">
                      <span
                        className="px-4 py-2 rounded-xl text-[14px] font-bold"
                        style={{
                          backgroundColor: `${getCategoryColor(classifyResult.result)}20`,
                          color: getCategoryColor(classifyResult.result),
                          border: `1px solid ${getCategoryColor(classifyResult.result)}40`,
                        }}
                      >
                        {classifyResult.result}
                      </span>
                      {classifyResult.confidence && (
                        <span
                          className={`text-[11px] font-medium px-2 py-1 rounded-lg ${
                            classifyResult.confidence === "high"
                              ? "text-emerald-400 bg-emerald-400/10"
                              : classifyResult.confidence === "medium"
                              ? "text-amber-400 bg-amber-400/10"
                              : "text-red-400 bg-red-400/10"
                          }`}
                        >
                          {classifyResult.confidence} confidence
                        </span>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Empty state */}
              {!loading && !classifyResult && (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-[12px] text-white/30">
                    Enter a transaction description or pick an example
                  </p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="summarize"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Textarea */}
              <textarea
                value={summarizeInput}
                onChange={(e) => setSummarizeInput(e.target.value)}
                placeholder="Paste any text to summarize..."
                className="w-full h-32 px-4 py-3 rounded-xl bg-white/5 text-[13px] text-white placeholder-white/30 outline-none border border-white/10 focus:border-[#3B82F6] transition-colors resize-none mb-3"
                disabled={loading}
              />
              <button
                onClick={() => handleSubmit(summarizeInput)}
                disabled={!summarizeInput.trim() || loading}
                className="w-full py-2.5 rounded-xl text-[13px] font-medium text-white transition-all disabled:opacity-40 cursor-pointer mb-5"
                style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)" }}
              >
                Summarize
              </button>

              {/* Loading */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center py-8"
                >
                  <div className="bg-white/5 rounded-2xl px-5 py-3 flex items-center gap-2 border border-white/10">
                    <span className="text-[13px] text-white/50">Summarizing</span>
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Result */}
              <AnimatePresence>
                {!loading && summarizeResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-white/5 rounded-2xl p-5 border border-white/10"
                  >
                    <p className="text-[11px] text-white/40 uppercase tracking-wider mb-3">
                      Summary
                    </p>
                    <p className="text-[13px] text-white/80 leading-relaxed">
                      {summarizeResult}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Empty state */}
              {!loading && !summarizeResult && (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-[12px] text-white/30">
                    Paste text above and hit Summarize
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="px-5 py-2 border-t border-white/5 bg-[#0A0A0F]">
        <p className="text-[10px] text-white/20 text-center">
          Powered by GPT-4o-mini · Responses generated in real-time
        </p>
      </div>
    </div>
  );
}
