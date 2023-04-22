import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getUserPosts } from "../Api";
import { getUserDetails } from "./userAccountSlice";
import { getPosts } from "./userPostsSlice";
import { removePost as removePostFromFeed } from "./feedSlice";
import { IPostData } from "../Components/FeedCard/types";

interface InitialState {
  isLoggedInUser: boolean;
  isFollowing: boolean;
  isOpen: boolean;
  postId?: number;
  userId?: number;
  postData?: IPostData | null;
}

const initialState: InitialState = {
  isLoggedInUser: false,
  isFollowing: false,
  isOpen: false,
  postId: 0,
  userId: 0,
  postData: null,
};

export const deletePost = createAsyncThunk(
  "user/deletePostStatus",
  async (
    { postId, userId }: { postId: number; userId: number },
    { dispatch }
  ) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/post/${postId}`
      );

      let res = await getUserPosts(userId);
      dispatch(getPosts(res));
      dispatch(getUserDetails(userId) as any);
      dispatch(removePostFromFeed(postId));
      return response.data;
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const postSettingsSlice = createSlice({
  name: "postSettings",
  initialState,
  reducers: {
    togglePostSettingsModal: (state, action: PayloadAction<void>) => {
      state.isOpen = !state.isOpen;
    },
    resetPostSettingsModal: (state, action: PayloadAction<void>) => {
      state = initialState;
    },
    setPostSettingsModal: (state, action: PayloadAction<InitialState>) => {
      return { ...action.payload };
    },
  },
});

export const {
  togglePostSettingsModal,
  resetPostSettingsModal,
  setPostSettingsModal,
} = postSettingsSlice.actions;

export const isPostSettingsModalOpen = (state: RootState) =>
  state.postSettings.isOpen;

export default postSettingsSlice.reducer;
