import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

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
interface SignUpDetails {
  email: string;
  username: string;
  fullName: string;
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
    const header = {
      "Content-Type": "application/json",
      credentials: "include",
      withCredentials: true,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          email: user.email,
          password: user.password,
        },
        { headers: header }
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
export const signUpUser = createAsyncThunk(
  "userAccount/signUpUserStatus",
  async (user: SignUpDetails, thunkAPI) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/signup`,
      {
        userData: {
          email: user.email,
          password: user.password,
          username: user.username,
          fullName: user.fullName,
        },
      }
    );

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
      return {
        ...state,
        token: action.payload.accessToken,
        ...action.payload.user,
      };
    });
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      return {
        ...state,
        token: action.payload.accessToken,
        ...action.payload.user,
      };
    });
  },
});

export const { getUserData } = userAccountSlice.actions;

export const user = (state: RootState) => state.userAccount;

export default userAccountSlice.reducer;
