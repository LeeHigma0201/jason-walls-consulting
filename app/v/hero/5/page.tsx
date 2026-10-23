import { HeroTwo } from "@/components/home/heroes/HeroTwo";
import { HomeRest } from "@/components/home/HomeRest";
import { LOCKOUT } from "@/components/home/heroes/copy";

export default function HeroOption5() {
  return (
    <>
      <HeroTwo />
      <HomeRest whyPhoto={LOCKOUT} />
    </>
  );
}
