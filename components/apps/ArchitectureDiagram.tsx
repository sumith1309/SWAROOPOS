"use client";

import { motion } from "framer-motion";

interface ArchitectureDiagramProps {
  architecture: string;
  color: string;
}

export default function ArchitectureDiagram({ architecture, color }: ArchitectureDiagramProps) {
  const nodes = architecture.split(/\s*[→→>]+\s*/).filter(Boolean);

  return (
    <div className="pl-8">
      <div className="flex flex-wrap items-center gap-1.5 p-4 rounded-[12px] bg-[#F8FAFC] border border-[rgba(0,0,0,0.04)]">
        {nodes.map((node, i) => (
          <div key={`${node}-${i}`} className="flex items-center gap-1.5">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08, type: "spring", stiffness: 200, damping: 20 }}
              className="px-3 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap"
              style={{
                background: `${color}08`,
                color: `${color}CC`,
                border: `1.5px solid ${color}18`,
                boxShadow: `0 1px 3px ${color}06`,
              }}
            >
              {node.trim()}
            </motion.div>
            {i < nodes.length - 1 && (
              <motion.svg
                width="16" height="12" viewBox="0 0 16 12"
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + i * 0.08 }}
                className="shrink-0"
              >
                <path d="M0 6h12M10 2l4 4-4 4" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
              </motion.svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
