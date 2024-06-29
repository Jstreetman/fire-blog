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

  let keyl = "";
  const postRef = ref(db, `Posts/${keyl}`);
  const userRef = ref(db, `Users/${uid}`);

  const orderedPosts = query(postRef, orderByChild("key"));

  const userSnapshot = await get(userRef);
  const user = userSnapshot.val();
  let userUid = "";
  if (userSnapshot.exists()) {
    userUid = userSnapshot.val().uid;
    // console.log("User UID:", userUid);
  }

  const snapshot = await get(postRef);

  if (snapshot.exists()) {
    const posts = snapshot.val();
    const postKeys = Object.keys(posts);

    const postDataArray = postKeys
      .map((key) => {
        keyl = key;
        // console.log("Key:", keyl);
        const post = posts[key];

        if (post.uid === userUid) {
          // console.log("PostUid:", post.uid, "UserUid:", userUid);
          // console.log("Post data:", postRef, orderByChild(key), query(postRef));

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
        }
      })
      .filter(Boolean); // Remove any undefined elements

    // console.log("Post data array:", postDataArray.toReversed());

    return {
      posts: postDataArray.toReversed(),
    };
  } else {
    return null;
  }
};
export const getOtherUserPosts = async (uid) => {
  const db = getDatabase(app);

  const userId = auth.currentUser?.uid;

  let keyl = "";
  const postRef = ref(db, `Posts/${keyl}`);

  const snapshot = await get(postRef);
  if (snapshot.exists()) {
    const posts = snapshot.val();
    const postKeys = Object.keys(posts);
    const postDataArray = postKeys.map((key) => {
      keyl = key;
      const post = posts[key];
      // console.log("Post data:", postRef, orderByChild(key), query(postRef));
      console.log("Post data:", post.uid);
      uid = post.uid;
      if (post.uid === uid) {
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
      } else {
        return null;
      }
    });
    // console.log("Post data array:", postDataArray.toReversed());
    return {
      posts: postDataArray.filter((post) => post !== null).toReversed(),
    };
  }
};

export const getBlogPosts = async (uid) => {
  const userId = auth.currentUser?.uid;

  let keyl = "";
  const postRef = ref(db, `Posts/${keyl}`);
  const userRef = ref(db, `Users/${uid}`);

  const orderedPosts = query(postRef, orderByChild("key"));

  const userSnapshot = await get(userRef);
  const user = userSnapshot.val();
  let userUid = "";
  if (userSnapshot.exists()) {
    userUid = userSnapshot.val().uid;
    // console.log("User UID:", userUid);
  }

  const snapshot = await get(postRef);

  if (snapshot.exists()) {
    const posts = snapshot.val();
    const postKeys = Object.keys(posts);

    const postDataArray = postKeys
      .map((key) => {
        keyl = key;
        // console.log("Key:", keyl);
        const post = posts[key];
        uid = post.uid;
        if (post.uid === userUid) {
          // console.log("PostUid:", post.uid, "UserUid:", userUid);
          // console.log("Post data:", postRef, orderByChild(key), query(postRef));

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
        }
      })
      .filter(Boolean); // Remove any undefined elements

    // console.log("Post data array:", postDataArray.toReversed());

    return {
      posts: postDataArray.toReversed(),
    };
  } else {
    return null;
  }
};
