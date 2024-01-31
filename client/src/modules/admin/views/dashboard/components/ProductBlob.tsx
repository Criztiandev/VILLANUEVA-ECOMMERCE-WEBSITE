import { ProductModel } from "@/interface/model";
import fileApi from "@/service/api/file.api";
import { useQuery } from "@tanstack/react-query";

const ProductBlob = (props: ProductModel) => {
  const modfiedName = props?.name?.split(" ").join("_").toLowerCase();
  const coverImage =
    props.images && props.images.length > 0 ? props.images[0] : "";

  const productImage = useQuery({
    queryFn: async () =>
      fileApi.fetchImage(`/products/${modfiedName}/${coverImage}`),
    queryKey: [`${modfiedName}-product-image`],
  });

  if (productImage.isLoading) return <div>loading</div>;

  return (
    <div className=" border flex gap-4 justify-between items-center p-2 rounded-[5px] hover:bg-primary hover:text-white hover:cursor-pointer">
      <div className="flex gap-4 items-center">
        <div className="w-[64px] h-[64px] rounded-[5px] border">
          <img
            src={productImage?.data as string}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>
        <div>
          <h3 className="text-[18px] font-semibold">{props.name}</h3>
          <span className="text-[16px] font-light text-gray-400">
            {props.price}
          </span>
        </div>
      </div>
      <div className="text-[24px] font-semibold px-4">{props.stock}</div>
    </div>
  );
};

export default ProductBlob;
