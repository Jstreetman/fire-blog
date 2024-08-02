"use client";
import { Models } from "appwrite";

import { useGetCurrentUser } from "@/lib/react-queries/queries";
import PostList from "../Profile/PostList";
import LoadingAnimation from "../Animations/LoadingAnimation";
import { motion } from "framer-motion";

const SavedPosts = () => {
  const { data: currentUser } = useGetCurrentUser();

  const savePosts = currentUser?.save
    .map((savePost: Models.Document) => ({
      ...savePost.post,
      creator: {
        imageUrl: currentUser.imageUrl,
      },
    }))
    .reverse();

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
      className="saved-container">
      <div className="flex gap-2 w-full max-w-5xl">
        <img
          src="/assets/icons/save.svg"
          width={36}
          height={36}
          alt="edit"
          className="invert-white"
        />
        <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
      </div>

      {!currentUser ? (
        <LoadingAnimation />
      ) : (
        <ul className="w-full flex justify-center max-w-5xl gap-9">
          {savePosts.length === 0 ? (
            <p className="text-light-4">No available posts</p>
          ) : (
            <PostList posts={savePosts} showStats={false} />
          )}
        </ul>
      )}
    </motion.div>
  );
};

export default SavedPosts;
