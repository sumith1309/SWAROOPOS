"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CONTACT } from "@/lib/data";

const LINKS = [
  { label: "sumithswaroop@gmail.com", href: "mailto:sumithswaroop@gmail.com", icon: "M2 4h20v16H2zM22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" },
  { label: "LinkedIn", href: "https://linkedin.com/in/jyothi-swaroop-753116295", icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 4a2 2 0 100 4 2 2 0 000-4z", ext: true },
  { label: "GitHub", href: "https://github.com/sumith1309", icon: "M15 22v-4a4.8 4.8 0 00-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 004 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4M9 18c-4.51 2-5-2-7-2", ext: true },
  { label: "+91 9490064789", href: "tel:+919490064789", icon: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" },
];

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="contact" className="relative py-28 px-6">
      <div className="absolute inset-0 gradient-mesh-hero pointer-events-none" />

      <div ref={ref} className="max-w-3xl mx-auto relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <span className="text-[12px] font-mono text-[#3B82F6] uppercase tracking-[0.2em] mb-3 block font-semibold">Connect</span>
          <h2 className="text-[clamp(36px,6vw,60px)] font-heading font-bold tracking-[-0.03em] mb-6">
            <span className="text-[#0F172A]">Let&apos;s Build</span>
            <br />
            <span className="text-gradient-premium">Something Extraordinary</span>
          </h2>
          <p className="text-[16px] text-[#94A3B8] max-w-md mx-auto mb-12 leading-relaxed">
            Available for AI Product Management roles, co-founding opportunities, and interesting collaborations.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-10">
          {LINKS.map((item, i) => (
            <motion.a key={item.label} href={item.href} target={item.ext ? "_blank" : undefined} rel={item.ext ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 + i * 0.1 }}
              className="glass-card flex items-center gap-3 p-4 group cursor-pointer">
              <div className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 bg-[#EFF6FF]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={item.icon} /></svg>
              </div>
              <span className="text-[14px] text-[#475569] group-hover:text-[#0F172A] transition-colors font-medium">{item.label}</span>
            </motion.a>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-2 text-[13px] text-[#94A3B8] mb-8">
          <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse-soft" />
          {CONTACT.location} · {CONTACT.openTo}
        </motion.div>

        <div className="gradient-line w-48 mx-auto mb-6" />
        <p className="text-[13px] text-[#94A3B8]">Designed & Built by S. Jyothi Swaroop · 2026</p>
      </div>
    </section>
  );
}
