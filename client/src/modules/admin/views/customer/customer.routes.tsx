/* eslint-disable react-refresh/only-export-components */
import withTableFetching from "@/hoc/withTableFetching.hoc";
import MainEntryPoint from ".";
import DetailsScreen from "./pages/CustomerDetails";
import EditScreen from "./pages/CustomerEdit";
import TableScreen from "./pages/CustomerTable";
import ServerApi from "./customer.api";
import config from "../../config/table.config";
import CreateScreen from "./pages/CustomerCreate";

const base = "customer";
const FechTableScreen = withTableFetching(TableScreen, config.customerTable);

const categoryRoutes = [
  {
    path: `/${base}`,
    element: <MainEntryPoint />,
    children: [
      {
        path: `/${base}`,
        element: <FechTableScreen fetchFn={ServerApi.fetchAll} />,
      },
      { path: `/${base}/create`, element: <CreateScreen /> },
      { path: `/${base}/:id`, element: <DetailsScreen /> },
      { path: `/${base}/edit/:id`, element: <EditScreen /> },
    ],
  },
];

export default categoryRoutes;
