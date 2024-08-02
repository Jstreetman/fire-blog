export type NavLink = {
  imgURL: string;
  route: string;
  label: string;
};

export type UpdateUser = {
  userId: string;
  name: string;
  bio: string;
  imageId: string;
  imageUrl: URL | string;
  file: File[];
};

export type NewPost = {
  userId: string;
  caption: string;
  file: File[];
  location?: string;
  tags?: string;
};

export type UpdatePost = {
  postId: string;
  caption: string;
  imageId: string;
  imageUrl: URL;
  file: File[];
  location?: string;
  tags?: string;
};

export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  followers: number;
  following: number;
  notifications: number;
  bio: string;
};

export type NewUser = {
  name: string;
  email: string;
  username: string;
  password: string;
};
