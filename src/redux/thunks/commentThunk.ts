import { createAsyncThunk } from "@reduxjs/toolkit";
import { commentService } from "../../services/commentService";
import Comment from "../../models/comment";

export const loadPostCommentsAsync = createAsyncThunk(
  "comments/addPostCommentsAsync",
  async (id: number) => {
    const response = await commentService.postComments(id);
    if (response.status === 200) {
      return response.data;
    }
  }
);

export const addCommentAsync = createAsyncThunk(
  "comments/addCommentAsync",
  async (comment: Comment) => {
    const response = await commentService.post(comment);
    if (response.status === 201) {
      return response.data;
    }
  }
);
