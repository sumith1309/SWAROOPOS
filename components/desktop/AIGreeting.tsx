"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface AIGreetingProps {
  isDark: boolean;
}

function getTimeOfDay(hour: number): "morning" | "afternoon" | "evening" | "night" {
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
}

function getCityFromTimezone(tz: string): string {
  // Extract city from timezone string like "Asia/Dubai" -> "Dubai"
  const parts = tz.split("/");
  const city = parts[parts.length - 1];
  // Replace underscores with spaces: "New_York" -> "New York"
  return city.replace(/_/g, " ");
}

function getGreeting(timeOfDay: string, city: string): string {
  switch (timeOfDay) {
    case "morning":
      return `Good morning! ☀️ Exploring from ${city}?`;
    case "afternoon":
      return `Good afternoon! Browsing from ${city}?`;
    case "evening":
      return `Good evening! Welcome from ${city}!`;
    case "night":
      return `Late night explorer from ${city}! 🌙`;
    default:
      return `Welcome from ${city}!`;
  }
}

export default function AIGreeting({ isDark }: AIGreetingProps) {
  const [greeting, setGreeting] = useState<string | null>(null);

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const city = getCityFromTimezone(tz);
      const hour = new Date().getHours();
      const timeOfDay = getTimeOfDay(hour);
      setGreeting(getGreeting(timeOfDay, city));
    } catch {
      setGreeting("Welcome! Nice to have you here.");
    }
  }, []);

  if (!greeting) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.7, duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
      className={`p-3 ${isDark ? "liquid-glass-sm-dark" : "liquid-glass-sm"}`}
    >
      <div className="flex items-start gap-2">
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
          style={{ background: "linear-gradient(135deg, #8B5CF6, #EC4899)" }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
          </svg>
        </div>
        <p className={`text-[11px] leading-snug font-medium ${isDark ? "text-white/60" : "text-[#6B6B70]"}`}>
          {greeting}
        </p>
      </div>
    </motion.div>
  );
}
