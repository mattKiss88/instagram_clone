import { IUser } from "../Comment/types";

export interface IPostData {
  images: IImages[];
  post: IPost;
  user: IUser;
}

export interface IImages {
  createdAt: string;
  filter: string | null;
  filterId: number | null;
  id: number;
  mediaFileId: number;
  position: number;
  postId: number;
  updatedAt: string;
}

export interface IPost {
  caption: string;
  createdAt: string;
  id: number;
  likeCount: number;
  likes: boolean;
  updatedAt: string;
  userId: number;
  commentCount?: number;
}
