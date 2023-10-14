import { Navigate, createBrowserRouter } from "react-router-dom";
import Root from "../Components/Root";
import Home from "../Components/Home/Home";
import Login from "../Shared/Login";
import Register from "../Shared/Register";
import Profile from "../Components/Profile/Profile";
import RequireAuth from "../Components/RequireAuth/RequireAuth";
const routers = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <RequireAuth />,
          children: [
            {
              path: "",
              element: <Home />,
            },
          ],
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/profile",
          element: <RequireAuth />,
          children: [
            {
              path: "",
              element: <Profile />,
            },
          ],
        },
        {
          path: "*",
          element: <Navigate to="/" replace />,
        },
      ],
    },
  ]);
  export default routers;