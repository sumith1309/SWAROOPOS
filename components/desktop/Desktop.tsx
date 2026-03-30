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
import FlagshipSpotlight from "./FlagshipSpotlight";

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
            I architect AI systems that predict, protect, and automate
          </p>
          <p className={`text-[14px] leading-relaxed mb-4 ${isDark ? "text-white/50" : "text-[#94A3B8]"}`}>
            97% prediction accuracy. 380M lives targeted. 20+ AI products shipped. From dust storm prediction to heatwave early warning — I build AI that solves real problems.
          </p>

          {/* Impact proof ticker */}
          <div className="flex flex-wrap gap-3 mb-6">
            {[
              { metric: "97% Accuracy", project: "Sahara Sense", color: "#F59E0B" },
              { metric: "380M Protected", project: "Garmi Mitra", color: "#10B981" },
              { metric: "Zero-Defect Deploys", project: "HRMS", color: "#3B82F6" },
            ].map((item, i) => (
              <motion.div key={item.project} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.1 }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold ${isDark ? "bg-white/5 border border-white/10" : "bg-white/60 border border-[rgba(0,0,0,0.06)]"}`}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: item.color }} />
                <span className={isDark ? "text-white/70" : "text-[#475569]"}>{item.metric}</span>
                <span className={isDark ? "text-white/30" : "text-[#94A3B8]"}>—</span>
                <span className={isDark ? "text-white/40" : "text-[#94A3B8]"}>{item.project}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-3 flex-wrap">
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
            <a href="/api/cv" target="_blank" rel="noopener noreferrer"
              className={`px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all flex items-center gap-2 ${isDark ? "bg-[#1e40af] text-white hover:bg-[#1d4ed8]" : "bg-[#1e40af] text-white hover:bg-[#1d4ed8]"}`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download CV
            </a>
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
          <FlagshipSpotlight isDark={isDark} />
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
    <div className="absolute inset-0 top-10 overflow-y-auto px-4 py-5 pb-20">
      {/* Welcome card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`p-6 mb-3 ${isDark ? "liquid-glass-dark" : "liquid-glass"}`}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse-soft" />
          <span className={`text-[11px] font-mono font-medium ${isDark ? "text-white/60" : "text-[#64748B]"}`}>Available · Open to Work Globally</span>
        </div>

        <h1 className={`text-[32px] font-heading font-bold leading-tight tracking-[-0.02em] ${isDark ? "text-white" : "text-[#0F172A]"}`}>
          S. Jyothi
        </h1>
        <h1 className="text-[32px] font-heading font-bold leading-tight tracking-[-0.02em] mb-2" style={{
          background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 35%, #EC4899 70%, #F43F5E 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          Swaroop
        </h1>

        <p className={`text-[15px] font-medium mb-1 ${isDark ? "text-white/70" : "text-[#64748B]"}`}>
          I architect AI systems that predict, protect, and automate
        </p>
        <p className={`text-[13px] leading-relaxed mb-3 ${isDark ? "text-white/50" : "text-[#94A3B8]"}`}>
          97% accuracy. 380M lives targeted. 20+ AI products across 5 industries.
        </p>

        {/* Impact proof ticker */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { metric: "97% Accuracy", project: "Sahara Sense", color: "#F59E0B" },
            { metric: "380M Protected", project: "Garmi Mitra", color: "#10B981" },
            { metric: "Zero-Defect", project: "HRMS", color: "#3B82F6" },
          ].map((item) => (
            <div key={item.project}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold ${isDark ? "bg-white/5 border border-white/10" : "bg-white/60 border border-[rgba(0,0,0,0.06)]"}`}>
              <span className="w-1 h-1 rounded-full" style={{ background: item.color }} />
              <span className={isDark ? "text-white/60" : "text-[#475569]"}>{item.metric}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-2 flex-wrap">
          <a href="https://github.com/sumith1309" target="_blank" rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-[#0F172A] text-white text-[12px] font-semibold flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5"/></svg>
            GitHub
          </a>
          <button onClick={() => openWindow("contact")}
            className={`px-4 py-2 rounded-full border text-[12px] font-semibold cursor-pointer ${isDark ? "border-white/20 text-white/80" : "border-[rgba(0,0,0,0.1)] text-[#475569]"}`}>
            Contact Me
          </button>
          <button onClick={() => openWindow("showcase")}
            className={`px-4 py-2 rounded-full text-[12px] font-semibold cursor-pointer ${isDark ? "bg-white/10 text-white/70" : "bg-[rgba(0,0,0,0.04)] text-[#64748B]"}`}>
            View Work
          </button>
          <a href="/api/cv" target="_blank" rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-[#1e40af] text-white text-[12px] font-semibold flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download CV
          </a>
        </div>
      </motion.div>

      {/* AI Chat widget */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        onClick={() => openWindow("aichat")}
        className={`w-full p-4 mb-3 flex items-center gap-3 cursor-pointer ${isDark ? "liquid-glass-sm-dark" : "liquid-glass-sm"}`}
      >
        <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
          style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <div className="flex-1 text-left">
          <p className={`text-[13px] font-semibold ${isDark ? "text-white" : "text-[#1C1C1E]"}`}>Know about Swaroop</p>
          <p className={`text-[10px] ${isDark ? "text-white/40" : "text-[#8E8E93]"}`}>AI-powered · Ask anything</p>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isDark ? "rgba(255,255,255,0.3)" : "#C7C7CC"} strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
      </motion.button>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={`p-4 mb-3 ${isDark ? "liquid-glass-sm-dark" : "liquid-glass-sm"}`}
      >
        <div className="flex items-center justify-around">
          {[
            { value: "20+", label: "Products", color: "#3B82F6" },
            { value: "5", label: "Domains", color: "#8B5CF6" },
            { value: "97%", label: "Accuracy", color: "#10B981" },
            { value: "22", label: "Repos", color: "#F59E0B" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-[18px] font-heading font-bold leading-none" style={{ color: s.color }}>{s.value}</div>
              <div className={`text-[8px] uppercase tracking-wider font-semibold mt-1 ${isDark ? "text-white/40" : "text-[#8E8E93]"}`}>{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick launch grid */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-4 gap-2"
      >
        {([
          { id: "about" as AppId, label: "About", color: "#3B82F6", icon: <><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/></> },
          { id: "skills" as AppId, label: "Skills", color: "#8B5CF6", icon: <><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/></> },
          { id: "showcase" as AppId, label: "Showcase", color: "#F97316", icon: <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3l-4 4-4-4"/></> },
          { id: "contact" as AppId, label: "Contact", color: "#10B981", icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/> },
          { id: "terminal" as AppId, label: "Terminal", color: "#475569", icon: <><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></> },
          { id: "calendar" as AppId, label: "Calendar", color: "#3B82F6", icon: <><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></> },
          { id: "gallery" as AppId, label: "Gallery", color: "#6366F1", icon: <><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></> },
          { id: "settings" as AppId, label: "Settings", color: "#64748B", icon: <><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></> },
        ]).map((app) => (
          <motion.button
            key={app.id}
            onClick={() => openWindow(app.id)}
            className={`flex flex-col items-center gap-1 py-3 rounded-2xl cursor-pointer ${isDark ? "liquid-glass-sm-dark" : "liquid-glass-sm"}`}
          >
            <div className="w-8 h-8 rounded-[10px] flex items-center justify-center"
              style={{ background: `${app.color}15` }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={app.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                {app.icon}
              </svg>
            </div>
            <span className={`text-[9px] font-medium ${isDark ? "text-white/60" : "text-[#6B6B70]"}`}>{app.label}</span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
