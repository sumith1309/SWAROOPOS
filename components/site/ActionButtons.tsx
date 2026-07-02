"use client";

import { useState } from "react";
import { Printer, Copy, Check } from "lucide-react";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-1.5 min-h-[44px] px-5 rounded-full border border-[rgba(15,23,42,0.12)] text-[#334155] text-[13px] font-semibold hover:bg-[rgba(15,23,42,0.04)] transition-colors cursor-pointer"
    >
      <Printer className="w-4 h-4" aria-hidden />
      Print / Save as PDF
    </button>
  );
}

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — the mailto link next to this button still works.
    }
  };

  return (
    <button
      onClick={copy}
      aria-live="polite"
      className="inline-flex items-center gap-1.5 min-h-[44px] px-5 rounded-full border border-[rgba(15,23,42,0.12)] text-[#334155] text-[13px] font-semibold hover:bg-[rgba(15,23,42,0.04)] transition-colors cursor-pointer"
    >
      {copied ? <Check className="w-4 h-4 text-[#059669]" aria-hidden /> : <Copy className="w-4 h-4" aria-hidden />}
      {copied ? "Copied" : "Copy email"}
    </button>
  );
}
