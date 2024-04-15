import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Post from "../../models/post";
import State from "../../interfaces/state";
import { RootState } from "../store";
import { postService } from "../../services/postService";
import Reactions from "../../models/reactions";
import { sub } from "date-fns";
import { ReactionPayload } from "../../types/reactionPayload";
import { REACTIONS } from "../../constants/reactions";

const initialState: State<Post[]> = {
  loading: false,
  data: [],
  error: null,
};

export const getPostAsync = createAsyncThunk("posts/getPostAsync", async () => {
  const response = await postService.list();
  if (response.status === 200) {
    return response.data;
  }
});

export const addReactionAsync = createAsyncThunk(
  "posts/addReactionAsync",
  async (payload: ReactionPayload) => {
    return payload;
  }
);

export const addPostAsync = createAsyncThunk(
  "posts/addPostAsync",
  async (post: Post) => {
    const response = await postService.post(post);
    debugger;
    if (response.status === 201) {
      return response.data;
    }
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getPostAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPostAsync.fulfilled, (state, action) => {
      state.loading = false;
      let min = 1;
      const loadedPosts = action.payload?.map((post) => ({
        ...post,
        reactions: { ...new Reactions(), total: 0 },
        createdAt: sub(new Date(), { minutes: min++ }).toISOString(),
      }));
      state.data = loadedPosts?.sort((a, b) => b.id - a.id) || [];
    });
    builder.addCase(getPostAsync.rejected, (state, action) => {
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

      debugger;
    });
    builder.addCase(addPostAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
  reducers: {},
});

export const selectPosts = (state: RootState) => state.posts;
export default postSlice.reducer;
