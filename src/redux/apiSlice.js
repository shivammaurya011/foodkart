import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => '/tasks',
      providesTags: ["Task"],
    }),
    addTask: builder.mutation({
      queryFn: async (taskValue, { getState }) => {
        const { api } = getState(); // Get the current state of the API slice
        const existingTasks = api.queries['getTasks(undefined)']?.data || [];

        // Check if the task value already exists
        const isDuplicate = existingTasks.some(task => task.value === taskValue);

        if (isDuplicate) {
          return { error: { status: 400, data: "Task already exists!" } };
        }

        // Proceed with the API call if no duplicates are found
        const response = await fetch('http://localhost:3000/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ value: taskValue, status: false }),
        });

        const data = await response.json();

        if (!response.ok) {
          return { error: { status: response.status, data } };
        }

        return { data };
      },
      invalidatesTags: ['Task'],
    }),
    updateTask: builder.mutation({
      query: ({ taskId, status }) => ({
        url: `/tasks/${taskId}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Task'],
    }),
    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `/tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = apiSlice;
