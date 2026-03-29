"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { ALL_PRODUCTS, DOMAINS, type Product } from "@/lib/data";

// Unique image per project (keyed by product id)
const PROJECT_IMAGES: Record<string, string> = {
  // Featured
  "alia": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80",             // AI learning
  "sahara-sense": "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=600&q=80",      // dust storm clouds
  "garmi-mitra": "https://images.unsplash.com/photo-1561484930-998b6a7b22e8?w=600&q=80",          // heatwave sun
  "cognispace": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",        // tech globe
  // Additional
  "bsa": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80",                  // financial documents
  "nlp-classifier": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80",    // matrix code
  "trails-miles": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80",       // travel map
  "stationeryhub": "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&q=80",      // shop storefront
  "forecasting": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",           // analytics charts
  "ai-email": "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=600&q=80",           // email inbox
  "churn": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",              // dashboard screens
  "predictive-maintenance": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80", // industrial machinery
  "health": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80",             // medical stethoscope
  "inventory": "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&q=80",             // warehouse shelves
  "taskflow": "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&q=80",           // kanban board
  "housing": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",               // house keys
  "cost-estimator": "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",     // construction site
  "healthcare-analytics": "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=600&q=80", // hospital corridor
  "hubspot-integration": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",   // CRM team meeting
  "code-archaeologist": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",    // code on screen
};

export default function ShowcaseApp() {
  const [active, setActive] = React.useState(0);
  const [hovering, setHovering] = React.useState(false);
  const len = ALL_PRODUCTS.length;

  const prev = () => setActive((a) => (a - 1 + len) % len);
  const next = () => setActive((a) => (a + 1) % len);

  // Auto-advance
  React.useEffect(() => {
    if (hovering) return;
    const id = setInterval(next, 3000);
    return () => clearInterval(id);
  }, [hovering, active]);

  const getImage = (product: Product) => PROJECT_IMAGES[product.id] || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80";

  return (
    <div className="p-4 bg-[#0A0A0F] min-h-[450px] text-white" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
      <h3 className="text-[14px] font-heading font-bold text-white/90 mb-2 px-1">Project Showcase</h3>
      <p className="text-[12px] text-white/40 mb-6 px-1">All {ALL_PRODUCTS.length} AI products</p>

      {/* Card stack area */}
      <div className="relative h-[280px] flex items-center justify-center" style={{ perspective: "1100px" }}>
        {/* Background glow */}
        <div className="absolute inset-x-0 top-4 mx-auto h-40 w-[60%] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 mx-auto h-32 w-[70%] rounded-full bg-black/30 blur-3xl" />

        <AnimatePresence initial={false}>
          {ALL_PRODUCTS.map((product, i) => {
            const off = ((i - active + len) % len);
            // Normalize to range [-half, half]
            const half = Math.floor(len / 2);
            const normalizedOff = off > half ? off - len : off;
            const abs = Math.abs(normalizedOff);
            if (abs > 2) return null;

            const isActive = normalizedOff === 0;
            const x = normalizedOff * 160;
            const z = -abs * 120;
            const rotateZ = normalizedOff * 8;
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
                  <img src={getImage(product)} alt={product.name} className="h-full w-full object-cover" draggable={false} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-2">
                      <div className="text-[16px] font-bold text-white">{product.name}</div>
                      {product.featured && (
                        <span className="text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-white/20 text-white/80 font-bold">Featured</span>
                      )}
                    </div>
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
        <div className="flex gap-1.5 flex-wrap justify-center max-w-[200px]">
          {ALL_PRODUCTS.map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`w-1.5 h-1.5 rounded-full transition cursor-pointer ${i === active ? "bg-white scale-125" : "bg-white/30 hover:bg-white/50"}`}
            />
          ))}
        </div>
        <button onClick={next} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition cursor-pointer">
          <ChevronRight className="w-4 h-4" />
        </button>

        {ALL_PRODUCTS[active]?.github && (
          <a href={ALL_PRODUCTS[active].github} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition">
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>

      {/* Active product info */}
      <div className="mt-4 text-center">
        <p className="text-[13px] text-white/50">{DOMAINS[ALL_PRODUCTS[active].domain].label} · {ALL_PRODUCTS[active].year}</p>
        <p className="text-[11px] text-white/30 mt-1">{active + 1} / {ALL_PRODUCTS.length}</p>
      </div>
    </div>
  );
}
