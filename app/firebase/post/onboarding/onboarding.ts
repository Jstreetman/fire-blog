import { getDatabase, ref, update, get } from "firebase/database";
import { getAuth } from "firebase/auth";
import OnboardInterface from "@/interfaces/OnboardInterface";
import { NextResponse } from "next/server";
import { app } from "../../config";

export default async function OnboardUser(isBio, isfullname, isuserName) {
  const auth = getAuth(app);
  const user = auth.currentUser;
  const uID = user.uid;
  const db = getDatabase(app);

  const userData: OnboardInterface = {
    bio: isBio,
    fullName: isfullname,
    username: isuserName,
  };
  await update(ref(db, "Users/" + uID), {
    ...userData,
  });
}

export function CheckOnbaord() {
  const auth = getAuth(app);
  if (!auth.currentUser) return; // User is not logged in

  const uid = auth.currentUser.uid;
  console.log(uid);

  const db = getDatabase(app);

  get(ref(db, `Users/${uid}`))
    .then((snapshot) => {
      const userData = snapshot.val();

      if (
        !userData ||
        !userData.bio ||
        !userData.fullName ||
        !userData.username
      ) {
        NextResponse.redirect("/onboarding"); // Redirect to onboarding if data is missing
      } else {
        const redirectUrl = determineRedirectUrl(userData); // Function to determine the redirect URL based on userData
        NextResponse.redirect(redirectUrl);
      }
    })
    .catch((error) => {
      console.error("Error getting user data:", error);
    });
}

function determineRedirectUrl(userData) {
  // Add your logic here to determine the redirect URL based on the userData
  // For example, you can check certain conditions and return different URLs
  if (userData.bio && userData.fullName && userData.username) {
    return "/feed";
  } else {
    return "/onboarding";
  }
}
