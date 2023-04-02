import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IImages } from "../Components/FeedCard/types";

interface Post {
  post: {
    id: number;
    userId: number;
    filterId: any;
    caption: string;
    createdAt: string;
    updatedAt: string;
  };

  images: IImages[];
}

interface InitialState {
  posts: Post[];
}

const initialState: InitialState = {
  posts: [],
};

export const userPostSlice = createSlice({
  name: "userPosts",
  initialState,
  reducers: {
    getPosts: (state, action: PayloadAction<any>) => {
      state.posts = action.payload;
    },
  },
});

export const { getPosts } = userPostSlice.actions;

export const posts = (state: RootState) => state.userPosts.posts;

export default userPostSlice.reducer;
