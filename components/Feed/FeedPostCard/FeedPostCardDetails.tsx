"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import pIcon from "../../../public/icons/profile.png";

export const FeedPostCardDetails = () => {
  return (
    <motion.section>
      <FeedCard />
    </motion.section>
  );
};

const FeedCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
      className="flex flex-row justify-between p-4 mx-auto  bg-gradient-to-br from-white/20 to-white/5 backdrop-blur  lg:w-3/5 md:w-9/12 rounded-xl  "
    >
      <div className="flex flex-row ">
        <Image
          src={pIcon}
          alt="profile"
          width={50}
          height={50}
          className="rounded-full"
        />
      </div>
      <div className="flex flex-row justify-center mx-auto w-4/5">
        <button className="w-full border-[1px] border-white/20 scale-100 hover:scale-105 hover:bg-white/30 active:scale-95 transition-all rounded-3xl">
          Create a post
        </button>
      </div>
    </motion.div>
  );
};
