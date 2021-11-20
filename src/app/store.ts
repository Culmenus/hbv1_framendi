import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { backendApi } from "./services/backendConnection";

export const store = configureStore({
  reducer: {
    [backendApi.reducerPath]: backendApi.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(backendApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
