"use client";

import { motion } from "framer-motion";
import { CONTACT } from "@/lib/data";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const SOCIAL_CARDS = [
  {
    title: "GitHub",
    subtitle: "18+ open source repositories",
    href: CONTACT.github,
    icon: <GitHubIcon className="w-5 h-5" />,
    gradient: "linear-gradient(135deg, #6366F1, #8B5CF6)",
    color: "#8B5CF6",
  },
  {
    title: "LinkedIn",
    subtitle: "Connect professionally",
    href: CONTACT.linkedin,
    icon: <LinkedInIcon className="w-5 h-5" />,
    gradient: "linear-gradient(135deg, #3B82F6, #06B6D4)",
    color: "#3B82F6",
  },
  {
    title: "Email",
    subtitle: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    icon: <Mail className="w-5 h-5" />,
    gradient: "linear-gradient(135deg, #EC4899, #F43F5E)",
    color: "#EC4899",
  },
  {
    title: "Phone",
    subtitle: CONTACT.phone,
    href: `tel:${CONTACT.phone}`,
    icon: <Phone className="w-5 h-5" />,
    gradient: "linear-gradient(135deg, #10B981, #14B8A6)",
    color: "#10B981",
  },
];

export default function ContactApp() {
  return (
    <div className="min-h-[450px] bg-[#F2F2F7]">
      {/* Header */}
      <div
        className="text-center px-6 pt-6 pb-5"
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #F8F9FE 100%)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <h2 className="text-[22px] font-heading font-bold text-[#1C1C1E] mb-1">Let&apos;s Connect</h2>
        <p className="text-[13px] text-[#8E8E93]">Available for opportunities</p>
        <div className="flex items-center justify-center gap-1.5 mt-2 text-[12px] text-[#6B6B70]">
          <MapPin className="w-3 h-3" />
          <span>{CONTACT.location} · {CONTACT.openTo}</span>
        </div>
      </div>

      {/* Contact cards — always expanded, iOS list style */}
      <div className="p-4 space-y-2">
        {SOCIAL_CARDS.map((card, i) => (
          <motion.a
            key={card.title}
            href={card.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
            className="flex items-center gap-4 p-4 rounded-2xl bg-white cursor-pointer group transition-all hover:shadow-lg active:scale-[0.98]"
            style={{
              border: "1px solid rgba(0,0,0,0.04)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            {/* Icon */}
            <div
              className="w-12 h-12 rounded-[14px] flex items-center justify-center text-white shrink-0 relative overflow-hidden"
              style={{ background: card.gradient }}
            >
              {/* Shine */}
              <div
                className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
                style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 100%)" }}
              />
              <span className="relative z-10">{card.icon}</span>
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-semibold text-[#1C1C1E] group-hover:text-[#3B82F6] transition-colors">{card.title}</p>
              <p className="text-[13px] text-[#8E8E93] truncate">{card.subtitle}</p>
            </div>

            <ExternalLink className="w-4 h-4 text-[#C7C7CC] group-hover:text-[#3B82F6] transition-colors shrink-0" />
          </motion.a>
        ))}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 text-center">
        <p className="text-[11px] text-[#C7C7CC]">Designed & Built by S. Jyothi Swaroop · 2026</p>
      </div>
    </div>
  );
}
