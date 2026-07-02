import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { getProduct, NAME } from "@/lib/data";
import SiteHeader from "@/components/site/SiteHeader";

export const metadata: Metadata = {
  title: `HRMS Platform — Case Study | ${NAME}`,
  description:
    "Engineering case study: a solo-built, multi-tenant HRMS live in production for 3 organizations and 80+ employees — architecture, ZKTeco BioTime integration, security hardening, 794-test suite, deployment.",
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

export default function HRMSCaseStudy() {
  const hrms = getProduct("hrms");

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <SiteHeader current="projects" />
      <main id="main-content" className="max-w-[760px] mx-auto px-5 py-10">
        <Link href="/projects" className="inline-flex items-center gap-1.5 min-h-[44px] text-[13px] font-semibold text-[#64748B] hover:text-[#0F172A] transition-colors mb-4">
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden /> All projects
        </Link>

        {/* Title block */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse-soft" aria-hidden />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#047857]">Live production</span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#475569] px-2 py-0.5 rounded-full bg-[rgba(15,23,42,0.04)]">Solo-built</span>
          </div>
          <h1 className="text-[34px] font-heading font-bold text-[#0F172A] tracking-[-0.02em] leading-[1.15] mb-3">
            HRMS Platform — a multi-tenant HR system one engineer took to production
          </h1>
          <p className="text-[15px] text-[#64748B] leading-relaxed">
            Built, deployed, and operated end-to-end by {NAME}. Live since 2026, running daily HR operations for
            3 organizations and 80+ employees.
          </p>
        </div>

        {/* Fact strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-10">
          <Fact value="3" label="Organizations" />
          <Fact value="80+" label="Daily users" />
          <Fact value="794" label="Tests" />
          <Fact value="12" label="Modules" />
        </div>

        <Section id="overview" title="Overview">
          <p>
            A multi-tenant Human Resource Management System covering the full employee lifecycle: attendance, leave,
            payroll, recruitment, performance, helpdesk, reports, dashboards, notifications, announcements, salary
            certificates, and employee management. Django 5.2 REST backend, Next.js 15 frontend, deployed on Render
            with AWS S3 file storage.
          </p>
        </Section>

        <Section id="problem" title="Problem">
          <p>
            Multiple organizations needed one HR platform where off-the-shelf tools didn&apos;t fit their workflows —
            including biometric attendance from ZKTeco field devices, organization-specific leave policy, and payroll
            settlement. Attendance, leave, and payroll ran on manual processes that didn&apos;t scale.
          </p>
        </Section>

        <Section id="users" title="Users">
          <p>
            80+ employees across 3 organizations use it daily — office staff and 64+ field employees whose attendance
            arrives from biometric devices. HR administrators run leave policy, payroll, and reporting through
            role-scoped dashboards.
          </p>
        </Section>

        <Section id="constraints" title="Constraints">
          <p>
            One engineer, real deadlines, real hardware: physical ZKTeco terminals in the field, timezone handling for
            distributed sites, tenant isolation on a single deployment, and a hard requirement that go-lives could not
            disrupt live HR operations.
          </p>
        </Section>

        <Section id="architecture" title="Architecture">
          <p className="font-mono text-[12.5px] leading-[1.9] bg-white border border-[rgba(15,23,42,0.06)] rounded-[12px] p-4">
            Next.js 15 Frontend → Django 5.2 REST API → PostgreSQL → Redis + Celery Workers → BioTime (ZKTeco) REST
            Integration → AWS S3 Storage → Render Deployment
          </p>
          <p>
            Multi-tenancy is enforced at the data layer so each organization sees only its own records. Celery workers
            handle asynchronous jobs — attendance sync, notifications, payroll runs — off the request path.
          </p>
        </Section>

        <Section id="features" title="Key features">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>All 12 HR modules built end-to-end by one engineer</li>
            <li>Organization-specific policy engine driving leave and attendance rules</li>
            <li>Payroll settlement with salary certificates</li>
            <li>Helpdesk, reports, dashboards, notifications, announcements</li>
          </ul>
        </Section>

        <Section id="biometric" title="Biometric integration">
          <p>
            BioTime (ZKTeco) devices are integrated over REST with timezone handling and employee mapping for 64+
            field employees — attendance recorded on physical terminals flows into the same policy engine as office
            check-ins.
          </p>
        </Section>

        <Section id="security" title="Security hardening">
          <p>
            Hardened against SQL injection, IDOR, CSRF, and XSS. Multi-tenant isolation is treated as a security
            boundary, not a convenience — cross-tenant access is denied at the query level.
          </p>
        </Section>

        <Section id="testing" title="Testing">
          <p>
            A 794-test suite backs the platform. Every phase shipped against explicit acceptance criteria and passed
            them fully — 10/10 and 14/14 across the delivery phases, with zero defects raised in production go-lives.
          </p>
        </Section>

        <Section id="deployment" title="Deployment">
          <p>
            Deployed on Render with PostgreSQL, Redis, and AWS S3, through a 6-phase delivery lifecycle from policy
            engine to biometric integration, payroll settlement, and production go-live.
          </p>
        </Section>

        <Section id="impact" title="Business impact">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>3 organizations run daily HR operations on it</li>
            <li>80+ employees use it every working day</li>
            <li>Biometric attendance eliminated manual field-attendance collection</li>
            <li>Estimated 30% reduction in operational delays from automating manual HR processes</li>
          </ul>
        </Section>

        <Section id="ownership" title="What I owned">
          <p>
            Everything: architecture, all 12 modules, the biometric integration, security hardening, the test suite,
            deployment, and production operations. Built with AI-assisted development (Claude Code) — human-led and
            personally accountable for every line that shipped.
          </p>
        </Section>

        <Section id="next" title="What I would improve next">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Move attendance-device sync to an event-driven pipeline with dead-letter handling</li>
            <li>Add per-tenant observability dashboards (error budgets, sync lag)</li>
            <li>Automate payroll reconciliation reports that are currently reviewed manually</li>
          </ul>
        </Section>

        {/* Links */}
        <div className="flex flex-wrap gap-2.5 pt-2 border-t border-[rgba(15,23,42,0.06)] mt-8">
          <a
            href={hrms?.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 min-h-[44px] px-5 rounded-full bg-[#0F172A] text-white text-[13px] font-semibold hover:bg-[#1E293B] transition-colors mt-4"
          >
            Open live system <ArrowUpRight className="w-3.5 h-3.5" aria-hidden />
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 min-h-[44px] px-5 rounded-full border border-[rgba(15,23,42,0.12)] text-[#334155] text-[13px] font-semibold hover:bg-[rgba(15,23,42,0.04)] transition-colors mt-4"
          >
            Discuss this project
          </Link>
        </div>
        <p className="text-[11px] font-mono text-[#94A3B8] mt-3">
          Live demo may take a few seconds to wake (free hosting). Code is private — it is a client system.
        </p>
      </main>
      <footer className="border-t border-[rgba(15,23,42,0.06)] py-8 text-center text-[12px] text-[#94A3B8]">
        {NAME} · Dubai, UAE · <Link href="/resume" className="underline underline-offset-2 hover:text-[#334155]">Resume</Link>
      </footer>
    </div>
  );
}
