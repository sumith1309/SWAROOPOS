"use client";

import { motion } from "framer-motion";

export default function EducationTheme() {
  const color = "#6366F1";
  return (
    <div className="relative h-[130px] overflow-hidden" style={{ background: `linear-gradient(135deg, ${color}10, ${color}05)` }}>
      {/* Grid background */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.06 }}>
        <defs>
          <pattern id="edu-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke={color} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#edu-grid)" />
      </svg>

      {/* Neural network — larger, more visible */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 130">
        {/* Book icon — larger, bolder */}
        <motion.path
          d="M 70 20 L 70 95 Q 95 82 120 95 L 120 20 Q 95 33 70 20"
          fill="none" stroke={color} strokeWidth="1.8" opacity="0.5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
        <motion.path
          d="M 120 20 L 120 95 Q 145 82 170 95 L 170 20 Q 145 33 120 20"
          fill="none" stroke={color} strokeWidth="1.8" opacity="0.5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.15, ease: "easeInOut" }}
        />

        {/* Network connections — thicker, more visible */}
        {[
          [170, 40, 240, 30],
          [170, 65, 240, 55],
          [170, 90, 240, 80],
          [240, 30, 320, 45],
          [240, 55, 320, 45],
          [240, 55, 320, 80],
          [240, 80, 320, 80],
          [320, 45, 400, 60],
          [320, 80, 400, 60],
        ].map(([x1, y1, x2, y2], i) => (
          <motion.line
            key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={color} strokeWidth="1.2" opacity="0.3"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.6 + i * 0.06, ease: "easeOut" }}
          />
        ))}

        {/* Nodes — larger, more prominent */}
        {[
          [240, 30], [240, 55], [240, 80],
          [320, 45], [320, 80],
          [400, 60],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={i} cx={cx} cy={cy} r="5" fill={color} opacity="0.45"
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ delay: 1.0 + i * 0.06, type: "spring", stiffness: 300 }}
          />
        ))}

        {/* Pulsing data signals along connections */}
        {[[240, 30, 320, 45], [320, 80, 400, 60]].map(([x1, y1, x2, y2], i) => (
          <motion.circle
            key={`signal-${i}`}
            r="3" fill={color} opacity="0.6"
            initial={{ cx: x1, cy: y1 }}
            animate={{ cx: [x1, x2], cy: [y1, y2] }}
            transition={{ duration: 1.5, delay: 1.5 + i * 0.5, repeat: Infinity, repeatDelay: 2 }}
          />
        ))}
      </svg>

      {/* Label */}
      <div className="absolute bottom-3 left-5">
        <span className="text-[12px] font-mono uppercase tracking-wider font-bold" style={{ color, opacity: 0.6 }}>
          Education Lab
        </span>
      </div>

      {/* Decorative badge */}
      <div className="absolute top-3 right-5 flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full animate-pulse-soft" style={{ background: color, opacity: 0.5 }} />
        <span className="text-[9px] font-mono uppercase tracking-wider" style={{ color, opacity: 0.4 }}>AI Powered</span>
      </div>
    </div>
  );
}
