"use client";

import { motion } from "framer-motion";

export default function ClimateTheme() {
  const color = "#F59E0B";
  return (
    <div className="relative h-[130px] overflow-hidden" style={{ background: `linear-gradient(135deg, ${color}10, ${color}05)` }}>
      {/* Topographic lines — bolder */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.12 }}>
        {[25, 50, 75, 100].map((y, i) => (
          <motion.path key={i} d={`M 0 ${y} Q 100 ${y - 15 + i * 5} 200 ${y + 5} T 400 ${y - 5} T 600 ${y}`}
            fill="none" stroke={color} strokeWidth="1"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: i * 0.15 }} />
        ))}
      </svg>

      {/* Radar circle — more visible */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {[20, 35, 50].map((r) => (
          <div key={r} className="absolute rounded-full" style={{
            width: r * 2, height: r * 2, left: `calc(50% - ${r}px)`, top: `calc(50% - ${r}px)`,
            border: `1.5px solid ${color}25`,
          }} />
        ))}
        <motion.div className="absolute left-1/2 top-1/2 origin-[0_0]"
          style={{ width: 50, height: "2px", background: `linear-gradient(90deg, ${color}60, transparent)` }}
          animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />
        {/* Blips on radar */}
        <motion.div className="absolute w-2 h-2 rounded-full" style={{ background: color, left: 20, top: -15, opacity: 0.5 }}
          animate={{ opacity: [0.5, 0, 0.5] }} transition={{ duration: 3, repeat: Infinity }} />
        <motion.div className="absolute w-1.5 h-1.5 rounded-full" style={{ background: color, left: -18, top: 10, opacity: 0.4 }}
          animate={{ opacity: [0.4, 0, 0.4] }} transition={{ duration: 3, delay: 1, repeat: Infinity }} />
      </div>

      {/* Status */}
      <div className="absolute top-3 right-5 flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse-soft" />
          <span className="text-[10px] font-mono text-[#64748B] font-medium">ACTIVE</span>
        </div>
        <span className="text-[10px] font-mono text-[#94A3B8]">UAE Region</span>
      </div>

      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, ${color}40, ${color}15, transparent)` }} />

      <div className="absolute bottom-3 left-5">
        <span className="text-[12px] font-mono uppercase tracking-wider font-bold" style={{ color, opacity: 0.6 }}>Weather Station</span>
      </div>
    </div>
  );
}
