import { createSlice } from "@reduxjs/toolkit";
import IState from "../../interfaces/state";
import UserInfoVisibility from "../../models/userInfoVisibility";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";
import { TOAST_MESSAGES } from "../../constants/messages";
import { RootState } from "../store";
import {
  getUserInfoVisibilityAsync,
  updateUserInfoVisibilityAsync,
} from "../thunks/userInfoVisibilityThunk";

const initialState: IState<UserInfoVisibility[]> = {
  loading: false,
  data: [],
  error: null,
};

export const userInfoVisibilitySlice = createSlice({
  name: "userInfoVisibility",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getUserInfoVisibilityAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserInfoVisibilityAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.data =
        action.payload?.map((user) => {
          const userInfoVisibility = new UserInfoVisibility(user);
          return { ...userInfoVisibility };
        }) || [];
    });
    builder.addCase(getUserInfoVisibilityAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      showErrorToast(action.error.message || TOAST_MESSAGES.GENERIC_ERROR);
    });
    builder.addCase(updateUserInfoVisibilityAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      updateUserInfoVisibilityAsync.fulfilled,
      (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.data =
            state.data?.map((userInfoVisibility) => {
              if (userInfoVisibility.userId === action.payload.userId) {
                return { ...userInfoVisibility, ...action.payload };
              }
              return userInfoVisibility;
            }) || [];
        }
        showSuccessToast(TOAST_MESSAGES.USER_INFO_VISIBILITY_UPDATED);
      }
    );
    builder.addCase(updateUserInfoVisibilityAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      showErrorToast(action.error.message || TOAST_MESSAGES.GENERIC_ERROR);
    });
  },
  reducers: {},
});

export const selectUsersInfoVisibility = (state: RootState) =>
  state.UserInfoVisibility;
export default userInfoVisibilitySlice.reducer;
