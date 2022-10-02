import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddTeamMutation } from '../../features/teams/teamsApi';
import Loader from '../ui/Loader';

export default function Modal({ open, control }) {
  // local states for team info
  const [teamName, setTeamName] = useState('');
  const [aboutTeam, setAboutTeam] = useState('');
  const [color, setColor] = useState('');

  // logged in user info
  const { user } = useSelector((state) => state.auth) || {};

  // add team api
  const [addTeam, { isLoading }] = useAddTeamMutation();

  // reset to initial state
  const reset = () => {
    setTeamName('');
    setAboutTeam('');
    setColor('');
  };

  // add team handler
  const handleAddTeam = async (e) => {
    e.preventDefault();
    await addTeam({
      name: teamName,
      about: aboutTeam,
      color,
      author: user,
      members: [user?.email],
      users: [user],
      timestamp: Date.now(),
    });

    // after adding team reset form and close the modal
    reset();
    control();
  };

  return (
    open && (
      <>
        <div
          onClick={control}
          className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
        ></div>
        <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 fixed top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <h2 className="text-sm font-extrabold text-gray-700">Add New Team</h2>
          <form onSubmit={handleAddTeam}>
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6 space-y-4">
                {/* Team Name */}
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Team name
                  </label>
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-200 focus:ring-indigo-200 sm:text-sm"
                    required
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                  />
                </div>

                {/* About Your Team */}

                <div>
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Write about your team
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-200 focus:ring-indigo-200 sm:text-sm"
                      required
                      value={aboutTeam}
                      onChange={(e) => setAboutTeam(e.target.value)}
                    />
                  </div>
                </div>

                {/* Team Color */}
                {/* Team Name */}
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Team Color (
                    <span className="text-gray-400 font-light">
                      {' '}
                      any valid color - color name or code
                    </span>
                    )
                  </label>
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    placeholder="eg. green or #00FFFF or rgb(89,18,100) "
                    autoComplete="given-name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-200 focus:ring-indigo-200 sm:text-sm placeholder:text-gray-300"
                    required
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  />
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  disabled={isLoading}
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
