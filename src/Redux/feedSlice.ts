import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface InitialState {
  posts: any[];
  recommendedUsers: any[];
}

const initialState: InitialState = {
  posts: [],
  recommendedUsers: [],
};

export const fetchFeedByUserId = createAsyncThunk(
  "feed/fetchByIdStatus",
  async (userId: number, { getState }) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/post/feed/${userId}`
    );

    return response.data.feed;
  }
);

export const fetchRecommendedUsers = createAsyncThunk(
  "feed/fetchRecommendedUsers",
  async (_, { getState }) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/post/recommended`
    );

    console.log(response, "response ------------------------->");

    return response.data.users;
  }
);

export const followRecommendedUsers = createAsyncThunk(
  "feed/followRecommendedUsers",
  async (followingUserId: number, { getState }) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/follow`,
      {
        userId: followingUserId,
      }
    );

    console.log(response, "response01 ------------------------->");

    return response.data;
  }
);

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    getUserData: (state, action: PayloadAction<any>) => {
      return action.payload;
    },
    updateLikes: (state, action: PayloadAction<number>) => {
      let updatePostLike = state.posts.map((data) => {
        if (data?.post.id === action.payload) {
          return {
            ...data,
            post: {
              ...data.post,
              likes: !data.post.likes,
            },
          };
        }
        return {
          ...data,
        };
      });

      console.log(updatePostLike, "updatePostLike ------------------------");

      return {
        ...state,
        posts: [...updatePostLike],
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFeedByUserId.fulfilled, (state, action) => {
      // Add user to the state array
      state.posts = action.payload;
    });
    builder.addCase(fetchRecommendedUsers.fulfilled, (state, action) => {
      // Add user to the state array
      state.recommendedUsers = action.payload;
    });
  },
});

export const { getUserData, updateLikes } = feedSlice.actions;

export const feed = (state: RootState) => state.feed.posts;

export default feedSlice.reducer;
