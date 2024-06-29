import { app } from "../../config";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, get, update, push } from "firebase/database";
import PostInterface from "@/interfaces/PostInterface";

const auth = getAuth(app);
const db = getDatabase(app);

export default async function cjreatePost(
  uid,
  post,
  title
): Promise<string | null> {
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
    let dateCreated = user.dateCreated;

    const currentDate = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const postData: PostInterface = {
      key: `${uid}_${Date.now()}`,
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

    const postRef = ref(db, `Posts/${postData.key}`);

    await set(postRef, postData);
    console.log("Post created successfully!", postData.key);

    return postData.key;
  } else {
    return null;
  }
}

export async function createPost(uid, post, title) {
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

    const postRef = ref(db, `Posts/${postData.key}`);

    await update(postRef, {
      [postData.key]: postData,
    });
    console.log("Post created successfully!", postData.key);
  } else {
    return null;
  }
}

export const createBlogPost = async (uid, post, title) => {
  const db = getDatabase();
  const userId = auth.currentUser?.uid;

  uid = userId;

  const postList = ref(db, "Posts");
  const userRef = ref(db, `Users/${uid}`);

  const userSnapshot = await get(userRef);
  if (userSnapshot.exists()) {
    const user = userSnapshot.val();
    const username = user.username;
    const email = user.email;
    const image = user.image;
    const fullName = user.fullName;
    const bio = user.bio;
    let dateCreated = user.dateCreated;

    const currentDate = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const newPostRef = push(postList);
    const postData: PostInterface = {
      key: newPostRef.key,
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
    set(newPostRef, {
      ...postData,
    });
  }
};
