import { useState } from 'react';
import { useDrop } from 'react-dnd';
import { useSelector } from 'react-redux';
import { useChangeStageMutation } from '../../features/projects/projectsApi';
import AddProjectModal from './AddProjectModal';
import Project from './Project';

const ProjectList = ({ title, projects = [] }) => {
  // logged in user info
  const { user } = useSelector((state) => state.auth) || {};
  const { email } = user || {};

  // modal states
  const [opened, setOpened] = useState(false);
  const controlModal = () => {
    setOpened((prevState) => !prevState);
  };

  // change project stage api
  const [changeStage] = useChangeStageMutation();

  // handle drop - on dnd drop occured
  const handleDrop = (item) => {
    if (item?.stage?.toLowerCase() !== title?.toLowerCase()) {
      changeStage({ id: item.id, email, data: { stage: title.toLowerCase() } });
    }
  };
  // DND - drop - hook
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'div',
    drop: handleDrop,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <>
      <div
        className="flex flex-col flex-shrink-0 w-72"
        ref={drop}
        style={{ border: isOver ? '1px dashed #999' : '1px solid transparent' }}
      >
        <div className="flex items-center flex-shrink-0 h-10 px-2">
          <span className="block text-sm font-semibold capitalize">
            {title}
          </span>
          <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
            {projects.length}
          </span>
          {title.toLowerCase() === 'backlog' && (
            <button
              className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100"
              onClick={controlModal}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
            </button>
          )}
        </div>
        <div className="flex flex-col pb-2 overflow-auto">
          {projects.map((project) => {
            return <Project key={project.id} project={project} />;
          })}
        </div>
      </div>
      <AddProjectModal open={opened} control={controlModal} />
    </>
  );
};
export default ProjectList;
