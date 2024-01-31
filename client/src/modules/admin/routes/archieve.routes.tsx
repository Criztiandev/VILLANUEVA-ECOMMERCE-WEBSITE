/* eslint-disable react-refresh/only-export-components */
import withTableFetching from "@/hoc/withTableFetching.hoc";
import MainEntryPoint from "../views/products";
import tableConfig from "../config/table.config";
import archiveApi from "../api/archive.api";
import ProductArchiveTable from "../views/archive/pages/ProductArchiveTable";
import ProductDetails from "../views/archive/container/ProductDetails";
import ServiceArchiveTable from "../views/archive/pages/ServiceArchiveTable";
import ServiceScheduleDetails from "../components/ServiceScheduleDetails";

const FetchProductArchiveTable = withTableFetching(
  ProductArchiveTable,
  tableConfig.ProductArchiveTable
);

const FetchServiceArchiveTable = withTableFetching(
  ServiceArchiveTable,
  tableConfig.ServiceArchiveTable
);

const archiveRoutes = [
  {
    path: "/archive",
    element: <MainEntryPoint />,
    children: [
      {
        path: "/archive/products",
        element: (
          <FetchProductArchiveTable
            fetchFn={() => archiveApi.fetchAllProducts({})}
          />
        ),
      },
      {
        path: "/archive/service",
        element: (
          <FetchServiceArchiveTable
            fetchFn={() => archiveApi.fetchAllService({})}
          />
        ),
      },
      { path: "/archive/products/:id", element: <ProductDetails /> },
      { path: "/archive/service/:id", element: <ServiceScheduleDetails /> },
    ],
  },
];

export default archiveRoutes;
