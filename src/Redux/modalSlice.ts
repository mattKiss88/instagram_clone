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

interface likeCommentPayload {
  commentId: number;
  commentType: string;
}

export const fetchCommentsByPostId = createAsyncThunk(
  "comments/fetchByPostIdStatus",
  async (postId: number, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/comment/${postId}`
    );

    return response.data.comments;
  }
);
export const likeComment = createAsyncThunk(
  "comments/postLikeStatus",
  async ({ commentId, commentType }: likeCommentPayload, { dispatch }) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/comment/post/like`,
      {
        commentId,
      }
    );

    if (commentType === "new") {
      dispatch(modalSlice.actions.updateCommentLikes(commentId));
    } else {
      dispatch(modalSlice.actions.updateSubCommentLikes(commentId));
    }

    return commentId;
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
          likeCount: !state.post.likes
            ? state.post.likeCount + 1
            : state.post.likeCount - 1,
        },
      };
    },
    updateCommentLikes: (state, action: PayloadAction<number>) => {
      let updateCommentLikes = state.comments.map((c: any) => {
        if (c.id === action.payload) {
          return {
            ...c,
            liked: !c.liked,
            likeCount: !c.liked ? c.likeCount + 1 : c.likeCount - 1,
          };
        }

        return {
          ...c,
        };
      });

      state.comments = [...updateCommentLikes];
    },
    updateSubCommentLikes: (state, action: PayloadAction<number>) => {
      let updateCommentLikes = state.comments.map((c: any) => {
        let updateSubComments = c.subComments.map((sub: any) => {
          if (sub.id === action.payload) {
            return {
              ...sub,
              liked: !sub.liked,
              likeCount: !sub.liked ? sub.likeCount + 1 : sub.likeCount - 1,
            };
          }

          return sub;
        });

        return {
          ...c,
          subComments: [...updateSubComments],
        };
      });

      state.comments = [...updateCommentLikes];
    },
    resetModal: (state, action: PayloadAction<undefined>) => {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
      // Add user to the state array
      state.comments = action.payload;
    });
    // builder.addCase(likeComment.fulfilled, (state, action) => {
    //   console.log(action.payload, "action.payload");
    //   // Add user to the state array
    //   let updateCommentLikes = state.comments.map((c: any) => {
    //     let updateSubComments = c.subComments.map((sub: any) => {
    //       if (sub.id === action.payload) {
    //         return {
    //           ...sub,
    //           liked: !sub.liked,
    //           totalLikes: !sub.liked ? sub.totalLikes + 1 : sub.totalLikes - 1,
    //         };
    //       }

    //       return sub;
    //     });

    //     return {
    //       ...c,
    //       subComments: [...updateSubComments],
    //     };
    //   });

    //   state.comments = [...updateCommentLikes];
    // });
  },
});

export const { toggleModal, addModalData, updateModalLikes, resetModal } =
  modalSlice.actions;

export const isOpen = (state: RootState) => state.modal.isOpen;

export default modalSlice.reducer;
