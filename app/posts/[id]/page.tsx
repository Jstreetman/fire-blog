import { GridBeamAnimation } from "@/components/Animations/GridBeamAnimation";
import PostDetails from "@/components/Feed/PostDetails";

export default function Home() {
  return (
    <section className="flex flex-1 h-full">
      <PostDetails />
      <GridBeamAnimation />
    </section>
  );
}
