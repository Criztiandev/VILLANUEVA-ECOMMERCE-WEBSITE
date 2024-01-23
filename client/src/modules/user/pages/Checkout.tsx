/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import Header from "../layout/Header";
import { RootReducer } from "@/service/store";
import CartItem from "../components/CartItem";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Form from "@/components/Form";
import Field from "@/components/Field";
import GridStack from "@/components/GridStack";
import { useQuery } from "@tanstack/react-query";
import userApi from "@/modules/admin/views/users/user.api";
import LoadingScreen from "@/containers/LoadingScreen";
import { UserModel } from "@/interface/model";
import Button from "@/components/Button";
import { checkOutValidation } from "../validation/cart.validation";

interface FormModel {
  fullName: string;
  email: string;
  contact: string;
  region: string;
  province: string;
  municipality: string;
  barangay: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const { UID } = useSelector((state: RootReducer) => state.auth);
  const { products } = useSelector((state: RootReducer) => state.cart);

  const userQuery = useQuery({
    queryFn: async () => userApi.fetchById(UID || ""),
    queryKey: [`user-${UID}`],
  });

  useEffect(() => {
    if (products.length <= 0) {
      navigate("/shop");
      toast.info("No Product available");
    }
  }, [products]);

  if (userQuery?.isLoading) return <LoadingScreen />;
  const totalValue = products.reduce((total: number, product: any) => {
    const productSubtotal = product.price * product.quantity;
    return total + productSubtotal;
  }, 0);

  const payload: UserModel = userQuery?.data?.payload;
  const address = payload?.address.split(",");

  return (
    <div className="">
      <Header isStatic={true} />

      <div className="flex justify-center my-8  flex-col  gap-12">
        <h1 className="text-[48px] font-semibold text-center">Checkout</h1>

        <div className="grid grid-cols-3 px-[32px] gap-8">
          <div className="p-4 bg-white border">
            {products?.map((item) => (
              <CartItem key={item._id} {...item} />
            ))}
          </div>
          <div className="bg-white p-4 border rounded-[5px]">
            <div className="flex flex-col gap-2">
              <span className="text-[18px] mt-[18px] font-semibold">
                Shipping Address
              </span>
              <Form<FormModel>
                onSubmit={() => {}}
                validation={checkOutValidation}
                className="">
                <GridStack columns={2} className=" mt-4" gap={24}>
                  <Field
                    title="Full name"
                    name="fullName"
                    default={payload?.fullName}
                  />
                  <Field
                    title="Email"
                    name="emaul"
                    type="email"
                    default={payload?.email}
                  />
                  <Field
                    title="Contact"
                    name="contact"
                    default={payload?.contact}
                  />
                  <div></div>

                  <Field title="Region" name="region" default={address[0]} />
                  <Field
                    title="Province"
                    name="province"
                    default={address[1]}
                  />
                  <Field title="City" name="city" default={address[2]} />
                  <Field
                    title="Municipaloty"
                    name="municipality"
                    default={address[3]}
                  />
                  <Field
                    title="Barangay"
                    name="Barangay"
                    default={address[4]}
                  />

                  <Field
                    title="Zip code"
                    name="postalCode"
                    default={payload.postalCode}
                  />
                </GridStack>
              </Form>
            </div>
          </div>

          <div className="bg-white p-4 border rounded-[5px]">
            <div className="flex flex-col gap-2">
              <span className="flex justify-between">
                <span className="opacity-70">Subtotal</span>
                <span className="font-semibold">P{totalValue}</span>
              </span>

              <span className="flex justify-between">
                <span className="opacity-70">Shipping Fee</span>
                <span className="font-semibold">P0</span>
              </span>

              <span className="flex justify-between">
                <span className="opacity-70">Tax</span>
                <span className="font-semibold">P 40</span>
              </span>
            </div>

            <div className="divider">Total</div>
            <div className="text-[24px]">P {totalValue + 40}</div>
            <div className="flex flex-col gap-4 my-4">
              <Button title="Checkout" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
