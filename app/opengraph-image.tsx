import { ImageResponse } from "next/og";
import { NAME, ROLE_TITLE, HEADLINE } from "@/lib/data";

export const alt = `${NAME} — ${ROLE_TITLE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PROOF = [
  "HRMS live · 3 orgs · 80+ daily users",
  "ZKTeco BioTime integration",
  "794-test multi-tenant Django build",
];

// Link-preview card for LinkedIn / WhatsApp / Slack — deep graphite,
// one accent, proof chips. Rendered at build time by next/og.
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(145deg, #0B1220 0%, #0F172A 55%, #111C33 100%)",
          color: "#F8FAFC",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 28, letterSpacing: "-0.02em" }}>
            <span style={{ fontWeight: 700 }}>Swaroop</span>
            <span style={{ color: "#64748B", fontWeight: 500 }}>OS</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 20,
              color: "#94A3B8",
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: 999, background: "#10B981" }} />
            Dubai, UAE
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 34, color: "#93C5FD", fontWeight: 600, marginBottom: 14 }}>
            {NAME}
          </div>
          <div style={{ fontSize: 58, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, maxWidth: 980 }}>
            {HEADLINE}
          </div>
          <div style={{ fontSize: 26, color: "#94A3B8", marginTop: 18 }}>{ROLE_TITLE}</div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {PROOF.map((p) => (
            <div
              key={p}
              style={{
                display: "flex",
                fontSize: 19,
                color: "#CBD5E1",
                padding: "12px 20px",
                borderRadius: 999,
                border: "1px solid rgba(148, 163, 184, 0.25)",
                background: "rgba(148, 163, 184, 0.08)",
              }}
            >
              {p}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
