"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useStore, WALLPAPERS, type AppId } from "@/lib/store";
import { FlipLink } from "@/components/ui/flip-links";
import Taskbar from "./Taskbar";
import Dock from "./Dock";
import WindowManager from "./WindowManager";
import WeatherWidget from "./WeatherWidget";
import AnalogClock from "./AnalogClock";
import NowPlayingWidget from "./NowPlayingWidget";
import GitHubWidget from "./GitHubWidget";
import SpotlightSearch from "./SpotlightSearch";
import ContextMenu from "./ContextMenu";
import NotificationCenter from "./NotificationCenter";
import SmartRecommendations from "./SmartRecommendations";

export default function Desktop({ onLock }: { onLock?: () => void }) {
  const [isMobile, setIsMobile] = useState(false);
  const openWindow = useStore((s) => s.openWindow);
  const wallpaperId = useStore((s) => s.wallpaperId);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        if (e.key === "t") { e.preventDefault(); openWindow("terminal"); }
        if (e.key === ",") { e.preventDefault(); openWindow("settings"); }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [openWindow]);

  const wallpaper = WALLPAPERS.find((w) => w.id === wallpaperId) || WALLPAPERS[0];
  const isDark = wallpaper.dark ?? false;
  const wallpaperStyle = wallpaper.type === "css"
    ? { background: wallpaper.value }
    : { backgroundImage: `url(${wallpaper.value})`, backgroundSize: "cover", backgroundPosition: "center" };

  return (
    <div className="w-screen h-screen overflow-hidden relative" style={{ background: "#F0F4F8" }}>
      {/* Wallpaper */}
      <div className="absolute inset-0 transition-all duration-700" style={wallpaperStyle} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: isDark ? "rgba(0, 0, 0, 0.35)" : "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(1.5px)",
        WebkitBackdropFilter: "blur(1.5px)",
      }} />

      <Taskbar onLock={onLock} />
      <SpotlightSearch />
      <ContextMenu />
      <NotificationCenter />
      <SmartRecommendations />

      {isMobile ? (
        <MobileView openWindow={openWindow} isDark={isDark} />
      ) : (
        <DesktopView openWindow={openWindow} isDark={isDark} />
      )}

      <WindowManager />
      {!isMobile && <Dock />}
    </div>
  );
}

/* ─── Quick Stats ─── */
function QuickStats({ isDark }: { isDark: boolean }) {
  const stats = [
    { value: "20+", label: "Products", color: "#3B82F6" },
    { value: "5", label: "Domains", color: "#8B5CF6" },
    { value: "97%", label: "Accuracy", color: "#10B981" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className={`p-4 ${isDark ? "liquid-glass-sm-dark" : "liquid-glass-sm"}`}
    >
      <div className="flex items-center justify-around">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-[22px] font-heading font-bold leading-none" style={{ color: stat.color }}>{stat.value}</div>
            <div className={`text-[8px] uppercase tracking-wider font-semibold mt-1 ${isDark ? "text-white/40" : "text-[#8E8E93]"}`}>{stat.label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── System Status ─── */
function SystemWidget({ isDark }: { isDark: boolean }) {
  const [uptime, setUptime] = useState("");
  useEffect(() => {
    const start = Date.now();
    const update = () => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      const m = Math.floor(elapsed / 60);
      const s = elapsed % 60;
      setUptime(`${m}m ${s}s`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className={`p-3 ${isDark ? "liquid-glass-sm-dark" : "liquid-glass-sm"}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse-soft" />
          <span className={`text-[10px] font-semibold ${isDark ? "text-white/60" : "text-[#6B6B70]"}`}>System Online</span>
        </div>
        <span className={`text-[10px] font-mono ${isDark ? "text-white/40" : "text-[#8E8E93]"}`}>{uptime}</span>
      </div>
    </motion.div>
  );
}

/* ─── Desktop View: Hero + Widgets (no app grid) ─── */
function DesktopView({ openWindow, isDark }: { openWindow: (id: AppId) => void; isDark: boolean }) {
  return (
    <div className="absolute inset-0 top-10 bottom-16 flex items-start justify-center pt-[5vh] p-6 gap-6">
      {/* Left column: Welcome Hero + Chat Widget */}
      <div className="flex flex-col gap-3 max-w-lg w-full">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className={`p-10 holographic ${isDark ? "liquid-glass-dark" : "liquid-glass"}`}
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse-soft" />
            <span className={`text-[12px] font-mono font-medium ${isDark ? "text-white/60" : "text-[#64748B]"}`}>Available · Open to Work Globally</span>
          </div>

          <div className="mb-2">
            <FlipLink className={`text-[42px] font-heading tracking-[-0.03em] cursor-default ${isDark ? "text-white" : "text-[#0F172A]"}`}>
              S. Jyothi
            </FlipLink>
            <FlipLink
              className="text-[42px] font-heading tracking-[-0.03em] cursor-default"
              gradient="linear-gradient(135deg, #6366F1 0%, #8B5CF6 35%, #EC4899 70%, #F43F5E 100%)"
            >
              Swaroop
            </FlipLink>
          </div>

          <p className={`text-[17px] mb-1 font-medium ${isDark ? "text-white/70" : "text-[#64748B]"}`}>
            AI Product Manager & Full-Stack Builder
          </p>
          <p className={`text-[14px] leading-relaxed mb-8 ${isDark ? "text-white/50" : "text-[#94A3B8]"}`}>
            COO & Co-Founder at CogniSpace. Building intelligent systems across 5 industries. 20+ products shipped with 97% accuracy.
          </p>

          <div className="flex gap-3">
            <a href="https://github.com/sumith1309" target="_blank" rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#0F172A] text-white text-[13px] font-semibold hover:bg-[#1E293B] transition-colors flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5"/></svg>
              GitHub
            </a>
            <button onClick={() => openWindow("contact")}
              className={`px-5 py-2.5 rounded-full border text-[13px] font-semibold transition-all cursor-pointer ${isDark ? "border-white/20 text-white/80 hover:bg-white/10" : "border-[rgba(0,0,0,0.1)] text-[#475569] hover:bg-white/80"}`}>
              Contact Me
            </button>
            <button onClick={() => openWindow("showcase")}
              className={`px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all cursor-pointer ${isDark ? "bg-white/10 text-white/70 hover:bg-white/15" : "bg-[rgba(0,0,0,0.04)] text-[#64748B] hover:bg-[rgba(0,0,0,0.08)]"}`}>
              View Work
            </button>
          </div>
        </motion.div>

        {/* Chat Widget — inline below welcome panel */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={() => openWindow("aichat")}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className={`w-full p-4 flex items-center gap-4 cursor-pointer transition-all ${isDark ? "liquid-glass-sm-dark" : "liquid-glass-sm"}`}
        >
          {/* Animated orb */}
          <div className="relative w-10 h-10 shrink-0">
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)" }}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -inset-1 rounded-full"
              style={{ border: "1.5px solid rgba(59,130,246,0.3)" }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute inset-0 rounded-full flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
          </div>

          <div className="flex-1 text-left">
            <p className={`text-[14px] font-semibold ${isDark ? "text-white" : "text-[#1C1C1E]"}`}>
              Know about Swaroop
            </p>
            <p className={`text-[11px] ${isDark ? "text-white/40" : "text-[#8E8E93]"}`}>
              AI-powered diary · Ask anything about me
            </p>
          </div>

          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isDark ? "rgba(255,255,255,0.3)" : "#C7C7CC"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </motion.button>
      </div>

      {/* Right: Widget Grid — two columns, top-aligned with welcome panel */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="flex gap-3"
      >
        {/* Column 1: Analog clock + Now Building */}
        <div className="flex flex-col gap-3 w-[180px]">
          <AnalogClock isDark={isDark} />
          <NowPlayingWidget isDark={isDark} />
          <SystemWidget isDark={isDark} />
        </div>
        {/* Column 2: Weather + GitHub + Stats */}
        <div className="flex flex-col gap-3 w-[180px]">
          <WeatherWidget isDark={isDark} />
          <GitHubWidget isDark={isDark} />
          <QuickStats isDark={isDark} />
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Mobile View ─── */
function MobileView({ openWindow, isDark }: { openWindow: (id: AppId) => void; isDark: boolean }) {
  return (
    <div className="absolute inset-0 top-10 overflow-y-auto px-5 py-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-6">
        <h1 className={`text-[28px] font-heading font-bold ${isDark ? "text-white" : "text-[#0F172A]"}`}>S. Jyothi Swaroop</h1>
        <p className={`text-[14px] mt-1 ${isDark ? "text-white/60" : "text-[#64748B]"}`}>AI Product Manager · Dubai, UAE</p>
      </motion.div>
      <div className="flex gap-3 justify-center mb-8">
        <a href="https://github.com/sumith1309" target="_blank" rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-full bg-[#0F172A] text-white text-[13px] font-semibold">GitHub</a>
        <button onClick={() => openWindow("contact")} className="px-5 py-2.5 rounded-full border border-[rgba(0,0,0,0.1)] text-[13px] font-semibold text-[#475569] cursor-pointer">Contact</button>
      </div>
    </div>
  );
}
