"use client";
import { signOutWithGoogle } from "../../app/firebase/auth/authsignin";
import { useRouter } from "next/navigation";

export const HomePage = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    await signOutWithGoogle();
    router.push("/");
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center py-16 ">
        <h1>
          The food for this feed is currently being prepared. Please come back
          later 🤣
        </h1>
        <button onClick={handleSignOut} className="bg-blue-500 px-4 py-2">
          Sign out
        </button>
      </div>
    </div>
  );
};
