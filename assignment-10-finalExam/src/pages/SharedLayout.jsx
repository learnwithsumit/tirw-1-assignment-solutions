import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
const SharedLayout = () => {
  return (
    <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
      <Navbar />
      <Outlet />
    </div>
  );
};
export default SharedLayout;
