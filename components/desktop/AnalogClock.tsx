"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AnalogClock({ isDark }: { isDark: boolean }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = hours * 30 + minutes * 0.5;

  const strokeColor = isDark ? "rgba(255,255,255,0.7)" : "#1C1C1E";
  const tickColor = isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.15)";
  const tickStrongColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)";
  const secondColor = "#EF4444";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      className={`p-4 flex flex-col items-center ${isDark ? "liquid-glass-sm-dark" : "liquid-glass-sm"}`}
    >
      <svg width="140" height="140" viewBox="0 0 140 140">
        {/* Outer ring */}
        <circle cx="70" cy="70" r="66" fill="none" stroke={tickColor} strokeWidth="1" />

        {/* Tick marks */}
        {Array.from({ length: 60 }).map((_, i) => {
          const isHour = i % 5 === 0;
          const angle = (i * 6 - 90) * (Math.PI / 180);
          const outerR = 62;
          const innerR = isHour ? 52 : 57;
          return (
            <line
              key={i}
              x1={70 + Math.cos(angle) * innerR}
              y1={70 + Math.sin(angle) * innerR}
              x2={70 + Math.cos(angle) * outerR}
              y2={70 + Math.sin(angle) * outerR}
              stroke={isHour ? tickStrongColor : tickColor}
              strokeWidth={isHour ? 2 : 0.8}
              strokeLinecap="round"
            />
          );
        })}

        {/* Hour numbers */}
        {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const r = 44;
          return (
            <text
              key={num}
              x={70 + Math.cos(angle) * r}
              y={70 + Math.sin(angle) * r}
              textAnchor="middle"
              dominantBaseline="central"
              fill={isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)"}
              fontSize="10"
              fontWeight="600"
              fontFamily="var(--font-heading), system-ui"
            >
              {num}
            </text>
          );
        })}

        {/* Hour hand */}
        <line
          x1="70" y1="70"
          x2={70 + Math.cos((hourDeg - 90) * (Math.PI / 180)) * 30}
          y2={70 + Math.sin((hourDeg - 90) * (Math.PI / 180)) * 30}
          stroke={strokeColor}
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Minute hand */}
        <line
          x1="70" y1="70"
          x2={70 + Math.cos((minuteDeg - 90) * (Math.PI / 180)) * 42}
          y2={70 + Math.sin((minuteDeg - 90) * (Math.PI / 180)) * 42}
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Second hand */}
        <line
          x1={70 - Math.cos((secondDeg - 90) * (Math.PI / 180)) * 12}
          y1={70 - Math.sin((secondDeg - 90) * (Math.PI / 180)) * 12}
          x2={70 + Math.cos((secondDeg - 90) * (Math.PI / 180)) * 50}
          y2={70 + Math.sin((secondDeg - 90) * (Math.PI / 180)) * 50}
          stroke={secondColor}
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Center dot */}
        <circle cx="70" cy="70" r="3.5" fill={strokeColor} />
        <circle cx="70" cy="70" r="2" fill={secondColor} />
      </svg>

      {/* Digital readout below */}
      <div className={`mt-2 text-[11px] font-mono font-medium tracking-wider ${isDark ? "text-white/40" : "text-[#8E8E93]"}`}>
        {time.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
      </div>
    </motion.div>
  );
}
