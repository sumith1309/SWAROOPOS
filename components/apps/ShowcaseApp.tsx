"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { FEATURED_PRODUCTS, DOMAINS } from "@/lib/data";

const CARD_IMAGES = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80",
  "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=600&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
];

export default function ShowcaseApp() {
  const [active, setActive] = React.useState(0);
  const [hovering, setHovering] = React.useState(false);
  const len = FEATURED_PRODUCTS.length;

  const prev = () => setActive((a) => (a - 1 + len) % len);
  const next = () => setActive((a) => (a + 1) % len);

  // Auto-advance
  React.useEffect(() => {
    if (hovering) return;
    const id = setInterval(next, 3000);
    return () => clearInterval(id);
  }, [hovering, active]);

  return (
    <div className="p-4 bg-[#0A0A0F] min-h-[450px] text-white" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
      <h3 className="text-[14px] font-heading font-bold text-white/90 mb-2 px-1">Project Showcase</h3>
      <p className="text-[12px] text-white/40 mb-6 px-1">Featured AI products</p>

      {/* Card stack area */}
      <div className="relative h-[280px] flex items-center justify-center" style={{ perspective: "1100px" }}>
        {/* Background glow */}
        <div className="absolute inset-x-0 top-4 mx-auto h-40 w-[60%] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 mx-auto h-32 w-[70%] rounded-full bg-black/30 blur-3xl" />

        <AnimatePresence initial={false}>
          {FEATURED_PRODUCTS.map((product, i) => {
            const off = ((i - active + len) % len) - Math.floor(len / 2);
            const abs = Math.abs(off);
            if (abs > 2) return null;

            const isActive = off === 0;
            const x = off * 160;
            const z = -abs * 120;
            const rotateZ = off * 8;
            const scale = isActive ? 1.02 : 0.88;
            const zIndex = 10 - abs;

            return (
              <motion.div
                key={product.id}
                className="absolute rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
                style={{
                  width: 340,
                  height: 220,
                  zIndex,
                  transformStyle: "preserve-3d",
                  border: `3px solid ${isActive ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.05)"}`,
                }}
                animate={{ x, rotateZ, scale, opacity: 1 }}
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
                onClick={() => setActive(i)}
              >
                <div style={{ transform: `translateZ(${z}px)` }} className="h-full w-full">
                  <img src={CARD_IMAGES[i] || CARD_IMAGES[0]} alt={product.name} className="h-full w-full object-cover" draggable={false} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="text-[16px] font-bold text-white">{product.name}</div>
                    {product.tagline && <div className="text-[11px] text-white/60 mt-0.5 line-clamp-1">{product.tagline}</div>}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Controls + dots */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button onClick={prev} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition cursor-pointer">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex gap-2">
          {FEATURED_PRODUCTS.map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`w-2 h-2 rounded-full transition cursor-pointer ${i === active ? "bg-white" : "bg-white/30 hover:bg-white/50"}`}
            />
          ))}
        </div>
        <button onClick={next} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition cursor-pointer">
          <ChevronRight className="w-4 h-4" />
        </button>

        {FEATURED_PRODUCTS[active]?.github && (
          <a href={FEATURED_PRODUCTS[active].github} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition">
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>

      {/* Active product info */}
      <div className="mt-4 text-center">
        <p className="text-[13px] text-white/50">{DOMAINS[FEATURED_PRODUCTS[active].domain].label} · {FEATURED_PRODUCTS[active].year}</p>
      </div>
    </div>
  );
}
