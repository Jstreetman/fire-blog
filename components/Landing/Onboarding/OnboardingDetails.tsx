"use client";
import { ReactNode, useEffect, useState } from "react";
import { GridBeamAnimation } from "@/components/Animations/GridBeamAnimation";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import { app } from "../../../app/firebase/config";
import { getDatabase, ref, get } from "firebase/database";
import OnboardUser from "@/app/firebase/post/onboarding/onboarding";

export const OnboardingDetails = () => {
  const router = useRouter();
  const auth = getAuth(app);

  useEffect(() => {
    if (!auth.currentUser) return; // User is not logged in

    const uid = auth.currentUser.uid;
    console.log(uid);

    const db = getDatabase(app);

    get(ref(db, `Users/${uid}`))
      .then((snapshot) => {
        const userData = snapshot.val();

        if (
          !userData ||
          !userData.bio ||
          !userData.fullName ||
          !userData.username
        ) {
        } else {
          router.push("/feed");
        }
      })
      .catch((error) => {
        console.error("Error getting user data:", error);
      });
  }, [auth.currentUser, router]);

  const FormDetails = () => {
    const [isfullName, setFullName] = useState("");
    const [isuserName, setUserName] = useState("");
    const [isbio, setBio] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: any) => {
      e.preventDefault();

      try {
        await OnboardUser(isbio, isfullName, isuserName);
        setFullName("");
        setBio("");
        setUserName("");
        //TODO please add proper loading then send user to feed route
        router.push("/feed");
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name-input" className="mb-1.5 block text-zinc-400">
            Name
          </label>
          <input
            id="name-input"
            type="text"
            name="name"
            required
            value={isfullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Name..."
            className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700"
          />
        </div>
        <div className="mb-6">
          <div className="mb-1.5 flex items-end justify-between">
            <label htmlFor="username-input" className="block text-zinc-400">
              Username
            </label>
          </div>
          <input
            id="username-input"
            type="text"
            name="username"
            value={isuserName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Create Username..."
            required
            className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700"
          />
        </div>
        <div className="mb-6">
          <div className="mb-1.5 flex items-end justify-between">
            <label htmlFor="bio-input" className="block text-zinc-400">
              Bio
            </label>
          </div>
          <textarea
            id="bio-input"
            name="bio"
            value={isbio}
            onChange={(e) => setBio(e.target.value)}
            required
            placeholder="Bio..."
            rows={5}
            className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700"
          />
        </div>
        <SplashButton type="submit" className="w-full">
          Submit
        </SplashButton>
      </form>
    );
  };

  const Content = () => {
    return (
      <div className="mx-auto flex flex-col max-w-6xl justify-center items-center  px-4  md:px-8 md:py-8 ">
        {/* motion.div onboarding details here */}
        <motion.h1
          initial={{ opacity: 0, y: 1000 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.25, ease: "anticipate" }}
          className=" py-10 text-3xl z-20 font-extrabold"
        >
          Onboarding <span className="text-blue-500">Details</span>
        </motion.h1>
        <div className="mx-auto flex flex-col justify-center items-center w-full h-fit ">
          <motion.div
            initial={{ opacity: 0, y: 1000 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.35, ease: "anticipate", delay: 0.25 }}
            className="z-20 w-4/5"
          >
            <FormDetails />
          </motion.div>
        </div>
      </div>
    );
  };

  return (
    <section className=" overflow-hidden z-20">
      <Content />
      <GridBeamAnimation />
    </section>
  );
};

const SplashButton = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={twMerge(
        "rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-2 text-lg text-zinc-50 ring-2 ring-blue-500/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70 mb-4",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

type ButtonProps = {
  children: ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
