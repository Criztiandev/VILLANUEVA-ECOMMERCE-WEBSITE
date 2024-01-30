/* eslint-disable react-refresh/only-export-components */
import withTableFetching from "@/hoc/withTableFetching.hoc";
import MainEntryPoint from "../views/service";
import ServiceCreate from "../views/service/screen/ServiceCreate";
import ServiceDetails from "../views/service/screen/ServiceDetails";
import ServiceEdit from "../views/service/screen/ServiceEdit";
import Service from "../views/service/screen/ServiceTable";
import tableConfig from "../config/table.config";
import serviceApi from "../api/service.api";

const FetchProductTable = withTableFetching(Service, tableConfig.serviceTable);

const productRoutes = [
  {
    path: "/service",
    element: <MainEntryPoint />,
    children: [
      {
        path: "/service",
        element: <FetchProductTable fetchFn={serviceApi.fetchAll} />,
      },
      { path: "/service/create", element: <ServiceCreate /> },
      { path: "/service/:id", element: <ServiceDetails /> },
      { path: "/service/edit/:id", element: <ServiceEdit /> },
    ],
  },
];

export default productRoutes;
