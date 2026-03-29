"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SKILLS, CERTIFICATIONS, LANGUAGES } from "@/lib/data";

const COLORS: Record<string, string> = {
  "Product Management": "#3B82F6",
  "AI & Data": "#8B5CF6",
  "Technical": "#10B981",
  "Business & Operations": "#F59E0B",
};

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="skills" className="relative py-28 px-6">
      <div className="absolute inset-0 gradient-mesh-soft pointer-events-none" />
      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <span className="text-[12px] font-mono text-[#3B82F6] uppercase tracking-[0.2em] mb-3 block font-semibold">Expertise</span>
          <h2 className="text-[clamp(32px,5vw,52px)] font-heading font-bold text-[#0F172A] tracking-[-0.03em] mb-4">The Arsenal</h2>
          <p className="text-[16px] text-[#94A3B8] max-w-md mx-auto">Technical depth meets business acumen</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {Object.entries(SKILLS).map(([cat, items], ci) => {
            const color = COLORS[cat] || "#3B82F6";
            return (
              <motion.div key={cat} initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 + ci * 0.1 }} className="glass-card p-6 relative overflow-hidden">
                <div className="h-[2px] absolute top-0 left-0 right-0" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                  <h3 className="text-[16px] font-heading font-bold text-[#0F172A]">{cat}</h3>
                </div>
                <div className="space-y-3">
                  {items.map((item, i) => (
                    <div key={item}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[13px] text-[#475569]">{item}</span>
                      </div>
                      <div className="h-[3px] bg-[#F1F5F9] rounded-full overflow-hidden">
                        <motion.div className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${color}, ${color}80)` }}
                          initial={{ width: 0 }} animate={inView ? { width: `${65 + ((i * 7 + ci * 13) % 35)}%` } : {}}
                          transition={{ duration: 0.8, delay: 0.4 + ci * 0.1 + i * 0.03 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.7 }} className="glass-card p-6">
            <h3 className="text-[15px] font-heading font-bold text-[#0F172A] mb-4">Certifications</h3>
            <div className="space-y-2.5">
              {CERTIFICATIONS.map(c => (
                <div key={c} className="flex items-center gap-2.5 text-[13px] text-[#475569]">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                  {c}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.8 }} className="glass-card p-6">
            <h3 className="text-[15px] font-heading font-bold text-[#0F172A] mb-4">Languages</h3>
            <div className="space-y-4">
              {LANGUAGES.map(l => (
                <div key={l.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-[13px] font-medium text-[#0F172A]">{l.name}</span>
                    <span className="text-[12px] text-[#94A3B8]">{l.level}</span>
                  </div>
                  <div className="h-[3px] bg-[#F1F5F9] rounded-full overflow-hidden">
                    <motion.div className="h-full rounded-full" style={{ background: "linear-gradient(90deg, #3B82F6, #8B5CF6)" }}
                      initial={{ width: 0 }} animate={inView ? { width: `${l.percent}%` } : {}} transition={{ duration: 0.8, delay: 0.9 }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
