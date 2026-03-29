"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface LockScreenProps {
  onUnlock: () => void;
}

const BG_IMAGE = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&q=85";
const HERO_IMAGE = "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1280&q=85";

export default function LockScreen({ onUnlock }: LockScreenProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const lockRef = useRef<HTMLDivElement>(null);

  // Check mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Handle scroll/touch to expand
  const handleProgress = useCallback((delta: number) => {
    if (unlocked) return;
    const newProgress = Math.min(Math.max(scrollProgress + delta, 0), 1);
    setScrollProgress(newProgress);

    if (newProgress >= 1) {
      setUnlocked(true);
      setTimeout(onUnlock, 600);
    }
  }, [scrollProgress, unlocked, onUnlock]);

  useEffect(() => {
    if (unlocked) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      handleProgress(e.deltaY * 0.001);
    };

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const deltaY = touchStartY - e.touches[0].clientY;
      handleProgress(deltaY * 0.005);
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

  // Media dimensions — expand from card to fullscreen
  const mediaWidth = 320 + scrollProgress * (isMobile ? 600 : 1200);
  const mediaHeight = 420 + scrollProgress * (isMobile ? 200 : 500);
  const textOffset = scrollProgress * (isMobile ? 120 : 100);
  const overlayOpacity = 0.5 - scrollProgress * 0.3;
  const bgOpacity = 1 - scrollProgress;
  const borderRadius = 20 - scrollProgress * 20;

  return (
    <motion.div
      ref={lockRef}
      className="fixed inset-0 z-[80] overflow-hidden"
      animate={unlocked ? { opacity: 0, scale: 1.05 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background image — fades out as scroll progresses */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ opacity: bgOpacity }}
      >
        <Image
          src={BG_IMAGE}
          alt="Background"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      {/* Expanding media card */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div
          className="relative overflow-hidden"
          style={{
            width: `${mediaWidth}px`,
            height: `${mediaHeight}px`,
            maxWidth: "98vw",
            maxHeight: "95vh",
            borderRadius: `${borderRadius}px`,
            boxShadow: scrollProgress < 0.95
              ? "0 20px 60px rgba(0, 0, 0, 0.4)"
              : "none",
            transition: "box-shadow 0.3s",
          }}
        >
          <Image
            src={HERO_IMAGE}
            alt="SwaroopOS"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
            priority
          />
          {/* Dark overlay — fades as you scroll */}
          <div
            className="absolute inset-0"
            style={{
              background: `rgba(0,0,0,${overlayOpacity})`,
              borderRadius: `${borderRadius}px`,
            }}
          />
        </div>
      </div>

      {/* Text overlay — splits apart as user scrolls */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-white uppercase tracking-wider"
          style={{
            transform: `translateX(-${textOffset}vw)`,
            textShadow: "0 4px 20px rgba(0,0,0,0.4)",
            mixBlendMode: "difference",
          }}
        >
          Welcome to
        </motion.h1>
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-white uppercase tracking-wider"
          style={{
            transform: `translateX(${textOffset}vw)`,
            textShadow: "0 4px 20px rgba(0,0,0,0.4)",
            mixBlendMode: "difference",
          }}
        >
          SwaroopOS
        </motion.h1>
      </div>

      {/* Bottom hints — fade out as scroll progresses */}
      <motion.div
        className="absolute bottom-[8vh] left-0 right-0 z-20 flex flex-col items-center gap-2 pointer-events-none"
        style={{ opacity: 1 - scrollProgress * 3 }}
      >
        {/* Scroll indicator animation */}
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-1.5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-white/80"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        <p className="text-white/60 text-[13px] font-medium">
          Scroll to enter
        </p>
      </motion.div>
    </motion.div>
  );
}
