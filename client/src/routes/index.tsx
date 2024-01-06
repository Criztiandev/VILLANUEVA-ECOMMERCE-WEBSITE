import { publicRoutes } from "./public.routes";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { RootReducer } from "@/service/store";
import { privateRoutes } from "./private.routes";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";

const Routes = () => {
  const { token } = useSelector((state: RootReducer) => state.auth);

  const protectedRoutes = token ? privateRoutes : publicRoutes;
  return (
    <>
      <RouterProvider router={protectedRoutes} />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        closeOnClick
        draggable
        pauseOnHover
        style={{ zIndex: 9999 }}
      />
    </>
  );
};

export default Routes;
