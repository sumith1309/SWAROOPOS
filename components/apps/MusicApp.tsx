"use client";

import { useState, useRef, useEffect } from "react";

const TRACK = {
  title: "Ambient Dreams",
  artist: "S. Swaroop Portfolio",
  duration: "3:45",
  // Free ambient audio from a public domain source
  src: "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3",
};

export default function MusicApp() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const onEnd = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", onEnd);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) { audioRef.current.currentTime = time; setCurrentTime(time); }
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="p-6 bg-gradient-to-b from-[#EFF6FF] to-[#F8FAFC] min-h-[350px] flex flex-col items-center justify-center">
      <audio ref={audioRef} src={TRACK.src} preload="metadata" />

      {/* Album art */}
      <div className="w-48 h-48 rounded-[20px] mb-6 flex items-center justify-center shadow-lg"
        style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6, #6366F1)" }}>
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
          <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
        </svg>
      </div>

      {/* Track info */}
      <h3 className="text-[18px] font-heading font-bold text-[#0F172A] mb-1">{TRACK.title}</h3>
      <p className="text-[13px] text-[#94A3B8] mb-4">{TRACK.artist}</p>

      {/* Seek bar */}
      <div className="w-full max-w-xs mb-4">
        <input
          type="range" min={0} max={duration || 100} value={currentTime} onChange={seek}
          className="w-full h-1 rounded-full appearance-none cursor-pointer"
          style={{ background: `linear-gradient(to right, #3B82F6 ${(currentTime / (duration || 1)) * 100}%, #E2E8F0 0%)` }}
        />
        <div className="flex justify-between mt-1">
          <span className="text-[10px] font-mono text-[#94A3B8]">{formatTime(currentTime)}</span>
          <span className="text-[10px] font-mono text-[#94A3B8]">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6">
        <button onClick={() => { if (audioRef.current) audioRef.current.currentTime = Math.max(0, currentTime - 10); }}
          className="text-[#94A3B8] hover:text-[#475569] transition-colors cursor-pointer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="19 20 9 12 19 4"/><line x1="5" y1="19" x2="5" y2="5"/></svg>
        </button>
        <button onClick={togglePlay}
          className="w-14 h-14 rounded-full flex items-center justify-center text-white cursor-pointer transition-transform hover:scale-105"
          style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", boxShadow: "0 4px 15px rgba(59,130,246,0.3)" }}>
          {isPlaying ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21"/></svg>
          )}
        </button>
        <button onClick={() => { if (audioRef.current) audioRef.current.currentTime = Math.min(duration, currentTime + 10); }}
          className="text-[#94A3B8] hover:text-[#475569] transition-colors cursor-pointer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 4 15 12 5 20"/><line x1="19" y1="5" x2="19" y2="19"/></svg>
        </button>
      </div>
    </div>
  );
}
