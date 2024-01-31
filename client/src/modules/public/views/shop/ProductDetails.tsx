import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "@/containers/LoadingScreen";
import { ProductModel } from "@/interface/model";
import fileApi from "@/service/api/file.api";
import Button from "@/components/Button";
import productApi from "../../api/product.api";
import Topbar from "../../layout/Topbar";
import Form from "@/components/Form";
import Field from "@/components/Field";
import { productValidation } from "../../validation/product.validation";
import Modal from "@/components/Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/service/store/slice/cart.slice";
import { toast } from "react-toastify";
interface Product {
  quantity: number;
}

const ProductDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productQuery = useQuery({
    queryFn: async () => productApi.fetchById(id || ""),
    queryKey: [`product-${id}`],
    enabled: !!id,
  });

  const imagesQuery = useQuery({
    queryFn: async () => {
      const { payload } = productQuery?.data as { payload: ProductModel };
      const modfiedName = payload?.name.split(" ").join("_").toLowerCase();
      const query = `/products/${modfiedName}`;
      if (!payload.images || payload.images.length === 0) {
        return [];
      }

      const imagePromises = payload.images.map((image) =>
        fileApi.fetchImage(`${query}/${image}`)
      );

      return Promise.all(imagePromises);
    },
    queryKey: ["product-images"],
    enabled: !!productQuery.data,
  });

  if (productQuery.isLoading || imagesQuery.isLoading) return <LoadingScreen />;

  if (productQuery.isError) {
    return <LoadingScreen />;
  }
  const { data: images } = imagesQuery as { data: string[] };

  const [cover, ...remainingImages] = images;

  const { payload: result } = productQuery.data as { payload: ProductModel };

  const handleIncrease = () => {
    setQuantity((prev) => (prev > 255 ? prev : prev + 1));
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev <= 0 ? prev : prev - 1));
  };

  const handleSubmit = ({ quantity }: Product) => {
    const { _id, price } = result;
    dispatch(
      addToCart({
        _id: _id || "",
        price,
        quantity,
      })
    );

    toast.success("Add to cart successfully");
    setQuantity(0);
  };

  const handleCheckOut = () => {
    const { _id, price } = result;
    dispatch(
      addToCart({
        _id: _id || "",
        price,
        quantity: 1,
      })
    );

    toast.success("Navigating to Checkout");
    setQuantity(0);
    navigate("/checkout");
  };

  return (
    <section>
      <Topbar isStatic />

      <div className="px-[48px]">
        <div className="my-4">
          <h1 className="text-[48px] font-bold">{result.name}</h1>
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <Link to={"/"}>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to={"/products"}>
                  <span>Product</span>
                </Link>
              </li>
              <li>{result?.name}</li>
            </ul>
          </div>
        </div>
        {/* Cover */}
        <div className="grid grid-cols-2 gap-4 max-h-[600px]">
          <img src={cover} className="w-full h-[600px] object-cover " />
          <div className="grid grid-cols-2 gap-4">
            {remainingImages?.map((image, index) => {
              return (
                <div className="" key={index}>
                  <img
                    src={image}
                    alt={`image-${index}`}
                    className="object-cover w-full h-[290px]"
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-[auto_600px] gap-[48px] mt-[64px]">
          <div>
            <h2 className="text-[32px] font-bold mb-4">Details</h2>
            <p>{result?.summary}</p>

            <div className="mt-8 flex flex-col ap-4">
              <div className="border-t-2 border-b-2 py-2 ">
                <h3 className="text-[18px] font-medium mb-4">Details</h3>
                <p className="text-base">{result.description}</p>
              </div>

              <div className="border-b-2 py-2 my-4">
                <h3 className="text-[18px] font-medium mb-4">Shipping</h3>
                <p className="text-base">
                  Our shipping policy ensures timely and secure delivery of your
                  orders, providing transparent information on shipping rates,
                  estimated delivery times, and any applicable terms and
                  conditions to guarantee a seamless and reliable shopping
                  experience.
                </p>
              </div>

              <div className="border-b-2 py-2">
                <h3 className="text-[18px] font-medium mb-4">Returns</h3>
                <p className="text-base">
                  Our return policy is designed to offer you peace of mind,
                  allowing hassle-free returns within a specified period,
                  accompanied by clear guidelines on eligibility criteria and
                  procedures to ensure your satisfaction with our products.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-[32px] font-semibold mb-4">P {result.price}</h2>
            <div className="flex gap-4 my-3">
              <div className="rating">
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  checked
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                />
              </div>
              <span className="text-[18px]">(3.5 Stars) | 10 reviews</span>
            </div>

            <Form<Product>
              onSubmit={handleSubmit}
              validation={productValidation}
              className="my-4">
              <div className="grid grid-cols-[auto_170px] gap-4">
                <Field
                  default={quantity}
                  type="number"
                  title="Quality"
                  name="quantity"
                  placeholder="Enter Quality"
                />
                <div className="flex gap-2  items-end">
                  <button
                    type="button"
                    className="btn bg-gray-300"
                    onClick={handleIncrease}>
                    <i className="bx bx-plus text-[24px]"></i>
                  </button>
                  <button
                    type="button"
                    className="btn bg-gray-300"
                    onClick={handleDecrease}>
                    <i className="bx bx-minus text-[24px]"></i>
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-4 my-4">
                <Button title="Add to Cart" className="w-full" />
                <Modal.Button
                  target="checkout-modal"
                  title="Buy now"
                  className="btn w-full bg-gray-300"
                />
              </div>
            </Form>
          </div>
        </div>
      </div>

      <Modal id="checkout-modal">
        <h1 className="text-[24px] font-semibold">Checkout</h1>
        <p className="text-base my-4">
          Are you absolutely certain you wish to finalize your purchase and
          proceed to checkout with the selected quantity of (1)
          <span className="bg-primary text-white px-2 mx-2">{result.name}</span>
          This action will complete your transaction, and the items will be
          prepared for shipment or digital delivery as applicable.
        </p>

        <div className="w-full flex flex-col gap-2">
          <Button title="Checkout" onClick={handleCheckOut} />
          <Modal.Button
            target="checkout-modal"
            title="Cancel"
            className="btn btn-gray-300"
          />
        </div>
      </Modal>
    </section>
  );
};

export default ProductDetails;
