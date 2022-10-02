import { apiSlice } from '../api/apiSlice';
import { teamsApi } from '../teams/teamsApi';

export const projectsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: (email) =>
        `/projects?team.members_like=${email}&_sort=timestamp&_order=desc`,
      onQueryStarted: async (email, { dispatch }) => {
        // silently get the team when load the initial projects
        dispatch(teamsApi.endpoints.getTeams.initiate(email));
      },
    }),

    // add project api
    addProject: builder.mutation({
      query: (data) => ({
        url: '/projects',
        method: 'POST',
        body: data,
      }),
      onQueryStarted: async (
        { author: { email } },
        { queryFulfilled, dispatch }
      ) => {
        // update getProjects passimistically on new project addition
        const newProject = await queryFulfilled;
        dispatch(
          apiSlice.util.updateQueryData('getProjects', email, (draft) => {
            draft.unshift(newProject?.data);
          })
        );
      },
    }),

    // change status api
    changeStage: builder.mutation({
      query: ({ id, data }) => ({
        url: `/projects/${id}`,
        method: 'PATCH',
        body: data,
      }),
      onQueryStarted: async (
        { id, email, data: { stage } },
        { queryFulfilled, dispatch }
      ) => {
        // optimistic projects update on stage change

        const patchResult = dispatch(
          projectsApi.util.updateQueryData('getProjects', email, (draft) => {
            const targetedProject = draft.find((project) => project.id === id);
            targetedProject.stage = stage;
          })
        );

        // optimistic projects update on stage change end
        try {
          await queryFulfilled;
        } catch (error) {
          // undo if fails
          patchResult.undo();
        }
      },
    }),

    // delete project apit
    deleteProject: builder.mutation({
      query: ({ id }) => ({
        url: `/projects/${id}`,
        method: 'DELETE',
      }),

      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        // optimistic update
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            'getProjects',
            arg.loggedInUserEmail,
            (draft) => {
              return draft.filter((project) => project.id !== arg.id);
            }
          )
        );
        // optimistic update ends
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
  useGetProjectsQuery,
  useAddProjectMutation,
  useChangeStageMutation,
  useDeleteProjectMutation,
} = projectsApi;
