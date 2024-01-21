import Sidebar from "../../layout/Sidebar";
import Topbar from "../../layout/Topbar";
import Notification from "../../layout/Notification";
import GridStack from "@/components/GridStack";
import StatsCard from "./components/StatsCard";
import Container from "@/components/Container";
import Table from "@/components/Table";
import tableConfig from "../../config/table.config";
import { ProductModel } from "@/interface/model";
import { useQuery } from "@tanstack/react-query";
import productApi from "../products/product.api";
import LoadingScreen from "@/containers/LoadingScreen";
import ProductBlob from "./components/ProductBlob";

const MainEntryPoint = () => {
  const { name, columns } = tableConfig.recentTable;

  const productQuery = useQuery({
    queryFn: async () => productApi.fetchAll(),
    queryKey: ["products"],
  });

  if (productQuery.isLoading) return <LoadingScreen />;

  // get only 5 recent products
  const products = productQuery.data?.payload?.slice(0, 5);

  return (
    <>
      <main className="flex">
        <Sidebar />
        <section className=" flex flex-col w-screen overflow-x-hidden">
          <Topbar />
          <div className="px-[32px]">
            <GridStack columns={3} gap={16} className=" my-4">
              <StatsCard />
              <StatsCard />
              <StatsCard />
            </GridStack>
          </div>

          <div>{/* Bar Chart */}</div>

          <div className="flex gap-4 px-[32px] ">
            <Container className="w-full bg-white p-4 shadow-md rounded-[10px]">
              <h3 className="text-[24px] font-semibold mb-2">Recent Orders</h3>
              <Table<ProductModel> id={name} columns={columns} />
            </Container>

            <Container className="w-[612px] bg-white px-[24px] py-4">
              <h3 className="text-[24px] font-semibold">Recent Products</h3>
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
