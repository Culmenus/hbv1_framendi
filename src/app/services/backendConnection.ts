import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Forum } from "../../types/Forum";
import { User } from "../../types/User";
import { Thread } from "../../types/Thread";
type SigninCredentials = {
  username: string;
  password: string;
};
export const backendApi = createApi({
  reducerPath: "backendApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
    prepareHeaders: async (headers, { getState }) => {
      const token = localStorage.getItem("appToken");
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
        body: { email: username, password: password },
        method: "POST",
      }),
      transformResponse: (response: { user: User; token: string }) => {
        localStorage.setItem("appToken", response.token);
        return response;
      },
    }),
    addThread: builder.mutation({
        query: ({thread, forumId}: {thread: Thread, forumId: string}) => ({
          url: `/api/forum/${forumId}`,
          body: thread,
          method: "POST"
        }),
        transformResponse: (response: Thread) => {
            return response;
        }
    }),
    getAllForums: builder.query<Forum[], void>({
      query: () => "/api/forum",
    }),
    getThread: builder.query<Thread, { id: string }>({
      query: ({ id }) => `/thread/${id}`,
    }),
    getForum: builder.query<Forum, { id: string }>({
      query: ({ id }) => `/api/forum/${id}`,
    }),
    getLoggedIn: builder.query<User, void>({
      query: () => "/api/user/loggedin",
    }),
  }),
});

export const {
  useGetAllForumsQuery,
  useSigninMutation,
  useGetForumQuery,
  useGetLoggedInQuery,
  useAddThreadMutation,
} = backendApi;
