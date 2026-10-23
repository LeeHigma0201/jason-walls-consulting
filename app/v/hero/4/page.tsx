import { HeroReport } from "@/components/home/heroes/HeroReport";
import { HomeRest } from "@/components/home/HomeRest";
import { LOCKOUT } from "@/components/home/heroes/copy";

export default function HeroOption4() {
  return (
    <>
      <HeroReport />
      <HomeRest whyPhoto={LOCKOUT} />
    </>
  );
}
