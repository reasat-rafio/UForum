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
  likedComments?: IComment[];
  likedComments?: IComment[];
  likedPost?: IPost[] | string;
  dislikedPost?: IPost[] | string;
}

interface IPost {
  id: string;
  title: string;
  url: string;
  description: string;
  removed?: boolean;
  upvote: number;
  downVote: number;
  comments: IComment[];
  createdAt: string;
  updatedAt: string;
  tags?: string[];
  likedBy?: IUser[];
  dislikedBy?: IUser[];
  postedBy: IUser;
}

interface IComment {
  id: string;
  user: IUser;
  post: IPost;
  comment: string;
  createdAt: string;
  updatedAt: string;
  reply?: IComment;
  createdAt: string;
  updatedAt: string;
  upvote: number;
  downVote: number;
  likedBy?: IPost[];
  dislikedBy?: IPost[];
  postID?: string;
}

interface ITag {
  id: string;
  title: string;
  post: IPost;
  followedBy: IUser;
  createdAt: string;
  updatedAt: string;
}
