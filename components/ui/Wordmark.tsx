/**
 * Typographic wordmark — no icon tile, no accent dot. "OS" is de-emphasized
 * so the mark reads as a product name, not a decorated badge.
 */
export default function Wordmark({
  dark = false,
  className = "",
}: {
  dark?: boolean;
  className?: string;
}) {
  return (
    <span className={`font-heading font-bold text-[14.5px] tracking-[-0.03em] leading-none select-none ${className}`}>
      <span className={dark ? "text-white" : "text-[#0F172A]"}>Swaroop</span>
      <span className={dark ? "text-white/40" : "text-[#94A3B8]"}>OS</span>
    </span>
  );
}
