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

import { CategoryModel, ProductModel, ServiceModel } from "@/interface/model";
import serviceValidationSchema from "../../../validation/service.validation";
import queryUtils from "@/utils/query.utils";
import productApi from "../../../api/service.api";
import { useQuery } from "@tanstack/react-query";
import useMutipleImage from "@/hooks/useMutipleImage";
import MiniInput from "../components/MiniInput";
import { useState } from "react";
import CoverImage from "../components/CoverImage";
import OtherImage from "../components/OtherImage";
import CoverAction from "../components/CoverAction";
import LoadingScreen from "@/containers/LoadingScreen";
import componentsUtils from "@/utils/components.utils";
import serviceCategoriesApi from "@/modules/admin/api/serviceCategories.api";

interface ServiceExtended
  extends Omit<ServiceModel, "_id" | "images" | "status" | "services"> {
  serviceOne: string;
  serviceTwo: string;
  serviceThree: string;
  serviceFour: string;
  serviceFive: string;
}

const ServiceCreate = () => {
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

  const categoryQuery = useQuery({
    queryFn: async () => serviceCategoriesApi.fetchAll(),
    queryKey: ["category"],
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

  const handleSubmit = (payload: ServiceExtended) => {
    const services = [
      payload.serviceOne,
      payload.serviceTwo,
      payload.serviceThree,
      payload.serviceFour,
      payload.serviceFive,
    ];

    const finalized = {
      ...payload,
      services,
      images: selectedImages,
    };

    const formData = new FormData();
    const resultImages = Array.from(selectedImages || []);
    const coverIndex = resultImages.findIndex(
      (item: any) => item.name === cover.name
    );
    // If the cover image is found, move it to the beginning of the array
    if (coverIndex !== -1) {
      const coverImage = resultImages.splice(coverIndex, 1)[0]; // Remove cover image from its current position
      resultImages.unshift(coverImage); // Add cover image to the beginning of the array
    }
    Array.from(resultImages || []).forEach((file) => {
      formData.append(`product`, file as any);
    });
    for (const key in finalized) {
      formData.append(key, (finalized as any)[key]);
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

  if (categoryQuery.isLoading) return <LoadingScreen />;

  return (
    <div className="overflow-hidden">
      <h1 className="mt-8 mb-4 text-[32px] font-bold">Service Create</h1>

      <Container className="my-8 mx-auto border-t border-gray-300 py-4">
        <Form<ServiceExtended>
          onSubmit={handleSubmit}
          validation={serviceValidationSchema}
          className="flex flex-col gap-[24px]">
          <GridStack columns={2} gap={24} className=" border-b border-gray-200">
            <Container className="">
              <h2 className="text-[18px] font-semibold">Service Image</h2>
            </Container>

            <Container className="mb-6 w-full  h-full ">
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
              <h2 className="text-[18px] font-semibold">Service Details</h2>
            </Container>

            <FlexStack gap={16} className="">
              <Field
                title="Name"
                name="name"
                placeholder="Enter Service Name"
                required
              />
              <GridStack columns={2} gap={16} className="w-full">
                <Select
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
                  title="Slots"
                  name="slots"
                  placeholder="Enter Available Slots"
                  required
                />
                <Field
                  type="number"
                  title="Rating"
                  name="rate"
                  placeholder="Enter Rating"
                  required
                />
              </GridStack>

              <Field
                type="number"
                title="Starting Price"
                name="startingPrice"
                placeholder="Enter Starting Price"
                required
              />

              <Textarea title="Description" name="description" />

              <div className="w-full border">
                <h3 className="text-[24px] font-semibold">Services</h3>
                <FlexStack gap={24} className="my-4">
                  <Field
                    name="serviceOne"
                    placeholder="Enter Service Name"
                    className="w-full"
                    required
                  />
                  <Field
                    name="serviceTwo"
                    placeholder="Enter Service Name"
                    className="w-full"
                    required
                  />
                  <Field
                    name="serviceThree"
                    placeholder="Enter Service Name"
                    className="w-full"
                    required
                  />
                  <Field
                    name="serviceFour"
                    placeholder="Enter Service Name"
                    className="w-full"
                    required
                  />
                  <Field
                    name="serviceFive"
                    placeholder="Enter Service Name"
                    className="w-full"
                    required
                  />
                </FlexStack>

                <div className="flex justify-between items-center w-full">
                  <Toggle title="Featured" name="isFeatured" />
                  <Toggle title="Published" name="isPublished" />
                </div>
              </div>
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
