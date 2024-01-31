/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/Button";
import Container from "@/components/Container";
import Field from "@/components/Field";
import Form from "@/components/Form";
import GridStack from "@/components/GridStack";
import BackgrundV2 from "@/assets/images/background-2.jpg";
import Logo from "@/assets/images/logo.png";

import { UserModel } from "@/interface/model";
import queryUtils from "@/utils/query.utils";
import Select from "@/components/Select";

import LoadingScreen from "@/containers/LoadingScreen";
import usePhillAddress from "@/hooks/usePhillAddress";
import AddressSelect from "@/modules/admin/views/customer/components/AddressSelect";
import customerValidationSchema from "@/modules/admin/validation/customer.validation";
import customerApi from "@/modules/admin/api/customer.api";
import Text from "@/components/Text";
import Heading from "@/components/Heading";
import { Link } from "react-router-dom";
const RegisterScreen = () => {
  const {
    finalAddress,
    region,
    province,
    cities,
    municipalities,
    barangays,
    handleSelectRegion,
    handleSelectProvince,
    handleSelectCities,
    handleSelectMunicipalities,
    handleSelectedBarangay,
  } = usePhillAddress();

  const mutation = queryUtils.mutation({
    mutationFn: async (payload: UserModel) => await customerApi.create(payload),
    invalidateKey: ["customer"],
    toast: "Created Customer Successfully",
  });

  const handleSubmit = (payload: UserModel) => {
    mutation.mutate(payload);
  };

  if (region.isLoading) return <LoadingScreen />;
  const { data: regionRes } = region as { data: any };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="p-[32px]">
        <Link to={"/"}>
          <div className=" flex gap-2  items-center  p-4 text-[22px] font-semibold">
            <img
              src={Logo}
              className="w-[100px] h-[100px] object-cover rounded-full"
            />
            <span className="capitalize">villanueva gardens</span>
          </div>
        </Link>
        <div className="text-center mb-16">
          <Heading level={1}>Registration</Heading>
          <Text as="span">Lorem ipsum dolor sit amet adipiscing elit.</Text>
        </div>
        <Form<UserModel>
          onSubmit={handleSubmit}
          validation={customerValidationSchema}>
          <GridStack columns={2} gap={16}>
            <Field
              title="First Name"
              name="firstName"
              placeholder="Enter Custoemr Full Name"
              required
            />
            <Field
              title="Middle name"
              name="middleName"
              placeholder="Enter Custoemr Full Name"
              required
            />
            <Field
              title="Last Name"
              name="lastName"
              placeholder="Enter Custoemr Full Name"
              required
            />
          </GridStack>

          <GridStack columns={2} gap={16} className="my-4">
            <Field title="Age" name="age" placeholder="Enter Street" />
            <Field
              type="date"
              title="Birth date"
              name="birthDate"
              placeholder="Enter Custoemr Full Name"
              required
            />
            <Field
              title="Contact"
              name="contact"
              placeholder="Enter Custoemr Full Name"
              required
            />

            <Select
              title="Gender"
              name="gender"
              placeholder="Select Gender"
              option={[
                { title: "Male", value: "male" },
                { title: "Female", value: "female" },
              ]}
            />
          </GridStack>

          <GridStack columns={2} gap={16}>
            <Field title="Street" name="street" placeholder="Enter Street" />
            <Field
              title="Building"
              name="building"
              placeholder="Enter Building"
            />
            <Field title="House no" name="houseNo" placeholder="Enter House" />

            <Field default={region} name="region" hidden className="hidden" />

            <AddressSelect
              title="Region"
              disabled={region.isLoading}
              onSelect={handleSelectRegion}
              options={regionRes}
            />
            <AddressSelect
              title="Provice"
              disabled={province?.isLoading || province?.data === undefined}
              onSelect={handleSelectProvince}
              options={province.data}
            />
            <AddressSelect
              title="Cities"
              disabled={cities.isLoading || cities?.data === undefined}
              onSelect={handleSelectCities}
              options={cities.data}
            />
            <AddressSelect
              title="Municipality"
              disabled={
                municipalities.isLoading || municipalities?.data === undefined
              }
              onSelect={handleSelectMunicipalities}
              options={municipalities.data}
            />
            <AddressSelect
              title="Barangay"
              disabled={barangays.isLoading || barangays?.data === undefined}
              onSelect={handleSelectedBarangay}
              options={barangays.data}
            />

            <Field default={finalAddress} name="address" required hidden />
          </GridStack>
          <div className="my-4">
            <Field
              title="Postal Code"
              name="postalCode"
              placeholder="Enter Postal Code"
            />
          </div>

          <GridStack columns={2} gap={16}>
            <Field
              type="email"
              title="Email"
              name="email"
              placeholder="Enter Email"
              required
            />
            <Field
              type="password"
              title="Password"
              name="password"
              placeholder="Enter Password"
              required
            />
          </GridStack>

          <Container className="flex flex-col gap-4 mt-4">
            <Button title="Register" />
          </Container>
        </Form>
        <div className="flex justify-center items-center">
          <span className="my-4 text-center">
            Don have an account?{" "}
            <Link to={"/login"} className="border-b border-black">
              Login
            </Link>
          </span>
        </div>
      </div>
      <div className="bg-slate-300  sticky top-0">
        <div className="bg-[#00000063] w-screen  absolute z-10 h-full"></div>
        <img
          src={BackgrundV2}
          className="object-cover w-screen h-full"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default RegisterScreen;
