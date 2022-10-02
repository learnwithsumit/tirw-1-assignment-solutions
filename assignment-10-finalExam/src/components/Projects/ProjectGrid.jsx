import ProjectList from './ProjectList';
import { useGetProjectsQuery } from '../../features/projects/projectsApi';
import Loader from '../ui/Loader';
import Error from '../ui/Error';
import { useSelector } from 'react-redux';

const ProjectGrid = () => {
  // logged in user info
  const { user } = useSelector((state) => state.auth) || {};
  const { email } = user || {};
  const { data: projects, isLoading, isError } = useGetProjectsQuery(email);

  // filters

  // backlog filter
  const filterByBacklog = (project) =>
    project?.stage?.toLowerCase() === 'backlog';

  // ready filter
  const filterByReady = (project) => project?.stage?.toLowerCase() === 'ready';

  // doing filter
  const filterByDoing = (project) => project?.stage?.toLowerCase() === 'doing';

  // review filter
  const filterByReview = (project) =>
    project?.stage?.toLowerCase() === 'review';

  // blocked filter
  const filterByBlocked = (project) =>
    project?.stage?.toLowerCase() === 'blocked';

  // done filter
  const filterByDone = (project) => project?.stage?.toLowerCase() === 'done';
  // decide what to render
  let content = null;

  if (isLoading) {
    // when loading
    content = (
      <div className="w-full py-4 flex items-center justify-center">
        <Loader />
      </div>
    );
  } else if (!isLoading && isError) {
    // when error
    content = (
      <div>
        <Error message="Something went wrong" />
      </div>
    );
  } else if (!isLoading && !isError && projects.length === 0) {
    // when no projects found
    content = (
      <>
        <p className="text-gray-500 px-10 mt-6">
          No project found! You can add if you are in a team
        </p>
        <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
          <ProjectList title="backlog" />
          <ProjectList title="ready" />
          <ProjectList title="doing" />
          <ProjectList title="review" />
          <ProjectList title="blocked" />
          <ProjectList title="done" />
        </div>
      </>
    );
  } else if (!isLoading && !isError && projects.length > 0) {
    content = (
      <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
        {/* backlog projects */}
        <ProjectList
          title="backlog"
          projects={projects.filter(filterByBacklog)}
        />
        {/* ready projects */}
        <ProjectList title="ready" projects={projects.filter(filterByReady)} />
        {/* doing projects */}
        <ProjectList title="doing" projects={projects.filter(filterByDoing)} />
        {/* review projects */}
        <ProjectList
          title="review"
          projects={projects.filter(filterByReview)}
        />
        {/* blocked projects */}
        <ProjectList
          title="blocked"
          projects={projects.filter(filterByBlocked)}
        />
        {/* done projects */}
        <ProjectList title="done" projects={projects.filter(filterByDone)} />
      </div>
    );
  }
  return <>{content}</>;
};
export default ProjectGrid;
