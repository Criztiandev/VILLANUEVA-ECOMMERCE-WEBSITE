/* eslint-disable react-refresh/only-export-components */
import withTableFetching from "@/hoc/withTableFetching.hoc";
import MainEntryPoint from "../views/orders";
import DetailsScreen from "../views/orders/screen/OrderDetails";
import TableScreen from "../views/orders/screen/OrderTable";
import ServerApi from "../api/order.api";
import config from "../config/table.config";

const base = "order";
const FechTableScreen = withTableFetching(TableScreen, config.categoryTable);

const categoryRoutes = [
  {
    path: `/${base}`,
    element: <MainEntryPoint />,
    children: [
      {
        path: `/${base}`,
        element: <FechTableScreen fetchFn={ServerApi.fetchAll} />,
      },
      { path: `/${base}/:id`, element: <DetailsScreen /> },
    ],
  },
];

export default categoryRoutes;
