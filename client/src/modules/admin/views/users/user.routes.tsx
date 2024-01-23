/* eslint-disable react-refresh/only-export-components */
import withTableFetching from "@/hoc/withTableFetching.hoc";
import MainEntryPoint from ".";
import DetailsScreen from "./pages/UserDetails";
import EditScreen from "./pages/UserEdit";
import TableScreen from "./pages/UserTable";
import ServerApi from "./user.api";
import config from "../../config/table.config";
import CreateScreen from "./pages/UserCreate";

const base = "users";
const FechTableScreen = withTableFetching(TableScreen, config.userTable);

const categoryRoutes = [
  {
    path: `/${base}`,
    element: <MainEntryPoint />,
    children: [
      {
        path: `/${base}`,
        element: <FechTableScreen fetchFn={() => ServerApi.fetchAll("")} />,
      },
      { path: `/${base}/create`, element: <CreateScreen /> },
      { path: `/${base}/:id`, element: <DetailsScreen /> },
      { path: `/${base}/edit/:id`, element: <EditScreen /> },
    ],
  },
];

export default categoryRoutes;
