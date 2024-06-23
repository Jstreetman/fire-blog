"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdAccountCircle, MdComment } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { app } from "@/app/firebase/config";
import { getAuth } from "firebase/auth";
import { getPosts } from "@/app/firebase/get/getposts";
import Image from "next/image";

export const FeedPostDetails = () => {
  const auth = getAuth(app);
  const userId = auth.currentUser?.uid;
  const [userDetails, setUserDetails] = useState(null);
  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");
  const [key, setKey] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPosts(userId);
      setUserDetails(data);
    };

    fetchData();
  }, [userId, post, title]);
  return (
    <div className="mt-3">
      {userDetails?.posts.map((post) => (
        <PostDetails
          key={post.key}
          title={post.title}
          username={post.username}
          bio={post.bio}
          image={post.image}
          postData={post.postData}
          likes={post.likes}
          comments={post.comments}
        />
      ))}
    </div>
  );
};

export const PostDetails = (props: any) => {
  //
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut", delay: 0.8 }}
      className="mx-auto  bg-gradient-to-br from-white/20 to-white/5 backdrop-blur  lg:w-3/5 md:w-9/12 rounded-xl mb-4 "
    >
      <div key={props.key}>
        <div className="flex flex-col items-start " key={props.key}>
          <div className="flex flex-row p-3 gap-4 items-center ">
            {props.image ? (
              <Image
                src={props.image}
                alt="Profile Picture"
                className="object-cover h-12 w-12 rounded-full border-[1px] border-blue-500 scale-100 hover:cursor-pointer hover:scale-110 active:scale-95 transition-all"
                width={128}
                height={128}
              />
            ) : (
              <MdAccountCircle className="h-12 w-12" />
            )}
            <div className="flex flex-col">
              <h1 className="content-start font-bold text-lg">
                {props.username}
              </h1>
              <h3 className="content-start font-thin text-xs">{props.bio}</h3>
            </div>
          </div>
          <div className="flex flex-col p-3">
            <h1 className="content-start font-bold">{props.title}</h1>
            <p className="content-start font-mono font-extrabold mt-3">
              {props.postData}
            </p>
          </div>

          <div className="flex flex-row gap-3 p-3">
            <h6>Likes: {props.likes}</h6>
            <h6>Comments: {props.comments}</h6>
          </div>
          <div className="flex flex-row h-1 w-full bg-blue-500 rounded-lg" />
        </div>
        <div className="flex flex-row p-3 justify-between items-center">
          <button className="flex flex-row gap-1 items-center">
            <FaHeart className="align-middle" />
            <span className="align-middle">Like</span>
          </button>
          <button className="flex flex-row gap-1 items-center">
            <MdComment className="align-middle" />
            <span className="align-middle">Comment</span>
          </button>
        </div>
      </div>
      {/* ))} */}
    </motion.div>
  );
};
