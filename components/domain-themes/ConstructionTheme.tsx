"use client";

import { motion } from "framer-motion";

export default function ConstructionTheme() {
  const color = "#EF4444";
  return (
    <div className="relative h-[130px] overflow-hidden" style={{ background: `linear-gradient(135deg, ${color}08, ${color}03)` }}>
      {/* Blueprint grid — more visible */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.06 }}>
        <defs>
          <pattern id="con-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke={color} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#con-grid)" />
      </svg>

      {/* Blueprint to Code — bolder */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 130">
        {/* Building — bolder */}
        <motion.rect x="50" y="25" width="55" height="68" rx="3" fill="none" stroke={color} strokeWidth="1.5" opacity="0.35"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
        {[[58,40,14,14],[80,40,14,14],[58,62,14,14],[70,82,16,12]].map(([x,y,w,h], i) => (
          <motion.rect key={i} x={x} y={y} width={w} height={h} rx="2" fill={color} opacity="0.1"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
            style={{ transformOrigin: `${x + w/2}px ${y + h/2}px` }} />
        ))}

        {/* Arrow — bolder */}
        <motion.line x1="130" y1="60" x2="250" y2="60" stroke={color} strokeWidth="1.5" opacity="0.25"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 1 }} />
        <motion.polygon points="250,54 262,60 250,66" fill={color} opacity="0.25"
          initial={{ opacity: 0 }} animate={{ opacity: 0.25 }} transition={{ delay: 1.4 }} />

        {/* Code window — bolder */}
        <motion.rect x="280" y="20" width="80" height="80" rx="6" fill="none" stroke={color} strokeWidth="1.5" opacity="0.35"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 1.5 }} />
        <motion.circle cx="292" cy="32" r="3" fill="#FF5F57" opacity="0.7" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2 }} />
        <motion.circle cx="301" cy="32" r="3" fill="#FEBC2E" opacity="0.7" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.1 }} />
        <motion.circle cx="310" cy="32" r="3" fill="#28C840" opacity="0.7" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.2 }} />
        {[45, 55, 65, 75, 85].map((y, i) => (
          <motion.rect key={i} x="292" y={y} width={[40, 55, 35, 48, 28][i]} height="3" rx="1.5" fill={color} opacity="0.18"
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 2.3 + i * 0.07 }} style={{ transformOrigin: "left" }} />
        ))}

        {/* Label */}
        <motion.text x="200" y="122" textAnchor="middle" fill="#94A3B8" fontSize="10" fontStyle="italic" fontWeight="500"
          initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 2.6 }}>
          From concrete to code
        </motion.text>
      </svg>

      <div className="absolute bottom-3 left-5">
        <span className="text-[12px] font-mono uppercase tracking-wider font-bold" style={{ color, opacity: 0.6 }}>Site Office</span>
      </div>
    </div>
  );
}
