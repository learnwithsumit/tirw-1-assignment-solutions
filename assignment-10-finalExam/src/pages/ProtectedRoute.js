import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
