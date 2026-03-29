"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  external?: boolean;
}

export default function MagneticButton({ children, href, onClick, className, external }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.15, y: y * 0.15 });
  };

  const handleLeave = () => setPosition({ x: 0, y: 0 });

  const Tag = href ? "a" : "button";
  const linkProps = href
    ? { href, target: external ? "_blank" : undefined, rel: external ? "noopener noreferrer" : undefined }
    : { onClick };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <Tag
        {...linkProps}
        className={cn(
          "glass inline-flex items-center gap-3 px-6 py-3 rounded-[10px]",
          "text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors duration-200",
          "cursor-pointer",
          className
        )}
      >
        {children}
      </Tag>
    </motion.div>
  );
}
