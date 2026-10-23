import { HeroBreakers } from "@/components/home/heroes/HeroBreakers";
import { HomeRest } from "@/components/home/HomeRest";
import { LOCKOUT } from "@/components/home/heroes/copy";

export default function HeroOption6() {
  return (
    <>
      <HeroBreakers />
      <HomeRest whyPhoto={LOCKOUT} />
    </>
  );
}
