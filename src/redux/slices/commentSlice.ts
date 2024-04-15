import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import State from "../../interfaces/state";
import Comment from "../../models/comment";
import { commentService } from "../../services/commentService";
import { RootState } from "../store";

const initialState: State<Comment[]> = {
  loading: false,
  data: [],
  error: null,
};

export const getCommentAsync = createAsyncThunk(
  "comments/getPostCommentAsync",
  async (id: Number) => {
    const response = await commentService.postComments(id);
    if (response.status === 200) {
      return response.data;
    }
  }
);

export const commentSlice = createSlice({
  name: "comments",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCommentAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCommentAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload || [];
    });
    builder.addCase(getCommentAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
  reducers: {},
});

export const selectComments = (state: RootState) => state.comments;
export default commentSlice.reducer;
