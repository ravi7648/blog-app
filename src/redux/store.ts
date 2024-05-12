import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./slices/postSlice";
import userReducer from "./slices/userSlice";
import sessionReducer from "./slices/sessionSlice";
import commentReducer from "./slices/commentSlice";
import followReducer from "./slices/followSlice";

export const store = configureStore({
  reducer: {
    posts: postReducer,
    users: userReducer,
    session: sessionReducer,
    comments: commentReducer,
    follows: followReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
