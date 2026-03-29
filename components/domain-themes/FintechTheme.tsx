"use client";

import { motion } from "framer-motion";

export default function FintechTheme() {
  const color = "#10B981";
  return (
    <div className="relative h-[130px] overflow-hidden" style={{ background: `linear-gradient(135deg, ${color}08, ${color}03)` }}>
      {/* Stock chart — bolder */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 130">
        {/* Area fill */}
        <motion.polygon
          points="20,85 50,80 80,75 110,62 140,68 170,48 200,52 230,38 260,42 290,28 320,33 350,22 380,16 380,110 20,110"
          fill={color} opacity="0.08"
          initial={{ opacity: 0 }} animate={{ opacity: 0.08 }} transition={{ delay: 1.8 }}
        />
        <motion.polyline
          points="20,85 50,80 80,75 110,62 140,68 170,48 200,52 230,38 260,42 290,28 320,33 350,22 380,16"
          fill="none" stroke={color} strokeWidth="2" opacity="0.4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
        />
        <motion.polyline
          points="20,88 80,78 140,70 200,58 260,48 320,38 380,25"
          fill="none" stroke={color} strokeWidth="1" opacity="0.15" strokeDasharray="4 4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.3 }}
        />
        {/* Data points */}
        {[[170,48],[260,42],[380,16]].map(([cx,cy], i) => (
          <motion.circle key={i} cx={cx} cy={cy} r="3" fill={color} opacity="0.4"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5 + i * 0.15, type: "spring" }} />
        ))}
      </svg>

      {/* Ticker — bolder */}
      <div className="absolute top-0 left-0 right-0 h-6 overflow-hidden border-b flex items-center" style={{ borderColor: `${color}12`, background: `${color}06` }}>
        <div className="flex whitespace-nowrap" style={{ animation: "ticker 20s linear infinite" }}>
          <span className="text-[10px] font-mono font-medium px-2" style={{ color, opacity: 0.5 }}>
            BSA ↑2.4% · FORECASTING ↑5.1% · CHURN ↓0.8% · INVENTORY ↑3.2% · HOUSING ↑1.7% &nbsp;&nbsp; BSA ↑2.4% · FORECASTING ↑5.1% · CHURN ↓0.8% · INVENTORY ↑3.2% · HOUSING ↑1.7%
          </span>
        </div>
      </div>

      <div className="absolute bottom-3 left-5">
        <span className="text-[12px] font-mono uppercase tracking-wider font-bold" style={{ color, opacity: 0.6 }}>Trading Floor</span>
      </div>

      <div className="absolute bottom-3 right-5 flex items-center gap-1.5">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" opacity="0.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/></svg>
        <span className="text-[10px] font-mono font-medium" style={{ color, opacity: 0.45 }}>+12.3%</span>
      </div>
    </div>
  );
}
