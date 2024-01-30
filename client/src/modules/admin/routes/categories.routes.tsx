/* eslint-disable react-refresh/only-export-components */
import withTableFetching from "@/hoc/withTableFetching.hoc";
import MainEntryPoint from "../views/categories";
import ProductTableScreen from "../views/categories/screens/ProductCategories";
import ServiceTableScreen from "../views/categories/screens/ServiceCategories";
import productCategoryApi from "../api/productCategories.api";
import config from "../config/table.config";
import serviceCategoriesApi from "../api/serviceCategories.api";

const base = "category";
const FetchProductTableScreen = withTableFetching(
  ProductTableScreen,
  config.productCategoryTable
);
const FetchServiceTableScreen = withTableFetching(
  ServiceTableScreen,
  config.serviceCategoryTable
);

const categoryRoutes = [
  {
    path: `/${base}`,
    element: <MainEntryPoint />,
    children: [
      {
        path: `/category/products`,
        element: (
          <FetchProductTableScreen fetchFn={productCategoryApi.fetchAll} />
        ),
      },
      {
        path: `/category/service`,
        element: (
          <FetchServiceTableScreen fetchFn={serviceCategoriesApi.fetchAll} />
        ),
      },
    ],
  },
];

export default categoryRoutes;
