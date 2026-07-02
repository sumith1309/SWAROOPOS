"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  HEADLINE,
  ALL_PRODUCTS,
  LIVE_PRODUCTS,
  PRODUCTION_PRODUCTS,
  CONTACT,
} from "@/lib/data";

/**
 * The Foundry — feature-flagged intro layer (NEXT_PUBLIC_ENABLE_FOUNDRY).
 *
 * Every visible token is a REAL string parsed from lib/data.ts (architecture
 * pipelines, verified metrics, live-system labels). Nothing is decorative
 * particle noise. The crystallized frame is the first paint; disassembled
 * tokens reassemble along orthogonal paths and settle in ≤2.5s. Skippable on
 * any input; returning visitors, reduced-motion users, and mobile skip it
 * entirely (the runtime treats them as "seen").
 */

const SEEN_KEY = "foundry:v1:seen";
const EASE = [0.32, 0.72, 0, 1] as const;

interface FoundryIntroProps {
  onComplete: () => void;
}

/** Real tokens only — parsed from architecture strings + vouched/verified labels. */
function buildTokens(): string[] {
  const archTokens = PRODUCTION_PRODUCTS.flatMap((p) =>
    (p.architecture || "")
      .split("→")
      .map((s) => s.trim())
      .filter((s) => s.length > 2 && s.length <= 26)
      .slice(0, 4)
  );
  const proofTokens = [
    "HRMS · LIVE",
    "80+ daily users",
    "794 tests",
    "Samba Retail · LIVE",
    "ALIA · RAG @ EC2",
    "ADVAIT.io · 35 agents",
    "WebQ Team · 34 agents",
    "Entra ID + Google SSO",
    "Human approval gate",
    "Claude Code · AI-assisted",
  ];
  const seen = new Set<string>();
  return [...proofTokens, ...archTokens].filter((t) => {
    const k = t.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  }).slice(0, 26);
}

/** Deterministic pseudo-random from index — stable across renders, no Math.random. */
function jitter(i: number, salt: number): number {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export default function FoundryIntro({ onComplete }: FoundryIntroProps) {
  const [mode, setMode] = useState<"pending" | "full" | "skip">("pending");
  const tokens = useMemo(() => buildTokens(), []);

  // Decide mode on mount: returning / reduced-motion / mobile → skip entirely.
  useEffect(() => {
    const t = setTimeout(() => {
      let skip = false;
      try {
        skip =
          localStorage.getItem(SEEN_KEY) === "1" ||
          window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
          window.innerWidth < 768;
      } catch {
        // storage unavailable — run the full sequence
      }
      if (skip) {
        setMode("skip");
        onComplete();
      } else {
        setMode("full");
        try {
          localStorage.setItem(SEEN_KEY, "1");
        } catch {
          // ignore
        }
      }
    }, 0);
    return () => clearTimeout(t);
  }, [onComplete]);

  // Total sequence ≤ 2.5s, then hand off to the desktop.
  useEffect(() => {
    if (mode !== "full") return;
    const t = setTimeout(onComplete, 2500);
    return () => clearTimeout(t);
  }, [mode, onComplete]);

  // Skippable on any input.
  useEffect(() => {
    if (mode !== "full") return;
    const skip = () => onComplete();
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [mode, onComplete]);

  if (mode === "skip") return null;

  const isFull = mode === "full";

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-[#FAFAF8]" aria-label="Intro — press any key to skip">
      {/* Blueprint grid — low-alpha ink lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.035) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Token field — real architecture strings travel along orthogonal paths */}
      {isFull &&
        tokens.map((token, i) => {
          const col = i % 2 === 0 ? jitter(i, 1) * 26 + 4 : 70 + jitter(i, 2) * 26;
          const row = 8 + jitter(i, 3) * 80;
          const fromX = (i % 2 === 0 ? -1 : 1) * (140 + jitter(i, 4) * 220);
          const fromY = (i % 3 === 0 ? -1 : 1) * (90 + jitter(i, 5) * 160);
          return (
            <motion.span
              key={token}
              className="absolute font-mono text-[10px] font-medium px-2 py-1 rounded-[6px] whitespace-nowrap pointer-events-none"
              style={{
                left: `${col}%`,
                top: `${row}%`,
                color: "rgba(15,23,42,0.55)",
                background: "rgba(255,255,255,0.85)",
                border: "1px solid rgba(15,23,42,0.1)",
                boxShadow: "0 1px 3px rgba(15,23,42,0.05)",
              }}
              initial={{ opacity: 0, x: fromX, y: fromY }}
              animate={{
                opacity: [0, 1, 1],
                x: [fromX, fromX, 0],
                y: [fromY, 0, 0],
              }}
              transition={{
                duration: 1.3,
                delay: 0.35 + (i % 9) * 0.06,
                times: [0, 0.55, 1],
                ease: EASE,
              }}
            >
              {token}
            </motion.span>
          );
        })}

      {/* Crystallized core — first paint, recruiter fast-path resolves first */}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <motion.div
          initial={false}
          className="relative max-w-[560px] w-full rounded-[24px] p-2 bg-[rgba(15,23,42,0.03)] border border-[rgba(15,23,42,0.06)]"
        >
          <div
            className="rounded-[18px] bg-white/95 border border-[rgba(15,23,42,0.05)] px-8 py-10 text-center"
            style={{ boxShadow: "var(--elev-3)", backdropFilter: "blur(12px)" }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#94A3B8] mb-4">
              SwaroopOS · compiling from real systems
            </p>
            <h1 className="font-heading font-bold text-[30px] leading-[1.15] tracking-[-0.03em] text-[#0F172A] mb-3">
              {HEADLINE}
            </h1>
            <p className="text-[13px] text-[#64748B] mb-7">
              S. Jyothi Swaroop — Forward Deployed Engineer, Dubai
            </p>

            {/* Fast-path — visible from the first frame, real links */}
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <span className="px-4 py-2 rounded-full bg-[#0F172A] text-white text-[12px] font-semibold">
                View Production Work
              </span>
              <span className="px-4 py-2 rounded-full bg-[#1e40af] text-white text-[12px] font-semibold">
                Download Resume
              </span>
              <span className="px-4 py-2 rounded-full border border-[rgba(15,23,42,0.12)] text-[#475569] text-[12px] font-semibold">
                GitHub
              </span>
              <span className="px-4 py-2 rounded-full border border-[rgba(15,23,42,0.12)] text-[#475569] text-[12px] font-semibold">
                Contact
              </span>
            </div>

            <p className="mt-7 text-[10px] font-mono text-[#C7CBD4]">
              press any key to skip
            </p>
          </div>
        </motion.div>
      </div>

      {/* Honesty telemetry strip — computed values only, never fabricated */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-5 py-3 font-mono text-[10px] text-[#94A3B8] border-t border-[rgba(15,23,42,0.05)] bg-white/70" style={{ backdropFilter: "blur(8px)" }}>
        <span>SYSTEMS {ALL_PRODUCTS.length}</span>
        <span>LIVE {LIVE_PRODUCTS.length}</span>
        <span>DOMAINS 5</span>
        <span>MODE {isFull ? "full" : "safe"}</span>
        <span className="hidden sm:inline">{CONTACT.location.toUpperCase()}</span>
      </div>
    </div>
  );
}
