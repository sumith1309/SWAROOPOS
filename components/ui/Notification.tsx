"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface NotificationProps {
  title: string;
  message: string;
  visible: boolean;
  onDismiss: () => void;
  onAction?: () => void;
  actionLabel?: string;
  accentColor?: string;
}

export default function Notification({ title, message, visible, onDismiss, onAction, actionLabel, accentColor = "#3B82F6" }: NotificationProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="glass rounded-[10px] p-4 w-[320px] shadow-lg"
        >
          <div className="flex items-start gap-3">
            <span
              className="w-2 h-2 rounded-full mt-1.5 shrink-0"
              style={{ backgroundColor: accentColor }}
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-[13px] font-heading font-medium text-[#FAFAFA]">{title}</h4>
              <p className="text-[12px] text-[#71717A] mt-0.5">{message}</p>
              <div className="flex gap-2 mt-2">
                {onAction && actionLabel && (
                  <button
                    onClick={onAction}
                    className="text-[11px] font-medium cursor-pointer transition-colors"
                    style={{ color: accentColor }}
                  >
                    {actionLabel}
                  </button>
                )}
                <button
                  onClick={onDismiss}
                  className="text-[11px] text-[#71717A] hover:text-[#A1A1AA] cursor-pointer transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
