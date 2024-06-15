"use client";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { getDatabase, ref, get, child } from "firebase/database";
import { app } from "@/app/firebase/config";
import { MyProfilePage } from "@/components/Profile/MyProfilePage";

export default function Page({ params }: { params: { slug: string } }) {
  const [userDetails, setUserDetails] = useState(null);
  const auth = getAuth(app);

  //todo plans : please implement own user
  //profile component and otheruserprofile component
  //and render them based off if the slug param uid is the same as
  //the current user uid or not

  async function fetchUserDetails(uid: string) {
    //get any user profile by uid from database
    const database = getDatabase(app);
    const usersRef = ref(database, "Users");
    const userRef = child(usersRef, uid);
    const usernameRef = child(userRef, "email");

    try {
      const snapshot = await get(usernameRef);
      if (snapshot.exists()) {
        const username = snapshot.val();
        console.log("Username for UID " + uid + ":", username);
        return username;
      } else {
        throw new Error("Username not found for UID: " + uid);
      }
    } catch (error) {
      console.error("Error fetching username for UID: " + uid, error);
      throw error;
    }
  }

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const username = await fetchUserDetails(params.slug);
        setUserDetails(username);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUsername();
  }, [params.slug]);

  return (
    <div>
      <MyProfilePage />
      {/* {userDetails ? <div>Username: {userDetails}</div> : <div>Loading...</div>} */}
    </div>
  );
}
