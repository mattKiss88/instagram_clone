import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import type { PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  id: number;
  avatar: string;
  bio: string;
  username: string;
  fullName: string;
  followers: number;
  following: number;
  posts: number;
}

const initialState: InitialState = {
  id: 0,
  avatar: "",
  bio: "",
  username: "",
  fullName: "",
  followers: 0,
  following: 0,
  posts: 0,
};

export const userAccountSlice = createSlice({
  name: "userAccount",
  initialState,
  reducers: {
    getUserData: (state, action: PayloadAction<any>) => {
      console.log("payload", action.payload);

      return action.payload;
    },
  },
});

export const { getUserData } = userAccountSlice.actions;

export const user = (state: RootState) => state.userAccount;

export default userAccountSlice.reducer;
