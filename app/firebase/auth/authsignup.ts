import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { ref, set, get } from "firebase/database";
import { getDatabase } from "firebase/database";
import bcrypt from "bcryptjs-react";
import { app } from "../config";
import UserInterface from "@/interfaces/UserInterface";

const auth = getAuth(app);
const db = getDatabase(app);

const saltRounds = 10; // Adjust the number of salt rounds as needed

// Function to encode an email address to make it suitable for use as a Firebase Realtime Database path
const encodeEmail = (email) => {
  return email.replace(/\./g, ",");
};

export default async function signUp(auth, email, password) {
  let result = null,
    error = null;
  try {
    // Check if the email already exists in the database
    const emailRef = ref(db, `Emails/${encodeEmail(email)}`);
    const emailSnapshot = await get(emailRef);
    if (emailSnapshot.exists()) {
      // Email already exists, return an error
      error = { message: "Email address already in use" };
      return { result, error };
    }
    if (password.length < 10) {
      error = { message: "Passwords must be at least 10 characters" };
      return { result, error };
    }
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user account
    result = await createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("User created successfully:", user);
      }
    );

    // Obtain the user's UID from the result
    const uid = auth.currentUser?.uid;
    console.log("User's UID:", uid);

    // Save the email to the 'Emails' node in the database
    await set(emailRef, true);

    // Create a reference to the location in the database where user data will be stored
    const userRef = ref(db, `Users/${uid}`);

    const currentDate = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    // Save the user's data to the Realtime Database
    const userData: UserInterface = {
      uid: uid,
      bio: "",
      email: email,
      fullName: "",
      password: hashedPassword,
      image: "",
      username: "",
      dateCreated: currentDate,
    };
    await set(userRef, {
      ...userData,
      // Save the current date/time as the creation date
    });
  } catch (e) {
    error = e;
    console.log(e);
  }

  return { result, error };
}
