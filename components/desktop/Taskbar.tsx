"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore, WALLPAPERS } from "@/lib/store";

const ROLES = ["AI Product Manager", "Startup Co-Founder", "Builder of 20+ Products", "COO @ CogniSpace", "SP Jain MAIB '26"];

export default function Taskbar({ onLock }: { onLock?: () => void }) {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("Loading...");
  const [roleIndex, setRoleIndex] = useState(0);
  const wallpaperId = useStore((s) => s.wallpaperId);
  const wallpaper = WALLPAPERS.find((w) => w.id === wallpaperId) || WALLPAPERS[0];
  const isDark = wallpaper.dark ?? false;

  // Detect location
  useEffect(() => {
    // Try to get user's location via timezone
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      // Extract city from timezone (e.g., "Asia/Dubai" -> "Dubai")
      const city = tz.split("/").pop()?.replace(/_/g, " ") || "Earth";
      setLocation(city);
    } catch {
      setLocation("Earth");
    }
  }, []);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }));
      setDate(now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setRoleIndex((p) => (p + 1) % ROLES.length), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      data-taskbar
      className="fixed top-0 left-0 right-0 h-10 z-40 flex items-center px-4 text-[13px]"
      style={{
        background: isDark ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.8)",
        backdropFilter: "blur(50px) saturate(2)",
        WebkitBackdropFilter: "blur(50px) saturate(2)",
        borderBottom: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(255,255,255,0.6)",
      }}
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        <button onClick={onLock} className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity">
          <img src="/logo.png" alt="SwaroopOS" className="w-6 h-6 object-contain" />
          <span className={`font-heading font-bold text-[14px] ${isDark ? "text-white" : "text-[#0F172A]"}`}>SwaroopOS</span>
        </button>
        <div className="hidden md:flex items-center gap-1.5">
          <div className="w-[1px] h-3.5" style={{ background: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)" }} />
          <AnimatePresence mode="wait">
            <motion.span key={roleIndex} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.3 }} className={`text-[11px] font-mono ${isDark ? "text-white/50" : "text-[#94A3B8]"}`}>
              {ROLES[roleIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex-1" />

      {/* Right */}
      <div className={`flex items-center gap-3 text-[12px] ${isDark ? "text-white/60" : "text-[#64748B]"}`}>
        <span className="hidden sm:inline">{location}</span>
        <div className="w-[1px] h-3 hidden sm:block" style={{ background: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.06)" }} />
        <span className="hidden sm:inline text-[11px]">{date}</span>
        <div className="w-[1px] h-3" style={{ background: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.06)" }} />
        {/* WiFi */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isDark ? "text-white/50" : "text-[#94A3B8]"}>
          <path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><circle cx="12" cy="20" r="1" fill="currentColor" />
        </svg>
        {/* Battery */}
        <div className="flex items-center gap-0.5">
          <div className={`w-5 h-2.5 rounded-[3px] border p-[1.5px] ${isDark ? "border-white/40" : "border-[#94A3B8]"}`}>
            <div className="w-full h-full bg-[#10B981] rounded-[1px]" />
          </div>
          <div className={`w-[2px] h-1.5 rounded-r-sm ${isDark ? "bg-white/40" : "bg-[#94A3B8]"}`} />
        </div>
        {/* Time */}
        <span className={`font-medium ${isDark ? "text-white" : "text-[#0F172A]"}`}>{time}</span>
      </div>
    </motion.div>
  );
}
