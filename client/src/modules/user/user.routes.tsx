/* eslint-disable react-refresh/only-export-components */
import RootScreen from ".";
import { createBrowserRouter } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import OrderScreen from "./pages/OrderScreen";
import ServiceScreen from "./pages/ServiceScreen";
import ProductShopScreen from "./pages/ProductShopScreen";
import ServiceShopScreen from "./pages/ServiceShopScreen";
import SettingsScreen from "./pages/SettingsScreen";
import CheckoutScreen from "./pages/CheckoutScreen";
import ProductDetails from "./pages/ProductDetails";

export const userRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootScreen />,
    children: [
      { path: "/", element: <HomeScreen /> },
      { path: "/order", element: <OrderScreen /> },
      { path: "/service", element: <ServiceScreen /> },
      { path: "/product/shop", element: <ProductShopScreen /> },
      { path: "/product/shop/:id", element: <ProductDetails /> },
      { path: "/service/shop", element: <ServiceShopScreen /> },
      { path: "/checkout", element: <CheckoutScreen /> },
      { path: "/settings", element: <SettingsScreen /> },
    ],
  },
]);

export default userRoutes;
