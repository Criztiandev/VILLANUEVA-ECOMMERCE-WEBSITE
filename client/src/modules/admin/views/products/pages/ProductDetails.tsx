/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/Button";
import Container from "@/components/Container";
import FlexStack from "@/components/FlexStack";
import GridStack from "@/components/GridStack";

import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import productApi from "../product.api";
import FieldDisplay from "@/components/FieldDisplay";
import LoadingScreen from "@/containers/LoadingScreen";
import { ProductModel } from "@/interface/model";
import { toast } from "react-toastify";
import tableConfig from "@/modules/admin/config/table.config";

const ProductDetails = () => {
  const { base } = tableConfig.productTable;
  const { id } = useParams();

  const { isLoading, isError, ...query } = useQuery({
    queryFn: async () => productApi.fetchById(id || ""),
    queryKey: [`products-${id}`],
  });

  if (isLoading) return <LoadingScreen />;

  if (isError) {
    toast.error(query.error as any);
    return <LoadingScreen />;
  }

  const { payload } = query.data as { payload: ProductModel };

  return (
    <div className="overflow-hidden mt-4">
      <div>
        <h1 className="text-[32px] font-bold">Product Details</h1>
        <Link to={`/${base}`} className="flex gap-2">
          <span></span>
          <span className="hover:border-b-2 border-b-2 border-inherit">
            Home
          </span>
        </Link>
      </div>

      <Container className="my-8 mx-auto border-t border-gray-300 py-4">
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
            <FieldDisplay
              title="Name"
              payload={payload?.name}
              className="w-full"
            />

            <GridStack columns={2} className="w-full" gap={16}>
              <FieldDisplay title="Category" payload={payload?.category} />
              <FieldDisplay title="Price" payload={payload?.price} />
              <FieldDisplay title="Stocks" payload={payload?.stock} />
              <FieldDisplay title="Status" payload={payload?.status} />
            </GridStack>

            <FieldDisplay
              as="textarea"
              title="Description"
              payload={payload?.description || ""}
            />
          </FlexStack>
        </GridStack>

        <GridStack columns={2} gap={24}>
          <Container className="">
            <h2 className="text-[18px] font-semibold">Actions</h2>
          </Container>

          <Container className="flex flex-col gap-4 mt-4">
            <Link to={`/products/edit/${id}`} className="w-full">
              <Button type="button" title="Edit" className="w-full" />
            </Link>
            <Link to={"/products"} className="w-full">
              <Button type="button" title="Go back" className="w-full" />
            </Link>
          </Container>
        </GridStack>
      </Container>
    </div>
  );
};

export default ProductDetails;
