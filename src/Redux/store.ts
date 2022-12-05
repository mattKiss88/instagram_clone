import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import modalReducer from "./modalSlice";
import userPostReducer from "./userPostsSlice";
import userAccountReducer from "./userAccountSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    modal: modalReducer,
    userPosts: userPostReducer,
    userAccount: userAccountReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
