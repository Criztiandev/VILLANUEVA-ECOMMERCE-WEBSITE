/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import { userRoutes } from "@/views/user/user.routes";
import withLazyLoading from "@/hoc/withLazyLoading.hoc";
import { productRoutes } from "@/views/products/product.routes";

const DashboardLazyScreen = withLazyLoading(() => import("@/views/dashboard"));
const SettingsLazyScreen = withLazyLoading(() => import("@/views/settings"));

const NotFoundLazy = withLazyLoading(() => import("@/views/general/NotFound"));

export const privateRoutes = createBrowserRouter([
  { path: "*", element: <NotFoundLazy /> },
  { path: "/", element: <DashboardLazyScreen /> },
  { path: "/settings", element: <SettingsLazyScreen /> },
  userRoutes,
  productRoutes,
]);
