"use client";

import { motion } from "framer-motion";
import { CAREER, EDUCATION, PROFESSIONAL_SUMMARY, CERTIFICATIONS } from "@/lib/data";

export default function AboutApp() {
  return (
    <div className="p-5 space-y-6">
      {/* Hero header */}
      <div className="relative overflow-hidden -mx-5 -mt-5 px-5 pt-6 pb-4 mb-2" style={{
        background: "linear-gradient(180deg, rgba(59, 130, 246, 0.06) 0%, transparent 100%)"
      }}>
        <h2 className="text-[24px] font-heading font-semibold text-gradient-accent mb-1">S. Jyothi Swaroop</h2>
        <p className="text-[13px] font-mono text-[#94A3B8]">I architect AI systems that predict, protect, and automate</p>
        <div className="gradient-line mt-4" />
      </div>

      {/* Professional Summary */}
      <div>
        <p className="text-[15px] leading-[1.7] text-[#64748B]">
          {PROFESSIONAL_SUMMARY.split(/(20\+ AI-powered digital products|5 domains|healthcare, education, HR tech, and supply chain)/g).map(
            (part, i) =>
              ["20+ AI-powered digital products", "5 domains", "healthcare, education, HR tech, and supply chain"].includes(part) ? (
                <span key={i} className="text-[#0F172A] font-medium">{part}</span>
              ) : (
                <span key={i}>{part}</span>
              )
          )}
        </p>
      </div>

      {/* Timeline header */}
      <div className="border-t border-[rgba(0,0,0,0.06)] pt-4">
        <h3 className="text-[13px] font-mono text-[#94A3B8] uppercase tracking-wider mb-4">System Update Log</h3>
      </div>

      {/* Career entries */}
      <div className="relative pl-6">
        {/* Vertical line */}
        <div className="absolute left-[7px] top-0 bottom-0 w-[1px]" style={{
          background: "linear-gradient(180deg, #3B82F6, rgba(59, 130, 246, 0.3), rgba(255,255,255,0.05))"
        }} />

        {CAREER.map((entry, i) => (
          <motion.div
            key={entry.version}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className="relative mb-6 last:mb-0"
          >
            {/* Dot */}
            <div
              className={`absolute -left-6 top-1 w-[14px] h-[14px] rounded-full border-2 ${
                entry.active
                  ? "bg-[#3B82F6] border-[#3B82F6] shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                  : "bg-white border-[rgba(0,0,0,0.08)]"
              }`}
            />

            {/* Version + Company */}
            <div className="flex items-center gap-3 mb-1">
              <span className="text-[16px] font-mono font-medium text-[#3B82F6]">{entry.version}</span>
              <span className="text-[18px] font-heading font-medium text-[#0F172A]">{entry.company}</span>
              {entry.active && (
                <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono bg-[rgba(16,185,129,0.08)] text-green-400">
                  <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse-dot" />
                  ACTIVE
                </span>
              )}
            </div>

            {/* Meta */}
            <div className="text-[13px] font-mono text-[#94A3B8] mb-2">
              {entry.role} · {entry.period} · {entry.location}
            </div>

            {/* Highlights as tree */}
            <div className="space-y-0.5">
              {entry.highlights.map((h, j) => (
                <div key={j} className="flex items-start gap-2 text-[13px] text-[#64748B]">
                  <span className="text-[#94A3B8] shrink-0 font-mono text-[11px] mt-0.5">
                    {j === entry.highlights.length - 1 ? "└─" : "├─"}
                  </span>
                  <span>{h}</span>
                </div>
              ))}
            </div>

            {/* Stack */}
            {entry.stack.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {entry.stack.map((s) => (
                  <span key={s} className="text-[10px] font-mono text-[#94A3B8] px-1.5 py-0.5 rounded border border-[rgba(0,0,0,0.06)]">
                    {s}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: CAREER.length * 0.1, duration: 0.3 }}
          className="relative"
        >
          <div className="absolute -left-6 top-1 w-[14px] h-[14px] rounded-full border-2 bg-white border-[rgba(0,0,0,0.08)]" />
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[16px] font-mono font-medium text-[#3B82F6]">v0.1</span>
            <span className="text-[18px] font-heading font-medium text-[#0F172A]">Education</span>
          </div>
          {EDUCATION.map((edu, i) => (
            <div key={i} className="mb-3 last:mb-0">
              <div className="flex items-start gap-2 text-[13px] text-[#64748B]">
                <span className="text-[#94A3B8] shrink-0 font-mono text-[11px] mt-0.5">
                  {i === EDUCATION.length - 1 ? "└─" : "├─"}
                </span>
                <div>
                  <div className="font-medium text-[#1E293B]">{edu.institution}</div>
                  <div className="text-[#94A3B8]">{edu.degree} [{edu.period}]</div>
                  <div className="text-[#94A3B8] text-[12px]">{edu.campuses}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: CAREER.length * 0.1 + 0.1, duration: 0.3 }}
          className="relative mt-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[16px] font-mono font-medium text-[#10B981]">certs</span>
            <span className="text-[18px] font-heading font-medium text-[#0F172A]">Certifications</span>
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            {CERTIFICATIONS.map((cert) => (
              <div key={cert} className="flex items-center gap-2 text-[13px] text-[#475569] p-2 rounded-[10px] bg-[#F8FAFC]">
                <span className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] bg-[#10B98110] text-[#10B981] font-bold shrink-0">✓</span>
                {cert}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
