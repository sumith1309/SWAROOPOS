"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import dynamic from "next/dynamic";
import { useStore } from "@/lib/store";
import BootScreen from "@/components/boot/BootScreen";
import LockScreen from "@/components/desktop/LockScreen";
import Desktop from "@/components/desktop/Desktop";
import ProjectDetail from "@/components/apps/ProjectDetail";

// The Foundry intro is a feature-flagged enhancement layer. With the flag off
// (the default), its chunk is never rendered and the classic boot flow runs.
const FOUNDRY_ENABLED = process.env.NEXT_PUBLIC_ENABLE_FOUNDRY === "true";

const FoundryIntro = dynamic(() => import("@/components/foundry/FoundryIntro"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 z-[100] bg-[#FAFAF8]" />,
});

type Phase = "boot" | "foundry" | "lock" | "desktop";

export default function Home() {
  const [phase, setPhase] = useState<Phase>(FOUNDRY_ENABLED ? "foundry" : "boot");
  const activeProjectId = useStore((s) => s.activeProjectId);

  const handleBootComplete = useCallback(() => setPhase("lock"), []);
  const handleFoundryComplete = useCallback(() => setPhase("desktop"), []);
  const handleUnlock = useCallback(() => setPhase("desktop"), []);
  const handleLock = useCallback(() => setPhase("lock"), []);

  return (
    <MotionConfig reducedMotion="user">
      <main className="w-screen h-screen overflow-hidden">
        {/* Classic boot flow (flag off) */}
        {phase === "boot" && <BootScreen onComplete={handleBootComplete} />}

        {/* Foundry intro (flag on) — hands off straight to the desktop */}
        {phase === "foundry" && <FoundryIntro onComplete={handleFoundryComplete} />}

        {/* Lock screen */}
        <AnimatePresence>
          {phase === "lock" && <LockScreen onUnlock={handleUnlock} />}
        </AnimatePresence>

        {/* Desktop (mounted behind lock, revealed on exit) */}
        {(phase === "lock" || phase === "desktop") && <Desktop onLock={handleLock} />}

        {/* Project detail modal */}
        <AnimatePresence>
          {activeProjectId && <ProjectDetail />}
        </AnimatePresence>
      </main>
    </MotionConfig>
  );
}
