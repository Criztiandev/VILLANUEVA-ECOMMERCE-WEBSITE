/* eslint-disable react-refresh/only-export-components */
import RootScreen from ".";
import { createBrowserRouter } from "react-router-dom";
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
import ArchiveProductOrderTable from "./pages/ArchiveScreen";
import archiveApi from "../admin/api/archive.api";
import ProductOrderDetails from "./containers/ProductOrderDetails";
import ServiceScheduleDetails from "./containers/ServiceScheduleDetails";
import ServiceArchiveTable from "./pages/ServiceArchiveScreen";

const FetchOrderTable = withTableFetching(OrderScreen, tableConfig.orderTable);
const FetchServiceTable = withTableFetching(
  ServiceScreen,
  tableConfig.serviceSchedule
);

const FetchArchieveTable = withTableFetching(
  ArchiveProductOrderTable,
  tableConfig.ArchiveProductTable
);

const FetchServiceArchiveTable = withTableFetching(
  ServiceArchiveTable,
  tableConfig.ServiceArchiveTable
);

const UID = localStorage.getItem("info")
  ? JSON.parse(localStorage.getItem("info") || "")
  : null;

export const userRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootScreen />,
    children: [
      {
        path: "/",
        element: (
          <FetchOrderTable fetchFn={() => orderApi.fetchAll({ UID: UID })} />
        ),
      },
      { path: "/:id", element: <OrderDetails /> },
      {
        path: "/service",
        element: (
          <FetchServiceTable
            fetchFn={() => serviceBookApi.fetchAll({ customer: UID })}
          />
        ),
      },
      { path: "/service/:id", element: <ServiceScheduleDetails /> },
      { path: "/archive/service/:id", element: <ServiceScheduleDetails /> },
      { path: "/product/shop", element: <ProductShopScreen /> },
      { path: "/product/shop/:id", element: <ProductDetails /> },
      { path: "/service/shop", element: <ServiceShopScreen /> },
      { path: "/service/shop/:id", element: <ServiceDetails /> },
      { path: "/checkout", element: <CheckoutScreen /> },
      { path: "/settings", element: <SettingsScreen /> },

      {
        path: "/order/archive/products",
        element: (
          <FetchArchieveTable
            fetchFn={() => archiveApi.fetchAllProducts({ UID: UID })}
          />
        ),
      },
      {
        path: "/service/archive",
        element: (
          <FetchServiceArchiveTable
            fetchFn={() => archiveApi.fetchAllService({ customer: UID })}
          />
        ),
      },
      { path: "/order/archive/products/:id", element: <ProductOrderDetails /> },
    ],
  },
]);

export default userRoutes;
