import { cn } from "@/lib/utils";

interface DomainBadgeProps {
  label: string;
  color: string;
  className?: string;
}

export default function DomainBadge({ label, color, className }: DomainBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-[11px] font-medium uppercase tracking-[0.05em]",
        className
      )}
      style={{
        backgroundColor: `${color}15`,
        color: color,
        border: `1px solid ${color}30`,
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}
