import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Define a type for the slice state
interface CounterState {
  active: boolean;
  image: File | null;
  filters: string;
  caption: string;
  location: string;
  step: number;
}

// Define the initial state using that type
const initialState: CounterState = {
  active: false,
  image: null,
  filters: "",
  caption: "",
  location: "",
  step: 1,
};

export const createPost = createSlice({
  name: "counter",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        step: action.payload,
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
    resetImage: (state, action: PayloadAction<undefined>) => {
      return {
        ...state,
        image: null,
      };
    },
  },
});

export const { setStep, toggleModal, addImage, resetImage } =
  createPost.actions;

// Other code such as selectors can use the imported `RootState` type
export const isModalOpen = (state: RootState) => state.createPost.active;
export const currentStep = (state: RootState) => state.createPost.step;
export const newImage = (state: RootState) => state.createPost.image;

export default createPost.reducer;
