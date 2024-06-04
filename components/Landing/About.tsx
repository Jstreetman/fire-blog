"use client";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { AnimationProps } from "framer-motion";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { FiArrowLeft } from "react-icons/fi";
import { FaFire } from "react-icons/fa";

const About = () => {
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
      <Content />
    </div>
  );
};

const Content = () => {
  return (
    <div className=" z-20 mx-auto flex max-w-6xl flex-col  items-center px-4  md:px-8 md:py-8 ">
      <motion.div
        initial={{
          opacity: 0,
          y: 1000,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          ease: "backInOut",
          delay: 0.3,
        }}
        className="z-20"
      >
        <div className="py-36 z-20 flex flex-col justify-center items-center">
          <FaFire className="text-9xl text-blue-500" />
          <h1 className="py-10 text-3xl font-bold ">
            About Fire<span className="text-blue-500">blog</span>
          </h1>
          <h2 className="text-2xl text-center">
            We are a blogging app platform that helps you stay up to date. We
            are a community of like minded individuals who want to share their
            knowledge. We hope you enjoy our platform.
          </h2>
        </div>
      </motion.div>
      <motion.div
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,

          transition: { duration: 3, ease: "easeInOut", delay: 0.6 },
        }}
        viewport={{ once: true }}
        className="py-32 z-20 flex flex-col justify-center items-center"
      >
        <h1 className="py-10 text-3xl font-bold text-center">Mission</h1>
        <p className="text-2xl text-center">
          {" "}
          To establish a Platform for Knowledge Sharing.{" "}
        </p>
      </motion.div>
      <motion.div
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,

          transition: { duration: 3.5, ease: "easeInOut", delay: 0.2 },
        }}
        viewport={{ once: true }}
        className="py-32 z-20 flex flex-col justify-center items-center"
      >
        <h1 className="py-10 text-3xl font-bold text-center">Who are we</h1>
        <p className="text-2xl text-center">
          {" "}
          We are a community of like minded individuals who want to share their
          knowledge. We hope you enjoy our platform. Fireblog is a community of
          like minded individuals who want to share their knowledge. We hope you
          enjoy our platform.{" "}
        </p>
      </motion.div>
    </div>
  );
};

const GradientGrid = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 2.5,
        ease: "easeInOut",
      }}
      className="absolute inset-0 z-0"
    >
      <div
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='rgb(30 58 138 / 0.5)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
        }}
        className="absolute inset-0 z-0"
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
    </motion.div>
  );
};

const GRID_BOX_SIZE = 32;
const BEAM_WIDTH_OFFSET = 1;

type WindowSize = {
  width: number | undefined;
  height: number | undefined;
};

type BeamType = {
  top: number;
  left: number;
  transition?: AnimationProps["transition"];
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

type ButtonProps = {
  children: ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default About;
