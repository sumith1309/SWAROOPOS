import { cn } from "@/lib/utils";

interface TechPillProps {
  label: string;
  color?: string;
  className?: string;
}

export default function TechPill({ label, color, className }: TechPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-[6px] text-[12px] font-mono",
        "border border-[rgba(255,255,255,0.1)] text-[#A1A1AA]",
        "transition-colors duration-200",
        className
      )}
      style={color ? { borderColor: `${color}33`, color: `${color}cc` } : undefined}
    >
      {label}
    </span>
  );
}
