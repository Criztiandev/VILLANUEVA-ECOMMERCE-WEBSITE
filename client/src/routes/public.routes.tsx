/* eslint-disable react-refresh/only-export-components */
import withLazyLoading from "@/hoc/withLazyLoading.hoc";
import { createBrowserRouter } from "react-router-dom";

const LoginScreenLazy = withLazyLoading(
  () => import("@/views/auth/LoginScreen")
);
const RegisterScreenLazy = withLazyLoading(
  () => import("@/views/auth/RegisterScreen")
);

const NotFoundLazy = withLazyLoading(() => import("@/views/general/NotFound"));

export const publicRoutes = createBrowserRouter([
  { path: "*", element: <NotFoundLazy /> },
  { path: "/login", element: <LoginScreenLazy /> },
  { path: "/register", element: <RegisterScreenLazy /> },
]);
