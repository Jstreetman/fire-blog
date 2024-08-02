"use client";
import { Models } from "appwrite";
import LoadingAnimation from "../Animations/LoadingAnimation";
import PostCard from "./FeedPostCard/PostCard";
import { useGetRecentPosts, useGetUsers } from "@/lib/react-queries/queries";

import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";

const HomePage = () => {
  const {
    data: posts,
    isLoading: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();
  const {
    data: creators,
    isLoading: isUserLoading,
    isError: isErrorCreators,
  } = useGetUsers(10);

  if (isErrorPosts || isErrorCreators) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
        <div className="home-creators">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 h-screen">
      <div className="home-container">
        <div className="home-posts">
          {/* <FeedPostCard /> */}
          <motion.h2
            initial={{ opacity: 0, y: -1000 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.25, ease: "easeInOut" }}
            className="h3-bold md:h2-bold text-left w-full">
            Home Feed
          </motion.h2>

          {isPostLoading && !posts ? (
            <LoadingAnimation />
          ) : (
            <motion.ul
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 1.5, ease: "easeInOut" }}
              className="flex flex-col flex-1 gap-9 w-full ">
              {posts?.documents.map((post: Models.Document) => (
                <li key={post.$id} className="flex justify-center w-full">
                  <PostCard post={post} />
                </li>
              ))}
            </motion.ul>
          )}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.3, delay: 1.25, ease: "easeInOut" }}
        className="home-creators">
        <h3 className="h3-bold text-light-1">Creator</h3>

        <ul className="grid 2xl:grid-cols-2 gap-6">
          <li>
            <div className="user-card bg-gradient-to-br from-white/20 to-white/5 backdrop-blur">
              <img
                src={"/assets/images/jrs.png"}
                alt="creator"
                className="rounded-full w-14 h-14"
              />
              <div className="flex-center flex-col gap-1">
                <p className="base-medium text-light-1 text-center line-clamp-1">
                  JStreetman
                </p>
                <Link
                  href={"https://github.com/Jstreetman/fire-blog"}
                  target="_blank">
                  <Button
                    type="button"
                    size="sm"
                    className="mt-3 rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-2 text-lg text-zinc-50 ring-2 ring-blue-500/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70">
                    Fork Project
                  </Button>
                </Link>
              </div>
            </div>
          </li>
        </ul>
      </motion.div>
    </div>
  );
};

export default HomePage;
