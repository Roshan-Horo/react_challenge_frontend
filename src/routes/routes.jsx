import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import LandingPage from "../pages/Landing";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import Challenges from "../pages/Challenges";
import Challenge,{challengeLoader} from "../pages/Challenge";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
    ],
  },
  {
    path: "/signup",
    children: [
      {
        index: true,
        element: <Signup />,
      },
    ],
  },
  {
    path: "/signin",
    children: [
      {
        index: true,
        element: <Signin />,
      },
    ],
  },
  {
    path: "/challenges",
    children: [
      {
        index: true,
        element: <Challenges />,
      },
    ],
  },
  {
    path: "/challenge/:challengeName",
    element: <Challenge />,
    loader: challengeLoader
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
