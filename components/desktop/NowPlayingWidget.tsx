"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TRACKS = [
  { title: "Building ALIA", subtitle: "Education AI · v2.0", color: "#6366F1" },
  { title: "Sahara Sense", subtitle: "97% Dust Storm Prediction", color: "#F59E0B" },
  { title: "CogniSpace", subtitle: "Enterprise AI Platform", color: "#8B5CF6" },
  { title: "Garmi Mitra", subtitle: "380M Workers Protected", color: "#10B981" },
];

export default function NowPlayingWidget({ isDark }: { isDark: boolean }) {
  const [trackIndex, setTrackIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrackIndex((i) => (i + 1) % TRACKS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const track = TRACKS[trackIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.65 }}
      className={`p-4 ${isDark ? "liquid-glass-sm-dark" : "liquid-glass-sm"}`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className={`text-[10px] font-semibold uppercase tracking-wider ${isDark ? "text-white/40" : "text-[#8E8E93]"}`}>
          Now Building
        </span>
        {/* Animated equalizer bars */}
        <div className="flex items-end gap-[2px] h-3">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-[3px] rounded-full"
              style={{ background: track.color }}
              animate={{ height: ["4px", "12px", "6px", "10px", "4px"] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      <motion.div
        key={trackIndex}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className={`text-[14px] font-semibold truncate ${isDark ? "text-white" : "text-[#1C1C1E]"}`}>
          {track.title}
        </p>
        <p className={`text-[11px] truncate mt-0.5 ${isDark ? "text-white/45" : "text-[#8E8E93]"}`}>
          {track.subtitle}
        </p>
      </motion.div>

      {/* Progress bar */}
      <div className="mt-3 h-[3px] rounded-full overflow-hidden" style={{ background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: track.color }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6, ease: "linear" }}
          key={trackIndex}
        />
      </div>

      {/* Track dots */}
      <div className="flex items-center justify-center gap-1.5 mt-2.5">
        {TRACKS.map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{
              background: i === trackIndex ? track.color : isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)",
              transform: i === trackIndex ? "scale(1.3)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
