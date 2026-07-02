"use client";

import { motion } from "framer-motion";
import { ExternalLink, Globe, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import {
  PRODUCTION_PRODUCTS,
  BUSINESS_PRODUCTS,
  AGENT_PRODUCTS,
  LAB_PRODUCTS,
  CONCEPT_PRODUCTS,
  ALL_PRODUCTS,
  CATEGORY_LABELS,
  DOMAINS,
  OWNERSHIP_LABELS,
  type Product,
} from "@/lib/data";
import { useStore } from "@/lib/store";

const EASE = [0.32, 0.72, 0, 1] as const;

function monogram(name: string): string {
  const words = name.replace(/[^\w\s]/g, "").split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

function SectionLabel({ children, count }: { children: React.ReactNode; count: number }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold font-mono text-[#475569] bg-[rgba(15,23,42,0.04)] border border-[rgba(15,23,42,0.06)]">
        {children}
      </span>
      <span className="text-[10px] font-mono text-[#94A3B8]">{count}</span>
      <div className="flex-1 h-[1px] bg-[rgba(15,23,42,0.05)]" />
    </div>
  );
}

function StatusChips({ product }: { product: Product }) {
  return (
    <span className="flex items-center gap-1.5 shrink-0">
      {product.status === "live" && (
        <span className="flex items-center gap-1 text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold text-[#047857] bg-[rgba(16,185,129,0.08)] border border-[rgba(16,185,129,0.18)]">
          <span className="w-1 h-1 rounded-full bg-[#10B981] animate-pulse-soft" />
          Live
        </span>
      )}
      <span
        className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold ${
          product.ownership === "solo"
            ? "text-[#475569] bg-[rgba(15,23,42,0.04)] border border-[rgba(15,23,42,0.07)]"
            : "text-[#6D28D9] bg-[rgba(139,92,246,0.07)] border border-[rgba(139,92,246,0.16)]"
        }`}
      >
        {OWNERSHIP_LABELS[product.ownership]}
      </span>
    </span>
  );
}

function ProductionRow({ product, index }: { product: Product; index: number }) {
  const setActiveProjectId = useStore((s) => s.setActiveProjectId);
  const domain = DOMAINS[product.domain];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 + index * 0.07, duration: 0.5, ease: EASE }}
      className="rounded-[18px] p-1.5 bg-[rgba(15,23,42,0.025)] border border-[rgba(15,23,42,0.05)]"
    >
      <div
        role="button"
        tabIndex={0}
        aria-label={`Open ${product.name} case study`}
        onClick={() => setActiveProjectId(product.id)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setActiveProjectId(product.id);
          }
        }}
        className="group w-full text-left rounded-[13px] bg-white border border-[rgba(15,23,42,0.05)] p-4 cursor-pointer transition-shadow duration-300 hover:shadow-[0_2px_4px_rgba(15,23,42,0.05),0_12px_32px_rgba(15,23,42,0.08)]"
      >
        <div className="flex items-start gap-3.5">
          {/* Project initials — matte tile, no gloss */}
          <div
            className="w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0 font-heading font-semibold text-[13px] tracking-[-0.02em] text-white/90"
            style={{ background: "#0F172A" }}
          >
            {monogram(product.name)}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <span className="text-[15px] font-heading font-bold text-[#0F172A] tracking-[-0.01em]">
                {product.name}
              </span>
              <StatusChips product={product} />
            </div>
            <p className="text-[12px] text-[#64748B] leading-relaxed line-clamp-2">{product.tagline}</p>

            <div className="flex items-center gap-3 mt-2">
              <span className="text-[10px] font-mono text-[#94A3B8]">
                {domain.label} · {product.year}
              </span>
              {product.website && (
                <a
                  href={product.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1 text-[10px] font-semibold text-[#047857] hover:underline underline-offset-2"
                >
                  <Globe className="w-3 h-3" />
                  Open live
                </a>
              )}
              {product.github && (
                <a
                  href={product.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1 text-[10px] font-semibold text-[#475569] hover:underline underline-offset-2"
                >
                  <ExternalLink className="w-3 h-3" />
                  Source
                </a>
              )}
              {!product.website && !product.github && (
                <span className="text-[10px] font-mono text-[#94A3B8]">code private</span>
              )}
            </div>
          </div>

          {/* Nested chevron island */}
          <span className="w-8 h-8 rounded-full bg-[rgba(15,23,42,0.04)] flex items-center justify-center shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:bg-[rgba(15,23,42,0.07)]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function SystemRow({ product, index }: { product: Product; index: number }) {
  const setActiveProjectId = useStore((s) => s.setActiveProjectId);
  const domain = DOMAINS[product.domain];

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.05, duration: 0.45, ease: EASE }}
      onClick={() => setActiveProjectId(product.id)}
      className="group w-full text-left rounded-[13px] bg-white border border-[rgba(15,23,42,0.05)] px-4 py-3 cursor-pointer transition-shadow duration-300 hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.07)] flex items-center gap-3"
    >
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: domain.color }} />
      <span className="text-[13px] font-heading font-semibold text-[#0F172A] shrink-0">{product.name}</span>
      <span className="text-[11px] text-[#94A3B8] truncate flex-1">{product.tagline}</span>
      {product.status === "live" && (
        <span className="text-[9px] uppercase tracking-wider font-bold text-[#047857] shrink-0">Live</span>
      )}
      <svg className="shrink-0 opacity-30 group-hover:opacity-70 transition-opacity" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </motion.button>
  );
}

function CompactGrid({ products, muted, baseDelay }: { products: Product[]; muted?: boolean; baseDelay: number }) {
  const setActiveProjectId = useStore((s) => s.setActiveProjectId);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5">
      {products.map((p, i) => (
        <motion.button
          key={p.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: baseDelay + i * 0.03, duration: 0.4, ease: EASE }}
          onClick={() => setActiveProjectId(p.id)}
          className={`text-left rounded-[10px] border border-[rgba(15,23,42,0.05)] px-3 py-2.5 min-h-[52px] cursor-pointer transition-shadow duration-300 hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_6px_16px_rgba(15,23,42,0.06)] ${
            muted ? "bg-[rgba(255,255,255,0.6)]" : "bg-white"
          }`}
        >
          <span className="flex items-center gap-1.5">
            <span className="block text-[12px] font-semibold text-[#0F172A] truncate">{p.name}</span>
            {p.status === "live" && <span className="text-[8px] uppercase tracking-wider font-bold text-[#047857] shrink-0">Live</span>}
          </span>
          <span className="block text-[10px] text-[#94A3B8] truncate mt-0.5">{p.tagline}</span>
        </motion.button>
      ))}
    </div>
  );
}

export default function ShowcaseApp() {
  return (
    <div className="min-h-[480px] bg-[#FAFAF8] p-5">
      {/* Header */}
      <div className="mb-5">
        <h3 className="text-[18px] font-heading font-bold text-[#0F172A] tracking-[-0.02em] mb-1">
          Work, production first
        </h3>
        <p className="text-[12px] text-[#64748B]">
          {ALL_PRODUCTS.length} systems built across production, AI agents, ML experiments, and business tools.
          Click any row for the full breakdown.
        </p>
      </div>

      {/* Featured case study */}
      <Link
        href="/projects/hrms"
        className="group flex items-center gap-3 rounded-[14px] bg-[#0F172A] text-white px-4 py-3.5 mb-6 transition-colors hover:bg-[#1E293B]"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse-soft shrink-0" aria-hidden />
        <span className="flex-1 min-w-0">
          <span className="block text-[13px] font-heading font-bold">HRMS — featured case study</span>
          <span className="block text-[11px] text-white/60 truncate">
            Live production · 3 orgs · 80+ daily users · architecture, security, testing, deployment
          </span>
        </span>
        <ArrowUpRight className="w-4 h-4 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" aria-hidden />
      </Link>

      {/* In Production */}
      <section className="mb-7" aria-label={CATEGORY_LABELS["production"]}>
        <SectionLabel count={PRODUCTION_PRODUCTS.length}>{CATEGORY_LABELS["production"]}</SectionLabel>
        <div className="space-y-2.5">
          {PRODUCTION_PRODUCTS.map((p, i) => (
            <ProductionRow key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Client & Business Systems */}
      <section className="mb-7" aria-label={CATEGORY_LABELS["business"]}>
        <SectionLabel count={BUSINESS_PRODUCTS.length}>{CATEGORY_LABELS["business"]}</SectionLabel>
        <div className="space-y-2.5">
          {BUSINESS_PRODUCTS.map((p, i) => (
            <ProductionRow key={p.id} product={p} index={i + PRODUCTION_PRODUCTS.length} />
          ))}
        </div>
      </section>

      {/* AI & Agent Systems */}
      <section className="mb-7" aria-label={CATEGORY_LABELS["ai-agents"]}>
        <SectionLabel count={AGENT_PRODUCTS.length}>{CATEGORY_LABELS["ai-agents"]}</SectionLabel>
        <div className="space-y-1.5">
          {AGENT_PRODUCTS.map((p, i) => (
            <SystemRow key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* ML Lab & Experiments */}
      <section className="mb-7" aria-label={CATEGORY_LABELS["lab"]}>
        <SectionLabel count={LAB_PRODUCTS.length}>{CATEGORY_LABELS["lab"]}</SectionLabel>
        <CompactGrid products={LAB_PRODUCTS} baseDelay={0.5} />
      </section>

      {/* Design-stage Concepts */}
      <section aria-label={CATEGORY_LABELS["concept"]}>
        <SectionLabel count={CONCEPT_PRODUCTS.length}>{CATEGORY_LABELS["concept"]}</SectionLabel>
        <CompactGrid products={CONCEPT_PRODUCTS} muted baseDelay={0.6} />
      </section>
    </div>
  );
}
