import withTableFetching from "@/hoc/withTableFetching.hoc";
import MainEntryPoint from "../views/service";
import ServiceCreate from "../views/service/screen/ServiceCreate";
import ServiceDetails from "../views/service/screen/ServiceDetails";
import ServiceEdit from "../views/service/screen/ServiceEdit";
import Service from "../views/service/screen/ServiceTable";
import productApi from "../api/service.api";
import tableConfig from "../config/table.config";

const FetchProductTable = withTableFetching(Service, tableConfig.productTable);

const productRoutes = [
  {
    path: "/service",
    element: <MainEntryPoint />,
    children: [
      {
        path: "/service",
        element: <FetchProductTable fetchFn={productApi.fetchAll} />,
      },
      { path: "/service/create", element: <ServiceCreate /> },
      { path: "/service/:id", element: <ServiceDetails /> },
      { path: "/service/edit/:id", element: <ServiceEdit /> },
    ],
  },
];

export default productRoutes;
