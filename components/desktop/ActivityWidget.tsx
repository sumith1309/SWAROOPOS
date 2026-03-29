"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

// Generate a realistic-looking contribution grid (seeded from day of year for consistency)
function generateGrid(): number[] {
  const grid: number[] = [];
  const now = new Date();
  const seed = now.getFullYear() * 1000 + now.getMonth() * 31 + now.getDate();
  for (let i = 0; i < 49; i++) {
    // Pseudo-random but deterministic per day
    const v = ((seed * (i + 7) * 13 + i * 37) % 100);
    if (v < 25) grid.push(0);
    else if (v < 50) grid.push(1);
    else if (v < 75) grid.push(2);
    else grid.push(3);
  }
  return grid;
}

const LEVELS = ["#EBEDF0", "#9BE9A8", "#40C463", "#30A14E"];
const LEVELS_DARK = ["rgba(255,255,255,0.06)", "rgba(59,130,246,0.3)", "rgba(59,130,246,0.5)", "rgba(59,130,246,0.8)"];

export default function ActivityWidget({ isDark }: { isDark: boolean }) {
  const grid = useMemo(() => generateGrid(), []);
  const colors = isDark ? LEVELS_DARK : LEVELS;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55 }}
      className={`p-4 ${isDark ? "liquid-glass-sm-dark" : "liquid-glass-sm"}`}
    >
      <div className="flex items-center justify-between mb-2.5">
        <span className={`text-[10px] font-semibold uppercase tracking-wider ${isDark ? "text-white/40" : "text-[#8E8E93]"}`}>
          Build Activity
        </span>
        <span className={`text-[10px] font-medium ${isDark ? "text-white/30" : "text-[#C7C7CC]"}`}>7 weeks</span>
      </div>

      {/* Contribution grid */}
      <div className="grid grid-cols-7 gap-[3px]">
        {grid.map((level, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 + i * 0.01, type: "spring", stiffness: 400 }}
            className="w-[14px] h-[14px] rounded-[3px]"
            style={{ background: colors[level] }}
          />
        ))}
      </div>

      <div className="flex items-center justify-between mt-2.5">
        <span className={`text-[10px] font-medium ${isDark ? "text-white/30" : "text-[#C7C7CC]"}`}>Less</span>
        <div className="flex gap-[2px]">
          {colors.map((c, i) => (
            <div key={i} className="w-[10px] h-[10px] rounded-[2px]" style={{ background: c }} />
          ))}
        </div>
        <span className={`text-[10px] font-medium ${isDark ? "text-white/30" : "text-[#C7C7CC]"}`}>More</span>
      </div>
    </motion.div>
  );
}
