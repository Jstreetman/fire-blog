"use client";
import { ReactNode } from "react";
import { GridBeamAnimation } from "@/components/Animations/GridBeamAnimation";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

export const OnboardingDetails = () => {
  return (
    <section className=" overflow-hidden z-20">
      <Content />
      <GridBeamAnimation />
    </section>
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
      <div className="mx-auto flex flex-col justify-center items-center w-full ">
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

const FormDetails = () => {
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
          placeholder="Create Username..."
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

const SplashButton = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={twMerge(
        "rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-2 text-lg text-zinc-50 ring-2 ring-blue-500/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70",
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

const handleSubmit = async (e: any) => {
  e.preventDefault();
};
