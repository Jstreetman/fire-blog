"use client";
import LoadingAnimation from "../Animations/LoadingAnimation";
import PostList from "./PostList";
import { useGetCurrentUser } from "@/lib/react-queries/queries";

const LikedPosts = () => {
  const { data: currentUser } = useGetCurrentUser();

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <LoadingAnimation />
      </div>
    );

  return (
    <>
      {currentUser.liked.length === 0 && (
        <p className="text-light-4">No liked posts</p>
      )}
      <PostList posts={currentUser.liked} showStats={false} />
    </>
  );
};

export default LikedPosts;
