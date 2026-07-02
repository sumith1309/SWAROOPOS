"use client";

import { AnimatePresence, MotionConfig } from "framer-motion";
import { useStore } from "@/lib/store";
import Desktop from "@/components/desktop/Desktop";
import LockScreen from "@/components/desktop/LockScreen";
import ProjectDetail from "@/components/apps/ProjectDetail";

// First paint is the desktop itself — name, role, proof, and the recruiter
// fast-path. No boot screen and no entry gate: the lock screen exists only
// on demand (click the SwaroopOS wordmark) as the "entering SwaroopOS" moment.
export default function Home() {
  const activeProjectId = useStore((s) => s.activeProjectId);
  const locked = useStore((s) => s.locked);

  return (
    <MotionConfig reducedMotion="user">
      <main className="w-screen h-screen overflow-hidden">
        <Desktop />

        {/* On-demand lock screen (never shown on entry) */}
        <AnimatePresence>
          {locked && <LockScreen />}
        </AnimatePresence>

        {/* Project detail modal */}
        <AnimatePresence>
          {activeProjectId && <ProjectDetail />}
        </AnimatePresence>
      </main>
    </MotionConfig>
  );
}
