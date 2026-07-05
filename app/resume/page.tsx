import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";
import {
  NAME,
  ROLE_TITLE,
  HEADLINE,
  PROFESSIONAL_SUMMARY,
  CAREER,
  EDUCATION,
  SKILLS,
  CERTIFICATIONS,
  LANGUAGES,
  CONTACT,
  PRODUCTION_PRODUCTS,
  FEATURED_AGENT_PRODUCTS,
  getOwnershipLabel,
} from "@/lib/data";
import SiteHeader from "@/components/site/SiteHeader";
import { PrintButton } from "@/components/site/ActionButtons";

export const metadata: Metadata = {
  title: `Resume — ${NAME} | SwaroopOS`,
  description: `${ROLE_TITLE}. ${HEADLINE}`,
};

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="print:hidden">
        <SiteHeader current="resume" />
      </div>

      <main id="main-content" className="max-w-[760px] mx-auto px-5 py-10 print:py-2">
        {/* Actions */}
        <div className="flex flex-wrap gap-2.5 mb-8 print:hidden">
          <PrintButton />
          <a
            href="/api/cv"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 min-h-[44px] px-5 rounded-full bg-[#1d4ed8] text-white text-[13px] font-semibold hover:bg-[#1e40af] transition-colors"
          >
            <Download className="w-4 h-4" aria-hidden />
            Download
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center min-h-[44px] px-5 rounded-full border border-[rgba(15,23,42,0.12)] text-[#334155] text-[13px] font-semibold hover:bg-[rgba(15,23,42,0.04)] transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-[30px] font-heading font-bold text-[#0F172A] tracking-[-0.02em]">{NAME}</h1>
          <p className="text-[15px] font-semibold text-[#1d4ed8] mt-0.5">{ROLE_TITLE}</p>
          <p className="text-[12.5px] text-[#64748B] mt-2">
            {CONTACT.location} · {CONTACT.openTo} ·{" "}
            <a className="underline underline-offset-2" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> ·{" "}
            {CONTACT.phone} ·{" "}
            <a className="underline underline-offset-2" href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a> ·{" "}
            <a className="underline underline-offset-2" href={CONTACT.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          </p>
        </header>

        <p className="text-[14px] text-[#334155] leading-[1.75] mb-9">{PROFESSIONAL_SUMMARY}</p>

        {/* Experience */}
        <section aria-labelledby="exp-h" className="mb-9">
          <h2 id="exp-h" className="text-[13px] uppercase tracking-[0.18em] font-bold font-mono text-[#475569] border-b border-[rgba(15,23,42,0.08)] pb-2 mb-4">
            Experience
          </h2>
          {CAREER.map((c) => (
            <div key={c.version} className="mb-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className="text-[15px] font-heading font-bold text-[#0F172A]">
                  {c.role} — {c.company}
                </h3>
                <span className="text-[11.5px] font-mono text-[#94A3B8]">{c.period} · {c.location}</span>
              </div>
              <ul className="list-disc pl-5 mt-1.5 space-y-1 text-[13px] text-[#334155] leading-relaxed">
                {c.highlights.map((h) => <li key={h}>{h}</li>)}
              </ul>
              {c.stack.length > 0 && (
                <p className="text-[11px] font-mono text-[#94A3B8] mt-1.5">Stack: {c.stack.join(", ")}</p>
              )}
            </div>
          ))}
        </section>

        {/* Production & client systems */}
        <section aria-labelledby="prod-h" className="mb-9">
          <h2 id="prod-h" className="text-[13px] uppercase tracking-[0.18em] font-bold font-mono text-[#475569] border-b border-[rgba(15,23,42,0.08)] pb-2 mb-4">
            Production & Client Systems
          </h2>
          {PRODUCTION_PRODUCTS.map((p) => (
            <div key={p.id} className="mb-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className="text-[14px] font-heading font-bold text-[#0F172A]">
                  {p.name}
                  <span className="font-medium text-[#64748B]"> — {getOwnershipLabel(p)}{p.status === "live" ? " · Live" : ""}</span>
                </h3>
                <span className="text-[11.5px] font-mono text-[#94A3B8]">{p.year}</span>
              </div>
              <p className="text-[13px] text-[#334155] mt-1">{p.tagline}</p>
              {(p.website || p.github) && (
                <p className="text-[11.5px] text-[#64748B] mt-0.5">
                  {p.website && <a className="underline underline-offset-2" href={p.website} target="_blank" rel="noopener noreferrer">{p.website.replace("https://", "")}</a>}
                  {p.website && p.github && " · "}
                  {p.github && <a className="underline underline-offset-2" href={p.github} target="_blank" rel="noopener noreferrer">{p.github.replace("https://", "")}</a>}
                </p>
              )}
            </div>
          ))}
        </section>

        {/* AI & agent systems */}
        <section aria-labelledby="agents-h" className="mb-9">
          <h2 id="agents-h" className="text-[13px] uppercase tracking-[0.18em] font-bold font-mono text-[#475569] border-b border-[rgba(15,23,42,0.08)] pb-2 mb-4">
            AI &amp; Agent Systems
          </h2>
          {FEATURED_AGENT_PRODUCTS.map((p) => (
            <div key={p.id} className="mb-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className="text-[14px] font-heading font-bold text-[#0F172A]">
                  {p.name}
                  <span className="font-medium text-[#64748B]"> — {getOwnershipLabel(p)}{p.status === "live" ? " · Live" : ""}</span>
                </h3>
                <span className="text-[11.5px] font-mono text-[#94A3B8]">{p.year}</span>
              </div>
              <p className="text-[13px] text-[#334155] mt-1">{p.tagline}</p>
              {(p.website || p.github) && (
                <p className="text-[11.5px] text-[#64748B] mt-0.5">
                  {p.website && <a className="underline underline-offset-2" href={p.website} target="_blank" rel="noopener noreferrer">{p.website.replace("https://", "")}</a>}
                  {p.website && p.github && " · "}
                  {p.github && <a className="underline underline-offset-2" href={p.github} target="_blank" rel="noopener noreferrer">{p.github.replace("https://", "")}</a>}
                </p>
              )}
            </div>
          ))}
        </section>

        {/* Education */}
        <section aria-labelledby="edu-h" className="mb-9">
          <h2 id="edu-h" className="text-[13px] uppercase tracking-[0.18em] font-bold font-mono text-[#475569] border-b border-[rgba(15,23,42,0.08)] pb-2 mb-4">
            Education
          </h2>
          {EDUCATION.map((e) => (
            <div key={e.institution} className="mb-3">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className="text-[14px] font-heading font-bold text-[#0F172A]">{e.degree}</h3>
                <span className="text-[11.5px] font-mono text-[#94A3B8]">{e.period}</span>
              </div>
              <p className="text-[13px] text-[#334155]">{e.institution} · {e.campuses}</p>
            </div>
          ))}
        </section>

        {/* Skills */}
        <section aria-labelledby="skills-h" className="mb-9">
          <h2 id="skills-h" className="text-[13px] uppercase tracking-[0.18em] font-bold font-mono text-[#475569] border-b border-[rgba(15,23,42,0.08)] pb-2 mb-4">
            Skills
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {Object.entries(SKILLS).map(([cat, items]) => (
              <div key={cat}>
                <h3 className="text-[12.5px] font-bold text-[#0F172A] mb-1">{cat}</h3>
                <p className="text-[12.5px] text-[#475569] leading-relaxed">{(items as string[]).join(", ")}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications + Languages */}
        <section aria-labelledby="cert-h" className="mb-6">
          <h2 id="cert-h" className="text-[13px] uppercase tracking-[0.18em] font-bold font-mono text-[#475569] border-b border-[rgba(15,23,42,0.08)] pb-2 mb-4">
            Certifications & Languages
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-[13px] text-[#334155]">
            {CERTIFICATIONS.map((c) => <li key={c}>{c}</li>)}
          </ul>
          <p className="text-[12.5px] text-[#475569] mt-3">
            {LANGUAGES.map((l) => `${l.name}: ${l.level}`).join(" · ")}
          </p>
        </section>
      </main>
    </div>
  );
}
