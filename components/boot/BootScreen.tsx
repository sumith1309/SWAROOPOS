"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BootScreenProps {
  onComplete: () => void;
}

const BOOT_SEEN_KEY = "swos:v3:booted";

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [phase, setPhase] = useState<"cube" | "branding" | "done">("cube");

  // Returning visitors and reduced-motion users skip the boot entirely.
  useEffect(() => {
    const t = setTimeout(() => {
      let skip = false;
      try {
        skip =
          localStorage.getItem(BOOT_SEEN_KEY) === "1" ||
          window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      } catch {
        // storage unavailable — run the boot normally
      }
      if (skip) {
        setPhase("done");
        onComplete();
      }
    }, 0);
    return () => clearTimeout(t);
  }, [onComplete]);

  useEffect(() => {
    if (phase === "done") return;
    const t1 = setTimeout(() => setPhase("branding"), 1200);
    const t2 = setTimeout(() => setPhase("done"), 3000);
    const t3 = setTimeout(() => onComplete(), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [phase, onComplete]);

  // Skippable on any input; remember the visit.
  useEffect(() => {
    try {
      localStorage.setItem(BOOT_SEEN_KEY, "1");
    } catch {
      // ignore
    }
    if (phase === "done") return;
    const skip = () => {
      setPhase("done");
      onComplete();
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" ? (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F8FAFC]"
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6 }}
        >
          {/* 3D Cube */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="perspective-container"
          >
            <div className="relative w-24 h-24 flex items-center justify-center preserve-3d">
              {/* Spinning cube */}
              <div className="relative w-full h-full preserve-3d animate-cube-spin">
                {/* Core glow */}
                <div className="absolute inset-0 m-auto w-8 h-8 bg-white rounded-full blur-md animate-pulse-core"
                  style={{ boxShadow: "0 0 40px rgba(255,255,255,0.8)" }} />

                {/* Machined ink-on-paper faces — engineering lab, not neon */}
                <div className="side-wrapper front">
                  <div className="face" style={{ border: "1.5px solid rgba(15,23,42,0.22)", background: "rgba(15,23,42,0.03)", boxShadow: "0 2px 12px rgba(15,23,42,0.06)" }} />
                </div>
                <div className="side-wrapper back">
                  <div className="face" style={{ border: "1.5px solid rgba(15,23,42,0.22)", background: "rgba(15,23,42,0.03)", boxShadow: "0 2px 12px rgba(15,23,42,0.06)" }} />
                </div>
                <div className="side-wrapper right">
                  <div className="face" style={{ border: "1.5px solid rgba(15,23,42,0.16)", background: "rgba(15,23,42,0.02)", boxShadow: "0 2px 12px rgba(15,23,42,0.05)" }} />
                </div>
                <div className="side-wrapper left">
                  <div className="face" style={{ border: "1.5px solid rgba(15,23,42,0.16)", background: "rgba(15,23,42,0.02)", boxShadow: "0 2px 12px rgba(15,23,42,0.05)" }} />
                </div>
                <div className="side-wrapper top">
                  <div className="face" style={{ border: "1.5px solid rgba(30,64,175,0.3)", background: "rgba(30,64,175,0.04)", boxShadow: "0 2px 12px rgba(30,64,175,0.08)" }} />
                </div>
                <div className="side-wrapper bottom">
                  <div className="face" style={{ border: "1.5px solid rgba(30,64,175,0.3)", background: "rgba(30,64,175,0.04)", boxShadow: "0 2px 12px rgba(30,64,175,0.08)" }} />
                </div>
              </div>

              {/* Floor shadow */}
              <div className="absolute -bottom-16 w-24 h-6 rounded-[100%] animate-shadow-breathe" style={{ background: "rgba(0,0,0,0.08)", filter: "blur(12px)" }} />
            </div>
          </motion.div>

          {/* Loading text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col items-center gap-1.5 mt-14"
          >
            <AnimatePresence mode="wait">
              {phase === "cube" ? (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                  <h3 className="text-[12px] font-semibold tracking-[0.3em] uppercase" style={{ color: "#1e40af" }}>
                    Loading
                  </h3>
                  <p className="text-[12px] text-[#94A3B8] mt-1">Click anywhere to skip</p>
                </motion.div>
              ) : (
                <motion.div key="brand" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                  <h1 className="text-[28px] font-heading font-bold text-[#0F172A] tracking-[-0.02em]">SwaroopOS</h1>
                  <p className="text-[13px] text-[#94A3B8] mt-1">S. Jyothi Swaroop · Builder of Production Systems</p>
                  {/* Progress bar */}
                  <div className="mt-4 w-[200px] mx-auto">
                    <div className="h-[3px] rounded-full bg-[#E2E8F0] overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: "#1e40af" }}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.6, ease: [0.32, 0.72, 0, 1] }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* CSS for 3D cube */}
          <style jsx>{`
            .perspective-container { perspective: 1200px; }
            .preserve-3d { transform-style: preserve-3d; }

            @keyframes cubeSpin {
              0% { transform: rotateX(0deg) rotateY(0deg); }
              100% { transform: rotateX(360deg) rotateY(360deg); }
            }

            @keyframes breathe {
              0%, 100% { transform: translateZ(48px); opacity: 0.7; }
              50% { transform: translateZ(72px); opacity: 0.3; border-color: rgba(255,255,255,0.6); }
            }

            @keyframes pulseCore {
              0%, 100% { transform: scale(0.8); opacity: 0.4; }
              50% { transform: scale(1.3); opacity: 1; }
            }

            @keyframes shadowBreathe {
              0%, 100% { transform: scale(1); opacity: 0.3; }
              50% { transform: scale(1.5); opacity: 0.1; }
            }

            .animate-cube-spin { animation: cubeSpin 8s linear infinite; }
            .animate-pulse-core { animation: pulseCore 2s ease-in-out infinite; }
            .animate-shadow-breathe { animation: shadowBreathe 3s ease-in-out infinite; }

            .side-wrapper {
              position: absolute;
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              transform-style: preserve-3d;
            }

            .face {
              width: 100%;
              height: 100%;
              position: absolute;
              animation: breathe 3s ease-in-out infinite;
              backdrop-filter: blur(2px);
              border-radius: 4px;
            }

            .front  { transform: rotateY(0deg); }
            .back   { transform: rotateY(180deg); }
            .right  { transform: rotateY(90deg); }
            .left   { transform: rotateY(-90deg); }
            .top    { transform: rotateX(90deg); }
            .bottom { transform: rotateX(-90deg); }
          `}</style>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
