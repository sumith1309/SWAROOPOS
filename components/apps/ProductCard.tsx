"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { type Product, DOMAINS } from "@/lib/data";

interface ProductCardProps {
  product: Product;
  onOpen: () => void;
}

export default function ProductCard({ product, onOpen }: ProductCardProps) {
  const color = DOMAINS[product.domain].color;
  const ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative rounded-[16px] cursor-pointer group transition-all duration-300 hover:-translate-y-1"
      onClick={onOpen}
      onMouseMove={handleMouse}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(12px)",
        border: `1px solid rgba(0, 0, 0, 0.05)`,
        boxShadow: hovered
          ? `0 4px 20px rgba(0,0,0,0.08), 0 0 0 1px ${color}15`
          : "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      {/* Left accent bar */}
      <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full" style={{ background: `linear-gradient(180deg, ${color}, ${color}60)` }} />

      {/* Spotlight on hover */}
      {hovered && (
        <div className="absolute pointer-events-none rounded-[16px] transition-opacity duration-300" style={{
          left: `${mousePos.x}%`, top: `${mousePos.y}%`,
          width: "200px", height: "200px", transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${color}06 0%, transparent 70%)`,
        }} />
      )}

      <div className="p-4 pl-5 relative">
        {/* Featured badge */}
        {product.featured && (
          <div className="absolute top-3 right-3">
            <span className="text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{ color, background: `${color}08`, border: `1px solid ${color}15` }}>
              Featured
            </span>
          </div>
        )}

        {/* Header */}
        <h3 className="text-[16px] font-heading font-bold text-[#0F172A] mb-1 group-hover:text-[#1E293B] transition-colors pr-16">
          {product.name}
        </h3>
        <p className="text-[12px] text-[#94A3B8] leading-relaxed mb-3">{product.tagline}</p>

        {/* Metrics */}
        {product.metrics.length > 0 && (
          <div className="flex flex-wrap gap-5 mb-3 py-2.5 border-y border-[rgba(0,0,0,0.04)]">
            {product.metrics.map((m) => (
              <div key={m.label}>
                <div className="text-[22px] font-heading font-bold leading-none" style={{ color }}>{m.value}</div>
                <div className="text-[9px] text-[#94A3B8] uppercase tracking-[0.1em] mt-0.5 font-semibold">{m.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Impact line */}
        {product.impact && (
          <p className="text-[11px] text-[#10B981] font-medium mb-3 line-clamp-1">
            ↗ {product.impact.split(".")[0]}
          </p>
        )}

        {/* Actions */}
        <div className="flex items-center gap-4 mb-2">
          <span className="text-[12px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color }}>
            Explore project →
          </span>
          {product.github && (
            <a href={product.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-[11px] text-[#94A3B8] hover:text-[#475569] transition-colors font-medium">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5" />
              </svg>
              Source
            </a>
          )}
        </div>

        {/* Tech pills (compact) */}
        <div className="flex flex-wrap gap-1">
          {product.techStack.flatMap((c) => c.items.slice(0, 4)).map((t) => (
            <span key={t} className="text-[9px] font-medium px-1.5 py-0.5 rounded-full"
              style={{ color: `${color}99`, background: `${color}04`, border: `1px solid ${color}08` }}>
              {t}
            </span>
          ))}
          {product.techStack.reduce((s, c) => s + c.items.length, 0) > 4 && (
            <span className="text-[9px] text-[#CBD5E1] self-center">
              +{product.techStack.reduce((s, c) => s + c.items.length, 0) - 4}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
