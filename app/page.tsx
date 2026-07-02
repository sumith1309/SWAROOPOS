"use client";

import { useEffect } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { useStore } from "@/lib/store";
import Desktop from "@/components/desktop/Desktop";
import LockScreen from "@/components/desktop/LockScreen";
import ProjectDetail from "@/components/apps/ProjectDetail";

const INTRO_SEEN_KEY = "swos:v3:intro-seen";

// Entering SwaroopOS: "/" opens on a brief lock-screen intro — flavor, not a
// gate. It auto-dismisses in under a second, any input or the visible skip
// button dismisses it instantly, returning visitors and reduced-motion users
// never see it, and deep links (/projects, /resume, /contact) are never gated.
export default function Home() {
  const activeProjectId = useStore((s) => s.activeProjectId);
  const locked = useStore((s) => s.locked);
  const lockMode = useStore((s) => s.lockMode);
  const unlock = useStore((s) => s.unlock);

  // Skip the entry intro entirely for returning visitors and reduced motion;
  // first-time visitors get it once and are marked as seen immediately.
  useEffect(() => {
    if (!useStore.getState().locked || useStore.getState().lockMode !== "intro") return;
    let seen = false;
    let reduced = false;
    try {
      seen = localStorage.getItem(INTRO_SEEN_KEY) === "1";
      reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      /* storage unavailable — show the intro, it self-dismisses anyway */
    }
    if (seen || reduced) {
      unlock();
    } else {
      try {
        localStorage.setItem(INTRO_SEEN_KEY, "1");
      } catch {
        /* ignore */
      }
    }
  }, [unlock]);

  return (
    <MotionConfig reducedMotion="user">
      <main id="main-content" className="w-screen h-screen overflow-hidden">
        <Desktop />

        {/* Lock screen — brief auto-skipping intro + on-demand relock via wordmark */}
        <AnimatePresence>
          {locked && <LockScreen autoDismiss={lockMode === "intro"} />}
        </AnimatePresence>

        {/* Project detail modal */}
        <AnimatePresence>
          {activeProjectId && <ProjectDetail />}
        </AnimatePresence>
      </main>
    </MotionConfig>
  );
}
