"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { FEATURED_PRODUCTS, ADDITIONAL_PRODUCTS, DOMAINS, type Product } from "@/lib/data";
import gsap from "gsap";

const ALL_DISPLAY_PRODUCTS = [...FEATURED_PRODUCTS, ...ADDITIONAL_PRODUCTS];

export default function ProductsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isIdle, setIsIdle] = useState(true);
  const bgRef = useRef<HTMLDivElement>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  // Idle wave animation
  useEffect(() => {
    if (!isIdle || !inView) return;
    const items = itemRefs.current.filter(Boolean);
    if (items.length === 0) return;

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
    items.forEach((item, i) => {
      tl.to(item!, { opacity: 0.15, duration: 0.15, ease: "power2.inOut" }, i * 0.04);
      tl.to(item!, { opacity: 1, duration: 0.15, ease: "power2.inOut" }, i * 0.04 + items.length * 0.02);
    });

    return () => { tl.kill(); };
  }, [isIdle, inView]);

  const startIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => setIsIdle(true), 4000);
  }, []);

  const handleHover = useCallback((index: number) => {
    setIsIdle(false);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    setActiveIndex(index);

    const product = ALL_DISPLAY_PRODUCTS[index];
    const color = DOMAINS[product.domain].color;
    if (bgRef.current) {
      bgRef.current.style.background = `radial-gradient(ellipse at 50% 50%, ${color}12 0%, transparent 70%)`;
      bgRef.current.style.opacity = "1";
    }
  }, []);

  const handleLeave = useCallback(() => {
    setActiveIndex(-1);
    if (bgRef.current) bgRef.current.style.opacity = "0";
    startIdleTimer();
  }, [startIdleTimer]);

  useEffect(() => {
    startIdleTimer();
    return () => { if (idleTimerRef.current) clearTimeout(idleTimerRef.current); };
  }, [startIdleTimer]);

  return (
    <section id="products" ref={sectionRef} className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 gradient-mesh-soft pointer-events-none" />
      <div ref={bgRef} className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[12px] font-mono text-[#3B82F6] uppercase tracking-[0.2em] mb-3 block font-semibold">Portfolio</span>
          <h2 className="text-[clamp(32px,5vw,52px)] font-heading font-bold text-[#0F172A] tracking-[-0.03em] mb-4">
            20+ Products Built
          </h2>
          <p className="text-[16px] text-[#94A3B8] max-w-md mx-auto">
            AI-powered solutions across education, climate, enterprise, fintech, and construction
          </p>
        </motion.div>

        {/* Interactive project list */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}>
          {/* Column headers */}
          <div className="grid grid-cols-[1fr_2fr_1fr_1fr_80px] gap-4 px-4 py-3 border-b-2 border-[rgba(0,0,0,0.08)] text-[10px] font-mono uppercase tracking-[0.15em] text-[#94A3B8] font-semibold hidden md:grid">
            <span>Product</span>
            <span>Description</span>
            <span>Domain</span>
            <span>Stack</span>
            <span className="text-right">Year</span>
          </div>

          {/* Rows */}
          <ul className="divide-y divide-[rgba(0,0,0,0.04)]" onMouseLeave={handleLeave}>
            {ALL_DISPLAY_PRODUCTS.map((product, index) => (
              <ProjectRow
                key={product.id}
                product={product}
                index={index}
                isActive={activeIndex === index}
                hasActive={activeIndex !== -1}
                onHover={handleHover}
                ref={(el: HTMLLIElement | null) => { itemRefs.current[index] = el; }}
              />
            ))}
          </ul>
        </motion.div>

        {/* Featured cards below */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURED_PRODUCTS.map((p, i) => {
            const color = DOMAINS[p.domain].color;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="glass-card p-5 relative overflow-hidden group"
              >
                <div className="h-[3px] absolute top-0 left-0 right-0" style={{
                  background: `linear-gradient(90deg, ${color}, ${color}40)`,
                }} />
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-[10px] font-mono uppercase tracking-wider font-semibold" style={{ color }}>
                    {DOMAINS[p.domain].label}
                  </span>
                </div>
                <h3 className="text-[17px] font-heading font-bold text-[#0F172A] mb-1">{p.name}</h3>
                <p className="text-[12px] text-[#94A3B8] leading-relaxed mb-3">{p.tagline}</p>
                {p.metrics.length > 0 && (
                  <div className="flex gap-4 mb-3">
                    {p.metrics.slice(0, 2).map((m) => (
                      <div key={m.label}>
                        <div className="text-[22px] font-heading font-bold stat-value" style={{ color }}>{m.value}</div>
                        <div className="text-[9px] text-[#94A3B8] uppercase tracking-wider font-medium">{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer"
                    className="text-[11px] text-[#94A3B8] hover:text-[#3B82F6] font-medium transition-colors flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5" />
                    </svg>
                    View Source
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Interactive project row with GSAP color animation
const ProjectRow = React.forwardRef<HTMLLIElement, {
  product: Product;
  index: number;
  isActive: boolean;
  hasActive: boolean;
  onHover: (index: number) => void;
}>(function ProjectRow({ product, index, isActive, hasActive, onHover }, ref) {
  const color = DOMAINS[product.domain].color;
  const nameRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isActive && nameRef.current) {
      gsap.to(nameRef.current, { duration: 0.4, color, ease: "power2.out" });
    } else if (nameRef.current) {
      gsap.to(nameRef.current, { duration: 0.2, color: "#0F172A", ease: "power2.out" });
    }
  }, [isActive, color]);

  const topStack = product.techStack[0]?.items.slice(0, 2).join(", ") || "";

  return (
    <li
      ref={ref}
      className={`grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr_1fr_80px] gap-2 md:gap-4 px-4 py-4 cursor-pointer transition-all duration-300 rounded-lg ${
        isActive ? "bg-white/90 shadow-sm scale-[1.01]" : hasActive ? "opacity-35" : ""
      } hover:bg-white/60`}
      onMouseEnter={() => onHover(index)}
    >
      <span ref={nameRef} className="text-[14px] font-heading font-bold text-[#0F172A] truncate">
        {product.name}
      </span>
      <span className="text-[13px] text-[#64748B] truncate">{product.tagline}</span>
      <span className="hidden md:flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
        <span className="text-[12px] text-[#94A3B8] font-medium truncate">{DOMAINS[product.domain].label}</span>
      </span>
      <span className="hidden md:block text-[11px] font-mono text-[#94A3B8] truncate">{topStack}</span>
      <div className="hidden md:flex items-center justify-end gap-2">
        <span className="text-[12px] font-mono text-[#94A3B8]">{product.year}</span>
        {product.github && (
          <a href={product.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
            className="text-[#94A3B8] hover:text-[#3B82F6] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5" />
            </svg>
          </a>
        )}
      </div>
    </li>
  );
});
