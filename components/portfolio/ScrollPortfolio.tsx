"use client";

import HeroSection from "./HeroSection";
import ProductsSection from "./ProductsSection";
import JourneySection from "./JourneySection";
import SkillsSection from "./SkillsSection";
import ContactSection from "./ContactSection";

export default function ScrollPortfolio() {
  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] relative">
      {/* Fixed nav */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 glass-light rounded-full px-6 py-2.5 flex items-center gap-6">
        <span className="font-heading font-bold text-[#0F172A] text-[15px] tracking-tight pr-2 border-r border-[rgba(0,0,0,0.08)]">
          S. Swaroop
        </span>
        {["Products", "Journey", "Skills", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-[13px] text-[#64748B] hover:text-[#0F172A] transition-colors font-medium hidden md:block"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {item}
          </a>
        ))}
        <a
          href="https://github.com/sumith1309"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F172A] text-white text-[12px] font-medium hover:bg-[#1E293B] transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" />
          </svg>
          GitHub
        </a>
      </nav>

      {/* Sections */}
      <HeroSection />
      <ProductsSection />
      <JourneySection />
      <SkillsSection />
      <ContactSection />
    </div>
  );
}
