interface IUser {
  id: string;
  email: string;
  username: string;
  verified: boolean;
  posts: IPost[];
  comments: IComment[];
  followings: ITag[];
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
}

interface IPost {
  id: string;
  title: string;
  url: string;
  description: string;
  remove?: boolean;
  upvote: number;
  downVote: number;
  comments: IComment[];
  createdAt: string;
  updatedAt: string;
  tags?: string[];
}

interface IComment {
  id: string;
  user: IUser;
  post: IPost;
  createdAt: string;
  updatedAt: string;
  reply?: IComment;
  createdAt: string;
  updatedAt: string;
}

interface ITag {
  id: string;
  title: string;
  post: IPost;
  followedBy: IUser;
  createdAt: string;
  updatedAt: string;
}
