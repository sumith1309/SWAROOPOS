"use client";

import { useStore, WALLPAPERS } from "@/lib/store";

export default function SettingsApp() {
  const wallpaperId = useStore((s) => s.wallpaperId);
  const setWallpaper = useStore((s) => s.setWallpaper);

  return (
    <div className="p-5 bg-[#F8FAFC] min-h-[400px]">
      <h3 className="text-[16px] font-heading font-bold text-[#0F172A] mb-1">Wallpaper</h3>
      <p className="text-[13px] text-[#94A3B8] mb-5">Choose a wallpaper for your desktop</p>

      <div className="grid grid-cols-2 gap-3">
        {WALLPAPERS.map((wp) => (
          <button
            key={wp.id}
            onClick={() => setWallpaper(wp.id)}
            className={`relative rounded-[14px] overflow-hidden h-24 cursor-pointer transition-all ${
              wallpaperId === wp.id ? "ring-2 ring-[#3B82F6] ring-offset-2 scale-[1.02]" : "hover:scale-[1.02]"
            }`}
            style={
              wp.type === "css"
                ? { background: wp.value }
                : { backgroundImage: `url(${wp.value})`, backgroundSize: "cover", backgroundPosition: "center" }
            }
          >
            {/* Label overlay */}
            <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/40 to-transparent">
              <span className="text-[11px] text-white font-medium">{wp.label}</span>
            </div>
            {/* Active check */}
            {wallpaperId === wp.id && (
              <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#3B82F6] flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-[rgba(0,0,0,0.06)]">
        <h3 className="text-[14px] font-heading font-bold text-[#0F172A] mb-3">About SwaroopOS</h3>
        <div className="space-y-2 text-[13px] text-[#64748B]">
          <div className="flex justify-between"><span>Version</span><span className="font-mono text-[#0F172A]">2.0</span></div>
          <div className="flex justify-between"><span>Built with</span><span className="font-mono text-[#0F172A]">Next.js 15 + React 19</span></div>
          <div className="flex justify-between"><span>Developer</span><span className="font-mono text-[#0F172A]">S. Jyothi Swaroop</span></div>
        </div>
      </div>
    </div>
  );
}
