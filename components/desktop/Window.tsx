"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useStore, type AppId } from "@/lib/store";

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

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <motion.div
      initial={{ scale: isMobile ? 1 : 0.95, opacity: 0, y: isMobile ? "100%" : 0 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: isMobile ? 1 : 0.95, opacity: 0, y: isMobile ? "100%" : 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      drag={!isMobile}
      dragMomentum={false}
      dragConstraints={{ top: -position.y + 40, left: -position.x, right: typeof window !== "undefined" ? window.innerWidth - position.x - 360 : 400, bottom: typeof window !== "undefined" ? window.innerHeight - position.y - 100 : 400 }}
      dragElastic={0}
      onPointerDown={() => focusWindow(id)}
      className={isMobile ? "fixed inset-0 z-50" : "fixed"}
      style={isMobile ? { zIndex } : { top: position.y, left: position.x, zIndex, width: "clamp(360px, 55vw, 800px)", maxHeight: "calc(100vh - 120px)" }}
    >
      <div data-window className={`overflow-hidden flex flex-col h-full ${isMobile ? "" : "rounded-[16px]"}`}
        style={{
          background: "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(20px)",
          border: isMobile ? "none" : "1px solid rgba(0,0,0,0.06)",
          boxShadow: isMobile ? "none" : "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
        }}>
        {/* Title bar */}
        <div className="h-10 flex items-center px-3 gap-2 shrink-0 select-none border-b border-[rgba(0,0,0,0.06)]" style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(16px)" }}>
          {isMobile ? (
            <button onClick={() => closeWindow(id)} className="text-[13px] text-[#3B82F6] cursor-pointer flex items-center gap-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>Back
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              <button onClick={() => closeWindow(id)} className="w-3 h-3 rounded-full bg-[#FF5F57] hover:brightness-110 transition-all cursor-pointer" />
              <button onClick={() => minimizeWindow(id)} className="w-3 h-3 rounded-full bg-[#FEBC2E] hover:brightness-110 transition-all cursor-pointer" />
              <button className="w-3 h-3 rounded-full bg-[#28C840] hover:brightness-110 transition-all cursor-pointer" />
            </div>
          )}
          <div className="flex-1 text-center"><span className="text-[13px] font-medium text-[#64748B]">{title}</span></div>
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
        </div>
        {/* Body */}
        <div className="flex-1 overflow-y-auto" style={{ maxHeight: isMobile ? "calc(100vh - 40px)" : "calc(100vh - 160px)" }}>
          {children}
        </div>
      </div>
    </motion.div>
  );
}
