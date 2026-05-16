import { ImageResponse } from "next/og";

// Site-wide Open Graph / social-share card. Cascades to every route
// (/, /trades, /story, /lab, /concepts) unless a segment overrides it.
export const alt =
  "Jason Walls — Sites, iOS apps, and AI tools, built by a Master Electrician";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Superset of glyphs so font subsetting never drops a character on copy tweaks.
const GLYPHS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,·—-/:'";

async function loadGoogleFont(family: string, weight: number) {
  const url = `https://fonts.googleapis.com/css2?family=${family.replace(
    / /g,
    "+",
  )}:wght@${weight}&text=${encodeURIComponent(GLYPHS)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/,
  );
  if (!resource) throw new Error(`OG font load failed: ${family} ${weight}`);
  const res = await fetch(resource[1]);
  if (res.status !== 200) throw new Error(`OG font fetch failed: ${family}`);
  return res.arrayBuffer();
}

export default async function Image() {
  const [frauncesSemi, frauncesReg, mono] = await Promise.all([
    loadGoogleFont("Fraunces", 600),
    loadGoogleFont("Fraunces", 400),
    loadGoogleFont("JetBrains Mono", 500),
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
            AI FOR THE TRADES · IBEW LOCAL 369
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
            Sites. iOS apps. AI tools.
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
            Built by a Master Electrician.
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
