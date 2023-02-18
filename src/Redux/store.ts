import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import modalReducer from "./modalSlice";
import userPostReducer from "./userPostsSlice";
import userAccountReducer from "./userAccountSlice";
import feedReducer from "./feedSlice";

const reducer = combineReducers({
  counter: counterReducer,
  modal: modalReducer,
  userPosts: userPostReducer,
  userAccount: userAccountReducer,
  feed: feedReducer,
});
const persistConfig = {
  key: "root",
  storage,
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
