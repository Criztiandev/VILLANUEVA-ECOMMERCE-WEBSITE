/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import Header from "../layout/Header";
import categoriesApi from "@/modules/admin/views/categories/categories.api";
import { CategoryModel, ProductModel } from "@/interface/model";
import LoadingScreen from "@/containers/LoadingScreen";
import productApi from "@/modules/admin/views/products/product.api";
import ProductItem from "../components/ProductItem";
import { useState } from "react";
import AddToCart from "../containers/AddToCart";

const Shop = () => {
  const [filter, setFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const categoryQuery = useQuery({
    queryFn: async () => await categoriesApi.fetchAll(),
    queryKey: ["categories"],
  });

  const productQuery = useQuery({
    queryFn: async () => await productApi.fetchAll(),
    queryKey: ["products"],
  });

  if (categoryQuery?.isLoading || productQuery?.isLoading)
    return <LoadingScreen />;

  const { payload: productRes } = productQuery.data as {
    payload: ProductModel[];
  };

  const displayProducts = () => {
    if (!productQuery?.data) return;

    return productRes.filter((field: ProductModel) => {
      if (categoryFilter) {
        return field.category
          .toLocaleLowerCase()
          .includes(categoryFilter.toLowerCase());
      }

      if (statusFilter) {
        return field.status
          .toLocaleLowerCase()
          .includes(statusFilter.toLowerCase());
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
    <>
      <div className="h-screen">
        <Header isStatic={true} />

        <div className=" px-[32px]">
          <div className="w-full">
            <h1 className="text-[48px] my-4 font-semibold text-center">Shop</h1>

            <div className="my-8 flex justify-center items-center  p-4 rounded-[5px] ">
              <div className="pr-4 flex gap-4">
                <input
                  type="text"
                  placeholder="Search Here"
                  className="input input-bordered w-[250px]"
                  value={filter}
                  onChange={(e) => setFilter(e.currentTarget.value)}
                />
                <select
                  className="select select-bordered bg-primary text-white "
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.currentTarget.value)}>
                  <option value={""}>Status</option>
                  <option value={"new"}>New</option>
                  <option value={"host"}>Hot</option>
                </select>

                <select
                  className="select select-bordered "
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
            </div>
            <div className="grid grid-cols-4 gap-4 pr-4 p-4">
              {displayProducts()?.map((items: ProductModel) => (
                <ProductItem key={items._id} {...items} isDoubleClick action />
              ))}
            </div>
          </div>
        </div>
      </div>

      <AddToCart />
    </>
  );
};

export default Shop;
