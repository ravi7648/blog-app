import { createSlice } from "@reduxjs/toolkit";
import IState from "../../interfaces/state";
import Comment from "../../models/comment";
import { RootState } from "../store";
import {
  addCommentAsync,
  deleteCommentAsync,
  loadPostCommentsAsync,
  updateCommentAsync,
} from "../thunks/commentThunk";

const initialState: IState<Comment[]> = {
  loading: false,
  data: [],
  error: null,
};

export const commentSlice = createSlice({
  name: "comments",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loadPostCommentsAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadPostCommentsAsync.fulfilled, (state, action) => {
      state.loading = false;
      action.payload?.forEach((comment: Comment) => {
        const exists = state.data?.find((c) => c.id === comment.id);
        if (!exists) state.data?.push(comment);
      });
    });
    builder.addCase(loadPostCommentsAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(addCommentAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addCommentAsync.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) state.data?.push(action.payload!);
    });
    builder.addCase(addCommentAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteCommentAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCommentAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.data =
        state.data?.filter((comment) => comment.id !== action.payload) || [];
    });
    builder.addCase(deleteCommentAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateCommentAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCommentAsync.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.data?.findIndex(
        (comment) => comment.id === action.payload.id
      );
      if (index && index !== -1) state.data![index] = action.payload;
    });
    builder.addCase(updateCommentAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
  reducers: {},
});

export const selectComments = (state: RootState) => state.comments;
export default commentSlice.reducer;
