import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, MapPin, FileText } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { NAME, ROLE_TITLE, CONTACT } from "@/lib/data";
import SiteHeader from "@/components/site/SiteHeader";
import { CopyEmailButton } from "@/components/site/ActionButtons";

export const metadata: Metadata = {
  title: `Contact — ${NAME} | SwaroopOS`,
  description: `Contact ${NAME}, ${ROLE_TITLE}, based in Dubai, UAE.`,
};

const rowClass =
  "flex items-center gap-4 rounded-[16px] bg-white border border-[rgba(15,23,42,0.06)] p-4 min-h-[64px] shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:shadow-[0_2px_4px_rgba(15,23,42,0.05),0_12px_32px_rgba(15,23,42,0.08)] transition-shadow";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <SiteHeader current="contact" />
      <main id="main-content" className="max-w-[640px] mx-auto px-5 py-10">
        <h1 className="text-[30px] font-heading font-bold text-[#0F172A] tracking-[-0.02em] mb-2">
          Let&apos;s talk
        </h1>
        <p className="text-[14px] text-[#64748B] mb-2">
          {ROLE_TITLE} — available for AI engineering, forward-deployed, and digital-transformation work.
        </p>
        <p className="flex items-center gap-1.5 text-[13px] text-[#64748B] mb-8">
          <MapPin className="w-3.5 h-3.5" aria-hidden />
          {CONTACT.location} · {CONTACT.openTo}
        </p>

        <div className="space-y-3">
          <div className={rowClass}>
            <span className="w-11 h-11 rounded-[13px] bg-[#0F172A] text-white flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" aria-hidden />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-semibold text-[#0F172A]">Email</p>
              <a href={`mailto:${CONTACT.email}`} className="text-[13px] text-[#1d4ed8] underline underline-offset-2 break-all">
                {CONTACT.email}
              </a>
            </div>
            <CopyEmailButton email={CONTACT.email} />
          </div>

          <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className={rowClass}>
            <span className="w-11 h-11 rounded-[13px] bg-[#059669] text-white flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" aria-hidden />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-semibold text-[#0F172A]">Phone / WhatsApp</p>
              <p className="text-[13px] text-[#64748B]">{CONTACT.phone} <span className="text-[#94A3B8]">(Indian number · based in Dubai — WhatsApp works best)</span></p>
            </div>
          </a>

          <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className={rowClass}>
            <span className="w-11 h-11 rounded-[13px] bg-[#1d4ed8] text-white flex items-center justify-center shrink-0">
              <LinkedInIcon className="w-5 h-5" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-semibold text-[#0F172A]">LinkedIn</p>
              <p className="text-[13px] text-[#64748B] truncate">{CONTACT.linkedin.replace("https://", "")}</p>
            </div>
          </a>

          <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className={rowClass}>
            <span className="w-11 h-11 rounded-[13px] bg-[#334155] text-white flex items-center justify-center shrink-0">
              <GitHubIcon className="w-5 h-5" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-semibold text-[#0F172A]">GitHub</p>
              <p className="text-[13px] text-[#64748B] truncate">{CONTACT.github.replace("https://", "")}</p>
            </div>
          </a>

          <Link href="/resume" className={rowClass}>
            <span className="w-11 h-11 rounded-[13px] bg-[#7C3AED] text-white flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" aria-hidden />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-semibold text-[#0F172A]">Resume</p>
              <p className="text-[13px] text-[#64748B]">View online or download</p>
            </div>
          </Link>
        </div>

        <p className="text-[12px] text-[#94A3B8] text-center mt-10">
          Designed & built by {NAME} · SwaroopOS · 2026
        </p>
      </main>
    </div>
  );
}
