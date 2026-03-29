"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useStore, WALLPAPERS, type AppId } from "@/lib/store";
import { DOMAINS } from "@/lib/data";

interface DockApp {
  id: AppId;
  label: string;
  color: string;
  icon: React.ReactNode;
}

// Grouped apps with separators
const DOCK_GROUPS: DockApp[][] = [
  // AI — Star feature
  [
    { id: "aichat", label: "Ask Swaroop AI", color: "#3B82F6", icon: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><path d="M8 10h.01" /><path d="M12 10h.01" /><path d="M16 10h.01" /></> },
  ],
  // Domains
  [
    { id: "education", label: "Education", color: DOMAINS.education.color, icon: <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /> },
    { id: "climate", label: "Climate", color: DOMAINS.climate.color, icon: <><path d="M12 2v2" /><path d="M20 12h2" /><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128" /><path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" /></> },
    { id: "enterprise", label: "Enterprise", color: DOMAINS.enterprise.color, icon: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></> },
    { id: "fintech", label: "FinTech", color: DOMAINS.fintech.color, icon: <><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></> },
    { id: "construction", label: "Construction", color: DOMAINS.construction.color, icon: <><rect x="2" y="6" width="20" height="8" rx="1" /><path d="M17 14v7M7 14v7M17 3v3M7 3v3" /></> },
  ],
  // System
  [
    { id: "about", label: "About", color: "#3B82F6", icon: <><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 1 0-16 0" /></> },
    { id: "skills", label: "Skills", color: "#8B5CF6", icon: <><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" rx="1" /></> },
    { id: "terminal", label: "Terminal", color: "#475569", icon: <><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></> },
    { id: "contact", label: "Contact", color: "#10B981", icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /> },
  ],
  // Utilities
  [
    { id: "calculator", label: "Calculator", color: "#F59E0B", icon: <><rect x="4" y="2" width="16" height="20" rx="2" /><line x1="8" y1="6" x2="16" y2="6" /></> },
    { id: "music", label: "Music", color: "#EC4899", icon: <><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></> },
    { id: "calendar", label: "Calendar", color: "#3B82F6", icon: <><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></> },
    { id: "settings", label: "Settings", color: "#64748B", icon: <><circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></> },
  ],
  // Media & Games
  [
    { id: "gallery", label: "Gallery", color: "#6366F1", icon: <><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></> },
    { id: "showcase", label: "Showcase", color: "#F97316", icon: <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3l-4 4-4-4"/></> },
    { id: "tictactoe", label: "Tic-Tac-Toe", color: "#EF4444", icon: <><line x1="8" y1="2" x2="8" y2="22" /><line x1="16" y1="2" x2="16" y2="22" /><line x1="2" y1="8" x2="22" y2="8" /><line x1="2" y1="16" x2="22" y2="16" /></> },
    { id: "game2048", label: "2048", color: "#F97316", icon: <><rect x="3" y="3" width="18" height="18" rx="2" /><rect x="7" y="7" width="4" height="4" rx="1" /><rect x="13" y="7" width="4" height="4" rx="1" /></> },
  ],
];

function DockItem({ app, mouseX }: { app: DockApp; mouseX: ReturnType<typeof useMotionValue<number>> }) {
  const ref = useRef<HTMLButtonElement>(null);
  const openWindow = useStore((s) => s.openWindow);
  const windows = useStore((s) => s.windows);
  const isOpen = windows[app.id]?.isOpen && !windows[app.id]?.isMinimized;

  const distance = useTransform(mouseX, (val: number) => {
    if (!ref.current) return 150;
    const rect = ref.current.getBoundingClientRect();
    return val - rect.left - rect.width / 2;
  });

  const size = useSpring(useTransform(distance, [-80, 0, 80], [38, 56, 38]), { stiffness: 300, damping: 25 });

  return (
    <motion.button
      ref={ref}
      onClick={() => openWindow(app.id)}
      className="relative flex flex-col items-center gap-0.5 cursor-pointer group"
      whileTap={{ scale: 0.85 }}
    >
      <motion.div
        style={{ width: size, height: size }}
        className="flex items-center justify-center rounded-[13px] relative overflow-hidden"
      >
        {/* 3D glass background */}
        <div
          className="absolute inset-0 rounded-[13px]"
          style={{
            background: `linear-gradient(145deg, ${app.color}30, ${app.color}15)`,
            border: `1px solid ${app.color}35`,
            boxShadow: `0 3px 10px ${app.color}20, inset 0 1px 0 rgba(255,255,255,0.3)`,
          }}
        />
        {/* Top glass shine */}
        <div
          className="absolute inset-x-0 top-0 h-1/2 rounded-t-[13px] pointer-events-none"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.02) 100%)" }}
        />
        <div className="w-5 h-5 relative z-10" style={{ color: app.color }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {app.icon}
          </svg>
        </div>
      </motion.div>
      {/* Running indicator dot */}
      {isOpen && <div className="w-1 h-1 rounded-full" style={{ backgroundColor: app.color }} />}
      {/* Tooltip */}
      <div
        className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
        style={{
          background: "rgba(30,30,30,0.88)",
          backdropFilter: "blur(12px)",
          color: "white",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        {app.label}
      </div>
    </motion.button>
  );
}

function DockSeparator() {
  return (
    <div className="flex items-center px-1 self-stretch">
      <div className="w-px h-6 rounded-full bg-[rgba(128,128,128,0.2)]" />
    </div>
  );
}

export default function Dock() {
  const mouseX = useMotionValue(-1000);
  const wallpaperId = useStore((s) => s.wallpaperId);
  const wallpaper = WALLPAPERS.find((w) => w.id === wallpaperId) || WALLPAPERS[0];
  const isDark = wallpaper.dark ?? false;

  return (
    <motion.div
      data-dock
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40"
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(-1000)}
    >
      <div className={`${isDark ? "liquid-glass-dark" : "liquid-glass"} rounded-[22px] px-3 py-2 flex items-end gap-0.5`}>
        {DOCK_GROUPS.map((group, gi) => (
          <div key={gi} className="contents">
            {gi > 0 && <DockSeparator />}
            {group.map((app) => (
              <DockItem key={app.id} app={app} mouseX={mouseX} />
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
