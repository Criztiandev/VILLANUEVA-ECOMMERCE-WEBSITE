/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "@/containers/LoadingScreen";
import { ProductModel } from "@/interface/model";
import fileApi from "@/service/api/file.api";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useDispatch } from "react-redux";
import { addToCart } from "@/service/store/slice/cart.slice";
import { toast } from "react-toastify";
import productApi from "@/service/api/product.api";
import { AxiosResponse } from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productQuery = useQuery({
    queryFn: async () => productApi.fetchById(id || ""),
    queryKey: [`product-${id}`],
    enabled: !!id,
  });

  const imagesQuery = useQuery({
    queryFn: async () => {
      const productData = productQuery?.data as
        | AxiosResponse<any, any>
        | undefined;

      if (
        !productData ||
        !productData.data ||
        !("payload" in productData.data)
      ) {
        // Handle the case where product data or payload is missing
        return [];
      }

      const { payload } = productData.data;
      const modifiedName = payload.name.split(" ").join("_").toLowerCase();
      const query = `/products/${modifiedName}`;

      if (!payload.images || payload.images.length === 0) {
        return [];
      }

      const imagePromises = payload.images.map((image: any) =>
        fileApi.fetchImage(`${query}/${image}`)
      );

      return Promise.all(imagePromises);
    },
    queryKey: ["product-images"],
    enabled: !!productQuery?.data,
  });

  if (productQuery.isLoading || imagesQuery.isLoading) return <LoadingScreen />;

  if (productQuery.isError) {
    return <LoadingScreen />;
  }
  const { data: images } = imagesQuery as { data: string[] };

  const [cover, ...remainingImages] = images;

  const productData = productQuery?.data as
    | { payload?: ProductModel }
    | undefined;
  const { payload: result } = productData?.payload
    ? productData
    : { payload: undefined };

  const handleCheckOut = () => {
    dispatch(
      addToCart({
        _id: result?._id || "",
        price: result?.price,
        quantity: 1,
      })
    );

    toast.success("Navigating to Checkout");
    navigate("/checkout");
  };

  return (
    <section>
      <div className="px-[48px]">
        <div className="my-4">
          <h1 className="text-[48px] font-bold">{result?.name}</h1>
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
                <p className="text-base">{result?.description}</p>
              </div>

              <div className="border-b-2 py-2 my-4">
                <h3 className="text-[18px] font-medium mb-4">Shipping</h3>
                <p className="text-base">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse varius enim in eros elementum tristique. Duis
                  cursus, mi quis viverra ornare, eros dolor interdum nulla, ut
                  commodo diam libero vitae erat. Aenean faucibus nibh et justo
                  cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus
                  tristique posuere.
                </p>
              </div>

              <div className="border-b-2 py-2">
                <h3 className="text-[18px] font-medium mb-4">Returns</h3>
                <p className="text-base">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse varius enim in eros elementum tristique. Duis
                  cursus, mi quis viverra ornare, eros dolor interdum nulla, ut
                  commodo diam libero vitae erat. Aenean faucibus nibh et justo
                  cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus
                  tristique posuere.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-[32px] font-semibold mb-4">
              P {result?.price || 500}
            </h2>
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
            <div></div>
          </div>
        </div>
      </div>

      <Modal id="checkout-modal">
        <h1 className="text-[24px] font-semibold">Checkout</h1>
        <p className="text-base my-4">
          Are you absolutely certain you wish to finalize your purchase and
          proceed to checkout with the selected quantity of (1)
          <span className="bg-primary text-white px-2 mx-2">
            {result?.name}
          </span>
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
