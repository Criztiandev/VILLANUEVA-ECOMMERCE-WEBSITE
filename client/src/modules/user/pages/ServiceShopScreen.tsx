import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CategoryModel, ServiceModel } from "@/interface/model";
import categoryApi from "../api/category.api";
import ServiceItem from "@/modules/public/components/ServiceItem";
import serviceApi from "../api/service.api";

interface Category {
  title: string;
  value: string;
}

const ServiceShopScreen = () => {
  const [filter, setFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const serviceQuery = useQuery({
    queryFn: async () => serviceApi.fetchAll(),
    queryKey: ["products"],
  });

  const categoryQuery = useQuery({
    queryFn: async () => categoryApi.fetchAll(),
    queryKey: ["categories"],
    enabled: !!serviceQuery?.data,
  });

  if (serviceQuery?.isLoading) return <div>Loading</div>;
  const { payload } = serviceQuery?.data as { payload: ServiceModel[] };

  const displayProducts = () => {
    if (!serviceQuery?.data) return;

    return payload?.filter((field: ServiceModel) => {
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
    <div className="p-[24px]">
      <div className="my-4 mb-[48px]">
        <h1 className="text-[48px] font-semibold">Service</h1>
        <span>This is the product details</span>
      </div>

      <div>
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <input
              className="input input-bordered w-[350px]"
              placeholder="Keyword"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="select select-bordered w-[200px]"
              disabled={categoryQuery.isLoading}>
              <option value="">Filter</option>
              {TransformedCategory()?.map((category: Category) => (
                <option key={category.value} value={category.value}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          <select className="select seelct-ghost">
            <option value="">Sort</option>
            <option value="">Price</option>
            <option value="">Name</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 py-12">
        {displayProducts()?.map((items: ServiceModel) => (
          <ServiceItem
            key={items._id}
            {...items}
            path={`${items._id}`}
            isDoubleClick
            action
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceShopScreen;
