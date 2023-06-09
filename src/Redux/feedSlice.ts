import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import modalSlice, { updateModalLikes } from "./postModalSlice";
import { IPostData } from "../Components/FeedCard/types";
import { IUser } from "../Components/Comment/types";
import { followUser, unfollowUser } from "./userAccountSlice";

interface InitialState {
  posts: IPostData[];
  recommendedUsers: IUser[];
  page: number;
  isFetching: boolean;
  hasMore: boolean;
}

const initialState: InitialState = {
  posts: [],
  recommendedUsers: [],
  page: 1,
  isFetching: false,
  hasMore: true,
};

export const fetchFeedByUserId = createAsyncThunk(
  "feed/fetchByIdStatus",
  async (userId: number, { getState, dispatch }) => {
    const state = getState() as RootState;
    const { rehydrated } = state._persist;
    const { posts, page, isFetching, hasMore } = state.feed;

    if (isFetching || !hasMore) {
      return;
    }

    dispatch(fetchPostRequest());

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/post/feed/${userId}?page=${page}&limit=5`
      );

      const hasMore = response.data.feed.length > 0;

      dispatch(fetchPostSuccess({ feed: response.data.feed, hasMore }));
    } catch (error) {
      dispatch(fetchPostFailure());
    }
  }
);

export const fetchRecommendedUsers = createAsyncThunk(
  "feed/fetchRecommendedUsers",
  async (_, { getState }) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/post/recommended`
    );

    return response.data.users;
  }
);

export const followRecommendedUsers = createAsyncThunk(
  "feed/followRecommendedUsers",
  async (followingUserId: number, { getState, dispatch }) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/follow`,
      {
        userId: followingUserId,
      }
    );

    if (response?.data?.msg === "You are now following this user") {
      dispatch(followUser(followingUserId));
    }

    if (response?.data?.msg === "You have unfollowed this user") {
      dispatch(unfollowUser(followingUserId));
    }

    return response.data;
  }
);

export const updatePostLikes = createAsyncThunk(
  "feed/updatePostLikes",
  async (postId: number, { getState, dispatch }) => {
    dispatch(feedSlice.actions.updateLikes(postId));
    dispatch(updateModalLikes());
    return postId;
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
              isLiked: !data.post.isLiked,
              likeCount: !data.post.isLiked
                ? data.post.likeCount + 1
                : data.post.likeCount - 1,
            },
          };
        }

        return data;
      });

      return {
        ...state,
        posts: [...updatePostLike],
      };
    },

    fetchPostRequest: (state) => {
      return {
        ...state,
        isFetching: true,
      };
    },
    fetchPostSuccess: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        isFetching: false,
        posts: [...state.posts, ...action.payload.feed].filter(
          (post, index, self) =>
            index === self.findIndex((t) => t.post.id === post.post.id)
        ),
        page: state.page + 1,
        hasMore: action.payload.hasMore,
      };
    },
    fetchPostFailure: (state, action: PayloadAction<void>) => {
      return {
        ...state,
        isFetching: false,
      };
    },
    pushCreatedPost: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    },
    removePost: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        posts: state.posts.filter((post) => post.post.id !== action.payload),
      };
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(fetchFeedByUserId.fulfilled, (state, action) => {
    //   state.posts = [...state.posts, ...action.payload];
    // });
    builder.addCase(fetchRecommendedUsers.fulfilled, (state, action) => {
      state.recommendedUsers = action.payload;
    });
  },
});

export const {
  getUserData,
  updateLikes,
  fetchPostRequest,
  fetchPostSuccess,
  fetchPostFailure,
  pushCreatedPost,
  removePost,
} = feedSlice.actions;

export const feed = (state: RootState) => state.feed.posts;

export default feedSlice.reducer;
