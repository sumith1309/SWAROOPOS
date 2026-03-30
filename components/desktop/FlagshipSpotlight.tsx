"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";

export default function FlagshipSpotlight({ isDark }: { isDark: boolean }) {
  const setActiveProjectId = useStore((s) => s.setActiveProjectId);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 800);
    return () => clearTimeout(t);
  }, []);

  const springVal = useSpring(0, { stiffness: 40, damping: 20 });
  const display = useTransform(springVal, (v) => `${Math.round(v)}%`);

  useEffect(() => {
    if (mounted) springVal.set(97);
  }, [mounted, springVal]);

  const nodes = ["7 Models", "Kalman Filter", "97%"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55 }}
      className={`p-3 cursor-pointer group ${isDark ? "liquid-glass-sm-dark" : "liquid-glass-sm"}`}
      onClick={() => setActiveProjectId("sahara-sense")}
    >
      <div className="flex items-center justify-between mb-2">
        <span className={`text-[9px] uppercase tracking-wider font-bold ${isDark ? "text-white/40" : "text-[#8E8E93]"}`}>
          Flagship
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
      </div>

      {/* Animated accuracy counter */}
      <div className="flex items-baseline gap-1 mb-1">
        <motion.span
          className="text-[28px] font-heading font-bold leading-none text-[#F59E0B]"
        >
          {display}
        </motion.span>
        <span className={`text-[9px] font-semibold ${isDark ? "text-white/30" : "text-[#94A3B8]"}`}>accuracy</span>
      </div>
      <p className={`text-[10px] font-semibold mb-3 ${isDark ? "text-white/60" : "text-[#475569]"}`}>
        Sahara Sense — Dust Storm AI
      </p>

      {/* Mini architecture flow */}
      <div className="flex items-center gap-0.5">
        {nodes.map((node, i) => (
          <div key={node} className="flex items-center gap-0.5">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + i * 0.15 }}
              className="px-1.5 py-0.5 rounded text-[7px] font-bold whitespace-nowrap"
              style={{
                background: isDark ? "rgba(245,158,11,0.15)" : "rgba(245,158,11,0.08)",
                color: "#F59E0B",
                border: "1px solid rgba(245,158,11,0.2)",
              }}
            >
              {node}
            </motion.div>
            {i < nodes.length - 1 && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 + i * 0.15 }}
                className={`text-[8px] ${isDark ? "text-white/20" : "text-[#CBD5E1]"}`}
              >
                →
              </motion.span>
            )}
          </div>
        ))}
      </div>

      {/* Deep dive link */}
      <div className={`mt-2 text-[9px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? "text-[#F59E0B]" : "text-[#D97706]"}`}>
        Deep Dive →
      </div>
    </motion.div>
  );
}
