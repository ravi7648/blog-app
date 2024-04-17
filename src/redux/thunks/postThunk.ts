import { createAsyncThunk } from "@reduxjs/toolkit";
import Post from "../../models/post";
import { postService } from "../../services/postService";
import { ReactionPayload } from "../../types/reactionPayload";

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
