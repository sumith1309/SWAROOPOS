"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Wand2 } from "lucide-react";
import { useStore, WALLPAPERS } from "@/lib/store";

const HINT_KEY = "swos:v3:wallpaper-hint";

/**
 * One-time nudge (per browser) letting visitors know the desktop is themeable.
 * Reads as a dark ink card so it stays legible over any wallpaper.
 */
export default function WallpaperHint() {
  const [show, setShow] = useState(false);
  const setWallpaper = useStore((s) => s.setWallpaper);
  const wallpaperId = useStore((s) => s.wallpaperId);

  const dismiss = useCallback(() => {
    setShow(false);
    try {
      localStorage.setItem(HINT_KEY, "1");
    } catch {
      // storage unavailable — it simply shows again next visit
    }
  }, []);

  // Show once, a moment after the desktop settles. Skips for return visitors
  // and when reduced motion is requested.
  useEffect(() => {
    let seen = false;
    let reduced = false;
    try {
      seen = localStorage.getItem(HINT_KEY) === "1";
      reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      /* ignore */
    }
    if (seen || reduced) return;
    const t = setTimeout(() => setShow(true), 1400);
    return () => clearTimeout(t);
  }, []);

  // Escape dismisses; auto-hide after a while so it never lingers.
  useEffect(() => {
    if (!show) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    const t = setTimeout(dismiss, 16000);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [show, dismiss]);

  const shuffle = () => {
    const idx = WALLPAPERS.findIndex((w) => w.id === wallpaperId);
    const next = WALLPAPERS[(idx + 1) % WALLPAPERS.length];
    setWallpaper(next.id);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.aside
          role="status"
          aria-label="Tip: the desktop is themeable"
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
          className="fixed z-[46] bottom-4 left-4 right-4 sm:right-auto sm:max-w-[340px] rounded-[16px] p-4 text-white"
          style={{
            background: "rgba(15, 23, 42, 0.92)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 16px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          <button
            onClick={dismiss}
            aria-label="Dismiss tip"
            className="absolute top-2.5 right-2.5 w-9 h-9 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden />
          </button>

          <div className="flex items-start gap-3 pr-6">
            <span className="w-9 h-9 rounded-[11px] bg-white/10 flex items-center justify-center shrink-0">
              <Wand2 className="w-4.5 h-4.5 text-[#a5b4fc]" width={18} height={18} aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-[13.5px] font-semibold leading-snug">This desktop is yours to theme</p>
              <p className="text-[12px] text-white/60 leading-relaxed mt-0.5">
                10 wallpapers, light and dark. Right-click the desktop or open Settings to browse them all.
              </p>
            </div>
          </div>

          <div className="flex gap-2 mt-3.5 pl-12">
            <button
              onClick={shuffle}
              className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 rounded-full bg-white text-[#0F172A] text-[12.5px] font-semibold hover:bg-white/90 transition-colors cursor-pointer"
            >
              <Wand2 className="w-3.5 h-3.5" aria-hidden />
              Try another
            </button>
            <button
              onClick={dismiss}
              className="inline-flex items-center min-h-[40px] px-3.5 rounded-full text-white/70 text-[12.5px] font-semibold hover:bg-white/10 transition-colors cursor-pointer"
            >
              Got it
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
