/* eslint-disable react-refresh/only-export-components */
import withTableFetching from "@/hoc/withTableFetching.hoc";
import MainEntryPoint from "../views/orders";
import DetailsScreen from "../views/orders/screen/OrderDetails";
import TableScreen from "../views/orders/screen/OrderTable";
import config from "../config/table.config";
import orderApi from "../api/order.api";

const base = "order";
const FechTableScreen = withTableFetching(TableScreen, config.orderTable);

const categoryRoutes = [
  {
    path: `/${base}`,
    element: <MainEntryPoint />,
    children: [
      {
        path: `/${base}`,
        element: <FechTableScreen fetchFn={orderApi.fetchAll} />,
      },
      { path: `/${base}/:id`, element: <DetailsScreen /> },
    ],
  },
];

export default categoryRoutes;
