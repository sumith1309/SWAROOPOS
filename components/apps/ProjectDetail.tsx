"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/lib/store";
import { ALL_PRODUCTS, DOMAINS } from "@/lib/data";
import { X, ExternalLink, ArrowRight } from "lucide-react";

export default function ProjectDetail() {
  const activeProjectId = useStore((s) => s.activeProjectId);
  const setActiveProjectId = useStore((s) => s.setActiveProjectId);

  const product = ALL_PRODUCTS.find((p) => p.id === activeProjectId);
  if (!product) return null;

  const domain = DOMAINS[product.domain];
  const close = () => setActiveProjectId(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      onClick={close}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative z-10 w-full max-w-[720px] max-h-[85vh] overflow-y-auto rounded-[20px]"
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with accent gradient */}
        <div className="relative p-6 pb-4" style={{ background: `linear-gradient(135deg, ${domain.color}08, ${domain.color}03)` }}>
          {/* Close button */}
          <button onClick={close} className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors cursor-pointer text-[#94A3B8]">
            <X className="w-4 h-4" />
          </button>

          {/* Domain badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider mb-4"
            style={{ color: domain.color, background: `${domain.color}10`, border: `1px solid ${domain.color}15` }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: domain.color }} />
            {domain.label}
          </div>

          {/* Title */}
          <h1 className="text-[28px] font-heading font-bold text-[#0F172A] tracking-[-0.02em] mb-2">
            {product.name}
          </h1>
          <p className="text-[14px] text-[#64748B] leading-relaxed">{product.tagline}</p>

          {/* Year + Links */}
          <div className="flex items-center gap-3 mt-4">
            <span className="text-[12px] font-mono text-[#94A3B8]">{product.year}</span>
            {product.github && (
              <a href={product.github} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium transition-colors border cursor-pointer"
                style={{ color: domain.color, borderColor: `${domain.color}20`, background: `${domain.color}05` }}>
                <ExternalLink className="w-3 h-3" />
                View Source
              </a>
            )}
          </div>
        </div>

        {/* Metrics row */}
        {product.metrics.length > 0 && (
          <div className="px-6 py-5 flex flex-wrap gap-8 border-y border-[rgba(0,0,0,0.04)]" style={{ background: `${domain.color}02` }}>
            {product.metrics.map((m, i) => (
              <motion.div key={m.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }}>
                <div className="text-[32px] font-heading font-bold leading-none" style={{ color: domain.color }}>{m.value}</div>
                <div className="text-[10px] text-[#94A3B8] uppercase tracking-[0.12em] mt-1 font-semibold">{m.label}</div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Case Study Sections */}
        <div className="px-6 py-5 space-y-6">

          {/* Problem */}
          {product.problem && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[12px]" style={{ background: `${domain.color}10`, color: domain.color }}>?</div>
                <h3 className="text-[13px] font-heading font-bold text-[#0F172A] uppercase tracking-wider">The Problem</h3>
              </div>
              <p className="text-[14px] text-[#475569] leading-[1.7] pl-8">{product.problem}</p>
            </motion.div>
          )}

          {/* Solution / Description */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[12px]" style={{ background: `${domain.color}10`, color: domain.color }}>
                <ArrowRight className="w-3 h-3" />
              </div>
              <h3 className="text-[13px] font-heading font-bold text-[#0F172A] uppercase tracking-wider">The Solution</h3>
            </div>
            <p className="text-[14px] text-[#475569] leading-[1.7] pl-8">{product.description}</p>
          </motion.div>

          {/* Architecture */}
          {product.architecture && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold" style={{ background: `${domain.color}10`, color: domain.color }}>&lt;/&gt;</div>
                <h3 className="text-[13px] font-heading font-bold text-[#0F172A] uppercase tracking-wider">Architecture</h3>
              </div>
              <div className="pl-8">
                <div className="text-[12px] font-mono text-[#64748B] leading-relaxed p-3 rounded-[12px] bg-[#F8FAFC] border border-[rgba(0,0,0,0.04)] overflow-x-auto">
                  {product.architecture}
                </div>
              </div>
            </motion.div>
          )}

          {/* Impact */}
          {product.impact && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[12px]" style={{ background: "#10B98110", color: "#10B981" }}>★</div>
                <h3 className="text-[13px] font-heading font-bold text-[#0F172A] uppercase tracking-wider">Impact</h3>
              </div>
              <p className="text-[14px] text-[#475569] leading-[1.7] pl-8">{product.impact}</p>
            </motion.div>
          )}

          {/* Features */}
          {product.features.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <h3 className="text-[13px] font-heading font-bold text-[#0F172A] uppercase tracking-wider mb-3">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {product.features.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-[13px] text-[#475569] p-2 rounded-[10px] bg-[#F8FAFC]">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: domain.color }} />
                    {f}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Tech Stack */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <h3 className="text-[13px] font-heading font-bold text-[#0F172A] uppercase tracking-wider mb-3">Tech Stack</h3>
            <div className="space-y-2">
              {product.techStack.map((cat) => (
                <div key={cat.category}>
                  <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-semibold">{cat.category}</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {cat.items.map((t) => (
                      <span key={t} className="text-[11px] font-medium px-2.5 py-0.5 rounded-full"
                        style={{ color: `${domain.color}CC`, background: `${domain.color}06`, border: `1px solid ${domain.color}12` }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Role */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <h3 className="text-[13px] font-heading font-bold text-[#0F172A] uppercase tracking-wider mb-2">My Role</h3>
            <p className="text-[14px] text-[#475569] leading-[1.7]">{product.role}</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
