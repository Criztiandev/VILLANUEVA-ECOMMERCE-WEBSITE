/* eslint-disable @typescript-eslint/no-explicit-any */
import LoadingScreen from "@/containers/LoadingScreen";
import { ProductModel } from "@/interface/model";
import fileApi from "@/service/api/file.api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ProductAction from "./ProductAction";

interface Props extends ProductModel {
  action?: boolean;
  isDoubleClick?: boolean;
}

const ProductItems = (props: Props) => {
  const navigate = useNavigate();

  const coverImage =
    props.images && props.images.length > 0 ? props.images[0] : null;

  const modifiedName = props.name?.split(" ")?.join("_")?.toLowerCase();

  // Use a more descriptive variable name for the query
  const coverImageQuery = useQuery({
    queryFn: async () =>
      fileApi.fetchImage(`products/${modifiedName}/${coverImage}`),
    queryKey: [`${props._id}-${props.name}`],
    enabled: !!props._id && !!coverImage,
  });

  if (coverImageQuery.isLoading) return <LoadingScreen />;
  const { data: image } = coverImageQuery;
  return (
    <div className="bg-white w-full border border-gray-300 rounded-[5px] p-4 hover:border-none hover:bg-white hover:drop-shadow-xl">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-[18px] font-semibold">{props.name}</h3>
          <span className="text-gray-400">{props.category}</span>
        </div>
        <div className="badge p-4 capitalize bg-red-400 text-white">
          {props.status}
        </div>
      </div>

      <div
        className="h-[250px]  w-full my-4 cursor-pointer"
        onDoubleClick={() =>
          props.isDoubleClick ? navigate(`${props?._id}`) : ""
        }>
        {/* Use optional chaining to safely access coverImageQuery.data */}
        {(image as any) && (
          <img
            src={image as string}
            alt={props.name}
            className="w-full h-full object-cover rounded-[5px]"
          />
        )}
      </div>
      {props.action ? (
        <ProductAction _id={props._id || ""} price={props.price} />
      ) : (
        <div className="flex justify-between items-end">
          <div></div>
          <h4 className="text-[28px] font-semibold">P{props.price}</h4>
        </div>
      )}
    </div>
  );
};

export default ProductItems;
