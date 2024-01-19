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
import productValidationSchema from "../product.validation";
import queryUtils from "@/utils/query.utils";
import productApi from "../product.api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import LoadingScreen from "@/containers/LoadingScreen";
import { toast } from "react-toastify";
import categoriesApi from "../../categories/categories.api";

interface Options {
  title: string;
  value: string | number;
}

const ProductEdit = () => {
  const { id } = useParams();

  const { isLoading, isError, ...query } = useQuery({
    queryFn: async () => productApi.fetchById(id || ""),
    queryKey: [`products-${id}`],
  });

  const categoryQuery = useQuery({
    queryFn: async () => categoriesApi.fetchAll(),
    queryKey: ["category"],
  });

  const mutation = queryUtils.mutation({
    mutationFn: async (payload: ProductModel) =>
      productApi.updateById(id || "", payload),
    invalidateKey: [`products-${id}`],
    toast: "Updated product Successfully",
  });

  if (isLoading) return <LoadingScreen />;

  if (isError) {
    toast.error(query.error as any);
    return <LoadingScreen />;
  }

  const { payload } = query.data as { payload: ProductModel };

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

          <GridStack
            columns={2}
            gap={24}
            className="border-b border-gray-300 mb-8 pb-8">
            <Container>
              <h2 className="text-[18px] font-semibold">Product Details</h2>
            </Container>

            <FlexStack gap={16} className="">
              <Field
                title="Name"
                name="name"
                placeholder="Enter Product Name"
                default={payload?.name}
                required
              />
              <GridStack columns={2} className="w-full" gap={16}>
                <Select
                  title="Category"
                  name="category"
                  placeholder="Select Category"
                  disabled={categoryQuery.isLoading || categoryQuery.isError}
                  option={transformPayloadToOption(categoryQuery.data)}
                  default={payload?.category}
                />

                <Field
                  type="number"
                  title="Price"
                  name="price"
                  placeholder="Enter Price"
                  default={payload?.price}
                  required
                />
                <Field
                  type="number"
                  title="Stocks"
                  name="stock"
                  default={payload?.stock}
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
                  default={payload?.status}
                />
                <Toggle
                  title="Published"
                  name="isPublished"
                  default={payload?.isPublished}
                />
              </GridStack>

              <Textarea
                title="Description"
                name="description"
                default={payload?.description}
              />
            </FlexStack>
          </GridStack>

          <GridStack columns={2} gap={24}>
            <Container className="">
              <h2 className="text-[18px] font-semibold">Actions</h2>
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

export default ProductEdit;
