import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import modalReducer from "./modalSlice";
import userPostReducer from "./userPostsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    modal: modalReducer,
    userPosts: userPostReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
