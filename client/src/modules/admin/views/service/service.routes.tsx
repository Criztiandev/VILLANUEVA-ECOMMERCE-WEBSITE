import withTableFetching from "@/hoc/withTableFetching.hoc";
import MainEntryPoint from ".";
import ServiceCreate from "./pages/ServiceCreate";
import ServiceDetails from "./pages/ServiceDetails";
import ServiceEdit from "./pages/ServiceEdit";
import ServiceTable from "./pages/ServiceTable";
import productApi from "./service.api";
import tableConfig from "../../config/table.config";
import ServiceSchedule from "./pages/ServiceSchedule";

const FetchProductTable = withTableFetching(
  ServiceTable,
  tableConfig.productTable
);

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
      { path: "/service/schedule", element: <ServiceSchedule /> },
      { path: "/service/edit/:id", element: <ServiceEdit /> },
    ],
  },
];

export default productRoutes;
