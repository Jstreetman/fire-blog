import { app } from "../config";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get, child } from "firebase/database";

const auth = getAuth(app);
let db = getDatabase(app);

export async function getProfile(uid) {
  const userId = auth.currentUser?.uid;
  uid = userId;
  console.log("userid", userId);

  db = getDatabase();
  const usersRef = ref(db, `Users/${uid}`);
  console.log("userref", usersRef);
  //get user profile by uid from database
  const snapshot = await get(usersRef);
  if (snapshot.exists()) {
    const userData = snapshot.val();
    const fullName = userData.fullName;
    const username = userData.username;
    const bio = userData.bio;
    const dateCreated = userData.dateCreated;

    console.log("User data:", userData.username);

    return { fullName, username, bio, dateCreated };
  } else {
    return null;
  }
}
