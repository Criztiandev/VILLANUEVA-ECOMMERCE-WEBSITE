/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/Button";
import Container from "@/components/Container";
import Field from "@/components/Field";
import FlexStack from "@/components/FlexStack";
import Form from "@/components/Form";
import GridStack from "@/components/GridStack";
import Select from "@/components/Select";
import Textarea from "@/components/Textarea";
import Toggle from "@/components/Toggle";

import { CategoryModel, ProductModel } from "@/interface/model";
import productValidationSchema from "../service.validation";
import queryUtils from "@/utils/query.utils";
import productApi from "../service.api";
import { useQuery } from "@tanstack/react-query";
import categoriesApi from "../../categories/categories.api";

interface Options {
  title: string;
  value: string | number;
}

const ServiceCreate = () => {
  const categoryQuery = useQuery({
    queryFn: async () => categoriesApi.fetchAll(),
    queryKey: ["category"],
  });

  const mutation = queryUtils.mutation({
    mutationFn: async (payload: ProductModel) => productApi.create(payload),
    invalidateKey: ["products"],
    toast: "Create product Successfully",
  });

  const handleSubmit = (payload: ProductModel) => {
    mutation.mutate(payload);
  };

  const transformPayloadToOption = (data: {
    payload: CategoryModel[];
  }): Options[] => {
    if (!data || !data.payload) return [];

    const { payload } = data;
    return payload.map((fields: CategoryModel) => ({
      value: fields.name,
      title: fields.name,
    }));
  };

  return (
    <div className="overflow-hidden">
      <Container className="my-8 mx-auto border-t border-gray-300 py-4">
        <Form<ProductModel>
          onSubmit={handleSubmit}
          validation={productValidationSchema}>
          <GridStack
            columns={2}
            gap={24}
            className=" mb-8 border-b border-gray-200 pb-8">
            <Container className="">
              <h2 className="text-[18px] font-semibold">Service Image</h2>
            </Container>

            <Container>
              <div className="w-full border-2 border-dashed border-gray-400 h-[300px] rounded-[5px] p-4 flex justify-center items-center">
                <input type="file" multiple />
              </div>

              <GridStack columns={4} gap={16} className="mt-4">
                <Container className="h-[100px] rounded-[5px] border border-black"></Container>
                <Container className="h-[100px] rounded-[5px] border border-black"></Container>
                <Container className="h-[100px] rounded-[5px] border border-black"></Container>
                <Container className="h-[100px] rounded-[5px] border border-black"></Container>
              </GridStack>
            </Container>
          </GridStack>

          <GridStack columns={2} gap={24}>
            <Container>
              <h2 className="text-[18px] font-semibold">Service Details</h2>
            </Container>

            <FlexStack gap={16} className="">
              <Field
                title="Name"
                name="name"
                placeholder="Enter Product Name"
                required
              />
              <GridStack columns={2} gap={16} className="w-full">
                <Select
                  title="Category"
                  name="category"
                  placeholder="Select Category"
                  disabled={categoryQuery.isLoading || categoryQuery.isError}
                  option={transformPayloadToOption(categoryQuery.data)}
                />

                <Field
                  type="number"
                  title="Price"
                  name="price"
                  placeholder="Enter Price"
                  required
                />
                <Field
                  type="number"
                  title="Stocks"
                  name="stock"
                  placeholder="Enter Stocks"
                  required
                />
                <Select
                  title="Status"
                  name="status"
                  placeholder="Select status"
                  option={[
                    { title: "New", value: "new" },
                    { title: "Sales", value: "sales" },
                    { title: "Sold", value: "sold" },
                    { title: "Out of Stocs", value: "OOS" },
                  ]}
                />
                <Toggle title="Published" name="isPublished" />
              </GridStack>

              <Textarea title="Description" name="description" />
            </FlexStack>
          </GridStack>

          <GridStack columns={2} gap={24}>
            <Container className="">
              <h2 className="text-[18px] font-semibold">Service Action</h2>
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

export default ServiceCreate;
