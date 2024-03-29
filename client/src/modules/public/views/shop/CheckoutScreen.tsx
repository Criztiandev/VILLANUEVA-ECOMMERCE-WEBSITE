/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { RootReducer } from "@/service/store";
import Button from "@/components/Button";
import GridStack from "@/components/GridStack";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import LoadingScreen from "@/containers/LoadingScreen";
import FieldDisplay from "@/components/FieldDisplay";
import productApi from "../../api/product.api";
import LoginModal from "../../containers/LoginModal";

const CheckoutScreen = () => {
  const { UID } = useSelector((state: RootReducer) => state.auth);
  const { products } = useSelector((state: RootReducer) => state.cart);

  const productQuery = useQuery({
    queryFn: async () => {
      // Check if products is defined and not empty
      if (!products || products.length === 0) {
        return [];
      }
      const productIds = products.map((product) => product._id);

      // Use Promise.all to wait for all promises to resolve
      const result = await Promise.all(
        productIds.map((id) => productApi.fetchById(id))
      );

      return result;
    },
    queryKey: ["products"],
  });

  if (productQuery?.isLoading) return <LoadingScreen />;

  const handleSubmit = () => {};

  const totalValue = () => {
    const subtotal = [];
    for (const product of products) {
      subtotal.push((product?.price as number) * product.quantity);
    }

    return subtotal.reduce((acc: number, current: number) => acc + current, 0);
  };

  const total = totalValue() + 40;
  const productaPayload = productQuery?.data;

  console.log(productQuery?.data);
  return (
    <>
      <div className="px-[24px]">
        <div className="mt-[24px]">
          <h1 className="text-[48px] font-bold ">Check out</h1>
          <span>Thank you for choosing our webiste bla bla bla</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="w-full bg-white rouded-[5px] p-4 my-4 rounded-[5px]">
              <h1 className="text-[24px] font-semibold mb-2 border-b border-gray-300 pb-2">
                Delivery Address
              </h1>
              <div className="flex flex-col gap-4">
                <GridStack columns={2} gap={24}>
                  <FieldDisplay title="Region" payload={""} />
                  <FieldDisplay title="Province" payload={""} />
                  <FieldDisplay title="City" payload={""} />
                  <FieldDisplay title="Municipality" payload={""} />
                </GridStack>
                <FieldDisplay title="Postal Code" payload={""} />
              </div>
            </div>

            <div className="w-full bg-white rouded-[5px] p-4 my-4 rounded-[5px]">
              <h1 className="text-[24px] font-semibold  border-b border-gray-300 pb-2 mb-4">
                Payment Details
              </h1>
              <FieldDisplay payload={""} title="Full Name" />
              <GridStack columns={2} gap={24} className="my-4">
                <FieldDisplay payload={""} title="Email" />
                <FieldDisplay payload={""} title="Contact" />
              </GridStack>
            </div>

            <div className="w-full bg-white rouded-[5px] p-4 my-4 rounded-[5px]">
              <h1 className="text-[24px] font-semibold mb-2 border-b border-gray-300 pb-2">
                Payment Method
              </h1>
              <GridStack columns={2} gap={24} className="my-4">
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="w-full h-[150px] rounded-[5px]  p-4 flex justify-center items-center border-primary border-2">
                  <h2 className="text-[18px]">Cash on Delivery</h2>
                </motion.div>
              </GridStack>
            </div>

            {products.length > 0 && (
              <div className="py-4 flex flex-col gap-2">
                <Button
                  title="Checkout"
                  className="w-full"
                  onClick={handleSubmit}
                />
                <Button title="Cancel" className="w-full bg-gray-400" />
              </div>
            )}
          </div>
          <div className="bg-white rounded-[5px] p-4 my-4">
            <h1 className="text-[24px] font-semibold">Your order</h1>

            <div className="flex flex-col gap-4 my-4 border-b py-4 border-gray-300">
              {products.map((items: any, index: number) => (
                <div className="flex justify-between items-center" key={index}>
                  <span>
                    {items.quantity} x{" "}
                    {productaPayload && productaPayload[index]?.payload?.name}
                  </span>
                  <span>P{items.price}</span>
                </div>
              ))}

              {products.length > 0 && (
                <>
                  <div className="flex flex-col gap-4 my-4 border-y  py-4 border-gray-300">
                    <div className="flex justify-between items-center font-semibold">
                      <span>Subtotal</span>
                      <span>P {totalValue()}</span>
                    </div>
                    <div className="flex justify-between items-center font-semibold">
                      <span>Shipping</span>
                      <span>P 40</span>
                    </div>
                    <div className="flex justify-between items-center font-semibold">
                      <span>Tax</span>
                      <span>P 0</span>
                    </div>
                    <div className="flex justify-between items-center font-semibold">
                      <span>Discount</span>
                      <span>N/A</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center font-semibold">
                      <span>Total</span>
                      <span>P {total}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <LoginModal UID={UID || ""} />
    </>
  );
};

export default CheckoutScreen;
