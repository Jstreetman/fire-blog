import { app } from "../config";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get, child } from "firebase/database";
import { getStorage, ref as ref2, getDownloadURL } from "firebase/storage";

const auth = getAuth(app);
let db = getDatabase(app);

interface Params {
  uid: string;
}

export async function getProfile(uid) {
  const userId = auth.currentUser?.uid;
  uid = userId;
  // console.log("userid", userId);

  db = getDatabase(app);
  const usersRef = ref(db, `Users/${uid}`);
  // console.log("userref", usersRef);
  //get user profile by uid from database
  const snapshot = await get(usersRef);
  if (snapshot.exists()) {
    const userData = snapshot.val();
    const fullName = userData.fullName;
    const username = userData.username;
    const bio = userData.bio;
    const dateCreated = userData.dateCreated;
    const image = userData.image;
    const cover = userData.cover;
    const uid = userData.uid;

    // console.log("User data:", userData.username);

    // getProfilePhotos(uid);
    console.log("User data:", userData.uid);

    return { fullName, username, bio, dateCreated, image, cover, uid };
  } else {
    return null;
  }
}

export const getOtherUserProfile = async (uid: string) => {
  let loggedInUid = auth.currentUser?.uid; // Store the logged-in user's uid in a separate variable
  const database = getDatabase();

  // Define the path to the user profile in the database
  const usersRef = ref(database, `Users/${uid}`);

  const snapshot = await get(usersRef);
  if (snapshot.exists()) {
    const userData = snapshot.val();
    const fullName = userData.fullName;
    const username = userData.username;
    const bio = userData.bio;
    const dateCreated = userData.dateCreated;
    const image = userData.image;
    const uid = userData.uid;
    const retrievedUid = userData.uid; // Use a different variable name to store the retrieved uid
    const cover = userData.cover;
    console.log("User data:", retrievedUid); // Log the retrieved uid
    return { fullName, username, bio, dateCreated, image, cover, uid };
  }
};

export const getProfilePhotos = async (uid) => {
  uid = auth.currentUser?.uid;
  const storage = getStorage(app);
  const storageRef = ref2(storage, `profilePhotos/${uid}`);
  await getDownloadURL(storageRef);

  const url = await getDownloadURL(storageRef);
  // console.log("Profile", url);
  return { url };
};

export const getCoverPhotos = async (uid) => {
  uid = auth.currentUser?.uid;
  const storage = getStorage(app);
  const storageRef = ref2(storage, `coverPhotos/${uid}`);
  getDownloadURL(storageRef)
    .then((downloadURL) => {
      return downloadURL;
    })
    .catch((error) => {
      console.log(error);
    });
};
