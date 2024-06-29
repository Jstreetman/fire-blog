"use client";
import React, { useState, useEffect } from "react";
import FeedNavbar from "@/components/Feed/FeedNavbar/FeedNavbar";
import { OtherProfileDesignDetails } from "./OtherProfileDesignDetails";
import { getAuth } from "firebase/auth";
import {
  getBlogPosts,
  getOtherUserPosts,
  getPosts,
} from "@/app/firebase/get/getposts";
import { app } from "@/app/firebase/config";
import { useParams } from "next/navigation";
import { PostDetails } from "@/components/Feed/Post/FeedPostDetails";

export const OtherProfile = () => {
  const [postDetails, setPostDetails] = useState(null);
  const auth = getAuth(app);
  const userId = auth.currentUser?.uid;
  let otherUid = useParams().slug;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBlogPosts(otherUid);
      setPostDetails(data);
    };
    fetchData();
  }, [postDetails, otherUid]);
  console.log("other profile", useParams().slug);
  return (
    <div>
      <FeedNavbar />
      <OtherProfileDesignDetails params={useParams()} />
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
