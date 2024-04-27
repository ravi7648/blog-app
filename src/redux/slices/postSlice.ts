import { createSlice } from "@reduxjs/toolkit";
import Post from "../../models/post";
import IState from "../../interfaces/state";
import { RootState } from "../store";
import Reactions from "../../models/reactions";
import { sub } from "date-fns";
import { REACTIONS } from "../../constants/reactions";
import {
  getPostsAsync,
  addReactionAsync,
  addPostAsync,
  updatePostAsync,
  deletePostAsync,
} from "../thunks/postThunk";

const initialState: IState<Post[]> = {
  loading: false,
  data: [],
  error: null,
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getPostsAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPostsAsync.fulfilled, (state, action) => {
      state.loading = false;
      let min = 1;
      state.data =
        action.payload?.map((post) => ({
          ...post,
          reactions: { ...new Reactions(), total: 0 },
          isPublished: true,
          createdAt: sub(new Date(), { minutes: min++ * 10 }).toISOString(),
        })) || [];
    });
    builder.addCase(getPostsAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(addReactionAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addReactionAsync.fulfilled, (state, action) => {
      state.loading = false;
      const post = state.data?.find(
        (post) => post.id === action.payload.postId
      );
      if (post) {
        post.reactions.total++;
        switch (action.payload.type) {
          case REACTIONS.LIKE:
            post.reactions.like++;
            break;
          case REACTIONS.LOVE:
            post.reactions.love++;
            break;
          case REACTIONS.CELEBRATE:
            post.reactions.celebrate++;
            break;
          case REACTIONS.INSIGHTFUL:
            post.reactions.insightful++;
            break;
          case REACTIONS.FUNNY:
            post.reactions.funny++;
            break;
        }
      }
    });
    builder.addCase(addReactionAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(addPostAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addPostAsync.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        action.payload.reactions = { ...new Reactions(), total: 0 };
        action.payload.createdAt = new Date().toISOString();
        state.data = [action.payload, ...(state.data || [])];
      }
    });
    builder.addCase(addPostAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(updatePostAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePostAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.data =
        state.data?.map((post) =>
          post.id === action.payload.id ? action.payload : post
        ) || [];
    });
    builder.addCase(updatePostAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(deletePostAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePostAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.data =
        state.data?.filter((post) => post.id !== action.payload) || [];
    });
    builder.addCase(deletePostAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
  reducers: {},
});

export const selectPosts = (state: RootState) => state.posts;
export default postSlice.reducer;
