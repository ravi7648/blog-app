import { createAsyncThunk } from "@reduxjs/toolkit";
import User from "../../models/user";
import { userService } from "../../services/userService";

export const getUsersAsync = createAsyncThunk(
  "users/getUsersAsync",
  async () => {
    const response = await userService.list();
    if (response.status === 200) {
      return response.data;
    }
  }
);

export const addUserAsync = createAsyncThunk(
  "users/addUserAsync",
  async (user: User) => {
    const response = await userService.post(user);
    if (response.status === 201) {
      return response.data;
    }
  }
);

export const editUserAsync = createAsyncThunk(
  "users/editUserAsync",
  async (user: User) => {
    return user;
  }
);
