"use client";

import { useState } from "react";
import { FEATURED_PRODUCTS, DOMAINS } from "@/lib/data";

// Map each product to an Unsplash image representing its domain
const PRODUCT_IMAGES = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80", // ALIA - AI/learning
  "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=400&q=80", // Sahara Sense - dust storm
  "https://images.unsplash.com/photo-1561484930-998b6a7b22e8?w=400&q=80",    // Garmi Mitra - heatwave
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80",  // CogniSpace - tech globe
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80",  // Health Prediction - medical
];

export default function GalleryApp() {
  const [expandedIndex, setExpandedIndex] = useState(1);

  return (
    <div className="p-4 bg-[#F5F5F3] min-h-[400px]">
      <h3 className="text-[14px] font-heading font-bold text-[#0F172A] mb-4 px-1">Featured Projects</h3>

      <div className="flex items-center justify-center gap-1.5 h-[320px]">
        {FEATURED_PRODUCTS.map((product, idx) => {
          const isExpanded = idx === expandedIndex;
          const color = DOMAINS[product.domain].color;

          return (
            <div
              key={product.id}
              className="relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 ease-in-out h-full"
              style={{ width: isExpanded ? "18rem" : "3.5rem" }}
              onMouseEnter={() => setExpandedIndex(idx)}
            >
              {/* Background image */}
              <img
                src={PRODUCT_IMAGES[idx] || PRODUCT_IMAGES[0]}
                alt={product.name}
                className="w-full h-full object-cover"
                draggable={false}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Content (only visible when expanded) */}
              <div className={`absolute inset-0 flex flex-col justify-end p-5 transition-opacity duration-300 ${isExpanded ? "opacity-100" : "opacity-0"}`}>
                <div className="inline-flex items-center gap-1.5 mb-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">{DOMAINS[product.domain].label}</span>
                </div>
                <h4 className="text-[20px] font-heading font-bold text-white mb-1">{product.name}</h4>
                <p className="text-[12px] text-white/70 leading-relaxed line-clamp-2">{product.tagline}</p>

                {/* Metrics */}
                {product.metrics.length > 0 && (
                  <div className="flex gap-4 mt-3">
                    {product.metrics.slice(0, 2).map((m) => (
                      <div key={m.label}>
                        <div className="text-[18px] font-bold text-white">{m.value}</div>
                        <div className="text-[9px] text-white/50 uppercase tracking-wider">{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {product.github && (
                  <a href={product.github} target="_blank" rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-[11px] text-white/70 hover:text-white transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5" />
                    </svg>
                    View Source
                  </a>
                )}
              </div>

              {/* Collapsed label (vertical text) */}
              {!isExpanded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-[11px] font-bold writing-vertical whitespace-nowrap" style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>
                    {product.name}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-center text-[11px] text-[#94A3B8] mt-4">Hover over cards to explore projects</p>
    </div>
  );
}
