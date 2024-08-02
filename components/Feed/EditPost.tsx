"use client";
import { useRouter, useParams } from "next/navigation";
import { useGetPostById } from "@/lib/react-queries/queries";
import LoadingAnimation from "../Animations/LoadingAnimation";
import PostForm from "./FeedPostCard/PostForm";
import { motion } from "framer-motion";

const EditPost = () => {
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading } = useGetPostById(id);
  const router = useRouter();

  if (isLoading)
    return (
      <div className="flex-center w-full h-full">
        <LoadingAnimation />
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.8, ease: "easeInOut", delay: 0.5 }}
      className="flex flex-1">
      <div className="common-container">
        <div className="flex-start gap-3 justify-start w-full max-w-5xl">
          <img
            src="/assets/icons/edit.svg"
            width={36}
            height={36}
            alt="edit"
            className="invert-white"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
        </div>

        {isLoading ? (
          <LoadingAnimation />
        ) : (
          <PostForm action="Update" post={post} />
        )}
      </div>
    </motion.div>
  );
};

export default EditPost;
