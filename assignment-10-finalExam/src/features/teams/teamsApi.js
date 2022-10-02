import { apiSlice } from '../api/apiSlice';

export const teamsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get teams
    getTeams: builder.query({
      query: (email) =>
        `/teams?members_like=${email}&_sort=timestamp&_order=desc`,
    }),

    // add team
    addTeam: builder.mutation({
      query: (data) => ({
        url: '/teams',
        method: 'POST',
        body: data,
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        const { data: team } = await queryFulfilled;
        // pessimistic teams update
        dispatch(
          apiSlice.util.updateQueryData(
            'getTeams',
            team?.users[0]?.email,
            (draft) => {
              draft.unshift(team);
            }
          )
        );
      },
    }),

    // add member to a team
    addMember: builder.mutation({
      query: ({ id, data }) => ({
        url: `/teams/${id}`,
        method: 'PATCH',
        body: data,
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        const { data: team } = await queryFulfilled;
        // pessimistic teams update
        dispatch(
          apiSlice.util.updateQueryData(
            'getTeams',
            arg.loggedInUserEmail,
            (draft) => {
              // eslint-disable-next-line eqeqeq
              const targetedTeam = draft.find((t) => t.id == arg.id);
              targetedTeam.users = team.users;
              targetedTeam.members = team.members;
            }
          )
        );
      },
    }),

    // delete a team
    deleteTeam: builder.mutation({
      query: ({ id }) => ({
        url: `/teams/${id}`,
        method: 'DELETE',
      }),

      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        // optimistic update
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            'getTeams',
            arg.loggedInUserEmail,
            (draft) => {
              return draft.filter((t) => t.id !== arg.id);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (error) {
          // undo if fails
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetTeamsQuery,
  useAddTeamMutation,
  useDeleteTeamMutation,
  useAddMemberMutation,
} = teamsApi;
