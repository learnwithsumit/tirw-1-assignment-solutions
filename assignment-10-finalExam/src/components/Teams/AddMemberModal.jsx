import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlinePlus } from 'react-icons/ai';
import { usersApi } from '../../features/users/usersApi';
import Loader from '../ui/Loader';
import Error from '../ui/Error';
import isValidEmail from '../../utils/isValidEmail';
import { useAddMemberMutation } from '../../features/teams/teamsApi';

export default function AddMemberModal({ open, control, team }) {
  // logged in user info
  const { user: loggedInUser } = useSelector((state) => state.auth) || {};
  const { email: myEmail } = loggedInUser || {};

  // local states - for add user modal
  const [responseError, setResponseError] = useState('');
  const [user, setUser] = useState(undefined);

  const dispatch = useDispatch();

  // add member api
  const [addTeamMember, { isLoading }] = useAddMemberMutation();

  // check email if exists or not valid email
  useEffect(() => {
    if (user && user.length === 0) {
      setResponseError('User not found!');
    }
    if (user === undefined) {
      setResponseError('');
    }
  }, [user]);

  // debounce function
  const debounceHandler = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  // do search - if email is valid
  const doSearch = (value) => {
    if (isValidEmail(value)) {
      dispatch(
        usersApi.endpoints.getUser.initiate(value, { forceRefetch: true })
      )
        .unwrap()
        .then((data) => {
          if (team?.members?.includes(data[0]?.email)) {
            setResponseError('User already in the team');
          } else {
            setUser(data);
            setResponseError('');
          }
        });
    }
  };

  // reset to initial data
  const reset = () => {
    setUser(undefined);
    setResponseError('');
  };

  // handle search - when debounced input changed
  const handleSearch = debounceHandler(doSearch, 500);

  // add member - when only found user and not in the team already
  const handleAddMember = async (e) => {
    e.preventDefault();
    if (user && user.length > 0) {
      await addTeamMember({
        id: team.id,
        data: {
          members: [...team.members, user[0].email],
          users: [...team.users, user[0]],
        },
        loggedInUserEmail: myEmail,
      });
    }

    // after adding member reset form and close modal
    reset();
    control();
  };

  // handle email change
  const handleEmailChange = (e) => {
    handleSearch(e.target.value);
    if (!isValidEmail(e.target.value)) {
      setUser(undefined);
      setResponseError('');
    }
  };

  return (
    open && (
      <>
        <div
          onClick={control}
          className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
        ></div>
        <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 fixed top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <h2 className="text-sm font-extrabold text-gray-700">
            Add New Member
          </h2>
          <form onSubmit={handleAddMember}>
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6 space-y-4">
                {/* User Email */}
                <div className="flex w-full items-center">
                  <input
                    type="email"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md rounded-r-none border-gray-300 shadow-sm focus:border-indigo-200 border-r-none focus:ring-indigo-200 sm:text-sm placeholder:text-gray-300"
                    required
                    placeholder="user email"
                    onChange={handleEmailChange}
                  />

                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-l-none self-stretch  items-center"
                    disabled={!user || user.length === 0}
                  >
                    {isLoading ? (
                      <Loader />
                    ) : (
                      <AiOutlinePlus className="text-white" />
                    )}
                  </button>
                </div>
                {/* when valid user found to add */}
                {user && user.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <img
                      src={user[0].avatar}
                      alt="avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <p>{user[0].name}</p>
                  </div>
                )}
              </div>
            </div>
            {/* if something is wrong */}
            <div className="mt-4">
              {responseError && <Error message={responseError} />}
            </div>
          </form>
        </div>
      </>
    )
  );
}
