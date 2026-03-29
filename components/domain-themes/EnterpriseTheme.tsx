"use client";

import { motion } from "framer-motion";

export default function EnterpriseTheme() {
  const color = "#8B5CF6";
  return (
    <div className="relative h-[130px] overflow-hidden" style={{ background: `linear-gradient(135deg, ${color}08, ${color}03)` }}>
      {/* Dot grid */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.08 }}>
        <defs>
          <pattern id="ent-dots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1.2" fill={color} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ent-dots)" />
      </svg>

      {/* Charts — bolder */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 130">
        <motion.polyline points="40,80 70,60 100,70 130,40 160,50 190,28"
          fill="none" stroke={color} strokeWidth="2" opacity="0.35"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} />
        {/* Area fill */}
        <motion.polygon points="40,80 70,60 100,70 130,40 160,50 190,28 190,100 40,100"
          fill={color} opacity="0.06"
          initial={{ opacity: 0 }} animate={{ opacity: 0.06 }} transition={{ delay: 1.5 }} />

        {[225, 250, 275, 300, 325].map((x, i) => (
          <motion.rect key={i} x={x} width="16" rx="3" fill={color} opacity="0.2"
            initial={{ y: 95, height: 0 }} animate={{ y: 95 - [30, 55, 38, 65, 48][i], height: [30, 55, 38, 65, 48][i] }}
            transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }} />
        ))}
      </svg>

      <div className="absolute top-3 right-5 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse-soft" />
        <span className="text-[10px] font-mono text-[#64748B] font-medium">Operational</span>
      </div>

      <div className="absolute bottom-3 left-5">
        <span className="text-[12px] font-mono uppercase tracking-wider font-bold" style={{ color, opacity: 0.6 }}>Enterprise Console</span>
      </div>
    </div>
  );
}
