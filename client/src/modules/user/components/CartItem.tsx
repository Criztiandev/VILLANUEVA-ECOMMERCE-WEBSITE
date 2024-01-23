/* eslint-disable react-hooks/rules-of-hooks */
import Button from "@/components/Button";
import LoadingScreen from "@/containers/LoadingScreen";
import productApi from "@/modules/admin/views/products/product.api";
import fileApi from "@/service/api/file.api";
import { removeToCart } from "@/service/store/slice/cart.slice";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import TrashIcon from "@/assets/icons/delete_light_icon.svg";
import { motion } from "framer-motion";
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

  // Use a more descriptive variable name for the query
  const coverImageQuery = useQuery({
    queryFn: async () => {
      const payload = productQuery?.data?.payload;
      const coverImage =
        payload?.images && payload?.images.length > 0
          ? payload?.images[0]
          : payload?.images;

      const modifiedName = payload?.name.split(" ").join("_").toLowerCase();

      return fileApi.fetchImage(`products/${modifiedName}/${coverImage}`);
    },
    queryKey: [`${props._id}-${productQuery?.data?.payload?.name}`],
    enabled: !!productQuery?.data?.payload,
  });

  if (productQuery.isLoading) return <LoadingScreen />;

  return (
    <div className=" bg-white w-full p-4 border flex gap-4 justify-between items-center bf-white">
      <div className="flex gap-4">
        <div className="w-[120px] h-[120px] rounded-box border">
          <img
            src={(coverImageQuery?.data as string) || ""}
            alt="cover"
            loading="lazy"
            className="rounded-[5px]"
          />
        </div>
        <div className="flex gap-2 flex-col">
          <span className="font-semibold text-[22px]">
            {productQuery?.data?.payload?.name || ""}
          </span>
          <div className="flex flex-col  gap-4">
            <span className="badge p-4 bg-primary text-white">
              {productQuery?.data?.payload?.price || 0} x {props.quantity}
            </span>

            <div className="flex gap-2">
              <motion.button
                whileTap={{ scale: 0.8 }}
                className="hover:bg-primary hover:text-white w-[32px] h-[32px] rounded-[5px] flex justify-center items-center border border-primary">
                <i className="bx bx-plus"></i>
              </motion.button>
              <div className="w-[32px] h-[32px] rounded-[5px] flex justify-center items-center">
                {props.quantity}
              </div>
              <motion.button
                whileTap={{ scale: 0.8 }}
                className="hover:bg-primary hover:text-white w-[32px] h-[32px] rounded-[5px] flex justify-center items-center border border-primary">
                <i className="bx bx-minus text-[18px]"></i>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Button
          dir="left"
          icon={TrashIcon}
          className="invert-0"
          onClick={() => dispatch(removeToCart(props?._id))}
        />
      </div>
    </div>
  );
};

export default CartItem;
