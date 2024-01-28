import Form from "@/components/Form";
import { addToCart } from "@/service/store/slice/cart.slice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Field from "@/components/Field";
import { toast } from "react-toastify";
import { productValidation } from "../validation/product.validation";

interface Props {
  _id: string;
  price: number;
}

interface FormPayload {
  quantity: number;
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

  const handleSubmit = ({ quantity }: FormPayload) => {
    setCount(quantity);
    dispatch(
      addToCart({
        _id: props._id || "",
        quantity,
        price: props.price,
      })
    );
    toast.success("Product Added Successfully");
    setCount(0);
  };

  return (
    <Form<FormPayload> onSubmit={handleSubmit} validation={productValidation}>
      <div className="flex justify-between items-end">
        <div className="join">
          <button
            type="button"
            className="join-item btn"
            onClick={handleDecrease}>
            -
          </button>
          <div className="w-[64px]">
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
