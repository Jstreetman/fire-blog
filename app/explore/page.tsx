import { GridBeamAnimation } from "@/components/Animations/GridBeamAnimation";
import Explore from "@/components/Feed/Explore";

export default function Home() {
  return (
    <section className="flex flex-1 h-full">
      <Explore />
      <GridBeamAnimation />
    </section>
  );
}
