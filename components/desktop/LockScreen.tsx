"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface LockScreenProps {
  onUnlock: () => void;
}

const BG_IMAGE = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&q=85";

export default function LockScreen({ onUnlock }: LockScreenProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);

  const handleProgress = useCallback((delta: number) => {
    if (unlocked) return;
    const newProgress = Math.min(Math.max(scrollProgress + delta, 0), 1);
    setScrollProgress(newProgress);
    if (newProgress >= 1) {
      setUnlocked(true);
      setTimeout(onUnlock, 500);
    }
  }, [scrollProgress, unlocked, onUnlock]);

  useEffect(() => {
    if (unlocked) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      handleProgress(e.deltaY * 0.003);
    };
    const handleTouchStart = (e: TouchEvent) => setTouchStartY(e.touches[0].clientY);
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const delta = touchStartY - e.touches[0].clientY;
      handleProgress(delta * 0.008);
      setTouchStartY(e.touches[0].clientY);
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [scrollProgress, unlocked, touchStartY, handleProgress]);

  const translateY = -scrollProgress * 100;

  return (
    <motion.div
      className="fixed inset-0 z-[80]"
      style={{ transform: `translateY(${translateY}vh)` }}
      animate={unlocked ? { y: "-100vh" } : {}}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Nature background — full screen */}
      <div className="absolute inset-0">
        <Image
          src={BG_IMAGE}
          alt="Background"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/15" />
      </div>

      {/* Glass welcome card — center */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 150 }}
          className="px-14 py-12 rounded-[32px] flex flex-col items-center text-center"
          style={{
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(40px) saturate(1.6)",
            WebkitBackdropFilter: "blur(40px) saturate(1.6)",
            border: "1px solid rgba(255,255,255,0.25)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3)",
          }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
            className="mb-6"
          >
            <img src="/logo.png" alt="SwaroopOS" className="w-20 h-20 object-contain drop-shadow-lg" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-[14px] text-white/50 font-light tracking-[0.25em] uppercase mb-3"
          >
            Welcome to
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-[46px] md:text-[56px] font-heading font-semibold text-white tracking-[-0.02em] leading-none mb-4"
          >
            Swaroop<span className="font-light">OS</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="w-10 h-[1px] mb-4"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }}
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="text-[12px] text-white/35 tracking-[0.15em] uppercase font-light"
          >
            AI Product Manager & Builder
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-[6vh] left-0 right-0 z-20 flex flex-col items-center gap-2"
        style={{ opacity: 1 - scrollProgress * 4 }}
      >
        <motion.svg
          width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
        <span className="text-[12px] text-white/40 font-medium">Scroll to enter</span>
      </motion.div>
    </motion.div>
  );
}
