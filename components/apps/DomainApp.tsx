"use client";

import { type Domain, DOMAINS, getProductsByDomain } from "@/lib/data";
import { useStore } from "@/lib/store";
import EducationTheme from "../domain-themes/EducationTheme";
import ClimateTheme from "../domain-themes/ClimateTheme";
import EnterpriseTheme from "../domain-themes/EnterpriseTheme";
import FintechTheme from "../domain-themes/FintechTheme";
import ConstructionTheme from "../domain-themes/ConstructionTheme";
import ProductCard from "./ProductCard";

const THEME_HEADERS: Record<Domain, React.ComponentType> = {
  education: EducationTheme,
  climate: ClimateTheme,
  enterprise: EnterpriseTheme,
  fintech: FintechTheme,
  construction: ConstructionTheme,
};

export default function DomainApp({ domain }: { domain: Domain }) {
  const setActiveProjectId = useStore((s) => s.setActiveProjectId);
  const domainInfo = DOMAINS[domain];
  const products = getProductsByDomain(domain);
  const ThemeHeader = THEME_HEADERS[domain];

  return (
    <div className="min-h-[400px]">
      {/* Themed header */}
      <ThemeHeader />

      {/* Construction domain: Origin story panel before products */}
      {domain === "construction" && (
        <div className="px-5 pb-4">
          <div className="rounded-[14px] p-4" style={{ background: "rgba(239, 68, 68, 0.04)", border: "1px solid rgba(239, 68, 68, 0.08)" }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-mono text-[#64748B]">2019 – 2024</span>
              <span className="px-1.5 py-0.5 text-[10px] rounded bg-[rgba(239,68,68,0.1)] text-[#EF4444] font-mono">ORIGIN</span>
            </div>
            <h3 className="text-[16px] font-heading font-medium text-[#0F172A] mb-1">Geetha Constructions</h3>
            <p className="text-[13px] text-[#64748B] mb-1">Partner & Operations Manager · Hyderabad, India</p>
            <p className="text-[13px] text-[#94A3B8] leading-relaxed">
              5 years co-managing residential and commercial construction projects. Reduced operational delays by 30%.
              Built data-driven decision-making processes across multi-million rupee projects.
            </p>
            <p className="text-[12px] text-[#64748B] mt-2 italic">&quot;Where the builder was born&quot;</p>
          </div>
        </div>
      )}

      {/* Products */}
      <div className="px-5 pb-5 space-y-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onOpen={() => setActiveProjectId(product.id)}
          />
        ))}
      </div>
    </div>
  );
}
