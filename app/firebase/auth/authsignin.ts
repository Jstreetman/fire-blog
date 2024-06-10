import {
  type User,
  signInWithEmailAndPassword,
  signInWithPopup,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged as _onAuthStateChanged,
  signInWithRedirect,
  UserCredential,
  getRedirectResult,
} from "firebase/auth";
import bcrypt from "bcryptjs-react";

import { createSession, removeSession } from "@/actions/auth-actions";

import { ref, set, get } from "firebase/database";
import { getDatabase } from "firebase/database";

import { app } from "../config";
import UserInterface from "@/interfaces/UserInterface";

const auth = getAuth(app);
const db = getDatabase(app);
const provider = new GoogleAuthProvider();

const encodeEmail = (email) => {
  return email.replace(/\./g, ",");
};

export function onAuthStateChanged(callback: (authUser: User | null) => void) {
  return _onAuthStateChanged(auth, callback);
}

export default async function signIn(auth, email, password) {
  let result = null,
    error = null;
  try {
    // Check if the email already exists in the database
    const emailRef = ref(db, `Emails/${encodeEmail(email)}`);
    const emailSnapshot = await get(emailRef);
    if (!emailSnapshot.exists()) {
      // Email does not exist, return an error
      error = { message: "Email address not found" };
      return { result, error };
    }

    //check if password is correct
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const usercred = userCredential.user;

    // Check if the entered password matches the stored hashed password
    //get the hashed password from the database
    const userRef = ref(db, `Users/${usercred.uid}`);
    const userSnapshot = await get(userRef);
    if (!userSnapshot.exists()) {
      return { result: null, error: { message: "User not found" } };
    }
    const user = userSnapshot.val() as UserInterface;

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      error = { message: "Incorrect password" };
      return { result, error };
    }

    const uid = user.uid;
    createSession(uid);
    console.log("Session created", uid);
    return { result: user, error: null };
  } catch (error) {
    //   const result = await signInWithEmailAndPassword(auth, email, password).then(
    //     (userCredential) => {
    //       const user = userCredential.user;
    //       console.log("User signed in successfully:", user);
    //       const uid = user.uid;
    //       if (uid) {
    //         createSession(uid);
    //         console.log("Session created", uid);
    //       }
    //       return { result, error: null };
    //     }
    //   );
    // } catch (error) {
    return { result: null, error };
  }
}

export async function signInWithGoogle() {
  //add google signin with popup
  signInWithPopup(auth, provider).then((result) => {
    const user = result.user;
    const creationTime = new Date(result.user.metadata.creationTime);
    const formattedDate = `${creationTime.toLocaleString("default", {
      month: "short",
    })} ${creationTime.getDate()}, ${creationTime.getFullYear()}`;

    const db = getDatabase();
    const userData: UserInterface = {
      uid: user.uid,
      bio: "",
      email: user.email,
      fullName: "",
      password: "Not Available",
      image: user.photoURL,
      username: "",
      dateCreated: formattedDate,
    };
    const userRef = ref(db, `Users/${user.uid}`);
    get(userRef).then((snapshot) => {
      if (!snapshot.exists()) {
        set(ref(db, `Users/${user.uid}`), {
          ...userData,
        });
      }
    });

    console.log("User signed in successfully:", user.email);
    const uid = auth.currentUser.uid;

    if (uid) {
      createSession(uid + createRandomString(5));
      console.log("Session created successfully");
    }

    console.log("User signed in successfully:", user);
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
