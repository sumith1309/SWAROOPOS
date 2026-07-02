import Link from "next/link";
import Monogram from "@/components/ui/Monogram";

/** Shared header for the deep-link pages (/projects, /resume, /contact). */
export default function SiteHeader({ current }: { current?: "projects" | "resume" | "contact" }) {
  const link = (href: string, label: string, key: string) => (
    <Link
      href={href}
      aria-current={current === key ? "page" : undefined}
      className={`min-h-[44px] inline-flex items-center px-3 rounded-full text-[13px] font-semibold transition-colors ${
        current === key ? "bg-[#0F172A] text-white" : "text-[#334155] hover:bg-[rgba(15,23,42,0.05)]"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 bg-[rgba(250,250,248,0.85)] backdrop-blur-md border-b border-[rgba(15,23,42,0.06)]">
      <div className="max-w-[1100px] mx-auto px-5 h-14 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2 min-h-[44px]" aria-label="SwaroopOS home">
          <Monogram size={24} />
          <span className="font-heading font-bold text-[14px] text-[#0F172A]">SwaroopOS</span>
        </Link>
        <nav aria-label="Site" className="ml-auto flex items-center gap-1">
          {link("/projects", "Projects", "projects")}
          {link("/resume", "Resume", "resume")}
          {link("/contact", "Contact", "contact")}
        </nav>
      </div>
    </header>
  );
}
