import axios from "axios";
import { JSON_PLACEHOLDER } from "../constants/jsonPlaceholder";
import User from "../models/user";
import JsonPlaceholder from "./jsonPlaceholder";

class UserService implements JsonPlaceholder<User> {
  async list() {
    const response = await axios.get<User[]>(JSON_PLACEHOLDER.USERS);
    return response;
  }

  async get(id: number) {
    const response = await axios.get<User>(`${JSON_PLACEHOLDER.USERS}/${id}`);
    return response;
  }

  async post(user: User) {
    const response = await axios.post<User>(JSON_PLACEHOLDER.USERS, user);
    return response;
  }

  async put(user: User) {
    const response = await axios.put<User>(
      `${JSON_PLACEHOLDER.USERS}/${user.id}`,
      user
    );
    return response;
  }

  async delete(id: number) {
    const response = await axios.delete<User>(
      `${JSON_PLACEHOLDER.USERS}/${id}`
    );
    return response;
  }
}

export const userService = new UserService();
