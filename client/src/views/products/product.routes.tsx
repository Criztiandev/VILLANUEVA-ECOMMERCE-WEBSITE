/* eslint-disable react-refresh/only-export-components */
import { Route } from "@/interface/server";
import tableConfig from "@/config/table.config";
import withLazyLoading from "@/hoc/withLazyLoading.hoc";

const ProductLazyScreen = withLazyLoading(() => import("."));
const ProductTableLazy = withLazyLoading(() => import("./screen/ProductTable"));
const ProductDetailsScreenLazy = withLazyLoading(
  () => import("./screen/ProductDetailsScreen")
);
const ProductEditScreenLazy = withLazyLoading(
  () => import("./screen/ProductEditScreen")
);

const ProductCreateFormLazy = withLazyLoading(
  () => import("./screen/ProductCreateScreen")
);

const { base } = tableConfig.productTable;

export const productRoutes: Route = {
  path: `/${base}`,
  element: <ProductLazyScreen />,
  children: [
    { path: `/${base}`, element: <ProductTableLazy /> },
    { path: `/${base}/:id`, element: <ProductDetailsScreenLazy base={base} /> },
    {
      path: `/${base}/edit/:id`,
      element: <ProductEditScreenLazy base={base} />,
    },
    { path: `/${base}/create`, element: <ProductCreateFormLazy base={base} /> },
  ],
};
