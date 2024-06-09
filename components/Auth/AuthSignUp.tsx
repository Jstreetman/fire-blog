"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FaFire } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import { auth } from "@/app/firebase/config";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { GridAnimation } from "../Animations/GridAnimation";
import { SignUpError } from "../../enums/AuthEnums";
import { Success } from "../../enums/AuthEnums";
import signUp from "@/app/firebase/auth/authsignup";
import { useRouter } from "next/navigation";
export const AuthSignUp = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setShowSuccessMessage] = useState("");
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = (e.target as any).elements.email.value;
    const password = (e.target as any).elements.password.value;

    if (!email || !password) {
      setErrorMessage(SignUpError.EmptyFields);
      setShowErrorModal(true);
      return;
    }

    try {
      const { result, error } = await signUp(auth, email, password);
      if (error) {
        if (error === SignUpError.EmailAlreadyInUse) {
          setErrorMessage(SignUpError.EmailAlreadyInUse);
          console.log(SignUpError.EmailAlreadyInUse);
        } else if (error === SignUpError.WeakPassword) {
          setErrorMessage(SignUpError.WeakPassword);
          console.log(SignUpError.WeakPassword);
        } else if (error === SignUpError.InvalidCredentials) {
          setErrorMessage(SignUpError.InvalidCredentials);
          console.log(SignUpError.InvalidCredentials);
        } else {
          setErrorMessage(error.message);
        }
        setShowErrorModal(true);
      } else {
        router.push("/feed");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setShowErrorModal(true);
    }
  };
  return (
    <div className="bg-zinc-950 py-20 z-20 text-zinc-200 selection:bg-zinc-600">
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
        className="relative z-10 mx-auto w-full max-w-xl p-4 "
      >
        <Heading />

        <form onSubmit={handleSignUp}>
          <Email />
          <Terms />
          <SplashButton type="submit" className="w-full">
            Sign Up
          </SplashButton>
        </form>
      </motion.div>
      <GridAnimation />

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
    </div>
  );
};

const Heading = () => (
  <div className="z-20">
    <NavLogo />
    <div className="mb-9 mt-6 space-y-1.5">
      <h1 className="text-2xl font-semibold">
        Create a Fire<span className="text-blue-500">blog</span> Account
      </h1>
      <p className="text-zinc-400">
        Already have an account?{" "}
        <Link href="/signin" className="text-blue-400">
          Sign In.
        </Link>
      </p>
    </div>
  </div>
);

const Email = () => {
  return (
    <>
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
        <label htmlFor="password-input" className="block text-zinc-400">
          Password
        </label>
        <input
          id="password-input"
          type="password"
          name="password"
          placeholder="••••••••••••"
          className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700"
        />
      </div>
    </>
  );
};

const Terms = () => (
  <p className="mt-9 text-xs text-zinc-400">
    By signing up, you agree to our{" "}
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
        "rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-2 text-lg text-zinc-50 ring-2 ring-blue-500/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70 mt-4",
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
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
