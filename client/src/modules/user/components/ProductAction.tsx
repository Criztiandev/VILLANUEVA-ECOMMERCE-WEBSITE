import Form from "@/components/Form";
import { CartPayload, addToCart } from "@/service/store/slice/cart.slice";
import { cartPayloadSchema } from "../validation/cart.validation";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Field from "@/components/Field";
import { toast } from "react-toastify";

interface Props {
  _id: string;
  price: number;
}

const ProductAction = (props: Props) => {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const handleIncrease = () => {
    setCount((prev: number) => (prev >= 99 ? prev : (prev += 1)));
  };

  const handleDecrease = () => {
    setCount((prev: number) => (prev <= 0 ? prev : prev + -1));
  };

  const handleSubmit = (payload: CartPayload) => {
    if (payload.quantity === 0)
      return toast.error("Quantity must be greater than 0");

    setCount(0);
    toast.success("Added to cart");
    dispatch(addToCart({ price: props.price, ...payload }));
  };

  return (
    <Form<CartPayload> onSubmit={handleSubmit} validation={cartPayloadSchema}>
      <div className="flex justify-between items-end">
        <div className="flex gap-2">
          <button
            type="button"
            className="btn border-2 border-primary bg-white"
            onClick={handleDecrease}>
            <i className="bx bx-minus text-[18px] text-primary"></i>
          </button>
          <div className="w-[64px]">
            <Field type="text" name="_id" default={props?._id} hidden />
            <Field
              type="number"
              name="quantity"
              default={count || "0"}
              className=" text-center text-[18px] input-ghost"
            />
          </div>

          <button
            type="button"
            className="btn border-2 border-primary bg-white"
            onClick={handleIncrease}>
            <i className="bx bx-plus  text-[18px] text-primary"></i>
          </button>
        </div>
        <h4 className="text-[28px] font-semibold">P{props.price}</h4>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <button className="w-full btn text-base bg-primary text-white">
          Add to Cart
        </button>
        <button type="button" className="w-full btn text-base ">
          Buy now
        </button>
      </div>
    </Form>
  );
};

export default ProductAction;
