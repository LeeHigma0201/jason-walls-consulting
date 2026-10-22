import Image from "next/image";
import type { ReactNode } from "react";

// Inner-page header in the home hero's look, shorter. Phone: the photo in brand duotone fills the top
// 40svh under the nav and fades into the ground, with the kicker and headline on the fade. 900+: the
// photo is a framed tall crop beside the headline. Without a photo it is the headline on the blue glow.
// The header never animates (no .sr).
export function PageHead({
  kicker,
  title,
  children,
  photo,
}: {
  kicker: string;
  title: ReactNode;
  children?: ReactNode;
  photo?: { src: string; alt: string; pos?: string };
}) {
  return (
    <section className={photo ? "ph ph-photo" : "ph"}>
      <div className="ph-shade" aria-hidden="true" />
      <div className="wrap narrow ph-body">
        {photo && (
          <div className="ph-media hx-duo">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              preload
              sizes="(min-width:900px) 260px, 100vw"
              style={{ objectFit: "cover", objectPosition: photo.pos ?? "50% 30%" }}
            />
          </div>
        )}
        <div className="ph-copy">
          <p className="kicker ph-kicker">{kicker}</p>
          <h1 className="display h1">{title}</h1>
          {children}
        </div>
      </div>
    </section>
  );
}
