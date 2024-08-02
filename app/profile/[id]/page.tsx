import { GridAnimation } from "@/components/Animations/GridAnimation";

import Profile from "@/components/Profile/Profile";

export default function Home() {
  return (
    <section className="flex flex-1 h-full">
      <Profile />
      <GridAnimation />
    </section>
  );
}
