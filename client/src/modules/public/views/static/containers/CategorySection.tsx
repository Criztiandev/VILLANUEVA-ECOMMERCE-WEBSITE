/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductModel } from "@/interface/model";
import productApi from "@/modules/admin/views/products/product.api";
import { useQuery } from "@tanstack/react-query";
import ProductItems from "../components/ProductItem";

const CategorySection = () => {
  const productQuery = useQuery({
    queryFn: async () => productApi.fetchAll(),
    queryKey: ["category"],
  });

  if (productQuery.isLoading) return <div>Loading...</div>;

  const { payload } = productQuery?.data as any;

  return (
    <section className="mb-[100px] px-[120px]">
      <div className=" flex justify-between items-center">
        <div>
          <span className="px-4 py-2 bg-[#ffe0b0] my-2">Products</span>
          <h1 className="font-serif text-[#244d4d] text-[48px] font-bold my-8 capitalize">
            Best Quality Products
          </h1>
        </div>

        <span className="text-[#244d4d] font-semibold">All Prodcuts</span>
      </div>

      <div className="grid grid-cols-4 gap-4 items-center place-items-center ">
        {payload?.map((props: ProductModel) => (
          <ProductItems key={props._id} {...props} action={false} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
