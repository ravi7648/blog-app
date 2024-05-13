import { createSlice } from "@reduxjs/toolkit";
import IState from "../../interfaces/state";
import User from "../../models/user";
import { RootState } from "../store";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";
import { TOAST_MESSAGES } from "../../constants/messages";
import {
  getUsersAsync,
  addUserAsync,
  editUserAsync,
  addBookmarkAsync,
  removeBookmarkAsync,
} from "../thunks/userThunk";

const initialState: IState<User[]> = {
  loading: false,
  data: [],
  error: null,
};

const ADMINS = [1, 11];

export const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getUsersAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUsersAsync.fulfilled, (state, action) => {
      state.loading = false;
      const loadedUsers = action.payload?.map((user) => {
        const updatedUser = JSON.parse(JSON.stringify(user)) as User;
        updatedUser.password = "1234";
        updatedUser.blocked = false;
        updatedUser.bookmarkedPosts = [];
        updatedUser.isAdmin = ADMINS.includes(user.id);

        return updatedUser;
      });
      state.data = loadedUsers || [];
    });
    builder.addCase(getUsersAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      showErrorToast(action.error.message || TOAST_MESSAGES.GENERIC_ERROR);
    });
    builder.addCase(addUserAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addUserAsync.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) state.data = [...(state.data || []), action.payload];
      showSuccessToast(TOAST_MESSAGES.SIGNUP_SUCCESS);
    });
    builder.addCase(addUserAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      showErrorToast(TOAST_MESSAGES.SIGNUP_FAILURE);
    });
    builder.addCase(editUserAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editUserAsync.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.data =
          state.data?.map((user) =>
            user.id === action.payload.id ? action.payload : user
          ) || [];
      }
      showSuccessToast(TOAST_MESSAGES.PROFILE_UPDATED);
    });
    builder.addCase(editUserAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      showErrorToast(action.error.message || TOAST_MESSAGES.GENERIC_ERROR);
    });
    builder.addCase(addBookmarkAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addBookmarkAsync.fulfilled, (state, action) => {
      state.loading = false;
      const { userId, postId } = action.payload;
      state.data =
        state.data?.map((user) => {
          if (user.id === userId) {
            user.bookmarkedPosts = [...(user.bookmarkedPosts || []), postId];
          }
          return user;
        }) || [];
      showSuccessToast(TOAST_MESSAGES.BOOKMARK_ADDED);
    });
    builder.addCase(addBookmarkAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      showErrorToast(action.error.message || TOAST_MESSAGES.GENERIC_ERROR);
    });
    builder.addCase(removeBookmarkAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeBookmarkAsync.fulfilled, (state, action) => {
      state.loading = false;
      const { userId, postId } = action.payload;
      state.data =
        state.data?.map((user) => {
          if (user.id === userId) {
            user.bookmarkedPosts = user.bookmarkedPosts?.filter(
              (id) => id !== postId
            );
          }
          return user;
        }) || [];

      showSuccessToast(TOAST_MESSAGES.BOOKMARK_REMOVED);
    });
    builder.addCase(removeBookmarkAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      showErrorToast(action.error.message || TOAST_MESSAGES.GENERIC_ERROR);
    });
  },
  reducers: {},
});

export const selectUsers = (state: RootState) => state.users;
export default userSlice.reducer;
