import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { MdDelete } from 'react-icons/md';
import { useDeleteProjectMutation } from '../../features/projects/projectsApi';
import moment from 'moment';
const Project = ({ project = {} }) => {
  // extracts values from project object
  const {
    id,
    title,
    stage,
    team: { name, color },
    author: { avatar, email },
    timestamp,
  } = project;

  // logged in user info
  const { user } = useSelector((state) => state.auth) || {};
  const { email: loggedInUserEmail } = user;

  // delete api
  const [deleteProject] = useDeleteProjectMutation();

  // get search text
  const { searchText } = useSelector((state) => state.filters);

  // DND - dragging - hook
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'div',
    item: project,
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  }));

  // handle delete
  const handleDelete = () => {
    if (stage?.toLowerCase() === 'backlog' && email === loggedInUserEmail) {
      deleteProject({ id, loggedInUserEmail });
    }
  };

  return (
    // draggable item - 'div'
    <div
      className={`relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100 border-2 border-transparent ${
        searchText &&
        project.title.toLowerCase().includes(searchText.toLowerCase()) &&
        'animate-pulse border-violet-500'
      }`}
      ref={drag}
      style={{ display: isDragging ? 'none' : 'flex' }}
    >
      {/* if project is in backlog and logged in user is the author of the project only then show delete option */}
      {stage?.toLowerCase() === 'backlog' && email === loggedInUserEmail && (
        <button
          className="absolute top-0 right-0  items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex"
          onClick={handleDelete}
        >
          <MdDelete />
        </button>
      )}
      {/* team name - colored rounded box */}
      <div className="relative px-4 py-1 flex items-center justify-center">
        <span
          className={`absolute w-full h-full rounded-full`}
          style={{
            backgroundColor: color || 'mediumseagreen',
            opacity: 0.1,
          }}
        ></span>
        <span style={{ color }} className="text-xs font-semibold">
          {name}
        </span>
      </div>
      {/* project title */}
      <p className="mt-3 text-sm font-medium">{title}</p>
      <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
        {/* date */}
        <div className="flex items-center">
          <svg
            className="w-4 h-4 text-gray-300 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
          <span className="ml-1 leading-none">
            {moment.unix(timestamp / 1000).format('MMM Do YYYY')}
          </span>
        </div>
        {/* avatar */}
        <img className="w-6 h-6 ml-auto rounded-full" src={avatar} alt="" />
      </div>
    </div>
  );
};
export default Project;
