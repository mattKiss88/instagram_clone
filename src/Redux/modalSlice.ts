import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { useAppDispatch } from "./hooks";

interface InitialState {
  isOpen: boolean;
  user: any;
  post: any;
  images: any[];
  comments: any[];
}

const initialState: InitialState = {
  isOpen: false,
  user: {},
  post: {},
  images: [],
  comments: [],
};

export const fetchCommentsByPostId = createAsyncThunk(
  "comments/fetchByPostIdStatus",
  async (postId: number, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/comment/${postId}}`
    );

    return response.data.comments;
  }
);

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
    },
    addModalData: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    updateModalLikes: (state, action: PayloadAction<undefined>) => {
      return {
        ...state,
        post: {
          ...state.post,
          likes: !state.post.likes,
          totalLikes: !state.post.likes
            ? state.post.totalLikes + 1
            : state.post.totalLikes - 1,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
      // Add user to the state array
      state.comments = action.payload;
    });
  },
});

export const { toggleModal, addModalData, updateModalLikes } =
  modalSlice.actions;

export const isOpen = (state: RootState) => state.modal.isOpen;

export default modalSlice.reducer;
