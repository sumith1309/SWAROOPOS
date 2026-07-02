import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  ALL_PRODUCTS,
  CATEGORY_ORDER,
  CATEGORY_LABELS,
  OWNERSHIP_LABELS,
  getStatusChips,
  NAME,
  type Product,
} from "@/lib/data";
import SiteHeader from "@/components/site/SiteHeader";

export const metadata: Metadata = {
  title: `Projects — ${NAME} | SwaroopOS`,
  description:
    "26 systems built across production, AI agents, ML experiments, and business tools — honestly categorized, production work first.",
};

function ProjectCard({ p }: { p: Product }) {
  const chips = getStatusChips(p);
  return (
    <article className="rounded-[16px] bg-white border border-[rgba(15,23,42,0.06)] p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="flex items-start justify-between gap-3 mb-1.5">
        <h3 className="text-[16px] font-heading font-bold text-[#0F172A] tracking-[-0.01em]">{p.name}</h3>
        <span className="text-[11px] font-mono text-[#94A3B8] shrink-0">{p.year}</span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {chips.map((c) => (
          <span
            key={c}
            className={`text-[9.5px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold ${
              c.includes("Live")
                ? "text-[#047857] bg-[rgba(16,185,129,0.08)] border border-[rgba(16,185,129,0.18)]"
                : c.includes("Team")
                  ? "text-[#6D28D9] bg-[rgba(139,92,246,0.07)] border border-[rgba(139,92,246,0.16)]"
                  : "text-[#475569] bg-[rgba(15,23,42,0.04)] border border-[rgba(15,23,42,0.07)]"
            }`}
          >
            {c}
          </span>
        ))}
      </div>

      <p className="text-[13px] text-[#475569] leading-relaxed mb-3">{p.tagline}</p>
      {p.impact && <p className="text-[12.5px] text-[#64748B] leading-relaxed mb-3">{p.impact}</p>}

      <p className="text-[11px] text-[#64748B] leading-relaxed mb-4">
        <span className="font-semibold text-[#334155]">Role: </span>
        {p.role} <span className="text-[#94A3B8]">({OWNERSHIP_LABELS[p.ownership]})</span>
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {p.techStack.flatMap((c) => c.items).slice(0, 8).map((t) => (
          <span key={t} className="text-[10.5px] font-mono text-[#475569] px-2 py-0.5 rounded-md bg-[rgba(15,23,42,0.035)]">
            {t}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {p.caseStudy && (
          <Link href={p.caseStudy} className="inline-flex items-center gap-1 min-h-[40px] px-3.5 rounded-full bg-[#0F172A] text-white text-[12px] font-semibold hover:bg-[#1E293B] transition-colors">
            Case study <ArrowUpRight className="w-3 h-3" aria-hidden />
          </Link>
        )}
        {p.website && (
          <a href={p.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 min-h-[40px] px-3.5 rounded-full border border-[rgba(15,23,42,0.12)] text-[#334155] text-[12px] font-semibold hover:bg-[rgba(15,23,42,0.04)] transition-colors">
            Open live {p.coldStart ? "(may take a few seconds to wake)" : ""} <ArrowUpRight className="w-3 h-3" aria-hidden />
          </a>
        )}
        {p.github && (
          <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 min-h-[40px] px-3.5 rounded-full border border-[rgba(15,23,42,0.12)] text-[#334155] text-[12px] font-semibold hover:bg-[rgba(15,23,42,0.04)] transition-colors">
            Source <ArrowUpRight className="w-3 h-3" aria-hidden />
          </a>
        )}
        {!p.website && !p.github && (
          <span className="inline-flex items-center min-h-[40px] text-[11px] font-mono text-[#94A3B8]">code private</span>
        )}
      </div>
    </article>
  );
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <SiteHeader current="projects" />
      <main className="max-w-[1100px] mx-auto px-5 py-10">
        <h1 className="text-[30px] font-heading font-bold text-[#0F172A] tracking-[-0.02em] mb-2">
          Work, production first
        </h1>
        <p className="text-[14px] text-[#64748B] mb-10 max-w-[62ch]">
          {ALL_PRODUCTS.length} systems built across production, AI agents, ML experiments, and business tools.
          Every card states exactly what it is, who uses it, what I owned, and whether it is live, source-only, or a concept.
        </p>

        {CATEGORY_ORDER.map((cat) => {
          const items = ALL_PRODUCTS.filter((p) => p.tier === cat);
          if (items.length === 0) return null;
          return (
            <section key={cat} aria-label={CATEGORY_LABELS[cat]} className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <h2 className="text-[13px] uppercase tracking-[0.18em] font-bold font-mono text-[#475569]">
                  {CATEGORY_LABELS[cat]}
                </h2>
                <span className="text-[11px] font-mono text-[#94A3B8]">{items.length}</span>
                <div className="flex-1 h-[1px] bg-[rgba(15,23,42,0.06)]" />
              </div>
              <div className={`grid gap-4 ${cat === "production" || cat === "business" ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"}`}>
                {items.map((p) => (
                  <ProjectCard key={p.id} p={p} />
                ))}
              </div>
            </section>
          );
        })}
      </main>
      <footer className="border-t border-[rgba(15,23,42,0.06)] py-8 text-center text-[12px] text-[#94A3B8]">
        {NAME} · Dubai, UAE · <Link href="/contact" className="underline underline-offset-2 hover:text-[#334155]">Contact</Link>
      </footer>
    </div>
  );
}
