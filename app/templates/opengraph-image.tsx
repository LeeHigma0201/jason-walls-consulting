import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Prebuilt solutions for trades · Jason Walls";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#F8F4ED",
          fontFamily: "ui-serif, Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 18,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#CC785C",
            fontFamily: "ui-monospace, monospace",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#CC785C",
            }}
          />
          Prebuilt · for tradespeople
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 96,
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              color: "#1A1612",
              fontWeight: 300,
            }}
          >
            Pay once.
          </div>
          <div
            style={{
              fontSize: 96,
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              color: "#CC785C",
              fontStyle: "italic",
              fontWeight: 600,
            }}
          >
            Take delivery.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 20,
            color: "#5A5048",
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontWeight: 600, color: "#1A1612" }}>Jason Walls</div>
            <div
              style={{
                fontSize: 14,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#8A7F71",
                fontFamily: "ui-monospace, monospace",
              }}
            >
              Master Electrician · IBEW Local 369
            </div>
          </div>
          <div
            style={{
              fontFamily: "ui-monospace, monospace",
              fontSize: 16,
              letterSpacing: "0.06em",
              color: "#8A7F71",
            }}
          >
            jason-walls.vercel.app/templates
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
