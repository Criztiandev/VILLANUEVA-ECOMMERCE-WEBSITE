/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "@/containers/LoadingScreen";
import orderApi from "../api/order.api";
import { OrderModel } from "@/interface/model";
import ProductDetailsItem from "../components/ProductDetailsItem";
import Button from "@/components/Button";
import queryUtils from "@/utils/query.utils";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const orderQuery = useQuery({
    queryFn: async () => orderApi.fetchById(id || ""),
    queryKey: [`order-${id}`],
    enabled: !!id,
  });

  const statusMutation = queryUtils?.mutation({
    mutationFn: async (payload) => orderApi.updateById(id || "", payload),
    invalidateKey: ["orders"],
    toast: "Cancel Order Successfully",
    onSuccess: () => {
      navigate("/order");
    },
  });

  if (orderQuery?.isLoading) return <LoadingScreen />;

  const payload: OrderModel = orderQuery?.data?.payload;
  const formattedDate = new Date(
    payload?.createdAt as string
  ).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  });

  const handleCancel = () => {
    statusMutation.mutate({ status: "cancel" });
  };
  const handleComplete = () => {
    statusMutation.mutate({ status: "completed" });
  };

  return (
    <div className="p-[24px]">
      <h1 className="text-[24px]  font-semibold ">Order details</h1>
      <div className="flex justify-between items-center my-4">
        <span>
          Order ID:
          <span className="font-semibold">{payload?.refID}</span>
        </span>

        <span>
          Status:{" "}
          {payload?.status && (
            <span
              className={`badge p-4 capitalize font-semibold ${
                payload?.status === "pending"
                  ? "bg-[rgba(82,145,255,0.5)] border-2 border-[rgba(82,146,255,0.97)]"
                  : payload?.status === "cancel"
                  ? "bg-[rgba(255,82,82,0.5)]  border-2 border-[rgba(255,82,82,0.97)]"
                  : payload?.status === "delivered"
                  ? "bg-[rgba(80,194,97,0.5)] border-2 border-[rgba(44,140,75,0.97)]"
                  : payload?.status === "transit"
                  ? "bg-[rgba(255,193,7,0.5)] border-2 border-[rgba(255,193,7,0.97)]"
                  : payload?.status === "completed"
                  ? "bg-[rgba(80,194,97,0.5)] border-2 border-[rgba(44,140,75,0.97)]"
                  : "bg-primary text-white"
              }`}>
              {payload?.status}
            </span>
          )}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-[5px]">
          <h3 className="text-[18px] font-semibold my-2">Order Details</h3>

          <div>
            <div className="grid grid-cols-3 place-items-center text-gray-400 mb-4">
              <span className="items-start place-self-start">Product</span>
              <span>Quantity</span>
              <span>Price</span>
            </div>

            <div className="h-[370px] mb-4 overflow-y-scroll">
              {payload?.products.map((items: any) => (
                <ProductDetailsItem cover={items?.images[0]} {...items} />
              ))}
            </div>

            <div className="flex justify-end">
              <Button title="Next" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-[5px] border">
          <div>
            <h3 className="text-[18px] font-semibold">Customer Details</h3>
            <div className="my-4 flex flex-col gap-2 border border-gray-400 rounded-[5px] p-4 bg-gray-100">
              <span>
                <span className="font-medium">Name:</span> {payload?.fullName}
              </span>
              <span>
                <span className="font-medium">Age:</span>{" "}
                {(payload?.UID as any)?.age}
              </span>
              <span>
                <span className="font-medium">Email:</span>{" "}
                criztiandev@gmail.com
              </span>
              <span>
                <span className="font-medium">Contact:</span> {payload?.contact}
              </span>
              {typeof payload?.address === "object" ? (
                <>
                  {(payload?.address as any)?.barangay},{" "}
                  {(payload?.address as any)?.municipality},{" "}
                  {(payload?.address as any)?.province},{" "}
                  {(payload?.address as any)?.region}
                </>
              ) : (
                // Handle the case when address is not an object (e.g., display an error message or fallback)
                "Invalid Address Format"
              )}
            </div>
          </div>

          <div>
            <h3 className="text-[18px] font-semibold">Order Details</h3>
            <div className="my-4 flex flex-col gap-2 border border-gray-400 rounded-[5px] p-4">
              <span>
                <span className="font-medium">Placed Date:</span>{" "}
                {formattedDate}
              </span>

              <span>
                <span className="font-medium">Tax:</span> {payload?.tax}
              </span>
              <span>
                <span className="font-medium">Shipping Fee:</span>{" "}
                {payload?.shippingFee}
              </span>
              <span>
                <span className="font-medium">Payment Method:</span>
                <span className="underline mx-2">Cash on Delivery</span>
              </span>
            </div>
          </div>

          <div className="bg-primary w-full px-4 py-2 rounded-[5px] text-white text-end">
            <span className="font-medium">Total:</span> {payload?.total}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 my-4">
        {payload?.status && payload?.status === "pending" && (
          <Button title="Cancel" onClick={handleCancel} />
        )}
        {payload?.status === "delivered" && (
          <Button title="Order Recieved" onClick={handleComplete} />
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
