import { createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "../../services/userService";
import UserInfoVisibility from "../../models/userInfoVisibility";

export const getUserInfoVisibilityAsync = createAsyncThunk(
  "userInfoVisibility/getUserInfoVisibilityAsync",
  async () => {
    const response = await userService.list();
    if (response.status === 200) {
      return response.data;
    }
  }
);

export const updateUserInfoVisibilityAsync = createAsyncThunk(
  "userInfoVisibility/updateUserInfoVisibilityAsync",
  async (payload: UserInfoVisibility) => {
    return payload;
  }
);
