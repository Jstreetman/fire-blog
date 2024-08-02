import { GridBeamAnimation } from "@/components/Animations/GridBeamAnimation";
import HomePage from "@/components/Feed/HomePage";

export default function Home() {
  return (
    <section className="flex flex-1 h-full">
      <HomePage />
      <GridBeamAnimation />
    </section>
  );
}
