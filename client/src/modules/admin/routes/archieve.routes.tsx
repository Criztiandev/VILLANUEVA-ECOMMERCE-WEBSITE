/* eslint-disable react-refresh/only-export-components */
import withTableFetching from "@/hoc/withTableFetching.hoc";
import MainEntryPoint from "../views/products";
import tableConfig from "../config/table.config";
import archiveApi from "../api/archive.api";
import ArchiveProductOrderTable from "../views/archive/pages/ArchiveTable";
import ProductDetails from "../views/archive/container/ProductDetails";
const FetchProductArchiveTable = withTableFetching(
  ArchiveProductOrderTable,
  tableConfig.ArchiveProductTable
);

const archiveRoutes = [
  {
    path: "/archive",
    element: <MainEntryPoint />,
    children: [
      {
        path: "/archive/products",
        element: (
          <FetchProductArchiveTable fetchFn={archiveApi.fetchAllProducts} />
        ),
      },
      { path: "/archive/products/:id", element: <ProductDetails /> },
    ],
  },
];

export default archiveRoutes;
