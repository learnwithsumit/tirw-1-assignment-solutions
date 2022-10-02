import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useAuthChecked from './hooks/useAuthCheck';
import {
  Login,
  Teams,
  Projects,
  NotFound,
  ProtectedRoute,
  SharedLayout,
  PublicRoute,
} from './pages';

function App() {
  const authChecked = useAuthChecked();
  return !authChecked ? (
    <div>Checking authentication...</div>
  ) : (
    <BrowserRouter>
      <Routes>
        {/* react router v6 nested route syntax */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/teams" />} />
          <Route path="teams" element={<Teams />} />
          <Route path="projects" element={<Projects />} />
        </Route>
        {/* react router v6 nested route syntax */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
