"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import profileIcon from "../../../../public/icons/profile.png";
import { MdAccountCircle, MdCreate } from "react-icons/md";
import { app } from "@/app/firebase/config";
import { getAuth } from "firebase/auth";
import { getProfile } from "@/app/firebase/get/getprofile";
import updateUser from "@/app/firebase/put/updateprofile";
import deleteProfile from "@/app/firebase/delete/profile/deleteprofile";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFullName, setNewFullName] = useState(userDetails?.fullName || "");
  const [newUsername, setNewUsername] = useState(userDetails?.username || "");
  const [newBio, setNewBio] = useState(userDetails?.bio || "");
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
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

  // Function to handle modal open/close
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
      <div className="w-full">
        <div className="flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg h-64">
          <MdAccountCircle className="w-32 h-32" />
          <h1 className="text-3xl font-bold">{userDetails.fullName}</h1>{" "}
        </div>
        <div className="p-5 flex flex-col">
          <div className="flex justify-end">
            <MdCreate
              className="w-8 h-8 rounded-full hover:bg-white/35 hover:cursor-pointer hover:scale-110 active:scale-95 transition-all"
              onClick={handleModalOpen}
            />
          </div>
          <h1>{userDetails.username}</h1>
          <p>{userDetails.bio}</p>
          <h6>Date Joined: {userDetails.dateCreated}</h6>
          <h6>Followers: 0 {userDetails.followers}</h6>
          <h6>Following: 0 {userDetails.following}</h6>
        </div>
      </div>
      <AnimatePresence>{isModalOpen && modalContent}</AnimatePresence>
    </div>
  );
};
