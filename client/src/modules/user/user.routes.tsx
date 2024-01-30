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
import ServiceDetails from "./containers/ServiceDetails";
import serviceBookApi from "../public/api/serviceBook.api";

const FetchOrderTable = withTableFetching(OrderScreen, tableConfig.orderTable);
const FetchServiceTable = withTableFetching(
  ServiceScreen,
  tableConfig.serviceSchedule
);

const UID = localStorage.getItem("info")
  ? JSON.parse(localStorage.getItem("info") || "")
  : null;

console.log(UID);

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
      {
        path: "/service",
        element: (
          <FetchServiceTable
            fetchFn={() => serviceBookApi.fetchAll({ customer: UID })}
          />
        ),
      },
      { path: "/product/shop", element: <ProductShopScreen /> },
      { path: "/product/shop/:id", element: <ProductDetails /> },
      { path: "/service/shop", element: <ServiceShopScreen /> },
      { path: "/service/shop/:id", element: <ServiceDetails /> },
      { path: "/checkout", element: <CheckoutScreen /> },
      { path: "/settings", element: <SettingsScreen /> },
    ],
  },
]);

export default userRoutes;
