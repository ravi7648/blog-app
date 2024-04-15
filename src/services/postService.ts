import axios from "axios";
import { JSON_PLACEHOLDER } from "../constants/jsonPlaceholder";
import Post from "../models/post";
import JsonPlaceholder from "./jsonPlaceholder";

class PostService implements JsonPlaceholder<Post> {
  async list() {
    const response = await axios.get<Post[]>(JSON_PLACEHOLDER.POSTS);
    return response;
  }

  async get(id: number) {
    const response = await axios.get<Post>(`${JSON_PLACEHOLDER.POSTS}/${id}`);
    return response;
  }

  async post(post: Post) {
    const response = await axios.post<Post>(JSON_PLACEHOLDER.POSTS, post);
    return response;
  }

  async put(post: Post) {
    const response = await axios.put<Post>(
      `${JSON_PLACEHOLDER.POSTS}/${post.id}`,
      post
    );
    return response;
  }

  async delete(id: number) {
    const response = await axios.delete<Post>(
      `${JSON_PLACEHOLDER.POSTS}/${id}`
    );
    return response;
  }
}

export const postService = new PostService();


