import React from "react";
import { MaxWidthWrapper } from "../utils/MaxWidthWrapper";
import { FaFire } from "react-icons/fa";
import { SiLinkedin, SiGithub } from "react-icons/si";
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import Link from "next/link";

export const HeroFooter = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.3, ease: "easeInOut" }}
      className=" overflow-hidden py-12 text-center "
    >
      <div className="mx-auto max-w-6xl">
        <MaxWidthWrapper className="relative grid grid-cols-12 gap-x-1.5 gap-y-6">
          <div className="col-span-6 md:col-span-4 md:col-start-3">
            <LogoColumn />
          </div>
          <div className="flex flex-col justify-center  space-y-2 text-sm md:col-span-2 md:col-start-7 ">
            <GenericColumn
              title="Socials"
              links={[
                {
                  title: "LinkedIn",
                  href: "/#",
                  Icon: SiLinkedin,
                },
                {
                  title: "GitHub",
                  href: "/#",
                  Icon: SiGithub,
                },
              ]}
            />
          </div>
        </MaxWidthWrapper>
      </div>
    </motion.footer>
  );
};

const LogoColumn = () => {
  return (
    <div className="flex items-center justify-evenly">
      <FaFire />
      <span className="mt-3 inline-block text-xs text-zinc-400">
        © Jstreetman - All rights reserved.
      </span>
    </div>
  );
};

const GenericColumn = ({
  title,
  links,
}: {
  title: string;
  links: { title: string; href: string; Icon?: IconType }[];
}) => {
  return (
    <div className="flex flex-col space-y-2 text-sm md:col-start-3">
      <span className="block text-zinc-50">{title}</span>
      {links.map((l) => (
        <Link
          key={l.title}
          href={l.href}
          className="flex items-center gap-1.5 text-zinc-400 transition-colors hover:text-zinc-200 hover:underline"
        >
          {l.Icon && <l.Icon />}
          {l.title}
        </Link>
      ))}
    </div>
  );
};
