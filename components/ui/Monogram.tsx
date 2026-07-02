/**
 * Refined "S" monogram — ink tile, hairline inner highlight, display serif-free
 * letterform. Replaces the old circuit-board clip-art mark.
 */
export default function Monogram({ size = 24, radius }: { size?: number; radius?: number }) {
  const r = radius ?? Math.round(size * 0.28);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      role="img"
      aria-label="SwaroopOS"
      style={{ display: "block" }}
    >
      <rect x="1" y="1" width="30" height="30" rx={r} fill="#0F172A" />
      <rect x="1" y="1" width="30" height="30" rx={r} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
      <text
        x="16"
        y="21.5"
        textAnchor="middle"
        fontFamily="var(--font-space-grotesk), system-ui, sans-serif"
        fontWeight="700"
        fontSize="17"
        fill="#FFFFFF"
        letterSpacing="-0.5"
      >
        S
      </text>
      <circle cx="24.5" cy="8.5" r="2" fill="#10B981" />
    </svg>
  );
}
