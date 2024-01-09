import { createBrowserRouter } from "react-router-dom";
import AdminEntryPoint from ".";
import NotFound from "../utils/NotFound";
import { userRoutes } from "./modules/user/user.routes";
import { productRoutes } from "./modules/products/product.routes";
import SettingsScreen from "./modules/settings";

const adminRoutes = createBrowserRouter([
  { path: "*", element: <NotFound /> },
  { path: "/", element: <AdminEntryPoint /> },
  { path: "/settings", element: <SettingsScreen /> },
  userRoutes,
  productRoutes,
]);
export default adminRoutes;
