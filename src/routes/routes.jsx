import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/NotFound";
import LandingPage from "../pages/Landing";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Challenges, {loadChallenges} from "../pages/Challenges";
import SignUp1 from "../pages/Signup1";
import Challenge, {loadChallenge} from "../pages/Challenge";

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
        path: "/signup1",
        element: <SignUp1 />
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/challenges",
        children: [
          {
            index: true,
            element: <Challenges />,
            loader: loadChallenges
          },
          {
            path: "challengeId/:challengeId",
            element: <Challenge />,
            loader: loadChallenge
          }
        ]
        
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
