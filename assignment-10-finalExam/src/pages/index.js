// import all pages
import Login from './Login';
import Teams from './Teams';
import Projects from './Projects';
import NotFound from './NotFound';
import ProtectedRoute from './ProtectedRoute';
import SharedLayout from './SharedLayout';
import PublicRoute from './PublicRoute';

// export all pages - named export - because of this , in App.js imports will be neat and clean
export {
  Login,
  Teams,
  Projects,
  NotFound,
  ProtectedRoute,
  SharedLayout,
  PublicRoute,
};
