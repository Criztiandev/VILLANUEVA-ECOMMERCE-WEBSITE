/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/Button";
import Container from "@/components/Container";
import Field from "@/components/Field";
import Form from "@/components/Form";
import GridStack from "@/components/GridStack";

import { UserModel } from "@/interface/model";
import customerValidationSchema from "../../../validation/customer.validation";
import queryUtils from "@/utils/query.utils";
import customerApi from "../../../api/customer.api";
import Select from "@/components/Select";

import LoadingScreen from "@/containers/LoadingScreen";
import usePhillAddress from "@/hooks/usePhillAddress";
import AddressSelect from "../components/AddressSelect";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const CustomerEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const customerQuery = useQuery({
    queryFn: async () => await customerApi.fetchById(id || ""),
    queryKey: [`customer-${id}`],
    enabled: !!id,
  });

  const mutation = queryUtils.mutation({
    mutationFn: async (payload: UserModel) =>
      await customerApi.updateById(id || "", payload),
    invalidateKey: [`customer-${id}`],
    toast: "Created Customer Successfully",
  });

  const handleSubmit = (payload: UserModel) => {
    mutation.mutate(payload);
  };

  if (region?.isError || customerQuery?.isError) {
    navigate("/customer");
    return <LoadingScreen />;
  }
  if (region.isLoading || customerQuery.isLoading) return <LoadingScreen />;

  const { payload: result } = customerQuery?.data as { payload: UserModel };
  const { data: regionRes } = region as { data: any };

  const addressPayload = result?.address.split(",");

  return (
    <div className="overflow-hidden">
      <h1 className="mt-8 mb-4 text-[32px] font-bold">User Edit</h1>
      <Container className="my-8 mx-auto border-t border-gray-300 py-4">
        <Form<UserModel>
          onSubmit={handleSubmit}
          validation={customerValidationSchema as any}>
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
                  placeholder="Enter first name"
                  default={result?.firstName}
                  required
                />
                <Field
                  title="Middle name"
                  name="middleName"
                  placeholder="Enter Custoemr Full Name"
                  default={result?.middleName}
                  required
                />
                <Field
                  title="Last Name"
                  name="lastName"
                  placeholder="Enter Custoemr Full Name"
                  default={result?.lastName}
                  required
                />
              </GridStack>

              <GridStack columns={2} gap={16} className="my-4">
                <Field
                  default={result?.age}
                  title="Age"
                  name="age"
                  placeholder="Enter Street"
                />
                <Field
                  default={result?.birthDate}
                  type="date"
                  title="Birth date"
                  name="birthDate"
                  placeholder="Enter Custoemr Full Name"
                  required
                />
                <Field
                  default={result?.contact}
                  title="Contact"
                  name="contact"
                  placeholder="Enter Custoemr Full Name"
                  required
                />

                <Select
                  default={result?.gender}
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
                  default={result?.street}
                  title="Street"
                  name="street"
                  placeholder="Enter Street"
                />
                <Field
                  default={result?.building}
                  title="Building"
                  name="building"
                  placeholder="Enter Building"
                />
                <Field
                  default={result?.houseNo}
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
                  default={addressPayload && addressPayload[0]}
                  title="Region"
                  disabled={region?.isLoading}
                  onSelect={handleSelectRegion}
                  options={regionRes}
                />
                <AddressSelect
                  default={addressPayload && addressPayload[1]}
                  title="Provice"
                  disabled={province?.isLoading}
                  onSelect={handleSelectProvince}
                  options={province.data}
                />
                <AddressSelect
                  default={addressPayload && addressPayload[2]}
                  title="Cities"
                  disabled={cities.isLoading}
                  onSelect={handleSelectCities}
                  options={cities?.data}
                />
                <AddressSelect
                  default={addressPayload && addressPayload[3]}
                  title="Municipality"
                  disabled={municipalities.isLoading}
                  onSelect={handleSelectMunicipalities}
                  options={municipalities.data}
                />
                <AddressSelect
                  default={addressPayload && addressPayload[4]}
                  title="Barangay"
                  disabled={barangays.isLoading}
                  onSelect={handleSelectedBarangay}
                  options={barangays.data}
                />

                <Field
                  default={result?.address || finalAddress}
                  name="address"
                  required
                  hidden
                />
              </GridStack>
              <div className="my-4">
                <Field
                  default={result?.postalCode}
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

            <div className="flex flex-col gap-4">
              <Field
                default={result?.email}
                type="email"
                title="Email"
                name="email"
                placeholder="Enter Email"
                required
              />

              <Button title="Change Password" />
            </div>
          </GridStack>

          <GridStack columns={2} gap={24}>
            <Container className="">
              <h2 className="text-[18px] font-semibold">Customer Action</h2>
            </Container>

            <Container className="flex flex-col gap-4 mt-4">
              <Button title="Submit" className="bg-green-500" />
              <Button type="button" title="Cancel" className="bg-red-500" />
            </Container>
          </GridStack>
        </Form>
      </Container>
    </div>
  );
};

export default CustomerEdit;
