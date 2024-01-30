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
import ProductDetails from "./containers/ProductDetails";
import withTableFetching from "@/hoc/withTableFetching.hoc";
import tableConfig from "./config/table.config";
import orderApi from "./api/order.api";
import OrderDetails from "./containers/OrderDetails";

const FetchOrderTable = withTableFetching(OrderScreen, tableConfig.orderTable);

const UID = localStorage.getItem("info")
  ? JSON.parse(localStorage.getItem("info") || "")
  : null;

export const userRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootScreen />,
    children: [
      { path: "/", element: <HomeScreen /> },
      {
        path: "/order",
        element: (
          <FetchOrderTable fetchFn={() => orderApi.fetchAll({ UID: UID })} />
        ),
      },
      { path: "/order/:id", element: <OrderDetails /> },
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
