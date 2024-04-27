import { createAsyncThunk } from "@reduxjs/toolkit";
import Post from "../../models/post";
import { postService } from "../../services/postService";
import { ReactionPayloadType } from "../../types/reactionPayload";

export const getPostsAsync = createAsyncThunk(
  "posts/getPostsAsync",
  async () => {
    const response = await postService.list();
    if (response.status === 200) {
      return response.data;
    }
  }
);

export const addReactionAsync = createAsyncThunk(
  "posts/addReactionAsync",
  async (payload: ReactionPayloadType) => {
    return payload;
  }
);

export const addPostAsync = createAsyncThunk(
  "posts/addPostAsync",
  async (post: Post) => {
    const response = await postService.post(post);
    if (response.status === 201) {
      return response.data;
    }
  }
);

export const updatePostAsync = createAsyncThunk(
  "posts/updatePostAsync",
  async (post: Post) => {
    return post;
  }
);

export const deletePostAsync = createAsyncThunk(
  "posts/deletePostAsync",
  async (id: number) => {
    return id;
  }
);
