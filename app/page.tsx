"use client";

import { AnimatePresence, MotionConfig } from "framer-motion";
import { useStore } from "@/lib/store";
import Desktop from "@/components/desktop/Desktop";
import LockScreen from "@/components/desktop/LockScreen";
import ProjectDetail from "@/components/apps/ProjectDetail";

// Entering SwaroopOS: "/" opens on the lock screen — swipe up (or click /
// press a key) to reveal the desktop with name, role, proof, and the
// recruiter fast-path. The lock carries identity + title, unlocks on any
// input, and reduced-motion users pass through instantly. Deep links
// (/projects, /resume, /contact) are never gated.
export default function Home() {
  const activeProjectId = useStore((s) => s.activeProjectId);
  const locked = useStore((s) => s.locked);

  return (
    <MotionConfig reducedMotion="user">
      <main className="w-screen h-screen overflow-hidden">
        <Desktop />

        {/* Lock screen — entry experience + on-demand relock via wordmark */}
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
