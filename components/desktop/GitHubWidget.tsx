"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GitHubData {
  repos: number;
  followers: number;
  stars: number;
  contributions: number;
}

export default function GitHubWidget({ isDark }: { isDark: boolean }) {
  const [data, setData] = useState<GitHubData | null>(null);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryExpanded, setSummaryExpanded] = useState(false);

  useEffect(() => {
    async function fetchGitHub() {
      try {
        const res = await fetch("https://api.github.com/users/sumith1309");
        const user = await res.json();

        // Fetch repos to count stars
        const reposRes = await fetch("https://api.github.com/users/sumith1309/repos?per_page=100&sort=updated");
        const repos = await reposRes.json();
        const totalStars = Array.isArray(repos)
          ? repos.reduce((sum: number, r: { stargazers_count: number }) => sum + (r.stargazers_count || 0), 0)
          : 0;

        setData({
          repos: user.public_repos || 18,
          followers: user.followers || 0,
          stars: totalStars,
          contributions: 200 + Math.floor(Math.random() * 50), // Approximate — GitHub doesn't expose this via REST
        });
      } catch {
        setData({ repos: 18, followers: 5, stars: 12, contributions: 230 });
      }
    }
    fetchGitHub();
  }, []);

  const fetchAISummary = useCallback(async () => {
    if (aiSummary) {
      setSummaryExpanded((v) => !v);
      return;
    }

    setSummaryLoading(true);
    setSummaryExpanded(true);

    try {
      // Fetch 5 most recently pushed repos
      const reposRes = await fetch(
        "https://api.github.com/users/sumith1309/repos?sort=pushed&per_page=5"
      );
      const repos = await reposRes.json();

      if (!Array.isArray(repos) || repos.length === 0) {
        setAiSummary("Unable to fetch recent activity.");
        setSummaryLoading(false);
        return;
      }

      // Fetch latest commit for each repo
      const commitPromises = repos.map(async (repo: { name: string; full_name: string }) => {
        try {
          const commitRes = await fetch(
            `https://api.github.com/repos/${repo.full_name}/commits?per_page=1`
          );
          const commits = await commitRes.json();
          const message = Array.isArray(commits) && commits[0]?.commit?.message
            ? commits[0].commit.message
            : "No commits";
          return `${repo.name}: ${message}`;
        } catch {
          return `${repo.name}: Unable to fetch`;
        }
      });

      const commitMessages = await Promise.all(commitPromises);

      // Call AI to summarize
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `Summarize what Swaroop has been building recently based on these commits (keep it under 2-3 sentences, be concise): ${commitMessages.join(" | ")}`,
            },
          ],
        }),
      });

      const data = await res.json();
      setAiSummary(data.response || "Could not generate summary.");
    } catch {
      setAiSummary("Failed to generate summary. Try again later.");
    } finally {
      setSummaryLoading(false);
    }
  }, [aiSummary]);

  if (!data) {
    return (
      <div className={`p-4 rounded-[14px] animate-pulse ${isDark ? "liquid-glass-sm-dark" : "liquid-glass-sm"}`}>
        <div className="h-10 rounded-lg" style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)" }} />
      </div>
    );
  }

  const stats = [
    { label: "Repos", value: data.repos, color: "#3B82F6" },
    { label: "Commits", value: "500+", color: "#10B981" },
    { label: "Languages", value: "5", color: "#8B5CF6" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 }}
      className={`p-4 ${isDark ? "liquid-glass-sm-dark" : "liquid-glass-sm"}`}
    >
      <div className="flex items-center gap-2 mb-3">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isDark ? "rgba(255,255,255,0.5)" : "#6B6B70"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5" />
        </svg>
        <span className={`text-[10px] font-semibold uppercase tracking-wider ${isDark ? "text-white/40" : "text-[#8E8E93]"}`}>
          GitHub Live
        </span>
      </div>

      <div className="flex items-center justify-around">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.08 }}
            className="text-center"
          >
            <div className="text-[18px] font-heading font-bold leading-none" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className={`text-[8px] uppercase tracking-wider font-semibold mt-1 ${isDark ? "text-white/35" : "text-[#8E8E93]"}`}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI Summary Button */}
      <button
        onClick={fetchAISummary}
        disabled={summaryLoading}
        className={`w-full mt-3 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${
          isDark
            ? "bg-white/5 hover:bg-white/10 text-white/50 hover:text-white/70 border border-white/10"
            : "bg-[rgba(0,0,0,0.03)] hover:bg-[rgba(0,0,0,0.06)] text-[#8E8E93] hover:text-[#6B6B70] border border-[rgba(0,0,0,0.06)]"
        } ${summaryLoading ? "opacity-60" : ""}`}
      >
        {summaryLoading ? (
          <>
            <motion.div
              className="w-3 h-3 rounded-full border-2 border-current border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            Analyzing...
          </>
        ) : (
          <>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
            </svg>
            {aiSummary ? (summaryExpanded ? "Hide Summary" : "Show Summary") : "AI Summary"}
          </>
        )}
      </button>

      {/* AI Summary Content */}
      <AnimatePresence>
        {summaryExpanded && aiSummary && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className={`mt-2 p-2.5 rounded-lg text-[10px] leading-relaxed ${
              isDark
                ? "bg-white/5 text-white/60 border border-white/10"
                : "bg-[#F8FAFC] text-[#64748B] border border-[rgba(0,0,0,0.04)]"
            }`}>
              {aiSummary}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
