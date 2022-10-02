import { FaUsers } from 'react-icons/fa';
import TeamOptions from './TeamOptions';
import moment from 'moment/moment';

const Team = ({ team }) => {
  // extract values from team object
  const { name, about, color, users, timestamp } = team;

  return (
    <div className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100">
      <TeamOptions team={team} />
      {/* team name - colored */}
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
      <p className="mt-3 text-sm font-medium">{about}</p>
      <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
        <div className="w-full flex items-center justify-between">
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
          <div className="flex items-center">
            <FaUsers className="w-4 h-4 mr-1 fill-gray-300" />
            <span className="leading-none">{users?.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Team;
