import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { NAME } from "@/lib/data";
import SiteHeader from "@/components/site/SiteHeader";

export const metadata: Metadata = {
  title: `ALIA — Agentic AI Case Study | ${NAME}`,
  description:
    "Engineering case study: ALIA, a production agentic AI teaching assistant — multi-turn tool-calling agent, LangChain RAG pipeline grounded in real course materials, pgvector, self-hosted on AWS EC2. Solo-built inside a team LMS.",
};

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="mb-10">
      <h2 id={`${id}-h`} className="text-[13px] uppercase tracking-[0.18em] font-bold font-mono text-[#475569] mb-3">
        {title}
      </h2>
      <div className="text-[14.5px] text-[#334155] leading-[1.75] space-y-3">{children}</div>
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[12px] bg-white border border-[rgba(15,23,42,0.06)] px-4 py-3">
      <div className="text-[17px] font-heading font-bold text-[#0F172A] leading-tight">{value}</div>
      <div className="text-[10px] uppercase tracking-[0.12em] font-semibold text-[#94A3B8] mt-1">{label}</div>
    </div>
  );
}

export default function ALIACaseStudy() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <SiteHeader current="projects" />
      <main id="main-content" className="max-w-[760px] mx-auto px-5 py-10">
        <Link href="/projects" className="inline-flex items-center gap-1.5 min-h-[44px] text-[13px] font-semibold text-[#64748B] hover:text-[#0F172A] transition-colors mb-4">
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden /> All projects
        </Link>

        {/* Title block */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse-soft" aria-hidden />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#047857]">In production</span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6D28D9] px-2 py-0.5 rounded-full bg-[rgba(139,92,246,0.07)]">Team LMS — my system, solo-built</span>
          </div>
          <h1 className="text-[34px] font-heading font-bold text-[#0F172A] tracking-[-0.02em] leading-[1.15] mb-3">
            ALIA — an agentic AI teaching assistant grounded in real course materials
          </h1>
          <p className="text-[15px] text-[#64748B] leading-relaxed">
            A multi-turn, tool-calling AI agent with a RAG pipeline over actual course content, designed, built, and
            self-hosted end-to-end by {NAME} inside a team-built LMS.
          </p>
        </div>

        {/* Fact strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-10">
          <Fact value="Agentic" label="Multi-turn + tools" />
          <Fact value="RAG" label="Course-grounded" />
          <Fact value="pgvector" label="Embedding store" />
          <Fact value="AWS EC2" label="Self-hosted" />
        </div>

        <Section id="overview" title="Overview">
          <p>
            ALIA is the AI teaching assistant inside the LMS at LUC Learners. It is not a thin chat wrapper: a
            multi-turn agent decides when to call tools, and a LangChain RAG pipeline retrieves from the
            institution&apos;s actual course materials before answering — so responses cite what the course really
            says instead of hallucinating. The full stack — agent, retrieval pipeline, embeddings, and model
            hosting — runs self-hosted on AWS EC2.
          </p>
        </Section>

        <Section id="problem" title="Problem">
          <p>
            Students wanted instant help with course content, but a generic chatbot is worse than nothing in
            education — a confident wrong answer about an assignment or syllabus damages trust. The assistant had
            to answer from the institution&apos;s own materials, hold context across a real conversation, and run
            within the organization&apos;s own infrastructure.
          </p>
        </Section>

        <Section id="users" title="Users">
          <p>
            Students and staff of the LMS use ALIA for course-content questions. It lives inside the same platform
            where they already study, signed in through the SSO I also built (Microsoft Entra ID + Google
            OAuth/OIDC).
          </p>
        </Section>

        <Section id="constraints" title="Constraints">
          <p>
            Answers had to be grounded in course materials, not general model knowledge. The stack had to be
            self-hosted — course content stays on infrastructure the organization controls — which meant owning the
            full pipeline on AWS EC2 rather than calling a managed RAG service. And it had to work inside an LMS
            being built in parallel by a team.
          </p>
        </Section>

        <Section id="architecture" title="Architecture">
          <p className="font-mono text-[12.5px] leading-[1.9] bg-white border border-[rgba(15,23,42,0.06)] rounded-[12px] p-4">
            React Frontend → FastAPI → Multi-turn Tool-calling Agent → LangChain RAG Pipeline (course materials) →
            pgvector Embeddings → PostgreSQL → Redis Cache → Self-hosted on AWS EC2
          </p>
          <p>
            The agent orchestrates the conversation: it maintains multi-turn state, decides when a question needs
            retrieval, and calls tools accordingly. Retrieval runs over course-material embeddings stored in
            pgvector; Redis caches hot paths off the request cycle.
          </p>
        </Section>

        <Section id="agent" title="Agent design">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Multi-turn conversation state — follow-up questions keep their context</li>
            <li>Tool calling — the agent chooses retrieval and other tools instead of always answering directly</li>
            <li>Grounding contract: course-content answers come from retrieved material, not model memory</li>
          </ul>
        </Section>

        <Section id="rag" title="RAG grounding">
          <p>
            Course materials are chunked and embedded into pgvector. At question time the pipeline retrieves the
            relevant chunks and the agent answers from them — the difference between &quot;an AI that sounds right&quot;
            and &quot;an AI that says what the course says.&quot; This is real retrieval-augmented generation, which is
            exactly why this portfolio is careful to reserve the term for systems like this one.
          </p>
        </Section>

        <Section id="deployment" title="Deployment">
          <p>
            Self-hosted on AWS EC2: the API, the RAG pipeline, the vector store, and the model serving all run on
            infrastructure I set up and operate. Staging is access-restricted (a real institution&apos;s course data
            lives behind it), and the code is private.
          </p>
        </Section>

        <Section id="ownership" title="What I owned">
          <p>
            The LMS itself is a team build — I was one of several developers, and I don&apos;t claim otherwise. Three
            of its systems are mine end-to-end: ALIA (agent, RAG pipeline, EC2 hosting — everything on this page),
            the support-ticket system (department routing, SLA tracking, escalation), and SSO via Microsoft Entra ID
            and Google OAuth/OIDC. Built with AI-assisted development (Claude Code) — human-led, personally
            accountable for every line that shipped.
          </p>
        </Section>

        <Section id="next" title="What I would improve next">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>An evaluation harness scoring answer groundedness against the retrieved chunks</li>
            <li>Retrieval quality metrics (hit rate, reranking) surfaced to a monitoring dashboard</li>
            <li>Per-course retrieval scoping so cross-course bleed is structurally impossible</li>
          </ul>
        </Section>

        {/* Links */}
        <div className="flex flex-wrap gap-2.5 pt-2 border-t border-[rgba(15,23,42,0.06)] mt-8">
          <a
            href="https://admin.learnerseducation.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 min-h-[44px] px-5 rounded-full bg-[#0F172A] text-white text-[13px] font-semibold hover:bg-[#1E293B] transition-colors mt-4"
          >
            Open live LMS <ArrowUpRight className="w-3.5 h-3.5" aria-hidden />
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 min-h-[44px] px-5 rounded-full border border-[rgba(15,23,42,0.12)] text-[#334155] text-[13px] font-semibold hover:bg-[rgba(15,23,42,0.04)] transition-colors mt-4"
          >
            Discuss this project
          </Link>
          <Link
            href="/projects/hrms"
            className="inline-flex items-center gap-1.5 min-h-[44px] px-5 rounded-full border border-[rgba(15,23,42,0.12)] text-[#334155] text-[13px] font-semibold hover:bg-[rgba(15,23,42,0.04)] transition-colors mt-4"
          >
            Next case study: HRMS
          </Link>
        </div>
        <p className="text-[11px] font-mono text-[#94A3B8] mt-3">
          The live platform is login-gated (it runs on a real institution&apos;s data) and the platform itself is a
          team build — this page claims only the systems I own. Code is private.
        </p>
      </main>
      <footer className="border-t border-[rgba(15,23,42,0.06)] py-8 text-center text-[12px] text-[#94A3B8]">
        {NAME} · Dubai, UAE · <Link href="/resume" className="underline underline-offset-2 hover:text-[#334155]">Resume</Link>
      </footer>
    </div>
  );
}
