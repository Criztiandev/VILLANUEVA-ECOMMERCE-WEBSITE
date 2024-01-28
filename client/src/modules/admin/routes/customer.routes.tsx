/* eslint-disable react-refresh/only-export-components */
import withTableFetching from "@/hoc/withTableFetching.hoc";
import MainEntryPoint from "../views/customer";
import DetailsScreen from "../views/customer/screen/CustomerDetails";
import EditScreen from "../views/customer/screen/CustomerEdit";
import TableScreen from "../views/customer/screen/CustomerTable";
import ServerApi from "../api/customer.api";
import config from "../config/table.config";
import CreateScreen from "../views/customer/screen/CustomerCreate";

const base = "customer";
const FechTableScreen = withTableFetching(TableScreen, config.customerTable);

const categoryRoutes = [
  {
    path: `/${base}`,
    element: <MainEntryPoint />,
    children: [
      {
        path: `/${base}`,
        element: <FechTableScreen fetchFn={() => ServerApi.fetchAll("user")} />,
      },
      { path: `/${base}/create`, element: <CreateScreen /> },
      { path: `/${base}/:id`, element: <DetailsScreen /> },
      { path: `/${base}/edit/:id`, element: <EditScreen /> },
    ],
  },
];

export default categoryRoutes;
