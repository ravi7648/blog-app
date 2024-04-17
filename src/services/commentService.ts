import axios from "axios";
import { JSON_PLACEHOLDER } from "../constants/jsonPlaceholder";
import JsonPlaceholder from "./jsonPlaceholder";
import Comment from "../models/comment";

class CommentService implements JsonPlaceholder<Comment> {
  async postComments(id: number) {
    const response = await axios.get<Comment[]>(
      JSON_PLACEHOLDER.POST_COMMENTS(id)
    );
    return response;
  }

  async list() {
    const response = await axios.get<Comment[]>(JSON_PLACEHOLDER.COMMENTS);
    return response;
  }

  async get(id: number) {
    const response = await axios.get<Comment>(
      `${JSON_PLACEHOLDER.COMMENTS}/${id}`
    );
    return response;
  }

  async post(comment: Comment) {
    const response = await axios.post<Comment>(
      JSON_PLACEHOLDER.COMMENTS,
      comment
    );
    return response;
  }

  async put(comment: Comment) {
    const response = await axios.put<Comment>(
      `${JSON_PLACEHOLDER.COMMENTS}/${comment.id}`,
      comment
    );
    return response;
  }

  async delete(id: number) {
    const response = await axios.delete<Comment>(
      `${JSON_PLACEHOLDER.COMMENTS}/${id}`
    );
    return response;
  }
}

export const commentService = new CommentService();
