"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { NAME, ROLE_TITLE } from "@/lib/data";
import { useStore } from "@/lib/store";

/**
 * On-demand lock screen. Not an entry gate — it only appears when the user
 * clicks the SwaroopOS wordmark. Any interaction (click, key, scroll) unlocks.
 */
export default function LockScreen() {
  const unlock = useStore((s) => s.unlock);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }));
      setDate(now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const doUnlock = useCallback(() => unlock(), [unlock]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      e.preventDefault();
      doUnlock();
    };
    const onWheel = () => doUnlock();
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchmove", onWheel, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onWheel);
    };
  }, [doUnlock]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ y: "-100%", opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      className="fixed inset-0 z-[95] cursor-pointer select-none flex flex-col"
      onClick={doUnlock}
      role="button"
      tabIndex={0}
      aria-label="Locked. Activate to unlock."
    >
      {/* Starfield backdrop, dimmed to read as 'locked' */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/wallpapers/deep-blue.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />

      {/* Clock */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center pt-[8vh]">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-white/70 text-[15px] font-medium tracking-[0.02em] mb-1"
        >
          {date}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="text-white font-heading font-light tracking-[-0.03em] leading-none"
          style={{ fontSize: "clamp(64px, 11vw, 128px)" }}
        >
          {time}
        </motion.h1>
      </div>

      {/* Identity + unlock hint */}
      <div className="relative z-10 pb-[10vh] flex flex-col items-center gap-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="text-center"
        >
          <p className="text-white text-[18px] font-heading font-semibold tracking-[-0.01em]">{NAME}</p>
          <p className="text-white/50 text-[12.5px] font-mono mt-1 uppercase tracking-[0.14em]">{ROLE_TITLE}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col items-center gap-2"
        >
          <motion.svg
            width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          >
            <polyline points="18 15 12 9 6 15" />
          </motion.svg>
          <span className="text-white/45 text-[12px] font-medium">Click, press any key, or scroll to unlock</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
