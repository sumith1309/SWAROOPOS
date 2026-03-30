"use client";

import { useStore, type AppId } from "@/lib/store";
import { DOMAINS, SYSTEM_APPS, type Domain, type SystemApp } from "@/lib/data";
import Window from "./Window";
import DomainApp from "../apps/DomainApp";
import AboutApp from "../apps/AboutApp";
import SkillsApp from "../apps/SkillsApp";
import TerminalApp from "../apps/TerminalApp";
import ContactApp from "../apps/ContactApp";
import CalculatorApp from "../apps/CalculatorApp";
import MusicApp from "../apps/MusicApp";
import SettingsApp from "../apps/SettingsApp";
import TicTacToeApp from "../apps/TicTacToeApp";
import Game2048App from "../apps/Game2048App";
import CalendarApp from "../apps/CalendarApp";
import GalleryApp from "../apps/GalleryApp";
import ShowcaseApp from "../apps/ShowcaseApp";
import AIChatApp from "../apps/AIChatApp";
import ResumeTailorApp from "../apps/ResumeTailorApp";
import RecommenderApp from "../apps/RecommenderApp";
import AIDemoApp from "../apps/AIDemoApp";

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
