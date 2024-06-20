"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
// import pIcon from "../../../public/icons/profile.png";
import { getProfile } from "@/app/firebase/get/getprofile";
import { getAuth } from "firebase/auth";
import { app } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { MdAccountCircle } from "react-icons/md";
import LoadingAnimation from "@/components/Animations/LoadingAnimation";

export const FeedPostCardDetails = () => {
  return (
    <motion.section>
      <FeedCard />
    </motion.section>
  );
};

const FeedCard = () => {
  const [userDetails, setUserDetails] = useState(null);
  const router = useRouter();
  const auth = getAuth(app);
  const userId = auth.currentUser?.uid;
  const [isRefreshing, setIsRefreshing] = useState(false);

  //call useEffect to fetch user details
  useEffect(() => {
    const fetchData = async () => {
      const data = await getProfile(userId);
      setUserDetails(data);
      router.refresh();
    };
    fetchData();
  }, [userId, isRefreshing, router]);

  return (
    <div>
      {isRefreshing ? (
        <LoadingAnimation />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
          className="flex flex-row justify-between p-4 mx-auto  bg-gradient-to-br from-white/20 to-white/5 backdrop-blur  lg:w-3/5 md:w-9/12 rounded-xl  "
        >
          <div className="flex flex-row ">
            {userDetails?.image ? (
              <Image
                src={userDetails?.image}
                alt="Profile Picture"
                className="object-cover h-12 w-12 rounded-full border-[1px] border-blue-500 scale-100 hover:cursor-pointer hover:scale-110 active:scale-95 transition-all"
                width={128}
                height={128}
              />
            ) : (
              <MdAccountCircle className="h-12 w-12" />
            )}
          </div>
          <div className="flex flex-row justify-center mx-auto w-4/5">
            <button className="w-full border-[1px] border-white/20 scale-100 hover:scale-105 hover:bg-white/30 active:scale-95 transition-all rounded-3xl">
              Create a post
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
