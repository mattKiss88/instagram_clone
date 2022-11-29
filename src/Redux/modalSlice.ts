import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import type { PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  isOpen: boolean;
  username: string;
  caption: string;
  images: any[];
}

const initialState: InitialState = {
  isOpen: false,
  username: "",
  caption: "",
  images: [],
};

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
  },
});

export const { toggleModal, addModalData } = modalSlice.actions;

export const isOpen = (state: RootState) => state.modal.isOpen;

export default modalSlice.reducer;
