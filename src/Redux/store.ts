import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createPost from "./createPostModalSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import modalReducer from "./postModalSlice";
import userPostReducer from "./userPostsSlice";
import userAccountReducer from "./userAccountSlice";
import feedReducer from "./feedSlice";
import searchUserReducer from "./searchUsersSlice";

const reducer = combineReducers({
  postModal: modalReducer,
  userPosts: userPostReducer,
  userAccount: userAccountReducer,
  feed: feedReducer,
  createPost,
  searchUsers: searchUserReducer,
});
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["feed"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
