/* eslint-disable react-refresh/only-export-components */
import withTableFetching from "@/hoc/withTableFetching.hoc";
import OrderScreen from "./modules/order";
import { createBrowserRouter } from "react-router-dom";
import orderTable from "./config/order.table.config";
import UserEntyPoint from ".";
import orderApi from "./api/order.api";
import StoreScreen from "./modules/store";

const OrderTable = withTableFetching(OrderScreen, {
  name: orderTable.name,
  base: orderTable.base,
});

const userRootRoute = createBrowserRouter([
  {
    path: "/",
    element: <UserEntyPoint />,
    children: [
      { path: "/", element: <StoreScreen /> },
      { path: "/product/:id", element: <div>Profile</div> },
      { path: "/address", element: <div>Address</div> },
    ],
  },

  {
    path: "/order",
    element: <UserEntyPoint />,
    children: [
      {
        path: "/order",
        element: <OrderTable fetchFn={orderApi.fetchAll} />,
      },
      { path: "/order/:id", element: <div>Order Detail</div> },
    ],
  },
]);

export default userRootRoute;
