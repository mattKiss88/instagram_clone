import { IImages, IPost } from "../FeedCard/types";

export interface IComment {
  comment: string;
  commentRepliedToId: null | number;
  createdAt: string;
  createdByUserId: number;
  id: number;
  likeCount: number;
  liked: boolean;
  postId: number;
  subCommentCount: number;
  updatedAt: string;
  subComments: IComment[];
  user: IUser;
}

export interface IUser {
  avatar: string;
  bio: string | null;
  createdAt: string;
  dob: string | null;
  email: string;
  followers: number;
  following: number;
  fullName: string;
  id: number;
  updatedAt: string;
  username: string;
  posts?: {
    images: IImages[];
    post: IPost;
  }[];
}
