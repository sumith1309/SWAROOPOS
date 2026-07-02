"use client";

import dynamic from "next/dynamic";
import { useStore, type AppId } from "@/lib/store";
import { DOMAINS, type Domain } from "@/lib/data";
import Window from "./Window";

// App bodies load on demand when their window is first opened — none of them
// belong in the first-paint bundle.
const loading = () => (
  <div className="p-6 text-[12px] font-mono text-[#94A3B8]" role="status">Loading…</div>
);
const DomainApp = dynamic(() => import("../apps/DomainApp"), { loading });
const AboutApp = dynamic(() => import("../apps/AboutApp"), { loading });
const SkillsApp = dynamic(() => import("../apps/SkillsApp"), { loading });
const TerminalApp = dynamic(() => import("../apps/TerminalApp"), { loading });
const ContactApp = dynamic(() => import("../apps/ContactApp"), { loading });
const CalculatorApp = dynamic(() => import("../apps/CalculatorApp"), { loading });
const MusicApp = dynamic(() => import("../apps/MusicApp"), { loading });
const SettingsApp = dynamic(() => import("../apps/SettingsApp"), { loading });
const TicTacToeApp = dynamic(() => import("../apps/TicTacToeApp"), { loading });
const Game2048App = dynamic(() => import("../apps/Game2048App"), { loading });
const CalendarApp = dynamic(() => import("../apps/CalendarApp"), { loading });
const GalleryApp = dynamic(() => import("../apps/GalleryApp"), { loading });
const ShowcaseApp = dynamic(() => import("../apps/ShowcaseApp"), { loading });
const AIChatApp = dynamic(() => import("../apps/AIChatApp"), { loading });
const ResumeTailorApp = dynamic(() => import("../apps/ResumeTailorApp"), { loading });
const RecommenderApp = dynamic(() => import("../apps/RecommenderApp"), { loading });
const AIDemoApp = dynamic(() => import("../apps/AIDemoApp"), { loading });

const WINDOW_TITLES: Record<string, string> = {
  education: "Education Lab",
  climate: "Weather Station",
  enterprise: "Enterprise Console",
  fintech: "Trading Floor",
  construction: "Site Office",
  about: "System Log",
  skills: "System Specifications",
  terminal: "Terminal",
  contact: "Connect",
  calculator: "Calculator",
  music: "Music",
  settings: "Settings",
  tictactoe: "Tic-Tac-Toe",
  game2048: "2048",
  calendar: "Calendar",
  gallery: "Project Gallery",
  showcase: "Showcase",
  aichat: "Ask Swaroop AI",
  resumetailor: "AI Resume Tailor",
  recommender: "AI Project Guide",
  aidemo: "AI Playground",
};

const WINDOW_COLORS: Record<string, string> = {
  education: "#6366F1",
  climate: "#F59E0B",
  enterprise: "#8B5CF6",
  fintech: "#10B981",
  construction: "#EF4444",
  about: "#3B82F6",
  skills: "#8B5CF6",
  terminal: "#475569",
  contact: "#10B981",
  calculator: "#F59E0B",
  music: "#EC4899",
  settings: "#64748B",
  tictactoe: "#EF4444",
  game2048: "#F97316",
  calendar: "#3B82F6",
  gallery: "#6366F1",
  showcase: "#F97316",
  aichat: "#3B82F6",
  resumetailor: "#10B981",
  recommender: "#8B5CF6",
  aidemo: "#F97316",
};

function AppContent({ id }: { id: AppId }) {
  if (id in DOMAINS) return <DomainApp domain={id as Domain} />;
  switch (id) {
    case "about": return <AboutApp />;
    case "skills": return <SkillsApp />;
    case "terminal": return <TerminalApp />;
    case "contact": return <ContactApp />;
    case "calculator": return <CalculatorApp />;
    case "music": return <MusicApp />;
    case "settings": return <SettingsApp />;
    case "tictactoe": return <TicTacToeApp />;
    case "game2048": return <Game2048App />;
    case "calendar": return <CalendarApp />;
    case "gallery": return <GalleryApp />;
    case "showcase": return <ShowcaseApp />;
    case "aichat": return <AIChatApp />;
    case "resumetailor": return <ResumeTailorApp />;
    case "recommender": return <RecommenderApp />;
    case "aidemo": return <AIDemoApp />;
    default: return null;
  }
}

export default function WindowManager() {
  const windows = useStore((s) => s.windows);

  const openWindows = Object.entries(windows).filter(
    ([, win]) => win.isOpen && !win.isMinimized
  );

  return (
    <>
      {openWindows.map(([id, win]) => (
        <Window
          key={id}
          id={id as AppId}
          title={WINDOW_TITLES[id] || id}
          accentColor={WINDOW_COLORS[id] || "#3B82F6"}
          zIndex={win.zIndex}
          position={win.position}
        >
          <AppContent id={id as AppId} />
        </Window>
      ))}
    </>
  );
}
