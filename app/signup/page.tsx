import { CardGridAnimation } from "@/components/Animations/CardGrid";
import { AuthSignUp } from "@/components/Auth/AuthSignUp";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <div>
      <AuthSignUp />

      <Toaster />
      <CardGridAnimation />
    </div>
  );
}
