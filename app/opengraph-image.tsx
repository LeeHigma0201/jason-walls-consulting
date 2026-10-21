import { ImageResponse } from "next/og";

// Site-wide Open Graph / social-share card. Cascades to every route
// (/, /trades, /story, /lab, /concepts) unless a segment overrides it.
export const alt =
  "Jason Walls — Sites, iOS apps, and AI tools, built by an electrician who ships";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Fonts are read from app/fonts at build time (self-hosted TTF copies of the Google Fonts
// latin set) so the image renders without a network call.
function loadFont(file: string) {
  return readFile(join(process.cwd(), "app", "fonts", file));
}

export default async function Image() {
  const [frauncesSemi, frauncesReg, mono] = await Promise.all([
    loadFont("Fraunces-600.ttf"),
    loadFont("Fraunces-400.ttf"),
    loadFont("JetBrainsMono-500.ttf"),
  ]);

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
          backgroundColor: "#F8F4ED",
          backgroundImage:
            "radial-gradient(ellipse 70% 55% at 88% 6%, rgba(204,120,92,0.22), transparent 70%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 22, height: 22, backgroundColor: "#CC785C" }} />
          <div
            style={{
              fontFamily: "JetBrains Mono",
              fontWeight: 500,
              fontSize: 22,
              letterSpacing: 4,
              color: "#5A5048",
            }}
          >
            ELECTRICIAN · IBEW LOCAL 369 · LOUISVILLE
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "Fraunces",
              fontWeight: 600,
              fontSize: 120,
              lineHeight: 1,
              letterSpacing: -2,
              color: "#1A1612",
            }}
          >
            Jason Walls
          </div>
          <div
            style={{
              fontFamily: "Fraunces",
              fontWeight: 400,
              fontSize: 46,
              lineHeight: 1.3,
              color: "#5A5048",
              marginTop: 30,
            }}
          >
            Websites. iOS apps. AI workflows.
          </div>
          <div
            style={{
              fontFamily: "Fraunces",
              fontWeight: 600,
              fontSize: 46,
              lineHeight: 1.3,
              color: "#1A1612",
            }}
          >
            Built by an electrician who ships.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid #E5DDC9",
            paddingTop: 28,
          }}
        >
          <div
            style={{
              fontFamily: "JetBrains Mono",
              fontWeight: 500,
              fontSize: 24,
              color: "#1A1612",
            }}
          >
            jason-walls.vercel.app
          </div>
          <div
            style={{
              fontFamily: "JetBrains Mono",
              fontWeight: 500,
              fontSize: 22,
              color: "#5A5048",
            }}
          >
            Pay for the build, not the build time.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: frauncesSemi, weight: 600, style: "normal" },
        { name: "Fraunces", data: frauncesReg, weight: 400, style: "normal" },
        { name: "JetBrains Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
