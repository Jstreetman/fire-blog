import { app } from "../config";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, update, ref as ref2 } from "firebase/database";

const auth = getAuth(app);

export async function updateCoverPic(uid, cover) {
  const storage = getStorage(app);
  uid = auth.currentUser?.uid;
  console.log(uid, "From backend");
  const storageRef = ref(storage, `coverPhotos/${uid}`);
  try {
    await uploadBytes(storageRef, cover);
    const downloadURL = await getDownloadURL(storageRef);
    updateUserDBCoverChild(uid, downloadURL);
    console.log("Download URL:", downloadURL);
    // Call the API to update the profile picture
    // You can use the downloadURL here to update the profile picture in your database or wherever needed
  } catch (error) {
    console.error("Error updating cover picture:", error);
  }
}

const updateUserDBCoverChild = (uid, downloadURL) => {
  const db = getDatabase(app);
  uid = auth.currentUser?.uid;
  const userRef = ref2(db, `Users/${uid}`);

  const userData = {
    cover: downloadURL,
  };

  update(userRef, {
    ...userData,
  });
};

export async function updateProfilePic(uid, image) {
  const storage = getStorage(app);
  uid = auth.currentUser?.uid;
  console.log(uid, "From backend");
  const storageRef = ref(storage, `profilePhotos/${uid}`);
  try {
    await uploadBytes(storageRef, image);
    const downloadURL = await getDownloadURL(storageRef);
    updateUserDBProfileChild(uid, downloadURL);
    console.log("Download URL:", downloadURL);
    // Call the API to update the profile picture
    // You can use the downloadURL here to update the profile picture in your database or wherever needed
  } catch (error) {
    console.error("Error updating profile picture:", error);
  }
}

const updateUserDBProfileChild = (uid, downloadURL) => {
  const db = getDatabase(app);
  uid = auth.currentUser?.uid;
  const userRef = ref2(db, `Users/${uid}`);

  const userData = {
    image: downloadURL,
  };
  update(userRef, {
    ...userData,
  });
};
