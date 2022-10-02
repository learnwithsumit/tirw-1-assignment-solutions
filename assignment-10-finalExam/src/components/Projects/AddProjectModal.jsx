import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddProjectMutation } from '../../features/projects/projectsApi';
import { useGetTeamsQuery } from '../../features/teams/teamsApi';
import Loader from '../ui/Loader';

export default function AddProjectModal({ open, control }) {
  const [title, setTitle] = useState('');
  const [teamId, setTeamId] = useState('');

  // user info
  const { user } = useSelector((state) => state.auth) || {};
  const { email } = user || {};

  // getting teams
  const { data: teams } = useGetTeamsQuery(email);

  // add project - rtk query mutation
  const [addProject, { isLoading }] = useAddProjectMutation();

  // reset to initial value
  const reset = () => {
    setTeamId('');
    setTitle('');
  };

  // add team handler
  const handleAddTeam = async (e) => {
    e.preventDefault();
    if (teams && teams.length > 0 && teamId) {
      await addProject({
        title,
        stage: 'backlog',
        // eslint-disable-next-line eqeqeq
        team: teams.find((team) => team.id == teamId),
        author: user,
        timestamp: Date.now(),
      });
      // close modal and reset form
      reset();
      control();
    }
  };

  return (
    open && (
      <>
        <div
          onClick={control}
          className="fixed m-0 inset-0 z-10 -left-10 bg-black/50 cursor-pointer"
        ></div>
        <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 fixed top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <h2 className="text-sm font-extrabold text-gray-700">Add New Team</h2>
          <form onSubmit={handleAddTeam}>
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6 space-y-4">
                {/* Project Title Starts */}
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="first-name"
                    id="title"
                    autoComplete="given-name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-200 focus:ring-indigo-200 sm:text-sm"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                {/* Project Title Ends */}
                {/* Team Options Starts */}
                {teams.length === 0 && (
                  <p className="text-red-500 text-xs">
                    You are not assigned to any team. Create a team first
                  </p>
                )}

                {teams.length > 0 && (
                  <div>
                    <select
                      name="team"
                      id="team"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-200 focus:ring-indigo-200 sm:text-sm cursor-pointer"
                      value={teamId}
                      onChange={(e) => setTeamId(e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Which team will work in this project?
                      </option>
                      {teams.map((team) => {
                        return (
                          <option
                            key={team.id}
                            value={team.id}
                            className="cursor-pointer"
                            style={{ color: team.color }}
                          >
                            {team.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                )}
                {/* Team Options Ends */}
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  disabled={
                    isLoading || !teams || teams.length === 0 || !teamId
                  }
                >
                  {isLoading ? <Loader /> : 'Add'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </>
    )
  );
}
