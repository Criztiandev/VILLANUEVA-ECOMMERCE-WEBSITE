/* eslint-disable react-refresh/only-export-components */
import RootScreen from ".";
import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import ProductDetails from "./pages/ProductDetails";
import CartScreen from "./pages/CartScreen";

export const userRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootScreen />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/shop", element: <Shop /> },
      { path: "/cart", element: <CartScreen /> },
      { path: "/shop/:id", element: <ProductDetails /> },
      { path: "/checkout", element: <Checkout /> },
    ],
  },
]);

export default userRoutes;
