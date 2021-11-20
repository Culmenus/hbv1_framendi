import { RootState } from "../store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Forum } from "../../types/Forum";
import { User } from "../../types/User";
type SigninCredentials = {
  username: string;
  password: string;
};
export const backendApi = createApi({
  reducerPath: "backendApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
    prepareHeaders: async (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token !== null) {
        console.log(token);
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: ({ username, password }: SigninCredentials) => ({
        url: "/login",
        params: { username, password },
        method: "POST",
      }),
      transformResponse: (response: { user: User; token: string }) => {
        console.log(response);
        return response;
      },
    }),
    getAllForums: builder.query<Forum[], void>({
      query: () => "/forums",
    }),
  }),
});

export const { useGetAllForumsQuery, useSigninMutation } = backendApi;
