import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Post {
  post: {
    id: number;
    userId: number;
    filterId: any;
    caption: string;
    createdAt: string;
    updatedAt: string;
  };

  images: any[];
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
