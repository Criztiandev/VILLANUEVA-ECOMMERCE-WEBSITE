import { createBrowserRouter } from "react-router-dom";
import AdminEntryPoint from ".";
import NotFound from "../utils/NotFound";

const adminRoutes = createBrowserRouter([
  { path: "*", element: <NotFound /> },
  { path: "/", element: <AdminEntryPoint /> },
]);
export default adminRoutes;
