"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import coverPicDefault from "../../../../public/coverpicdefault.avif";
import { MdAccountCircle } from "react-icons/md";
import { app } from "@/app/firebase/config";
import { getAuth } from "firebase/auth";
import { getProfile } from "@/app/firebase/get/getprofile";
import updateUser from "@/app/firebase/put/updateprofile";
import { updateCoverPic } from "@/app/firebase/put/updateprofilephotos";
import { updateProfilePic } from "@/app/firebase/put/updateprofilephotos";
import deleteProfile from "@/app/firebase/delete/profile/deleteprofile";
import { useRouter, useParams } from "next/navigation";
import LoadingAnimation from "@/components/Animations/LoadingAnimation";
import { PostDetails } from "@/components/Feed/Post/FeedPostDetails";
export const MyProfileDesignDetails = ({
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
      <ProfileDesignCard params={useParams()} />
    </motion.div>
  );
};

const ProfileDesignCard = ({ params }: { params: { slug: string } }) => {
  const [userDetails, setUserDetails] = useState(null);
  const auth = getAuth(app);
  const userId = auth.currentUser?.uid;
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
  // Fetch user details and update state
  const otherUid = params.slug;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProfile(userId);
        setUserDetails(data);

        if (params.slug !== userId) {
          router.push(`/myprofile/${userId}`);
        } else if (params.slug === userId) {
          console.log("else");
        }
      } catch (error) {}
    };

    fetchData();
  }, [userId, otherUid, params.slug, router]); // Ensure useEffect runs when userId changes

  // Render loading state if userDetails is null
  if (!userDetails) {
    return (
      <div>
        <LoadingAnimation />
      </div>
    );
  }

  const handleOpenProfilePicModal = async () => {
    setIsLoading(true);
    setIsProfilePicModalOpen(true);

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e: any) => {
      const file = e.target.files[0];
      setSelectedFile(file);

      if (file) {
        setIsRefreshing(true);
        await updateProfilePic(userId, file);
        const data = await getProfile(userId);
        setUserDetails(data);
        setIsRefreshing(false);
        router.refresh();
      }
    };
    input.click();
  };

  const handleOpenModal = async () => {
    setIsLoading(true);
    setIsOpenModal(true);

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e: any) => {
      const file = e.target.files[0];
      setSelectedFile(file);

      if (file) {
        setIsRefreshing(true);
        await updateCoverPic(userId, file);

        const data = await getProfile(userId);
        setUserDetails(data);
        setIsRefreshing(false);
      }
    };
    input.click();
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDeleteClick = () => {
    setIsDeleteConfirmationOpen(true);
  };
  const handleDeleteConfirmation = (confirmed) => {
    if (confirmed) {
      // Call the deleteProfile function here
      deleteProfile(userId);
      // redirect user to /signin
      router.push("/signin");
    }
    setIsDeleteConfirmationOpen(false);
  };

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Update user profile
    await updateUser(userId, newFullName, newUsername, newBio);

    // Refresh user details
    const data = await getProfile(userId);
    setUserDetails(data);

    // Close modal
    handleModalClose();
  };

  // Modal content
  const modalContent = (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
      {isDeleteConfirmationOpen ? (
        <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur p-5 rounded-lg">
          <h1>Are you sure you want to delete your account?</h1>
          <div className="flex justify-between">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleDeleteConfirmation(true)}
            >
              Yes
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleDeleteConfirmation(false)}
            >
              No
            </button>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur p-5 rounded-lg"
        >
          <h1 className="text-xl font-bold mb-5">Update Profile</h1>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-5">
              <label htmlFor="fullName" className="block mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                value={newFullName}
                required
                onChange={(e) => setNewFullName(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full text-black"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="username" className="block mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={newUsername}
                required
                onChange={(e) => setNewUsername(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full text-black"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="bio" className="block mb-2">
                Bio
              </label>
              <input
                type="text"
                id="bio"
                value={newBio}
                required
                onChange={(e) => setNewBio(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full text-black"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Update
              </button>
              <button
                type="button"
                onClick={handleDeleteClick}
                className="bg-red-500 text-white px-4 py-2 rounded-md ml-3 hover:bg-red-600"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={handleModalClose}
                className="bg-red-500 text-white px-4 py-2 rounded-md ml-3 hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  );

  // Once userDetails is available, render the user details
  return (
    <div className="mx-auto bg-gradient-to-br from-white/20 to-white/5 backdrop-blur rounded-lg lg:w-3/5 md:w-3/4 sm:w-4/5">
      <div className="w-full  h-auto">
        <div className="w-full h-full flex flex-col">
          {userDetails.cover ? (
            <Image
              src={userDetails?.cover}
              className=" object-cover object-center w-full h-56 rounded-lg scale-100 hover:cursor-pointer hover:scale-105 active:scale-100 transition-all"
              alt="Profile"
              onClick={handleOpenModal}
              width={500}
              height={500}
            />
          ) : (
            <Image
              src={coverPicDefault}
              className=" object-cover object-center w-full h-48 rounded-lg scale-100 hover:cursor-pointer hover:scale-105 active:scale-100 transition-all"
              alt="Profile"
              width={500}
              onClick={handleOpenModal}
              height={500}
            />
          )}

          {userDetails.image ? (
            <Image
              onClick={handleOpenProfilePicModal}
              src={userDetails.image}
              alt="Profile Picture"
              className="object-cover h-40 w-40 mx-auto -mt-16 rounded-full border-[1px] border-blue-500 scale-100 hover:cursor-pointer hover:scale-110 active:scale-95 transition-all"
              width={128}
              height={128}
            />
          ) : (
            <MdAccountCircle
              onClick={handleOpenProfilePicModal}
              className="object-cover h-32 w-32 mx-auto rounded-full border-[1px] border-blue-500 scale-100 hover:cursor-pointer hover:scale-110 active:scale-95 transition-all"
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

//  <AnimatePresence>{isModalOpen && modalContent}</AnimatePresence>
