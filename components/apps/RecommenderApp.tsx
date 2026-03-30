"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/lib/store";

interface Recommendation {
  projectId: string;
  name: string;
  reason: string;
}

const PRESETS = [
  "Hiring for an AI role",
  "Interested in climate tech",
  "Looking for a technical co-founder",
  "Exploring enterprise solutions",
];

export default function RecommenderApp() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [customIntent, setCustomIntent] = useState("");
  const [activeIntent, setActiveIntent] = useState<string | null>(null);
  const setActiveProjectId = useStore((s) => s.setActiveProjectId);
  const openWindow = useStore((s) => s.openWindow);

  const fetchRecommendations = async (intent: string) => {
    if (!intent.trim() || loading) return;
    setLoading(true);
    setActiveIntent(intent);
    setRecommendations([]);

    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intent }),
      });
      const data = await res.json();
      if (data.recommendations && data.recommendations.length > 0) {
        setRecommendations(data.recommendations);
      }
    } catch {
      // silently fail
    }

    setLoading(false);
  };

  const handleViewProject = (projectId: string) => {
    setActiveProjectId(projectId);
    openWindow("showcase");
  };

  return (
    <div className="flex flex-col h-full min-h-[450px] bg-[#F2F2F7]">
      {/* Header */}
      <div className="px-5 pt-5 pb-3">
        <h3 className="text-[16px] font-bold text-[#1C1C1E]">AI Project Guide</h3>
        <p className="text-[12px] text-[#8E8E93] mt-0.5">Tell me what you&apos;re looking for</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-5" style={{ scrollbarWidth: "none" }}>
        {/* Preset buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {PRESETS.map((preset) => (
            <button
              key={preset}
              onClick={() => {
                setCustomIntent("");
                fetchRecommendations(preset);
              }}
              disabled={loading}
              className={`px-3 py-2 rounded-xl text-[12px] font-medium transition-all cursor-pointer border ${
                activeIntent === preset
                  ? "text-white border-transparent"
                  : "text-[#3B82F6] bg-white border-[rgba(59,130,246,0.2)] hover:bg-[#EFF6FF]"
              }`}
              style={
                activeIntent === preset
                  ? { background: "linear-gradient(135deg, #3B82F6, #8B5CF6)" }
                  : undefined
              }
            >
              {preset}
            </button>
          ))}
        </div>

        {/* Custom input */}
        <div className="flex items-center gap-2 mb-5">
          <input
            type="text"
            value={customIntent}
            onChange={(e) => setCustomIntent(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchRecommendations(customIntent)}
            placeholder="Or describe what you need..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-white text-[13px] text-[#1C1C1E] placeholder-[#C7C7CC] outline-none border border-[rgba(0,0,0,0.06)] focus:border-[#3B82F6] transition-colors"
            disabled={loading}
          />
          <button
            onClick={() => fetchRecommendations(customIntent)}
            disabled={!customIntent.trim() || loading}
            className="px-4 py-2.5 rounded-xl text-[13px] font-medium text-white shrink-0 transition-all disabled:opacity-40 cursor-pointer"
            style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)" }}
          >
            Search
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center py-10"
          >
            <div className="bg-white rounded-2xl px-5 py-3 flex items-center gap-2 shadow-sm border border-[rgba(0,0,0,0.04)]">
              <span className="text-[13px] text-[#8E8E93]">Finding best matches</span>
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

        {/* Results */}
        <AnimatePresence>
          {!loading && recommendations.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <p className="text-[11px] text-[#8E8E93] uppercase tracking-wider font-medium mb-2">
                Top matches for &ldquo;{activeIntent}&rdquo;
              </p>
              {recommendations.map((rec, idx) => (
                <motion.div
                  key={rec.projectId}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-4 border border-[rgba(0,0,0,0.04)]"
                  style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-bold text-white shrink-0"
                          style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)" }}
                        >
                          {idx + 1}
                        </span>
                        <h4 className="text-[14px] font-semibold text-[#1C1C1E] truncate">
                          {rec.name}
                        </h4>
                      </div>
                      <p className="text-[12px] text-[#6B7280] mt-2 leading-relaxed">
                        {rec.reason}
                      </p>
                    </div>
                    <button
                      onClick={() => handleViewProject(rec.projectId)}
                      className="px-3 py-1.5 rounded-lg text-[11px] font-medium text-white shrink-0 transition-all hover:scale-105 cursor-pointer"
                      style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)" }}
                    >
                      View Project →
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {!loading && recommendations.length === 0 && !activeIntent && (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-[20px] mb-3"
              style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)" }}
            >
              <span className="text-white">🧭</span>
            </div>
            <p className="text-[13px] text-[#8E8E93]">
              Select a preset or type your intent to discover<br />the most relevant projects
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-2 border-t border-[rgba(0,0,0,0.06)] bg-white/60" style={{ backdropFilter: "blur(20px)" }}>
        <p className="text-[10px] text-[#C7C7CC] text-center">
          Powered by GPT-4o-mini · Matches from 20+ projects
        </p>
      </div>
    </div>
  );
}
