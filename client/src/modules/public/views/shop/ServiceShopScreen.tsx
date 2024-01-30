import { useQuery } from "@tanstack/react-query";
import Topbar from "../../layout/Topbar";
import { useState } from "react";
import categoryApi from "../../api/category.api";
import { CategoryModel, ServiceModel } from "@/interface/model";
import serviceApi from "../../api/service.api";
import ServiceItem from "../../components/ServiceItem";

interface Category {
  title: string;
  value: string;
}

const ServiceShopScreen = () => {
  const [filter, setFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const serviceQuery = useQuery({
    queryFn: async () => serviceApi.fetchAll(),
    queryKey: ["services"],
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

  console.log(payload);

  return (
    <>
      <Topbar />

      <div className="px-[32px] mt-[100px] ">
        <div className="my-4 mb-[48px]">
          <h1 className="text-[48px] font-semibold">Services</h1>
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

        <div className="grid grid-cols-4 gap-4 py-12">
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
    </>
  );
};

export default ServiceShopScreen;
