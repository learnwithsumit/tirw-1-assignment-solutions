import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'https://todos-api-lws.herokuapp.com/api/',
    baseUrl: 'http://localhost:9000/api',
  }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: ({ status, colors }) => {
        let queryString = '';
        if (status === 'Incomplete') {
          queryString += `&completed=false`;
        }
        if (status === 'Complete') {
          queryString += `&completed=true`;
        }
        if (colors.length > 0) {
          colors.forEach((color) => {
            queryString += `&color=${color}`;
          });
        }
        return `/todos?_sort=id&_order=desc${queryString}`;
      },
      keepUnusedDataFor: 600,
      providesTags: ['Todos'],
    }),
    addTodo: builder.mutation({
      query: (todo) => ({
        url: '/todos',
        method: 'POST',
        body: todo,
      }),
      invalidatesTags: ['Todos'],
    }),
    editTodo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/todos/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Todos'],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todos'],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
} = apiSlice;
