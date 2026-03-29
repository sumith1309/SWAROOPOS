"use client";

import * as React from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addMonths, subMonths, isSameDay, isToday, getDate, getDaysInMonth, startOfMonth } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Day {
  date: Date;
  isToday: boolean;
  isSelected: boolean;
}

const EVENTS = [
  { title: "Team Standup", time: "9:00 AM", color: "#3B82F6" },
  { title: "Product Review", time: "2:00 PM", color: "#8B5CF6" },
  { title: "Design Sprint", time: "4:30 PM", color: "#10B981" },
];

export default function CalendarApp() {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [view, setView] = React.useState<"weekly" | "monthly">("monthly");

  const monthDays = React.useMemo(() => {
    const start = startOfMonth(currentMonth);
    const totalDays = getDaysInMonth(currentMonth);
    const days: Day[] = [];
    for (let i = 0; i < totalDays; i++) {
      const date = new Date(start.getFullYear(), start.getMonth(), i + 1);
      days.push({ date, isToday: isToday(date), isSelected: isSameDay(date, selectedDate) });
    }
    return days;
  }, [currentMonth, selectedDate]);

  const firstDayOfWeek = startOfMonth(currentMonth).getDay();
  const daysInMonth = getDaysInMonth(currentMonth);

  return (
    <div className="min-h-[480px] bg-[#F2F2F7]">
      {/* Top gradient header — iOS style */}
      <div
        className="px-6 pt-5 pb-4"
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #F8F9FE 100%)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        {/* Segmented control */}
        <div className="flex items-center justify-center mb-5">
          <div
            className="flex items-center rounded-[10px] p-[3px]"
            style={{
              background: "rgba(118,118,128,0.12)",
            }}
          >
            {(["weekly", "monthly"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  "relative rounded-[8px] px-5 py-[5px] text-[13px] font-semibold transition-all duration-200 capitalize",
                  view === v
                    ? "text-[#1C1C1E]"
                    : "text-[#8E8E93] hover:text-[#6B6B70]"
                )}
              >
                {view === v && (
                  <motion.div
                    layoutId="cal-tab"
                    className="absolute inset-0 rounded-[8px] bg-white"
                    style={{
                      boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{v}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Month navigation */}
        <div className="flex items-center justify-between mb-4">
          <AnimatePresence mode="wait">
            <motion.h2
              key={format(currentMonth, "MMMM yyyy")}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.2 }}
              className="text-[22px] font-bold text-[#1C1C1E] tracking-tight"
            >
              {format(currentMonth, "MMMM yyyy")}
            </motion.h2>
          </AnimatePresence>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="p-1.5 rounded-full text-[#3B82F6] hover:bg-[#3B82F6]/10 transition-colors active:scale-90"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="p-1.5 rounded-full text-[#3B82F6] hover:bg-[#3B82F6]/10 transition-colors active:scale-90"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-1">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="text-center text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wide py-1">
              {d}
            </div>
          ))}
        </div>

        {view === "weekly" ? (
          /* Scrollable week strip */
          <div className="overflow-x-auto -mx-6 px-6 pb-1" style={{ scrollbarWidth: "none" }}>
            <div className="flex gap-2">
              {monthDays.map((day) => (
                <button
                  key={format(day.date, "yyyy-MM-dd")}
                  onClick={() => setSelectedDate(day.date)}
                  className={cn(
                    "flex flex-col items-center gap-1 flex-shrink-0 rounded-2xl px-3 py-2 transition-all duration-200",
                    day.isSelected
                      ? "shadow-lg"
                      : "hover:bg-[rgba(0,0,0,0.04)]"
                  )}
                  style={
                    day.isSelected
                      ? {
                          background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                          boxShadow: "0 4px 14px rgba(59,130,246,0.35)",
                        }
                      : undefined
                  }
                >
                  <span
                    className={cn(
                      "text-[10px] font-bold uppercase",
                      day.isSelected ? "text-white/80" : "text-[#8E8E93]"
                    )}
                  >
                    {format(day.date, "EEE").slice(0, 3)}
                  </span>
                  <span
                    className={cn(
                      "text-[17px] font-bold",
                      day.isSelected
                        ? "text-white"
                        : day.isToday
                          ? "text-[#3B82F6]"
                          : "text-[#1C1C1E]"
                    )}
                  >
                    {getDate(day.date)}
                  </span>
                  {day.isToday && !day.isSelected && (
                    <div className="w-1 h-1 rounded-full bg-[#3B82F6]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Monthly grid */
          <div className="grid grid-cols-7 gap-y-1">
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`e${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
              const selected = isSameDay(date, selectedDate);
              const today = isToday(date);
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(date)}
                  className="flex flex-col items-center justify-center py-1 group"
                >
                  <div
                    className={cn(
                      "w-[34px] h-[34px] rounded-full flex items-center justify-center text-[15px] font-medium transition-all duration-200",
                      selected
                        ? "text-white font-semibold"
                        : today
                          ? "text-[#3B82F6] font-bold"
                          : "text-[#1C1C1E] group-hover:bg-[rgba(0,0,0,0.05)]"
                    )}
                    style={
                      selected
                        ? {
                            background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                            boxShadow: "0 2px 8px rgba(59,130,246,0.35)",
                          }
                        : undefined
                    }
                  >
                    {day}
                  </div>
                  {today && !selected && (
                    <div className="w-1 h-1 rounded-full bg-[#3B82F6] mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Events section */}
      <div className="px-5 py-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[15px] font-semibold text-[#1C1C1E]">
            {format(selectedDate, "EEEE, MMMM d")}
          </p>
          <button
            className="flex items-center gap-1 rounded-full px-3 py-1.5 text-[12px] font-semibold text-white transition-all active:scale-95"
            style={{
              background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
              boxShadow: "0 2px 8px rgba(59,130,246,0.3)",
            }}
          >
            <Plus className="h-3.5 w-3.5" />
            New Event
          </button>
        </div>

        {/* Event cards — iOS style */}
        <div className="space-y-2">
          {EVENTS.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 p-3 rounded-2xl bg-white transition-all hover:shadow-md"
              style={{
                border: "1px solid rgba(0,0,0,0.04)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              <div
                className="w-1 h-10 rounded-full flex-shrink-0"
                style={{ background: event.color }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold text-[#1C1C1E] truncate">{event.title}</p>
                <p className="text-[12px] text-[#8E8E93]">{event.time}</p>
              </div>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: `${event.color}12` }}
              >
                <div className="w-2 h-2 rounded-full" style={{ background: event.color }} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state hint */}
        {isToday(selectedDate) && (
          <p className="text-center text-[12px] text-[#C7C7CC] mt-4">
            Your schedule for today
          </p>
        )}
      </div>
    </div>
  );
}
