"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatCounterProps {
  value: string;
  label: string;
  suffix?: string;
  color?: string;
}

export default function StatCounter({ value, label, suffix = "", color }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10);

  useEffect(() => {
    if (!inView || isNaN(numericValue)) return;
    let start = 0;
    const duration = 1500;
    const steps = 40;
    const increment = numericValue / steps;
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [inView, numericValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div
        className="font-mono text-[48px] font-bold tracking-[-0.04em] leading-none"
        style={{ color: color || "#FAFAFA" }}
      >
        {inView ? count : 0}
        {suffix}
      </div>
      <div className="text-[13px] text-[#71717A] mt-2 font-body">{label}</div>
    </motion.div>
  );
}
