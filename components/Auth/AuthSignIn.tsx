"use client";
import React, { useEffect } from "react";

import { FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { useToast } from "@/components/ui/use-toast";
import appLogo from "../../public/assets/images/applogo.svg";
import { SigninValidation } from "@/app/lib/validation";
import { Input } from "../ui/input";
import Loader from "../Animations/LoadingAnimation";
import { useSignInAccount } from "@/lib/react-queries/queries";
import Image from "next/image";

import Link from "next/link";

import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/AuthContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { GridAnimation } from "../Animations/GridAnimation";

export const AuthSignIn = () => {
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    checkuserAuth();
  }, []);

  const checkuserAuth = async () => {
    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn) {
      router.push("/feed");
    }
  };
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: signInAccount, isPending: isSigningInUser } =
    useSignInAccount();

  const handleSignIn = async (user: z.infer<typeof SigninValidation>) => {
    try {
      // @ts-ignore
      const session = await signInAccount(user);

      router.push("/feed");

      if (!session) {
        return toast({
          variant: "destructive",
          title: "Sign In Failed",
        });
      }
      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();
        router.push("/feed");
        return toast({
          title: "Sign In Successful",
        });
      } else {
        return toast({
          variant: "destructive",
          title: "Sign In Failed",
        });
      }
      // if (!isLoggedIn) {
      //   toast({
      //     title: "Sign In Failed",
      //   });
      //   return;
      // }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" py-20 text-zinc-200 selection:bg-zinc-600">
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
        }}>
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
        className="relative z-10 mx-auto w-full max-w-xl p-4">
        <Heading />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSignIn)}>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-1.5 block text-zinc-400">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email..."
                        type="email"
                        className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-1.5 block text-zinc-400">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="••••••••••••"
                        type="password"
                        className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <SplashButton type="submit" className="w-full">
              {isSigningInUser || isUserLoading ? (
                <div className="flex-center gap-2">
                  <Loader /> Loading...
                </div>
              ) : (
                "Sign In"
              )}
            </SplashButton>
          </form>
        </Form>
      </motion.div>
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

const SplashButton = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={twMerge(
        "rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-2 text-lg text-zinc-50 ring-2 ring-blue-500/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70",
        className
      )}
      {...rest}>
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
      {...rest}>
      {children}
    </button>
  );
};

const NavLogo = () => {
  return <Image src={appLogo} alt="app logo" height={40} width={40} />;
};

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
