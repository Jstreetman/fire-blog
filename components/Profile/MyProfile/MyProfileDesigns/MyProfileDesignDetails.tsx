"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import profileIcon from "../../../../public/icons/profile.png";
import { MdAccountCircle } from "react-icons/md";
import { MdCreate } from "react-icons/md";

export const MyProfileDesignDetails = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
      className=" py-5"
    >
      <ProfileDesignCard />
    </motion.div>
  );
};

const ProfileDesignCard = () => {
  return (
    <div className="mx-auto bg-gradient-to-br from-white/20 to-white/5 backdrop-blur rounded-lg lg:w-3/5 md:w-3/4 sm:w-4/5">
      <div className="w-full">
        <div className="flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg h-64">
          <MdAccountCircle className="w-32 h-32" />
          <h1>Username</h1>
        </div>
        <div className="p-5 flex flex-col">
          <div className="flex justify-end">
            <MdCreate className=" w-8 h-8  rounded-full hover:bg-white/35 hover:cursor-pointer hover:scale-110 active:scale-95 transition-all" />
          </div>
          <h1>Name</h1>
          <p>bio</p>
          <h6>Date Joined</h6>
          <h6>Followers</h6>
          <h6>Following</h6>
        </div>
      </div>
    </div>
  );
};
