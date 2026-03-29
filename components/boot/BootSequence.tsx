"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/lib/store";
import { BOOT_LINES } from "@/lib/data";
import BootLine from "./BootLine";

export default function BootSequence() {
  const setBootComplete = (_v: boolean) => {}; // Boot no longer used
  const [currentLine, setCurrentLine] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const [progress, setProgress] = useState(0);
  const [flash, setFlash] = useState(false);
  const hasTriggeredTransition = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSkip(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const duration = 8000;
    const interval = 50;
    const step = (interval / duration) * 100;
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(timer); return 100; }
        return Math.min(p + step, 100);
      });
    }, interval);
    return () => clearInterval(timer);
  }, []);

  const triggerTransition = useCallback(() => {
    if (hasTriggeredTransition.current) return;
    hasTriggeredTransition.current = true;
    setFlash(true);
    setTimeout(() => {
      setTransitioning(true);
      setTimeout(() => setBootComplete(true), 700);
    }, 150);
  }, [setBootComplete]);

  const handleLineComplete = useCallback(() => {
    setCurrentLine((prev) => {
      const next = prev + 1;
      if (next >= BOOT_LINES.length) {
        setTimeout(() => triggerTransition(), 1500);
      }
      return next;
    });
  }, [triggerTransition]);

  const handleSkip = useCallback(() => {
    triggerTransition();
  }, [triggerTransition]);

  useEffect(() => {
    const handler = (e: KeyboardEvent | MouseEvent) => {
      if (e.target instanceof HTMLButtonElement) return;
      if (showSkip) handleSkip();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [showSkip, handleSkip]);

  const getLineDelay = (index: number) => {
    let delay = 800;
    for (let i = 0; i < index; i++) {
      delay += BOOT_LINES[i].length * 30 + 200;
    }
    return delay;
  };

  const isHighlight = (text: string) =>
    text.includes("20+") || text.includes("System ready") || text.includes("Welcome");

  return (
    <AnimatePresence>
      {!transitioning ? (
        <motion.div
          className="fixed inset-0 bg-[#050508] z-50 flex flex-col crt-flicker"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Grid background */}
          <div className="absolute inset-0 grid-bg grid-fade pointer-events-none opacity-60" />

          {/* Aurora glow in boot */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute w-[150%] h-[200px] rounded-full"
              style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.2), rgba(139,92,246,0.15), transparent)", top: "20%", left: "-25%", filter: "blur(60px)" }}
              animate={{ x: ["-25%", "25%", "-25%"] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* CRT scanlines */}
          <div className="crt-overlay" />

          {/* Vignette */}
          <div className="absolute inset-0 pointer-events-none z-20" style={{
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)"
          }} />

          {/* Meteors */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="meteor" style={{
              top: `${Math.random() * 50}%`,
              left: `${50 + Math.random() * 50}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }} />
          ))}

          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="particle" style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${6 + Math.random() * 6}s`,
                width: `${2 + Math.random() * 2}px`,
                height: `${2 + Math.random() * 2}px`,
                background: ["#3B82F6", "#8B5CF6", "#10B981"][i % 3],
              }} />
            ))}
          </div>

          {/* Terminal content */}
          <div className="flex-1 p-6 md:p-16 overflow-hidden flex flex-col justify-center max-w-3xl relative z-30 phosphor-glow">
            {/* Terminal chrome */}
            <div className="mb-3 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
              <span className="ml-2 text-[11px] font-mono text-[#71717A]">swaroopOS — boot</span>
            </div>

            <div className="border border-[rgba(255,255,255,0.06)] rounded-lg p-4 bg-[rgba(0,0,0,0.3)] backdrop-blur-sm">
              {BOOT_LINES.map((line, i) =>
                i <= currentLine ? (
                  <BootLine
                    key={i}
                    text={line}
                    delay={i === currentLine ? getLineDelay(i) : 0}
                    onComplete={i === currentLine ? handleLineComplete : undefined}
                    isHighlight={isHighlight(line)}
                  />
                ) : null
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-16 left-6 right-6 md:left-16 md:right-16 z-30">
            <div className="h-[2px] bg-[#1a1a2e] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #3B82F6, #8B5CF6, #3B82F6)",
                  backgroundSize: "200% 100%",
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "200% 0%"],
                  boxShadow: [
                    "0 0 10px rgba(59,130,246,0.4), 0 0 30px rgba(59,130,246,0.2)",
                    "0 0 20px rgba(139,92,246,0.6), 0 0 50px rgba(139,92,246,0.3)",
                    "0 0 10px rgba(59,130,246,0.4), 0 0 30px rgba(59,130,246,0.2)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] font-mono text-[#71717A]">BOOTING</span>
              <span className="text-[10px] font-mono text-[#3B82F6]">{Math.round(progress)}%</span>
            </div>
          </div>

          {/* Skip */}
          <AnimatePresence>
            {showSkip && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleSkip}
                className="absolute bottom-8 right-6 md:right-16 text-[#71717A] text-xs hover:text-[#A1A1AA] transition-colors cursor-pointer z-30 flex items-center gap-1"
              >
                Skip
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Flash */}
          <AnimatePresence>
            {flash && (
              <motion.div
                className="fixed inset-0 bg-white z-[60]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        <>
          <motion.div className="fixed top-0 left-0 right-0 h-1/2 bg-[#050508] z-50"
            initial={{ y: 0 }} animate={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} />
          <motion.div className="fixed bottom-0 left-0 right-0 h-1/2 bg-[#050508] z-50"
            initial={{ y: 0 }} animate={{ y: "100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} />
        </>
      )}
    </AnimatePresence>
  );
}
