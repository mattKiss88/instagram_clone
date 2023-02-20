import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface InitialState {
  posts: any[];
}

const initialState: InitialState = {
  posts: [],
};

export const fetchFeedByUserId = createAsyncThunk(
  "users/fetchByIdStatus",
  async (userId: number, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/post/feed/${userId}`
    );

    console.log("111", response);
    return response.data.feed;
  }
);

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    getUserData: (state, action: PayloadAction<any>) => {
      return action.payload;
    },
    updateLikes: (state, action: PayloadAction<any>) => {
      let a = state.posts.map((data) => {
        if (data?.post.id === action.payload.postId) {
          data.post.likes = !data.post.likes;
        }
        return {
          ...data,
          post: {
            ...data.post,
            likes: !data.post.likes,
          },
        };
      });

      return {
        posts: a,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFeedByUserId.fulfilled, (state, action) => {
      // Add user to the state array
      state.posts = action.payload;
    });
  },
});

export const { getUserData, updateLikes } = feedSlice.actions;

export const feed = (state: RootState) => state.feed.posts;

export default feedSlice.reducer;
