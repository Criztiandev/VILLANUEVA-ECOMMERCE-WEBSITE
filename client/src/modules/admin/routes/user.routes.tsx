/* eslint-disable react-refresh/only-export-components */
import withTableFetching from "@/hoc/withTableFetching.hoc";
import MainEntryPoint from "../views/users";
import DetailsScreen from "../views/users/pages/UserDetails";
import EditScreen from "../views/users/pages/UserEdit";
import TableScreen from "../views/users/pages/UserTable";
import ServerApi from "../api/user.api";
import config from "../config/table.config";
import CreateScreen from "../views/users/pages/UserCreate";

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
