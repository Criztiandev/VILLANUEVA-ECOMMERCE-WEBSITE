import withTableFetching from "@/hoc/withTableFetching.hoc";
import MainEntryPoint from "../views/products";
import ProductCreate from "../views/products/pages/ProductCreate";
import ProductDetails from "../views/products/pages/ProductDetails";
import ProductEdit from "../views/products/pages/ProductEdit";
import ProductTable from "../views/products/pages/ProductTable";
import productApi from "../api/product.api";
import tableConfig from "../config/table.config";

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
