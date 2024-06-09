import {
  type User,
  signInWithEmailAndPassword,
  signInWithPopup,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged as _onAuthStateChanged,
} from "firebase/auth";

import { createSession, removeSession } from "@/actions/auth-actions";

import { ref, set, get } from "firebase/database";
import { getDatabase } from "firebase/database";

import { app } from "../config";
import UserInterface from "@/interfaces/UserInterface";

const auth = getAuth(app);
const db = getDatabase(app);
const provider = new GoogleAuthProvider();

export function onAuthStateChanged(callback: (authUser: User | null) => void) {
  return _onAuthStateChanged(auth, callback);
}

export default async function signIn(auth, email, password) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const user = userCredential.user;
        console.log("User signed in successfully:", user);
        const uid = user.uid;
        if (uid) {
          createSession(uid);
          console.log("Session created", uid);
        }
        return { result, error: null };
      }
    );
  } catch (error) {
    return { result: null, error };
  }
}

export async function signInWithGoogle() {
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      const creationTime = new Date(result.user.metadata.creationTime);
      const formattedDate = `${creationTime.toLocaleString("default", {
        month: "short",
      })} ${creationTime.getDate()}, ${creationTime.getFullYear()}`;

      const db = getDatabase();

      const userdata: UserInterface = {
        uid: user.uid,
        bio: "",
        email: user.email,
        fullName: "",
        password: "Not Available",
        image: "",
        username: "",
        dateCreated: formattedDate,
      };
      set(ref(db, `Users/${user.uid}`), {
        ...userdata,
      });

      console.log("User signed in successfully:", user.email);
      const uid = auth.currentUser.uid;

      if (uid) {
        createSession(uid + createRandomString(5));
        console.log("Session created successfully");
      }
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
}

export async function signOutWithGoogle() {
  try {
    await auth.signOut();
    await removeSession();
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}

function createRandomString(length: number) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
