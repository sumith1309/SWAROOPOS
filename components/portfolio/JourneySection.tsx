"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CAREER, EDUCATION } from "@/lib/data";

export default function JourneySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="journey" className="relative py-28 px-6">
      <div ref={ref} className="max-w-4xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="text-[12px] font-mono text-[#3B82F6] uppercase tracking-[0.2em] mb-3 block font-semibold">Journey</span>
          <h2 className="text-[clamp(32px,5vw,52px)] font-heading font-bold text-[#0F172A] tracking-[-0.03em] mb-4">The Evolution</h2>
          <p className="text-[16px] text-[#94A3B8] max-w-md mx-auto">From construction operations to AI product leadership</p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-[0.5px] top-0 bottom-0 w-[2px] rounded-full" style={{
            background: "linear-gradient(180deg, #3B82F6, #8B5CF6, #E2E8F0)",
          }} />

          {CAREER.map((entry, i) => (
            <motion.div
              key={entry.version}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
              className={`relative mb-10 md:w-[45%] ${i % 2 === 0 ? "md:mr-auto md:pr-10" : "md:ml-auto md:pl-10"} pl-14 md:pl-0`}
            >
              {/* Dot */}
              <div className={`absolute ${i % 2 === 0 ? "left-[17px] md:left-auto md:-right-[32px]" : "left-[17px] md:-left-[32px]"} top-3 w-[16px] h-[16px] rounded-full border-[3px] z-10 ${
                entry.active ? "bg-[#3B82F6] border-white shadow-[0_0_0_3px_rgba(59,130,246,0.2)]" : "bg-white border-[#E2E8F0]"
              }`} />

              {/* Card */}
              <div className="glass-card p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[14px] font-mono font-bold text-gradient-premium">{entry.version}</span>
                  {entry.active && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#10B98115] text-[#10B981]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse-soft" />
                      ACTIVE
                    </span>
                  )}
                </div>
                <h3 className="text-[18px] font-heading font-bold text-[#0F172A] mb-1">{entry.company}</h3>
                <p className="text-[13px] text-[#94A3B8] mb-3">{entry.role} · {entry.period}</p>
                <ul className="space-y-1.5">
                  {entry.highlights.slice(0, 3).map((h, j) => (
                    <li key={j} className="flex items-start gap-2 text-[13px] text-[#64748B]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] mt-1.5 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
                {entry.stack.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {entry.stack.slice(0, 5).map(s => (
                      <span key={s} className="text-[10px] font-mono text-[#94A3B8] px-2 py-0.5 rounded-full bg-[#F1F5F9]">{s}</span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {/* Education */}
          {EDUCATION.map((edu, i) => (
            <motion.div key={edu.institution} initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.8 + i * 0.1 }}
              className="relative mb-6 md:w-[45%] md:ml-auto md:pl-10 pl-14">
              <div className="absolute left-[17px] md:-left-[32px] top-3 w-[16px] h-[16px] rounded-full border-[3px] bg-white border-[#E2E8F0] z-10" />
              <div className="rounded-[16px] p-4 bg-white border border-[rgba(0,0,0,0.04)]">
                <h4 className="text-[15px] font-heading font-semibold text-[#0F172A]">{edu.institution}</h4>
                <p className="text-[13px] text-[#64748B]">{edu.degree}</p>
                <p className="text-[12px] text-[#94A3B8]">{edu.period} · {edu.campuses}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
