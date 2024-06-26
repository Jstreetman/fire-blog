"use client";
import { useState, useEffect } from "react";
import { app } from "@/app/firebase/config";
import { getAuth } from "firebase/auth";
import { FeedPostCard } from "@/components/Feed/FeedPostCard/FeedPostCard";
import { MyProfileDesignDetails } from "./MyProfileDesignDetails";
import { getPosts } from "@/app/firebase/get/getposts";
import { PostDetails } from "@/components/Feed/Post/FeedPostDetails";

export const MyProfile = ({ params }: { params: { slug: string } }) => {
  const [postDetails, setPostDetails] = useState(null);
  const auth = getAuth(app);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPosts(userId);
      setPostDetails(data);
    };
    fetchData();
  }, [postDetails, userId]);

  return (
    <div className="">
      <MyProfileDesignDetails params={params} />
      <FeedPostCard />
      <div className="mt-3">
        {postDetails?.posts.map((post) => (
          <PostDetails
            key={post.key}
            title={post?.title}
            username={post.username}
            bio={post.bio}
            uid={post.uid}
            image={post.image}
            postData={post.postData}
            likes={post.likes}
            comments={post.comments}
          />
        ))}
      </div>
    </div>
  );
};
