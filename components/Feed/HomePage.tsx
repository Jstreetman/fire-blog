"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import { app } from "../../app/firebase/config";
import { getDatabase, ref, get } from "firebase/database";
import FeedNavbar from "./FeedNavbar/FeedNavbar";

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
      {/* {userData ? (
        <div className="flex flex-col items-center justify-center py-16 ">
          <h1>User Data:</h1>
          <p>Bio: {userData.bio}</p>
          <p>Full Name: {userData.fullName}</p>
          <p>Username: {userData.username}</p>
          <p>email: {userData.email}</p>
          <button onClick={handleSignOut} className="bg-blue-500 px-4 py-2">
            Sign out
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center py-16 ">
          <h1>
            The food for this feed is currently being prepared. Please come back
            later 🤣
          </h1>
          <button onClick={handleSignOut} className="bg-blue-500 px-4 py-2">
            Sign out
          </button>
        </div>
      )} */}
    </div>
  );
};
