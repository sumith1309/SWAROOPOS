"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SKILLS, CERTIFICATIONS, LANGUAGES } from "@/lib/data";
import { cn } from "@/lib/utils";

/* ─── Folder-based skill documents ─── */
interface SkillFolder {
  name: string;
  icon: React.ReactNode;
  color: string;
  items: string[];
}

const FolderIcon = ({ children, color }: { children: React.ReactNode; color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const SKILL_FOLDERS: SkillFolder[] = [
  {
    name: "Product Management", color: "#3B82F6", items: SKILLS["Product Management"],
    icon: <FolderIcon color="#3B82F6"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></FolderIcon>,
  },
  {
    name: "AI & Data", color: "#8B5CF6", items: SKILLS["AI & Data"],
    icon: <FolderIcon color="#8B5CF6"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></FolderIcon>,
  },
  {
    name: "Technical", color: "#10B981", items: SKILLS["Technical"],
    icon: <FolderIcon color="#10B981"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></FolderIcon>,
  },
  {
    name: "Business & Operations", color: "#F59E0B", items: SKILLS["Business & Operations"],
    icon: <FolderIcon color="#F59E0B"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></FolderIcon>,
  },
  {
    name: "Certifications", color: "#EC4899", items: CERTIFICATIONS,
    icon: <FolderIcon color="#EC4899"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></FolderIcon>,
  },
  {
    name: "Languages", color: "#6366F1", items: [],
    icon: <FolderIcon color="#6366F1"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></FolderIcon>,
  },
];

export default function SkillsApp() {
  const [openFolder, setOpenFolder] = useState<string | null>(null);

  return (
    <div className="min-h-[420px] bg-[#F2F2F7]">
      {/* Header */}
      <div
        className="px-5 pt-4 pb-3 flex items-center justify-between"
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #F8F9FE 100%)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        {openFolder ? (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpenFolder(null)}
              className="text-[#3B82F6] text-[14px] font-medium hover:text-[#2563EB] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              Skills
            </button>
            <span className="text-[15px] font-semibold text-[#1C1C1E]">{openFolder}</span>
          </div>
        ) : (
          <h2 className="text-[17px] font-semibold text-[#1C1C1E]">Skills</h2>
        )}
        <span className="text-[12px] text-[#8E8E93] font-medium">
          {openFolder ? `${SKILL_FOLDERS.find(f => f.name === openFolder)?.items.length || LANGUAGES.length} items` : `${SKILL_FOLDERS.length} folders`}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {!openFolder ? (
          /* ─── Folder Grid View ─── */
          <motion.div
            key="folders"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="p-5 grid grid-cols-3 gap-4"
          >
            {SKILL_FOLDERS.map((folder, i) => (
              <motion.button
                key={folder.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setOpenFolder(folder.name)}
                className="flex flex-col items-center gap-2 cursor-pointer group"
              >
                {/* Folder icon — 3D glass */}
                <div
                  className="w-[64px] h-[64px] rounded-[18px] flex items-center justify-center relative overflow-hidden transition-transform duration-200 group-hover:scale-105"
                  style={{
                    background: `linear-gradient(145deg, ${folder.color}22, ${folder.color}10)`,
                    border: `1px solid ${folder.color}30`,
                    boxShadow: `0 4px 16px ${folder.color}18, inset 0 1px 0 rgba(255,255,255,0.5)`,
                  }}
                >
                  <div
                    className="absolute inset-x-0 top-0 h-1/2 rounded-t-[18px] pointer-events-none"
                    style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 100%)" }}
                  />
                  <span className="relative z-10">{folder.icon}</span>
                </div>
                <div className="text-center">
                  <p className="text-[11px] font-semibold text-[#1C1C1E] leading-tight">{folder.name}</p>
                  <p className="text-[9px] text-[#8E8E93] mt-0.5">
                    {folder.name === "Languages" ? `${LANGUAGES.length} items` : `${folder.items.length} items`}
                  </p>
                </div>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          /* ─── Folder Contents ─── */
          <motion.div
            key={openFolder}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25 }}
            className="p-4"
          >
            {openFolder === "Languages" ? (
              <LanguagesView />
            ) : openFolder === "Certifications" ? (
              <CertificationsView items={SKILL_FOLDERS.find(f => f.name === openFolder)!.items} color={SKILL_FOLDERS.find(f => f.name === openFolder)!.color} />
            ) : (
              <SkillsList
                items={SKILL_FOLDERS.find(f => f.name === openFolder)!.items}
                color={SKILL_FOLDERS.find(f => f.name === openFolder)!.color}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Skills List (iOS-style file list) ─── */
function SkillsList({ items, color }: { items: string[]; color: string }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.04)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
      {items.map((item, i) => (
        <motion.div
          key={item}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.04 }}
          className={cn("flex items-center gap-3 px-4 py-3", i < items.length - 1 && "border-b border-[rgba(0,0,0,0.04)]")}
        >
          {/* Document icon */}
          <div
            className="w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0"
            style={{ background: `${color}12` }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[14px] text-[#1C1C1E] font-medium truncate">{item}</p>
          </div>
          {/* Proficiency dot */}
          <div className="flex gap-0.5 shrink-0">
            {Array.from({ length: 5 }).map((_, j) => (
              <div
                key={j}
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: j < 3 + Math.floor((i * 7 + 3) % 3) ? color : `${color}20`,
                }}
              />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Certifications (with checkmarks) ─── */
function CertificationsView({ items, color }: { items: string[]; color: string }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.04)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
      {items.map((cert, i) => (
        <motion.div
          key={cert}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06 }}
          className={cn("flex items-center gap-3 px-4 py-3", i < items.length - 1 && "border-b border-[rgba(0,0,0,0.04)]")}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            style={{ background: `${color}12` }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <p className="text-[14px] text-[#1C1C1E] font-medium flex-1">{cert}</p>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Languages (with bars) ─── */
function LanguagesView() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden p-4 space-y-4" style={{ border: "1px solid rgba(0,0,0,0.04)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
      {LANGUAGES.map((lang, i) => (
        <motion.div
          key={lang.name}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
        >
          <div className="flex justify-between mb-1.5">
            <span className="text-[14px] font-semibold text-[#1C1C1E]">{lang.name}</span>
            <span className="text-[12px] font-medium text-[#8E8E93]">{lang.level}</span>
          </div>
          <div className="h-2 bg-[#F2F2F7] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #3B82F6, #8B5CF6)" }}
              initial={{ width: 0 }}
              animate={{ width: `${lang.percent}%` }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: "easeOut" }}
            />
          </div>
          <div className="text-right text-[10px] font-mono text-[#C7C7CC] mt-0.5">{lang.percent}%</div>
        </motion.div>
      ))}
    </div>
  );
}
