"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useStore, type AppId } from "@/lib/store";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface WindowProps {
  id: AppId;
  title: string;
  accentColor: string;
  zIndex: number;
  position: { x: number; y: number };
  children: React.ReactNode;
}

export default function Window({ id, title, accentColor, zIndex, position, children }: WindowProps) {
  const closeWindow = useStore((s) => s.closeWindow);
  const minimizeWindow = useStore((s) => s.minimizeWindow);
  const focusWindow = useStore((s) => s.focusWindow);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Dialog focus management: move focus into the window on open and hand it
  // back to whatever opened it (dock icon, CTA) on close.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    containerRef.current?.focus();
    return () => opener?.focus?.();
  }, []);

  // Trap Tab inside the window while focus is within it (Escape still closes).
  const trapTab = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab") return;
    const root = containerRef.current;
    if (!root) return;
    const focusables = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === root)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  // Escape closes the topmost open window.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const state = useStore.getState();
      const open = Object.values(state.windows).filter((w) => w.isOpen && !w.isMinimized);
      if (open.length === 0) return;
      const top = open.reduce((a, b) => (a.zIndex > b.zIndex ? a : b));
      if (top.id === id) closeWindow(id);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [id, closeWindow]);

  return (
    <motion.div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      tabIndex={-1}
      onKeyDown={trapTab}
      initial={{ scale: isMobile ? 1 : 0.95, opacity: 0, y: isMobile ? "100%" : 0 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: isMobile ? 1 : 0.95, opacity: 0, y: isMobile ? "100%" : 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      drag={!isMobile}
      dragMomentum={false}
      dragConstraints={{ top: -position.y + 40, left: -position.x, right: typeof window !== "undefined" ? window.innerWidth - position.x - 360 : 400, bottom: typeof window !== "undefined" ? window.innerHeight - position.y - 100 : 400 }}
      dragElastic={0}
      onPointerDown={() => focusWindow(id)}
      className={isMobile ? "fixed inset-0 top-10 z-50" : "fixed"}
      style={isMobile ? { zIndex } : { top: position.y, left: position.x, zIndex, width: "clamp(360px, 55vw, 800px)", maxHeight: "calc(100vh - 120px)" }}
    >
      <div data-window className={`overflow-hidden flex flex-col h-full ${isMobile ? "" : "rounded-[16px]"}`}
        style={{
          background: "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(20px)",
          border: isMobile ? "none" : "1px solid rgba(0,0,0,0.06)",
          boxShadow: isMobile ? "none" : "var(--elev-3)",
        }}>
        {/* Title bar */}
        <div className={`${isMobile ? "h-12" : "h-10"} flex items-center px-3 gap-2 shrink-0 select-none border-b border-[rgba(0,0,0,0.06)]`} style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(16px)" }}>
          {isMobile ? (
            <button onClick={() => closeWindow(id)} className="text-[14px] text-[#3B82F6] font-semibold cursor-pointer flex items-center gap-1 active:opacity-60 transition-opacity py-1 px-1">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>Home
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              <button onClick={() => closeWindow(id)} aria-label={`Close ${title}`} className="w-3 h-3 rounded-full bg-[#FF5F57] hover:brightness-110 transition-all cursor-pointer" />
              <button onClick={() => minimizeWindow(id)} aria-label={`Minimize ${title}`} className="w-3 h-3 rounded-full bg-[#FEBC2E] hover:brightness-110 transition-all cursor-pointer" />
              <span aria-hidden className="w-3 h-3 rounded-full bg-[#28C840]" />
            </div>
          )}
          <div className="flex-1 text-center"><span className="text-[13px] font-medium text-[#64748B]">{title}</span></div>
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
        </div>
        {/* Body */}
        <div className="flex-1 overflow-y-auto" style={{ maxHeight: isMobile ? "calc(100vh - 88px)" : "calc(100vh - 160px)" }}>
          {children}
        </div>
      </div>
    </motion.div>
  );
}
