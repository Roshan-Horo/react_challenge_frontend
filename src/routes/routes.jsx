import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/NotFound";
import LandingPage from "../pages/Landing";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Challenges from "../pages/Challenges";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/challenges",
        element: <Challenges />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
