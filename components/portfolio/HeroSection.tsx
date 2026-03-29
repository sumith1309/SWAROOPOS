"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const STATS = [
  { value: "20+", label: "Products Built", color: "#3B82F6" },
  { value: "5", label: "Industries", color: "#8B5CF6" },
  { value: "97%", label: "Best Accuracy", color: "#10B981" },
  { value: "380M", label: "Lives Targeted", color: "#F59E0B" },
];

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.95]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 gradient-mesh-hero" />

      {/* Floating orbs */}
      <motion.div
        className="orb w-[500px] h-[500px] opacity-[0.15]"
        style={{ background: "#6366F1", top: "10%", left: "15%", y }}
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="orb w-[400px] h-[400px] opacity-[0.12]"
        style={{ background: "#3B82F6", top: "50%", right: "10%", y }}
        animate={{ x: [0, -15, 0], y: [0, 20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="orb w-[300px] h-[300px] opacity-[0.08]"
        style={{ background: "#10B981", bottom: "10%", left: "40%", y }}
        animate={{ x: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <motion.div style={{ opacity, scale }} className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[rgba(0,0,0,0.06)] shadow-sm mb-10"
        >
          <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse-soft" />
          <span className="text-[13px] font-medium text-[#64748B]">Available for opportunities · Dubai, UAE</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(52px,11vw,130px)] font-heading font-bold leading-[0.9] tracking-[-0.04em] mb-6"
        >
          <span className="text-[#0F172A]">S. Jyothi</span>
          <br />
          <span className="text-gradient-premium">Swaroop</span>
        </motion.h1>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-[clamp(18px,3vw,26px)] text-[#64748B] font-light mb-4"
        >
          AI Product Manager & Full-Stack Builder
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-[16px] text-[#94A3B8] max-w-xl mx-auto leading-relaxed mb-14"
        >
          From construction sites to AI labs — building intelligent systems
          that serve millions across 5 industries. COO & Co-Founder at CogniSpace.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-wrap justify-center gap-10 md:gap-16 mb-14"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 + i * 0.1, type: "spring" }}
              className="text-center"
            >
              <div className="text-[42px] md:text-[56px] font-heading font-bold stat-value" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-[11px] text-[#94A3B8] uppercase tracking-[0.12em] mt-1 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a
            href="#products"
            onClick={(e) => { e.preventDefault(); document.getElementById("products")?.scrollIntoView({ behavior: "smooth" }); }}
            className="px-8 py-3.5 rounded-full text-[15px] font-semibold text-white cursor-pointer transition-all hover:scale-105 hover:shadow-xl"
            style={{
              background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
              boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)",
            }}
          >
            Explore My Work
          </a>
          <a
            href="https://github.com/sumith1309"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-full text-[15px] font-semibold text-[#475569] cursor-pointer transition-all border border-[rgba(0,0,0,0.1)] hover:border-[rgba(0,0,0,0.2)] hover:bg-white hover:shadow-lg hover:scale-105"
          >
            View GitHub →
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[11px] text-[#94A3B8] font-medium tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-[rgba(0,0,0,0.1)] flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-[#3B82F6]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
