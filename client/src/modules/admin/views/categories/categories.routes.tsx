/* eslint-disable react-refresh/only-export-components */
import withTableFetching from "@/hoc/withTableFetching.hoc";
import MainEntryPoint from ".";
import TableScreen from "./pages/CategoriesTable";
import ServerApi from "./categories.api";
import config from "../../config/table.config";

const base = "category";
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
    ],
  },
];

export default categoryRoutes;
