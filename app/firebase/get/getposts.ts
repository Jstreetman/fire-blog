import { app } from "../config";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  ref,
  get,
  orderByChild,
  query,
  limitToLast,
} from "firebase/database";

const auth = getAuth(app);
const db = getDatabase(app);

export const getPosts = async (uid) => {
  const userId = auth.currentUser?.uid;
  uid = userId;

  const postRef = ref(db, `Posts/${uid}`);

  const orderedPosts = query(postRef, orderByChild("key"));

  const snapshot = await get(postRef);

  if (snapshot.exists()) {
    const posts = snapshot.val();
    const postKeys = Object.keys(posts);

    const postDataArray = postKeys.map((key) => {
      const post = posts[key];
      console.log("Post data:", postRef, orderByChild(key), query(postRef));

      return {
        key,
        uid: post.uid,
        username: post.username,
        title: post.title,
        postData: post.post,
        dateCreated: post.dateCreated,
        image: post.image,
        likes: post.likes,
        bio: post.bio,
        comments: post.comments,
      };
    });

    console.log("Post data array:", postDataArray.toReversed());

    return {
      posts: postDataArray.toReversed(),
    };
  } else {
    return null;
  }
};
