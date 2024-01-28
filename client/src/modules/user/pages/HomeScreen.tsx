import Container from "@/components/Container";
import Table from "@/components/Table";
import tableConfig from "../config/table.config";
import { RecentService, UserModel } from "@/interface/model";
import { useQuery } from "@tanstack/react-query";
import userApi from "../api/user.api";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "@/service/store";
import LoadingScreen from "@/containers/LoadingScreen";
import { toast } from "react-toastify";
import { clearCredentials } from "@/service/store/slice/auth.slice";

interface RecentOrder {
  refID: string;
  status: string;
  date: string;
  price: string;
}

const HomeScreen = () => {
  const { UID, role } = useSelector((state: RootReducer) => state.auth);
  const dispatch = useDispatch();
  if (role !== "user") {
    dispatch(clearCredentials());
  }

  const userQuery = useQuery({
    queryFn: async () => userApi.fetchById(UID),
    queryKey: [`${UID}`],
  });

  const { columns: orderCol, name: orderName } = tableConfig.recentOrderTable;
  const { columns: serviceCol, name: serviceName } = tableConfig.recentService;

  if (userQuery.isLoading || userQuery.isError) return <LoadingScreen />;

  const payload: UserModel = userQuery.data?.payload;
  console.log(payload);

  return (
    <div className="p-[24px]">
      <div className="border h-[300px] rounded-[5px] bg-white p-4">
        <h1>Welcome {payload?.fullName}</h1>
      </div>

      <div className="grid grid-cols-[auto_300px] gap-4">
        <Container className="w-full bg-white p-4 shadow-md rounded-[10px] my-4">
          <h3 className="text-[18px] font-semibold mb-2">Recent Orders</h3>
          <Table<RecentOrder> id={orderName} columns={orderCol} />
        </Container>
        <Container className="w-full bg-white p-4 shadow-md rounded-[10px] my-4">
          <h3 className="text-[18px] font-semibold mb-2">Recent Service</h3>
          <Table<RecentService> id={serviceName} columns={serviceCol} />
        </Container>
      </div>
    </div>
  );
};

export default HomeScreen;
