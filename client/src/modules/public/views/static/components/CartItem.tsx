import { ProductModel } from "@/interface/model";
import productApi from "@/modules/admin/views/products/product.api";
import { removeToCart } from "@/service/store/slice/cart.slice";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

interface Props {
  _id: string;
  quantity: number;
}

const CartItem = (props: Props) => {
  const dispatch = useDispatch();

  const productQuery = useQuery({
    queryFn: async () => productApi.fetchById(props._id),
    queryKey: [`${props._id}-product`],
    enabled: !!props._id,
  });

  const { payload } = (productQuery?.data as { payload: ProductModel }) || [];

  return (
    <div className="w-full p-4 border flex gap-4 justify-between">
      <div className="flex gap-4">
        <div className="w-[64px] h-[64px] rounded-box border"></div>
        <div className="flex gap-2 flex-col">
          <span className="font-semibold text-[18px]">
            {payload?.name || ""}
          </span>
          <span className="badge px-4 bg-blue-300">
            {payload?.price || 0} x {props.quantity}
          </span>
        </div>
      </div>

      <div>
        <button
          className="btn"
          onClick={() => dispatch(removeToCart(props?._id))}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
