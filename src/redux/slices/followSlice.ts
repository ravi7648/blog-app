import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Follow from "../../models/follow";
import IState from "../../interfaces/state";
import { RootState } from "../store";
import { showSuccessToast } from "../../utils/toastUtils";
import { TOAST_MESSAGES } from "../../constants/messages";

const initialState: IState<Follow[]> = {
  loading: false,
  data: [],
  error: null,
};

export const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    followUser: (state, action: PayloadAction<Follow>) => {
      const followExist = state.data?.filter(
        (follow) =>
          follow.followerId === action.payload.followerId &&
          follow.followingId === action.payload.followingId
      );
      if (!followExist?.length) state.data?.push(action.payload);
      showSuccessToast(TOAST_MESSAGES.FOLLOW_SUCCESS);
    },
    unfollowUser: (state, action: PayloadAction<Follow>) => {
      state.data =
        state.data?.filter(
          (follow) =>
            follow.followerId !== action.payload.followerId &&
            follow.followingId !== action.payload.followingId
        ) || [];
      showSuccessToast(TOAST_MESSAGES.UNFOLLOW_SUCCESS);
    },
  },
});

export const { followUser, unfollowUser } = followSlice.actions;
export const selectFollows = (state: RootState) => state.follows;
export default followSlice.reducer;
