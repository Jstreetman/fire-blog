import { GridBeamAnimation } from "@/components/Animations/GridBeamAnimation";
import Users from "@/components/Feed/Users";

export default function Home() {
  return (
    <section className="flex flex-1 h-full">
      <Users />
      <GridBeamAnimation />
    </section>
  );
}
