import { app } from "../config";
import { getAuth } from "firebase/auth";
import { getDatabase, update, ref } from "firebase/database";

const auth = getAuth(app);

export default async function updateUser(uid, username, fullName, bio) {
  let db = getDatabase(app);

  const userId = auth.currentUser?.uid;
  uid = userId;

  db = getDatabase();
  const usersRef = ref(db, `Users/${uid}`);
  //add image and cover later
  const userData = {
    username: username,
    fullName: fullName,
    bio: bio,
  };

  await update(usersRef, {
    ...userData,
  });
}
