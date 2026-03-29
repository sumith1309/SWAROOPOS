"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface BootLineProps {
  text: string;
  delay: number;
  charSpeed?: number;
  onComplete?: () => void;
  isHighlight?: boolean;
}

export default function BootLine({ text, delay, charSpeed = 30, onComplete, isHighlight }: BootLineProps) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, charSpeed);
      return () => clearTimeout(timer);
    } else {
      setDone(true);
      onComplete?.();
    }
  }, [started, displayed, text, charSpeed, onComplete]);

  if (!started) return <div className="h-[1.7em]" />;

  return (
    <motion.div
      initial={{ opacity: 0.6 }}
      animate={{ opacity: done ? 0.8 : 1 }}
      className={`font-mono text-[13px] leading-[1.7] ${
        isHighlight ? "text-[#3B82F6]" : "text-[#A1A1AA]"
      }`}
    >
      {displayed}
      {!done && <span className="cursor-blink text-[#3B82F6]">▋</span>}
    </motion.div>
  );
}
