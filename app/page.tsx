"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { useStore } from "@/lib/store";
import BootScreen from "@/components/boot/BootScreen";
import LockScreen from "@/components/desktop/LockScreen";
import Desktop from "@/components/desktop/Desktop";
import ProjectDetail from "@/components/apps/ProjectDetail";

export default function Home() {
  const [phase, setPhase] = useState<"boot" | "lock" | "desktop">("boot");
  const activeProjectId = useStore((s) => s.activeProjectId);

  const handleBootComplete = useCallback(() => setPhase("lock"), []);
  const handleUnlock = useCallback(() => setPhase("desktop"), []);
  const handleLock = useCallback(() => setPhase("lock"), []);

  return (
    <main className="w-screen h-screen overflow-hidden">
      {/* Boot screen */}
      {phase === "boot" && <BootScreen onComplete={handleBootComplete} />}

      {/* Lock screen */}
      <AnimatePresence>
        {phase === "lock" && <LockScreen onUnlock={handleUnlock} />}
      </AnimatePresence>

      {/* Desktop (always mounted, revealed by lock screen exit) */}
      {phase !== "boot" && <Desktop onLock={handleLock} />}

      {/* Project detail modal */}
      <AnimatePresence>
        {activeProjectId && <ProjectDetail />}
      </AnimatePresence>
    </main>
  );
}
