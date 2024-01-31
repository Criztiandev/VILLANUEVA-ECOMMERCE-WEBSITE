/* eslint-disable react-refresh/only-export-components */
import RootScreen from ".";
import { createBrowserRouter } from "react-router-dom";
import authRoutes from "./routes/auth.routes";
import shopRoutes from "./routes/shop.routes";
import LandingPage from "./views/LandingPage";

export const publicRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootScreen />,
    children: [
      { path: "/", element: <LandingPage /> },
      ...authRoutes,
      ...shopRoutes,
    ],
  },
]);

export default publicRoutes;
