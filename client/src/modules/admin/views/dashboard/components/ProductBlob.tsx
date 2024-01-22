import { ProductModel } from "@/interface/model";
import fileApi from "@/service/api/file.api";
import { useQuery } from "@tanstack/react-query";

const ProductBlob = (props: ProductModel) => {
  const coverImage =
    props.images && props.images.length > 0 ? props.images[0] : "";

  const productImage = useQuery({
    queryFn: async () =>
      fileApi.fetchImage(
        `/products/${props.name
          .split(" ")
          .join("_")
          .toLowerCase()}/${coverImage}`
      ),
    queryKey: ["product-image"],
  });

  if (productImage.isLoading) return <div>loading</div>;

  return (
    <div className="p-4 border rounded-[5px] flex gap-4 bg-primary text-white">
      <div className="w-[48px] h-[48px] rounded-[5px] border">
        <img
          src={productImage?.data as string}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </div>
      <div>
        <h3 className="text-[18px]">{props.name}</h3>
        <span className="text-[16px] font-semibold">{props.price}</span>
      </div>
    </div>
  );
};

export default ProductBlob;
