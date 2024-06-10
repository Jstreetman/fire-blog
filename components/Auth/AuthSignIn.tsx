"use client";
import React, { ReactNode, useState } from "react";
import { SiGoogle } from "react-icons/si";
import { FiArrowLeft } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { FaFire } from "react-icons/fa";
import Link from "next/link";

import { auth } from "@/app/firebase/config";
import { GridAnimation } from "../Animations/GridAnimation";
import signIn, { signInWithGoogle } from "@/app/firebase/auth/authsignin";
import { useRouter } from "next/navigation";
import { SignInError, SignUpError } from "@/enums/AuthEnums";

export const AuthSignIn = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setShowSuccessMessage] = useState("");
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = (e.target as any).elements.email.value;
    const password = (e.target as any).elements.password.value;

    if (!email || !password) {
      setErrorMessage(SignInError.EmptyFields);
      setShowErrorModal(true);
      return;
    }
    try {
      const { result, error } = await signIn(auth, email, password);
      if (error) {
        if (error === SignInError.InvalidEmail) {
          setErrorMessage(SignInError.InvalidEmail);
          console.log(SignInError.InvalidEmail);
        } else if (error === SignInError.InvalidCredentials) {
          setErrorMessage(SignInError.InvalidCredentials);
          console.log(SignInError.InvalidCredentials);
        } else {
          setErrorMessage(SignInError.IncorrectPassword);
          console.log(SignInError.IncorrectPassword);
        }
        setShowErrorModal(true);
      }
      console.log("User signed in successfully");
      router.refresh();
    } catch (error) {
      setErrorMessage(error.message.toString());
      setShowErrorModal(true);
    }
  };

  const handleSignUpGoogle = async () => {
    await signInWithGoogle();

    router.push("/feed");
  };

  const Email = () => {
    return (
      <form onSubmit={handleSignIn}>
        <div className="mb-3">
          <label htmlFor="email-input" className="mb-1.5 block text-zinc-400">
            Email
          </label>
          <input
            id="email-input"
            type="email"
            name="email"
            placeholder="Email..."
            className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700"
          />
        </div>
        <div className="mb-6">
          <div className="mb-1.5 flex items-end justify-between">
            <label htmlFor="password-input" className="block text-zinc-400">
              Password
            </label>
            <a href="#" className="text-sm text-blue-400">
              Forgot?
            </a>
          </div>
          <input
            id="password-input"
            type="password"
            name="password"
            placeholder="••••••••••••"
            className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700"
          />
        </div>
        <SplashButton type="submit" className="w-full">
          Sign In
        </SplashButton>
      </form>
    );
  };
  const SocialOptions = () => (
    <div>
      <div className="mb-3 flex gap-3">
        <BubbleButton
          className="flex w-full justify-center py-3"
          onClick={handleSignUpGoogle}
        >
          <SiGoogle />
        </BubbleButton>
      </div>
    </div>
  );
  return (
    <div className="bg-zinc-950 py-20 text-zinc-200 selection:bg-zinc-600">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 1.25,
          ease: "easeInOut",
        }}
      >
        <Link href="/" className="absolute z-20 left-4 top-6 text-sm">
          <BubbleButton>
            <FiArrowLeft />
            Home
          </BubbleButton>
        </Link>
      </motion.div>

      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1.25,
          ease: "easeInOut",
        }}
        className="relative z-10 mx-auto w-full max-w-xl p-4"
      >
        <Heading />

        <SocialOptions />
        <Or />
        <Email />
        <Terms />
      </motion.div>
      <AnimatePresence>
        {showErrorModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          >
            <div className="bg-red-500 p-6 rounded-lg shadow-lg text-white max-w-sm w-full mx-4">
              <h2 className="text-xl font-semibold">Error</h2>
              <p className="mt-2">{errorMessage}</p>
              <button
                onClick={() => setShowErrorModal(false)}
                className="mt-4 underline"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <GridAnimation />
    </div>
  );
};

const Heading = () => (
  <div>
    <NavLogo />
    <div className="mb-9 mt-6 space-y-1.5">
      <h1 className="text-2xl font-semibold">
        Sign in to Fire<span className="text-blue-500">blog</span>
      </h1>
      <p className="text-zinc-400">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-blue-400">
          Create one.
        </Link>
      </p>
    </div>
  </div>
);

const Or = () => {
  return (
    <div className="my-6 flex items-center gap-3">
      <div className="h-[1px] w-full bg-zinc-700" />
      <span className="text-zinc-400">OR</span>
      <div className="h-[1px] w-full bg-zinc-700" />
    </div>
  );
};

const Terms = () => (
  <p className="mt-9 text-xs text-zinc-400">
    By signing in, you agree to our{" "}
    <Link href="#" className="text-blue-400">
      Terms & Conditions
    </Link>{" "}
    and{" "}
    <Link href="#" className="text-blue-400">
      Privacy Policy.
    </Link>
  </p>
);

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

const BubbleButton = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={twMerge(
        `
        relative z-0 flex items-center gap-2 overflow-hidden whitespace-nowrap rounded-md 
        border border-zinc-700 bg-gradient-to-br from-zinc-800 to-zinc-950
        px-3 py-1.5
        text-zinc-50 transition-all duration-300
        
        before:absolute before:inset-0
        before:-z-10 before:translate-y-[200%]
        before:scale-[2.5]
        before:rounded-[100%] before:bg-zinc-100
        before:transition-transform before:duration-500
        before:content-[""]

        hover:scale-105 hover:text-zinc-900
        hover:before:translate-y-[0%]
        active:scale-100`,
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

const NavLogo = () => {
  return <FaFire className="h-6 w-6 text-blue-400" />;
};

type ButtonProps = {
  children: ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
