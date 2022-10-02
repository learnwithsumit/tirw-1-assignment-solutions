import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import ProjectGrid from '../components/Projects/ProjectGrid';
import ProjectsHeader from '../components/Projects/ProjectsHeader';

// the DND functionality will only use in projects page of our application. So wrapped by DndProvider here

const Projects = () => {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <ProjectsHeader />
        <ProjectGrid />
      </DndProvider>
    </>
  );
};
export default Projects;
