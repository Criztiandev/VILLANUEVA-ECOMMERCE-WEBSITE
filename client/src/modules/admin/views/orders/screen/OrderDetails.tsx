/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import LoadingScreen from "@/containers/LoadingScreen";
import { OrderModel, ProductModel } from "@/interface/model";
import fileApi from "@/service/api/file.api";
import productApi from "@/modules/admin/api/product.api";
import orderApi from "@/modules/admin/api/order.api";

const OrderDetails = () => {
  const { id } = useParams();

  const orderQuery = useQuery({
    queryFn: async () => orderApi.fetchById(id || ""),
    queryKey: [`order-${id}`],
    enabled: !!id,
  });

  const productQuery = useQuery({
    queryFn: async () => {
      const _product: Array<string> = orderQuery.data?.payload?.products.map(
        (items: { _id: string }) => items._id
      );

      const query = _product.map((item: string) => {
        return productApi.fetchById(item);
      });
      const result = await Promise.all(query);

      const cover = result?.map(async (item) => {
        const product = item?.payload as ProductModel;

        const modifiedName = (product as any)?.name
          .split(" ")
          .join("_")
          .toLowerCase();
        return await fileApi.fetchImage(
          `products/${modifiedName}/${(product as any)?.images[0]}`
        );
      });

      const coverResult = await Promise.all(cover);

      return {
        cover: coverResult,
        payload: result,
      };
    },

    queryKey: [`products-${id}`],
    enabled: !!orderQuery.data?.payload?.products,
  });

  if (orderQuery?.isLoading) return <LoadingScreen />;

  const orderPayload: OrderModel = orderQuery?.data?.payload;
  const productPayload = productQuery?.data as any;

  console.log(productPayload);

  return (
    <div className="p-[24px]">
      <div>
        <h1 className="text-[24px]  font-semibold mb-8">Order details</h1>
      </div>
      <div className="my-4 flex justify-between items-center">
        <span>
          Order ID: <span className="font-semibold">{orderPayload?.refID}</span>
        </span>

        <span>
          Placed Date:
          <span className="font-semibold">{orderPayload?.createdAt}</span>
        </span>

        <span>
          Status: <span className="font-semibold">Pending</span>
        </span>
      </div>
      <div className="bg-white p-4 rounded-[5px]">
        <h2 className="text-[18px] font-semibold mb-4">Products</h2>

        <div>
          <div className="grid grid-cols-3 place-items-center text-gray-400 mb-4">
            <span className="items-start place-self-start">Product</span>
            <span>Quantity</span>
            <span>Price</span>
          </div>
        </div>
        {orderPayload?.products?.map((items, index) => (
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-3 items-center place-items-center">
              <div className="flex gap-2 items-center place-self-start">
                <div className="w-[64px] h-[64px] rounded-[5px] border">
                  <img src={productPayload?.cover[0]} />
                </div>
                <span>
                  {productPayload &&
                    productPayload?.payload[index].payload?.name}
                </span>
              </div>
              <span>{items.quantity} pcs</span>
              <span>
                ₱{" "}
                {productPayload &&
                  productPayload?.payload[index].payload?.price}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="">
          <h2 className="text-[18px] font-semibold mt-8 mb-2">Order Details</h2>

          <div className="bg-white p-4 rounded-[5px] ">
            <div className=" rounded-[5px] text-start flex flex-col gap-2 border-b  pb-2 mb-4">
              <span className="font-semibold">Address</span>
              {orderPayload?.address}
            </div>

            <div className=" rounded-[5px] ">
              <div className="flex justify-between items-center my-2">
                <span>Payment Method</span>
                <span>Cash on Delivery</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Owner</span>
                <span>{orderPayload?.fullName}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <h2 className="text-[18px] font-semibold mt-10">Total Summary</h2>
          <div className="bg-white p-4 rounded-[5px]">
            <div className="flex justify-between items-center">
              <span>Subtotal</span>
              <span>
                ₱
                {orderPayload?.total -
                  orderPayload?.shippingFee -
                  orderPayload?.tax}
              </span>
            </div>
            <div className="flex justify-between items-center my-2">
              <span>Shipping Fee</span>
              <span>₱{orderPayload?.shippingFee}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Total</span>
              <span>₱{orderPayload?.total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
