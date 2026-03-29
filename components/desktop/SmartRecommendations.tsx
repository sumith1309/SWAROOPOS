"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore, type AppId } from "@/lib/store";

interface Recommendation {
  id: string;
  title: string;
  body: string;
  appId: AppId;
}

const RECOMMENDATIONS: Record<string, Recommendation> = {
  education: {
    id: "rec-alia",
    title: "You might like ALIA",
    body: "Since you explored Education, check out the AI Teaching Assistant with RAG pipeline.",
    appId: "education",
  },
  climate: {
    id: "rec-climate",
    title: "Explore Garmi Mitra",
    body: "380M workers protected with AI heatwave warnings in 7 languages.",
    appId: "climate",
  },
  skills: {
    id: "rec-showcase",
    title: "See the full portfolio",
    body: "20+ products across 5 domains. Open Showcase to explore them all.",
    appId: "showcase",
  },
  about: {
    id: "rec-contact",
    title: "Let's connect!",
    body: "Interested? Reach out via email, LinkedIn, or phone.",
    appId: "contact",
  },
  terminal: {
    id: "rec-skills",
    title: "Check out the tech stack",
    body: "Python, TypeScript, React, FastAPI, Docker — and 12 more.",
    appId: "skills",
  },
};

export default function SmartRecommendations() {
  const [notification, setNotification] = useState<Recommendation | null>(null);
  const windows = useStore((s) => s.windows);
  const openWindow = useStore((s) => s.openWindow);
  const shownRef = useRef<Set<string>>(new Set());
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    // Check for newly opened windows
    const openApps = Object.entries(windows)
      .filter(([, w]) => w.isOpen && !w.isMinimized)
      .map(([id]) => id);

    for (const appId of openApps) {
      if (RECOMMENDATIONS[appId] && !shownRef.current.has(appId)) {
        shownRef.current.add(appId);
        // Delay recommendation by 4 seconds after opening
        timerRef.current = setTimeout(() => {
          setNotification(RECOMMENDATIONS[appId]);
          // Auto-dismiss after 6 seconds
          setTimeout(() => setNotification(null), 6000);
        }, 4000);
        break;
      }
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [windows]);

  const handleClick = (appId: AppId) => {
    openWindow(appId);
    setNotification(null);
  };

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, x: 320, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 320, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          onClick={() => handleClick(notification.appId)}
          className="fixed top-12 right-4 z-[68] w-[300px] flex items-start gap-3 p-3.5 rounded-2xl cursor-pointer"
          style={{
            background: "rgba(255,255,255,0.88)",
            backdropFilter: "blur(40px) saturate(1.8)",
            WebkitBackdropFilter: "blur(40px) saturate(1.8)",
            border: "1px solid rgba(255,255,255,0.6)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
          }}
        >
          <div
            className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 text-[16px]"
            style={{ background: "linear-gradient(135deg, #10B981, #3B82F6)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-semibold text-[#1C1C1E]">{notification.title}</p>
              <span className="text-[10px] text-[#C7C7CC]">now</span>
            </div>
            <p className="text-[12px] text-[#6B6B70] leading-snug mt-0.5">{notification.body}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
