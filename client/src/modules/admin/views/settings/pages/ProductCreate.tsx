/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/Button";
import Container from "@/components/Container";
import Field from "@/components/Field";
import FlexStack from "@/components/FlexStack";
import Form from "@/components/Form";
import GridStack from "@/components/GridStack";
import Select from "@/components/Select";
import TableHeader from "@/components/Table/parts/TableHeader";
import Textarea from "@/components/Textarea";
import Toggle from "@/components/Toggle";

import { ProductModel } from "@/interface/model";
import productValidationSchema from "../settings.validation";
import queryUtils from "@/utils/query.utils";
import productApi from "../settings.api";

const ProductCreate = () => {
  const mutation = queryUtils.mutation({
    mutationFn: async (payload: ProductModel) => productApi.create(payload),
    invalidateKey: ["products"],
    toast: "Create product Successfully",
  });

  const handleSubmit = (payload: ProductModel) => {
    mutation.mutate(payload);
  };

  return (
    <div className="overflow-hidden">
      <TableHeader title="Create Product" current="/products"></TableHeader>

      <Container className="my-8 mx-auto border-t border-gray-300 py-4">
        <Form<ProductModel>
          onSubmit={handleSubmit}
          validation={productValidationSchema}>
          <GridStack
            columns={2}
            gap={24}
            className=" mb-8 border-b border-gray-200 pb-8">
            <Container className="">
              <h2 className="text-[18px] font-semibold">Product Image</h2>
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
              <h2 className="text-[18px] font-semibold">Product Details</h2>
            </Container>

            <FlexStack gap={16} className="">
              <Field
                title="Name"
                name="name"
                placeholder="Enter Product Name"
                required
              />
              <GridStack columns={2} className="w-full">
                <Select
                  title="Category"
                  name="category"
                  placeholder="Select Category"
                  option={[{ title: "Category", value: "category-1" }]}
                />

                <Field
                  type="number"
                  title="Price"
                  name="price"
                  placeholder="Enter Price"
                  required
                />
                <Field type="number" title="Stocks" name="stock" required />
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
              <h2 className="text-[18px] font-semibold">Product Image</h2>
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

export default ProductCreate;
