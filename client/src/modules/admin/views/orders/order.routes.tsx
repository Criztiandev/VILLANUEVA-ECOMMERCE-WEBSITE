/* eslint-disable react-refresh/only-export-components */
import withTableFetching from "@/hoc/withTableFetching.hoc";
import MainEntryPoint from ".";
import DetailsScreen from "./pages/OrderDetails";
import TableScreen from "./pages/OrderTable";
import ServerApi from "./order.api";
import config from "../../config/table.config";

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
