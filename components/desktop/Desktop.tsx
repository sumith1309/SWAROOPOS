"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, ArrowUpRight, Check, MessageCircle } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { useStore, WALLPAPERS, type AppId } from "@/lib/store";
import {
  NAME,
  ROLE_TITLE,
  HEADLINE,
  SUBHERO,
  PROOF_POINTS,
  CONTACT,
  ALL_PRODUCTS,
  LIVE_PRODUCTS,
  getProduct,
} from "@/lib/data";
import Taskbar from "./Taskbar";
import Dock from "./Dock";
import WindowManager from "./WindowManager";
import WeatherWidget from "./WeatherWidget";
import GitHubWidget from "./GitHubWidget";
import SpotlightSearch from "./SpotlightSearch";
import ContextMenu from "./ContextMenu";
import NotificationCenter from "./NotificationCenter";
import SmartRecommendations from "./SmartRecommendations";

const EASE = [0.32, 0.72, 0, 1] as const;

export default function Desktop() {
  const [isMobile, setIsMobile] = useState(false);
  const openWindow = useStore((s) => s.openWindow);
  const wallpaperId = useStore((s) => s.wallpaperId);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
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
    <div className="w-screen h-screen overflow-hidden relative" style={{ background: "#F4F4F1" }}>
      {/* Wallpaper */}
      <div className="absolute inset-0 transition-all duration-700" style={wallpaperStyle} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: isDark ? "rgba(0, 0, 0, 0.35)" : "rgba(255, 255, 255, 0.25)",
        backdropFilter: "blur(1.5px)",
        WebkitBackdropFilter: "blur(1.5px)",
      }} />

      <header>
        <Taskbar />
      </header>
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
      {!isMobile && (
        <nav aria-label="Application dock">
          <Dock />
        </nav>
      )}
    </div>
  );
}

/* ─── Recruiter fast-path CTAs (44px targets, keyboard-first) ─── */
function FastPath({ openWindow, isDark, compact }: { openWindow: (id: AppId) => void; isDark: boolean; compact?: boolean }) {
  const base = `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all min-h-[44px] ${compact ? "px-4 text-[13px]" : "px-5 text-[13px]"}`;
  const ghost = isDark
    ? "border border-white/20 text-white/85 hover:bg-white/10"
    : "border border-[rgba(15,23,42,0.12)] text-[#334155] bg-white/60 hover:bg-white";
  return (
    <div className="flex gap-2.5 flex-wrap" role="group" aria-label="Primary actions">
      <button onClick={() => openWindow("showcase")} className={`${base} bg-[#0F172A] text-white hover:bg-[#1E293B] cursor-pointer`}>
        View Production Work
      </button>
      <Link href="/resume" className={`${base} bg-[#1d4ed8] text-white hover:bg-[#1e40af]`}>
        <FileText className="w-4 h-4" aria-hidden />
        View Resume
      </Link>
      <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className={`${base} ${ghost}`}>
        <GitHubIcon className="w-4 h-4" />
        GitHub
      </a>
      <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className={`${base} ${ghost}`}>
        <LinkedInIcon className="w-4 h-4" />
        LinkedIn
      </a>
      <Link href="/contact" className={`${base} ${ghost}`}>
        Contact
      </Link>
    </div>
  );
}

/* ─── Featured HRMS case-study card — the main proof asset, one click ─── */
function FeaturedHRMS({ isDark }: { isDark: boolean }) {
  const hrms = getProduct("hrms");
  if (!hrms) return null;
  const facts = [
    "3 organizations · 80+ employees daily",
    "ZKTeco BioTime biometric integration",
    "Multi-tenant Django · 794-test suite",
    "SQLi, IDOR, CSRF security hardening",
    "Est. 30% reduction in operational delays",
  ];
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.5, ease: EASE }}
      aria-label="Featured case study: HRMS Platform"
      className={`rounded-[20px] p-6 ${isDark ? "liquid-glass-dark" : "liquid-glass"}`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className={`text-[10px] uppercase tracking-[0.18em] font-bold font-mono ${isDark ? "text-white/45" : "text-[#8E8E93]"}`}>
          Featured · Case Study
        </span>
        <span className="flex items-center gap-1.5 min-h-[24px]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse-soft" aria-hidden />
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#047857]">Live production</span>
        </span>
      </div>

      <h2 className={`text-[22px] font-heading font-bold tracking-[-0.02em] mb-1 ${isDark ? "text-white" : "text-[#0F172A]"}`}>
        HRMS Platform
      </h2>
      <p className={`text-[13px] leading-relaxed mb-4 ${isDark ? "text-white/60" : "text-[#64748B]"}`}>
        Multi-tenant HR system — solo-built, deployed, and operated in production.
      </p>

      <ul className="space-y-1.5 mb-5">
        {facts.map((f) => (
          <li key={f} className={`flex items-start gap-2 text-[12.5px] ${isDark ? "text-white/75" : "text-[#334155]"}`}>
            <Check className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#10B981]" aria-hidden />
            {f}
          </li>
        ))}
      </ul>

      <div className="flex gap-2.5 flex-wrap">
        <Link
          href="/projects/hrms"
          className="inline-flex items-center gap-1.5 min-h-[44px] px-4 rounded-full bg-[#0F172A] text-white text-[12.5px] font-semibold hover:bg-[#1E293B] transition-colors"
        >
          Read case study
          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden />
        </Link>
        <a
          href={hrms.website}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 min-h-[44px] px-4 rounded-full text-[12.5px] font-semibold border transition-colors ${
            isDark ? "border-white/20 text-white/85 hover:bg-white/10" : "border-[rgba(15,23,42,0.12)] text-[#334155] bg-white/50 hover:bg-white"
          }`}
        >
          Open live system
          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden />
        </a>
      </div>
      <p className={`text-[10.5px] mt-2.5 font-mono ${isDark ? "text-white/35" : "text-[#94A3B8]"}`}>
        Live demo may take a few seconds to wake (free hosting).
      </p>
    </motion.section>
  );
}

/* ─── Quick stats — computed from real data ─── */
function QuickStats({ isDark }: { isDark: boolean }) {
  const stats = [
    { value: `${LIVE_PRODUCTS.length}`, label: "Live", color: "#10B981" },
    { value: `${ALL_PRODUCTS.length}`, label: "Systems", color: "#3B82F6" },
    { value: "2019", label: "Since", color: "#8B5CF6" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.5, ease: EASE }}
      className={`p-4 ${isDark ? "liquid-glass-sm-dark" : "liquid-glass-sm"}`}
    >
      <div className="flex items-center justify-around">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-[20px] font-heading font-bold leading-none" style={{ color: stat.color }}>{stat.value}</div>
            <div className={`text-[9px] uppercase tracking-wider font-semibold mt-1 ${isDark ? "text-white/40" : "text-[#8E8E93]"}`}>{stat.label}</div>
          </div>
        ))}
      </div>
      <p className={`text-[10px] text-center mt-2 leading-snug ${isDark ? "text-white/35" : "text-[#94A3B8]"}`}>
        {ALL_PRODUCTS.length} systems across production, AI agents, ML experiments, and business tools
      </p>
    </motion.div>
  );
}

/* ─── Hero panel — name, role, headline, proof, CTAs ─── */
function HeroPanel({ openWindow, isDark }: { openWindow: (id: AppId) => void; isDark: boolean }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      aria-label="Introduction"
      className={`p-8 lg:p-10 ${isDark ? "liquid-glass-dark" : "liquid-glass"}`}
    >
      <div className="flex items-center gap-2 mb-5">
        <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse-soft" aria-hidden />
        <span className={`text-[12px] font-mono font-medium ${isDark ? "text-white/60" : "text-[#64748B]"}`}>
          {NAME} · Available · Dubai, UAE
        </span>
      </div>

      <p className={`text-[13px] font-semibold uppercase tracking-[0.14em] mb-3 ${isDark ? "text-white/50" : "text-[#64748B]"}`}>
        {ROLE_TITLE}
      </p>

      <h1 className={`text-[clamp(28px,2.6vw,38px)] leading-[1.12] font-heading font-bold tracking-[-0.03em] mb-3 ${isDark ? "text-white" : "text-[#0F172A]"}`}>
        {HEADLINE}
      </h1>

      <p className={`text-[14.5px] leading-relaxed mb-5 max-w-[52ch] ${isDark ? "text-white/60" : "text-[#64748B]"}`}>
        {SUBHERO}
      </p>

      {/* Proof points */}
      <ul className="space-y-2 mb-7" aria-label="Production proof">
        {PROOF_POINTS.map((point, i) => (
          <motion.li
            key={point}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 + i * 0.08, duration: 0.4, ease: EASE }}
            className={`flex items-start gap-2.5 text-[13.5px] font-medium ${isDark ? "text-white/80" : "text-[#334155]"}`}
          >
            <span className="w-5 h-5 rounded-full bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.2)] flex items-center justify-center shrink-0 mt-[1px]">
              <Check className="w-3 h-3 text-[#059669]" aria-hidden />
            </span>
            {point}
          </motion.li>
        ))}
      </ul>

      <FastPath openWindow={openWindow} isDark={isDark} />
    </motion.section>
  );
}

/* ─── Chat launcher ─── */
function ChatLauncher({ openWindow, isDark }: { openWindow: (id: AppId) => void; isDark: boolean }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5, ease: EASE }}
      onClick={() => openWindow("aichat")}
      className={`w-full p-4 min-h-[56px] flex items-center gap-3.5 cursor-pointer transition-all text-left ${isDark ? "liquid-glass-sm-dark" : "liquid-glass-sm"}`}
    >
      <span className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-[#0F172A]">
        <MessageCircle className="w-4.5 h-4.5 text-white" width={18} height={18} aria-hidden />
      </span>
      <span className="flex-1">
        <span className={`block text-[13.5px] font-semibold ${isDark ? "text-white" : "text-[#0F172A]"}`}>
          Ask my AI anything
        </span>
        <span className={`block text-[11px] ${isDark ? "text-white/40" : "text-[#8E8E93]"}`}>
          Shipped work, solo vs team, evidence behind every metric
        </span>
      </span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isDark ? "rgba(255,255,255,0.35)" : "#C7C7CC"} strokeWidth="2" strokeLinecap="round" aria-hidden>
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </motion.button>
  );
}

/* ─── Desktop view (designed at 1440px) ─── */
function DesktopView({ openWindow, isDark }: { openWindow: (id: AppId) => void; isDark: boolean }) {
  return (
    <div className="absolute inset-0 top-10 bottom-20 overflow-y-auto">
      <div className="max-w-[1180px] mx-auto px-8 pt-[6vh] grid grid-cols-12 gap-6 items-start">
        {/* Left: hero + chat */}
        <div className="col-span-7 flex flex-col gap-4">
          <HeroPanel openWindow={openWindow} isDark={isDark} />
          <ChatLauncher openWindow={openWindow} isDark={isDark} />
        </div>

        {/* Right: featured HRMS + honest stats + live GitHub */}
        <aside className="col-span-5 flex flex-col gap-4" aria-label="Featured work and stats">
          <FeaturedHRMS isDark={isDark} />
          <div className="grid grid-cols-2 gap-4">
            <QuickStats isDark={isDark} />
            <WeatherWidget isDark={isDark} />
          </div>
          <GitHubWidget isDark={isDark} />
        </aside>
      </div>
    </div>
  );
}

/* ─── Mobile view (designed at 390px) ─── */
function MobileView({ openWindow, isDark }: { openWindow: (id: AppId) => void; isDark: boolean }) {
  return (
    <div className="absolute inset-0 top-10 overflow-y-auto px-4 py-5 pb-24">
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        aria-label="Introduction"
        className={`p-6 mb-3 ${isDark ? "liquid-glass-dark" : "liquid-glass"}`}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse-soft" aria-hidden />
          <span className={`text-[11.5px] font-mono font-medium ${isDark ? "text-white/60" : "text-[#64748B]"}`}>
            {NAME} · Dubai, UAE
          </span>
        </div>

        <p className={`text-[11px] font-semibold uppercase tracking-[0.12em] mb-2 ${isDark ? "text-white/50" : "text-[#64748B]"}`}>
          {ROLE_TITLE}
        </p>

        <h1 className={`text-[25px] font-heading font-bold leading-[1.15] tracking-[-0.02em] mb-2.5 ${isDark ? "text-white" : "text-[#0F172A]"}`}>
          {HEADLINE}
        </h1>

        <p className={`text-[13.5px] leading-relaxed mb-4 ${isDark ? "text-white/60" : "text-[#64748B]"}`}>
          {SUBHERO}
        </p>

        <ul className="space-y-2 mb-5" aria-label="Production proof">
          {PROOF_POINTS.map((point) => (
            <li key={point} className={`flex items-start gap-2 text-[12.5px] font-medium ${isDark ? "text-white/80" : "text-[#334155]"}`}>
              <Check className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#059669]" aria-hidden />
              {point}
            </li>
          ))}
        </ul>

        <FastPath openWindow={openWindow} isDark={isDark} compact />
      </motion.section>

      <div className="mb-3">
        <FeaturedHRMS isDark={isDark} />
      </div>

      <div className="mb-3">
        <ChatLauncher openWindow={openWindow} isDark={isDark} />
      </div>

      <div className="mb-3">
        <QuickStats isDark={isDark} />
      </div>

      {/* Quick launch grid — 44px+ targets */}
      <motion.nav
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5, ease: EASE }}
        aria-label="Applications"
        className="grid grid-cols-4 gap-2"
      >
        {([
          { id: "about" as AppId, label: "About", color: "#3B82F6", icon: <><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/></> },
          { id: "skills" as AppId, label: "Skills", color: "#8B5CF6", icon: <><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/></> },
          { id: "showcase" as AppId, label: "Projects", color: "#F97316", icon: <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3l-4 4-4-4"/></> },
          { id: "contact" as AppId, label: "Contact", color: "#10B981", icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/> },
          { id: "terminal" as AppId, label: "Terminal", color: "#475569", icon: <><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></> },
          { id: "aichat" as AppId, label: "AI Chat", color: "#3B82F6", icon: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 10h.01M12 10h.01M16 10h.01"/></> },
          { id: "resumetailor" as AppId, label: "Resume AI", color: "#10B981", icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></> },
          { id: "settings" as AppId, label: "Settings", color: "#64748B", icon: <><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></> },
        ]).map((app) => (
          <button
            key={app.id}
            onClick={() => openWindow(app.id)}
            aria-label={`Open ${app.label}`}
            className={`flex flex-col items-center gap-1.5 py-3 min-h-[64px] rounded-2xl cursor-pointer ${isDark ? "liquid-glass-sm-dark" : "liquid-glass-sm"}`}
          >
            <span className="w-9 h-9 rounded-[11px] flex items-center justify-center" style={{ background: `${app.color}14` }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={app.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                {app.icon}
              </svg>
            </span>
            <span className={`text-[10px] font-medium ${isDark ? "text-white/60" : "text-[#6B6B70]"}`}>{app.label}</span>
          </button>
        ))}
      </motion.nav>
    </div>
  );
}
