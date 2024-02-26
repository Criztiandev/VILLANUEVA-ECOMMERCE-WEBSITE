/* eslint-disable @typescript-eslint/no-explicit-any */
import Sidebar from "../../layout/Sidebar";
import Topbar from "../../layout/Topbar";
import Notification from "../../layout/Notification";
import GridStack from "@/components/GridStack";
import StatsCard from "./components/StatsCard";
import Container from "@/components/Container";
import { OrderPayload, ProductModel } from "@/interface/model";
import { useQuery } from "@tanstack/react-query";
import productApi from "../../api/product.api";
import LoadingScreen from "@/containers/LoadingScreen";
import ProductBlob from "./components/ProductBlob";
import orderApi from "../../api/order.api";
import serviceBookApi from "@/modules/public/api/serviceBook.api";
import OrderBlob from "./components/OrderBlob";
import Barchart from "@/components/Barchart";

const MainEntryPoint = () => {
  const productQuery = useQuery({
    queryFn: async () => productApi.fetchAll(),
    queryKey: ["products"],
  });
  const salesQuery = useQuery({
    queryFn: async () => productApi.fetchTotalSales(),
    queryKey: ["sales"],
  });

  const orderQuery = useQuery({
    queryFn: async () => orderApi.fetchAll(),
    queryKey: ["orders"],
  });

  const bookedQuery = useQuery({
    queryFn: async () => serviceBookApi.fetchAll({}),
    queryKey: ["service-booked"],
  });

  const statsQuery = useQuery({
    queryFn: async () => productApi.fetchBestProduct(),
    queryKey: ["best-product"],
  });

  if (productQuery.isLoading) return <LoadingScreen />;
  const sales = salesQuery.data?.payload;
  const products = productQuery.data?.payload?.slice(0, 5);
  const orders = orderQuery?.data?.payload;
  const booked = bookedQuery?.data?.payload;

  return (
    <>
      <main className="flex   ">
        <Sidebar />
        <section className=" flex flex-col w-screen overflow-x-hidden overflow-y-scroll">
          <Topbar />
          <div className="px-[32px]">
            <GridStack columns={3} gap={16} className=" my-4">
              <StatsCard title="Total Sales" value={sales.totalSales || 0} />
              <StatsCard title="Total Order" value={orders?.length || 0} />
              <StatsCard title="Schedule" value={booked?.length || 0} />
            </GridStack>
          </div>

          <Container className="bg-white p-4 mx-8 mb-4 rounded-[5px]">
            <Barchart data={statsQuery?.data} />
          </Container>

          <div className="flex gap-4 px-[32px] h-[60%]">
            <Container className="w-[1200px]  bg-white px-[24px] shadow-md py-4">
              <h3 className="text-[18px] font-semibold mb-2">Recent Orders</h3>
              <div className="mt-4  flex flex-col gap-2">
                {orders?.map((product: OrderPayload) => (
                  <OrderBlob {...product} />
                ))}
              </div>
            </Container>

            <Container className="w-[600px] bg-white px-[24px] shadow-md py-4">
              <h3 className="text-[18px] font-semibold mb-2">
                Recent Products
              </h3>
              <div className="mt-4  flex flex-col gap-2">
                {products?.map((product: ProductModel) => (
                  <ProductBlob {...product} />
                ))}
              </div>
            </Container>
          </div>
        </section>
      </main>
      <Notification />
    </>
  );
};

export default MainEntryPoint;
