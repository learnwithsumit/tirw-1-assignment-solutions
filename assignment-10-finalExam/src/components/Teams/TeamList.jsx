import { useSelector } from 'react-redux';
import { useGetTeamsQuery } from '../../features/teams/teamsApi';
import Loader from '../ui/Loader';
import Error from '../ui/Error';
import Team from './Team';

const TeamList = () => {
  // logged in user info
  const { user } = useSelector((state) => state.auth) || {};
  const { email } = user || {};

  // get team api
  const { data: teams, isLoading, isError, error } = useGetTeamsQuery(email);

  // decide what to render
  let content = null;
  if (isLoading) {
    content = (
      <div className="w-full flex items-center justify-center py-6">
        <Loader />
      </div>
    );
  } else if (!isLoading && isError) {
    content = <Error message={error?.data} />;
  } else if (!isLoading && !isError && teams.length === 0) {
    content = (
      <div className="px-10 mt-4 gap-6 ">
        No Teams Found!You can create a team.
      </div>
    );
  } else if (!isLoading && !isError && teams.length > 0) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-10 mt-4 gap-6">
        {teams.map((team) => {
          return <Team key={team.id} team={team} />;
        })}
      </div>
    );
  }
  return <>{content}</>;
};
export default TeamList;
