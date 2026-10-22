import { HeroLift } from "@/components/home/heroes/HeroLift";
import { HomeRest } from "@/components/home/HomeRest";
import { LOCKOUT } from "@/components/home/heroes/copy";

export default function HeroOption1() {
  return (
    <>
      <HeroLift />
      <HomeRest whyPhoto={LOCKOUT} />
    </>
  );
}
