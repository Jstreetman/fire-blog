"use client";
import { usePathname } from "next/navigation";
import { bottombarLinks } from "@/constants";
import { motion } from "framer-motion";

import Link from "next/link";

const MobileBottombar = () => {
  const pathname = usePathname();

  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.25, ease: "easeInOut", delay: 0.5 }}
      className="bottom-bar glass-nav bg-gradient-to-br from-white/20 to-white/5 backdrop-blur ">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link
            key={`bottombar-${link.label}`}
            href={link.route}
            className={`${
              isActive && "rounded-[10px] bg-blue-500 "
            } flex-center flex-col gap-1 p-2 transition`}>
            <img
              src={link.imgURL}
              alt={link.label}
              width={16}
              height={16}
              className={`${isActive && "invert-white"}`}
            />

            <p className="tiny-medium text-light-2">{link.label}</p>
          </Link>
        );
      })}
    </motion.section>
  );
};

export default MobileBottombar;
