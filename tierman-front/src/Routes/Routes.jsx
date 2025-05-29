import { createBrowserRouter } from "react-router-dom";
import Layout from "../Components/Layout";
import ProtectedRoute from "../Components/ProtectedRoute";
import Landing from "../Pages/Landing";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import TierCreate from "../Pages/TierCreate";
import TierlistFill from "../Pages/TierlistFill";

const routes = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Landing /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/tierlist/:id", element: <TierlistFill /> },
      {
        element: <ProtectedRoute />,
        children: [{ path: "/create-template", element: <TierCreate /> }],
      },
    ],
  },
]);

export default routes;
