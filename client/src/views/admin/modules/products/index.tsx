import tableConfig from "@/config/table.config";
import Layout from "@/views/layout/index";

import { Outlet } from "react-router-dom";
import productApi from "@/service/api/product.api";

const ProductScreen = () => {
  const { name, invalidateKey } = tableConfig.productTable;

  return (
    <Layout.Dynamic
      queryKey={invalidateKey}
      name={name}
      fetchFn={productApi.fetchAll}>
      <Outlet />
    </Layout.Dynamic>
  );
};

export default ProductScreen;
