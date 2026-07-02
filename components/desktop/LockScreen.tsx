"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useMotionValue, animate, useReducedMotion, type PanInfo } from "framer-motion";
import { NAME, ROLE_TITLE } from "@/lib/data";
import { useStore, WALLPAPERS } from "@/lib/store";

const EASE = [0.32, 0.72, 0, 1] as const;

/**
 * The "entering SwaroopOS" moment. Shown on entry to "/" and again on demand
 * when the SwaroopOS wordmark is clicked. Swipe up (or click / press a key)
 * to slide it away and reveal the desktop. Keyboard and reduced-motion users
 * unlock without needing the gesture; deep-link routes are never gated.
 */
export default function LockScreen() {
  const unlock = useStore((s) => s.unlock);
  const wallpaperId = useStore((s) => s.wallpaperId);
  const reduce = useReducedMotion();

  // Mirror the desktop's current wallpaper (session-only choice; a refresh
  // resets the store to the default Deep Blue starfield).
  const wallpaper = WALLPAPERS.find((w) => w.id === wallpaperId) || WALLPAPERS.find((w) => w.id === "deep-blue")!;
  const wallpaperStyle =
    wallpaper.type === "css"
      ? { background: wallpaper.value }
      : { backgroundImage: `url(${wallpaper.value})`, backgroundSize: "cover", backgroundPosition: "center" };
  const y = useMotionValue(0);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const leaving = useRef(false);

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

  // Slide the whole screen up, then unmount. Reduced motion unlocks instantly.
  const dismiss = useCallback(() => {
    if (leaving.current) return;
    leaving.current = true;
    if (reduce) {
      unlock();
      return;
    }
    const h = typeof window !== "undefined" ? window.innerHeight : 900;
    const controls = animate(y, -h, { duration: 0.5, ease: EASE });
    controls.then(() => unlock());
  }, [reduce, unlock, y]);

  // Keyboard + wheel/trackpad unlock (accessibility and non-touch devices).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["Enter", " ", "Spacebar", "ArrowUp", "Escape"].includes(e.key)) {
        e.preventDefault();
        dismiss();
      }
    };
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY < -8 || e.deltaY > 8) dismiss();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
    };
  }, [dismiss]);

  const onDragEnd = (_e: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    if (leaving.current) return;
    // Past a third of the way up, or a firm upward flick → unlock.
    if (info.offset.y < -110 || info.velocity.y < -400) {
      dismiss();
    } else {
      animate(y, 0, { type: "spring", stiffness: 500, damping: 42 });
    }
  };

  return (
    <motion.div
      style={{ y }}
      drag={reduce ? false : "y"}
      dragConstraints={{ top: -2000, bottom: 0 }}
      dragElastic={{ top: 0.7, bottom: 0 }}
      dragMomentum={false}
      onDragEnd={onDragEnd}
      onTap={dismiss}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="fixed inset-0 z-[95] cursor-grab active:cursor-grabbing select-none flex flex-col touch-none"
      role="button"
      tabIndex={0}
      aria-label="Locked. Swipe up, click, or press Enter to enter."
    >
      {/* Current wallpaper as backdrop, dimmed to read as 'locked' */}
      <div className="absolute inset-0" style={wallpaperStyle} />
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

      {/* Identity + swipe-up affordance */}
      <div className="relative z-10 pb-[9vh] flex flex-col items-center gap-6">
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
          className="flex flex-col items-center gap-2.5"
        >
          {/* Grabber pill */}
          <div className="w-10 h-1 rounded-full bg-white/30" aria-hidden />
          <motion.svg
            width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            animate={reduce ? undefined : { y: [0, -7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          >
            <polyline points="18 15 12 9 6 15" />
          </motion.svg>
          <span className="text-white/55 text-[12.5px] font-medium tracking-[0.02em]">Swipe up to enter</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
