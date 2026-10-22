import { HeroPanel } from "@/components/home/heroes/HeroPanel";
import { HomeRest } from "@/components/home/HomeRest";
import { LOCKOUT } from "@/components/home/heroes/copy";

export default function HeroOption2() {
  return (
    <>
      <HeroPanel />
      <HomeRest whyPhoto={LOCKOUT} />
    </>
  );
}
