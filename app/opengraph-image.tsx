import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Site-wide social-share card on the site tokens: navy #10203d, blue #2a6df4, near-white text.
// Cascades to every route unless a segment overrides it.
export const alt = "Jason Walls, software built by an electrician who ships";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// JetBrains Mono is read from app/fonts at build time so the image renders without a network call.
// Roboto Slab ships only as woff2 here, which the image renderer cannot read, so mono carries it all.
const loadFont = (file: string) => readFile(join(process.cwd(), "app", "fonts", file));

export default async function Image() {
  const mono = await loadFont("JetBrainsMono-500.ttf");
  // Jason's own photo, the existing asset from lib/assets.ts, inlined as a data URI.
  const photo = await readFile(join(process.cwd(), "public", "photos", "jason-electrician.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: "#10203d",
          backgroundImage: "linear-gradient(135deg, #15294c 0%, #10203d 62%)",
          fontFamily: "JetBrains Mono",
          fontWeight: 500,
          position: "relative",
        }}
      >
        <img
          src={photoSrc}
          alt=""
          width={380}
          height={630}
          style={{ position: "absolute", top: 0, right: 0, width: 380, height: 630, objectFit: "cover", objectPosition: "50% 20%" }}
        />
        <div style={{ position: "absolute", top: 0, right: 380, width: 4, height: 630, backgroundColor: "#2a6df4" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 20, height: 20, backgroundColor: "#2a6df4", borderRadius: 4 }} />
          <div style={{ fontSize: 20, letterSpacing: 2, color: "#b3bfd4" }}>
            ELECTRICIAN, IBEW LOCAL 369, LOUISVILLE
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 40, color: "#7aa5ff", marginBottom: 24 }}>Jason Walls</div>
          <div style={{ fontSize: 60, lineHeight: 1.1, letterSpacing: -2, color: "#f2f5fa", maxWidth: 680 }}>
            Software built by an electrician who ships.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid #2a4270",
            paddingTop: 24,
            fontSize: 20,
            width: 680,
          }}
        >
          <div style={{ color: "#f2f5fa" }}>jason-walls.vercel.app</div>
          <div style={{ color: "#b3bfd4" }}>Two apps on the App Store</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "JetBrains Mono", data: mono, weight: 500, style: "normal" }],
    },
  );
}
