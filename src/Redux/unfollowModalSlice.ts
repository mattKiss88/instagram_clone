import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import type { PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  isOpen: boolean;
  avatar: string;
  userId: number;
  username: string;
}

const initialState: InitialState = {
  isOpen: false,
  avatar: "",
  userId: 0,
  username: "",
};

export const unfollowModalSlice = createSlice({
  name: "unfollowModal",
  initialState,
  reducers: {
    toggleUnfollowModal: (state, action: PayloadAction<void>) => {
      state.isOpen = !state.isOpen;
    },
    resetUnfollowModal: (state, action: PayloadAction<void>) => {
      state = initialState;
    },
    setUnfollowModal: (state, action: PayloadAction<InitialState>) => {
      return { ...action.payload };
    },
  },
});

export const { toggleUnfollowModal, resetUnfollowModal, setUnfollowModal } =
  unfollowModalSlice.actions;

export const isUnfollowModalOpen = (state: RootState) =>
  state.unfollowModal.isOpen;

export default unfollowModalSlice.reducer;
