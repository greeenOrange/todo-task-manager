import { useLocation, Navigate, Outlet } from 'react-router-dom';

const RequireAuth = () => {
  const profileUser = JSON.parse(localStorage.getItem('users'));
  const location = useLocation();

  const isAuthenticated = authenticateUser(profileUser);
  // console.log(isAuthenticated);
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

const authenticateUser = (userArray) => {
  if (!userArray || userArray.length === 0) {
    return false;
  }
  const loggedInUser = userArray.find((user) => user?.email);
  return loggedInUser !== undefined;
};
export default RequireAuth;