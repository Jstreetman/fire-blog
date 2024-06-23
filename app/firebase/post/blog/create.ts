import { app } from "../../config";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, get, update } from "firebase/database";
import PostInterface from "@/interfaces/PostInterface";

const auth = getAuth(app);
const db = getDatabase(app);

export default async function createPost(uid, post, title) {
  const userId = auth.currentUser?.uid;
  uid = userId;
  const userRef = ref(db, `Users/${uid}`);
  const userSnapshot = await get(userRef);
  if (userSnapshot.exists()) {
    const user = userSnapshot.val();
    const username = user.username;
    const email = user.email;
    const image = user.image;
    const fullName = user.fullName;
    const bio = user.bio;
    let dateCreatesssd = user.dateCreated;

    //if user exists

    const currentDate = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    //create post
    const postData: PostInterface = {
      key: `${uid}${Date.now()}`,
      uid: uid,
      username: username,
      bio: bio,
      email: email,
      title: title,
      post: post,
      dateCreated: currentDate,
      image: image,
      likes: 0,
      comments: 0,
    };

    const postRef = ref(db, `Posts/${uid}`);

    await update(postRef, {
      [postData.key]: postData,
    });
    console.log("Post created successfully!", postData.key);
  } else {
    return null;
  }
}
