import { GridAnimation } from "@/components/Animations/GridAnimation";
import UpdateProfile from "@/components/Profile/UpdateProfile";

export default function Home() {
  return (
    <section className="flex flex-1 h-full">
      <UpdateProfile />
      <GridAnimation />
    </section>
  );
}
