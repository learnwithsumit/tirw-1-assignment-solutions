import logo from '../images/logo.png';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Search from './Search';
import { ReactComponent as LogoutIcon } from '../assets/icons/logout.svg';
import { useDispatch, useSelector } from 'react-redux';
import { userLoggedOut } from '../features/auth/authSlice';
const Navbar = () => {
  const { pathname } = useLocation();

  // logged in user info
  const { user } = useSelector((state) => state.auth) || {};
  const { name, avatar } = user || {};

  const dispatch = useDispatch();

  // handle logout
  const handleLogout = () => {
    dispatch(userLoggedOut());
  };
  return (
    <div className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75 overflow-x-auto overflow-y-hidden">
      <Link to="/teams">
        <img src={logo} alt="LWS" className="w-10" />
      </Link>
      <div className="ml-10">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'mx-2 text-sm font-semibold text-indigo-700 hover:text-indigo-700'
              : 'mx-2 text-sm font-semibold text-gray-600 hover:text-indigo-700'
          }
          to="/projects"
        >
          Projects
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'mx-2 text-sm font-semibold text-indigo-700 hover:text-indigo-700'
              : 'mx-2 text-sm font-semibold text-gray-600 hover:text-indigo-700'
          }
          to="/teams"
        >
          Team
        </NavLink>
      </div>
      {/* serach bar should be place only in the projects page */}
      {pathname === '/projects' && <Search />}

      <div className="ml-auto flex items-center space-x-4 lg:space-x-6">
        <div className="flex items-center space-x-1">
          <button className="flex items-center justify-center w-8 h-8 overflow-hidden rounded-full">
            <img src={avatar} alt="avatar" className="max-w-full" />
          </button>
          <p className="hidden md:block text-gray-500">{name}</p>
        </div>
        <div
          className="flex items-center space-x-1 cursor-pointer"
          onClick={handleLogout}
        >
          <LogoutIcon className="w-4 fill-pink-500" />
          <p className="hidden md:block text-gray-500 hover:text-pink-500 transition">
            Logout
          </p>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
