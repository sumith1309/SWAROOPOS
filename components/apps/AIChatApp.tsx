"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/lib/store";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// Extend Window for vendor-prefixed SpeechRecognition
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

type SpeechRecognitionInstance = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: Event & { error: string }) => void) | null;
  onend: (() => void) | null;
};

const SUGGESTIONS = [
  "What projects have you built?",
  "Tell me about Sahara Sense",
  "What's your tech stack?",
  "What makes you unique?",
];

function getSpeechRecognitionConstructor(): (new () => SpeechRecognitionInstance) | null {
  if (typeof window === "undefined") return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

function isSpeechSynthesisSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export default function AIChatApp() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm Swaroop's AI assistant. Ask me anything about his projects, skills, experience, or background. I know everything about his 20+ products and career journey.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [ttsSupported, setTtsSupported] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  const pendingAIQuery = useStore((s) => s.pendingAIQuery);
  const setPendingAIQuery = useStore((s) => s.setPendingAIQuery);

  // Check browser support on mount
  useEffect(() => {
    setSpeechSupported(getSpeechRecognitionConstructor() !== null);
    setTtsSupported(isSpeechSynthesisSupported());
  }, []);

  // Handle pending AI query from Spotlight Search
  useEffect(() => {
    if (pendingAIQuery && !loading) {
      const q = pendingAIQuery;
      setPendingAIQuery(null);
      // Slight delay to let the component render first
      setTimeout(() => sendMessage(q), 200);
    }
  }, [pendingAIQuery]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // Speak text using SpeechSynthesis
  const speakText = useCallback((text: string) => {
    if (!ttsEnabled || !isSpeechSynthesisSupported()) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  }, [ttsEnabled]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const chatHistory = [...messages.filter((m) => m.id !== "welcome"), userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatHistory }),
      });

      const data = await res.json();

      const responseText = data.response || data.error || "Sorry, I encountered an error. Please try again.";

      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: responseText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
      speakText(responseText);
    } catch {
      const errorText = "Connection error. Please try again later.";
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          content: errorText,
          timestamp: new Date(),
        },
      ]);
    }

    setLoading(false);
    inputRef.current?.focus();
  }, [loading, messages, speakText]);

  // Start/stop voice recording
  const toggleRecording = useCallback(() => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }

    const SpeechRecognitionCtor = getSpeechRecognitionConstructor();
    if (!SpeechRecognitionCtor) return;

    const recognition = new SpeechRecognitionCtor();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    let finalTranscript = "";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = "";
      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        if (result?.[0]) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if ((result as any).isFinal) {
            finalTranscript += result[0].transcript + " ";
          } else {
            interim = result[0].transcript;
          }
        }
      }
      setInput((finalTranscript + interim).trim());
    };

    recognition.onerror = (event: Event & { error: string }) => {
      setIsRecording(false);
      if (event.error === "not-allowed") {
        setInput("Microphone access denied. Please allow in browser settings.");
      } else if (event.error === "no-speech") {
        setInput("No speech detected. Please try again.");
      } else if (event.error === "network") {
        setInput("Network error. Speech recognition requires internet.");
      } else {
        setInput(`Speech error: ${event.error}`);
      }
    };

    recognition.onend = () => {
      setIsRecording(false);
      if (finalTranscript.trim()) {
        setInput(finalTranscript.trim());
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  }, [isRecording]);

  return (
    <div className="flex flex-col h-full min-h-[450px] bg-[#F2F2F7]">
      {/* TTS toggle in header area */}
      {ttsSupported && (
        <div className="flex justify-end px-4 pt-2">
          <button
            onClick={() => {
              if (ttsEnabled) window.speechSynthesis.cancel();
              setTtsEnabled(!ttsEnabled);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer"
            style={{
              background: ttsEnabled ? "linear-gradient(135deg, #3B82F6, #8B5CF6)" : "white",
              color: ttsEnabled ? "white" : "#8E8E93",
              border: ttsEnabled ? "none" : "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            }}
            title={ttsEnabled ? "Disable text-to-speech" : "Enable text-to-speech"}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              {ttsEnabled ? (
                <>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </>
              ) : (
                <line x1="23" y1="9" x2="17" y2="15" />
              )}
            </svg>
            {ttsEnabled ? "TTS On" : "TTS Off"}
          </button>
        </div>
      )}

      {/* Chat messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ scrollbarWidth: "none" }}>
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed ${
                  msg.role === "user"
                    ? "text-white rounded-br-md"
                    : "text-[#1C1C1E] rounded-bl-md"
                }`}
                style={{
                  background: msg.role === "user"
                    ? "linear-gradient(135deg, #3B82F6, #8B5CF6)"
                    : "white",
                  boxShadow: msg.role === "user"
                    ? "0 2px 8px rgba(59,130,246,0.3)"
                    : "0 1px 3px rgba(0,0,0,0.06)",
                  border: msg.role === "assistant" ? "1px solid rgba(0,0,0,0.04)" : "none",
                }}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 flex gap-1" style={{ border: "1px solid rgba(0,0,0,0.04)", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-[#C7C7CC]"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Suggestions — show only at start */}
        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="px-3 py-1.5 rounded-full text-[12px] font-medium text-[#3B82F6] bg-white border border-[rgba(59,130,246,0.2)] hover:bg-[#EFF6FF] transition-colors cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="px-3 py-3 border-t border-[rgba(0,0,0,0.06)] bg-white/80" style={{ backdropFilter: "blur(20px)" }}>
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder={isRecording ? "Listening..." : "Ask about Swaroop..."}
            className="flex-1 px-4 py-2.5 rounded-full bg-[#F2F2F7] text-[14px] text-[#1C1C1E] placeholder-[#C7C7CC] outline-none border border-transparent focus:border-[#3B82F6] transition-colors"
            disabled={loading}
          />

          {/* Microphone button */}
          {speechSupported && (
            <button
              onClick={toggleRecording}
              disabled={loading}
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all disabled:opacity-40 cursor-pointer relative"
              style={{
                background: isRecording ? "#EF4444" : "#F2F2F7",
                color: isRecording ? "white" : "#8E8E93",
              }}
              title={isRecording ? "Stop recording" : "Start voice input"}
            >
              {/* Pulsing red dot when recording */}
              {isRecording && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ background: "rgba(239, 68, 68, 0.4)" }}
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
              )}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            </button>
          )}

          {/* Send button */}
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0 transition-all disabled:opacity-40 cursor-pointer"
            style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
        <p className="text-[10px] text-[#C7C7CC] text-center mt-1.5">Powered by Claude AI · Trained on Swaroop&apos;s complete profile</p>
      </div>
    </div>
  );
}
