// store/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ITask } from "./type";

// Define our base API endpoint
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/mongodb/task/",
});

// Define our API slice using createApi
export const apiSlice = createApi({
  reducerPath: "api", // Optional, but useful if you have multiple API slices
  baseQuery,
  tagTypes: ["task"],
  endpoints: (builder) => ({
    getAll: builder.query<ITask[], void>({
      query: () => ({
        url: `get-all`,
        method: "get",
      }),
      providesTags: () => [
        {
          type: "task",
          id: "list",
        },
      ],
    }),
    create: builder.mutation<ITask, ITask>({
      query: (body) => ({
        url: "create",
        method: "post",
        body: body,
      }),
      invalidatesTags: () => [{ id: "list", type: "task" }],
    }),
    updateId: builder.mutation<ITask, { id: string; task: ITask }>({
      query: ({ id, task }) => ({
        url: "update/" + id,
        method: "put",
        body: task,
      }),
      invalidatesTags: (result) => [{ type: "task" }],
    }),
    deleteId: builder.mutation<ITask, string>({
      query: (id) => ({
        url: "delete/" + id,
        method: "delete",
      }),
      invalidatesTags: (result) => [{ type: "task" }],
    }),
  }),
});

// Export auto-generated hook for the getUsers endpoint
export const {
  useCreateMutation,
  useUpdateIdMutation,
  useDeleteIdMutation,
  useGetAllQuery,
} = apiSlice;
