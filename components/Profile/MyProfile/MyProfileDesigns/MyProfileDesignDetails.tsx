"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import profileIcon from "../../../../public/icons/profile.png";
import { MdAccountCircle } from "react-icons/md";
import { MdCreate } from "react-icons/md";
import { app } from "@/app/firebase/config";
import { getAuth } from "firebase/auth";
import { getProfile } from "@/app/firebase/get/getprofile";
import { useRouter } from "next/navigation";

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
  const [userDetails, setUserDetails] = useState(null);
  const auth = getAuth(app);
  const userId = auth.currentUser?.uid;
  const router = useRouter();
  // Fetch user details and update state
  useEffect(() => {
    router.refresh();
    const fetchData = async () => {
      const data = await getProfile(userId); // Assuming userId is defined
      setUserDetails(data);
    };

    fetchData();
  }, [userId, router]); // Ensure useEffect runs when userId changes

  // Render loading state if userDetails is null
  if (!userDetails) {
    return <div>No data...</div>;
  }

  // Once userDetails is available, render the user details
  return (
    <div className="mx-auto bg-gradient-to-br from-white/20 to-white/5 backdrop-blur rounded-lg lg:w-3/5 md:w-3/4 sm:w-4/5">
      <div className="w-full">
        <div className="flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg h-64">
          <MdAccountCircle className="w-32 h-32" />
          <h1 className="text-3xl font-bold">{userDetails.fullName}</h1>{" "}
        </div>
        <div className="p-5 flex flex-col">
          <div className="flex justify-end">
            <MdCreate className="w-8 h-8 rounded-full hover:bg-white/35 hover:cursor-pointer hover:scale-110 active:scale-95 transition-all" />
          </div>
          <h1>{userDetails.username}</h1>
          <p>{userDetails.bio}</p>
          <h6>Date Joined: {userDetails.dateCreated}</h6>
          <h6>Followers: 0 {userDetails.followers}</h6>
          <h6>Following: 0 {userDetails.following}</h6>
        </div>
      </div>
    </div>
  );
};
