import { app } from "../config";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get, child } from "firebase/database";
import { getStorage, ref as ref2, getDownloadURL } from "firebase/storage";

const auth = getAuth(app);
let db = getDatabase(app);

export async function getProfile(uid) {
  const userId = auth.currentUser?.uid;
  uid = userId;
  // console.log("userid", userId);

  db = getDatabase();
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

    // console.log("User data:", userData.username);

    // getProfilePhotos(uid);

    return { fullName, username, bio, dateCreated, image, cover };
  } else {
    return null;
  }
}

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
