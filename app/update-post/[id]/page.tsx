import { GridBeamAnimation } from "@/components/Animations/GridBeamAnimation";
import EditPost from "@/components/Feed/EditPost";

export default function Home() {
  return (
    <section className="flex flex-1 h-full">
      <EditPost />
      <GridBeamAnimation />
    </section>
  );
}
