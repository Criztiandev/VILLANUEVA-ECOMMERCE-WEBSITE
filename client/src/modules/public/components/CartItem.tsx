/* eslint-disable react-hooks/rules-of-hooks */
import Button from "@/components/Button";
import LoadingScreen from "@/containers/LoadingScreen";
import productApi from "@/modules/admin/api/product.api";
import fileApi from "@/service/api/file.api";
import {
  decreaseQuantity,
  increaseQuantity,
  removeToCart,
} from "@/service/store/slice/cart.slice";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import TrashIcon from "@/assets/icons/delete_light_icon.svg";
import { motion } from "framer-motion";
import { ProductModel } from "@/interface/model";
import { useEffect } from "react";
import { RootReducer } from "@/service/store";
interface Props {
  _id: string;
  quantity: number;
}

const CartItem = (props: Props) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state: RootReducer) => state.cart);

  const productQuery = useQuery({
    queryFn: async () => productApi.fetchById(props._id),
    queryKey: [`${props._id}-product`],
    enabled: !!props._id,
  });

  const payload: ProductModel = productQuery?.data?.payload;

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
    queryKey: [`${props._id}-${payload?.name}`],
    enabled: !!payload,
  });

  useEffect(() => {
    if (!products) return;

    const existance = products.find((product) => product._id === props._id);

    if (existance?.quantity === 0) {
      dispatch(removeToCart(existance?._id as string)); // Assuming _id is a string
    }
  }, [dispatch, products, props._id]);

  if (productQuery.isLoading) return <LoadingScreen />;

  const handleIncrease = () => {
    dispatch(increaseQuantity(props._id));
  };
  const handleDecrease = () => {
    dispatch(decreaseQuantity(props._id));
  };

  const totalPrice = payload?.price * props.quantity;

  return (
    <div className=" bg-white w-full p-4 border flex gap-8">
      <div className="flex gap-2 flex-col">
        <ActionButton icon="bx bx-plus" onClick={handleIncrease} />
        <div className="w-[28px] h-[28px] rounded-[5px] flex justify-center items-center">
          {props.quantity}
        </div>
        <ActionButton icon="bx bx-minus" onClick={handleDecrease} />
      </div>
      <div className="flex gap-4 w-full   justify-between items-start">
        <div className="flex gap-4">
          <div className="w-[100px] h-[100px] rounded-box border">
            <img
              src={(coverImageQuery?.data as string) || ""}
              alt="cover"
              loading="lazy"
              className="rounded-[5px] object-cover w-full h-full"
            />
          </div>
          <div className="flex gap-2 flex-col">
            <span className="font-semibold text-[22px]">
              {payload?.name || ""}
            </span>

            <span className="text-[14px] text-gray-400 px-2">
              {payload?.price || 0} x {props.quantity}
            </span>

            <span className="text-[16] badge bg-primary text-white py-3 px-4">
              P {totalPrice}
            </span>
          </div>
        </div>

        <Button
          icon={TrashIcon}
          dir="left"
          as="ghost"
          onClick={() => dispatch(removeToCart(props._id))}
        />
      </div>
    </div>
  );
};

export default CartItem;

const ActionButton = ({
  icon,
  ...props
}: {
  icon: string;
  onClick: () => void;
}) => {
  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      {...props}
      className="hover:bg-primary hover:text-white w-[28px] h-[28px] rounded-[5px] flex justify-center items-center border border-primary">
      <i className={icon}></i>
    </motion.button>
  );
};
