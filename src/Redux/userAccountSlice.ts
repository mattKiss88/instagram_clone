import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface InitialState {
  id: number;
  avatar: string;
  bio: string;
  username: string;
  fullName: string;
  followers: number;
  following: number;
  posts: number;
  token: string | null;
}

interface LoginDetails {
  email: string;
  password: string;
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
  token: null,
};

export const loginUser = createAsyncThunk(
  "userAccount/loginUserStatus",
  async (user: LoginDetails, thunkAPI) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      {
        email: user.email,
        password: user.password,
      }
    );

    console.log(response.data, "response.data");

    return response.data;
  }
);

export const userAccountSlice = createSlice({
  name: "userAccount",
  initialState,
  reducers: {
    getUserData: (state, action: PayloadAction<any>) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.token = action.payload.accessToken;
    });
  },
});

export const { getUserData } = userAccountSlice.actions;

export const user = (state: RootState) => state.userAccount;

export default userAccountSlice.reducer;
