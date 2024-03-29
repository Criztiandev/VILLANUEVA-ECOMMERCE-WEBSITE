import { useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { RootReducer } from "./service/store";
import publicRoutes from "./modules/public/index.routes";
import adminRoutes from "./modules/admin/admin.routes";
import userRoutes from "./modules/user/user.routes";
const App = () => {
  const { UID, role } = useSelector((state: RootReducer) => state.auth);

  if (!UID || !role) {
    return <RouterProvider router={publicRoutes} />;
  }
  const protectedRoutes = role === "user" ? userRoutes : adminRoutes;
  return <RouterProvider router={protectedRoutes} />;
};

export default App;
