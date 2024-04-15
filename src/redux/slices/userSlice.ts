import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import State from "../../interfaces/state";
import User from "../../models/user";
import { RootState } from "../store";
import { userService } from "../../services/userService";

const initialState: State<User[]> = {
  loading: false,
  data: [],
  error: null,
};

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

export const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getUsersAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUsersAsync.fulfilled, (state, action) => {
      state.loading = false;
      const loadedUsers = action.payload?.map((user) => ({
        ...user,
        password: "1234",
      }));
      state.data = loadedUsers || [];
    });
    builder.addCase(getUsersAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(addUserAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addUserAsync.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) state.data = [...(state.data || []), action.payload];
    });
    builder.addCase(addUserAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
  reducers: {},
});

export const selectUsers = (state: RootState) => state.users;
export default userSlice.reducer;
