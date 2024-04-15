import { localStorageService } from "./../../services/localStorageService";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Session } from "../../types/session";
import { RootState } from "../store";
import { STORE_KEYS } from "../../constants/storeKeys";

const initialState: Session = {
  id: 0,
  email: null,
  user: null,
  loggedIn: false,
};

const localState = localStorageService.get<Session>(STORE_KEYS.SESSION);

export const sessionSlice = createSlice({
  name: "session",
  initialState: localState || initialState,
  reducers: {
    login: (state, action: PayloadAction<Session>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.user = action.payload.user;
      state.loggedIn = action.payload.loggedIn;
      localStorageService.set<Session>("session", action.payload);
    },
    logout: (state) => {
      state.id = 0;
      state.email = null;
      state.user = null;
      state.loggedIn = false;
      localStorageService.remove(STORE_KEYS.SESSION);
    },
  },
});

export const { login, logout } = sessionSlice.actions;
export const currentSession = (state: RootState) => state.session;
export default sessionSlice.reducer;
