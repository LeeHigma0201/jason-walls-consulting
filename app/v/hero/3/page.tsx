import { HeroJobsite } from "@/components/home/heroes/HeroJobsite";
import { HomeRest } from "@/components/home/HomeRest";
import { LOCKOUT } from "@/components/home/heroes/copy";

export default function HeroOption3() {
  return (
    <>
      <HeroJobsite />
      <HomeRest whyPhoto={LOCKOUT} />
    </>
  );
}
