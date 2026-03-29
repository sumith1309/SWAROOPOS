"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Notification {
  id: string;
  title: string;
  body: string;
  icon: string;
  timestamp: number;
}

const WELCOME_NOTIFICATIONS: Omit<Notification, "id" | "timestamp">[] = [
  {
    title: "SwaroopOS",
    body: "Welcome! Explore apps, use ⌘K to search, or right-click for options.",
    icon: "OS",
  },
  {
    title: "Portfolio",
    body: "20+ products shipped across 5 industries. Open Showcase to explore.",
    icon: "20+",
  },
];

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Stagger welcome notifications
    const timers = WELCOME_NOTIFICATIONS.map((n, i) =>
      setTimeout(() => {
        setNotifications((prev) => [
          ...prev,
          { ...n, id: `notif-${i}`, timestamp: Date.now() },
        ]);
      }, 2000 + i * 3000)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  // Auto-dismiss after 5 seconds
  useEffect(() => {
    if (notifications.length === 0) return;
    const timer = setTimeout(() => {
      setNotifications((prev) => prev.slice(1));
    }, 5000);
    return () => clearTimeout(timer);
  }, [notifications]);

  const dismiss = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="fixed top-12 right-4 z-[70] flex flex-col gap-2 w-[320px]">
      <AnimatePresence>
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, x: 320, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 320, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            onClick={() => dismiss(notif.id)}
            className="flex items-start gap-3 p-3.5 rounded-2xl cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.88)",
              backdropFilter: "blur(40px) saturate(1.8)",
              WebkitBackdropFilter: "blur(40px) saturate(1.8)",
              border: "1px solid rgba(255,255,255,0.6)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
            }}
          >
            {/* Icon */}
            <div
              className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 relative overflow-hidden"
              style={{ background: "#0F172A", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
            >
              <span className="text-[11px] font-heading font-bold tracking-wide" style={{
                background: "linear-gradient(135deg, #60A5FA, #A78BFA, #F472B6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>{notif.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-semibold text-[#1C1C1E]">{notif.title}</p>
                <span className="text-[10px] text-[#C7C7CC]">now</span>
              </div>
              <p className="text-[12px] text-[#6B6B70] leading-snug mt-0.5">{notif.body}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
