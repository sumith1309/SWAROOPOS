"use client";

import { AnimatePresence, MotionConfig } from "framer-motion";
import { useStore } from "@/lib/store";
import Desktop from "@/components/desktop/Desktop";
import ProjectDetail from "@/components/apps/ProjectDetail";

// First paint is the desktop itself — name, role, proof, and the recruiter
// fast-path. No boot screen, no lock screen, no entry gate of any kind.
export default function Home() {
  const activeProjectId = useStore((s) => s.activeProjectId);

  return (
    <MotionConfig reducedMotion="user">
      <main className="w-screen h-screen overflow-hidden">
        <Desktop />

        {/* Project detail modal */}
        <AnimatePresence>
          {activeProjectId && <ProjectDetail />}
        </AnimatePresence>
      </main>
    </MotionConfig>
  );
}
