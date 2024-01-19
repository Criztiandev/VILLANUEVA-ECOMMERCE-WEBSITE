/* eslint-disable react-refresh/only-export-components */
import RootScreen from ".";
import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./views/static/LandingPage";
import LoginScreen from "./views/auth/LoginScreen";
import Shop from "./views/static/pages/Shop";
import Checkout from "./views/static/pages/Checkout";

export const publicRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootScreen />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/shop", element: <Shop /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/login", element: <LoginScreen /> },
      { path: "/forgot-password/:id", element: <div>Forgot Password</div> },
    ],
  },
]);

export default publicRoutes;
