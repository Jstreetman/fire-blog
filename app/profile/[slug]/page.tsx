import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { getDatabase, ref, get, child } from "firebase/database";
import { app } from "@/app/firebase/config";
import { MyProfilePage } from "@/components/Profile/MyProfilePage";
import { OtherUserProfilePage } from "@/components/Profile/OtherUserProfilePage";
import { OtherProfileDesignDetails } from "@/components/Profile/OtherProfile/OtherProfileDesign/OtherProfileDesignDetails";
import { getProfile } from "@/app/firebase/get/getprofile";
import { MyProfileDesignDetails } from "@/components/Profile/MyProfile/MyProfileDesigns/MyProfileDesignDetails";

export default async function Page({ params }: { params: { slug: string } }) {
  // const [userDetails, setUserDetails] = useState(null);
  const auth = getAuth(app);
  const currentUserUid = auth.currentUser?.uid;

  const user = await getProfile(currentUserUid);

  let uidofauser = user?.uid;
  uidofauser = params.slug;
  // console.log("uidofauser", uidofauser);

  // let uidParams = "";
  // uidParams = params.slug;
  // uidParams.toString();
  // console.log("uidparams", uidParams);
  //todo plans : please implement own user
  //profile component and otheruserprofile component
  //and render them based off if the slug param uid is the same as
  //the current user uid or not

  /**
   * Fetches the username for a given user ID from the database.
   *
   * @param {string} uid - The user ID.
   * @return {Promise<string>} The username for the user.
   * @throws {Error} If the username is not found for the given user ID.
   */
  async function fetchUserDetails(uid: string) {
    // Get the database reference
    const database = getDatabase(app);
    let userid = uid;

    // Define the path to the user profile in the database
    const usersRef = ref(database, "Users");
    const userRef = child(usersRef, uid);
    const usernameRef = child(userRef, "email");

    try {
      // Fetch the username from the database
      const snapshot = await get(usernameRef);

      // If the snapshot exists, return the username
      if (snapshot.exists()) {
        const username = snapshot.val();
        console.log(`Username for UID ${uid}:`, username);
        return username;
      } else {
        // If the snapshot does not exist, throw an error
        throw new Error(`Username not found for UID: ${uid}`);
      }
    } catch (error) {
      // If there is an error fetching the username, log the error and re-throw it
      console.error(`Error fetching username for UID ${uid}:`, error);
      throw error;
    }
  }

  // fetchUserDetails(currentUserUid);

  // useEffect(() => {
  //   const fetchUsername = async () => {
  //     try {
  //       const data = await fetchUserDetails(params.slug);
  //     } catch (error) {
  //       console.error("Error fetching user details:", error);
  //     }
  //   };

  //   fetchUsername();
  // }, [params.slug]);
  // console.log("slug", params.slug);
  // console.log("currentUserUid", currentUserUid);
  params.toString();
  console.log("params", params.toString());
  return (
    <div>
      <OtherUserProfilePage />

      {/* {currentUserUid === params.slug ? (
        <MyProfilePage params={params} />
      ) : (
        <OtherUserProfilePage />
      )} */}

      {/* <MyProfilePage params={params} /> */}
      {/* {userDetails ? <div>Username: {userDetails}</div> : <div>Loading...</div>} */}
    </div>
  );
}
