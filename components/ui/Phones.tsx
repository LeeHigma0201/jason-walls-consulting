import Image from "next/image";
import { SIZE } from "@/lib/assets";

// Real App Store screens in device frames. On a phone the screens sit in a swipe strip, one frame about
// 62vw wide (max 240px) with the next peeking, so the gauge numbers stay readable. At 720+ two screens
// sit side by side and at 900+ the second frame sits 28px lower. Three or more: the phone strip swipes
// through all of them, and 720+ shows all in one row. The strip rules live in app/globals.css next to
// .phones. Pass the exact alt per screen (open the image file before writing it).

export function Phones({ screens, sizes = "(min-width:720px) 240px, 62vw" }: { screens: { src: string; alt: string }[]; sizes?: string }) {
  const many = screens.length > 2;
  return (
    <div role="group" aria-label="App screens" tabIndex={0} className={`phones phones-snap${many ? " phones-many" : ""}`} style={many ? { ["--cols" as string]: screens.length } : undefined}>
      {screens.map((s) => (
        <div className="phone" key={s.src}>
          <Image src={s.src} alt={s.alt} width={SIZE.screen.w} height={SIZE.screen.h} sizes={sizes} />
        </div>
      ))}
    </div>
  );
}
