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
  const auth = getAuth(app);
  const currentUserUid = auth.currentUser?.uid;
  console.log("currentUserUid", currentUserUid);

  const user = await getProfile(currentUserUid);
  return (
    <div>
      {" "}
      <MyProfilePage params={params} />{" "}
    </div>
  );
}
