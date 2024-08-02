import { GridBeamAnimation } from "@/components/Animations/GridBeamAnimation";
import SavedPosts from "@/components/Feed/SavedPosts";

export default function Home() {
  return (
    <section className="flex flex-1 h-full">
      <SavedPosts />
      <GridBeamAnimation />
    </section>
  );
}
