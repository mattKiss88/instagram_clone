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
import postSettingsReducer from "./postSettingsSlice";
import unfollowModalReducer from "./unfollowModalSlice";

// import other necessary modules...

const reducer = combineReducers({
  postModal: modalReducer,
  userPosts: userPostReducer,
  userAccount: userAccountReducer,
  feed: feedReducer,
  createPost,
  searchUsers: searchUserReducer,
  postSettings: postSettingsReducer,
  unfollowModal: unfollowModalReducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["feed"],
};

const RESET_STATE = "RESET_STATE";

export const resetState = () => ({
  type: RESET_STATE,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === RESET_STATE) {
    state = undefined; // If the action is RESET_STATE, we reset the state.
  }

  return reducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
