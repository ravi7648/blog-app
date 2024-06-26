import { localStorageService } from "./../../services/localStorageService";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SessionType } from "../../types/session";
import { STORE_KEYS } from "../../constants/storeKeys";
import { showSuccessToast } from "../../utils/toastUtils";
import { TOAST_MESSAGES } from "../../constants/messages";

const initialState: SessionType = {
  id: 0,
  email: null,
};

const localState = localStorageService.get<SessionType>(STORE_KEYS.SESSION);

export const sessionSlice = createSlice({
  name: "session",
  initialState: localState || initialState,
  reducers: {
    login: (state, action: PayloadAction<SessionType>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      localStorageService.set<SessionType>(STORE_KEYS.SESSION, action.payload);
      document.dispatchEvent(new Event("storage"));
      showSuccessToast(TOAST_MESSAGES.LOGIN_SUCCESS);
    },
    modifySession: (state, action: PayloadAction<SessionType>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      localStorageService.set<SessionType>(STORE_KEYS.SESSION, action.payload);
      document.dispatchEvent(new Event("storage"));
    },
    logout: (state) => {
      state.id = 0;
      state.email = null;
      localStorageService.remove(STORE_KEYS.SESSION);
      document.dispatchEvent(new Event("storage"));
      showSuccessToast(TOAST_MESSAGES.LOGOUT_SUCCESS);
    },
  },
});

export const { login, modifySession, logout } = sessionSlice.actions;
export default sessionSlice.reducer;
