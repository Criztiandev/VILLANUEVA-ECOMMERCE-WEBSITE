/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/Button";
import Container from "@/components/Container";
import Field from "@/components/Field";
import Form from "@/components/Form";
import GridStack from "@/components/GridStack";

import { UserModel } from "@/interface/model";
import customerValidationSchema from "../user.validation";
import queryUtils from "@/utils/query.utils";
import customerApi from "../user.api";
import Select from "@/components/Select";

import LoadingScreen from "@/containers/LoadingScreen";
import usePhillAddress from "@/hooks/usePhillAddress";
import AddressSelect from "../components/AddressSelect";

const CustomerCreate = () => {
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
    <div className="overflow-hidden">
      <h1 className="mt-8 mb-4 text-[32px] font-bold">User Create</h1>
      <Container className="my-8 mx-auto border-t border-gray-300 py-4">
        <Form<UserModel>
          onSubmit={handleSubmit}
          validation={customerValidationSchema}>
          <GridStack
            columns={2}
            gap={24}
            className="mb-8 border-b border-gray-200 pb-8">
            <Container>
              <h2 className="text-[18px] font-semibold">Customer Details</h2>
            </Container>

            <Container>
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
            </Container>
          </GridStack>

          <GridStack
            columns={2}
            gap={24}
            className="mb-8 border-b border-gray-200 pb-8">
            <Container className="">
              <h2 className="text-[18px] font-semibold">Customer Address</h2>
            </Container>

            <Container>
              <GridStack columns={2} gap={16}>
                <Field
                  title="Street"
                  name="street"
                  placeholder="Enter Street"
                />
                <Field
                  title="Building"
                  name="building"
                  placeholder="Enter Building"
                />
                <Field
                  title="House no"
                  name="houseNo"
                  placeholder="Enter House"
                />

                <Field
                  default={region}
                  name="region"
                  hidden
                  className="hidden"
                />

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
                    municipalities.isLoading ||
                    municipalities?.data === undefined
                  }
                  onSelect={handleSelectMunicipalities}
                  options={municipalities.data}
                />
                <AddressSelect
                  title="Barangay"
                  disabled={
                    barangays.isLoading || barangays?.data === undefined
                  }
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
            </Container>
          </GridStack>

          <GridStack
            columns={2}
            gap={24}
            className="mb-8 border-b border-gray-200 pb-8">
            <Container className="">
              <h2 className="text-[18px] font-semibold">Customer Account</h2>
            </Container>

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
          </GridStack>

          <GridStack columns={2} gap={24}>
            <Container className="">
              <h2 className="text-[18px] font-semibold">Customer Action</h2>
            </Container>

            <Container className="flex flex-col gap-4 mt-4">
              <Button title="Submit" />
              <Button type="button" title="Cancel" />
            </Container>
          </GridStack>
        </Form>
      </Container>
    </div>
  );
};

export default CustomerCreate;
