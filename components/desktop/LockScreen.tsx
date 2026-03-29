"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useStore, WALLPAPERS } from "@/lib/store";

interface LockScreenProps {
  onUnlock: () => void;
}

export default function LockScreen({ onUnlock }: LockScreenProps) {
  const wallpaperId = useStore((s) => s.wallpaperId);
  const wallpaper = WALLPAPERS.find((w) => w.id === wallpaperId) || WALLPAPERS[0];
  const isDark = wallpaper.dark;

  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [unlocking, setUnlocking] = useState(false);

  // Slide to unlock
  const sliderX = useMotionValue(0);
  const sliderProgress = useTransform(sliderX, [0, 260], [0, 1]);
  const sliderOpacity = useTransform(sliderProgress, [0, 0.8], [1, 0]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }));
      setDate(now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDragEnd = () => {
    const current = sliderX.get();
    if (current > 200) {
      setUnlocking(true);
      animate(sliderX, 300, { duration: 0.2 });
      setTimeout(onUnlock, 400);
    } else {
      animate(sliderX, 0, { type: "spring", stiffness: 400, damping: 30 });
    }
  };

  const wallpaperStyle = wallpaper.type === "css"
    ? { background: wallpaper.value }
    : { backgroundImage: `url(${wallpaper.value})`, backgroundSize: "cover", backgroundPosition: "center" };

  const textColor = isDark ? "white" : "#0F172A";
  const textMuted = isDark ? "rgba(255,255,255,0.6)" : "rgba(15,23,42,0.5)";
  const glassBg = isDark ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.3)";
  const glassBorder = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)";

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center"
      style={wallpaperStyle}
      animate={unlocking ? { scale: 1.1, opacity: 0 } : { scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
      onClick={() => { if (!unlocking) { setUnlocking(true); setTimeout(onUnlock, 400); } }}
    >
      {/* Overlay */}
      <div className="absolute inset-0" style={{
        background: isDark ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.15)",
        backdropFilter: "blur(2px)",
      }} />

      {/* Time & Date */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 text-center mb-auto mt-[15vh]"
      >
        <h1 className="text-[80px] md:text-[120px] font-heading font-bold leading-none tracking-tight" style={{ color: textColor }}>
          {time}
        </h1>
        <p className="text-[18px] font-medium mt-2" style={{ color: textMuted }}>
          {date}
        </p>
      </motion.div>

      {/* Slide to Unlock */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="relative z-10 mb-[10vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          ref={containerRef}
          className="relative w-[320px] h-[56px] rounded-full overflow-hidden"
          style={{
            background: glassBg,
            backdropFilter: "blur(20px)",
            border: `1px solid ${glassBorder}`,
          }}
        >
          {/* Text */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center text-[14px] font-medium"
            style={{ opacity: sliderOpacity, color: textMuted }}
          >
            Slide to unlock &rarr;
          </motion.div>

          {/* Slider thumb */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 260 }}
            dragElastic={0}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
            style={{ x: sliderX }}
            className="absolute left-1 top-1 w-[48px] h-[48px] rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing"
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-full h-full rounded-full flex items-center justify-center"
              style={{
                background: isDark ? "rgba(255,255,255,0.9)" : "rgba(15,23,42,0.9)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#0F172A" : "white"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Or click anywhere hint */}
        <p className="text-center text-[11px] mt-3 font-medium" style={{ color: textMuted }}>
          or click anywhere to unlock
        </p>
      </motion.div>
    </motion.div>
  );
}
