import { GridBeamAnimation } from "@/components/Animations/GridBeamAnimation";
import CreatePost from "@/components/Feed/CreatePost";

export default function Home() {
  return (
    <section className="flex flex-1 h-full">
      <CreatePost />
      <GridBeamAnimation />
    </section>
  );
}
