import withTableFetching from "@/hoc/withTableFetching.hoc";
import MainEntryPoint from ".";
import ProductCreate from "./pages/ProductCreate";
import ProductDetails from "./pages/ProductDetails";
import ProductEdit from "./pages/ProductEdit";
import ProductTable from "./pages/ProductTable";
import productApi from "./product.api";
import tableConfig from "../../config/table.config";

const FetchProductTable = withTableFetching(
  ProductTable,
  tableConfig.productTable
);

const productRoutes = [
  {
    path: "/products",
    element: <MainEntryPoint />,
    children: [
      {
        path: "/products",
        element: <FetchProductTable fetchFn={productApi.fetchAll} />,
      },
      { path: "/products/create", element: <ProductCreate /> },
      { path: "/products/:id", element: <ProductDetails /> },
      { path: "/products/edit/:id", element: <ProductEdit /> },
    ],
  },
];

export default productRoutes;
