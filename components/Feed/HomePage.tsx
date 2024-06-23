"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import { app } from "../../app/firebase/config";
import { getDatabase, ref, get } from "firebase/database";
import FeedNavbar from "./FeedNavbar/FeedNavbar";
import { FeedPostCard } from "./FeedPostCard/FeedPostCard";
import { FeedPost } from "./Post/FeedPost";
import { PostDetails } from "./Post/FeedPostDetails";

export const HomePage = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const [userData, setUserData] = useState(null);

  //TODO: Add Components for Feed Page Here...

  useEffect(() => {
    const fetchData = async () => {
      if (!auth.currentUser) return; // User is not logged in

      const uid = auth.currentUser.uid;

      const db = getDatabase(app);

      try {
        const snapshot = await get(ref(db, `Users/${uid}`));
        const userData = snapshot.val();

        if (
          !userData ||
          !userData.bio ||
          !userData.fullName ||
          !userData.username
        ) {
          router.push("/onboarding"); // Redirect to onboarding if data is missing
        } else {
          setUserData(userData);
        }
      } catch (error) {
        console.error("Error getting user data:", error);
      }
    };

    fetchData();
  }, [auth.currentUser, router]);

  return (
    <div>
      <FeedNavbar />
      <div className="py-16 ">
        <FeedPostCard />
      </div>
      <FeedPost />
    </div>
  );
};
