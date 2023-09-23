import { useLocation, Navigator, Outlet } from 'react-router-dom';

const RequireAuth = () => {
    const profileUser = JSON.parse(localStorage.getItem('user'));
    const location = useLocation()
  return (
    profileUser?.email ?
    <Outlet />: <Navigator to="/login" state={{from: location}} replace />
  )
}

export default RequireAuth