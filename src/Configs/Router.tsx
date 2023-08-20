import { createBrowserRouter } from "react-router-dom";
import Home from "../Home/Home";
import Signin from "../Authentications/Signin";
import Private from "./PrivateRoutes-conf";
import Test from "../Authentications/Auth_Pages/Test";
import Page404 from "../Home/Page404";
import Log from "../Authentications/Log";
import Unprivate from "./Unprivate";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/SignIn",
    element: (
      <Unprivate>
        <Signin />
      </Unprivate>
    ),
  },
  {
    path: "/api",
    element: (
      <Private>
        <Test />
      </Private>
    ),
  },
  {
    path: "/login",
    element: (
      <Unprivate>
        <Log />
      </Unprivate>
    ),
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);
