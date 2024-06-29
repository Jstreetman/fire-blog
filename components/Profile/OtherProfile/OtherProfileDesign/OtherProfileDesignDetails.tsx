"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import coverPicDefault from "../../../../public/coverpicdefault.jpeg";
import { MdAccountCircle, MdCreate, MdCameraAlt } from "react-icons/md";
import { app } from "@/app/firebase/config";

import { getAuth } from "firebase/auth";
import { getOtherUserProfile, getProfile } from "@/app/firebase/get/getprofile";

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import LoadingAnimation from "@/components/Animations/LoadingAnimation";
import FeedNavbar from "@/components/Feed/FeedNavbar/FeedNavbar";
export const OtherProfileDesignDetails = ({
  params,
}: {
  params: { slug: string };
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
      className=" py-5"
    >
      <div className="py-16">
        <ProfileDesignCard params={useParams()} />
      </div>
    </motion.div>
  );
};

const ProfileDesignCard = ({ params }) => {
  const [userDetails, setUserDetails] = useState(null);
  const auth = getAuth(app);
  let userId = auth.currentUser?.uid;
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isProfilePicModalOpen, setIsProfilePicModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [newFullName, setNewFullName] = useState(userDetails?.fullName || "");
  const [newUsername, setNewUsername] = useState(userDetails?.username || "");
  const [newBio, setNewBio] = useState(userDetails?.bio || "");
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const pathName = useSearchParams();

  userId = params.slug.toString();

  // Fetch user details and update state

  useEffect(() => {
    const fetchData = async () => {
      const data = await getOtherUserProfile(userId);
      // console.log(params.slug.toString(), "params.slug.toString()");
      setUserDetails(data);
    };

    fetchData();
  }, [userId, router, params]); // Ensure useEffect runs when userId changes

  // Render loading state if userDetails is null
  if (!userDetails) {
    return (
      <div>
        <LoadingAnimation />
      </div>
    );
  }

  // Once userDetails is available, render the user details
  return (
    <div className="mx-auto bg-gradient-to-br from-white/20 to-white/5 backdrop-blur rounded-lg lg:w-3/5 md:w-3/4 sm:w-4/5">
      <div className="w-full  h-auto">
        <div className="w-full h-full flex flex-col">
          {userDetails.cover ? (
            <Image
              src={userDetails?.cover}
              className=" object-cover object-center w-full h-56 rounded-lg "
              alt="Profile"
              width={500}
              height={500}
            />
          ) : (
            <Image
              src={coverPicDefault}
              className=" object-cover object-center w-full h-48 rounded-lg "
              alt="Profile"
              width={500}
              height={500}
            />
          )}

          {userDetails.image ? (
            <Image
              src={userDetails.image}
              alt="Profile Picture"
              className="object-cover h-40 w-40 mx-auto -mt-16 rounded-full border-[1px] border-blue-500 "
              width={128}
              height={128}
            />
          ) : (
            <MdAccountCircle
              className="object-cover h-32 w-32 mx-auto rounded-full border-[1px] border-blue-500 "
              width={128}
              height={128}
            />
          )}
        </div>
        <div className="w-full p-5 flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold mb-5">
            {userDetails?.fullName.charAt(0).toUpperCase() +
              userDetails?.fullName.slice(1)}
          </h1>
          <p className="text-xl font-bold">
            {userDetails?.username.charAt(0).toUpperCase() +
              userDetails?.username.slice(1)}
          </p>
          <p className="text-gray-500 foreground text-sm">{userDetails?.bio}</p>
        </div>
      </div>
    </div>
  );
};
