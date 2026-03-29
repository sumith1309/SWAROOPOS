"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore, WALLPAPERS } from "@/lib/store";

interface MenuItem {
  label: string;
  shortcut?: string;
  action?: () => void;
  divider?: boolean;
  disabled?: boolean;
}

export default function ContextMenu() {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const openWindow = useStore((s) => s.openWindow);
  const setWallpaper = useStore((s) => s.setWallpaper);
  const wallpaperId = useStore((s) => s.wallpaperId);

  const nextWallpaper = useCallback(() => {
    const idx = WALLPAPERS.findIndex((w) => w.id === wallpaperId);
    const next = WALLPAPERS[(idx + 1) % WALLPAPERS.length];
    setWallpaper(next.id);
  }, [wallpaperId, setWallpaper]);

  const items: MenuItem[] = [
    { label: "About SwaroopOS", action: () => openWindow("about") },
    { label: "divider", divider: true },
    { label: "Change Wallpaper", action: nextWallpaper },
    { label: "Open Settings", shortcut: "⌘ ,", action: () => openWindow("settings") },
    { label: "divider", divider: true },
    { label: "Open Terminal", shortcut: "⌘ T", action: () => openWindow("terminal") },
    { label: "Search", shortcut: "⌘ K", action: () => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
    }},
    { label: "divider", divider: true },
    { label: "View Source", action: () => window.open("https://github.com/sumith1309", "_blank") },
  ];

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      // Only show on desktop background, not on windows/dock
      const target = e.target as HTMLElement;
      if (target.closest("[data-window]") || target.closest("[data-dock]") || target.closest("[data-taskbar]")) return;

      e.preventDefault();
      const x = Math.min(e.clientX, window.innerWidth - 220);
      const y = Math.min(e.clientY, window.innerHeight - 300);
      setPosition({ x, y });
      setVisible(true);
    };

    window.addEventListener("contextmenu", handleContextMenu);
    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  // Close menu on any click — only when visible
  useEffect(() => {
    if (!visible) return;
    const handleClick = () => setVisible(false);
    // Use setTimeout so the click that might have opened it doesn't immediately close
    const timer = setTimeout(() => {
      window.addEventListener("click", handleClick);
    }, 10);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", handleClick);
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.12 }}
          className="fixed z-[85] w-[200px] rounded-xl overflow-hidden py-1"
          style={{
            left: position.x,
            top: position.y,
            background: "rgba(255,255,255,0.88)",
            backdropFilter: "blur(40px) saturate(1.8)",
            WebkitBackdropFilter: "blur(40px) saturate(1.8)",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          {items.map((item, i) =>
            item.divider ? (
              <div key={i} className="mx-2 my-1 h-px bg-[rgba(0,0,0,0.08)]" />
            ) : (
              <button
                key={item.label}
                onClick={() => {
                  item.action?.();
                  setVisible(false);
                }}
                disabled={item.disabled}
                className="w-full flex items-center justify-between px-3 py-1.5 text-left text-[13px] text-[#1C1C1E] hover:bg-[#3B82F6] hover:text-white rounded-md mx-0.5 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-default"
                style={{ width: "calc(100% - 4px)" }}
              >
                <span className="font-medium">{item.label}</span>
                {item.shortcut && (
                  <span className="text-[11px] text-[#8E8E93] ml-2">{item.shortcut}</span>
                )}
              </button>
            )
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
