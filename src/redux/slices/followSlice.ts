import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Follow from "../../models/follow";
import IState from "../../interfaces/state";
import { RootState } from "../store";

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
    },
    unfollowUser: (state, action: PayloadAction<Follow>) => {
      state.data =
        state.data?.filter(
          (follow) =>
            follow.followerId !== action.payload.followerId &&
            follow.followingId !== action.payload.followingId
        ) || [];
    },
  },
});

export const { followUser, unfollowUser } = followSlice.actions;
export const selectFollows = (state: RootState) => state.follows;
export default followSlice.reducer;
