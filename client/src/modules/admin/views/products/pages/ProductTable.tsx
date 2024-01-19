/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import Button from "@/components/Button";
import Container from "@/components/Container";
import GridStack from "@/components/GridStack";
import ProductItems from "../components/ProductItems";
import { useQuery } from "@tanstack/react-query";
import productApi from "../product.api";
import { CategoryModel, ProductModel } from "@/interface/model";
import LoadingScreen from "@/containers/LoadingScreen";
import { useState } from "react";
import categoriesApi from "../../categories/categories.api";
import { Link } from "react-router-dom";
import Table from "@/components/Table";
import tableConfig from "@/modules/admin/config/table.config";

const ProductTable = () => {
  const [isTable, setIsTable] = useState(false);
  const [filter, setFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const { name, columns } = tableConfig.productTable;

  const productQuery = useQuery({
    queryFn: async () => productApi.fetchAll(),
    queryKey: ["products"],
  });

  const categoryQuery = useQuery({
    queryFn: async () => categoriesApi.fetchAll(),
    queryKey: ["category"],
  });

  if (productQuery?.isLoading || categoryQuery?.isLoading)
    return <LoadingScreen />;

  const searchProducs = () => {
    if (!productQuery?.data) return;

    return productQuery?.data?.payload.filter((field: ProductModel) => {
      if (categoryFilter) {
        return field.category
          .toLocaleLowerCase()
          .includes(categoryFilter.toLowerCase());
      }

      return field.name
        .toLocaleLowerCase()
        .includes(filter.toLocaleLowerCase());
    });
  };

  const TransformedCategory = () =>
    categoryQuery?.data?.payload?.map((category: CategoryModel) => ({
      title: category.name,
      value: category?.name,
    }));

  return (
    <Container className="mt-4">
      {!isTable && (
        <div className="flex justify-between items-center mb-4">
          <div className="w-[450px] flex gap-4">
            <input
              className="input input-bordered"
              placeholder="Search here"
              value={filter}
              onChange={(e) => setFilter(e.currentTarget.value)}
            />

            <select
              className="select select-bordered w-full"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.currentTarget.value)}>
              <option value={""}>All Products</option>
              {TransformedCategory()?.map((category: any) => (
                <option key={category.value} value={category.value}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-4">
            <Link to={"/products/create"}>
              <Button title="Create" />
            </Link>
            <Button
              className="btn-circle"
              icon="T"
              title="T"
              onClick={() => setIsTable((prev) => !prev)}
            />
          </div>
        </div>
      )}
      {isTable ? (
        <Container>
          <Table.Panel title="Products" name={name} />
          <Table<ProductModel> id={name} columns={columns} />
        </Container>
      ) : (
        <>
          <GridStack columns={4} gap={16}>
            {searchProducs().map((fields: ProductModel) => (
              <ProductItems key={fields?._id} {...fields} />
            ))}
          </GridStack>

          <div className="my-8 flex justify-center items-center">
            <div className="join">
              <button className="join-item btn">«</button>
              <button className="join-item btn">Page 22</button>
              <button className="join-item btn">»</button>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default ProductTable;
