import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { getUser } from "../Api";

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
  friends: number[];
  imgLoading: boolean;
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
  friends: [],
  imgLoading: false,
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
  async (user: SignUpDetails, { dispatch, rejectWithValue }) => {
    try {
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
      console.log(response.status, "response");

      if (response.status === 201) {
        return dispatch(logUserIn(response.data));
      } else {
        return rejectWithValue(response.data);
      }
    } catch (err: any) {
      let error = err;
      // This is likely an error coming from Axios, so we'll try to get its response
      if (err.response) {
        error = err.response.data;
      }
      // We reject with value here to customize the error message
      return rejectWithValue({
        message:
          err?.response?.data?.message ||
          "Something went wrong, please try again later",
      });
    }
  }
);

export const patchProfileImage = createAsyncThunk(
  "userAccount/patchProfileImageStatus",
  async (imgFile: File, { dispatch }) => {
    const formData = new FormData();
    formData.append("image", imgFile);

    dispatch(setImgLoading(true));

    const response = await axios.patch(
      `${process.env.REACT_APP_API_URL}/user/profile-picture`,
      formData
    );

    dispatch(setImgLoading(false));

    return response.data;
  }
);

export const getUserDetails = createAsyncThunk(
  "userAccount/getUserDetailsStatus",
  async (userId: number, thunkAPI) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/${userId}`
      );

      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const userAccountSlice = createSlice({
  name: "userAccount",
  initialState,
  reducers: {
    getUserData: (state, action: PayloadAction<any>) => {
      return action.payload;
    },
    logUserIn: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        token: action.payload.token,
        ...action.payload.user,
      };
    },
    updateAvatar: (state, action: PayloadAction<File>) => {
      return {
        ...state,
        avatar: action.payload,
      };
    },
    followUser: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        friends: [...state.friends, action.payload],
      };
    },
    unfollowUser: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        friends: state.friends.filter((friend) => friend !== action.payload),
      };
    },
    setImgLoading: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        imgLoading: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      return {
        ...state,
        token: action.payload.accessToken,
        ...action.payload.user,
        avatar: action.payload.user?.Profile_picture?.mediaFileId,
        friends: action.payload?.followingUsers,
      };
    });
    builder.addCase(patchProfileImage.fulfilled, (state, action) => {
      return {
        ...state,
        avatar: action?.payload?.avatar,
      };
    });
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      return {
        ...state,
        ...action.payload.user,
        friends: action.payload?.followingUsers,
      };
    });
  },
});

export const {
  getUserData,
  followUser,
  unfollowUser,
  setImgLoading,
  logUserIn,
} = userAccountSlice.actions;

export const user = (state: RootState) => state.userAccount;
export const authToken = (state: RootState) => state.userAccount.token;

export default userAccountSlice.reducer;
