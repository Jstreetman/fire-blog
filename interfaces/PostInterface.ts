//Post Interface

interface PostInterface {
  key: string;
  uid: string;
  username: string;
  title: string;
  email: string;
  bio: string;
  post: string;
  dateCreated: string;
  image: string;
  likes?: number;
  comments?: number;
}

interface PostComments {
  //info  of the user that commented on the post
  uid: string;
  username: string;
  email: string;
  post: string;
  dateCreated: string;
  image: string;
  likes?: number;
}

export default PostInterface;
