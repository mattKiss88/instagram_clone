import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  id: number;
  username: string;
  fullName: string;
  avatar: string;
}

interface InitialState {
  users: IUser[];
}

const initialState: InitialState = {
  users: [],
};

export const fetchUsers = createAsyncThunk(
  "searchUsers/fetchUsersStatus",
  async (search: string, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/user?search=${search}`
    );

    return response.data;
  }
);

export const searchUserSlice = createSlice({
  name: "searchUsers",
  initialState,
  reducers: {
    getUsers: (state, action: PayloadAction<any>) => {
      state.users = action.payload;
    },
    resetUsers: (state, action: PayloadAction<undefined>) => {
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export const { getUsers, resetUsers } = searchUserSlice.actions;

export const searchResult = (state: RootState) => state.searchUsers.users;

export default searchUserSlice.reducer;
