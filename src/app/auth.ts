import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/User";
import { backendApi } from "./services/backendConnection";
import { RootState } from "./store";

export type Token = string | null;
type AuthState = {
  isSignedIn: boolean;
  user: User | null;
  token: string | null;
};

const initialState: AuthState = { isSignedIn: false, user: null, token: null };

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
      state.token = token;
    },
    signout: (state) => {
      state.user = null;
      state.token = null;
      state.isSignedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      backendApi.endpoints.signin.matchFulfilled,
      (state, action) => {
        state.isSignedIn = true;
        //TODO
        //   state.user = action.payload.result.user;
        state.token = action.payload.token;
      }
    );
  },
});

export const { setCredentials } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
