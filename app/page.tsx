"use client";

import { AnimatePresence, MotionConfig } from "framer-motion";
import { useStore } from "@/lib/store";
import Desktop from "@/components/desktop/Desktop";
import LockScreen from "@/components/desktop/LockScreen";
import ProjectDetail from "@/components/apps/ProjectDetail";

// First paint is the desktop itself — name, role, proof, and the recruiter
// fast-path, no boot or lock gate. The lock screen is on-demand only,
// triggered by clicking the SwaroopOS wordmark in the taskbar.
export default function Home() {
  const activeProjectId = useStore((s) => s.activeProjectId);
  const locked = useStore((s) => s.locked);

  return (
    <MotionConfig reducedMotion="user">
      <main className="w-screen h-screen overflow-hidden">
        <Desktop />

        {/* On-demand lock screen */}
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
