/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/Button";
import Container from "@/components/Container";
import Field from "@/components/Field";
import FlexStack from "@/components/FlexStack";
import Form from "@/components/Form";
import GridStack from "@/components/GridStack";
import Select from "@/components/Select";

import { CustomerModel } from "@/interface/model";
import customerValidationSchema from "../customer.validation";
import queryUtils from "@/utils/query.utils";
import customerApi from "../customer.api";
import { useParams } from "react-router-dom";

const CustomerEdit = () => {
  const { id } = useParams();

  console.log(id);

  const mutation = queryUtils.mutation({
    mutationFn: async (payload: CustomerModel) =>
      await customerApi.create(payload),
    invalidateKey: ["customer"],
    toast: "Created Customer Successfully",
  });

  const handleSubmit = (payload: CustomerModel) => {
    mutation.mutate(payload);
  };

  return (
    <div className="overflow-hidden">
      <Container className="my-8 mx-auto border-t border-gray-300 py-4">
        <Form<CustomerModel>
          onSubmit={handleSubmit}
          validation={customerValidationSchema}>
          <GridStack
            columns={2}
            gap={24}
            className=" mb-8 border-b border-gray-200 pb-8">
            <Container className="">
              <h2 className="text-[18px] font-semibold">Profile Picture</h2>
            </Container>

            <Container>
              <div className="w-full border-2 border-dashed border-gray-400 h-[300px] rounded-[5px] p-4 flex justify-center items-center">
                <input type="file" />
              </div>
            </Container>
          </GridStack>

          <GridStack columns={2} gap={24}>
            <Container>
              <h2 className="text-[18px] font-semibold">Customer Details</h2>
            </Container>

            <FlexStack gap={16} className="">
              <Field
                title="Full name"
                name="fullName"
                placeholder="Enter Custoemr Full Name"
                required
              />
              <GridStack columns={2} gap={16} className="w-full">
                <Field
                  type="email"
                  title="Email"
                  name="email"
                  placeholder="Enter customer email"
                  required
                />
                <Field
                  type="tel"
                  title="Contact"
                  name="contact"
                  placeholder="Enter contact number"
                  required
                />

                {/* Add a Address API here */}

                <Field
                  type="text"
                  title="Address"
                  name="address"
                  placeholder="Enter Customer Address"
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

                <Field
                  type="number"
                  title="Age"
                  name="age"
                  placeholder="Enter Customer age"
                  required
                />
              </GridStack>
            </FlexStack>
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

export default CustomerEdit;
