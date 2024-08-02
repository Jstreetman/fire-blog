"use client";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useAnimate, motion, AnimationScope } from "framer-motion";
import { FiMenu, FiArrowUpRight } from "react-icons/fi";
import useMeasure from "react-use-measure";
import appLogo from "../../public/assets/images/applogo.svg";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="relative  w-full overflow-hidden">
      <GlassNavigation />
    </motion.section>
  );
};

const GlassNavigation = () => {
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [scope, animate] = useAnimate();
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const navElement = navRef.current;
    const handleMouseMove = ({ offsetX, offsetY, target }: MouseEvent) => {
      // @ts-ignore
      const isNavElement = [...target.classList].includes("glass-nav");

      if (isNavElement) {
        setHovered(true);

        const top = offsetY + "px";
        const left = offsetX + "px";

        animate(scope.current, { top, left }, { duration: 0 });
      } else {
        setHovered(false);
      }
    };

    navElement?.addEventListener("mousemove", handleMouseMove);

    return () => {
      navElement?.removeEventListener("mousemove", handleMouseMove);
    };
  }, [animate, scope]);

  return (
    <nav
      ref={navRef}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: hovered ? "none" : "auto",
      }}
      className="glass-nav fixed left-0 right-0 top-0 z-10 mx-auto max-w-6xl overflow-hidden border-[1px] border-white/10 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur md:left-6 md:right-6 md:top-6 md:rounded-2xl">
      <div className="glass-nav flex items-center justify-between px-5 py-5">
        <Cursor hovered={hovered} scope={scope} />

        <Links />

        <Logo />

        <Buttons setMenuOpen={setMenuOpen} />
      </div>

      <MobileMenu menuOpen={menuOpen} />
    </nav>
  );
};

const Cursor = ({
  hovered,
  scope,
}: {
  hovered: boolean;
  scope: AnimationScope<any>;
}) => {
  return (
    <motion.span
      initial={false}
      animate={{
        opacity: hovered ? 1 : 0,
        transform: `scale(${
          hovered ? 1 : 0
        }) translateX(-50%) translateY(-50%)`,
      }}
      transition={{ duration: 0.15 }}
      ref={scope}
      className="pointer-events-none absolute z-0 grid h-[50px] w-[50px] origin-[0px_0px] place-content-center rounded-full bg-gradient-to-br from-blue-600 from-40% to-blue-400 text-2xl">
      <FiArrowUpRight className="text-white" />
    </motion.span>
  );
};

const Logo = () => (
  <span className="pointer-events-none relative left-0 top-[50%] z-10 text-4xl font-black text-blue-500 mix-blend-overlay md:absolute md:left-[50%] md:-translate-x-[50%] md:-translate-y-[50%] ">
    <Image src={appLogo} alt="Fireblog logo" height={50} width={50} />
  </span>
);

const Links = () => (
  <div className="hidden items-center gap-2 md:flex">
    <GlassLink text="About" href="/about" />
  </div>
);

const GlassLink = ({ text, href }: { text: string; href: string }) => {
  return (
    <Link
      href={href}
      className="group relative scale-100 overflow-hidden rounded-lg px-4 py-2 transition-transform hover:scale-105 active:scale-95">
      <span className="relative z-10 text-white/90 transition-colors group-hover:text-white">
        {text}
      </span>
      <span className="absolute inset-0 z-0 bg-gradient-to-br from-white/20 to-white/5 opacity-0 transition-opacity group-hover:opacity-100" />
    </Link>
  );
};

const TextLink = ({ text, href }: { text: string; href: string }) => {
  return (
    <Link
      href={href}
      className="text-white/90 transition-colors hover:text-white">
      {text}
    </Link>
  );
};

const Buttons = ({
  setMenuOpen,
}: {
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}) => (
  <div className="flex items-center gap-4">
    <div className="hidden md:block">
      <SignInButton />
    </div>

    <Link
      href="/signup"
      className="relative scale-100 overflow-hidden rounded-lg bg-gradient-to-br from-blue-600 from-40% to-blue-400 px-4 py-2 font-medium text-white transition-transform hover:scale-105 active:scale-95">
      Sign Up
    </Link>

    <button
      onClick={() => setMenuOpen((pv) => !pv)}
      className="ml-2 block scale-100 text-3xl text-white/90 transition-all hover:scale-105 hover:text-white active:scale-95 md:hidden">
      <FiMenu />
    </button>
  </div>
);

const SignInButton = () => {
  return (
    <Link
      href="/signin"
      className="group relative scale-100 overflow-hidden rounded-lg px-4 py-2 transition-transform hover:scale-105 active:scale-95">
      <span className="relative z-10 text-white/90 transition-colors group-hover:text-white">
        Sign in
      </span>
      <span className="absolute inset-0 z-0 bg-gradient-to-br from-white/20 rounded-lg to-white/5 opacity-0 transition-opacity group-hover:opacity-100" />
    </Link>
  );
};

const MobileMenu = ({ menuOpen }: { menuOpen: boolean }) => {
  const [ref, { height }] = useMeasure();
  return (
    <motion.div
      initial={false}
      animate={{
        height: menuOpen ? height : "0px",
      }}
      className="block overflow-hidden md:hidden">
      <div ref={ref} className="flex items-center justify-between px-4 pb-4">
        <div className="flex items-center gap-4">
          <TextLink href="/about" text="About" />
        </div>
        <SignInButton />
      </div>
    </motion.div>
  );
};

export default Navbar;
