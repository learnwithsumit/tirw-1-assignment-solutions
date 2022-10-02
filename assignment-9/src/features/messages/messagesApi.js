import { io } from "socket.io-client";
import { apiURL, messagePerPage } from "../../utils/defaults";
import { apiSlice } from "../api/apiSlice";

export const messagesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (id) =>
        `/messages?conversationId=${id}&_sort=timestamp&_order=desc&_page=1&_limit=${messagePerPage}`,
      transformResponse: (apiResponse, meta) => {
        const totalCount = meta.response.headers.get("X-Total-Count");
        return { data: apiResponse, totalCount };
      },
      onCacheEntryAdded: async (
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) => {
        // create socket
        const socket = io(apiURL, {
          reconnectionDelay: 1000,
          reconnection: true,
          reconnectionAttemps: 10,
          transports: ["websocket"],
          agent: false,
          upgrade: false,
          rejectUnauthorized: false,
        });
        try {
          await cacheDataLoaded;
          socket.on("messageAdded", (data) => {
            // eslint-disable-next-line eqeqeq
            if (data?.data?.conversationId == arg) {
              updateCachedData((draft) => {
                draft.data.unshift(data.data);
              });
            }
          });
        } catch (err) {
          console.log(err);
        }
      },
    }),
    getMoreMassages: builder.query({
      query: ({ id, page }) =>
        `/messages?conversationId=${id}&_sort=timestamp&_order=desc&_page=${page}&_limit=${messagePerPage}`,

      async onQueryStarted({ id }, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          if (data.length > 0) {
            await dispatch(
              apiSlice.util.updateQueryData(
                "getMessages",
                id.toString(),
                (draft) => {
                  return {
                    data: [...draft.data, ...data],
                    totalCount: draft.totalCount,
                  };
                }
              )
            );
          }
        } catch (err) {
          console.log(err);
        }
      },
    }),
    addMessage: builder.mutation({
      query: (data) => ({
        url: "/messages",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetMessagesQuery, useAddMessageMutation } = messagesApi;
