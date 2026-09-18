import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "RyxerMart | Professional Website, E-Commerce & Web Solutions Agency";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#0B1120",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, #0E387A 0%, transparent 50%), radial-gradient(circle at 75% 75%, #5925D4 0%, transparent 50%)",
          padding: "60px 80px",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        {/* Top Header Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#6C3CE9",
              color: "#FFFFFF",
              fontWeight: 900,
              fontSize: 28,
              width: 56,
              height: 56,
              borderRadius: 16,
              boxShadow: "0 10px 25px rgba(108, 60, 233, 0.4)",
            }}
          >
            R
          </div>
          <span
            style={{
              fontSize: 32,
              fontWeight: 900,
              color: "#FFFFFF",
              letterSpacing: "-0.5px",
            }}
          >
            RyxerMart
          </span>
          <span
            style={{
              marginLeft: 16,
              padding: "6px 16px",
              backgroundColor: "rgba(108, 60, 233, 0.2)",
              border: "1px solid rgba(108, 60, 233, 0.5)",
              color: "#C4B5FD",
              fontSize: 18,
              fontWeight: 700,
              borderRadius: 9999,
            }}
          >
            India's Leading Web Solutions Agency
          </span>
        </div>

        {/* Main Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h1
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: "#FFFFFF",
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
              margin: 0,
            }}
          >
            High-Performing Websites &amp; E-Commerce Stores
          </h1>
          <p
            style={{
              fontSize: 26,
              color: "#94A3B8",
              margin: 0,
              lineHeight: 1.4,
              maxWidth: 950,
            }}
          >
            Starting at ₹3,499 • 1 Year Free High-Speed SSD Hosting • Free SSL Certificate • 3–5 Day Fast Delivery
          </p>
        </div>

        {/* Footer badges */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(148, 163, 184, 0.2)",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", gap: "32px" }}>
            <span style={{ color: "#38BDF8", fontSize: 20, fontWeight: 700 }}>
              ✓ 100% Mobile Responsive
            </span>
            <span style={{ color: "#34D399", fontSize: 20, fontWeight: 700 }}>
              ✓ Free SSL &amp; Hosting
            </span>
            <span style={{ color: "#FBBF24", fontSize: 20, fontWeight: 700 }}>
              ✓ WhatsApp Instant Order
            </span>
          </div>
          <span style={{ color: "#64748B", fontSize: 20, fontWeight: 800 }}>
            www.ryxer.site
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
