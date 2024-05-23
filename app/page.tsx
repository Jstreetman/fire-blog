import { Cards } from "@/components/Cards/Cards";
import { HeroFooter } from "@/components/Footer/HeroFooter";
import { ActualLanding } from "@/components/Landing/Hero/ActualLanding";
import { HeroLanding } from "@/components/Landing/Hero/HeroLanding";
import { DarkGridHero } from "@/components/Landing/Hero/PreLanding";

export default function Home() {
  return (
    <div>
      <ActualLanding />
      {/* <Cards /> */}
      <HeroFooter />
    </div>
  );
}
