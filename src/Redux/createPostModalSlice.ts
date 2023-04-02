import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import axios from "axios";

// Define a type for the slice state
interface CounterState {
  active: boolean;
  image: File | null;
  filter: string;
  caption: string;
  location: string;
  step: number;
  finalImage: File | null;
  finalImgUrl: string;
  loading: boolean;
}

// Define the initial state using that type
const initialState: CounterState = {
  active: false,
  image: null,
  filter: "",
  caption: "",
  location: "",
  step: 1,
  finalImage: null,
  finalImgUrl: "",
  loading: false,
};

export const createNewPost = createAsyncThunk(
  "createPost/postNewPost",
  async (_, { getState, dispatch }) => {
    const { createPost } = getState() as RootState;
    const formData = new FormData();
    formData.append("image", createPost.finalImage || "");
    formData.append("filter", createPost.filter);
    formData.append("caption", createPost.caption);

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/post`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // if the response is successful, reset the state
    if (response.status === 201) {
      dispatch(resetState());
    }

    return response.status;
  }
);

export const createPost = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        step: action.payload,
      };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
    toggleModal: (state, action: PayloadAction<undefined>) => {
      return {
        ...state,
        active: !state.active,
      };
    },
    addImage: (state, action: PayloadAction<File>) => {
      return {
        ...state,
        image: action.payload,
      };
    },
    addFinalImage: (state, action: PayloadAction<File>) => {
      return {
        ...state,
        finalImage: action.payload,
      };
    },
    addFinalImageUrl: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        finalImgUrl: action.payload,
      };
    },
    updateFilter: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        filter: action.payload,
      };
    },
    updateCaption: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        caption: action.payload,
      };
    },
    resetImage: (state, action: PayloadAction<undefined>) => {
      return {
        ...state,
        image: null,
      };
    },
    resetState: (state, action: PayloadAction<undefined>) => {
      return {
        ...initialState,
      };
    },
  },
});

export const {
  setStep,
  toggleModal,
  addImage,
  resetImage,
  updateCaption,
  updateFilter,
  addFinalImage,
  addFinalImageUrl,
  resetState,
  setLoading,
} = createPost.actions;

// Other code such as selectors can use the imported `RootState` type
export const isModalOpen = (state: RootState) => state.createPost.active;
export const currentStep = (state: RootState) => state.createPost.step;
export const newImage = (state: RootState) => state.createPost.image;
export const finalImage = (state: RootState) => state.createPost.finalImage;
export const finalImageUrl = (state: RootState) => state.createPost.finalImgUrl;
export const loading = (state: RootState) => state.createPost.loading;

export default createPost.reducer;
