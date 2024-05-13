import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import postReducer from "./slices/postSlice";
import userReducer from "./slices/userSlice";
import sessionReducer from "./slices/sessionSlice";
import commentReducer from "./slices/commentSlice";
import followReducer from "./slices/followSlice";
import userInfoVisibilityReducer from "./slices/userInfoVisibilitySlice";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  posts: postReducer,
  users: userReducer,
  session: sessionReducer,
  comments: commentReducer,
  follows: followReducer,
  UserInfoVisibility: userInfoVisibilityReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
