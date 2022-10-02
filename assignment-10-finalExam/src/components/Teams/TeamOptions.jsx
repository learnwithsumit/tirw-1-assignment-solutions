import { Menu, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';
import { useDeleteTeamMutation } from '../../features/teams/teamsApi';
import { useSelector } from 'react-redux';
import AddMemberModal from './AddMemberModal';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
const TeamOptions = ({ team }) => {
  // extract values from team object
  const { id } = team || {};

  // logged in user info
  const { user } = useSelector((state) => state.auth) || {};
  const { email } = user || {};
  // modal states
  const [opened, setOpened] = useState(false);
  const controlModal = () => {
    setOpened((prevState) => !prevState);
  };

  // delete  team api
  const [deleteTeam] = useDeleteTeamMutation();

  // handle delete - only who created team

  const handleDelete = () => {
    if (team?.author?.email === email) {
      deleteTeam({ id, loggedInUserEmail: email });
    }
  };

  return (
    <>
      <Menu as="div" className="absolute top-0 right-0 inline-block text-left">
        <Menu.Button className="absolute top-0 right-0 items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex">
          <svg
            className="w-4 h-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute top-6  right-8 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
            <div className="py-1">
              <Menu.Item style={{ width: '100%', textAlign: 'left' }}>
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'px-4 py-2 text-sm flex items-center'
                    )}
                    onClick={controlModal}
                  >
                    <IoMdAdd className="mr-1.5" />
                    <span>Add Member</span>
                  </button>
                )}
              </Menu.Item>
              {/* only for author - who created the team */}
              {team?.author?.email === email && (
                <Menu.Item style={{ width: '100%', textAlign: 'left' }}>
                  {({ active }) => (
                    <button
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'px-4 py-2 text-sm flex items-center'
                      )}
                      onClick={handleDelete}
                    >
                      <MdDelete className="mr-1.5" />
                      <span>Delete Team</span>
                    </button>
                  )}
                </Menu.Item>
              )}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <AddMemberModal open={opened} control={controlModal} team={team} />
    </>
  );
};
export default TeamOptions;
