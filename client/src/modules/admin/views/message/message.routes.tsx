/* eslint-disable react-refresh/only-export-components */
import withTableFetching from "@/hoc/withTableFetching.hoc";
import MainEntryPoint from ".";
import DetailsScreen from "./pages/MessageDetails";
import TableScreen from "./pages/MessageTable";
import ServerApi from "./message.api";
import config from "../../config/table.config";

const base = "message";
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
