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
import serviceValidationSchema from "../../../validation/service.validation";
import queryUtils from "@/utils/query.utils";
import productApi from "../../../api/service.api";
import { useQuery } from "@tanstack/react-query";
import categoriesApi from "../../../api/categories.api";
import useMutipleImage from "@/hooks/useMutipleImage";
import MiniInput from "../components/MiniInput";
import { useState } from "react";
import CoverImage from "../components/CoverImage";
import OtherImage from "../components/OtherImage";
import CoverAction from "../components/CoverAction";
import LoadingScreen from "@/containers/LoadingScreen";
import componentsUtils from "@/utils/components.utils";
import { useParams } from "react-router-dom";

const ServiceEdit = () => {
  const { id } = useParams();
  const [isDelete, setIsDelete] = useState(false);
  const {
    ref: CoverRef,
    cover,
    selectedImages,
    handleFileSelect,
    handleImageClear,
    handleRemoveSelectedImage,
    handleChangeCover,
    renderImages,
    handleAddImage,
  } = useMutipleImage();

  const productQuery = useQuery({
    queryFn: async () => productApi.fetchById(id || ""),
    queryKey: [`product-${id}`],
    enabled: !!id,
  });

  const categoryQuery = useQuery({
    queryFn: async () => categoriesApi.fetchAll(),
    queryKey: ["category"],
    enabled: !!id,
  });

  const mutation = queryUtils.mutation({
    mutationFn: async ({ name, data }: { name: string; data: ProductModel }) =>
      productApi.sendFile(`${name}`, data),
    invalidateKey: ["products"],
    toast: "Create product Successfully",
    onSuccess: () => {
      handleImageClear();
    },
  });

  if (categoryQuery.isLoading || productQuery.isLoading)
    return <LoadingScreen />;

  const handleSubmit = (payload: ProductModel) => {
    const formData = new FormData();

    const resultImages = Array.from(selectedImages || []);

    const coverIndex = resultImages.findIndex(
      (item: any) => item.name === cover.name
    );

    // If the cover image is found, move it to the beginning of the array
    if (coverIndex !== -1) {
      const coverImage = resultImages.splice(coverIndex, 1)[0]; // Remove cover image from its current position
      resultImages?.unshift(coverImage); // Add cover image to the beginning of the array
    }

    Array.from(resultImages || []).forEach((file) => {
      formData.append(`product`, file as any);
    });

    for (const key in payload) {
      formData.append(key, (payload as any)[key]);
    }

    mutation.mutate({ name: payload.name, data: formData as any });
  };

  const handleSlotAction = (e: any) => {
    if (isDelete) {
      handleRemoveSelectedImage(e);
      setIsDelete(false);
      return;
    }

    return handleChangeCover(e);
  };

  const imagesExist = (count: number) =>
    selectedImages && selectedImages.length > count;

  const { payload: result } = productQuery.data as { payload: ProductModel };

  return (
    <div className="overflow-hidden">
      <h1 className="mt-8 mb-4 text-[32px] font-bold">Product Create</h1>

      <Container className="my-8 mx-auto border-t border-gray-300 py-4">
        <Form<ProductModel>
          onSubmit={handleSubmit}
          validation={serviceValidationSchema}
          className="flex flex-col gap-[24px]">
          <GridStack columns={2} gap={24} className=" border-b border-gray-200">
            <Container className="">
              <h2 className="text-[18px] font-semibold">Product Image</h2>
            </Container>

            <Container className="bg-white w-full  h-full border">
              <Container
                className={`grid gap-4
                ${imagesExist(1) && "grid-rows-[auto_100px]"}
              `}>
                {/* Cover Image */}
                <CoverImage
                  cover={cover}
                  ref={CoverRef}
                  onFileSelect={handleFileSelect}
                />

                {imagesExist(1) && (
                  <Container className="flex gap-4">
                    {renderImages()?.map((slot: any, index) => {
                      // If the Imave is Cover, Dont render it
                      if (slot?.name === cover?.name) return;

                      // If the slot is a undefiend, make it a MiniInput
                      if (!slot) {
                        return (
                          <MiniInput key={index} onSelect={handleAddImage} />
                        );
                      }
                      // render everything with Image
                      return (
                        <OtherImage
                          isDelete={isDelete}
                          image={slot}
                          onCoverChange={handleSlotAction}
                        />
                      );
                    })}
                  </Container>
                )}
              </Container>
            </Container>

            {/* Cover Acrtions */}
            {imagesExist(1) && (
              <CoverAction
                isDelete={isDelete}
                onClear={handleImageClear}
                onToggleDelete={() => setIsDelete((prev) => !prev)}
              />
            )}
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
                default={result.name}
              />
              <GridStack columns={2} gap={16} className="w-full">
                <Select
                  default={result.category}
                  title="Category"
                  name="category"
                  placeholder={
                    categoryQuery?.data?.payload?.length > 0
                      ? "Select Category"
                      : "No Category"
                  }
                  disabled={
                    categoryQuery?.data?.payload?.length > 0 ? false : true
                  }
                  option={componentsUtils.optionTransformer<CategoryModel>({
                    payload: categoryQuery.data.payload || [],
                    options: { key: "name", value: "name" },
                  })}
                />

                <Field
                  type="number"
                  title="Price"
                  name="price"
                  placeholder="Enter Price"
                  default={result.price}
                  required
                />
                <Field
                  type="number"
                  title="Stocks"
                  name="stock"
                  required
                  default={result.stock}
                  placeholder="Enter Stocks"
                />
                <Field
                  type="number"
                  title="Shipping Fee"
                  name="shippingFee"
                  required
                  default={result.shippingFee}
                  placeholder="Enter Stocks"
                />
                <Select
                  title="Status"
                  name="status"
                  placeholder="Select status"
                  default={result.status}
                  option={[
                    { title: "New", value: "new" },
                    { title: "Sales", value: "sales" },
                    { title: "Sold", value: "sold" },
                    { title: "Out of Stocs", value: "OOS" },
                  ]}
                />
                <div></div>
                <Toggle
                  title="Featured"
                  name="isFeatured"
                  default={result.isPublished}
                />
                <Toggle
                  title="Published"
                  name="isPublished"
                  default={result.isFeatured}
                />
              </GridStack>

              <Textarea
                title="Summary"
                name="summary"
                default={result.summary}
              />
              <Textarea
                title="Description"
                name="description"
                default={result.description}
              />
            </FlexStack>
          </GridStack>

          <GridStack columns={2} gap={24}>
            <Container className="">
              <h2 className="text-[18px] font-semibold">Product Action</h2>
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

export default ServiceEdit;
