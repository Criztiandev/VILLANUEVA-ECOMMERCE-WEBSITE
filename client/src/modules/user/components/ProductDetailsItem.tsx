import fileApi from "@/service/api/file.api";
import { useQuery } from "@tanstack/react-query";

interface Props {
  cover: string;
  name: string;
  quantity: number;
  price: string;
}

const ProductDetailsItem = (props: Props) => {
  const modifiedName = props.name?.split(" ").join("_").toLowerCase();
  const imageQuery = useQuery({
    queryFn: async () =>
      await fileApi.fetchImage(`products/${modifiedName}/${props.cover}`),
    queryKey: [`cover-${name}`],
  });

  return (
    <div className="flex flex-col gap-2 border-y border-gray-300 py-2">
      <div className="grid grid-cols-3 items-center place-items-center">
        <div className="flex gap-2 items-center place-self-start">
          <div className="w-[64px] h-[64px] rounded-[5px] border">
            <img
              src={imageQuery?.data as string}
              className="object-cover w-full h-full"
            />
          </div>
          <span>{props.name}</span>
        </div>
        <span>{props.quantity} pcs</span>
        <span>₱ {props.price}</span>
      </div>
    </div>
  );
};

export default ProductDetailsItem;
