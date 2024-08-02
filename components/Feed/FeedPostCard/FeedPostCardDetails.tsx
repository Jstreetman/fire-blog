"use client";
import { motion } from "framer-motion";
import Image from "next/image";

import { useRouter } from "next/navigation";
import picturePlaceholder from "../../../public/assets/icons/profile-placeholder.svg";
import LoadingAnimation from "@/components/Animations/LoadingAnimation";
import { useUserContext } from "@/context/AuthContext";

export const FeedPostCardDetails = () => {
  return (
    <section>
      <FeedCard />
    </section>
  );
};

const FeedCard = () => {
  const { user, setUser, isLoading } = useUserContext();
  const router = useRouter();

  const handleClick = () => {
    router.push("/createpost");
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
        className="flex flex-row justify-between p-4 mx-auto bg-gradient-to-br from-white/20 to-white/5 backdrop-blur   lg:w-3/5 md:w-9/12 rounded-xl  ">
        <div className="flex flex-row ">
          {isLoading || !user.email ? (
            <LoadingAnimation />
          ) : (
            <Image
              src={user.imageUrl || picturePlaceholder}
              alt="Profile Picture"
              className="object-cover h-12 w-12 rounded-full border-[1px] border-blue-500 scale-100 hover:cursor-pointer hover:scale-110 active:scale-95 transition-all"
              width={128}
              height={128}
            />
          )}
        </div>
        <div className="flex flex-row justify-center mx-auto w-4/5">
          <button
            onClick={handleClick}
            className="w-full border-[1px] border-white/20 scale-100 hover:scale-105 hover:bg-white/30 active:scale-95 transition-all rounded-3xl">
            Create Post
          </button>
        </div>
      </motion.div>
    </div>
  );
};
