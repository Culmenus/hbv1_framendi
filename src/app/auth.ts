import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/User";
import { backendApi } from "./services/backendConnection";
import { RootState } from "./store";

export type Token = string | null;
type AuthState = {
  user: User | null;
};

const initialState: AuthState = { user: null };

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { user, token },
      }: PayloadAction<{ user: User | null; token: string | null }>
    ) => {
      state.user = user;
    },
    signout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      backendApi.endpoints.signin.matchFulfilled,
      (state, action) => {
        state.user = action.payload.user;
      }
    );
    builder.addMatcher(
      backendApi.endpoints.getLoggedIn.matchFulfilled,
      (state, action) => {
        state.user = action.payload;
      }
    );
    builder.addMatcher(backendApi.endpoints.addToFavorites.matchFulfilled, (state, action) => {
      if(state.user){
        state.user.favoriteForums = action.payload;
      }
    })
  },
});

export const { setCredentials } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
