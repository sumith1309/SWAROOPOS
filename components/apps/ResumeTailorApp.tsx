"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ParsedSection {
  title: string;
  content: string;
}

function parseResponse(text: string): ParsedSection[] {
  const sections: ParsedSection[] = [];
  const parts = text.split(/^## /m).filter(Boolean);

  for (const part of parts) {
    const newlineIndex = part.indexOf("\n");
    if (newlineIndex === -1) continue;
    const title = part.slice(0, newlineIndex).trim();
    const content = part.slice(newlineIndex + 1).trim();
    if (title && content) {
      sections.push({ title, content });
    }
  }

  return sections;
}

const SECTION_ICONS: Record<string, React.ReactNode> = {
  "Why I'm a Fit": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  "Relevant Projects": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  "Matching Skills": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  "Talking Points": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
};

const SECTION_COLORS: Record<string, string> = {
  "Why I'm a Fit": "#10B981",
  "Relevant Projects": "#3B82F6",
  "Matching Skills": "#8B5CF6",
  "Talking Points": "#F59E0B",
};

export default function ResumeTailorApp() {
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateMatch = async () => {
    if (!jobDescription.trim() || loading) return;

    setLoading(true);
    setError("");
    setResult("");

    try {
      const res = await fetch("/api/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription: jobDescription.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
      } else {
        setResult(data.response || "No response received.");
      }
    } catch {
      setError("Connection error. Please try again later.");
    }

    setLoading(false);
  };

  const sections = result ? parseResponse(result) : [];

  return (
    <div className="flex flex-col h-full min-h-[450px] bg-[#F2F2F7]">
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4" style={{ scrollbarWidth: "none" }}>
        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-[20px] font-semibold text-[#1C1C1E]">AI Resume Tailor</h1>
          <p className="text-[13px] text-[#8E8E93]">
            Paste a job description and get a tailored resume match
          </p>
        </div>

        {/* Input area */}
        <div
          className="bg-white rounded-2xl p-4 space-y-3"
          style={{
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            border: "1px solid rgba(0,0,0,0.04)",
          }}
        >
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            rows={6}
            className="w-full px-3 py-2.5 rounded-xl bg-[#F2F2F7] text-[14px] text-[#1C1C1E] placeholder-[#C7C7CC] outline-none border border-transparent focus:border-[#3B82F6] transition-colors resize-none"
            disabled={loading}
          />
          <button
            onClick={generateMatch}
            disabled={!jobDescription.trim() || loading}
            className="w-full py-2.5 rounded-xl text-white text-[14px] font-medium transition-all disabled:opacity-40 cursor-pointer"
            style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)" }}
          >
            {loading ? "Analyzing..." : "Generate Match"}
          </button>
        </div>

        {/* Loading indicator */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center"
          >
            <div
              className="bg-white rounded-2xl px-5 py-3 flex items-center gap-2"
              style={{
                border: "1px solid rgba(0,0,0,0.04)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              }}
            >
              <span className="text-[13px] text-[#8E8E93]">Matching your profile</span>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-[#C7C7CC]"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 text-[13px] text-red-600"
          >
            {error}
          </motion.div>
        )}

        {/* Results */}
        {sections.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            {sections.map((section, idx) => {
              const color = SECTION_COLORS[section.title] || "#3B82F6";
              const icon = SECTION_ICONS[section.title] || null;

              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.08 }}
                  className="bg-white rounded-2xl overflow-hidden"
                  style={{
                    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                    border: "1px solid rgba(0,0,0,0.04)",
                  }}
                >
                  {/* Section header */}
                  <div
                    className="flex items-center gap-2 px-4 py-2.5"
                    style={{
                      borderBottom: "1px solid rgba(0,0,0,0.04)",
                      color: color,
                    }}
                  >
                    {icon}
                    <span className="text-[14px] font-semibold">{section.title}</span>
                  </div>

                  {/* Section content */}
                  <div className="px-4 py-3 text-[13px] leading-relaxed text-[#1C1C1E] whitespace-pre-line">
                    {section.content}
                  </div>
                </motion.div>
              );
            })}

            {/* Reset button */}
            <button
              onClick={() => {
                setResult("");
                setJobDescription("");
              }}
              className="w-full py-2 rounded-xl text-[13px] font-medium text-[#8E8E93] bg-white transition-colors hover:bg-[#E5E5EA] cursor-pointer"
              style={{
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              Try Another Job Description
            </button>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <div className="px-3 py-2 border-t border-[rgba(0,0,0,0.06)] bg-white/80" style={{ backdropFilter: "blur(20px)" }}>
        <p className="text-[10px] text-[#C7C7CC] text-center">
          Powered by GPT-4o-mini · Matched against Swaroop&apos;s complete profile
        </p>
      </div>
    </div>
  );
}
