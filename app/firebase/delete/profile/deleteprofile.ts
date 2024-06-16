import { app } from "../../config";
import { getAuth, deleteUser } from "firebase/auth";
import { getDatabase, ref, remove, get } from "firebase/database";
import { removeSession } from "@/actions/auth-actions";

const auth = getAuth(app);
let db = getDatabase(app);

const encodeEmail = (email) => {
  return email.replace(/\./g, ",");
};

export default async function deleteProfile(uid) {
  const userId = auth.currentUser?.uid;
  uid = userId;
  const userEmail = auth.currentUser?.email;
  const email = encodeEmail(userEmail);
  db = getDatabase();
  const emailRef = ref(db, `Emails/${encodeEmail(email)}`);

  const usersRef = ref(db, `Users/${uid}`);
  await remove(usersRef);
  //check if email exists
  const emailSnapshot = await get(emailRef);
  if (emailSnapshot.exists()) {
    await remove(emailRef);
  }
  await removeSession();

  await deleteUser(auth.currentUser);
}
