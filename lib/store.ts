import { create } from "zustand";

export type Domain = "education" | "climate" | "enterprise" | "fintech" | "construction";
export type SystemApp = "about" | "skills" | "terminal" | "contact";
export type UtilityApp = "calculator" | "music" | "settings" | "calendar";
export type GameApp = "tictactoe" | "game2048" | "gallery" | "showcase";
export type AIApp = "aichat";
export type AppId = Domain | SystemApp | UtilityApp | GameApp | AIApp;

export const WALLPAPERS = [
  { id: "landscape", label: "Landscape", type: "url" as const, value: "/wallpapers/landscape.jpg", dark: false },
  { id: "gradient", label: "Pastel", type: "css" as const, value: "linear-gradient(135deg, #E0E7FF 0%, #F0F9FF 25%, #F5F3FF 50%, #ECFDF5 75%, #FFF7ED 100%)", dark: false },
  { id: "aurora", label: "Aurora", type: "url" as const, value: "/wallpapers/aurora-gradient.jpg", dark: true },
  { id: "mountains", label: "Mountains", type: "url" as const, value: "/wallpapers/mountains.jpg", dark: false },
  { id: "soft", label: "Soft Gradient", type: "url" as const, value: "/wallpapers/soft-gradient.jpg", dark: false },
  { id: "twilight", label: "Twilight", type: "url" as const, value: "/wallpapers/twilight-sky.jpg", dark: true },
  { id: "deep-blue", label: "Deep Blue", type: "url" as const, value: "/wallpapers/deep-blue.jpg", dark: true },
  { id: "fluid", label: "Fluid Art", type: "url" as const, value: "/wallpapers/fluid-art.jpg", dark: false },
  { id: "lavender", label: "Lavender Mist", type: "css" as const, value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", dark: true },
  { id: "peach", label: "Peach Bloom", type: "css" as const, value: "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 50%, #f5e6d8 100%)", dark: false },
];

interface WindowState {
  id: AppId;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  position: { x: number; y: number };
}

interface Store {
  // Windows
  windows: Record<string, WindowState>;
  nextZIndex: number;
  openWindow: (id: AppId) => void;
  closeWindow: (id: AppId) => void;
  minimizeWindow: (id: AppId) => void;
  focusWindow: (id: AppId) => void;
  updateWindowPosition: (id: AppId, pos: { x: number; y: number }) => void;

  // Active detail
  activeProjectId: string | null;
  setActiveProjectId: (id: string | null) => void;

  // Wallpaper
  wallpaperId: string;
  setWallpaper: (id: string) => void;
}

const DEFAULT_POSITIONS: Record<string, { x: number; y: number }> = {
  education: { x: 80, y: 60 },
  climate: { x: 120, y: 80 },
  enterprise: { x: 160, y: 60 },
  fintech: { x: 200, y: 80 },
  construction: { x: 100, y: 100 },
  about: { x: 140, y: 70 },
  skills: { x: 180, y: 90 },
  terminal: { x: 100, y: 60 },
  contact: { x: 160, y: 100 },
  calculator: { x: 250, y: 80 },
  music: { x: 130, y: 90 },
  settings: { x: 170, y: 70 },
  tictactoe: { x: 210, y: 80 },
  game2048: { x: 150, y: 60 },
  calendar: { x: 190, y: 75 },
  gallery: { x: 120, y: 70 },
  showcase: { x: 210, y: 65 },
};

export const useStore = create<Store>((set) => ({
  windows: {},
  nextZIndex: 10,

  openWindow: (id) =>
    set((state) => {
      const existing = state.windows[id];
      if (existing?.isOpen && !existing.isMinimized) {
        return {
          windows: { ...state.windows, [id]: { ...existing, zIndex: state.nextZIndex } },
          nextZIndex: state.nextZIndex + 1,
        };
      }
      return {
        windows: {
          ...state.windows,
          [id]: {
            id, isOpen: true, isMinimized: false, zIndex: state.nextZIndex,
            position: existing?.position || DEFAULT_POSITIONS[id] || { x: 100, y: 80 },
          },
        },
        nextZIndex: state.nextZIndex + 1,
      };
    }),

  closeWindow: (id) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { id, isOpen: false, isMinimized: false, zIndex: 0, position: state.windows[id]?.position || DEFAULT_POSITIONS[id] || { x: 100, y: 80 } },
      },
    })),

  minimizeWindow: (id) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isMinimized: true, id, isOpen: true, zIndex: state.windows[id]?.zIndex || 0, position: state.windows[id]?.position || DEFAULT_POSITIONS[id] || { x: 100, y: 80 } },
      },
    })),

  focusWindow: (id) =>
    set((state) => {
      const win = state.windows[id];
      if (!win) return state;
      return {
        windows: { ...state.windows, [id]: { ...win, zIndex: state.nextZIndex, isMinimized: false } },
        nextZIndex: state.nextZIndex + 1,
      };
    }),

  updateWindowPosition: (id, pos) =>
    set((state) => {
      const win = state.windows[id];
      if (!win) return state;
      return { windows: { ...state.windows, [id]: { ...win, position: pos } } };
    }),

  activeProjectId: null,
  setActiveProjectId: (id) => set({ activeProjectId: id }),

  wallpaperId: "landscape",
  setWallpaper: (id) => set({ wallpaperId: id }),
}));
