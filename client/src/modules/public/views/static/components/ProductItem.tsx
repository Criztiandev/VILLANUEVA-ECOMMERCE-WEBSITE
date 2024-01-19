import Field from "@/components/Field";
import Form from "@/components/Form";
import { ProductModel } from "@/interface/model";
import { useState } from "react";
import { cartPayloadSchema } from "../validation/cart.validation";
import { useDispatch } from "react-redux";
import { addToCart } from "@/service/store/slice/cart.slice";

interface CartPayload {
  _id: string;
  quantity: number;
}

const ProductItem = (props: ProductModel) => {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const handleIncrease = () => {
    setCount((prev) => (prev >= 99 ? prev : (prev += 1)));
  };

  const handleDecrease = () => {
    setCount((prev) => (prev <= 0 ? prev : prev + -1));
  };

  const handleSubmit = (payload: CartPayload) => {
    payload.quantity = payload.quantity += 1;
    setCount(payload.quantity);
    dispatch(addToCart(payload));
  };

  return (
    <div className="bg-white w-full border border-gray-300 rounded-[5px] p-4 hover:border-none hover:bg-white hover:drop-shadow-xl">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-[18px] font-semibold">{props.name}</h3>
          <span className="text-gray-400">{props.category}</span>
        </div>
        <div className="badge p-4 capitalize">{props.status}</div>
      </div>

      <div className="h-[250px]  w-full my-4"></div>

      <Form<CartPayload> onSubmit={handleSubmit} validation={cartPayloadSchema}>
        <div className="flex justify-between items-end">
          <div className="join">
            <button
              type="button"
              className="join-item btn"
              onClick={handleDecrease}>
              -
            </button>
            <div className="w-[64px]">
              <Field type="text" name="_id" default={props?._id} hidden />
              <Field
                type="number"
                name="quantity"
                default={count || "0"}
                className="join-item  text-center"
              />
            </div>

            <button
              type="button"
              className="join-item btn"
              onClick={handleIncrease}>
              +
            </button>
          </div>
          <h4 className="text-[28px] font-semibold">P{props.price}</h4>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <button className="w-full btn text-base">Add to Cart</button>
          <button type="button" className="w-full btn text-base ">
            Buy now
          </button>
        </div>
      </Form>
    </div>
  );
};

export default ProductItem;
